import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { supabase } from './supabase';
import { useAppStore } from '../store';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.maya-web.com';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Request/Response types
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
}

// API Client class
export class ApiClient {
  private client: AxiosInstance;
  private retryCount = 0;
  private maxRetries = 3;

  constructor(baseURL: string = API_BASE_URL) {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        // Add auth token
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          config.headers.Authorization = `Bearer ${session.access_token}`;
        }

        // Add request ID for tracking
        config.headers['X-Request-ID'] = this.generateRequestId();

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        this.retryCount = 0;
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const { data: { session } } = await supabase.auth.refreshSession();
            if (session?.access_token) {
              originalRequest.headers.Authorization = `Bearer ${session.access_token}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            // Redirect to login or handle auth error
            useAppStore.getState().setUser(null);
            useAppStore.getState().setAuthenticated(false);
            return Promise.reject(refreshError);
          }
        }

        // Handle rate limiting
        if (error.response?.status === 429 && this.retryCount < this.maxRetries) {
          this.retryCount++;
          const delay = Math.pow(2, this.retryCount) * 1000; // Exponential backoff
          
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.client(originalRequest);
        }

        return Promise.reject(this.formatError(error));
      }
    );
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private formatError(error: Record<string, unknown>): ApiError {
    if (error.response) {
      return {
        message: error.response.data?.message || error.message,
        code: error.response.data?.code,
        status: error.response.status,
        details: error.response.data?.details,
      };
    } else if (error.request) {
      return {
        message: 'Network error - please check your connection',
        code: 'NETWORK_ERROR',
      };
    } else {
      return {
        message: error.message || 'An unexpected error occurred',
        code: 'UNKNOWN_ERROR',
      };
    }
  }

  // Generic HTTP methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get(url, config);
    return this.formatResponse(response);
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post(url, data, config);
    return this.formatResponse(response);
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put(url, data, config);
    return this.formatResponse(response);
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.patch(url, data, config);
    return this.formatResponse(response);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete(url, config);
    return this.formatResponse(response);
  }

  private formatResponse<T>(response: AxiosResponse): ApiResponse<T> {
    return {
      data: response.data,
      success: true,
    };
  }
}

// Service classes
export class ProjectService {
  private api: ApiClient;

  constructor(apiClient: ApiClient) {
    this.api = apiClient;
  }

  async createProject(projectData: Record<string, unknown>) {
    return this.api.post('/projects', projectData);
  }

  async getProjects(params?: { page?: number; limit?: number; type?: string }) {
    return this.api.get('/projects', { params });
  }

  async getProject(id: string) {
    return this.api.get(`/projects/${id}`);
  }

  async updateProject(id: string, updates: Record<string, unknown>) {
    return this.api.patch(`/projects/${id}`, updates);
  }

  async deleteProject(id: string) {
    return this.api.delete(`/projects/${id}`);
  }

  async duplicateProject(id: string) {
    return this.api.post(`/projects/${id}/duplicate`);
  }

  async publishProject(id: string) {
    return this.api.post(`/projects/${id}/publish`);
  }

  async exportProject(id: string, format: 'react' | 'nextjs' | 'static') {
    return this.api.post(`/projects/${id}/export`, { format });
  }
}

export class TemplateService {
  private api: ApiClient;

  constructor(apiClient: ApiClient) {
    this.api = apiClient;
  }

  async getTemplates(params?: { category?: string; featured?: boolean; page?: number; limit?: number }) {
    return this.api.get('/templates', { params });
  }

  async getTemplate(id: string) {
    return this.api.get(`/templates/${id}`);
  }

  async createTemplate(templateData: Record<string, unknown>) {
    return this.api.post('/templates', templateData);
  }

  async updateTemplate(id: string, updates: Record<string, unknown>) {
    return this.api.patch(`/templates/${id}`, updates);
  }

  async deleteTemplate(id: string) {
    return this.api.delete(`/templates/${id}`);
  }

  async downloadTemplate(id: string) {
    return this.api.post(`/templates/${id}/download`);
  }

  async rateTemplate(id: string, rating: number) {
    return this.api.post(`/templates/${id}/rate`, { rating });
  }
}

export class AIService {
  private api: ApiClient;

  constructor(apiClient: ApiClient) {
    this.api = apiClient;
  }

  async generateWebsite(prompt: string, options?: {
    type?: string;
    style?: string;
    components?: string[];
    aiModel?: 'gpt-4' | 'gemini-pro';
  }) {
    return this.api.post('/ai/generate-website', {
      prompt,
      ...options,
    });
  }

  async generateComponent(prompt: string, type: string) {
    return this.api.post('/ai/generate-component', {
      prompt,
      type,
    });
  }

  async optimizeCode(code: string, type: 'performance' | 'accessibility' | 'seo') {
    return this.api.post('/ai/optimize-code', {
      code,
      type,
    });
  }

  async analyzeDesign(imageUrl: string) {
    return this.api.post('/ai/analyze-design', {
      imageUrl,
    });
  }

  async generateContent(topic: string, type: 'blog' | 'product' | 'landing') {
    return this.api.post('/ai/generate-content', {
      topic,
      type,
    });
  }

  async suggestImprovements(projectId: string) {
    return this.api.post(`/ai/suggest-improvements/${projectId}`);
  }
}

export class SceneService {
  private api: ApiClient;

  constructor(apiClient: ApiClient) {
    this.api = apiClient;
  }

  async createScene(sceneData: Record<string, unknown>) {
    return this.api.post('/scenes', sceneData);
  }

  async getScenes(params?: { page?: number; limit?: number }) {
    return this.api.get('/scenes', { params });
  }

  async getScene(id: string) {
    return this.api.get(`/scenes/${id}`);
  }

  async updateScene(id: string, updates: Record<string, unknown>) {
    return this.api.patch(`/scenes/${id}`, updates);
  }

  async deleteScene(id: string) {
    return this.api.delete(`/scenes/${id}`);
  }

  async exportScene(id: string, format: 'gltf' | 'obj' | 'threejs') {
    return this.api.post(`/scenes/${id}/export`, { format });
  }
}

export class WorkflowService {
  private api: ApiClient;

  constructor(apiClient: ApiClient) {
    this.api = apiClient;
  }

  async createWorkflow(workflowData: Record<string, unknown>) {
    return this.api.post('/workflows', workflowData);
  }

  async getWorkflows(params?: { category?: string; status?: string; page?: number; limit?: number }) {
    return this.api.get('/workflows', { params });
  }

  async getWorkflow(id: string) {
    return this.api.get(`/workflows/${id}`);
  }

  async updateWorkflow(id: string, updates: Record<string, unknown>) {
    return this.api.patch(`/workflows/${id}`, updates);
  }

  async deleteWorkflow(id: string) {
    return this.api.delete(`/workflows/${id}`);
  }

  async startWorkflow(id: string) {
    return this.api.post(`/workflows/${id}/start`);
  }

  async pauseWorkflow(id: string) {
    return this.api.post(`/workflows/${id}/pause`);
  }

  async completeWorkflow(id: string) {
    return this.api.post(`/workflows/${id}/complete`);
  }
}

export class CollaborationService {
  private api: ApiClient;

  constructor(apiClient: ApiClient) {
    this.api = apiClient;
  }

  async createSession(projectId: string) {
    return this.api.post('/collaboration/sessions', { projectId });
  }

  async joinSession(sessionId: string) {
    return this.api.post(`/collaboration/sessions/${sessionId}/join`);
  }

  async leaveSession(sessionId: string) {
    return this.api.post(`/collaboration/sessions/${sessionId}/leave`);
  }

  async updateCursor(sessionId: string, x: number, y: number) {
    return this.api.post(`/collaboration/sessions/${sessionId}/cursor`, { x, y });
  }

  async updateSelection(sessionId: string, selection: string[]) {
    return this.api.post(`/collaboration/sessions/${sessionId}/selection`, { selection });
  }

  async broadcastChange(sessionId: string, change: Record<string, unknown>) {
    return this.api.post(`/collaboration/sessions/${sessionId}/changes`, change);
  }
}

export class AnalyticsService {
  private api: ApiClient;

  constructor(apiClient: ApiClient) {
    this.api = apiClient;
  }

  async trackEvent(event: string, properties?: Record<string, unknown>) {
    return this.api.post('/analytics/events', { event, properties });
  }

  async getProjectAnalytics(projectId: string, period: 'day' | 'week' | 'month') {
    return this.api.get(`/analytics/projects/${projectId}`, { params: { period } });
  }

  async getUserAnalytics(period: 'day' | 'week' | 'month') {
    return this.api.get('/analytics/user', { params: { period } });
  }

  async getPerformanceMetrics(projectId: string) {
    return this.api.get(`/analytics/performance/${projectId}`);
  }
}

// Create API client instance
export const apiClient = new ApiClient();

// Create service instances
export const projectService = new ProjectService(apiClient);
export const templateService = new TemplateService(apiClient);
export const aiService = new AIService(apiClient);
export const sceneService = new SceneService(apiClient);
export const workflowService = new WorkflowService(apiClient);
export const collaborationService = new CollaborationService(apiClient);
export const analyticsService = new AnalyticsService(apiClient);

// Export all services
export {
  ProjectService,
  TemplateService,
  AIService,
  SceneService,
  WorkflowService,
  CollaborationService,
  AnalyticsService,
};
