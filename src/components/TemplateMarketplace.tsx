import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Heart, 
  Eye, 
  Users, 
  Calendar,
  TrendingUp,
  Award,
  Zap,
  Palette,
  Code,
  Globe,
  ShoppingCart,
  Briefcase,
  Camera,
  Music,
  Gamepad2,
  BookOpen,
  Home,
  Building2
} from 'lucide-react';

const TemplateMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');

  const categories = [
    { id: 'all', name: 'All Templates', icon: Globe },
    { id: 'business', name: 'Business', icon: Briefcase },
    { id: 'portfolio', name: 'Portfolio', icon: Camera },
    { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart },
    { id: 'blog', name: 'Blog', icon: BookOpen },
    { id: 'landing', name: 'Landing Page', icon: Home },
    { id: 'entertainment', name: 'Entertainment', icon: Music },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2 }
  ];

  const templates = [
    {
      id: '1',
      title: 'Modern Portfolio Pro',
      description: 'A stunning portfolio template with 3D animations and glassmorphism design',
      category: 'portfolio',
      author: 'Sarah Chen',
      authorAvatar: '/avatars/sarah.jpg',
      price: 0,
      rating: 4.9,
      downloads: 1250,
      likes: 89,
      preview: '/templates/portfolio-pro.jpg',
      tags: ['3D', 'Glassmorphism', 'Responsive', 'Dark Mode'],
      featured: true,
      trending: true
    },
    {
      id: '2',
      title: 'E-commerce Store',
      description: 'Complete e-commerce solution with shopping cart and payment integration',
      category: 'ecommerce',
      author: 'Mike Johnson',
      authorAvatar: '/avatars/mike.jpg',
      price: 49,
      rating: 4.8,
      downloads: 890,
      likes: 67,
      preview: '/templates/ecommerce-store.jpg',
      tags: ['E-commerce', 'Payment', 'Cart', 'Product Gallery'],
      featured: true,
      trending: false
    },
    {
      id: '3',
      title: 'SaaS Landing Page',
      description: 'High-converting landing page for SaaS startups with analytics',
      category: 'landing',
      author: 'Emma Wilson',
      authorAvatar: '/avatars/emma.jpg',
      price: 29,
      rating: 4.7,
      downloads: 2100,
      likes: 156,
      preview: '/templates/saas-landing.jpg',
      tags: ['SaaS', 'Analytics', 'CTA', 'Pricing'],
      featured: false,
      trending: true
    },
    {
      id: '4',
      title: 'Creative Agency',
      description: 'Bold and creative design for agencies with interactive elements',
      category: 'business',
      author: 'Alex Rodriguez',
      authorAvatar: '/avatars/alex.jpg',
      price: 39,
      rating: 4.6,
      downloads: 750,
      likes: 45,
      preview: '/templates/creative-agency.jpg',
      tags: ['Creative', 'Interactive', 'Bold', 'Agency'],
      featured: false,
      trending: false
    },
    {
      id: '5',
      title: 'Tech Blog',
      description: 'Clean and modern blog template with syntax highlighting',
      category: 'blog',
      author: 'Lisa Park',
      authorAvatar: '/avatars/lisa.jpg',
      price: 0,
      rating: 4.8,
      downloads: 1800,
      likes: 123,
      preview: '/templates/tech-blog.jpg',
      tags: ['Blog', 'Syntax Highlighting', 'Clean', 'Modern'],
      featured: true,
      trending: false
    },
    {
      id: '6',
      title: 'Gaming Website',
      description: 'Epic gaming website with neon effects and 3D elements',
      category: 'gaming',
      author: 'David Kim',
      authorAvatar: '/avatars/david.jpg',
      price: 59,
      rating: 4.9,
      downloads: 420,
      likes: 78,
      preview: '/templates/gaming-website.jpg',
      tags: ['Gaming', 'Neon', '3D', 'Epic'],
      featured: false,
      trending: true
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
            <Award className="w-4 h-4 mr-2" />
            Template Marketplace
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent">
            Discover Amazing Templates
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Browse our curated collection of professional templates created by talented designers. 
            Find the perfect starting point for your next project.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-black/20 backdrop-blur-xl border-emerald-500/20">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search templates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-black/30 border-emerald-500/30 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`whitespace-nowrap ${
                        selectedCategory === category.id
                          ? "bg-emerald-600 text-white"
                          : "border-gray-600 text-gray-300 hover:border-emerald-500"
                      }`}
                    >
                      <category.icon className="w-4 h-4 mr-2" />
                      {category.name}
                    </Button>
                  ))}
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-black/30 border border-emerald-500/30 text-white rounded-md"
                >
                  <option value="trending">Trending</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {sortedTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                layout
              >
                <Card className="bg-black/20 backdrop-blur-xl border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 group">
                  <div className="relative">
                    {/* Preview Image */}
                    <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-t-lg overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                            <Palette className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-white font-semibold">{template.title}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {template.featured && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}

                    {/* Trending Badge */}
                    {template.trending && (
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}

                    {/* Price */}
                    <div className="absolute bottom-3 right-3">
                      <Badge className={`${
                        template.price === 0 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-purple-500/20 text-purple-300'
                      }`}>
                        {template.price === 0 ? 'Free' : `$${template.price}`}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white group-hover:text-emerald-300 transition-colors">
                          {template.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300 mt-2">
                          {template.description}
                        </CardDescription>
                      </div>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 mt-4">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={template.authorAvatar} />
                        <AvatarFallback className="bg-emerald-600 text-white text-xs">
                          {template.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm text-white">{template.author}</div>
                        <div className="text-xs text-gray-400">{categories.find(c => c.id === template.category)?.name}</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-300">{template.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4 text-emerald-400" />
                          <span className="text-gray-300">{template.downloads}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-red-400" />
                          <span className="text-gray-300">{template.likes}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {template.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} className="bg-emerald-500/20 text-emerald-300 text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {template.tags.length > 3 && (
                        <Badge className="bg-gray-500/20 text-gray-300 text-xs">
                          +{template.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-black/20 backdrop-blur-xl border-emerald-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">500+</div>
                <div className="text-sm text-gray-400">Premium Templates</div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">50K+</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">1M+</div>
                <div className="text-sm text-gray-400">Downloads</div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-xl border-orange-500/20 text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">4.9</div>
                <div className="text-sm text-gray-400">Average Rating</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TemplateMarketplace;
