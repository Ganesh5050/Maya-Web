import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Copy, ChevronDown, ChevronUp, Eye, Code2, Heart, Search, Github } from 'lucide-react';

const BackgroundsPage = () => {
  const [activeBackground, setActiveBackground] = useState('Pixel Blast');
  const [activeTab, setActiveTab] = useState('preview');
  const [customText, setCustomText] = useState('Hello, you!');
  const [animationDuration, setAnimationDuration] = useState(0.9);
  const [animationDelay, setAnimationDelay] = useState(0);
  const [textColor, setTextColor] = useState('white');
  const [fontSize, setFontSize] = useState('text-6xl');
  const [animationSize, setAnimationSize] = useState('large');
  const [animationStyle, setAnimationStyle] = useState('default');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [componentVariant, setComponentVariant] = useState('ts-tw');
  const [showProps, setShowProps] = useState(false);
  const [selectedPackageManager, setSelectedPackageManager] = useState('npm');

  const backgroundItems = [
    'Liquid Ether',
    'Prism',
    'Dark Veil',
    'Silk',
    'Light Rays',
    'Pixel Blast',
    'Aurora',
    'Plasma',
    'Particles',
    'Gradient Blinds',
    'Beams',
    'Lightning',
    'Prismatic Burst',
    'Galaxy',
    'Dither',
    'Faulty Terminal',
    'Ripple Grid',
    'Dot Grid',
    'Threads',
    'Hyperspeed',
    'Iridescence',
    'Waves',
    'Grid Distortion',
    'Ballpit',
    'Orb',
    'Letter Glitch',
    'Grid Motion',
    'Squares',
    'Liquid Chrome',
    'Balatro'
  ];

  const getStartedItems = [
    'Introduction',
    'Installation'
  ];

  // Render the appropriate background based on selection
  const renderBackground = () => {
    const getSizeClass = () => {
      switch (animationSize) {
        case 'tiny': return 'text-xs';
        case 'small': return 'text-sm';
        case 'medium': return 'text-base';
        case 'large': return 'text-lg';
        case 'huge': return 'text-xl';
        default: return fontSize;
      }
    };

    const getStyleModifiers = () => {
      switch (animationStyle) {
        case 'subtle': return { duration: animationDuration * 0.5, intensity: 0.5 };
        case 'dramatic': return { duration: animationDuration * 1.5, intensity: 2 };
        case 'minimal': return { duration: animationDuration * 0.3, intensity: 0.3 };
        case 'playful': return { duration: animationDuration * 1.2, intensity: 1.5 };
        default: return { duration: animationDuration, intensity: 1 };
      }
    };

    const styleModifiers = getStyleModifiers();
    const sizeClass = getSizeClass();
    
    const commonProps = {
      text: customText,
      delay: animationDelay,
      duration: styleModifiers.duration,
      className: `${sizeClass} font-bold`,
      style: { color: textColor }
    };

    // Force re-render when any prop changes
    const key = `${activeBackground}-${customText}-${animationDuration}-${animationDelay}-${textColor}-${fontSize}-${animationSize}-${animationStyle}`;

    switch (activeBackground) {
      case 'Liquid Ether':
        return <LiquidEtherBackground key={key} {...commonProps} />;
      case 'Prism':
        return <PrismBackground key={key} {...commonProps} />;
      case 'Dark Veil':
        return <DarkVeilBackground key={key} {...commonProps} />;
      case 'Silk':
        return <SilkBackground key={key} {...commonProps} />;
      case 'Light Rays':
        return <LightRaysBackground key={key} {...commonProps} />;
      case 'Pixel Blast':
        return <PixelBlastBackground key={key} {...commonProps} />;
      case 'Aurora':
        return <AuroraBackground key={key} {...commonProps} />;
      case 'Plasma':
        return <PlasmaBackground key={key} {...commonProps} />;
      case 'Particles':
        return <ParticlesBackground key={key} {...commonProps} />;
      case 'Gradient Blinds':
        return <GradientBlindsBackground key={key} {...commonProps} />;
      case 'Beams':
        return <BeamsBackground key={key} {...commonProps} />;
      case 'Lightning':
        return <LightningBackground key={key} {...commonProps} />;
      case 'Prismatic Burst':
        return <PrismaticBurstBackground key={key} {...commonProps} />;
      case 'Galaxy':
        return <GalaxyBackground key={key} {...commonProps} />;
      case 'Dither':
        return <DitherBackground key={key} {...commonProps} />;
      case 'Faulty Terminal':
        return <FaultyTerminalBackground key={key} {...commonProps} />;
      case 'Ripple Grid':
        return <RippleGridBackground key={key} {...commonProps} />;
      case 'Dot Grid':
        return <DotGridBackground key={key} {...commonProps} />;
      case 'Threads':
        return <ThreadsBackground key={key} {...commonProps} />;
      case 'Hyperspeed':
        return <HyperspeedBackground key={key} {...commonProps} />;
      case 'Iridescence':
        return <IridescenceBackground key={key} {...commonProps} />;
      case 'Waves':
        return <WavesBackground key={key} {...commonProps} />;
      case 'Grid Distortion':
        return <GridDistortionBackground key={key} {...commonProps} />;
      case 'Ballpit':
        return <BallpitBackground key={key} {...commonProps} />;
      case 'Orb':
        return <OrbBackground key={key} {...commonProps} />;
      case 'Letter Glitch':
        return <LetterGlitchBackground key={key} {...commonProps} />;
      case 'Grid Motion':
        return <GridMotionBackground key={key} {...commonProps} />;
      case 'Squares':
        return <SquaresBackground key={key} {...commonProps} />;
      case 'Liquid Chrome':
        return <LiquidChromeBackground key={key} {...commonProps} />;
      case 'Balatro':
        return <BalatroBackground key={key} {...commonProps} />;
      default:
        return <PixelBlastBackground key={key} {...commonProps} />;
    }
  };

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Handle real-time updates when controls change
  const handleControlChange = () => {
    setAnimationKey(prev => prev + 1);
  };

  // Update animation key when any control changes
  React.useEffect(() => {
    handleControlChange();
  }, [customText, animationDuration, animationDelay, textColor, fontSize, activeBackground, animationSize, animationStyle]);

  const getCLICommand = () => {
    const componentName = activeBackground.replace(' ', '').toLowerCase();
    
    const cliCommands = {
      'liquidether': 'npx jsrepo add liquid-ether',
      'prism': 'npx jsrepo add prism',
      'darkveil': 'npx jsrepo add dark-veil',
      'silk': 'npx jsrepo add silk',
      'lightrays': 'npx jsrepo add light-rays',
      'pixelblast': 'npx jsrepo add pixel-blast',
      'aurora': 'npx jsrepo add aurora',
      'plasma': 'npx jsrepo add plasma',
      'particles': 'npx jsrepo add particles',
      'gradientblinds': 'npx jsrepo add gradient-blinds',
      'beams': 'npx jsrepo add beams',
      'lightning': 'npx jsrepo add lightning',
      'prismaticburst': 'npx jsrepo add prismatic-burst',
      'galaxy': 'npx jsrepo add galaxy',
      'dither': 'npx jsrepo add dither',
      'faultyterminal': 'npx jsrepo add faulty-terminal',
      'ripplegrid': 'npx jsrepo add ripple-grid',
      'dotgrid': 'npx jsrepo add dot-grid',
      'threads': 'npx jsrepo add threads',
      'hyperspeed': 'npx jsrepo add hyperspeed',
      'iridescence': 'npx jsrepo add iridescence',
      'waves': 'npx jsrepo add waves',
      'griddistortion': 'npx jsrepo add grid-distortion',
      'ballpit': 'npx jsrepo add ballpit',
      'orb': 'npx jsrepo add orb',
      'letterglitch': 'npx jsrepo add letter-glitch',
      'gridmotion': 'npx jsrepo add grid-motion',
      'squares': 'npx jsrepo add squares',
      'liquidchrome': 'npx jsrepo add liquid-chrome',
      'balatro': 'npx jsrepo add balatro'
    };

    return cliCommands[componentName] || `npx jsrepo add ${componentName}`;
  };

  const getInstallCommand = (packageManager) => {
    const componentName = activeBackground.replace(' ', '').toLowerCase();
    const packageName = `@react-bits/${componentName}`;
    
    switch (packageManager) {
      case 'npm': return `npm install ${packageName}`;
      case 'pnpm': return `pnpm add ${packageName}`;
      case 'yarn': return `yarn add ${packageName}`;
      case 'bun': return `bun add ${packageName}`;
      default: return `npm install ${packageName}`;
    }
  };

  const getUsageExample = () => {
    const componentName = activeBackground.replace(' ', '');
    
    return `import { ${componentName} } from '@react-bits/${componentName.toLowerCase()}';

export default function App() {
  return (
    <${componentName}
      text="${customText}"
      duration={${animationDuration}}
      delay={${animationDelay}}
      className="${fontSize} font-bold"
      style={{ color: '${textColor}' }}
    />
  );
}`;
  };

  const getComponentCode = () => {
    const componentName = activeBackground.replace(' ', '');
    
    if (activeBackground === 'Pixel Blast') {
      return `import React from 'react';
import { motion } from 'framer-motion';

interface ${componentName}Props {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ${componentName}: React.FC<${componentName}Props> = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={\`relative overflow-hidden \${className}\`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Pixel Blast Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: \`\${Math.random() * 100}%\`,
                top: \`\${Math.random() * 100}%\`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: duration,
                delay: delay + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default ${componentName};`;
    }
    
    return `import React from 'react';
import { motion } from 'framer-motion';

interface ${componentName}Props {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ${componentName}: React.FC<${componentName}Props> = ({ 
  text, 
  delay = 0, 
  duration = 0.8,
  className = "",
  style = {}
}) => {
  return (
    <motion.div
      className={\`relative overflow-hidden \${className}\`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
        {/* Add your background animation here */}
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default ${componentName};`;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#100c18' }}>
      <style jsx>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 3px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
      {/* Top Navigation Bar */}
      <div className="border-b border-gray-800 sticky top-0 z-50" style={{ backgroundColor: '#100c18' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8b5cf6' }}>
                <span className="text-white font-bold text-sm">RB</span>
              </div>
              <span className="text-white font-semibold text-lg">React Bits</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search Docs"
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-white placeholder-gray-400"
                  style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="text-gray-300 hover:text-white"
                style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
              >
                <Code2 className="w-4 h-4 mr-2" />
                TS
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              
              <Button
                className="text-white px-4 py-2 rounded-lg"
                style={{ backgroundColor: '#8b5cf6' }}
              >
                <Github className="w-4 h-4 mr-2" />
                Star On GitHub
                <span className="ml-2 px-2 py-1 rounded text-xs" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  28.5K
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div 
          className="w-64 h-screen overflow-y-auto sidebar-scroll" 
          style={{ 
            backgroundColor: '#1a1a1a', 
            borderRight: '1px solid #333'
          }}
        >
          <div className="p-6">
            {/* Get Started Section */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>
                GET STARTED
              </h3>
              <div className="space-y-1">
                {getStartedItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="cursor-pointer py-2 px-3 rounded-md hover:bg-gray-700 transition-colors" 
                    style={{ color: '#d1d5db' }}
                  >
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Backgrounds Section */}
            <div>
              <h3 className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: '#9ca3af', letterSpacing: '0.1em' }}>
                BACKGROUNDS
              </h3>
              <div className="space-y-1">
                {backgroundItems.map((background, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition-all duration-200 ${
                      activeBackground === background
                        ? 'text-white'
                        : 'hover:text-white hover:bg-gray-700'
                    }`}
                    style={{
                      backgroundColor: activeBackground === background ? '#374151' : 'transparent',
                      borderRadius: '6px'
                    }}
                    onClick={() => setActiveBackground(background)}
                  >
                    {/* Purple line indicator for active item */}
                    {activeBackground === background && (
                      <div 
                        className="absolute left-0 top-0 bottom-0 rounded-r" 
                        style={{ 
                          backgroundColor: '#8b5cf6',
                          width: '3px',
                          borderRadius: '0 3px 3px 0'
                        }}
                      ></div>
                    )}
                    <span 
                      className="text-sm font-medium ml-1" 
                      style={{ color: activeBackground === background ? 'white' : '#d1d5db' }}
                    >
                      {background}
                    </span>
                    {(background === 'Liquid Ether' || background === 'Prism' || background === 'Pixel Blast' || background === 'Gradient Blinds' || background === 'Prismatic Burst') && (
                      <Badge 
                        variant="secondary" 
                        className="text-white text-xs px-2 py-1" 
                        style={{ 
                          backgroundColor: '#8b5cf6',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: '600'
                        }}
                      >
                        New
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8" style={{ backgroundColor: '#100c18' }}>
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{activeBackground}</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Contribute
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mt-6">
              <Button
                variant={activeTab === 'preview' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('preview')}
                className={activeTab === 'preview' ? 'text-white' : 'text-gray-300 hover:text-white'}
                style={{
                  backgroundColor: activeTab === 'preview' ? '#8b5cf6' : '#1a1a1a',
                  border: '1px solid #333'
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                variant={activeTab === 'code' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('code')}
                className={activeTab === 'code' ? 'text-white' : 'text-gray-300 hover:text-white'}
                style={{
                  backgroundColor: activeTab === 'code' ? '#8b5cf6' : '#1a1a1a',
                  border: '1px solid #333'
                }}
              >
                <Code2 className="w-4 h-4 mr-2" />
                Code
              </Button>
            </div>
          </div>

          {/* Content */}
          {activeTab === 'preview' && (
            <div className="space-y-8">
              {/* Preview Area */}
              <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                <div className="p-6">
                  <div className="min-h-[400px] flex items-center justify-center">
                    {renderBackground()}
                  </div>
                </div>
              </div>

              {/* Customization Controls */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Animation Settings */}
                <div className="rounded-lg p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                  <h3 className="text-lg font-semibold text-white mb-4">Animation Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>Duration: {animationDuration}s</label>
                      <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value={animationDuration}
                        onChange={(e) => setAnimationDuration(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>Delay: {animationDelay}s</label>
                      <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        value={animationDelay}
                        onChange={(e) => setAnimationDelay(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Text Settings */}
                <div className="rounded-lg p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                  <h3 className="text-lg font-semibold text-white mb-4">Text Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>Text</label>
                      <input
                        type="text"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        className="w-full rounded-md px-3 py-2 text-white"
                        style={{ backgroundColor: '#374151', border: '1px solid #333' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>Font Size</label>
                      <select 
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                        className="w-full rounded-md px-3 py-2 text-white"
                        style={{ backgroundColor: '#374151', border: '1px solid #333' }}
                      >
                        <option value="text-xs">Extra Small</option>
                        <option value="text-sm">Small</option>
                        <option value="text-base">Base</option>
                        <option value="text-lg">Medium</option>
                        <option value="text-xl">Large</option>
                        <option value="text-2xl">Extra Large</option>
                        <option value="text-3xl">3XL</option>
                        <option value="text-4xl">4XL</option>
                        <option value="text-5xl">5XL</option>
                        <option value="text-6xl">6XL</option>
                        <option value="text-7xl">7XL</option>
                        <option value="text-8xl">8XL</option>
                        <option value="text-9xl">9XL</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>Animation Size</label>
                      <select 
                        value={animationSize} 
                        onChange={(e) => setAnimationSize(e.target.value)}
                        className="w-full rounded-md px-3 py-2 text-white"
                        style={{ backgroundColor: '#374151', border: '1px solid #333' }}
                      >
                        <option value="tiny">Tiny (Profile)</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="huge">Huge</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>Animation Style</label>
                      <select 
                        value={animationStyle} 
                        onChange={(e) => setAnimationStyle(e.target.value)}
                        className="w-full rounded-md px-3 py-2 text-white"
                        style={{ backgroundColor: '#374151', border: '1px solid #333' }}
                      >
                        <option value="default">Default</option>
                        <option value="subtle">Subtle</option>
                        <option value="dramatic">Dramatic</option>
                        <option value="minimal">Minimal</option>
                        <option value="playful">Playful</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Settings */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                <h3 className="text-lg font-semibold text-white mb-4">Color Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>Text Color</label>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-12 h-8 rounded border-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-8">
              {/* Install Section */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                <h3 className="text-lg font-semibold text-white mb-4">Install</h3>
                <div className="flex space-x-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-300 hover:text-white"
                    style={{ backgroundColor: '#374151', border: '1px solid #333' }}
                  >
                    CLI
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-300 hover:text-white"
                    style={{ backgroundColor: '#374151', border: '1px solid #333' }}
                  >
                    Manual
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  {['npm', 'pnpm', 'yarn', 'bun'].map((pm) => (
                    <Button
                      key={pm}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPackageManager(pm)}
                      className={`text-gray-300 hover:text-white ${
                        selectedPackageManager === pm ? 'border-purple-500' : ''
                      }`}
                      style={{
                        backgroundColor: selectedPackageManager === pm ? '#374151' : '#1a1a1a',
                        border: selectedPackageManager === pm ? '1px solid #8b5cf6' : '1px solid #333'
                      }}
                    >
                      {pm}
                    </Button>
                  ))}
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>CLI Command</label>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm text-white bg-gray-800 px-3 py-2 rounded flex-1">
                        {getCLICommand()}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(getCLICommand())}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>Manual Install</label>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm text-white bg-gray-800 px-3 py-2 rounded flex-1">
                        {getInstallCommand(selectedPackageManager)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(getInstallCommand(selectedPackageManager))}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Section */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                <h3 className="text-lg font-semibold text-white mb-4">Usage</h3>
                <div className="relative">
                  <pre className="text-sm text-gray-300 bg-gray-800 p-4 rounded overflow-x-auto">
                    <code>{getUsageExample()}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(getUsageExample())}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Code Section */}
              <div className="rounded-lg p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
                <h3 className="text-lg font-semibold text-white mb-4">Code</h3>
                <div className="relative">
                  <pre className="text-sm text-gray-300 bg-gray-800 p-4 rounded overflow-x-auto max-h-96">
                    <code>{getComponentCode()}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(getComponentCode())}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Background Components
const PixelBlastBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Pixel Blast Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: duration,
                delay: delay + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const LiquidEtherBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 opacity-40">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.3, 1, 0.3],
                rotate: [0, 360]
              }}
              transition={{
                duration: duration * 2,
                delay: delay + Math.random() * 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const PrismBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-yellow-900 to-blue-900">
        <div className="absolute inset-0 opacity-50">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: duration * 1.5,
                delay: delay + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const AuroraBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-teal-900 to-blue-900">
        <div className="absolute inset-0 opacity-60">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scaleX: [0, 2, 0],
                opacity: [0, 1, 0],
                rotate: [0, 45, 0]
              }}
              transition={{
                duration: duration * 2,
                delay: delay + Math.random() * 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const PlasmaBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
        <div className="absolute inset-0 opacity-50">
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-pink-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0.5, 2, 0.5],
                opacity: [0.2, 1, 0.2],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50]
              }}
              transition={{
                duration: duration * 1.8,
                delay: delay + Math.random() * 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const ParticlesBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 opacity-40">
          {Array.from({ length: 80 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -50, 0]
              }}
              transition={{
                duration: duration * 1.2,
                delay: delay + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

// Additional Background Components
const DarkVeilBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="absolute inset-0 opacity-60">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 bg-gray-600 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                blur: [0, 10, 0]
              }}
              transition={{
                duration: duration * 3,
                delay: delay + Math.random() * 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const SilkBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 opacity-50">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.3, 1, 0.3],
                rotate: [0, 360],
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100]
              }}
              transition={{
                duration: duration * 2.5,
                delay: delay + Math.random() * 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const LightRaysBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900">
        <div className="absolute inset-0 opacity-70">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-20 bg-gradient-to-b from-yellow-400 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transformOrigin: 'bottom'
              }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: duration * 2,
                delay: delay + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const GradientBlindsBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 opacity-60">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
              style={{
                top: `${i * 12.5}%`,
                left: 0
              }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: duration * 1.5,
                delay: delay + i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const BeamsBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 opacity-50">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-full bg-gradient-to-b from-cyan-400 to-transparent"
              style={{
                left: `${(i + 1) * 16.66}%`,
                top: 0
              }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: duration * 2,
                delay: delay + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const LightningBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 opacity-80">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-32 bg-gradient-to-b from-white to-blue-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: 'rotate(45deg)'
              }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [45, 135, 45]
              }}
              transition={{
                duration: duration * 0.5,
                delay: delay + Math.random() * 1,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const PrismaticBurstBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-yellow-900 via-green-900 via-blue-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 opacity-60">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `hsl(${Math.random() * 360}, 70%, 60%)`
              }}
              animate={{
                scale: [0, 2, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: duration * 1.5,
                delay: delay + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const GalaxyBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="absolute inset-0 opacity-70">
          {Array.from({ length: 200 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: duration * 3,
                delay: delay + Math.random() * 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const DitherBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black">
        <div className="absolute inset-0 opacity-80">
          {Array.from({ length: 1000 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: duration * 0.1,
                delay: delay + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const FaultyTerminalBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-black">
        <div className="absolute inset-0 opacity-60">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: duration * 0.2,
                delay: delay + Math.random() * 1,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const RippleGridBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 opacity-50">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 border-2 border-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0, 3, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: duration * 2,
                delay: delay + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const DotGridBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 opacity-60">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${(i % 10) * 10}%`,
                top: `${Math.floor(i / 10) * 10}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: duration * 1.5,
                delay: delay + i * 0.05,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const ThreadsBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
        <div className="absolute inset-0 opacity-50">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-20 bg-gradient-to-b from-purple-400 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: duration * 2.5,
                delay: delay + Math.random() * 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const HyperspeedBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 opacity-70">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-8 bg-gradient-to-r from-blue-400 to-purple-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                x: [0, 200, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: duration * 0.5,
                delay: delay + Math.random() * 1,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const IridescenceBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-purple-900 to-blue-900">
        <div className="absolute inset-0 opacity-60">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(45deg, hsl(${Math.random() * 360}, 70%, 60%), hsl(${Math.random() * 360}, 70%, 60%))`
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: duration * 2,
                delay: delay + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const WavesBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 opacity-60">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-16 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400"
              style={{
                top: `${i * 12.5}%`,
                left: 0
              }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 0.8, 0],
                x: [0, 50, 0]
              }}
              transition={{
                duration: duration * 2,
                delay: delay + i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const GridDistortionBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 opacity-70">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-1 bg-gradient-to-r from-gray-400 to-white"
              style={{
                top: `${i * 5}%`,
                left: 0
              }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 1, 0],
                skewX: [0, 10, 0]
              }}
              transition={{
                duration: duration * 1.5,
                delay: delay + i * 0.1,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const BallpitBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900">
        <div className="absolute inset-0 opacity-60">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `hsl(${Math.random() * 60 + 30}, 70%, 60%)`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -50, 0]
              }}
              transition={{
                duration: duration * 2,
                delay: delay + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const OrbBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900">
        <div className="absolute inset-0 opacity-50">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: duration * 3,
                delay: delay + Math.random() * 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const LetterGlitchBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-green-900 to-blue-900">
        <div className="absolute inset-0 opacity-70">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, Math.random() * 20 - 10, 0],
                y: [0, Math.random() * 20 - 10, 0]
              }}
              transition={{
                duration: duration * 0.3,
                delay: delay + Math.random() * 1,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const GridMotionBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 opacity-60">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white"
              style={{
                left: `${(i % 10) * 10}%`,
                top: `${Math.floor(i / 10) * 10}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [0, Math.random() * 10 - 5, 0],
                y: [0, Math.random() * 10 - 5, 0]
              }}
              transition={{
                duration: duration * 1.5,
                delay: delay + i * 0.02,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const SquaresBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 opacity-50">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 bg-gradient-to-r from-indigo-400 to-pink-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 90, 0]
              }}
              transition={{
                duration: duration * 2,
                delay: delay + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const LiquidChromeBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <div className="absolute inset-0 opacity-60">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360],
                x: [0, Math.random() * 50 - 25, 0],
                y: [0, Math.random() * 50 - 25, 0]
              }}
              transition={{
                duration: duration * 2.5,
                delay: delay + Math.random() * 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const BalatroBackground = ({ text, delay = 0, duration = 0.8, className = "", style = {} }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
        <div className="absolute inset-0 opacity-50">
          {Array.from({ length: 35 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0, 2, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
                y: [0, -30, 0]
              }}
              transition={{
                duration: duration * 1.8,
                delay: delay + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.h1
          className="text-white text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration, delay: delay + 0.5 }}
        >
          {text}
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default BackgroundsPage;
