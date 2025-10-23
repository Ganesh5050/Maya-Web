-- Maya-Web Complete Database Schema
-- This creates all necessary tables for the AI website builder

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    avatar_url TEXT,
    plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
    credits INTEGER DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    preferences JSONB DEFAULT '{}',
    design_dna JSONB DEFAULT '{}' -- Stores learned design preferences
);

-- Projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT DEFAULT 'landing' CHECK (type IN ('landing', 'portfolio', 'ecommerce', 'blog', 'saas', 'agency', 'custom')),
    owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    domain TEXT,
    subdomain TEXT,
    settings JSONB DEFAULT '{}',
    components JSONB DEFAULT '{}',
    styles JSONB DEFAULT '{}',
    animations JSONB DEFAULT '{}',
    seo JSONB DEFAULT '{}',
    analytics JSONB DEFAULT '{}',
    collaborators JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE,
    views INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0
);

-- Scenes table (3D scenes)
CREATE TABLE IF NOT EXISTS public.scenes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    type TEXT DEFAULT 'hero' CHECK (type IN ('hero', 'section', 'product', 'gallery', 'testimonial', 'contact', 'custom')),
    scene_data JSONB NOT NULL DEFAULT '{}', -- Three.js scene data
    camera JSONB DEFAULT '{}',
    lighting JSONB DEFAULT '{}',
    objects JSONB DEFAULT '[]',
    materials JSONB DEFAULT '[]',
    animations JSONB DEFAULT '[]',
    effects JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workflows table (AI workflows)
CREATE TABLE IF NOT EXISTS public.workflows (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    type TEXT DEFAULT 'generation' CHECK (type IN ('generation', 'optimization', 'deployment', 'collaboration')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
    steps JSONB DEFAULT '[]',
    results JSONB DEFAULT '{}',
    logs JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Templates table
CREATE TABLE IF NOT EXISTS public.templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'general' CHECK (category IN ('general', 'business', 'portfolio', 'ecommerce', 'saas', 'agency', 'blog', 'landing')),
    type TEXT DEFAULT 'landing' CHECK (type IN ('landing', 'portfolio', 'ecommerce', 'blog', 'saas', 'agency', 'custom')),
    preview_url TEXT,
    thumbnail_url TEXT,
    tags TEXT[] DEFAULT '{}',
    components JSONB DEFAULT '{}',
    styles JSONB DEFAULT '{}',
    animations JSONB DEFAULT '{}',
    is_premium BOOLEAN DEFAULT FALSE,
    price DECIMAL DEFAULT 0,
    downloads INTEGER DEFAULT 0,
    rating DECIMAL DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collaboration sessions table
CREATE TABLE IF NOT EXISTS public.collaboration_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    session_name TEXT,
    participants JSONB DEFAULT '[]',
    permissions JSONB DEFAULT '{}',
    cursor_positions JSONB DEFAULT '{}',
    selections JSONB DEFAULT '{}',
    changes JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE
);

-- AI generations table (track AI usage)
CREATE TABLE IF NOT EXISTS public.ai_generations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('text', 'image', '3d_scene', 'animation', 'style', 'content', 'layout')),
    model TEXT NOT NULL,
    prompt TEXT NOT NULL,
    response JSONB NOT NULL,
    tokens_used INTEGER DEFAULT 0,
    cost DECIMAL DEFAULT 0,
    processing_time INTEGER DEFAULT 0, -- milliseconds
    status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics events table
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    event_type TEXT NOT NULL,
    event_data JSONB DEFAULT '{}',
    user_agent TEXT,
    ip_address INET,
    referrer TEXT,
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deployments table
CREATE TABLE IF NOT EXISTS public.deployments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('vercel', 'netlify', 'cloudflare', 'aws', 'firebase', 'github', 'custom')),
    url TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'building', 'deployed', 'failed')),
    build_logs TEXT,
    deployment_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deployed_at TIMESTAMP WITH TIME ZONE
);

-- Component library table
CREATE TABLE IF NOT EXISTS public.component_library (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT DEFAULT 'general' CHECK (category IN ('general', 'hero', 'section', 'card', 'form', 'navigation', 'footer', 'animation', '3d')),
    component_data JSONB NOT NULL,
    preview_url TEXT,
    thumbnail_url TEXT,
    tags TEXT[] DEFAULT '{}',
    is_premium BOOLEAN DEFAULT FALSE,
    downloads INTEGER DEFAULT 0,
    rating DECIMAL DEFAULT 0,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_owner_id ON public.projects(owner_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_scenes_project_id ON public.scenes(project_id);
CREATE INDEX IF NOT EXISTS idx_workflows_project_id ON public.workflows(project_id);
CREATE INDEX IF NOT EXISTS idx_ai_generations_user_id ON public.ai_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_generations_created_at ON public.ai_generations(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_project_id ON public.analytics_events(project_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at);

-- Row Level Security (RLS) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaboration_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.component_library ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Users can view own projects" ON public.projects FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Users can create projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete own projects" ON public.projects FOR DELETE USING (auth.uid() = owner_id);

-- Scenes policies
CREATE POLICY "Users can view project scenes" ON public.scenes FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = scenes.project_id AND owner_id = auth.uid())
);
CREATE POLICY "Users can create scenes" ON public.scenes FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.projects WHERE id = scenes.project_id AND owner_id = auth.uid())
);
CREATE POLICY "Users can update scenes" ON public.scenes FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = scenes.project_id AND owner_id = auth.uid())
);
CREATE POLICY "Users can delete scenes" ON public.scenes FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = scenes.project_id AND owner_id = auth.uid())
);

-- Templates are public for reading
CREATE POLICY "Anyone can view templates" ON public.templates FOR SELECT USING (true);
CREATE POLICY "Users can create templates" ON public.templates FOR INSERT WITH CHECK (auth.uid() = created_by);

-- AI generations policies
CREATE POLICY "Users can view own generations" ON public.ai_generations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create generations" ON public.ai_generations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Component library is public for reading
CREATE POLICY "Anyone can view components" ON public.component_library FOR SELECT USING (true);
CREATE POLICY "Users can create components" ON public.component_library FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scenes_updated_at BEFORE UPDATE ON public.scenes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON public.workflows FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON public.templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_collaboration_sessions_updated_at BEFORE UPDATE ON public.collaboration_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_deployments_updated_at BEFORE UPDATE ON public.deployments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_component_library_updated_at BEFORE UPDATE ON public.component_library FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample templates
INSERT INTO public.templates (name, description, category, type, components, styles, is_premium) VALUES
('Modern SaaS Landing', 'Clean, modern landing page perfect for SaaS products', 'saas', 'landing', '{"hero": {"type": "hero", "title": "Build Something Amazing", "subtitle": "The future of web development is here"}}', '{"colors": {"primary": "#6366f1", "secondary": "#ec4899"}, "fonts": {"heading": "Inter", "body": "Inter"}}', false),
('Portfolio Showcase', 'Elegant portfolio template with 3D elements', 'portfolio', 'portfolio', '{"hero": {"type": "hero", "title": "Creative Portfolio", "subtitle": "Showcasing amazing work"}}', '{"colors": {"primary": "#000000", "secondary": "#ffffff"}, "fonts": {"heading": "Playfair Display", "body": "Inter"}}', false),
('E-commerce Store', 'Complete e-commerce template with product showcase', 'ecommerce', 'ecommerce', '{"hero": {"type": "hero", "title": "Shop Now", "subtitle": "Discover amazing products"}}', '{"colors": {"primary": "#ff6b6b", "secondary": "#4ecdc4"}, "fonts": {"heading": "Montserrat", "body": "Open Sans"}}', true);

-- Insert sample components
INSERT INTO public.component_library (name, category, component_data, tags, is_premium) VALUES
('Gradient Hero', 'hero', '{"type": "hero", "variant": "gradient", "title": "Welcome", "subtitle": "Build amazing websites"}', ARRAY['hero', 'gradient', 'modern'], false),
('3D Card', 'card', '{"type": "card", "variant": "3d", "title": "Feature", "description": "Amazing feature"}', ARRAY['card', '3d', 'interactive'], false),
('Animated Button', 'general', '{"type": "button", "variant": "animated", "text": "Click Me"}', ARRAY['button', 'animation', 'interactive'], false);
