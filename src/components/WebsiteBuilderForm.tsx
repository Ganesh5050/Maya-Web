import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Wand2, 
  Settings, 
  Palette, 
  Clock, 
  Sparkles,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface AnimationSettings {
  loadingDuration: number;
  generateDuration: number;
  loadingText: string;
  generateText: string;
  showPrompt: boolean;
  animationType: 'fade' | 'slide' | 'scale' | 'rotate';
  colorScheme: 'purple' | 'blue' | 'green' | 'orange' | 'pink';
  particleCount: number;
  enableParticles: boolean;
}

const WebsiteBuilderForm: React.FC = () => {
  const [settings, setSettings] = useState<AnimationSettings>({
    loadingDuration: 2,
    generateDuration: 3,
    loadingText: 'Creating Your Website',
    generateText: 'Generate Site',
    showPrompt: true,
    animationType: 'fade',
    colorScheme: 'purple',
    particleCount: 100,
    enableParticles: true
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate generation with custom settings
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Website generated for: "${prompt}"`);
    }, settings.generateDuration * 1000);
  };

  const updateSetting = (key: keyof AnimationSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const getColorClasses = (scheme: string) => {
    const colors = {
      purple: 'from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700',
      blue: 'from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
      green: 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
      orange: 'from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700',
      pink: 'from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700'
    };
    return colors[scheme as keyof typeof colors] || colors.purple;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Website Builder Animation Controller
          </h1>
          <p className="text-gray-300">
            Customize your loading and generation animations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Settings Panel */}
          <Card className="bg-black/40 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Animation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Loading Duration */}
              <div>
                <Label className="text-white">Loading Duration: {settings.loadingDuration}s</Label>
                <Slider
                  value={[settings.loadingDuration]}
                  onValueChange={([value]) => updateSetting('loadingDuration', value)}
                  min={0.5}
                  max={5}
                  step={0.5}
                  className="mt-2"
                />
              </div>

              {/* Generate Duration */}
              <div>
                <Label className="text-white">Generate Duration: {settings.generateDuration}s</Label>
                <Slider
                  value={[settings.generateDuration]}
                  onValueChange={([value]) => updateSetting('generateDuration', value)}
                  min={1}
                  max={10}
                  step={0.5}
                  className="mt-2"
                />
              </div>

              {/* Loading Text */}
              <div>
                <Label className="text-white">Loading Text</Label>
                <Input
                  value={settings.loadingText}
                  onChange={(e) => updateSetting('loadingText', e.target.value)}
                  className="mt-2 bg-gray-800 border-gray-600 text-white"
                />
              </div>

              {/* Generate Text */}
              <div>
                <Label className="text-white">Generate Button Text</Label>
                <Input
                  value={settings.generateText}
                  onChange={(e) => updateSetting('generateText', e.target.value)}
                  className="mt-2 bg-gray-800 border-gray-600 text-white"
                />
              </div>

              {/* Show Prompt */}
              <div className="flex items-center justify-between">
                <Label className="text-white">Show User Prompt in Loading</Label>
                <Switch
                  checked={settings.showPrompt}
                  onCheckedChange={(checked) => updateSetting('showPrompt', checked)}
                />
              </div>

              {/* Animation Type */}
              <div>
                <Label className="text-white">Animation Type</Label>
                <Select
                  value={settings.animationType}
                  onValueChange={(value) => updateSetting('animationType', value)}
                >
                  <SelectTrigger className="mt-2 bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fade">Fade</SelectItem>
                    <SelectItem value="slide">Slide</SelectItem>
                    <SelectItem value="scale">Scale</SelectItem>
                    <SelectItem value="rotate">Rotate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Color Scheme */}
              <div>
                <Label className="text-white">Color Scheme</Label>
                <Select
                  value={settings.colorScheme}
                  onValueChange={(value) => updateSetting('colorScheme', value)}
                >
                  <SelectTrigger className="mt-2 bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="pink">Pink</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Particle Count */}
              <div>
                <Label className="text-white">Particle Count: {settings.particleCount}</Label>
                <Slider
                  value={[settings.particleCount]}
                  onValueChange={([value]) => updateSetting('particleCount', value)}
                  min={0}
                  max={200}
                  step={10}
                  className="mt-2"
                />
              </div>

              {/* Enable Particles */}
              <div className="flex items-center justify-between">
                <Label className="text-white">Enable Particles</Label>
                <Switch
                  checked={settings.enableParticles}
                  onCheckedChange={(checked) => updateSetting('enableParticles', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card className="bg-black/40 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Play className="w-5 h-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Prompt Input */}
              <div className="mb-6">
                <Label className="text-white mb-2 block">Test Prompt</Label>
                <Textarea
                  placeholder="Enter your website prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                />
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className={`w-full ${getColorClasses(settings.colorScheme)} text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {settings.loadingText}...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {settings.generateText}
                  </div>
                )}
              </Button>

              {/* Animation Preview */}
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mt-6 p-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg border border-purple-500/30"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{
                        rotate: settings.animationType === 'rotate' ? 360 : 0,
                        scale: settings.animationType === 'scale' ? [1, 1.1, 1] : 1,
                        opacity: settings.animationType === 'fade' ? [1, 0.5, 1] : 1,
                        y: settings.animationType === 'slide' ? [0, -10, 0] : 0
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-2xl font-bold text-white mb-4"
                    >
                      {settings.loadingText}
                    </motion.div>
                    
                    {settings.showPrompt && prompt && (
                      <p className="text-purple-300 font-medium">
                        "{prompt}"
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Settings Summary */}
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Current Settings:</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>Loading: {settings.loadingDuration}s - {settings.loadingText}</p>
                  <p>Generate: {settings.generateDuration}s - {settings.generateText}</p>
                  <p>Animation: {settings.animationType} - {settings.colorScheme}</p>
                  <p>Particles: {settings.enableParticles ? settings.particleCount : 0}</p>
                  <p>Show Prompt: {settings.showPrompt ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilderForm;
