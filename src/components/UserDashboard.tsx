import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Share2,
  Eye,
  Download,
  Calendar,
  Clock,
  Star,
  Folder,
  FolderOpen,
  Zap,
  Sparkles,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react';

// Mock projects data
const mockProjects = [
  {
    id: '1',
    name: 'Portfolio Website',
    description: 'Personal portfolio with 3D animations',
    type: 'Portfolio',
    status: 'Published',
    lastModified: '2024-01-15',
    views: 1250,
    likes: 89,
    thumbnail: '🎨',
    tags: ['3D', 'Portfolio', 'Animation'],
    isStarred: true,
    collaborators: 2
  },
  {
    id: '2',
    name: 'E-commerce Store',
    description: 'Modern online store with 3D product showcase',
    type: 'E-commerce',
    status: 'Draft',
    lastModified: '2024-01-14',
    views: 0,
    likes: 0,
    thumbnail: '🛒',
    tags: ['E-commerce', '3D', 'Shopping'],
    isStarred: false,
    collaborators: 1
  },
  {
    id: '3',
    name: 'SaaS Landing Page',
    description: 'Professional SaaS landing with holographic UI',
    type: 'SaaS',
    status: 'Published',
    lastModified: '2024-01-13',
    views: 2100,
    likes: 156,
    thumbnail: '🚀',
    tags: ['SaaS', 'Holographic', 'Professional'],
    isStarred: true,
    collaborators: 3
  },
  {
    id: '4',
    name: 'Creative Agency',
    description: 'Bold agency site with particle effects',
    type: 'Agency',
    status: 'In Progress',
    lastModified: '2024-01-12',
    views: 0,
    likes: 0,
    thumbnail: '🎭',
    tags: ['Agency', 'Creative', 'Particles'],
    isStarred: false,
    collaborators: 4
  }
];

const UserDashboard = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    type: 'General'
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'All' || 
                          project.status.toLowerCase() === selectedFilter.toLowerCase() ||
                          project.type.toLowerCase() === selectedFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const handleCreateProject = () => {
    if (!newProject.name.trim()) return;
    
    const project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      type: newProject.type,
      status: 'Draft',
      lastModified: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      thumbnail: '📄',
      tags: [],
      isStarred: false,
      collaborators: 1
    };
    
    setProjects([project, ...projects]);
    setNewProject({ name: '', description: '', type: 'General' });
    setShowCreateModal(false);
  };

  const handleStarProject = (projectId: string) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, isStarred: !p.isStarred } : p
    ));
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
  };

  const stats = {
    totalProjects: projects.length,
    publishedProjects: projects.filter(p => p.status === 'Published').length,
    totalViews: projects.reduce((sum, p) => sum + p.views, 0),
    totalLikes: projects.reduce((sum, p) => sum + p.likes, 0)
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-glass-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Projects</h1>
              <p className="text-muted-foreground">
                Manage and organize your AI-generated websites
              </p>
            </div>
            
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => setShowCreateModal(true)}
              className="group"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Project
              <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Projects', value: stats.totalProjects, icon: Folder, color: 'from-blue-500 to-cyan-500' },
            { label: 'Published', value: stats.publishedProjects, icon: Globe, color: 'from-green-500 to-emerald-500' },
            { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'from-purple-500 to-pink-500' },
            { label: 'Total Likes', value: stats.totalLikes, icon: Star, color: 'from-yellow-500 to-orange-500' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 hover:shadow-glow-soft transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass"
            />
          </div>
          
          <div className="flex gap-2">
            {['All', 'Published', 'Draft', 'In Progress'].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "hero" : "ghost"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? "hero" : "ghost"}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "hero" : "ghost"}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group glass rounded-2xl p-6 hover:shadow-glow-accent transition-all duration-300 tilt"
                >
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{project.thumbnail}</div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{project.type}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStarProject(project.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Star className={`w-4 h-4 ${project.isStarred ? 'fill-current text-yellow-400' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Project Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{project.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{project.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{project.collaborators}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-primary/20 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        project.status === 'Published' ? 'bg-green-400' :
                        project.status === 'Draft' ? 'bg-yellow-400' :
                        'bg-blue-400'
                      }`} />
                      <span className="text-sm font-medium">{project.status}</span>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-2xl p-6 hover:shadow-glow-soft transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{project.thumbnail}</div>
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm font-medium">{project.views}</div>
                        <div className="text-xs text-muted-foreground">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{project.likes}</div>
                        <div className="text-xs text-muted-foreground">Likes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{project.collaborators}</div>
                        <div className="text-xs text-muted-foreground">Team</div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          project.status === 'Published' ? 'bg-green-400' :
                          project.status === 'Draft' ? 'bg-yellow-400' :
                          'bg-blue-400'
                        }`} />
                        <span className="text-sm font-medium">{project.status}</span>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'Create your first AI-generated website'}
            </p>
            <Button variant="hero" onClick={() => setShowCreateModal(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Create New Project
            </Button>
          </motion.div>
        )}
      </div>

      {/* Create Project Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass rounded-3xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Create New Project</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateModal(false)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Project Name</label>
                  <Input
                    placeholder="Enter project name..."
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="glass"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <textarea
                    placeholder="Describe your project..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-3 py-2 glass rounded-lg border border-glass-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Project Type</label>
                  <select
                    value={newProject.type}
                    onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                    className="w-full px-3 py-2 glass rounded-lg border border-glass-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="General">General</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Agency">Agency</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button variant="hero" className="flex-1" onClick={handleCreateProject}>
                  <Zap className="w-4 h-4 mr-2" />
                  Create Project
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDashboard;
