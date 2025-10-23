// Stability AI Test Component
// Test advanced image generation and style transfer

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Image, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Sparkles,
  Zap,
  Palette,
  Wand2,
  Upload,
  Maximize,
  Shuffle
} from 'lucide-react';

import { StabilityAIService } from '@/services/multiModelAI';

const StabilityAITest: React.FC = () => {
  const [prompt, setPrompt] = useState('A futuristic AI-powered website builder interface with holographic elements and neon lighting');
  const [style, setStyle] = useState('photographic');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUpscaling, setIsUpscaling] = useState(false);
  const [apiStatus, setApiStatus] = useState<boolean | null>(null);
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [variations, setVariations] = useState<string[]>([]);
  const { toast } = useToast();

  const stylePresets = [
    { value: 'photographic', label: 'Photographic', description: 'Realistic photos' },
    { value: 'digital-art', label: 'Digital Art', description: 'Digital artwork style' },
    { value: 'comic-book', label: 'Comic Book', description: 'Comic book illustration' },
    { value: 'fantasy-art', label: 'Fantasy Art', description: 'Fantasy artwork' },
    { value: 'line-art', label: 'Line Art', description: 'Clean line drawings' },
    { value: 'analog-film', label: 'Analog Film', description: 'Vintage film look' },
    { value: 'neon-punk', label: 'Neon Punk', description: 'Cyberpunk neon style' },
    { value: 'isometric', label: 'Isometric', description: '3D isometric view' },
    { value: 'low-poly', label: 'Low Poly', description: 'Low polygon style' },
    { value: 'origami', label: 'Origami', description: 'Paper fold style' },
    { value: 'modeling-compound', label: 'Modeling Compound', description: 'Clay modeling' },
    { value: 'cinematic', label: 'Cinematic', description: 'Movie-like quality' },
    { value: '3d-model', label: '3D Model', description: '3D rendered model' },
    { value: 'pixel-art', label: 'Pixel Art', description: 'Retro pixel style' },
    { value: 'tile-texture', label: 'Tile Texture', description: 'Seamless textures' }
  ];

  const quickPrompts = [
    'A luxury fashion website with floating silk textures and golden lighting',
    'A tech startup landing page with holographic UI elements and particle effects',
    'A minimalist portfolio website with clean lines and subtle animations',
    'A cyberpunk e-commerce site with neon colors and futuristic design',
    'A nature-inspired wellness website with organic shapes and earth tones',
    'A gaming website with dark themes and glowing accents',
    'A medical website with clean, professional design and trust elements',
    'A creative agency portfolio with bold typography and artistic layouts'
  ];

  useEffect(() => {
    checkAPIStatus();
    loadAccountInfo();
  }, []);

  const checkAPIStatus = async () => {
    try {
      const status = await StabilityAIService.checkAPIStatus();
      setApiStatus(status);
      if (status) {
        toast({ 
          title: 'Stability AI Connected!', 
          description: 'Advanced image generation is ready.',
          variant: 'default'
        });
      } else {
        toast({ 
          title: 'Stability AI Error', 
          description: 'Could not connect to Stability AI API.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Stability AI status check failed:', error);
      setApiStatus(false);
      toast({ 
        title: 'Stability AI Error', 
        description: 'API connection failed.',
        variant: 'destructive'
      });
    }
  };

  const loadAccountInfo = async () => {
    try {
      const info = await StabilityAIService.getAccountInfo();
      setAccountInfo(info);
    } catch (error) {
      console.error('Failed to load account info:', error);
    }
  };

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({ 
        title: 'Prompt Required', 
        description: 'Please enter a prompt for image generation.',
        variant: 'destructive'
      });
      return;
    }

    setIsGenerating(true);
    try {
      const imageUrl = await StabilityAIService.generateImage(prompt, style);
      if (imageUrl) {
        setGeneratedImages(prev => [imageUrl, ...prev]);
        toast({ 
          title: 'Image Generated!', 
          description: 'Your AI-generated image is ready.',
          variant: 'default'
        });
      } else {
        throw new Error('No image generated');
      }
    } catch (error) {
      console.error('Image generation failed:', error);
      toast({ 
        title: 'Generation Failed', 
        description: 'Could not generate image. Check console for details.',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateVariations = async (imageBase64: string) => {
    setIsGenerating(true);
    try {
      const imageVariations = await StabilityAIService.generateImageVariations(imageBase64, prompt);
      if (imageVariations.length > 0) {
        setVariations(imageVariations);
        toast({ 
          title: 'Variations Generated!', 
          description: `${imageVariations.length} variations created.`,
          variant: 'default'
        });
      } else {
        throw new Error('No variations generated');
      }
    } catch (error) {
      console.error('Variation generation failed:', error);
      toast({ 
        title: 'Variations Failed', 
        description: 'Could not generate variations.',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const upscaleImage = async (imageBase64: string) => {
    setIsUpscaling(true);
    try {
      const upscaledImage = await StabilityAIService.upscaleImage(imageBase64);
      if (upscaledImage) {
        setGeneratedImages(prev => [upscaledImage, ...prev]);
        toast({ 
          title: 'Image Upscaled!', 
          description: 'Your image has been enhanced to higher resolution.',
          variant: 'default'
        });
      } else {
        throw new Error('No upscaled image generated');
      }
    } catch (error) {
      console.error('Image upscaling failed:', error);
      toast({ 
        title: 'Upscaling Failed', 
        description: 'Could not upscale image.',
        variant: 'destructive'
      });
    } finally {
      setIsUpscaling(false);
    }
  };

  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.section
      id="stability-ai-test"
      className="relative py-20 md:py-32 bg-gradient-to-br from-indigo-900 to-purple-900 text-white overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-5xl md:text-7xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Stability AI Test
        </motion.h2>
        <motion.p
          className="text-xl text-center max-w-3xl mx-auto mb-12 text-gray-300"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Test advanced image generation, style transfer, and AI-powered visual content creation.
        </motion.p>

        <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 shadow-2xl max-w-6xl mx-auto">
          <CardHeader className="border-b border-gray-700 flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Image className="w-6 h-6 mr-2 text-indigo-400" /> AI Image Generation Center
            </CardTitle>
            <div className="flex items-center gap-4">
              {accountInfo && (
                <Badge className="bg-green-500/20 text-green-300">
                  Credits: {accountInfo.credits || 'N/A'}
                </Badge>
              )}
              <Button onClick={checkAPIStatus} className="flex items-center space-x-2">
                {apiStatus === true && <CheckCircle className="w-4 h-4 text-green-400" />}
                {apiStatus === false && <XCircle className="w-4 h-4 text-red-400" />}
                {apiStatus === null && <Sparkles className="w-4 h-4" />}
                <span>Check Status</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="image-prompt" className="text-lg text-gray-200 mb-2 block">
                    Image Prompt:
                  </Label>
                  <Textarea
                    id="image-prompt"
                    placeholder="Describe the image you want to generate..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]"
                  />
                </div>

                <div>
                  <Label className="text-lg text-gray-200 mb-2 block">
                    Style Preset:
                  </Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="Choose a style" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {stylePresets.map((preset) => (
                        <SelectItem 
                          key={preset.value} 
                          value={preset.value}
                          className="text-white hover:bg-gray-700"
                        >
                          <div>
                            <div className="font-medium">{preset.label}</div>
                            <div className="text-xs text-gray-400">{preset.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={generateImage}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>

                {/* Quick Prompts */}
                <div>
                  <Label className="text-lg text-gray-200 mb-2 block">
                    Quick Prompts:
                  </Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {quickPrompts.map((quickPrompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700 text-left"
                        onClick={() => setPrompt(quickPrompt)}
                      >
                        <Zap className="w-3 h-3 mr-2" />
                        {quickPrompt}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Image Upload for Variations */}
                <div>
                  <Label className="text-lg text-gray-200 mb-2 block">
                    Upload Image for Variations:
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                  {uploadedImage && (
                    <div className="mt-2">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded" 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        onClick={() => generateVariations(uploadedImage)}
                        disabled={isGenerating}
                        className="w-full mt-2 bg-purple-600 hover:bg-purple-700"
                      >
                        <Shuffle className="w-4 h-4 mr-2" />
                        Generate Variations
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Generated Images Section */}
              <div className="space-y-4">
                <Label className="text-lg text-gray-200 mb-2 block">
                  Generated Images:
                </Label>
                
                <AnimatePresence>
                  {generatedImages.length === 0 && variations.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No images generated yet. Create your first AI image!</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {/* Main Generated Images */}
                      {generatedImages.map((imageUrl, index) => (
                        <motion.div
                          key={`main-${index}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative group"
                        >
                          <img 
                            src={imageUrl} 
                            alt={`Generated ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg border border-gray-600"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => downloadImage(imageUrl, `stability-ai-${index + 1}.png`)}
                                className="bg-gray-800 hover:bg-gray-700"
                              >
                                <Download className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => upscaleImage(imageUrl)}
                                disabled={isUpscaling}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Maximize className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => generateVariations(imageUrl)}
                                disabled={isGenerating}
                                className="bg-purple-600 hover:bg-purple-700"
                              >
                                <Shuffle className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Variations */}
                      {variations.map((variationUrl, index) => (
                        <motion.div
                          key={`variation-${index}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative group"
                        >
                          <img 
                            src={variationUrl} 
                            alt={`Variation ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-purple-600"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              onClick={() => downloadImage(variationUrl, `variation-${index + 1}.png`)}
                              className="bg-gray-800 hover:bg-gray-700"
                            >
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                          <Badge className="absolute top-2 left-2 bg-purple-600">
                            Variation {index + 1}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>

                {/* Features */}
                <div>
                  <Label className="text-lg text-gray-200 mb-2 block">
                    AI Features:
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>High-Quality Image Generation (1024x1024)</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>15+ Style Presets</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Image Variations & Upscaling</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Style Transfer Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
};

export default StabilityAITest;
