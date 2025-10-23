// Maya-Web Frontend API Client
// Connects to the backend server for all AI operations

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for AI operations
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('supabase.auth.token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('supabase.auth.token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Service Classes
export class AIAPIService {
  // Generate text content
  static async generateText(prompt: string, type: 'text' | 'code' | 'research' | 'analysis' = 'text', projectId?: string) {
    try {
      const response = await apiClient.post('/ai/generate-text', {
        prompt,
        type,
        projectId
      });
      return response.data;
    } catch (error) {
      console.error('Text generation failed:', error);
      throw error;
    }
  }

  // Generate images
  static async generateImage(prompt: string, projectId?: string) {
    try {
      const response = await apiClient.post('/ai/generate-image', {
        prompt,
        projectId
      });
      return response.data;
    } catch (error) {
      console.error('Image generation failed:', error);
      throw error;
    }
  }

  // Generate 3D scenes
  static async generate3DScene(prompt: string, projectId: string, sceneType: string = 'hero') {
    try {
      const response = await apiClient.post('/ai/generate-3d-scene', {
        prompt,
        projectId,
        sceneType
      });
      return response.data;
    } catch (error) {
      console.error('3D scene generation failed:', error);
      throw error;
    }
  }

  // Generate animations
  static async generateAnimation(prompt: string, projectId: string, elementId: string) {
    try {
      const response = await apiClient.post('/ai/generate-animation', {
        prompt,
        projectId,
        elementId
      });
      return response.data;
    } catch (error) {
      console.error('Animation generation failed:', error);
      throw error;
    }
  }

  // Apply neural style transformation
  static async applyStyle(projectId: string, styleName: string, elements: any[]) {
    try {
      const response = await apiClient.post('/ai/apply-style', {
        projectId,
        styleName,
        elements
      });
      return response.data;
    } catch (error) {
      console.error('Style application failed:', error);
      throw error;
    }
  }
}

export class ProjectAPIService {
  // Create new project
  static async createProject(name: string, description: string, type: string = 'landing') {
    try {
      const response = await apiClient.post('/projects', {
        name,
        description,
        type
      });
      return response.data;
    } catch (error) {
      console.error('Project creation failed:', error);
      throw error;
    }
  }

  // Get user projects
  static async getProjects(page: number = 1, limit: number = 10, status?: string) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status })
      });
      
      const response = await apiClient.get(`/projects?${params}`);
      return response.data;
    } catch (error) {
      console.error('Projects fetch failed:', error);
      throw error;
    }
  }

  // Update project
  static async updateProject(projectId: string, updates: any) {
    try {
      const response = await apiClient.put(`/projects/${projectId}`, updates);
      return response.data;
    } catch (error) {
      console.error('Project update failed:', error);
      throw error;
    }
  }

  // Delete project
  static async deleteProject(projectId: string) {
    try {
      const response = await apiClient.delete(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Project deletion failed:', error);
      throw error;
    }
  }
}

export class TemplateAPIService {
  // Get templates
  static async getTemplates(category?: string, type?: string, premium?: boolean, page: number = 1, limit: number = 20) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(category && { category }),
        ...(type && { type }),
        ...(premium !== undefined && { premium: premium.toString() })
      });
      
      const response = await apiClient.get(`/templates?${params}`);
      return response.data;
    } catch (error) {
      console.error('Templates fetch failed:', error);
      throw error;
    }
  }

  // Use template
  static async useTemplate(templateId: string, projectId: string) {
    try {
      const response = await apiClient.post(`/templates/${templateId}/use`, {
        projectId
      });
      return response.data;
    } catch (error) {
      console.error('Template use failed:', error);
      throw error;
    }
  }
}

export class DeploymentAPIService {
  // Get all supported platforms
  static async getPlatforms() {
    try {
      const response = await apiClient.get('/deployment/platforms');
      return response.data;
    } catch (error) {
      // Only log error if it's not a connection refused (server not running)
      if (error.code !== 'ERR_NETWORK' && error.message !== 'Network Error') {
        console.error('Failed to fetch platforms:', error);
      }
      // Return mock platforms for development
      return {
        success: true,
        platforms: [
          { 
            id: 'vercel', 
            name: 'Vercel', 
            icon: '▲', 
            color: '#000',
            features: ['Instant Deploy', 'Edge Functions', 'Analytics'],
            pricing: 'freemium',
            supportedFormats: ['React', 'Next.js', 'Static']
          },
          { 
            id: 'netlify', 
            name: 'Netlify', 
            icon: 'N', 
            color: '#00C7B7',
            features: ['Git Integration', 'Form Handling', 'Edge Functions'],
            pricing: 'freemium',
            supportedFormats: ['React', 'Vue', 'Static']
          },
          { 
            id: 'cloudflare', 
            name: 'Cloudflare Pages', 
            icon: '☁️', 
            color: '#F38020',
            features: ['Global CDN', 'DDoS Protection', 'Workers'],
            pricing: 'freemium',
            supportedFormats: ['React', 'Angular', 'Static']
          },
          { 
            id: 'github', 
            name: 'GitHub Pages', 
            icon: '🐙', 
            color: '#333',
            features: ['GitHub Integration', 'Custom Domains', 'HTTPS'],
            pricing: 'free',
            supportedFormats: ['Jekyll', 'Static', 'React']
          },
          { 
            id: 'firebase', 
            name: 'Firebase Hosting', 
            icon: '🔥', 
            color: '#FFCA28',
            features: ['Real-time DB', 'Authentication', 'Cloud Functions'],
            pricing: 'freemium',
            supportedFormats: ['React', 'Vue', 'Angular']
          },
          { 
            id: 'aws', 
            name: 'AWS Amplify', 
            icon: '☁️', 
            color: '#FF9900',
            features: ['Serverless', 'CI/CD', 'Backend Services'],
            pricing: 'paid',
            supportedFormats: ['React', 'Vue', 'Angular']
          }
        ]
      };
    }
  }

  // Get platform recommendations
  static async getPlatformRecommendations(projectType: string) {
    try {
      const response = await apiClient.get(`/deployment/platforms/recommendations/${projectType}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get recommendations:', error);
      throw error;
    }
  }

  // Deploy project to single platform
  static async deployProject(projectId: string, platform: string = 'vercel', customDomain?: string, environmentVariables?: Record<string, string>) {
    try {
      const response = await apiClient.post('/deployment/deploy', {
        projectId,
        platform,
        customDomain,
        environmentVariables
      });
      return response.data;
    } catch (error) {
      console.error('Deployment failed:', error);
      throw error;
    }
  }

  // Deploy to multiple platforms
  static async deployToMultiplePlatforms(data: {
    projectId: string;
    platforms: string[];
    customDomain?: string;
    environmentVariables?: Record<string, string>;
  }) {
    try {
      const response = await apiClient.post('/deployment/deploy/multiple', data);
      return response.data;
    } catch (error) {
      console.error('Multiple deployment failed:', error);
      throw error;
    }
  }

  // Get deployment status
  static async getDeploymentStatus(deploymentId: string) {
    try {
      const response = await apiClient.get(`/deployment/status/${deploymentId}`);
      return response.data;
    } catch (error) {
      console.error('Deployment status fetch failed:', error);
      throw error;
    }
  }

  // Get all deployments for a project
  static async getProjectDeployments(projectId: string) {
    try {
      const response = await apiClient.get(`/deployment/project/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Project deployments fetch failed:', error);
      throw error;
    }
  }

  // Cancel deployment
  static async cancelDeployment(deploymentId: string) {
    try {
      const response = await apiClient.post(`/deployment/cancel/${deploymentId}`);
      return response.data;
    } catch (error) {
      console.error('Cancel deployment failed:', error);
      throw error;
    }
  }

  // Rollback deployment
  static async rollbackDeployment(deploymentId: string) {
    try {
      const response = await apiClient.post(`/deployment/rollback/${deploymentId}`);
      return response.data;
    } catch (error) {
      console.error('Rollback deployment failed:', error);
      throw error;
    }
  }

  // Get deployment logs
  static async getDeploymentLogs(deploymentId: string) {
    try {
      const response = await apiClient.get(`/deployment/logs/${deploymentId}`);
      return response.data;
    } catch (error) {
      console.error('Deployment logs fetch failed:', error);
      throw error;
    }
  }

  // Get all active deployments
  static async getActiveDeployments() {
    try {
      const response = await apiClient.get('/deployment/active');
      return response.data;
    } catch (error) {
      // Only log error if it's not a connection refused (server not running)
      if (error.code !== 'ERR_NETWORK' && error.message !== 'Network Error') {
        console.error('Active deployments fetch failed:', error);
      }
      // Return mock data for development
      return {
        success: true,
        deployments: [
          {
            id: 'mock-1',
            projectId: 'demo-project',
            platform: 'vercel',
            url: 'https://maya-web-demo.vercel.app',
            status: 'deployed',
            createdAt: new Date().toISOString(),
            deployedAt: new Date().toISOString()
          }
        ]
      };
    }
  }
}

export class AnalyticsAPIService {
  // Track analytics event
  static async trackEvent(projectId: string, eventType: string, eventData: any) {
    try {
      const response = await apiClient.post('/analytics/track', {
        projectId,
        eventType,
        eventData
      });
      return response.data;
    } catch (error) {
      console.error('Analytics tracking failed:', error);
      throw error;
    }
  }

  // Get project analytics
  static async getProjectAnalytics(projectId: string) {
    try {
      const response = await apiClient.get(`/analytics/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Analytics fetch failed:', error);
      throw error;
    }
  }
}

// Health check
export const checkAPIHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.error('API health check failed:', error);
    return { success: false, error: 'API unavailable' };
  }
};

// Export the API client for custom requests
export { apiClient };

// Export all services
export default {
  AI: AIAPIService,
  Project: ProjectAPIService,
  Template: TemplateAPIService,
  Deployment: DeploymentAPIService,
  Analytics: AnalyticsAPIService,
  healthCheck: checkAPIHealth
};
