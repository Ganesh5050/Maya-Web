import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Zap, Layout, Image, Type, Box, Layers, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Animation Categories
export const ANIMATION_CATEGORIES = {
  'Text Effects': {
    icon: Type,
    count: 40,
    color: 'from-purple-500 to-pink-500',
    components: [
      'Split Text', 'Blur Text', 'Circular Text', 'Text Type', 'Shuffle',
      'Shiny Text', 'Text Pressure', 'Curved Loop', 'Fuzzy Text', 'Gradient Text',
      'Text Trail', 'Falling Text', 'Text Cursor', 'Decrypted Text', 'True Focus',
      'Scroll Float', 'Scroll Reveal', 'ASCII Text', 'Scrambled Text', 'Rotating Text',
      'Glitch Text', 'Scroll Velocity', 'Variable Proximity', 'Count Up', 'Layout Text Flip',
      'Colourful Text', 'Text Generate Effect', 'Typewriter Effect', 'Flip Words', 'Text Hover Effect',
    ]
  },
  'Interactive': {
    icon: Sparkles,
    count: 35,
    color: 'from-blue-500 to-cyan-500',
    components: [
      'Animated Content', 'Fade Content', 'Electric Border', 'Pixel Transition', 'Glare Hover',
      'Logo Loop', 'Target Cursor', 'Laser Flow', 'Magnet Lines', 'Gradual Blur',
      'Click Spark', 'Magnet', 'Sticker Peel', 'Pixel Trail', 'Cubes',
      'Metallic Paint', 'Noise', 'Shape Blur', 'Crosshair', 'Image Trail',
      'Ribbons', 'Splash Cursor', 'Meta Balls', 'Blob Cursor', 'Star Border',
      'Following Pointer', 'Pointer Highlight', 'Lens',
    ]
  },
  'Navigation': {
    icon: Layout,
    count: 45,
    color: 'from-green-500 to-emerald-500',
    components: [
      'Animated List', 'Scroll Stack', 'Bubble Menu', 'Magic Bento', 'Circular Gallery',
      'Card Nav', 'Stack', 'Fluid Glass', 'Pill Nav', 'Tilted Card',
      'Masonry', 'Glass Surface', 'Dome Gallery', 'Chroma Grid', 'Folder',
      'Staggered Menu', 'Model Viewer', 'Lanyard', 'Profile Card', 'Dock',
      'Gooey Nav', 'Pixel Card', 'Carousel', 'Spotlight Card', 'Flying Posters',
      'Card Swap', 'Infinite Scroll', 'Glass Icons', 'Decay Card', 'Flowing Menu',
      'Elastic Slider', 'Counter', 'Infinite Menu', 'Rolling Gallery', 'Stepper',
      'Bounce Cards', 'Floating Navbar', 'Navbar Menu', 'Sidebar', 'Floating Dock', 'Tabs',
    ]
  },
  'Backgrounds': {
    icon: Image,
    count: 40,
    color: 'from-orange-500 to-red-500',
    components: [
      'Liquid Ether', 'Prism', 'Dark Veil', 'Silk', 'Light Rays',
      'Pixel Blast', 'Aurora', 'Plasma', 'Particles', 'Gradient Blinds',
      'Beams', 'Lightning', 'Prismatic Burst', 'Galaxy', 'Dither',
      'Faulty Terminal', 'Ripple Grid', 'Dot Grid', 'Threads', 'Hyperspeed',
      'Iridescence', 'Waves', 'Grid Distortion', 'Ballpit', 'Orb',
      'Letter Glitch', 'Grid Motion', 'Squares', 'Liquid Chrome', 'Dotted Glow',
      'Background Ripple', 'Sparkles', 'Gradient Animation', 'Wavy Background', 'Background Boxes',
      'Meteors', 'Glowing Stars', 'Shooting Stars', 'Vortex', 'Spotlight',
    ]
  },
  'Cards': {
    icon: Layers,
    count: 20,
    color: 'from-yellow-500 to-amber-500',
    components: [
      'Pixelated Canvas', '3D Card Effect', 'Evervault Card', 'Card Stack', 'Card Hover Effect',
      'Wobble Card', 'Expandable Card', 'Card Spotlight', 'Focus Cards', 'Infinite Moving Cards',
      'Draggable Card', 'Comet Card', 'Glare Card', 'Direction Aware Hover', 'Parallax Scroll',
      'Sticky Scroll Reveal', 'Macbook Scroll', 'Container Scroll Animation', 'Hero Parallax', 'Images Slider',
    ]
  },
  '3D': {
    icon: Box,
    count: 5,
    color: 'from-indigo-500 to-purple-500',
    components: [
      '3D Pin', '3D Marquee', 'GitHub Globe', 'World Map', 'Model Viewer GLTF',
    ]
  },
  'Forms': {
    icon: Zap,
    count: 10,
    color: 'from-pink-500 to-rose-500',
    components: [
      'Signup Form', 'Placeholders And Vanish Input', 'File Upload', 'Animated Modal', 'Animated Tooltip',
      'Link Preview', 'Stateful Button', 'Multi Step Loader', 'Loader', 'Resizable Navbar',
    ]
  },
  'Advanced': {
    icon: Star,
    count: 15,
    color: 'from-teal-500 to-cyan-500',
    components: [
      'Apple Cards Carousel', 'Layout Grid', 'Bento Grid', 'Timeline', 'Compare',
      'Codeblock', 'Container Cover', 'Feature Sections', 'Cards Sections', 'Hero Sections',
      'Moving Border', 'Hover Border Gradient', 'Canvas Reveal Effect', 'SVG Mask Effect', 'Tracing Beam',
    ]
  },
};

interface AnimationComponentProps {
  name: string;
  category: string;
  onSelect: (name: string, category: string) => void;
  isNew?: boolean;
}

const AnimationComponentCard: React.FC<AnimationComponentProps> = ({ name, category, onSelect, isNew }) => {
  const [isHovering, setIsHovering] = useState(false);
  const categoryData = ANIMATION_CATEGORIES[category as keyof typeof ANIMATION_CATEGORIES];

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <Card
        className="relative overflow-hidden cursor-pointer group h-40 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all"
        onClick={() => onSelect(name, category)}
      >
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${categoryData.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
        
        {/* New Badge */}
        {isNew && (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
            NEW
          </Badge>
        )}

        {/* Content */}
        <div className="relative z-10 p-4 h-full flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <categoryData.icon className={`w-8 h-8 bg-gradient-to-br ${categoryData.color} bg-clip-text text-transparent`} />
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-1 text-foreground group-hover:text-white transition-colors">
              {name}
            </h3>
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          </div>
        </div>

        {/* Hover Effect */}
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            >
              <div className="text-center p-4">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-white" />
                <p className="text-white text-sm font-medium">Click to preview</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

interface AnimationBrowserProps {
  onSelectComponent: (name: string, category: string) => void;
}

export const AnimationBrowser: React.FC<AnimationBrowserProps> = ({ onSelectComponent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter components based on search
  const filteredComponents = useMemo(() => {
    const results: { category: string; components: string[] }[] = [];

    Object.entries(ANIMATION_CATEGORIES).forEach(([category, data]) => {
      if (selectedCategory !== 'all' && selectedCategory !== category) return;

      const filtered = data.components.filter(comp =>
        comp.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filtered.length > 0) {
        results.push({ category, components: filtered });
      }
    });

    return results;
  }, [searchQuery, selectedCategory]);

  const totalComponents = Object.values(ANIMATION_CATEGORIES).reduce((acc, cat) => acc + cat.count, 0);

  return (
    <div className="w-full h-full bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Premium Animation Library
            </h1>
            <p className="text-muted-foreground">
              {totalComponents} professional animations ready to use
            </p>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search animations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50 backdrop-blur-xl border-white/10 focus:border-white/20"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid grid-cols-4 lg:grid-cols-9 gap-2 bg-background/30 backdrop-blur-xl p-2 mb-6">
          <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
            All ({totalComponents})
          </TabsTrigger>
          {Object.entries(ANIMATION_CATEGORIES).map(([category, data]) => (
            <TabsTrigger
              key={category}
              value={category}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500"
            >
              {category} ({data.count})
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Component Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredComponents.map(({ category, components }) =>
              components.map((component, index) => (
                <motion.div
                  key={`${category}-${component}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <AnimationComponentCard
                    name={component}
                    category={category}
                    onSelect={onSelectComponent}
                    isNew={['Electric Border', 'Pixel Transition', 'Laser Flow', 'Bubble Menu', 'Dome Gallery', 'Pixel Blast', 'Gradient Blinds', 'Prismatic Burst', 'Comet Card', 'Pixelated Canvas'].includes(component)}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredComponents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl font-semibold text-muted-foreground">
              No animations found
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search query
            </p>
          </motion.div>
        )}
      </Tabs>

      {/* Stats Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {totalComponents}+
            </div>
            <div className="text-sm text-muted-foreground mt-1">Components</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              8
            </div>
            <div className="text-sm text-muted-foreground mt-1">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              100%
            </div>
            <div className="text-sm text-muted-foreground mt-1">Responsive</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              TypeScript
            </div>
            <div className="text-sm text-muted-foreground mt-1">Fully Typed</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
