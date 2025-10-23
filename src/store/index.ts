import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: 'portfolio' | 'business' | 'ecommerce' | 'blog' | 'landing';
  status: 'draft' | 'published' | 'archived';
  ownerId: string;
  collaborators: string[];
  components: Component[];
  settings: ProjectSettings;
  createdAt: string;
  updatedAt: string;
}

export interface Component {
  id: string;
  type: string;
  name: string;
  props: Record<string, unknown>;
  children?: Component[];
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface ProjectSettings {
  theme: 'light' | 'dark' | 'auto';
  primaryColor: string;
  fontFamily: string;
  responsive: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface Scene3D {
  id: string;
  name: string;
  objects: SceneObject[];
  settings: SceneSettings;
  createdAt: string;
  updatedAt: string;
}

export interface SceneObject {
  id: string;
  type: 'box' | 'sphere' | 'cylinder' | 'cone' | 'torus' | 'octahedron' | 'plane' | 'text';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  material: 'standard' | 'glass' | 'metal' | 'emissive';
  autoRotate: boolean;
  text?: string;
  fontSize?: number;
  height?: number;
}

export interface SceneSettings {
  showGrid: boolean;
  showLights: boolean;
  environment: string;
  fog: boolean;
  fogColor: string;
  fogDensity: number;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  status: 'draft' | 'active' | 'completed' | 'paused';
  estimatedTime: number;
  difficulty: 'low' | 'medium' | 'high';
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  duration: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  dependencies: string[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  components: Component[];
  price: number;
  authorId: string;
  rating: number;
  downloads: number;
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CollaborationSession {
  id: string;
  projectId: string;
  participants: CollaborationParticipant[];
  activeUsers: string[];
  cursors: Record<string, { x: number; y: number; userId: string }>;
  selections: Record<string, string[]>;
  lastActivity: string;
}

export interface CollaborationParticipant {
  userId: string;
  name: string;
  avatar?: string;
  role: 'owner' | 'editor' | 'viewer';
  isOnline: boolean;
  lastSeen: string;
}

// State interface
interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Projects state
  projects: Project[];
  currentProject: Project | null;
  projectHistory: Project[];
  
  // 3D Scenes state
  scenes: Scene3D[];
  currentScene: Scene3D | null;
  sceneHistory: Scene3D[];
  
  // Workflows state
  workflows: Workflow[];
  activeWorkflow: Workflow | null;
  workflowHistory: Workflow[];
  
  // Templates state
  templates: Template[];
  featuredTemplates: Template[];
  
  // Collaboration state
  collaborationSession: CollaborationSession | null;
  isCollaborating: boolean;
  onlineUsers: CollaborationParticipant[];
  
  // UI state
  sidebarOpen: boolean;
  activeTab: string;
  notifications: Notification[];
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  
  // Project actions
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (project: Project | null) => void;
  duplicateProject: (id: string) => void;
  
  // Scene actions
  addScene: (scene: Scene3D) => void;
  updateScene: (id: string, updates: Partial<Scene3D>) => void;
  deleteScene: (id: string) => void;
  setCurrentScene: (scene: Scene3D | null) => void;
  duplicateScene: (id: string) => void;
  
  // Workflow actions
  addWorkflow: (workflow: Workflow) => void;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void;
  deleteWorkflow: (id: string) => void;
  setActiveWorkflow: (workflow: Workflow | null) => void;
  startWorkflow: (id: string) => void;
  pauseWorkflow: (id: string) => void;
  completeWorkflow: (id: string) => void;
  
  // Template actions
  addTemplate: (template: Template) => void;
  updateTemplate: (id: string, updates: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  setFeaturedTemplates: (templates: Template[]) => void;
  
  // Collaboration actions
  joinSession: (session: CollaborationSession) => void;
  leaveSession: () => void;
  updateCursor: (userId: string, x: number, y: number) => void;
  updateSelection: (userId: string, selection: string[]) => void;
  addParticipant: (participant: CollaborationParticipant) => void;
  removeParticipant: (userId: string) => void;
  
  // UI actions
  setSidebarOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Utility actions
  reset: () => void;
  exportState: () => string;
  importState: (state: string) => void;
}

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  projects: [],
  currentProject: null,
  projectHistory: [],
  scenes: [],
  currentScene: null,
  sceneHistory: [],
  workflows: [],
  activeWorkflow: null,
  workflowHistory: [],
  templates: [],
  featuredTemplates: [],
  collaborationSession: null,
  isCollaborating: false,
  onlineUsers: [],
  sidebarOpen: true,
  activeTab: 'projects',
  notifications: [],
};

// Create store with persistence and immer
export const useAppStore = create<AppState>()(
  persist(
    immer((set, get) => ({
      ...initialState,
      
      // User actions
      setUser: (user) => set((state) => {
        state.user = user;
      }),
      
      setAuthenticated: (isAuthenticated) => set((state) => {
        state.isAuthenticated = isAuthenticated;
      }),
      
      setLoading: (isLoading) => set((state) => {
        state.isLoading = isLoading;
      }),
      
      // Project actions
      addProject: (project) => set((state) => {
        state.projects.push(project);
        state.projectHistory.push(project);
      }),
      
      updateProject: (id, updates) => set((state) => {
        const index = state.projects.findIndex(p => p.id === id);
        if (index !== -1) {
          Object.assign(state.projects[index], updates);
          state.projects[index].updatedAt = new Date().toISOString();
        }
        
        if (state.currentProject?.id === id) {
          Object.assign(state.currentProject, updates);
          state.currentProject.updatedAt = new Date().toISOString();
        }
      }),
      
      deleteProject: (id) => set((state) => {
        state.projects = state.projects.filter(p => p.id !== id);
        if (state.currentProject?.id === id) {
          state.currentProject = null;
        }
      }),
      
      setCurrentProject: (project) => set((state) => {
        state.currentProject = project;
        if (project) {
          state.projectHistory.unshift(project);
          // Keep only last 10 projects in history
          if (state.projectHistory.length > 10) {
            state.projectHistory = state.projectHistory.slice(0, 10);
          }
        }
      }),
      
      duplicateProject: (id) => set((state) => {
        const project = state.projects.find(p => p.id === id);
        if (project) {
          const duplicated = {
            ...project,
            id: Date.now().toString(),
            name: `${project.name} (Copy)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          state.projects.push(duplicated);
        }
      }),
      
      // Scene actions
      addScene: (scene) => set((state) => {
        state.scenes.push(scene);
        state.sceneHistory.push(scene);
      }),
      
      updateScene: (id, updates) => set((state) => {
        const index = state.scenes.findIndex(s => s.id === id);
        if (index !== -1) {
          Object.assign(state.scenes[index], updates);
          state.scenes[index].updatedAt = new Date().toISOString();
        }
        
        if (state.currentScene?.id === id) {
          Object.assign(state.currentScene, updates);
          state.currentScene.updatedAt = new Date().toISOString();
        }
      }),
      
      deleteScene: (id) => set((state) => {
        state.scenes = state.scenes.filter(s => s.id !== id);
        if (state.currentScene?.id === id) {
          state.currentScene = null;
        }
      }),
      
      setCurrentScene: (scene) => set((state) => {
        state.currentScene = scene;
        if (scene) {
          state.sceneHistory.unshift(scene);
          // Keep only last 10 scenes in history
          if (state.sceneHistory.length > 10) {
            state.sceneHistory = state.sceneHistory.slice(0, 10);
          }
        }
      }),
      
      duplicateScene: (id) => set((state) => {
        const scene = state.scenes.find(s => s.id === id);
        if (scene) {
          const duplicated = {
            ...scene,
            id: Date.now().toString(),
            name: `${scene.name} (Copy)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          state.scenes.push(duplicated);
        }
      }),
      
      // Workflow actions
      addWorkflow: (workflow) => set((state) => {
        state.workflows.push(workflow);
        state.workflowHistory.push(workflow);
      }),
      
      updateWorkflow: (id, updates) => set((state) => {
        const index = state.workflows.findIndex(w => w.id === id);
        if (index !== -1) {
          Object.assign(state.workflows[index], updates);
          state.workflows[index].updatedAt = new Date().toISOString();
        }
        
        if (state.activeWorkflow?.id === id) {
          Object.assign(state.activeWorkflow, updates);
          state.activeWorkflow.updatedAt = new Date().toISOString();
        }
      }),
      
      deleteWorkflow: (id) => set((state) => {
        state.workflows = state.workflows.filter(w => w.id !== id);
        if (state.activeWorkflow?.id === id) {
          state.activeWorkflow = null;
        }
      }),
      
      setActiveWorkflow: (workflow) => set((state) => {
        state.activeWorkflow = workflow;
        if (workflow) {
          state.workflowHistory.unshift(workflow);
          // Keep only last 10 workflows in history
          if (state.workflowHistory.length > 10) {
            state.workflowHistory = state.workflowHistory.slice(0, 10);
          }
        }
      }),
      
      startWorkflow: (id) => set((state) => {
        const workflow = state.workflows.find(w => w.id === id);
        if (workflow) {
          workflow.status = 'active';
          state.activeWorkflow = workflow;
        }
      }),
      
      pauseWorkflow: (id) => set((state) => {
        const workflow = state.workflows.find(w => w.id === id);
        if (workflow) {
          workflow.status = 'paused';
        }
        if (state.activeWorkflow?.id === id) {
          state.activeWorkflow = null;
        }
      }),
      
      completeWorkflow: (id) => set((state) => {
        const workflow = state.workflows.find(w => w.id === id);
        if (workflow) {
          workflow.status = 'completed';
        }
        if (state.activeWorkflow?.id === id) {
          state.activeWorkflow = null;
        }
      }),
      
      // Template actions
      addTemplate: (template) => set((state) => {
        state.templates.push(template);
      }),
      
      updateTemplate: (id, updates) => set((state) => {
        const index = state.templates.findIndex(t => t.id === id);
        if (index !== -1) {
          Object.assign(state.templates[index], updates);
          state.templates[index].updatedAt = new Date().toISOString();
        }
      }),
      
      deleteTemplate: (id) => set((state) => {
        state.templates = state.templates.filter(t => t.id !== id);
        state.featuredTemplates = state.featuredTemplates.filter(t => t.id !== id);
      }),
      
      setFeaturedTemplates: (templates) => set((state) => {
        state.featuredTemplates = templates;
      }),
      
      // Collaboration actions
      joinSession: (session) => set((state) => {
        state.collaborationSession = session;
        state.isCollaborating = true;
        state.onlineUsers = session.participants;
      }),
      
      leaveSession: () => set((state) => {
        state.collaborationSession = null;
        state.isCollaborating = false;
        state.onlineUsers = [];
      }),
      
      updateCursor: (userId, x, y) => set((state) => {
        if (state.collaborationSession) {
          state.collaborationSession.cursors[userId] = { x, y, userId };
          state.collaborationSession.lastActivity = new Date().toISOString();
        }
      }),
      
      updateSelection: (userId, selection) => set((state) => {
        if (state.collaborationSession) {
          state.collaborationSession.selections[userId] = selection;
          state.collaborationSession.lastActivity = new Date().toISOString();
        }
      }),
      
      addParticipant: (participant) => set((state) => {
        state.onlineUsers.push(participant);
        if (state.collaborationSession) {
          state.collaborationSession.participants.push(participant);
        }
      }),
      
      removeParticipant: (userId) => set((state) => {
        state.onlineUsers = state.onlineUsers.filter(p => p.userId !== userId);
        if (state.collaborationSession) {
          state.collaborationSession.participants = state.collaborationSession.participants.filter(p => p.userId !== userId);
          delete state.collaborationSession.cursors[userId];
          delete state.collaborationSession.selections[userId];
        }
      }),
      
      // UI actions
      setSidebarOpen: (open) => set((state) => {
        state.sidebarOpen = open;
      }),
      
      setActiveTab: (tab) => set((state) => {
        state.activeTab = tab;
      }),
      
      addNotification: (notification) => set((state) => {
        state.notifications.push(notification);
      }),
      
      removeNotification: (id) => set((state) => {
        state.notifications = state.notifications.filter(n => n.id !== id);
      }),
      
      clearNotifications: () => set((state) => {
        state.notifications = [];
      }),
      
      // Utility actions
      reset: () => set((state) => {
        Object.assign(state, initialState);
      }),
      
      exportState: () => {
        const state = get();
        return JSON.stringify({
          projects: state.projects,
          scenes: state.scenes,
          workflows: state.workflows,
          templates: state.templates,
        }, null, 2);
      },
      
      importState: (stateString) => set((state) => {
        try {
          const importedState = JSON.parse(stateString);
          if (importedState.projects) state.projects = importedState.projects;
          if (importedState.scenes) state.scenes = importedState.scenes;
          if (importedState.workflows) state.workflows = importedState.workflows;
          if (importedState.templates) state.templates = importedState.templates;
        } catch (error) {
          console.error('Failed to import state:', error);
        }
      }),
    })),
    {
      name: 'maya-web-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        projects: state.projects,
        scenes: state.scenes,
        workflows: state.workflows,
        templates: state.templates,
        sidebarOpen: state.sidebarOpen,
        activeTab: state.activeTab,
      }),
    }
  )
);

// Selectors for better performance
export const useUser = () => useAppStore((state) => state.user);
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated);
export const useProjects = () => useAppStore((state) => state.projects);
export const useCurrentProject = () => useAppStore((state) => state.currentProject);
export const useScenes = () => useAppStore((state) => state.scenes);
export const useCurrentScene = () => useAppStore((state) => state.currentScene);
export const useWorkflows = () => useAppStore((state) => state.workflows);
export const useActiveWorkflow = () => useAppStore((state) => state.activeWorkflow);
export const useTemplates = () => useAppStore((state) => state.templates);
export const useCollaboration = () => useAppStore((state) => ({
  session: state.collaborationSession,
  isCollaborating: state.isCollaborating,
  onlineUsers: state.onlineUsers,
}));

// Action hooks
export const useProjectActions = () => useAppStore((state) => ({
  addProject: state.addProject,
  updateProject: state.updateProject,
  deleteProject: state.deleteProject,
  setCurrentProject: state.setCurrentProject,
  duplicateProject: state.duplicateProject,
}));

export const useSceneActions = () => useAppStore((state) => ({
  addScene: state.addScene,
  updateScene: state.updateScene,
  deleteScene: state.deleteScene,
  setCurrentScene: state.setCurrentScene,
  duplicateScene: state.duplicateScene,
}));

export const useWorkflowActions = () => useAppStore((state) => ({
  addWorkflow: state.addWorkflow,
  updateWorkflow: state.updateWorkflow,
  deleteWorkflow: state.deleteWorkflow,
  setActiveWorkflow: state.setActiveWorkflow,
  startWorkflow: state.startWorkflow,
  pauseWorkflow: state.pauseWorkflow,
  completeWorkflow: state.completeWorkflow,
}));

export const useCollaborationActions = () => useAppStore((state) => ({
  joinSession: state.joinSession,
  leaveSession: state.leaveSession,
  updateCursor: state.updateCursor,
  updateSelection: state.updateSelection,
  addParticipant: state.addParticipant,
  removeParticipant: state.removeParticipant,
}));

export const useUIActions = () => useAppStore((state) => ({
  setSidebarOpen: state.setSidebarOpen,
  setActiveTab: state.setActiveTab,
  addNotification: state.addNotification,
  removeNotification: state.removeNotification,
  clearNotifications: state.clearNotifications,
}));
