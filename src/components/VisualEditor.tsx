import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
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
  RotateCcw
} from 'lucide-react';

// Mock components library
const componentLibrary = [
  {
    id: 'hero',
    name: 'Hero Section',
    icon: Layout,
    category: 'Layout',
    description: 'Eye-catching hero with 3D animations',
    preview: 'Hero with animated background',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'text',
    name: 'Text Block',
    icon: Type,
    category: 'Content',
    description: 'Rich text content with animations',
    preview: 'Lorem ipsum dolor sit amet...',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'image',
    name: 'Image Gallery',
    icon: Image,
    category: 'Media',
    description: '3D image gallery with hover effects',
    preview: 'Image grid with 3D effects',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'features',
    name: 'Features Grid',
    icon: Palette,
    category: 'Layout',
    description: 'Feature showcase with glassmorphic cards',
    preview: 'Feature cards with animations',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'contact',
    name: 'Contact Form',
    icon: Settings,
    category: 'Forms',
    description: 'Interactive contact form with 3D elements',
    preview: 'Contact form with validation',
    color: 'from-cyan-500 to-blue-500'
  }
];

// Mock website sections
const initialSections = [
  {
    id: '1',
    type: 'hero',
    name: 'Hero Section',
    position: { x: 0, y: 0 },
    size: { width: 100, height: 60 },
    content: {
      title: 'Welcome to Maya-Web',
      subtitle: 'Build amazing websites with AI',
      background: 'gradient'
    },
    styles: {
      backgroundColor: '#1a1a2e',
      textColor: '#ffffff'
    }
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
      textColor: '#ffffff'
    }
  }
];

const VisualEditor = () => {
  const [sections, setSections] = useState(initialSections);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [draggedComponent, setDraggedComponent] = useState<any>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (component: any) => {
    setDraggedComponent(component);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (!draggedComponent || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newSection = {
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
        textColor: '#ffffff'
      }
    };

    setSections([...sections, newSection]);
    setDraggedComponent(null);
  };

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSection(sectionId === selectedSection ? null : sectionId);
  };

  const handleSectionDelete = (sectionId: string) => {
    setSections(sections.filter(s => s.id !== sectionId));
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
      setSections([...sections, newSection]);
    }
  };

  const selectedSectionData = sections.find(s => s.id === selectedSection);

  return (
    <div className="h-screen flex bg-background">
      {/* Component Library Sidebar */}
      <div className="w-80 glass border-r border-glass-border flex flex-col">
        <div className="p-6 border-b border-glass-border">
          <h2 className="text-xl font-bold mb-2">Components</h2>
          <p className="text-sm text-muted-foreground">
            Drag components to the canvas to build your website
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {componentLibrary.map((component) => {
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
                  <div>
                    <h3 className="font-semibold text-sm">{component.name}</h3>
                    <p className="text-xs text-muted-foreground">{component.category}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{component.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
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
            
            <Button variant="ghost" size="sm">
              <Undo className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm">
              <Redo className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {sections.length} sections
            </span>
            <Button variant="outline" size="sm">
              Export Code
            </Button>
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
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* Website Sections */}
            {sections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`absolute glass rounded-lg border-2 transition-all duration-200 ${
                  selectedSection === section.id 
                    ? 'border-primary shadow-glow-primary' 
                    : 'border-glass-border hover:border-primary/50'
                } ${isPreviewMode ? 'cursor-default' : 'cursor-pointer'}`}
                style={{
                  left: `${section.position.x}%`,
                  top: `${section.position.y}%`,
                  width: `${section.size.width}%`,
                  height: `${section.size.height}%`,
                  backgroundColor: section.styles.backgroundColor,
                  color: section.styles.textColor
                }}
                onClick={() => !isPreviewMode && handleSectionSelect(section.id)}
                whileHover={{ scale: isPreviewMode ? 1 : 1.02 }}
                drag={!isPreviewMode}
                dragMomentum={false}
                onDragEnd={(e, info) => {
                  if (isPreviewMode) return;
                  const rect = canvasRef.current?.getBoundingClientRect();
                  if (rect) {
                    const newX = ((info.point.x - rect.left) / rect.width) * 100;
                    const newY = ((info.point.y - rect.top) / rect.height) * 100;
                    
                    setSections(sections.map(s => 
                      s.id === section.id 
                        ? { ...s, position: { x: Math.max(0, Math.min(90, newX)), y: Math.max(0, Math.min(80, newY)) }}
                        : s
                    ));
                  }
                }}
              >
                <div className="p-4 h-full flex flex-col">
                  {!isPreviewMode && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium opacity-70">{section.name}</span>
                      <div className="flex gap-1">
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
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

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

          {/* Properties Panel */}
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

              <div className="space-y-6">
                {/* Section Info */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Section Name</label>
                  <input
                    type="text"
                    value={selectedSectionData.name}
                    onChange={(e) => {
                      setSections(sections.map(s => 
                        s.id === selectedSectionData.id 
                          ? { ...s, name: e.target.value }
                          : s
                      ));
                    }}
                    className="w-full px-3 py-2 glass rounded-lg border border-glass-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Size Controls */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Size</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Width (%)</label>
                      <input
                        type="number"
                        value={selectedSectionData.size.width}
                        onChange={(e) => {
                          setSections(sections.map(s => 
                            s.id === selectedSectionData.id 
                              ? { ...s, size: { ...s.size, width: Number(e.target.value) }}
                              : s
                          ));
                        }}
                        className="w-full px-2 py-1 glass rounded border border-glass-border focus:outline-none focus:ring-1 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Height (%)</label>
                      <input
                        type="number"
                        value={selectedSectionData.size.height}
                        onChange={(e) => {
                          setSections(sections.map(s => 
                            s.id === selectedSectionData.id 
                              ? { ...s, size: { ...s.size, height: Number(e.target.value) }}
                              : s
                          ));
                        }}
                        className="w-full px-2 py-1 glass rounded border border-glass-border focus:outline-none focus:ring-1 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Style Controls */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Background Color</label>
                  <input
                    type="color"
                    value={selectedSectionData.styles.backgroundColor}
                    onChange={(e) => {
                      setSections(sections.map(s => 
                        s.id === selectedSectionData.id 
                          ? { ...s, styles: { ...s.styles, backgroundColor: e.target.value }}
                          : s
                      ));
                    }}
                    className="w-full h-10 glass rounded border border-glass-border"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Text Color</label>
                  <input
                    type="color"
                    value={selectedSectionData.styles.textColor}
                    onChange={(e) => {
                      setSections(sections.map(s => 
                        s.id === selectedSectionData.id 
                          ? { ...s, styles: { ...s.styles, textColor: e.target.value }}
                          : s
                      ));
                    }}
                    className="w-full h-10 glass rounded border border-glass-border"
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Content</label>
                  <textarea
                    value={selectedSectionData.content.text || ''}
                    onChange={(e) => {
                      setSections(sections.map(s => 
                        s.id === selectedSectionData.id 
                          ? { ...s, content: { ...s.content, text: e.target.value }}
                          : s
                      ));
                    }}
                    className="w-full px-3 py-2 glass rounded-lg border border-glass-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    rows={3}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualEditor;
