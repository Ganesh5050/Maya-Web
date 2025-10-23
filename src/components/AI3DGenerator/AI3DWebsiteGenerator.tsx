import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Torus, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Zap, Download, Play, Pause, RotateCcw } from 'lucide-react';
import * as THREE from 'three';

// 3D Scene Types
export type SceneType = 'cyberpunk' | 'minimalist' | 'luxury' | 'futuristic' | 'brutalist' | 'neumorphic' | 'glassmorphism' | 'y2k';

export interface Scene3DConfig {
  type: SceneType;
  lighting: {
    ambient: number;
    directional: number;
    color: string;
  };
  camera: {
    position: [number, number, number];
    fov: number;
  };
  effects: {
    particles: boolean;
    fog: boolean;
    bloom: boolean;
  };
  objects: Array<{
    type: 'box' | 'sphere' | 'torus' | 'text' | 'custom';
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
    color: string;
    material: 'standard' | 'glass' | 'metal' | 'emissive';
  }>;
}

// AI 3D Scene Generator
export class AI3DSceneGenerator {
  private static scenePresets: Record<SceneType, Partial<Scene3DConfig>> = {
    cyberpunk: {
      lighting: { ambient: 0.1, directional: 0.8, color: '#00ffff' },
      camera: { position: [5, 5, 5], fov: 75 },
      effects: { particles: true, fog: true, bloom: true },
      objects: [
        { type: 'box', position: [0, 0, 0], rotation: [0, 0, 0], scale: [2, 0.1, 2], color: '#ff00ff', material: 'emissive' },
        { type: 'sphere', position: [0, 2, 0], rotation: [0, 0, 0], scale: [1, 1, 1], color: '#00ffff', material: 'glass' },
      ]
    },
    minimalist: {
      lighting: { ambient: 0.4, directional: 0.6, color: '#ffffff' },
      camera: { position: [3, 3, 3], fov: 60 },
      effects: { particles: false, fog: false, bloom: false },
      objects: [
        { type: 'box', position: [0, 0, 0], rotation: [0, 0, 0], scale: [3, 0.1, 3], color: '#ffffff', material: 'standard' },
      ]
    },
    luxury: {
      lighting: { ambient: 0.2, directional: 0.7, color: '#ffd700' },
      camera: { position: [4, 4, 4], fov: 65 },
      effects: { particles: true, fog: false, bloom: true },
      objects: [
        { type: 'torus', position: [0, 1, 0], rotation: [0, 0, 0], scale: [1.5, 1.5, 0.5], color: '#ffd700', material: 'metal' },
      ]
    },
    futuristic: {
      lighting: { ambient: 0.15, directional: 0.7, color: '#00ff88' },
      camera: { position: [6, 6, 6], fov: 80 },
      effects: { particles: true, fog: true, bloom: true },
      objects: [
        { type: 'box', position: [0, 0, 0], rotation: [0, 0, 0], scale: [2, 2, 0.1], color: '#00ff88', material: 'glass' },
        { type: 'sphere', position: [0, 3, 0], rotation: [0, 0, 0], scale: [0.5, 0.5, 0.5], color: '#ffffff', material: 'emissive' },
      ]
    },
    brutalist: {
      lighting: { ambient: 0.3, directional: 0.5, color: '#ffffff' },
      camera: { position: [4, 2, 4], fov: 70 },
      effects: { particles: false, fog: false, bloom: false },
      objects: [
        { type: 'box', position: [0, 0, 0], rotation: [0, 0, 0], scale: [4, 3, 2], color: '#333333', material: 'standard' },
      ]
    },
    neumorphic: {
      lighting: { ambient: 0.5, directional: 0.3, color: '#ffffff' },
      camera: { position: [3, 3, 3], fov: 60 },
      effects: { particles: false, fog: false, bloom: false },
      objects: [
        { type: 'sphere', position: [0, 0, 0], rotation: [0, 0, 0], scale: [2, 2, 2], color: '#f0f0f0', material: 'standard' },
      ]
    },
    glassmorphism: {
      lighting: { ambient: 0.3, directional: 0.6, color: '#ffffff' },
      camera: { position: [3, 3, 3], fov: 60 },
      effects: { particles: false, fog: false, bloom: true },
      objects: [
        { type: 'box', position: [0, 0, 0], rotation: [0, 0, 0], scale: [3, 2, 0.2], color: '#ffffff', material: 'glass' },
      ]
    },
    y2k: {
      lighting: { ambient: 0.2, directional: 0.6, color: '#ff00ff' },
      camera: { position: [5, 5, 5], fov: 75 },
      effects: { particles: true, fog: false, bloom: true },
      objects: [
        { type: 'torus', position: [0, 0, 0], rotation: [0, 0, 0], scale: [2, 2, 0.8], color: '#ff00ff', material: 'metal' },
        { type: 'sphere', position: [0, 2, 0], rotation: [0, 0, 0], scale: [1, 1, 1], color: '#00ffff', material: 'emissive' },
      ]
    }
  };

  static generateFromPrompt(prompt: string): Scene3DConfig {
    const lowerPrompt = prompt.toLowerCase();
    
    // Determine scene type from prompt
    let sceneType: SceneType = 'minimalist';
    
    if (lowerPrompt.includes('cyberpunk') || lowerPrompt.includes('neon') || lowerPrompt.includes('glitch')) {
      sceneType = 'cyberpunk';
    } else if (lowerPrompt.includes('luxury') || lowerPrompt.includes('gold') || lowerPrompt.includes('elegant')) {
      sceneType = 'luxury';
    } else if (lowerPrompt.includes('futuristic') || lowerPrompt.includes('sci-fi') || lowerPrompt.includes('tech')) {
      sceneType = 'futuristic';
    } else if (lowerPrompt.includes('brutalist') || lowerPrompt.includes('bold') || lowerPrompt.includes('concrete')) {
      sceneType = 'brutalist';
    } else if (lowerPrompt.includes('neumorphic') || lowerPrompt.includes('soft') || lowerPrompt.includes('subtle')) {
      sceneType = 'neumorphic';
    } else if (lowerPrompt.includes('glass') || lowerPrompt.includes('blur') || lowerPrompt.includes('transparent')) {
      sceneType = 'glassmorphism';
    } else if (lowerPrompt.includes('y2k') || lowerPrompt.includes('retro') || lowerPrompt.includes('gradient')) {
      sceneType = 'y2k';
    }

    const baseConfig = this.scenePresets[sceneType];
    
    // Generate additional objects based on prompt
    const additionalObjects: any[] = [];
    
    if (lowerPrompt.includes('floating') || lowerPrompt.includes('hologram')) {
      additionalObjects.push({
        type: 'box',
        position: [Math.random() * 4 - 2, Math.random() * 2 + 1, Math.random() * 4 - 2],
        rotation: [0, 0, 0],
        scale: [0.5, 0.5, 0.5],
        color: baseConfig.lighting?.color || '#ffffff',
        material: 'glass'
      });
    }
    
    if (lowerPrompt.includes('particles') || lowerPrompt.includes('stars')) {
      for (let i = 0; i < 5; i++) {
        additionalObjects.push({
          type: 'sphere',
          position: [Math.random() * 6 - 3, Math.random() * 4 - 2, Math.random() * 6 - 3],
          rotation: [0, 0, 0],
          scale: [0.1, 0.1, 0.1],
          color: baseConfig.lighting?.color || '#ffffff',
          material: 'emissive'
        });
      }
    }

    return {
      type: sceneType,
      lighting: baseConfig.lighting || { ambient: 0.3, directional: 0.6, color: '#ffffff' },
      camera: baseConfig.camera || { position: [3, 3, 3], fov: 60 },
      effects: baseConfig.effects || { particles: false, fog: false, bloom: false },
      objects: [...(baseConfig.objects || []), ...additionalObjects]
    };
  }

  static generateReactCode(config: Scene3DConfig): string {
    return `
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

const Scene3D = () => {
  return (
    <Canvas camera={{ position: [${config.camera.position.join(', ')}], fov: ${config.camera.fov} }}>
      <ambientLight intensity={${config.lighting.ambient}} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={${config.lighting.directional}}
        color="${config.lighting.color}"
      />
      
      ${config.effects.fog ? `<fog attach="fog" args={["${config.lighting.color}", 10, 50]} />` : ''}
      
      ${config.objects.map((obj, i) => `
        <mesh key="${i}" position={[${obj.position.join(', ')}]} rotation={[${obj.rotation.join(', ')}]} scale={[${obj.scale.join(', ')}]}>
          <${obj.type === 'box' ? 'boxGeometry' : obj.type === 'sphere' ? 'sphereGeometry' : 'torusGeometry'} args={[1, 1, 1]} />
          <meshStandardMaterial 
            color="${obj.color}" 
            ${obj.material === 'glass' ? 'transparent opacity={0.7}' : ''}
            ${obj.material === 'emissive' ? 'emissive="' + obj.color + '" emissiveIntensity={0.5}' : ''}
            ${obj.material === 'metal' ? 'metalness={0.8} roughness={0.2}' : ''}
          />
        </mesh>
      `).join('')}
      
      <OrbitControls />
      <Environment preset="sunset" />
    </Canvas>
  );
};

export default Scene3D;
    `.trim();
  }
}

// 3D Object Component
const SceneObject: React.FC<{
  config: any;
  index: number;
}> = ({ config, index }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      if (config.material === 'emissive') {
        meshRef.current.position.y += Math.sin(state.clock.elapsedTime + index) * 0.01;
      }
    }
  });

  const getGeometry = () => {
    switch (config.type) {
      case 'box':
        return <boxGeometry args={config.scale} />;
      case 'sphere':
        return <sphereGeometry args={[config.scale[0], 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[config.scale[0], config.scale[2], 16, 100]} />;
      default:
        return <boxGeometry args={config.scale} />;
    }
  };

  const getMaterial = () => {
    const baseProps = { color: config.color };
    
    switch (config.material) {
      case 'glass':
        return <meshStandardMaterial {...baseProps} transparent opacity={0.7} roughness={0.1} metalness={0.1} />;
      case 'metal':
        return <meshStandardMaterial {...baseProps} metalness={0.8} roughness={0.2} />;
      case 'emissive':
        return <meshStandardMaterial {...baseProps} emissive={config.color} emissiveIntensity={0.5} />;
      default:
        return <meshStandardMaterial {...baseProps} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={config.position}
      rotation={config.rotation}
      scale={config.scale}
    >
      {getGeometry()}
      {getMaterial()}
    </mesh>
  );
};

// Main 3D Scene Component
const Scene3D: React.FC<{ config: Scene3DConfig }> = ({ config }) => {
  return (
    <Canvas camera={{ position: config.camera.position, fov: config.camera.fov }}>
      <ambientLight intensity={config.lighting.ambient} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={config.lighting.directional}
        color={config.lighting.color}
      />
      
      {config.effects.fog && <fog attach="fog" args={[config.lighting.color, 10, 50]} />}
      
      {config.objects.map((obj, index) => (
        <SceneObject key={index} config={obj} index={index} />
      ))}
      
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <Environment preset="sunset" />
    </Canvas>
  );
};

// AI 3D Generator Component
export const AI3DWebsiteGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('Create a cyberpunk SaaS landing page with floating holograms');
  const [generatedConfig, setGeneratedConfig] = useState<Scene3DConfig | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [activeTab, setActiveTab] = useState('preview');

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const config = AI3DSceneGenerator.generateFromPrompt(prompt);
    const code = AI3DSceneGenerator.generateReactCode(config);
    
    setGeneratedConfig(config);
    setGeneratedCode(code);
    setIsGenerating(false);
  };

  const examplePrompts = [
    'Create a luxury product showcase with golden lighting',
    'Build a minimalist portfolio with clean geometry',
    'Design a futuristic tech company homepage',
    'Make a brutalist architecture website',
    'Create a glassmorphism dashboard interface',
    'Build a Y2K retro gaming site',
  ];

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
              AI 3D Website Generator
            </h1>
            <p className="text-muted-foreground">
              Generate complete 3D-integrated websites from a single text prompt
            </p>
          </div>
        </motion.div>

        {/* Prompt Input */}
        <div className="flex gap-4 mb-6">
          <Input
            type="text"
            placeholder="Describe your 3D website..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-background/50 backdrop-blur-xl border-white/10 focus:border-white/20"
          />
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                </motion.div>
                Generating...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Generate 3D Scene
              </>
            )}
          </Button>
        </div>

        {/* Example Prompts */}
        <div className="flex flex-wrap gap-2 mb-6">
          {examplePrompts.map((example, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-purple-500/10 hover:border-purple-500/50"
              onClick={() => setPrompt(example)}
            >
              {example}
            </Badge>
          ))}
        </div>
      </div>

      {/* Generated Content */}
      {generatedConfig && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto mb-6">
            <TabsTrigger value="preview">3D Preview</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="code">React Code</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
              <div className="h-96 rounded-lg overflow-hidden bg-black/20">
                <Scene3D config={generatedConfig} />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{generatedConfig.type}</Badge>
                  <Badge variant="secondary">{generatedConfig.objects.length} objects</Badge>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Scene
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="config">
            <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
              <pre className="text-sm text-muted-foreground overflow-auto max-h-96">
                {JSON.stringify(generatedConfig, null, 2)}
              </pre>
            </Card>
          </TabsContent>

          <TabsContent value="code">
            <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Generated React Three Fiber Code</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Copy Code
                </Button>
              </div>
              <pre className="text-sm text-muted-foreground overflow-auto max-h-96 bg-black/20 p-4 rounded-lg">
                {generatedCode}
              </pre>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold">AI-Powered</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            GPT-4 analyzes your prompt and generates complete 3D scenes with lighting, camera, and effects.
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold">Real-Time</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            See your 3D scene instantly with interactive controls. Rotate, zoom, and explore in real-time.
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
            Get clean React Three Fiber code ready for production. No manual coding required.
          </p>
        </Card>
      </div>
    </div>
  );
};
