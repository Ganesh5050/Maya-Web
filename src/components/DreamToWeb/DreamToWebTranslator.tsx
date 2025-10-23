import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Box, Sphere, Torus, Plane } from '@react-three/drei';
import { 
  Upload, 
  Camera, 
  Image, 
  Zap, 
  Eye, 
  Download,
  Sparkles,
  Wand2,
  RefreshCw,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import * as THREE from 'three';

// Dream-to-Web Types
export interface DreamElement {
  id: string;
  type: 'floating' | 'grounded' | 'orbiting' | 'particle' | 'structure' | 'organic';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  material: 'glass' | 'metal' | 'emissive' | 'organic' | 'crystal';
  animation: 'float' | 'rotate' | 'pulse' | 'orbit' | 'wave' | 'none';
  opacity: number;
}

export interface DreamScene {
  id: string;
  name: string;
  description: string;
  elements: DreamElement[];
  lighting: {
    ambient: number;
    directional: number;
    color: string;
    intensity: number;
  };
  environment: 'space' | 'underwater' | 'forest' | 'city' | 'abstract' | 'dream';
  mood: 'mystical' | 'energetic' | 'peaceful' | 'dramatic' | 'playful' | 'surreal';
}

// Dream-to-Web Translator Class
export class DreamToWebTranslator {
  private static dreamKeywords = {
    floating: ['floating', 'levitating', 'hovering', 'airborne', 'sky'],
    islands: ['islands', 'floating islands', 'sky islands', 'cloud islands'],
    crystals: ['crystals', 'gems', 'diamonds', 'prisms', 'shards'],
    particles: ['particles', 'sparkles', 'stars', 'dots', 'lights'],
    organic: ['organic', 'natural', 'flowing', 'curved', 'soft'],
    geometric: ['geometric', 'angular', 'sharp', 'structured', 'cubic'],
    mystical: ['mystical', 'magical', 'enchanted', 'ethereal', 'otherworldly'],
    energetic: ['energetic', 'dynamic', 'vibrant', 'electric', 'powerful'],
    peaceful: ['peaceful', 'calm', 'serene', 'tranquil', 'gentle'],
  };

  static analyzeSketchDescription(description: string): DreamScene {
    const lowerDesc = description.toLowerCase();
    
    // Determine scene type
    let sceneType: DreamScene['environment'] = 'abstract';
    if (lowerDesc.includes('space') || lowerDesc.includes('cosmic')) sceneType = 'space';
    else if (lowerDesc.includes('water') || lowerDesc.includes('ocean')) sceneType = 'underwater';
    else if (lowerDesc.includes('forest') || lowerDesc.includes('nature')) sceneType = 'forest';
    else if (lowerDesc.includes('city') || lowerDesc.includes('urban')) sceneType = 'city';
    else if (lowerDesc.includes('dream') || lowerDesc.includes('surreal')) sceneType = 'dream';

    // Determine mood
    let mood: DreamScene['mood'] = 'mystical';
    if (lowerDesc.includes('energetic') || lowerDesc.includes('dynamic')) mood = 'energetic';
    else if (lowerDesc.includes('peaceful') || lowerDesc.includes('calm')) mood = 'peaceful';
    else if (lowerDesc.includes('dramatic') || lowerDesc.includes('intense')) mood = 'dramatic';
    else if (lowerDesc.includes('playful') || lowerDesc.includes('fun')) mood = 'playful';
    else if (lowerDesc.includes('surreal') || lowerDesc.includes('weird')) mood = 'surreal';

    // Generate elements based on description
    const elements: DreamElement[] = [];
    
    // Floating elements
    if (lowerDesc.includes('floating') || lowerDesc.includes('islands')) {
      for (let i = 0; i < 3; i++) {
        elements.push({
          id: `floating-${i}`,
          type: 'floating',
          position: [Math.random() * 8 - 4, Math.random() * 3 + 1, Math.random() * 8 - 4],
          rotation: [0, 0, 0],
          scale: [1 + Math.random(), 0.5 + Math.random() * 0.5, 1 + Math.random()],
          color: mood === 'energetic' ? '#ff6b6b' : mood === 'peaceful' ? '#4ecdc4' : '#a8e6cf',
          material: 'organic',
          animation: 'float',
          opacity: 0.8,
        });
      }
    }

    // Crystals/gems
    if (lowerDesc.includes('crystal') || lowerDesc.includes('gem')) {
      for (let i = 0; i < 5; i++) {
        elements.push({
          id: `crystal-${i}`,
          type: 'structure',
          position: [Math.random() * 6 - 3, Math.random() * 2, Math.random() * 6 - 3],
          rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
          scale: [0.3 + Math.random() * 0.4, 0.5 + Math.random() * 0.5, 0.3 + Math.random() * 0.4],
          color: '#00d4ff',
          material: 'crystal',
          animation: 'rotate',
          opacity: 0.9,
        });
      }
    }

    // Particles/sparkles
    if (lowerDesc.includes('particle') || lowerDesc.includes('sparkle')) {
      for (let i = 0; i < 20; i++) {
        elements.push({
          id: `particle-${i}`,
          type: 'particle',
          position: [Math.random() * 10 - 5, Math.random() * 5, Math.random() * 10 - 5],
          rotation: [0, 0, 0],
          scale: [0.1, 0.1, 0.1],
          color: '#ffd700',
          material: 'emissive',
          animation: 'pulse',
          opacity: 0.7,
        });
      }
    }

    // Orbiting elements
    if (lowerDesc.includes('orbit') || lowerDesc.includes('circling')) {
      for (let i = 0; i < 3; i++) {
        elements.push({
          id: `orbit-${i}`,
          type: 'orbiting',
          position: [Math.cos(i * 2) * 3, 0, Math.sin(i * 2) * 3],
          rotation: [0, 0, 0],
          scale: [0.5, 0.5, 0.5],
          color: '#ff9ff3',
          material: 'glass',
          animation: 'orbit',
          opacity: 0.8,
        });
      }
    }

    // Default elements if none detected
    if (elements.length === 0) {
      elements.push(
        {
          id: 'center-sphere',
          type: 'floating',
          position: [0, 2, 0],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          color: '#6366f1',
          material: 'glass',
          animation: 'float',
          opacity: 0.8,
        },
        {
          id: 'ground-plane',
          type: 'grounded',
          position: [0, -1, 0],
          rotation: [0, 0, 0],
          scale: [10, 0.1, 10],
          color: '#374151',
          material: 'organic',
          animation: 'none',
          opacity: 0.6,
        }
      );
    }

    return {
      id: Date.now().toString(),
      name: `Dream Scene: ${mood.charAt(0).toUpperCase() + mood.slice(1)}`,
      description,
      elements,
      lighting: {
        ambient: mood === 'peaceful' ? 0.4 : mood === 'energetic' ? 0.2 : 0.3,
        directional: mood === 'energetic' ? 0.8 : mood === 'peaceful' ? 0.5 : 0.6,
        color: mood === 'energetic' ? '#ff6b6b' : mood === 'peaceful' ? '#4ecdc4' : '#ffffff',
        intensity: mood === 'energetic' ? 1.2 : mood === 'peaceful' ? 0.8 : 1.0,
      },
      environment: sceneType,
      mood,
    };
  }

  static generateReactCode(scene: DreamScene): string {
    const elementComponents = scene.elements.map(element => {
      const geometry = element.type === 'particle' ? 'sphere' : 
                     element.type === 'structure' ? 'box' : 'sphere';
      
      const materialProps = element.material === 'glass' ? 
        'transparent opacity={0.7} roughness={0.1}' :
        element.material === 'metal' ?
        'metalness={0.8} roughness={0.2}' :
        element.material === 'emissive' ?
        `emissive="${element.color}" emissiveIntensity={0.5}` :
        element.material === 'crystal' ?
        'transparent opacity={0.9} roughness={0.05}' :
        '';

      return `
        <mesh 
          key="${element.id}"
          position={[${element.position.join(', ')}]}
          rotation={[${element.rotation.join(', ')}]}
          scale={[${element.scale.join(', ')}]}
        >
          <${geometry}Geometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color="${element.color}" 
            ${materialProps}
          />
        </mesh>
      `;
    }).join('');

    return `
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

const DreamScene = () => {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
      <ambientLight intensity={${scene.lighting.ambient}} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={${scene.lighting.directional}}
        color="${scene.lighting.color}"
      />
      
      ${elementComponents}
      
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <Environment preset="${scene.environment === 'space' ? 'night' : 'sunset'}" />
    </Canvas>
  );
};

export default DreamScene;
    `.trim();
  }
}

// Dream Element Component
const DreamElement3D: React.FC<{
  element: DreamElement;
  isPlaying: boolean;
}> = ({ element, isPlaying }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { clock } = useThree();

  useFrame(() => {
    if (meshRef.current && isPlaying) {
      switch (element.animation) {
        case 'float':
          meshRef.current.position.y += Math.sin(clock.elapsedTime + element.position[0]) * 0.01;
          break;
        case 'rotate':
          meshRef.current.rotation.y += 0.01;
          meshRef.current.rotation.x += 0.005;
          break;
        case 'pulse':
          const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.1;
          meshRef.current.scale.setScalar(scale);
          break;
        case 'orbit':
          meshRef.current.position.x = Math.cos(clock.elapsedTime + element.position[0]) * 3;
          meshRef.current.position.z = Math.sin(clock.elapsedTime + element.position[0]) * 3;
          break;
        case 'wave':
          meshRef.current.position.y += Math.sin(clock.elapsedTime * 2 + element.position[0]) * 0.02;
          break;
      }
    }
  });

  const getGeometry = () => {
    switch (element.type) {
      case 'particle':
        return <sphereGeometry args={element.scale} />;
      case 'structure':
        return <boxGeometry args={element.scale} />;
      case 'floating':
      case 'orbiting':
      default:
        return <sphereGeometry args={element.scale} />;
    }
  };

  const getMaterial = () => {
    const baseProps = { color: element.color };
    
    switch (element.material) {
      case 'glass':
        return <meshStandardMaterial {...baseProps} transparent opacity={element.opacity} roughness={0.1} metalness={0.1} />;
      case 'metal':
        return <meshStandardMaterial {...baseProps} metalness={0.8} roughness={0.2} />;
      case 'emissive':
        return <meshStandardMaterial {...baseProps} emissive={element.color} emissiveIntensity={0.5} />;
      case 'crystal':
        return <meshStandardMaterial {...baseProps} transparent opacity={element.opacity} roughness={0.05} metalness={0.1} />;
      case 'organic':
      default:
        return <meshStandardMaterial {...baseProps} roughness={0.5} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={element.position}
      rotation={element.rotation}
      scale={element.scale}
    >
      {getGeometry()}
      {getMaterial()}
    </mesh>
  );
};

// Dream Scene Component
const DreamScene3D: React.FC<{
  scene: DreamScene;
  isPlaying: boolean;
}> = ({ scene, isPlaying }) => {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
      <ambientLight intensity={scene.lighting.ambient} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={scene.lighting.directional}
        color={scene.lighting.color}
      />
      
      {scene.elements.map((element) => (
        <DreamElement3D
          key={element.id}
          element={element}
          isPlaying={isPlaying}
        />
      ))}
      
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <Environment preset={scene.environment === 'space' ? 'night' : 'sunset'} />
    </Canvas>
  );
};

// Main Dream-to-Web Component
export const DreamToWebTranslatorComponent: React.FC = () => {
  const [description, setDescription] = useState('Create floating islands with mystical crystals and sparkling particles');
  const [generatedScene, setGeneratedScene] = useState<DreamScene | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('preview');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const scene = DreamToWebTranslator.analyzeSketchDescription(description);
    const code = DreamToWebTranslator.generateReactCode(scene);
    
    setGeneratedScene(scene);
    setGeneratedCode(code);
    setIsGenerating(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real implementation, this would use image recognition AI
      // For now, we'll simulate based on filename
      const filename = file.name.toLowerCase();
      let simulatedDescription = 'A dreamy scene with floating elements';
      
      if (filename.includes('island')) simulatedDescription = 'Floating islands with mystical atmosphere';
      else if (filename.includes('crystal')) simulatedDescription = 'Crystalline structures with magical properties';
      else if (filename.includes('space')) simulatedDescription = 'Cosmic scene with stars and planets';
      else if (filename.includes('forest')) simulatedDescription = 'Enchanted forest with organic shapes';
      
      setDescription(simulatedDescription);
      handleGenerate();
    }
  };

  const exampleDescriptions = [
    'Floating islands with mystical crystals and sparkling particles',
    'Cosmic scene with orbiting planets and star fields',
    'Underwater world with flowing organic shapes',
    'Crystalline city with geometric structures',
    'Dreamy forest with floating leaves and light',
    'Abstract space with pulsing geometric forms',
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
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
            <Wand2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Dream-to-Web Vision Translator
            </h1>
            <p className="text-muted-foreground">
              Upload sketches or describe dreams → AI converts them to live 3D websites
            </p>
          </div>
        </motion.div>

        {/* Input Section */}
        <div className="flex gap-4 mb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="bg-background/50 backdrop-blur-xl border-white/10"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Sketch
          </Button>
          
          <input
            type="text"
            placeholder="Describe your dream or sketch..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1 px-4 py-2 bg-background/50 backdrop-blur-xl border border-white/10 rounded-lg focus:border-white/20 focus:outline-none"
          />
          
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                </motion.div>
                Translating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate 3D Scene
              </>
            )}
          </Button>
        </div>

        {/* Example Descriptions */}
        <div className="flex flex-wrap gap-2 mb-6">
          {exampleDescriptions.map((example, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-blue-500/10 hover:border-blue-500/50"
              onClick={() => setDescription(example)}
            >
              {example}
            </Badge>
          ))}
        </div>
      </div>

      {/* Generated Content */}
      {generatedScene && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto mb-6">
            <TabsTrigger value="preview">3D Preview</TabsTrigger>
            <TabsTrigger value="scene">Scene Info</TabsTrigger>
            <TabsTrigger value="code">React Code</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Live 3D Dream Scene</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlaying(false)}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>

              <div className="h-96 rounded-lg overflow-hidden bg-black/20">
                <DreamScene3D scene={generatedScene} isPlaying={isPlaying} />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{generatedScene.mood}</Badge>
                  <Badge variant="secondary">{generatedScene.environment}</Badge>
                  <Badge variant="outline">{generatedScene.elements.length} elements</Badge>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Scene
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="scene">
            <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
              <h3 className="text-xl font-semibold mb-4">Scene Configuration</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Scene Details</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Name:</strong> {generatedScene.name}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Description:</strong> {generatedScene.description}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Mood:</strong> {generatedScene.mood}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Environment:</strong> {generatedScene.environment}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Lighting</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Ambient:</strong> {generatedScene.lighting.ambient}
                    </div>
                    <div>
                      <strong>Directional:</strong> {generatedScene.lighting.directional}
                    </div>
                    <div>
                      <strong>Color:</strong> {generatedScene.lighting.color}
                    </div>
                    <div>
                      <strong>Intensity:</strong> {generatedScene.lighting.intensity}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Elements ({generatedScene.elements.length})</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {generatedScene.elements.map((element) => (
                      <div key={element.id} className="text-sm p-2 bg-black/20 rounded">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{element.id}</span>
                          <Badge variant="outline" className="text-xs">
                            {element.type}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {element.material} • {element.animation} • {element.color}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="code">
            <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Generated React Three Fiber Code</h3>
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
        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Wand2 className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold">Vision Translation</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Upload sketches or describe dreams → AI converts them to interactive 3D scenes.
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold">Dream Analysis</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            AI understands dream narratives and translates them into coherent 3D environments.
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Download className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="font-semibold">Live Export</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Get clean React Three Fiber code ready for production deployment.
          </p>
        </Card>
      </div>
    </div>
  );
};
