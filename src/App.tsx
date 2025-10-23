import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import ModernNavbar from "@/components/ModernNavbar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WebsiteBuilder from "./pages/WebsiteBuilder";
import GenerationPage from "./pages/GenerationPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyProjects from "./pages/MyProjects";
import TemplateMarketplace from "./pages/TemplateMarketplace";
import AITestPage from "./pages/AITestPage";
import TextAnimationsPage from "./pages/TextAnimationsPage";
import BackgroundsPage from "./pages/BackgroundsPage";
import WebsiteBuilderForm from "./components/WebsiteBuilderForm";
import GeneratedSite from "./pages/GeneratedSite";
import ModernWebsiteBuilder from "./pages/ModernWebsiteBuilder";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { initializeAuth, setupAuthListener } from "@/lib/auth";

// Import existing components for separate pages
import AdvancedAIIntegration from "@/components/AdvancedAIIntegration";
import EnhancedRealTimeCollaboration from "@/components/EnhancedRealTimeCollaboration";
import WorkingScene3DEditor from "@/components/WorkingScene3DEditor";
import EnhancedVisualEditor from "@/components/EnhancedVisualEditor";
import EnhancedUserAuthentication from "@/components/EnhancedUserAuthentication";
import APIIntegration from "@/components/APIIntegration";
import DeploymentAutomation from "@/components/DeploymentAutomation";
import DeploymentDashboard from "@/components/DeploymentDashboard";
import DesignSystemExtractor from "@/components/DesignSystemExtractor/DesignSystemExtractor";
import LayoutOptimizer from "@/components/LayoutOptimizer/LayoutOptimizer";
import DevelopmentWorkflow from "@/components/DevelopmentWorkflow";
import EnhancedCodeExportSystem from "@/components/EnhancedCodeExportSystem";

const queryClient = new QueryClient();

// Component to handle page reload redirects and auth initialization
const PageReloadHandler = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Initialize Supabase authentication on app load
    initializeAuth();
    
    // Setup auth state listener
    const { data: authListener } = setupAuthListener();
    
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);
  
  useEffect(() => {
    // Always scroll to top when on homepage and clear any hash
    if (location.pathname === '/') {
      // Remove any hash from URL
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      // Force scroll to very top
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [location.pathname]);
  
  return null;
};

// Component to conditionally render navbar - Show on all pages EXCEPT generation
const ConditionalNavbar = () => {
  const location = useLocation();
  const isGenerationPage = location.pathname === '/generation';
  
  return !isGenerationPage ? <ModernNavbar /> : null;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter
            basename="/"
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <PageReloadHandler />
            <ConditionalNavbar />
                   <Routes>
                     <Route path="/" element={<Index />} />
                     <Route path="/login" element={<Login />} />
                     <Route path="/register" element={<Register />} />
                    <Route path="/builder" element={
                      <ProtectedRoute>
                        <WebsiteBuilder />
                      </ProtectedRoute>
                    } />
                    <Route path="/my-projects" element={
                      <ProtectedRoute>
                        <MyProjects />
                      </ProtectedRoute>
                    } />
                    <Route path="/templates" element={<TemplateMarketplace />} />
                    <Route path="/site/:slug" element={<GeneratedSite />} />
                    <Route path="/generation" element={
                       <ProtectedRoute>
                         <GenerationPage />
                       </ProtectedRoute>
                     } />
            <Route path="/ai-test" element={<AITestPage />} />
            <Route path="/text-animations" element={<TextAnimationsPage />} />
            <Route path="/backgrounds" element={<BackgroundsPage />} />
            <Route path="/builder-form" element={<WebsiteBuilderForm />} />
                     
                     {/* Advanced Development Pipeline Routes - Using Existing Components */}
              <Route path="/project-init" element={<DevelopmentWorkflow />} />
              <Route path="/ui-framework" element={<DesignSystemExtractor />} />
              <Route path="/3d-graphics" element={<WorkingScene3DEditor />} />
              <Route path="/ai-integration" element={<AdvancedAIIntegration />} />
              <Route path="/collaboration" element={<EnhancedRealTimeCollaboration />} />
              <Route path="/visual-editor" element={<EnhancedVisualEditor />} />
              <Route path="/code-export" element={<EnhancedCodeExportSystem />} />
              <Route path="/authentication" element={<EnhancedUserAuthentication />} />
              <Route path="/database" element={<APIIntegration />} />
              <Route path="/performance" element={<LayoutOptimizer />} />
              <Route path="/testing" element={<div>Testing Component</div>} />
              <Route path="/deployment" element={<DeploymentDashboard />} />
              
              {/* Redirect any unknown routes to homepage */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
