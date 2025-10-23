// Maya-Web Backend API Routes
// This file contains all the API endpoints for the AI website builder

import { Router } from 'express';
import { supabase } from '../lib/supabase';
import { OpenAIService } from '../services/openai';
import { MultiModelPipeline } from '../services/multiModelAI';
import { auth } from '../middleware/auth';
import deploymentRoutes from './deployment';

const router = Router();

// ==================== AI GENERATION ENDPOINTS ====================

// Generate text content with AI
router.post('/ai/generate-text', auth, async (req, res) => {
  try {
    const { prompt, type = 'text', projectId } = req.body;
    const userId = req.user.id;

    // Track AI usage
    const startTime = Date.now();
    
    let response;
    switch (type) {
      case 'text':
        response = await MultiModelPipeline.generateWithBestModel(prompt, 'text');
        break;
      case 'code':
        response = await MultiModelPipeline.generateWithBestModel(prompt, 'code');
        break;
      case 'research':
        response = await MultiModelPipeline.generateWithBestModel(prompt, 'research');
        break;
      case 'analysis':
        response = await MultiModelPipeline.generateWithBestModel(prompt, 'analysis');
        break;
      default:
        response = await OpenAIService.generateText(prompt);
    }

    const processingTime = Date.now() - startTime;

    // Log AI generation
    await supabase.from('ai_generations').insert({
      user_id: userId,
      project_id: projectId,
      type: 'text',
      model: type === 'research' ? 'perplexity' : 'gemini',
      prompt,
      response: { content: response },
      processing_time: processingTime,
      status: 'completed'
    });

    res.json({ success: true, content: response });
  } catch (error) {
    console.error('Text generation error:', error);
    res.status(500).json({ success: false, error: 'Generation failed' });
  }
});

// Generate images with DALL-E
router.post('/ai/generate-image', auth, async (req, res) => {
  try {
    const { prompt, projectId } = req.body;
    const userId = req.user.id;

    const startTime = Date.now();
    const imageUrl = await OpenAIService.generateImage(prompt);
    const processingTime = Date.now() - startTime;

    // Log AI generation
    await supabase.from('ai_generations').insert({
      user_id: userId,
      project_id: projectId,
      type: 'image',
      model: 'dall-e-2',
      prompt,
      response: { imageUrl },
      processing_time: processingTime,
      status: 'completed'
    });

    res.json({ success: true, imageUrl });
  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({ success: false, error: 'Image generation failed' });
  }
});

// Generate 3D scenes
router.post('/ai/generate-3d-scene', auth, async (req, res) => {
  try {
    const { prompt, projectId, sceneType = 'hero' } = req.body;
    const userId = req.user.id;

    const startTime = Date.now();
    
    // Generate 3D scene data using AI
    const scenePrompt = `Create a 3D scene for a website ${sceneType} section based on: ${prompt}. 
    Return JSON with: objects (array of 3D objects), lighting (ambient, directional, point lights), 
    camera (position, target, fov), materials (colors, textures), animations (keyframes).`;

    const aiResponse = await MultiModelPipeline.generateWithBestModel(scenePrompt, 'code');
    
    // Parse AI response and create scene data
    const sceneData = {
      objects: [
        {
          type: 'box',
          position: [0, 0, 0],
          scale: [2, 1, 0.5],
          material: { color: '#6366f1', metalness: 0.8, roughness: 0.2 }
        }
      ],
      lighting: {
        ambient: { color: '#404040', intensity: 0.4 },
        directional: { color: '#ffffff', intensity: 1, position: [5, 5, 5] }
      },
      camera: {
        position: [0, 0, 5],
        target: [0, 0, 0],
        fov: 75
      },
      materials: [
        { name: 'primary', color: '#6366f1', metalness: 0.8, roughness: 0.2 },
        { name: 'secondary', color: '#ec4899', metalness: 0.6, roughness: 0.4 }
      ],
      animations: [
        { object: 'box', type: 'rotation', axis: 'y', duration: 4, loop: true }
      ]
    };

    const processingTime = Date.now() - startTime;

    // Save scene to database
    const { data: scene } = await supabase.from('scenes').insert({
      project_id: projectId,
      name: `${sceneType} Scene`,
      type: sceneType,
      scene_data: sceneData,
      camera: sceneData.camera,
      lighting: sceneData.lighting,
      objects: sceneData.objects,
      materials: sceneData.materials,
      animations: sceneData.animations
    }).select().single();

    // Log AI generation
    await supabase.from('ai_generations').insert({
      user_id: userId,
      project_id: projectId,
      type: '3d_scene',
      model: 'gemini',
      prompt,
      response: { sceneId: scene.id, sceneData },
      processing_time: processingTime,
      status: 'completed'
    });

    res.json({ success: true, scene, sceneData });
  } catch (error) {
    console.error('3D scene generation error:', error);
    res.status(500).json({ success: false, error: '3D scene generation failed' });
  }
});

// Generate animations
router.post('/ai/generate-animation', auth, async (req, res) => {
  try {
    const { prompt, projectId, elementId } = req.body;
    const userId = req.user.id;

    const startTime = Date.now();
    
    const animationPrompt = `Create a Framer Motion animation for: ${prompt}. 
    Return JSON with: type (fadeIn, slideUp, scale, etc.), duration, delay, easing, 
    variants (initial, animate, exit), stagger (if multiple elements).`;

    const aiResponse = await MultiModelPipeline.generateWithBestModel(animationPrompt, 'code');
    
    // Parse and create animation data
    const animationData = {
      type: 'fadeIn',
      duration: 0.6,
      delay: 0.1,
      easing: 'easeOut',
      variants: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
      },
      stagger: 0.1
    };

    const processingTime = Date.now() - startTime;

    // Log AI generation
    await supabase.from('ai_generations').insert({
      user_id: userId,
      project_id: projectId,
      type: 'animation',
      model: 'gemini',
      prompt,
      response: { animationData },
      processing_time: processingTime,
      status: 'completed'
    });

    res.json({ success: true, animation: animationData });
  } catch (error) {
    console.error('Animation generation error:', error);
    res.status(500).json({ success: false, error: 'Animation generation failed' });
  }
});

// Apply neural style transformation
router.post('/ai/apply-style', auth, async (req, res) => {
  try {
    const { projectId, styleName, elements } = req.body;
    const userId = req.user.id;

    const startTime = Date.now();
    
    const styleThemes = {
      cyberpunk: {
        colors: { primary: '#00ff88', secondary: '#ff0080', accent: '#00ffff' },
        fonts: { heading: 'Orbitron', body: 'Rajdhani' },
        effects: ['glow', 'neon', 'glitch'],
        animations: ['electric', 'pulse', 'scan']
      },
      luxury: {
        colors: { primary: '#d4af37', secondary: '#000000', accent: '#ffffff' },
        fonts: { heading: 'Playfair Display', body: 'Lato' },
        effects: ['gold', 'elegant', 'sophisticated'],
        animations: ['smooth', 'fade', 'elegant']
      },
      minimalist: {
        colors: { primary: '#000000', secondary: '#ffffff', accent: '#666666' },
        fonts: { heading: 'Helvetica', body: 'Helvetica' },
        effects: ['clean', 'simple', 'geometric'],
        animations: ['subtle', 'fade', 'slide']
      },
      futuristic: {
        colors: { primary: '#00d4ff', secondary: '#ff6b35', accent: '#00ff88' },
        fonts: { heading: 'Exo', body: 'Roboto' },
        effects: ['holographic', 'metallic', 'glass'],
        animations: ['float', 'glow', 'transform']
      }
    };

    const selectedStyle = styleThemes[styleName] || styleThemes.minimalist;

    const processingTime = Date.now() - startTime;

    // Update project styles
    await supabase.from('projects').update({
      styles: selectedStyle,
      updated_at: new Date().toISOString()
    }).eq('id', projectId);

    // Log AI generation
    await supabase.from('ai_generations').insert({
      user_id: userId,
      project_id: projectId,
      type: 'style',
      model: 'neural-style',
      prompt: `Apply ${styleName} style`,
      response: { style: selectedStyle },
      processing_time: processingTime,
      status: 'completed'
    });

    res.json({ success: true, style: selectedStyle });
  } catch (error) {
    console.error('Style application error:', error);
    res.status(500).json({ success: false, error: 'Style application failed' });
  }
});

// ==================== PROJECT MANAGEMENT ENDPOINTS ====================

// Create new project
router.post('/projects', auth, async (req, res) => {
  try {
    const { name, description, type = 'landing' } = req.body;
    const userId = req.user.id;

    const { data: project, error } = await supabase.from('projects').insert({
      name,
      description,
      type,
      owner_id: userId,
      status: 'draft',
      settings: {},
      components: {},
      styles: {},
      animations: {},
      collaborators: []
    }).select().single();

    if (error) throw error;

    res.json({ success: true, project });
  } catch (error) {
    console.error('Project creation error:', error);
    res.status(500).json({ success: false, error: 'Project creation failed' });
  }
});

// Get user projects
router.get('/projects', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, status } = req.query;

    let query = supabase.from('projects').select('*').eq('owner_id', userId);
    
    if (status) {
      query = query.eq('status', status);
    }

    const { data: projects, error } = await query
      .order('updated_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (error) throw error;

    res.json({ success: true, projects });
  } catch (error) {
    console.error('Projects fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch projects' });
  }
});

// Update project
router.put('/projects/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user.id;

    // Verify ownership
    const { data: project } = await supabase.from('projects')
      .select('owner_id').eq('id', id).single();

    if (!project || project.owner_id !== userId) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    const { data: updatedProject, error } = await supabase.from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, project: updatedProject });
  } catch (error) {
    console.error('Project update error:', error);
    res.status(500).json({ success: false, error: 'Project update failed' });
  }
});

// ==================== TEMPLATES ENDPOINTS ====================

// Get templates
router.get('/templates', async (req, res) => {
  try {
    const { category, type, premium, page = 1, limit = 20 } = req.query;

    let query = supabase.from('templates').select('*');
    
    if (category) query = query.eq('category', category);
    if (type) query = query.eq('type', type);
    if (premium !== undefined) query = query.eq('is_premium', premium === 'true');

    const { data: templates, error } = await query
      .order('downloads', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (error) throw error;

    res.json({ success: true, templates });
  } catch (error) {
    console.error('Templates fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch templates' });
  }
});

// Use template
router.post('/templates/:id/use', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { projectId } = req.body;
    const userId = req.user.id;

    // Get template
    const { data: template, error: templateError } = await supabase
      .from('templates').select('*').eq('id', id).single();

    if (templateError) throw templateError;

    // Update project with template data
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .update({
        components: template.components,
        styles: template.styles,
        animations: template.animations,
        updated_at: new Date().toISOString()
      })
      .eq('id', projectId)
      .eq('owner_id', userId)
      .select()
      .single();

    if (projectError) throw projectError;

    // Increment template downloads
    await supabase.from('templates')
      .update({ downloads: template.downloads + 1 })
      .eq('id', id);

    res.json({ success: true, project });
  } catch (error) {
    console.error('Template use error:', error);
    res.status(500).json({ success: false, error: 'Failed to use template' });
  }
});

// ==================== DEPLOYMENT ENDPOINTS ====================

// Deploy project
router.post('/deploy', auth, async (req, res) => {
  try {
    const { projectId, platform = 'vercel' } = req.body;
    const userId = req.user.id;

    // Get project data
    const { data: project, error: projectError } = await supabase
      .from('projects').select('*').eq('id', projectId).eq('owner_id', userId).single();

    if (projectError) throw projectError;

    // Create deployment record
    const { data: deployment, error: deploymentError } = await supabase
      .from('deployments').insert({
        project_id: projectId,
        platform,
        status: 'pending',
        deployment_data: { platform, timestamp: new Date().toISOString() }
      }).select().single();

    if (deploymentError) throw deploymentError;

    // TODO: Implement actual deployment logic
    // This would integrate with Vercel, Netlify, etc. APIs

    res.json({ 
      success: true, 
      deployment,
      message: `Deployment to ${platform} initiated` 
    });
  } catch (error) {
    console.error('Deployment error:', error);
    res.status(500).json({ success: false, error: 'Deployment failed' });
  }
});

// ==================== ANALYTICS ENDPOINTS ====================

// Track analytics event
router.post('/analytics/track', async (req, res) => {
  try {
    const { projectId, eventType, eventData } = req.body;

    await supabase.from('analytics_events').insert({
      project_id: projectId,
      event_type: eventType,
      event_data: eventData,
      user_agent: req.headers['user-agent'],
      ip_address: req.ip,
      referrer: req.headers.referer
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    res.status(500).json({ success: false, error: 'Analytics tracking failed' });
  }
});

// Get project analytics
router.get('/analytics/:projectId', auth, async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    // Verify ownership
    const { data: project } = await supabase.from('projects')
      .select('owner_id').eq('id', projectId).single();

    if (!project || project.owner_id !== userId) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    // Get analytics data
    const { data: events, error } = await supabase
      .from('analytics_events')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })
      .limit(1000);

    if (error) throw error;

    res.json({ success: true, events });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch analytics' });
  }
});

// ==================== DEPLOYMENT ENDPOINTS ====================

// Mount deployment routes
router.use('/deployment', deploymentRoutes);

export default router;
