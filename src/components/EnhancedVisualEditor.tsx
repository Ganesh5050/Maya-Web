import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Move, 
  Palette, 
  Type, 
  Image, 
  Layout, 
  Settings,
  Eye,
  Save,
  Undo,
  Redo,
  Plus,
  Trash2,
  Copy,
  RotateCcw,
  Download,
  Upload,
  Grid,
  Layers,
  Code,
  Smartphone,
  Monitor,
  Tablet,
  Zap,
  Sparkles,
  Wand2,
  Target,
  Lock,
  Unlock,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Link,
  Search,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react';

// Enhanced Component Library
const enhancedComponentLibrary = [
  {
    id: 'hero',
    name: 'Hero Section',
    icon: Layout,
    category: 'Layout',
    description: 'Eye-catching hero with 3D animations',
    preview: 'Hero with animated background',
    color: 'from-blue-500 to-purple-500',
    tags: ['hero', 'landing', '3d'],
    complexity: 'Medium'
  },
  {
    id: 'text',
    name: 'Text Block',
    icon: Type,
    category: 'Content',
    description: 'Rich text content with animations',
    preview: 'Lorem ipsum dolor sit amet...',
    color: 'from-green-500 to-teal-500',
    tags: ['text', 'content', 'typography'],
    complexity: 'Low'
  },
  {
    id: 'image',
    name: 'Image Gallery',
    icon: Image,
    category: 'Media',
    description: '3D image gallery with hover effects',
    preview: 'Image grid with 3D effects',
    color: 'from-orange-500 to-red-500',
    tags: ['gallery', 'images', '3d'],
    complexity: 'High'
  },
  {
    id: 'features',
    name: 'Features Grid',
    icon: Palette,
    category: 'Layout',
    description: 'Feature showcase with glassmorphic cards',
    preview: 'Feature cards with animations',
    color: 'from-purple-500 to-pink-500',
    tags: ['features', 'grid', 'cards'],
    complexity: 'Medium'
  },
  {
    id: 'contact',
    name: 'Contact Form',
    icon: Settings,
    category: 'Forms',
    description: 'Interactive contact form with 3D elements',
    preview: 'Contact form with validation',
    color: 'from-cyan-500 to-blue-500',
    tags: ['form', 'contact', 'interactive'],
    complexity: 'High'
  },
  {
    id: 'pricing',
    name: 'Pricing Table',
    icon: Target,
    category: 'Layout',
    description: 'Animated pricing cards with hover effects',
    preview: 'Pricing tiers with animations',
    color: 'from-emerald-500 to-green-500',
    tags: ['pricing', 'cards', 'business'],
    complexity: 'Medium'
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    icon: Sparkles,
    category: 'Content',
    description: 'Customer testimonials with carousel',
    preview: 'Testimonial carousel',
    color: 'from-rose-500 to-pink-500',
    tags: ['testimonials', 'carousel', 'social'],
    complexity: 'Medium'
  },
  {
    id: 'navigation',
    name: 'Navigation Bar',
    icon: Layers,
    category: 'Navigation',
    description: 'Modern navigation with glassmorphic design',
    preview: 'Navigation bar',
    color: 'from-indigo-500 to-purple-500',
    tags: ['nav', 'menu', 'header'],
    complexity: 'Low'
  }
];

// Enhanced Website Sections with more properties
interface WebsiteSection {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: {
    title?: string;
    subtitle?: string;
    text?: string;
    image?: string;
    buttonText?: string;
    buttonLink?: string;
  };
  styles: {
    backgroundColor: string;
    textColor: string;
    fontSize?: number;
    fontWeight?: string;
    borderRadius?: number;
    padding?: number;
    margin?: number;
    opacity?: number;
    transform?: string;
  };
  animations: {
    type: string;
    duration: number;
    delay: number;
    easing: string;
  };
  responsive: {
    mobile: { width: number; height: number };
    tablet: { width: number; height: number };
    desktop: { width: number; height: number };
  };
  locked: boolean;
  visible: boolean;
}

const initialSections: WebsiteSection[] = [
  {
    id: '1',
    type: 'hero',
    name: 'Hero Section',
    position: { x: 0, y: 0 },
    size: { width: 100, height: 60 },
    content: {
      title: 'Welcome to Maya-Web',
      subtitle: 'Build amazing websites with AI',
      buttonText: 'Get Started',
      buttonLink: '#'
    },
    styles: {
      backgroundColor: '#1a1a2e',
      textColor: '#ffffff',
      fontSize: 24,
      fontWeight: 'bold',
      borderRadius: 12,
      padding: 24,
      opacity: 1
    },
    animations: {
      type: 'fadeIn',
      duration: 1,
      delay: 0,
      easing: 'ease-out'
    },
    responsive: {
      mobile: { width: 100, height: 50 },
      tablet: { width: 100, height: 55 },
      desktop: { width: 100, height: 60 }
    },
    locked: false,
    visible: true
  },
  {
    id: '2',
    type: 'text',
    name: 'About Section',
    position: { x: 0, y: 60 },
    size: { width: 100, height: 40 },
    content: {
      text: 'Maya-Web revolutionizes web creation with AI-powered design and stunning 3D visuals.'
    },
    styles: {
      backgroundColor: '#16213e',
      textColor: '#ffffff',
      fontSize: 16,
      fontWeight: 'normal',
      borderRadius: 8,
      padding: 16,
      opacity: 1
    },
    animations: {
      type: 'slideUp',
      duration: 0.8,
      delay: 0.2,
      easing: 'ease-out'
    },
    responsive: {
      mobile: { width: 100, height: 35 },
      tablet: { width: 100, height: 38 },
      desktop: { width: 100, height: 40 }
    },
    locked: false,
    visible: true
  }
];

const EnhancedVisualEditor: React.FC = () => {
  const [sections, setSections] = useState<WebsiteSection[]>(initialSections);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [draggedComponent, setDraggedComponent] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showGrid, setShowGrid] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [history, setHistory] = useState<WebsiteSection[][]>([initialSections]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Filter components based on search and category
  const filteredComponents = enhancedComponentLibrary.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // History management
  const saveToHistory = useCallback((newSections: WebsiteSection[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newSections]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setSections([...history[historyIndex - 1]]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setSections([...history[historyIndex + 1]]);
    }
  };

  const handleDragStart = (component: any) => {
    setDraggedComponent(component);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (!draggedComponent || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newSection: WebsiteSection = {
      id: Date.now().toString(),
      type: draggedComponent.id,
      name: draggedComponent.name,
      position: { x: Math.max(0, Math.min(90, x)), y: Math.max(0, Math.min(80, y)) },
      size: { width: 30, height: 20 },
      content: {
        title: draggedComponent.name,
        text: draggedComponent.description
      },
      styles: {
        backgroundColor: '#1a1a2e',
        textColor: '#ffffff',
        fontSize: 16,
        fontWeight: 'normal',
        borderRadius: 8,
        padding: 16,
        opacity: 1
      },
      animations: {
        type: 'fadeIn',
        duration: 0.5,
        delay: 0,
        easing: 'ease-out'
      },
      responsive: {
        mobile: { width: 30, height: 18 },
        tablet: { width: 30, height: 19 },
        desktop: { width: 30, height: 20 }
      },
      locked: false,
      visible: true
    };

    const newSections = [...sections, newSection];
    setSections(newSections);
    saveToHistory(newSections);
    setDraggedComponent(null);
  };

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSection(sectionId === selectedSection ? null : sectionId);
  };

  const handleSectionDelete = (sectionId: string) => {
    const newSections = sections.filter(s => s.id !== sectionId);
    setSections(newSections);
    saveToHistory(newSections);
    if (selectedSection === sectionId) {
      setSelectedSection(null);
    }
  };

  const handleSectionDuplicate = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      const newSection = {
        ...section,
        id: Date.now().toString(),
        position: {
          x: section.position.x + 5,
          y: section.position.y + 5
        }
      };
      const newSections = [...sections, newSection];
      setSections(newSections);
      saveToHistory(newSections);
    }
  };

  const handleSectionUpdate = (sectionId: string, updates: Partial<WebsiteSection>) => {
    const newSections = sections.map(s => 
      s.id === sectionId ? { ...s, ...updates } : s
    );
    setSections(newSections);
    saveToHistory(newSections);
  };

  const handleSectionLock = (sectionId: string) => {
    const newSections = sections.map(s => 
      s.id === sectionId ? { ...s, locked: !s.locked } : s
    );
    setSections(newSections);
    saveToHistory(newSections);
  };

  const handleSectionVisibility = (sectionId: string) => {
    const newSections = sections.map(s => 
      s.id === sectionId ? { ...s, visible: !s.visible } : s
    );
    setSections(newSections);
    saveToHistory(newSections);
  };

  const exportCode = () => {
    const code = sections.map(section => {
      return `// ${section.name}
<motion.div
  className="absolute rounded-lg"
  style={{
    left: '${section.position.x}%',
    top: '${section.position.y}%',
    width: '${section.size.width}%',
    height: '${section.size.height}%',
    backgroundColor: '${section.styles.backgroundColor}',
    color: '${section.styles.textColor}',
    fontSize: '${section.styles.fontSize}px',
    fontWeight: '${section.styles.fontWeight}',
    borderRadius: '${section.styles.borderRadius}px',
    padding: '${section.styles.padding}px',
    opacity: ${section.styles.opacity}
  }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: ${section.animations.duration}, delay: ${section.animations.delay} }}
>
  <div className="p-4 h-full flex flex-col">
    <div className="text-lg font-bold mb-1">${section.content.title}</div>
    <div className="text-sm opacity-80">${section.content.text}</div>
  </div>
</motion.div>`;
    }).join('\n\n');

    navigator.clipboard.writeText(code);
  };

  const selectedSectionData = sections.find(s => s.id === selectedSection);

  return (
    <div className="h-screen flex bg-background">
      {/* Enhanced Component Library Sidebar */}
      <div className="w-80 glass border-r border-glass-border flex flex-col">
        <div className="p-6 border-b border-glass-border">
          <h2 className="text-xl font-bold mb-2">Components</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Drag components to the canvas to build your website
          </p>
          
          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Layout">Layout</SelectItem>
                <SelectItem value="Content">Content</SelectItem>
                <SelectItem value="Media">Media</SelectItem>
                <SelectItem value="Forms">Forms</SelectItem>
                <SelectItem value="Navigation">Navigation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredComponents.map((component) => {
            const Icon = component.icon;
            return (
              <motion.div
                key={component.id}
                draggable
                onDragStart={() => handleDragStart(component)}
                className="glass rounded-lg p-4 cursor-move hover:shadow-glow-soft transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileDrag={{ scale: 1.05, rotate: 5 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${component.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{component.name}</h3>
                    <p className="text-xs text-muted-foreground">{component.category}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {component.complexity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{component.description}</p>
                <div className="flex flex-wrap gap-1">
                  {component.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Toolbar */}
        <div className="glass border-b border-glass-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant={isPreviewMode ? "hero" : "ghost"}
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreviewMode ? 'Edit Mode' : 'Preview'}
            </Button>
            
            <Button variant="ghost" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={undo}
              disabled={historyIndex === 0}
            >
              <Undo className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={redo}
              disabled={historyIndex === history.length - 1}
            >
              <Redo className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2 ml-4">
              <Button
                variant={showGrid ? "default" : "ghost"}
                size="sm"
                onClick={() => setShowGrid(!showGrid)}
              >
                <Grid className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* View Mode Selector */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'desktop' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'tablet' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'mobile' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {sections.length} sections
              </span>
              <Button variant="outline" size="sm" onClick={exportCode}>
                <Download className="w-4 h-4 mr-2" />
                Export Code
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex">
          <div
            ref={canvasRef}
            className="flex-1 relative bg-muted/10 overflow-hidden"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDragEnd}
          >
            {/* Grid Background */}
            {showGrid && (
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full" style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }} />
              </div>
            )}

            {/* Website Sections */}
            {sections.filter(s => s.visible).map((section) => {
              const currentSize = section.responsive[viewMode];
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`absolute glass rounded-lg border-2 transition-all duration-200 ${
                    selectedSection === section.id 
                      ? 'border-primary shadow-glow-primary' 
                      : 'border-glass-border hover:border-primary/50'
                  } ${isPreviewMode ? 'cursor-default' : 'cursor-pointer'} ${
                    section.locked ? 'opacity-60' : ''
                  }`}
                  style={{
                    left: `${section.position.x}%`,
                    top: `${section.position.y}%`,
                    width: `${currentSize.width}%`,
                    height: `${currentSize.height}%`,
                    backgroundColor: section.styles.backgroundColor,
                    color: section.styles.textColor,
                    fontSize: `${section.styles.fontSize}px`,
                    fontWeight: section.styles.fontWeight,
                    borderRadius: `${section.styles.borderRadius}px`,
                    padding: `${section.styles.padding}px`,
                    opacity: section.styles.opacity
                  }}
                  onClick={() => !isPreviewMode && handleSectionSelect(section.id)}
                  whileHover={{ scale: isPreviewMode ? 1 : 1.02 }}
                  drag={!isPreviewMode && !section.locked}
                  dragMomentum={false}
                  onDragEnd={(e, info) => {
                    if (isPreviewMode || section.locked) return;
                    const rect = canvasRef.current?.getBoundingClientRect();
                    if (rect) {
                      const newX = ((info.point.x - rect.left) / rect.width) * 100;
                      const newY = ((info.point.y - rect.top) / rect.height) * 100;
                      
                      handleSectionUpdate(section.id, {
                        position: { x: Math.max(0, Math.min(90, newX)), y: Math.max(0, Math.min(80, newY)) }
                      });
                    }
                  }}
                >
                  <div className="p-4 h-full flex flex-col">
                    {!isPreviewMode && (
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium opacity-70">{section.name}</span>
                          {section.locked && <Lock className="w-3 h-3 opacity-50" />}
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSectionLock(section.id);
                            }}
                          >
                            {section.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSectionVisibility(section.id);
                            }}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSectionDuplicate(section.id);
                            }}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSectionDelete(section.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-bold mb-1">{section.content.title}</div>
                        <div className="text-sm opacity-80">{section.content.text}</div>
                        {section.content.buttonText && (
                          <Button className="mt-2" size="sm">
                            {section.content.buttonText}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Drop Zone Indicator */}
            {draggedComponent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 border-2 border-dashed border-primary/50 bg-primary/5 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-primary font-medium">Drop {draggedComponent.name} here</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Enhanced Properties Panel */}
          {selectedSectionData && !isPreviewMode && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              className="w-80 glass border-l border-glass-border p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Properties</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedSection(null)}
                >
                  ✕
                </Button>
              </div>

              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="style">Style</TabsTrigger>
                  <TabsTrigger value="animation">Animation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Section Name</label>
                    <Input
                      value={selectedSectionData.name}
                      onChange={(e) => handleSectionUpdate(selectedSectionData.id, { name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Title</label>
                    <Input
                      value={selectedSectionData.content.title || ''}
                      onChange={(e) => handleSectionUpdate(selectedSectionData.id, {
                        content: { ...selectedSectionData.content, title: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Text</label>
                    <Textarea
                      value={selectedSectionData.content.text || ''}
                      onChange={(e) => handleSectionUpdate(selectedSectionData.id, {
                        content: { ...selectedSectionData.content, text: e.target.value }
                      })}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Button Text</label>
                    <Input
                      value={selectedSectionData.content.buttonText || ''}
                      onChange={(e) => handleSectionUpdate(selectedSectionData.id, {
                        content: { ...selectedSectionData.content, buttonText: e.target.value }
                      })}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="style" className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Background Color</label>
                    <Input
                      type="color"
                      value={selectedSectionData.styles.backgroundColor}
                      onChange={(e) => handleSectionUpdate(selectedSectionData.id, {
                        styles: { ...selectedSectionData.styles, backgroundColor: e.target.value }
                      })}
                      className="h-10"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Text Color</label>
                    <Input
                      type="color"
                      value={selectedSectionData.styles.textColor}
                      onChange={(e) => handleSectionUpdate(selectedSectionData.id, {
                        styles: { ...selectedSectionData.styles, textColor: e.target.value }
                      })}
                      className="h-10"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Font Size</label>
                    <Slider
                      value={[selectedSectionData.styles.fontSize || 16]}
                      onValueChange={([value]) => handleSectionUpdate(selectedSectionData.id, {
                        styles: { ...selectedSectionData.styles, fontSize: value }
                      })}
                      max={48}
                      min={8}
                      step={1}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Border Radius</label>
                    <Slider
                      value={[selectedSectionData.styles.borderRadius || 8]}
                      onValueChange={([value]) => handleSectionUpdate(selectedSectionData.id, {
                        styles: { ...selectedSectionData.styles, borderRadius: value }
                      })}
                      max={24}
                      min={0}
                      step={1}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Opacity</label>
                    <Slider
                      value={[selectedSectionData.styles.opacity || 1]}
                      onValueChange={([value]) => handleSectionUpdate(selectedSectionData.id, {
                        styles: { ...selectedSectionData.styles, opacity: value }
                      })}
                      max={1}
                      min={0}
                      step={0.1}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="animation" className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Animation Type</label>
                    <Select
                      value={selectedSectionData.animations.type}
                      onValueChange={(value) => handleSectionUpdate(selectedSectionData.id, {
                        animations: { ...selectedSectionData.animations, type: value }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fadeIn">Fade In</SelectItem>
                        <SelectItem value="slideUp">Slide Up</SelectItem>
                        <SelectItem value="slideDown">Slide Down</SelectItem>
                        <SelectItem value="slideLeft">Slide Left</SelectItem>
                        <SelectItem value="slideRight">Slide Right</SelectItem>
                        <SelectItem value="scaleIn">Scale In</SelectItem>
                        <SelectItem value="rotateIn">Rotate In</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration</label>
                    <Slider
                      value={[selectedSectionData.animations.duration]}
                      onValueChange={([value]) => handleSectionUpdate(selectedSectionData.id, {
                        animations: { ...selectedSectionData.animations, duration: value }
                      })}
                      max={3}
                      min={0.1}
                      step={0.1}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Delay</label>
                    <Slider
                      value={[selectedSectionData.animations.delay]}
                      onValueChange={([value]) => handleSectionUpdate(selectedSectionData.id, {
                        animations: { ...selectedSectionData.animations, delay: value }
                      })}
                      max={2}
                      min={0}
                      step={0.1}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Actions */}
              <div className="flex gap-2 mt-6">
                <Button variant="outline" size="sm" className="flex-1">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleSectionDelete(selectedSectionData.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedVisualEditor;
