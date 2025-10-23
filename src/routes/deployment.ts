// Maya-Web Deployment API Routes
// Handles all deployment operations through the backend

import { Router } from 'express';
import { auth } from '../../middleware/auth';
import UniversalDeploymentEngine from '../../services/deployment/universalDeploymentEngine';
import { supabase } from '../../lib/supabase';

const router = Router();
const deploymentEngine = new UniversalDeploymentEngine();

// Get all supported deployment platforms
router.get('/platforms', (req, res) => {
  try {
    const platforms = deploymentEngine.getSupportedPlatforms();
    res.json({
      success: true,
      platforms: platforms.map(platform => ({
        id: platform.id,
        name: platform.name,
        features: platform.features,
        pricing: platform.pricing,
        supportedFormats: platform.supportedFormats
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch platforms'
    });
  }
});

// Get platform recommendations for project type
router.get('/platforms/recommendations/:projectType', (req, res) => {
  try {
    const { projectType } = req.params;
    const recommendations = deploymentEngine.getRecommendedPlatforms(projectType);
    
    res.json({
      success: true,
      recommendations: recommendations.map(platform => ({
        id: platform.id,
        name: platform.name,
        features: platform.features,
        pricing: platform.pricing,
        supportedFormats: platform.supportedFormats
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get recommendations'
    });
  }
});

// Deploy project to a platform
router.post('/deploy', auth, async (req, res) => {
  try {
    const { projectId, platform, customDomain, environmentVariables } = req.body;
    const userId = req.user.id;

    // Verify project ownership
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .eq('owner_id', userId)
      .single();

    if (projectError || !project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found or access denied'
      });
    }

    // Create deployment record
    const { data: deployment, error: deploymentError } = await supabase
      .from('deployments')
      .insert({
        project_id: projectId,
        platform,
        status: 'pending',
        deployment_data: {
          platform,
          customDomain,
          environmentVariables,
          timestamp: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (deploymentError) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create deployment record'
      });
    }

    // Start deployment process
    const deploymentConfig = {
      platform,
      projectId,
      buildCommand: project.settings?.buildCommand || 'npm run build',
      outputDirectory: project.settings?.outputDirectory || 'dist',
      environmentVariables: environmentVariables || {},
      customDomain
    };

    // Deploy asynchronously
    deploymentEngine.deploy(deploymentConfig)
      .then(async (result) => {
        // Update deployment record with result
        await supabase
          .from('deployments')
          .update({
            status: result.status,
            url: result.url,
            deployment_id: result.deploymentId,
            build_logs: result.logs?.join('\n'),
            deployed_at: result.success ? new Date().toISOString() : null
          })
          .eq('id', deployment.id);
      })
      .catch(async (error) => {
        // Update deployment record with error
        await supabase
          .from('deployments')
          .update({
            status: 'failed',
            build_logs: error.message
          })
          .eq('id', deployment.id);
      });

    res.json({
      success: true,
      deployment: {
        id: deployment.id,
        status: 'pending',
        platform,
        estimatedTime: 60
      },
      message: `Deployment to ${platform} initiated`
    });

  } catch (error) {
    console.error('Deployment error:', error);
    res.status(500).json({
      success: false,
      error: 'Deployment failed'
    });
  }
});

// Deploy to multiple platforms
router.post('/deploy/multiple', auth, async (req, res) => {
  try {
    const { projectId, platforms, customDomain, environmentVariables } = req.body;
    const userId = req.user.id;

    // Verify project ownership
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .eq('owner_id', userId)
      .single();

    if (projectError || !project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found or access denied'
      });
    }

    // Create deployment records for each platform
    const deployments = [];
    for (const platform of platforms) {
      const { data: deployment, error: deploymentError } = await supabase
        .from('deployments')
        .insert({
          project_id: projectId,
          platform,
          status: 'pending',
          deployment_data: {
            platform,
            customDomain,
            environmentVariables,
            timestamp: new Date().toISOString()
          }
        })
        .select()
        .single();

      if (!deploymentError && deployment) {
        deployments.push(deployment);
      }
    }

    // Start deployments asynchronously
    const deploymentConfig = {
      projectId,
      buildCommand: project.settings?.buildCommand || 'npm run build',
      outputDirectory: project.settings?.outputDirectory || 'dist',
      environmentVariables: environmentVariables || {},
      customDomain
    };

    deploymentEngine.deployToMultiplePlatforms(platforms, deploymentConfig)
      .then(async (results) => {
        // Update deployment records with results
        for (const [platform, result] of Object.entries(results)) {
          const deployment = deployments.find(d => d.platform === platform);
          if (deployment) {
            await supabase
              .from('deployments')
              .update({
                status: result.status,
                url: result.url,
                deployment_id: result.deploymentId,
                build_logs: result.logs?.join('\n'),
                deployed_at: result.success ? new Date().toISOString() : null
              })
              .eq('id', deployment.id);
          }
        }
      });

    res.json({
      success: true,
      deployments: deployments.map(d => ({
        id: d.id,
        platform: d.platform,
        status: 'pending',
        estimatedTime: 60
      })),
      message: `Deployments to ${platforms.length} platforms initiated`
    });

  } catch (error) {
    console.error('Multiple deployment error:', error);
    res.status(500).json({
      success: false,
      error: 'Multiple deployment failed'
    });
  }
});

// Get deployment status
router.get('/status/:deploymentId', auth, async (req, res) => {
  try {
    const { deploymentId } = req.params;
    const userId = req.user.id;

    // Get deployment record
    const { data: deployment, error: deploymentError } = await supabase
      .from('deployments')
      .select(`
        *,
        projects!inner(owner_id)
      `)
      .eq('id', deploymentId)
      .eq('projects.owner_id', userId)
      .single();

    if (deploymentError || !deployment) {
      return res.status(404).json({
        success: false,
        error: 'Deployment not found or access denied'
      });
    }

    // Get real-time status from deployment engine
    const realTimeStatus = deploymentEngine.getDeploymentStatus(deployment.deployment_id);

    res.json({
      success: true,
      deployment: {
        id: deployment.id,
        platform: deployment.platform,
        status: realTimeStatus?.status || deployment.status,
        url: realTimeStatus?.url || deployment.url,
        deploymentId: deployment.deployment_id,
        logs: realTimeStatus?.logs || (deployment.build_logs ? deployment.build_logs.split('\n') : []),
        createdAt: deployment.created_at,
        deployedAt: deployment.deployed_at,
        estimatedTime: realTimeStatus?.estimatedTime
      }
    });

  } catch (error) {
    console.error('Deployment status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get deployment status'
    });
  }
});

// Get all deployments for a project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    // Verify project ownership
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .eq('owner_id', userId)
      .single();

    if (projectError || !project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found or access denied'
      });
    }

    // Get all deployments for the project
    const { data: deployments, error: deploymentsError } = await supabase
      .from('deployments')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (deploymentsError) {
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch deployments'
      });
    }

    res.json({
      success: true,
      deployments: deployments.map(deployment => ({
        id: deployment.id,
        platform: deployment.platform,
        status: deployment.status,
        url: deployment.url,
        deploymentId: deployment.deployment_id,
        createdAt: deployment.created_at,
        deployedAt: deployment.deployed_at
      }))
    });

  } catch (error) {
    console.error('Project deployments error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project deployments'
    });
  }
});

// Cancel deployment
router.post('/cancel/:deploymentId', auth, async (req, res) => {
  try {
    const { deploymentId } = req.params;
    const userId = req.user.id;

    // Get deployment record
    const { data: deployment, error: deploymentError } = await supabase
      .from('deployments')
      .select(`
        *,
        projects!inner(owner_id)
      `)
      .eq('id', deploymentId)
      .eq('projects.owner_id', userId)
      .single();

    if (deploymentError || !deployment) {
      return res.status(404).json({
        success: false,
        error: 'Deployment not found or access denied'
      });
    }

    // Cancel deployment
    const cancelled = await deploymentEngine.cancelDeployment(deployment.deployment_id);

    if (cancelled) {
      // Update deployment record
      await supabase
        .from('deployments')
        .update({
          status: 'failed',
          build_logs: 'Deployment cancelled by user'
        })
        .eq('id', deployment.id);

      res.json({
        success: true,
        message: 'Deployment cancelled successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Failed to cancel deployment'
      });
    }

  } catch (error) {
    console.error('Cancel deployment error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel deployment'
    });
  }
});

// Rollback deployment
router.post('/rollback/:deploymentId', auth, async (req, res) => {
  try {
    const { deploymentId } = req.params;
    const userId = req.user.id;

    // Get deployment record
    const { data: deployment, error: deploymentError } = await supabase
      .from('deployments')
      .select(`
        *,
        projects!inner(owner_id)
      `)
      .eq('id', deploymentId)
      .eq('projects.owner_id', userId)
      .single();

    if (deploymentError || !deployment) {
      return res.status(404).json({
        success: false,
        error: 'Deployment not found or access denied'
      });
    }

    // Rollback deployment
    const rollbackResult = await deploymentEngine.rollbackDeployment(deployment.deployment_id);

    if (rollbackResult.success) {
      // Create new deployment record for rollback
      await supabase
        .from('deployments')
        .insert({
          project_id: deployment.project_id,
          platform: deployment.platform,
          status: 'deployed',
          url: rollbackResult.url,
          deployment_id: rollbackResult.deploymentId,
          deployment_data: {
            ...deployment.deployment_data,
            rollback: true,
            originalDeploymentId: deployment.deployment_id
          },
          deployed_at: new Date().toISOString()
        });

      res.json({
        success: true,
        message: 'Deployment rolled back successfully',
        url: rollbackResult.url
      });
    } else {
      res.status(400).json({
        success: false,
        error: rollbackResult.error || 'Failed to rollback deployment'
      });
    }

  } catch (error) {
    console.error('Rollback deployment error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to rollback deployment'
    });
  }
});

// Get deployment logs
router.get('/logs/:deploymentId', auth, async (req, res) => {
  try {
    const { deploymentId } = req.params;
    const userId = req.user.id;

    // Get deployment record
    const { data: deployment, error: deploymentError } = await supabase
      .from('deployments')
      .select(`
        *,
        projects!inner(owner_id)
      `)
      .eq('id', deploymentId)
      .eq('projects.owner_id', userId)
      .single();

    if (deploymentError || !deployment) {
      return res.status(404).json({
        success: false,
        error: 'Deployment not found or access denied'
      });
    }

    res.json({
      success: true,
      logs: deployment.build_logs ? deployment.build_logs.split('\n') : [],
      status: deployment.status,
      platform: deployment.platform
    });

  } catch (error) {
    console.error('Deployment logs error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch deployment logs'
    });
  }
});

// Get all active deployments
router.get('/active', auth, (req, res) => {
  try {
    const activeDeployments = deploymentEngine.getAllDeployments();
    
    res.json({
      success: true,
      deployments: activeDeployments.map(deployment => ({
        deploymentId: deployment.deploymentId,
        status: deployment.status,
        url: deployment.url,
        estimatedTime: deployment.estimatedTime,
        error: deployment.error
      }))
    });

  } catch (error) {
    console.error('Active deployments error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch active deployments'
    });
  }
});

export default router;
