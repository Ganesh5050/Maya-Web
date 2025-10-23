import { useEffect, useState } from 'react';
import { DatabaseService, type Template } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Loader2, Star, Download, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const TemplateMarketplace = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    loadTemplates();
  }, [selectedCategory]);
  
  const loadTemplates = async () => {
    try {
      const category = selectedCategory === 'all' ? undefined : selectedCategory;
      const allTemplates = await DatabaseService.getTemplates(category);
      setTemplates(allTemplates || []);
    } catch (error) {
      console.error('Load templates error:', error);
      toast({
        title: "Error",
        description: "Failed to load templates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const useTemplate = (template: Template) => {
    // Navigate to builder with template data
    navigate('/builder', { state: { template } });
    toast({
      title: "Template Selected",
      description: `Starting with "${template.name}" template`,
    });
  };
  
  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'saas', name: 'SaaS' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'business', name: 'Business' },
    { id: 'agency', name: 'Agency' },
    { id: 'blog', name: 'Blog' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h1 className="text-5xl font-bold text-white">Template Marketplace</h1>
          </div>
          <p className="text-xl text-white/60">
            Start with a professionally designed template
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-black/40 text-white/60 hover:bg-black/60 hover:text-white border border-white/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Templates Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-2">No templates found</h2>
            <p className="text-white/60 mb-6">Try selecting a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div 
                key={template.id} 
                className="bg-black/40 border border-white/10 rounded-lg overflow-hidden hover:border-purple-500/50 transition-all group"
              >
                {/* Template Preview */}
                {template.preview_url && (
                  <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative overflow-hidden">
                    <img 
                      src={template.preview_url} 
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                    {template.is_premium && (
                      <div className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                        PREMIUM
                      </div>
                    )}
                  </div>
                )}
                
                <div className="p-6">
                  {/* Template Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-white/40">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{template.rating?.toFixed(1) || '5.0'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{template.downloads || 0}</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {template.tags && template.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.tags.slice(0, 3).map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded text-xs text-purple-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Action Button */}
                  <Button
                    onClick={() => useTemplate(template)}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Use Template
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Custom Template CTA */}
        <div className="mt-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Can't find what you need?</h2>
          <p className="text-white/60 mb-6">Create a custom website from scratch with AI</p>
          <Button
            onClick={() => navigate('/builder')}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
          >
            Start from Scratch
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateMarketplace;

