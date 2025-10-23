import { useEffect, useState } from 'react';
import { DatabaseService, type Project } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { Loader2, Trash2, Eye, Calendar, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const MyProjects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadProjects();
  }, [user]);
  
  const loadProjects = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      const userProjects = await DatabaseService.getProjects(user.id);
      setProjects(userProjects || []);
    } catch (error) {
      console.error('Load error:', error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const openProject = (projectId: string) => {
    navigate(`/builder?project=${projectId}`);
  };
  
  const deleteProject = async (projectId: string, projectName: string) => {
    if (confirm(`Delete "${projectName}"? This cannot be undone.`)) {
      try {
        await DatabaseService.deleteProject(projectId);
        toast({
          title: "Success",
          description: "Project deleted successfully",
        });
        loadProjects();
      } catch (error) {
        console.error('Delete error:', error);
        toast({
          title: "Error",
          description: "Failed to delete project",
          variant: "destructive",
        });
      }
    }
  };
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Please Log In</h1>
          <p className="text-white/60 mb-6">You need to be logged in to view your projects</p>
          <Button onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Projects</h1>
            <p className="text-white/60">Manage your saved websites and projects</p>
          </div>
          <Button 
            onClick={() => navigate('/builder')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Create New Project
          </Button>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <FolderOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No projects yet</h2>
            <p className="text-white/60 mb-6">Create your first project to get started!</p>
            <Button 
              onClick={() => navigate('/builder')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Create Your First Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="bg-black/40 border border-white/10 rounded-lg p-6 hover:border-purple-500/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {project.name}
                  </h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    project.status === 'published' 
                      ? 'bg-green-500/20 text-green-400' 
                      : project.status === 'draft'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                {project.description && (
                  <p className="text-white/60 mb-4 line-clamp-2">{project.description}</p>
                )}
                
                <div className="flex items-center gap-2 text-sm text-white/40 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.created_at).toLocaleDateString()}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => openProject(project.id)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    size="sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Open
                  </Button>
                  <Button
                    onClick={() => deleteProject(project.id, project.name)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;

