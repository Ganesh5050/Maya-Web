import { createClient } from '@supabase/supabase-js';

// Supabase configuration - Maya Web Project
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar_url?: string;
          plan: 'free' | 'pro' | 'enterprise';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          avatar_url?: string;
          plan?: 'free' | 'pro' | 'enterprise';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          avatar_url?: string;
          plan?: 'free' | 'pro' | 'enterprise';
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          name: string;
          description: string;
          type: 'portfolio' | 'business' | 'ecommerce' | 'blog' | 'landing';
          status: 'draft' | 'published' | 'archived';
          owner_id: string;
          collaborators: string[];
          components: Record<string, unknown>;
          settings: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          description: string;
          type: 'portfolio' | 'business' | 'ecommerce' | 'blog' | 'landing';
          status?: 'draft' | 'published' | 'archived';
          owner_id: string;
          collaborators?: string[];
          components?: Record<string, unknown>;
          settings?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          type?: 'portfolio' | 'business' | 'ecommerce' | 'blog' | 'landing';
          status?: 'draft' | 'published' | 'archived';
          owner_id?: string;
          collaborators?: string[];
          components?: Record<string, unknown>;
          settings?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
      };
      scenes: {
        Row: {
          id: string;
          name: string;
          objects: Record<string, unknown>;
          settings: Record<string, unknown>;
          owner_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          objects?: Record<string, unknown>;
          settings?: Record<string, unknown>;
          owner_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          objects?: Record<string, unknown>;
          settings?: Record<string, unknown>;
          owner_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      workflows: {
        Row: {
          id: string;
          name: string;
          description: string;
          steps: Record<string, unknown>;
          status: 'draft' | 'active' | 'completed' | 'paused';
          estimated_time: number;
          difficulty: 'low' | 'medium' | 'high';
          category: string;
          owner_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          description: string;
          steps?: Record<string, unknown>;
          status?: 'draft' | 'active' | 'completed' | 'paused';
          estimated_time: number;
          difficulty: 'low' | 'medium' | 'high';
          category: string;
          owner_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          steps?: Record<string, unknown>;
          status?: 'draft' | 'active' | 'completed' | 'paused';
          estimated_time?: number;
          difficulty?: 'low' | 'medium' | 'high';
          category?: string;
          owner_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      templates: {
        Row: {
          id: string;
          name: string;
          description: string;
          category: string;
          preview_url: string;
          components: Record<string, unknown>;
          price: number;
          author_id: string;
          rating: number;
          downloads: number;
          tags: string[];
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          description: string;
          category: string;
          preview_url?: string;
          components?: Record<string, unknown>;
          price?: number;
          author_id: string;
          rating?: number;
          downloads?: number;
          tags?: string[];
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          category?: string;
          preview_url?: string;
          components?: Record<string, unknown>;
          price?: number;
          author_id?: string;
          rating?: number;
          downloads?: number;
          tags?: string[];
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      collaboration_sessions: {
        Row: {
          id: string;
          project_id: string;
          participants: Record<string, unknown>;
          active_users: string[];
          cursors: Record<string, unknown>;
          selections: Record<string, unknown>;
          last_activity: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          project_id: string;
          participants?: Record<string, unknown>;
          active_users?: string[];
          cursors?: Record<string, unknown>;
          selections?: Record<string, unknown>;
          last_activity?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          participants?: Record<string, unknown>;
          active_users?: string[];
          cursors?: Record<string, unknown>;
          selections?: Record<string, unknown>;
          last_activity?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Database service class
export class DatabaseService {
  // User operations
  static async createUser(userData: Database['public']['Tables']['users']['Insert']) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getUser(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateUser(id: string, updates: Database['public']['Tables']['users']['Update']) {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Project operations
  static async createProject(projectData: Database['public']['Tables']['projects']['Insert']) {
    const { data, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getProjects(ownerId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('owner_id', ownerId)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async getProject(id: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateProject(id: string, updates: Database['public']['Tables']['projects']['Update']) {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteProject(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Scene operations
  static async createScene(sceneData: Database['public']['Tables']['scenes']['Insert']) {
    const { data, error } = await supabase
      .from('scenes')
      .insert(sceneData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getScenes(ownerId: string) {
    const { data, error } = await supabase
      .from('scenes')
      .select('*')
      .eq('owner_id', ownerId)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async getScene(id: string) {
    const { data, error } = await supabase
      .from('scenes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateScene(id: string, updates: Database['public']['Tables']['scenes']['Update']) {
    const { data, error } = await supabase
      .from('scenes')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteScene(id: string) {
    const { error } = await supabase
      .from('scenes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Workflow operations
  static async createWorkflow(workflowData: Database['public']['Tables']['workflows']['Insert']) {
    const { data, error } = await supabase
      .from('workflows')
      .insert(workflowData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getWorkflows(ownerId: string) {
    const { data, error } = await supabase
      .from('workflows')
      .select('*')
      .eq('owner_id', ownerId)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async getWorkflow(id: string) {
    const { data, error } = await supabase
      .from('workflows')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateWorkflow(id: string, updates: Database['public']['Tables']['workflows']['Update']) {
    const { data, error } = await supabase
      .from('workflows')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteWorkflow(id: string) {
    const { error } = await supabase
      .from('workflows')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Template operations
  static async createTemplate(templateData: Database['public']['Tables']['templates']['Insert']) {
    const { data, error } = await supabase
      .from('templates')
      .insert(templateData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getTemplates(category?: string) {
    let query = supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data;
  }

  static async getFeaturedTemplates() {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('featured', true)
      .order('rating', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async getTemplate(id: string) {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateTemplate(id: string, updates: Database['public']['Tables']['templates']['Update']) {
    const { data, error } = await supabase
      .from('templates')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteTemplate(id: string) {
    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Collaboration operations
  static async createCollaborationSession(sessionData: Database['public']['Tables']['collaboration_sessions']['Insert']) {
    const { data, error } = await supabase
      .from('collaboration_sessions')
      .insert(sessionData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getCollaborationSession(projectId: string) {
    const { data, error } = await supabase
      .from('collaboration_sessions')
      .select('*')
      .eq('project_id', projectId)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateCollaborationSession(id: string, updates: Database['public']['Tables']['collaboration_sessions']['Update']) {
    const { data, error } = await supabase
      .from('collaboration_sessions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteCollaborationSession(id: string) {
    const { error } = await supabase
      .from('collaboration_sessions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Real-time subscriptions
  static subscribeToProjects(ownerId: string, callback: (payload: Record<string, unknown>) => void) {
    return supabase
      .channel('projects')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'projects',
        filter: `owner_id=eq.${ownerId}`,
      }, callback)
      .subscribe();
  }

  static subscribeToScenes(ownerId: string, callback: (payload: Record<string, unknown>) => void) {
    return supabase
      .channel('scenes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'scenes',
        filter: `owner_id=eq.${ownerId}`,
      }, callback)
      .subscribe();
  }

  static subscribeToWorkflows(ownerId: string, callback: (payload: Record<string, unknown>) => void) {
    return supabase
      .channel('workflows')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'workflows',
        filter: `owner_id=eq.${ownerId}`,
      }, callback)
      .subscribe();
  }

  static subscribeToCollaboration(projectId: string, callback: (payload: Record<string, unknown>) => void) {
    return supabase
      .channel('collaboration')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'collaboration_sessions',
        filter: `project_id=eq.${projectId}`,
      }, callback)
      .subscribe();
  }
}

// Export types
export type User = Database['public']['Tables']['users']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];
export type Scene = Database['public']['Tables']['scenes']['Row'];
export type Workflow = Database['public']['Tables']['workflows']['Row'];
export type Template = Database['public']['Tables']['templates']['Row'];
export type CollaborationSession = Database['public']['Tables']['collaboration_sessions']['Row'];
