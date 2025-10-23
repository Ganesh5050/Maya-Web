import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Zap, 
  Download, 
  RotateCcw, 
  Sparkles,
  Wand2,
  Eye,
  Copy,
  RefreshCw
} from 'lucide-react';

// Theme Types
export type ThemeType = 'cyberpunk' | 'minimalist' | 'luxury' | 'futuristic' | 'brutalist' | 'neumorphic' | 'glassmorphism' | 'y2k';

// Theme Configuration
export interface ThemeConfig {
  id: ThemeType;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  animations: {
    duration: number;
    easing: string;
    bounce: boolean;
  };
  effects: {
    blur: boolean;
    glow: boolean;
    gradient: boolean;
    glassmorphism: boolean;
  };
}

// Neural Style Transformer Class
export class NeuralStyleTransformerService {
  private static themePresets: Record<ThemeType, ThemeConfig> = {
    cyberpunk: {
      id: 'cyberpunk',
      name: 'Cyberpunk',
      description: 'Neon-soaked futuristic aesthetic with glitch effects',
      colors: {
        primary: '#00ffff',
        secondary: '#ff00ff',
        accent: '#ffff00',
        background: '#0a0a0a',
        surface: '#1a1a1a',
        text: '#ffffff',
        muted: '#666666',
      },
      typography: {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
      },
      shadows: {
        sm: '0 0 10px rgba(0, 255, 255, 0.3)',
        md: '0 0 20px rgba(0, 255, 255, 0.4)',
        lg: '0 0 30px rgba(0, 255, 255, 0.5)',
        xl: '0 0 40px rgba(0, 255, 255, 0.6)',
      },
      animations: {
        duration: 0.3,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: false,
      },
      effects: {
        blur: true,
        glow: true,
        gradient: true,
        glassmorphism: false,
      },
    },
    minimalist: {
      id: 'minimalist',
      name: 'Minimalist',
      description: 'Clean, simple design with maximum white space',
      colors: {
        primary: '#000000',
        secondary: '#333333',
        accent: '#666666',
        background: '#ffffff',
        surface: '#f8f9fa',
        text: '#000000',
        muted: '#6c757d',
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
      },
      shadows: {
        sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
      },
      animations: {
        duration: 0.2,
        easing: 'ease-out',
        bounce: false,
      },
      effects: {
        blur: false,
        glow: false,
        gradient: false,
        glassmorphism: false,
      },
    },
    luxury: {
      id: 'luxury',
      name: 'Luxury',
      description: 'Elegant gold and black design with sophisticated typography',
      colors: {
        primary: '#ffd700',
        secondary: '#b8860b',
        accent: '#ffed4e',
        background: '#000000',
        surface: '#1a1a1a',
        text: '#ffffff',
        muted: '#888888',
      },
      typography: {
        fontFamily: 'Playfair Display, serif',
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
      },
      shadows: {
        sm: '0 0 10px rgba(255, 215, 0, 0.3)',
        md: '0 0 20px rgba(255, 215, 0, 0.4)',
        lg: '0 0 30px rgba(255, 215, 0, 0.5)',
        xl: '0 0 40px rgba(255, 215, 0, 0.6)',
      },
      animations: {
        duration: 0.5,
        easing: 'ease-in-out',
        bounce: false,
      },
      effects: {
        blur: false,
        glow: true,
        gradient: true,
        glassmorphism: false,
      },
    },
    futuristic: {
      id: 'futuristic',
      name: 'Futuristic',
      description: 'Sci-fi inspired with metallic surfaces and holographic effects',
      colors: {
        primary: '#00ff88',
        secondary: '#00cc6a',
        accent: '#88ffaa',
        background: '#0a0a0a',
        surface: '#1a1a1a',
        text: '#ffffff',
        muted: '#666666',
      },
      typography: {
        fontFamily: 'Orbitron, monospace',
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
      },
      shadows: {
        sm: '0 0 10px rgba(0, 255, 136, 0.3)',
        md: '0 0 20px rgba(0, 255, 136, 0.4)',
        lg: '0 0 30px rgba(0, 255, 136, 0.5)',
        xl: '0 0 40px rgba(0, 255, 136, 0.6)',
      },
      animations: {
        duration: 0.4,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: false,
      },
      effects: {
        blur: true,
        glow: true,
        gradient: true,
        glassmorphism: true,
      },
    },
    brutalist: {
      id: 'brutalist',
      name: 'Brutalist',
      description: 'Bold, raw design with concrete textures and stark contrasts',
      colors: {
        primary: '#ff0000',
        secondary: '#cc0000',
        accent: '#ff6666',
        background: '#ffffff',
        surface: '#f0f0f0',
        text: '#000000',
        muted: '#666666',
      },
      typography: {
        fontFamily: 'Impact, sans-serif',
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
      },
      shadows: {
        sm: '4px 4px 0px rgba(0, 0, 0, 0.3)',
        md: '8px 8px 0px rgba(0, 0, 0, 0.3)',
        lg: '12px 12px 0px rgba(0, 0, 0, 0.3)',
        xl: '16px 16px 0px rgba(0, 0, 0, 0.3)',
      },
      animations: {
        duration: 0.1,
        easing: 'linear',
        bounce: false,
      },
      effects: {
        blur: false,
        glow: false,
        gradient: false,
        glassmorphism: false,
      },
    },
    neumorphic: {
      id: 'neumorphic',
      name: 'Neumorphic',
      description: 'Soft, tactile design with subtle shadows and highlights',
      colors: {
        primary: '#6366f1',
        secondary: '#4f46e5',
        accent: '#8b5cf6',
        background: '#f1f5f9',
        surface: '#ffffff',
        text: '#1e293b',
        muted: '#64748b',
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
      },
      shadows: {
        sm: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.7)',
        md: 'inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.7)',
        lg: 'inset 6px 6px 12px rgba(0, 0, 0, 0.1), inset -6px -6px 12px rgba(255, 255, 255, 0.7)',
        xl: 'inset 8px 8px 16px rgba(0, 0, 0, 0.1), inset -8px -8px 16px rgba(255, 255, 255, 0.7)',
      },
      animations: {
        duration: 0.3,
        easing: 'ease-out',
        bounce: true,
      },
      effects: {
        blur: false,
        glow: false,
        gradient: false,
        glassmorphism: false,
      },
    },
    glassmorphism: {
      id: 'glassmorphism',
      name: 'Glassmorphism',
      description: 'Translucent glass-like surfaces with blur effects',
      colors: {
        primary: '#3b82f6',
        secondary: '#1d4ed8',
        accent: '#60a5fa',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        surface: 'rgba(255, 255, 255, 0.1)',
        text: '#ffffff',
        muted: 'rgba(255, 255, 255, 0.7)',
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
      },
      shadows: {
        sm: '0 8px 32px rgba(31, 38, 135, 0.37)',
        md: '0 8px 32px rgba(31, 38, 135, 0.37)',
        lg: '0 8px 32px rgba(31, 38, 135, 0.37)',
        xl: '0 8px 32px rgba(31, 38, 135, 0.37)',
      },
      animations: {
        duration: 0.4,
        easing: 'ease-out',
        bounce: false,
      },
      effects: {
        blur: true,
        glow: false,
        gradient: true,
        glassmorphism: true,
      },
    },
    y2k: {
      id: 'y2k',
      name: 'Y2K',
      description: 'Retro-futuristic design with chrome gradients and bold colors',
      colors: {
        primary: '#ff00ff',
        secondary: '#00ffff',
        accent: '#ffff00',
        background: '#000000',
        surface: '#1a1a1a',
        text: '#ffffff',
        muted: '#666666',
      },
      typography: {
        fontFamily: 'Arial Black, sans-serif',
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
      },
      shadows: {
        sm: '0 0 10px rgba(255, 0, 255, 0.5)',
        md: '0 0 20px rgba(255, 0, 255, 0.6)',
        lg: '0 0 30px rgba(255, 0, 255, 0.7)',
        xl: '0 0 40px rgba(255, 0, 255, 0.8)',
      },
      animations: {
        duration: 0.3,
        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        bounce: true,
      },
      effects: {
        blur: false,
        glow: true,
        gradient: true,
        glassmorphism: false,
      },
    },
  };

  static transformTheme(themeId: ThemeType): ThemeConfig {
    return this.themePresets[themeId];
  }

  static generateCSS(theme: ThemeConfig): string {
    return `
/* ${theme.name} Theme */
:root {
  --color-primary: ${theme.colors.primary};
  --color-secondary: ${theme.colors.secondary};
  --color-accent: ${theme.colors.accent};
  --color-background: ${theme.colors.background};
  --color-surface: ${theme.colors.surface};
  --color-text: ${theme.colors.text};
  --color-muted: ${theme.colors.muted};
  
  --font-family: ${theme.typography.fontFamily};
  --font-size-xs: ${theme.typography.fontSize.xs};
  --font-size-sm: ${theme.typography.fontSize.sm};
  --font-size-base: ${theme.typography.fontSize.base};
  --font-size-lg: ${theme.typography.fontSize.lg};
  --font-size-xl: ${theme.typography.fontSize.xl};
  --font-size-2xl: ${theme.typography.fontSize['2xl']};
  --font-size-3xl: ${theme.typography.fontSize['3xl']};
  
  --spacing-xs: ${theme.spacing.xs};
  --spacing-sm: ${theme.spacing.sm};
  --spacing-md: ${theme.spacing.md};
  --spacing-lg: ${theme.spacing.lg};
  --spacing-xl: ${theme.spacing.xl};
  --spacing-2xl: ${theme.spacing['2xl']};
  
  --shadow-sm: ${theme.shadows.sm};
  --shadow-md: ${theme.shadows.md};
  --shadow-lg: ${theme.shadows.lg};
  --shadow-xl: ${theme.shadows.xl};
  
  --animation-duration: ${theme.animations.duration}s;
  --animation-easing: ${theme.animations.easing};
}

body {
  font-family: var(--font-family);
  background: var(--color-background);
  color: var(--color-text);
}

.card {
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
  border-radius: 8px;
  padding: var(--spacing-md);
}

.button {
  background: var(--color-primary);
  color: var(--color-text);
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 4px;
  transition: all var(--animation-duration) var(--animation-easing);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

${theme.effects.glassmorphism ? `
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
` : ''}

${theme.effects.glow ? `
.glow {
  box-shadow: 0 0 20px var(--color-primary);
}
` : ''}
    `.trim();
  }

  static generateTailwindConfig(theme: ThemeConfig): string {
    return `
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${theme.colors.primary}',
        secondary: '${theme.colors.secondary}',
        accent: '${theme.colors.accent}',
        background: '${theme.colors.background}',
        surface: '${theme.colors.surface}',
        text: '${theme.colors.text}',
        muted: '${theme.colors.muted}',
      },
      fontFamily: {
        sans: ['${theme.typography.fontFamily}', 'sans-serif'],
      },
      fontSize: {
        xs: '${theme.typography.fontSize.xs}',
        sm: '${theme.typography.fontSize.sm}',
        base: '${theme.typography.fontSize.base}',
        lg: '${theme.typography.fontSize.lg}',
        xl: '${theme.typography.fontSize.xl}',
        '2xl': '${theme.typography.fontSize['2xl']}',
        '3xl': '${theme.typography.fontSize['3xl']}',
      },
      spacing: {
        xs: '${theme.spacing.xs}',
        sm: '${theme.spacing.sm}',
        md: '${theme.spacing.md}',
        lg: '${theme.spacing.lg}',
        xl: '${theme.spacing.xl}',
        '2xl': '${theme.spacing['2xl']}',
      },
      boxShadow: {
        sm: '${theme.shadows.sm}',
        md: '${theme.shadows.md}',
        lg: '${theme.shadows.lg}',
        xl: '${theme.shadows.xl}',
      },
      animation: {
        duration: '${theme.animations.duration}s',
        easing: '${theme.animations.easing}',
      },
    },
  },
};
    `.trim();
  }
}

// Theme Preview Component
const ThemePreview: React.FC<{
  theme: ThemeConfig;
  isActive: boolean;
  onClick: () => void;
}> = ({ theme, isActive, onClick }) => {
  return (
    <motion.div
      className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
        isActive ? 'border-purple-500 shadow-lg' : 'border-white/10 hover:border-white/20'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="h-32 relative"
        style={{
          background: theme.colors.background,
          color: theme.colors.text,
        }}
      >
        {/* Background Pattern */}
        {theme.effects.gradient && (
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background: `linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            }}
          />
        )}
        
        {/* Sample Elements */}
        <div className="absolute inset-0 p-4">
          <div
            className="h-8 rounded mb-2"
            style={{
              background: theme.colors.surface,
              boxShadow: theme.shadows.sm,
            }}
          />
          <div
            className="h-4 rounded mb-2"
            style={{
              background: theme.colors.primary,
              width: '60%',
            }}
          />
          <div
            className="h-3 rounded"
            style={{
              background: theme.colors.muted,
              width: '40%',
            }}
          />
        </div>

        {/* Theme Name */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
          <div
            className="text-sm font-medium text-center"
            style={{ color: theme.colors.text }}
          >
            {theme.name}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Neural Style Transformer Component
export const NeuralStyleTransformer: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('cyberpunk');
  const [isTransforming, setIsTransforming] = useState(false);
  const [generatedCSS, setGeneratedCSS] = useState('');
  const [generatedTailwind, setGeneratedTailwind] = useState('');
  const [activeTab, setActiveTab] = useState('preview');

  const currentTheme = NeuralStyleTransformerService.transformTheme(selectedTheme);

  const handleTransform = async () => {
    setIsTransforming(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const css = NeuralStyleTransformerService.generateCSS(currentTheme);
    const tailwind = NeuralStyleTransformerService.generateTailwindConfig(currentTheme);
    
    setGeneratedCSS(css);
    setGeneratedTailwind(tailwind);
    setIsTransforming(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    if (selectedTheme) {
      handleTransform();
    }
  }, [selectedTheme]);

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
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Neural Style Transformer
            </h1>
            <p className="text-muted-foreground">
              Instantly transform any design with AI-powered theme generation
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Selection */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
            <h2 className="text-xl font-semibold mb-4">Choose Theme</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.values(NeuralStyleTransformerService.transformTheme('cyberpunk')).map((theme) => (
                <ThemePreview
                  key={theme.id}
                  theme={theme}
                  isActive={selectedTheme === theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                />
              ))}
            </div>
            
            <div className="mt-6">
              <Button
                onClick={handleTransform}
                disabled={isTransforming}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isTransforming ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                    </motion.div>
                    Transforming...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Transform Design
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Preview & Code */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
              <TabsTrigger value="css">CSS Code</TabsTrigger>
              <TabsTrigger value="tailwind">Tailwind Config</TabsTrigger>
            </TabsList>

            <TabsContent value="preview">
              <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
                <h3 className="text-xl font-semibold mb-4">Live Preview</h3>
                <div
                  className="p-6 rounded-lg"
                  style={{
                    background: currentTheme.colors.background,
                    color: currentTheme.colors.text,
                    fontFamily: currentTheme.typography.fontFamily,
                  }}
                >
                  <div className="space-y-4">
                    <h1
                      className="text-3xl font-bold"
                      style={{ color: currentTheme.colors.primary }}
                    >
                      {currentTheme.name} Theme
                    </h1>
                    <p style={{ color: currentTheme.colors.muted }}>
                      {currentTheme.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className="p-4 rounded-lg"
                        style={{
                          background: currentTheme.colors.surface,
                          boxShadow: currentTheme.shadows.md,
                        }}
                      >
                        <h3 className="font-semibold mb-2">Sample Card</h3>
                        <p style={{ color: currentTheme.colors.muted }}>
                          This is how your content will look with the {currentTheme.name} theme.
                        </p>
                      </div>
                      
                      <div
                        className="p-4 rounded-lg"
                        style={{
                          background: currentTheme.colors.primary,
                          color: currentTheme.colors.text,
                          boxShadow: currentTheme.shadows.lg,
                        }}
                      >
                        <h3 className="font-semibold mb-2">Primary Button</h3>
                        <p>Call to action elements</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="css">
              <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Generated CSS</h3>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedCSS)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy CSS
                  </Button>
                </div>
                <pre className="text-sm text-muted-foreground overflow-auto max-h-96 bg-black/20 p-4 rounded-lg">
                  {generatedCSS}
                </pre>
              </Card>
            </TabsContent>

            <TabsContent value="tailwind">
              <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Tailwind Config</h3>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedTailwind)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Config
                  </Button>
                </div>
                <pre className="text-sm text-muted-foreground overflow-auto max-h-96 bg-black/20 p-4 rounded-lg">
                  {generatedTailwind}
                </pre>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Wand2 className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold">8 Complete Themes</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Cyberpunk, Minimalist, Luxury, Futuristic, Brutalist, Neumorphic, Glassmorphism, Y2K
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold">Instant Transformation</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            One click transforms colors, fonts, spacing, shadows, and animations instantly.
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Download className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="font-semibold">Export Ready</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Get CSS and Tailwind config files ready for production use.
          </p>
        </Card>
      </div>
    </div>
  );
};
