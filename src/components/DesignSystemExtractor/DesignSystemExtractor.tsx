import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Upload, 
  Link, 
  Palette, 
  Type, 
  Layout, 
  Download,
  Eye,
  RefreshCw,
  Sparkles,
  Zap,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  Globe,
  Copy,
  Settings,
  Wand2
} from 'lucide-react';

import { OpenAIService } from '@/services/openai';

// Design System Extractor Service
class DesignSystemExtractorService {
  private static extractedData: any = null;

  static async extractFromImage(imageFile: File): Promise<any> {
    // Simulate image analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted design system data
    const mockData = {
      colors: {
        primary: '#6366f1',
        secondary: '#ec4899',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1f2937',
        muted: '#6b7280'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        headingFont: 'Inter, sans-serif',
        fontSize: {
          xs: '12px',
          sm: '14px',
          base: '16px',
          lg: '18px',
          xl: '20px',
          '2xl': '24px',
          '3xl': '30px',
          '4xl': '36px'
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700
        },
        lineHeight: {
          tight: 1.25,
          normal: 1.5,
          relaxed: 1.75
        }
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px'
      },
      borderRadius: {
        none: '0px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px'
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
      },
      components: [
        {
          name: 'Button',
          type: 'primary',
          styles: {
            backgroundColor: '#6366f1',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 500
          }
        },
        {
          name: 'Card',
          type: 'default',
          styles: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }
        }
      ],
      layout: {
        maxWidth: '1200px',
        containerPadding: '16px',
        gridColumns: 12,
        breakpoints: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px'
        }
      }
    };

    this.extractedData = mockData;
    return mockData;
  }

  static async extractFromURL(url: string): Promise<any> {
    // Simulate URL analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock extracted data from URL
    const mockData = {
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981',
        accent: '#f59e0b',
        background: '#f8fafc',
        text: '#1e293b',
        muted: '#64748b'
      },
      typography: {
        fontFamily: 'system-ui, sans-serif',
        headingFont: 'system-ui, sans-serif',
        fontSize: {
          xs: '12px',
          sm: '14px',
          base: '16px',
          lg: '18px',
          xl: '20px',
          '2xl': '24px',
          '3xl': '30px',
          '4xl': '36px'
        }
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px'
      },
      components: [
        {
          name: 'Button',
          type: 'primary',
          styles: {
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '6px'
          }
        }
      ]
    };

    this.extractedData = mockData;
    return mockData;
  }

  static generateTailwindConfig(data: any): string {
    return `module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '${data.colors.primary}',
        secondary: '${data.colors.secondary}',
        accent: '${data.colors.accent}',
        background: '${data.colors.background}',
        text: '${data.colors.text}',
        muted: '${data.colors.muted}'
      },
      fontFamily: {
        sans: ['${data.typography.fontFamily}'],
        heading: ['${data.typography.headingFont}']
      },
      fontSize: {
        xs: '${data.typography.fontSize.xs}',
        sm: '${data.typography.fontSize.sm}',
        base: '${data.typography.fontSize.base}',
        lg: '${data.typography.fontSize.lg}',
        xl: '${data.typography.fontSize.xl}',
        '2xl': '${data.typography.fontSize['2xl']}',
        '3xl': '${data.typography.fontSize['3xl']}',
        '4xl': '${data.typography.fontSize['4xl']}'
      },
      spacing: {
        xs: '${data.spacing.xs}',
        sm: '${data.spacing.sm}',
        md: '${data.spacing.md}',
        lg: '${data.spacing.lg}',
        xl: '${data.spacing.xl}',
        '2xl': '${data.spacing['2xl']}'
      },
      borderRadius: {
        sm: '${data.borderRadius.sm}',
        md: '${data.borderRadius.md}',
        lg: '${data.borderRadius.lg}',
        xl: '${data.borderRadius.xl}'
      },
      boxShadow: {
        sm: '${data.shadows.sm}',
        md: '${data.shadows.md}',
        lg: '${data.shadows.lg}',
        xl: '${data.shadows.xl}'
      }
    }
  },
  plugins: []
};`;
  }

  static generateCSSVariables(data: any): string {
    return `:root {
  /* Colors */
  --color-primary: ${data.colors.primary};
  --color-secondary: ${data.colors.secondary};
  --color-accent: ${data.colors.accent};
  --color-background: ${data.colors.background};
  --color-text: ${data.colors.text};
  --color-muted: ${data.colors.muted};

  /* Typography */
  --font-family: ${data.typography.fontFamily};
  --font-family-heading: ${data.typography.headingFont};
  --font-size-xs: ${data.typography.fontSize.xs};
  --font-size-sm: ${data.typography.fontSize.sm};
  --font-size-base: ${data.typography.fontSize.base};
  --font-size-lg: ${data.typography.fontSize.lg};
  --font-size-xl: ${data.typography.fontSize.xl};
  --font-size-2xl: ${data.typography.fontSize['2xl']};
  --font-size-3xl: ${data.typography.fontSize['3xl']};
  --font-size-4xl: ${data.typography.fontSize['4xl']};

  /* Spacing */
  --spacing-xs: ${data.spacing.xs};
  --spacing-sm: ${data.spacing.sm};
  --spacing-md: ${data.spacing.md};
  --spacing-lg: ${data.spacing.lg};
  --spacing-xl: ${data.spacing.xl};
  --spacing-2xl: ${data.spacing['2xl']};

  /* Border Radius */
  --radius-sm: ${data.borderRadius.sm};
  --radius-md: ${data.borderRadius.md};
  --radius-lg: ${data.borderRadius.lg};
  --radius-xl: ${data.borderRadius.xl};

  /* Shadows */
  --shadow-sm: ${data.shadows.sm};
  --shadow-md: ${data.shadows.md};
  --shadow-lg: ${data.shadows.lg};
  --shadow-xl: ${data.shadows.xl};
}`;
  }

  static getExtractedData() {
    return this.extractedData;
  }
}

// Main Design System Extractor Component
const DesignSystemExtractor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'url'>('image');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [url, setUrl] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeType, setCodeType] = useState<'tailwind' | 'css'>('tailwind');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const data = await DesignSystemExtractorService.extractFromImage(file);
      setExtractedData(data);
      generateCode(data);
    } catch (error) {
      console.error('Error extracting design system:', error);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleUrlExtraction = async () => {
    if (!url.trim()) return;

    setIsProcessing(true);
    try {
      const data = await DesignSystemExtractorService.extractFromURL(url);
      setExtractedData(data);
      generateCode(data);
    } catch (error) {
      console.error('Error extracting from URL:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const generateCode = (data: any) => {
    if (codeType === 'tailwind') {
      setGeneratedCode(DesignSystemExtractorService.generateTailwindConfig(data));
    } else {
      setGeneratedCode(DesignSystemExtractorService.generateCSSVariables(data));
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  const downloadCode = () => {
    const filename = codeType === 'tailwind' ? 'tailwind.config.js' : 'design-system.css';
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Wand2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              🎨 Design System Extractor
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Upload any screenshot or URL → AI extracts complete design system
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Tab Selection */}
            <Card className="bg-slate-800 border-slate-700">
              <div className="p-6">
                <div className="flex gap-2 mb-6">
                  <Button
                    onClick={() => setActiveTab('image')}
                    variant={activeTab === 'image' ? 'default' : 'outline'}
                    className="flex-1"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                  <Button
                    onClick={() => setActiveTab('url')}
                    variant={activeTab === 'url' ? 'default' : 'outline'}
                    className="flex-1"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Website URL
                  </Button>
                </div>

                {/* Image Upload */}
                <AnimatePresence mode="wait">
                  {activeTab === 'image' && (
                    <motion.div
                      key="image"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <div
                        className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-300 mb-2">Click to upload screenshot</p>
                        <p className="text-sm text-gray-500">PNG, JPG, or WebP up to 10MB</p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </motion.div>
                  )}

                  {/* URL Input */}
                  {activeTab === 'url' && (
                    <motion.div
                      key="url"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          Website URL
                        </label>
                        <div className="flex gap-2">
                          <Input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                          />
                          <Button
                            onClick={handleUrlExtraction}
                            disabled={isProcessing || !url.trim()}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <Zap className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Processing Status */}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
                      <div>
                        <p className="text-blue-300 font-medium">Analyzing design system...</p>
                        <p className="text-sm text-blue-400">
                          {activeTab === 'image' ? 'Extracting colors, fonts, and layout patterns' : 'Scanning website for design elements'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </Card>

            {/* Extracted Data Preview */}
            {extractedData && (
              <Card className="bg-slate-800 border-slate-700">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Extracted Design System</h3>
                    <Badge className="bg-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {/* Colors */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Colors
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(extractedData.colors).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded border border-gray-600"
                              style={{ backgroundColor: value as string }}
                            />
                            <span className="text-xs text-gray-400">{key}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Typography */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        Typography
                      </h4>
                      <div className="text-sm text-gray-400">
                        <p>Font Family: {extractedData.typography.fontFamily}</p>
                        <p>Heading Font: {extractedData.typography.headingFont}</p>
                      </div>
                    </div>

                    {/* Components */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Layout className="w-4 h-4" />
                        Components ({extractedData.components?.length || 0})
                      </h4>
                      <div className="space-y-1">
                        {extractedData.components?.map((component: any, index: number) => (
                          <div key={index} className="text-xs text-gray-400">
                            {component.name} ({component.type})
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Code Generation Section */}
          <div className="space-y-6">
            {/* Code Type Selection */}
            <Card className="bg-slate-800 border-slate-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Generated Code</h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setCodeType('tailwind')}
                      variant={codeType === 'tailwind' ? 'default' : 'outline'}
                      size="sm"
                    >
                      Tailwind
                    </Button>
                    <Button
                      onClick={() => setCodeType('css')}
                      variant={codeType === 'css' ? 'default' : 'outline'}
                      size="sm"
                    >
                      CSS
                    </Button>
                  </div>
                </div>

                {generatedCode ? (
                  <div className="space-y-4">
                    <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                        {generatedCode}
                      </pre>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={copyCode}
                        variant="outline"
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Code
                      </Button>
                      <Button
                        onClick={downloadCode}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Extract a design system to see generated code</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Features */}
            <Card className="bg-slate-800 border-slate-700">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Extraction Features</h3>
                <div className="space-y-3">
                  {[
                    { icon: <Palette className="w-4 h-4" />, text: "Color palette extraction" },
                    { icon: <Type className="w-4 h-4" />, text: "Typography analysis" },
                    { icon: <Layout className="w-4 h-4" />, text: "Component identification" },
                    { icon: <Zap className="w-4 h-4" />, text: "Spacing pattern detection" },
                    { icon: <Sparkles className="w-4 h-4" />, text: "Design token generation" },
                    { icon: <Download className="w-4 h-4" />, text: "Export to Tailwind/CSS" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <div className="text-purple-400">{feature.icon}</div>
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemExtractor;
