import React, { useState, useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Box, Sphere, Torus, Plane } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Move3D, 
  RotateCcw, 
  Scale, 
  Lightbulb, 
  Camera, 
  Palette, 
  Download, 
  Upload,
  Trash2,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';
import * as THREE from 'three';

// 3D Asset Types
export interface Asset3D {
  id: string;
  type: 'box' | 'sphere' | 'torus' | 'plane' | 'text' | 'custom';
  name: string;
  category: 'primitives' | 'furniture' | 'nature' | 'tech' | 'abstract';
  icon: React.ReactNode;
  preview: string;
}

// 3D Object Configuration
export interface Object3D {
  id: string;
  type: string;
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  material: 'standard' | 'glass' | 'metal' | 'emissive' | 'matte';
  visible: boolean;
  locked: boolean;
}

// Asset Library
const ASSET_LIBRARY: Asset3D[] = [
  // Primitives
  { id: 'box', type: 'box', name: 'Cube', category: 'primitives', icon: <Box className="w-4 h-4" />, preview: '📦' },
  { id: 'sphere', type: 'sphere', name: 'Sphere', category: 'primitives', icon: <Sphere className="w-4 h-4" />, preview: '⚪' },
  { id: 'torus', type: 'torus', name: 'Torus', category: 'primitives', icon: <Torus className="w-4 h-4" />, preview: '🍩' },
  { id: 'plane', type: 'plane', name: 'Plane', category: 'primitives', icon: <Plane className="w-4 h-4" />, preview: '⬜' },
  
  // Tech
  { id: 'hologram', type: 'box', name: 'Hologram', category: 'tech', icon: <Box className="w-4 h-4" />, preview: '🔮' },
  { id: 'circuit', type: 'torus', name: 'Circuit', category: 'tech', icon: <Torus className="w-4 h-4" />, preview: '⚡' },
  { id: 'data', type: 'sphere', name: 'Data Node', category: 'tech', icon: <Sphere className="w-4 h-4" />, preview: '💾' },
  
  // Abstract
  { id: 'wave', type: 'plane', name: 'Wave', category: 'abstract', icon: <Plane className="w-4 h-4" />, preview: '🌊' },
  { id: 'particle', type: 'sphere', name: 'Particle', category: 'abstract', icon: <Sphere className="w-4 h-4" />, preview: '✨' },
];

// Material Presets
const MATERIAL_PRESETS = {
  standard: { name: 'Standard', color: '#ffffff', metalness: 0, roughness: 0.5 },
  glass: { name: 'Glass', color: '#ffffff', metalness: 0, roughness: 0.1, transparent: true, opacity: 0.7 },
  metal: { name: 'Metal', color: '#c0c0c0', metalness: 0.8, roughness: 0.2 },
  emissive: { name: 'Emissive', color: '#00ff88', metalness: 0, roughness: 0.5, emissive: '#00ff88', emissiveIntensity: 0.5 },
  matte: { name: 'Matte', color: '#666666', metalness: 0, roughness: 1 },
};

// 3D Object Component
const SceneObject3D: React.FC<{
  object: Object3D;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Object3D>) => void;
}> = ({ object, isSelected, onSelect, onUpdate }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (meshRef.current && object.material === 'emissive') {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const getGeometry = () => {
    switch (object.type) {
      case 'box':
        return <boxGeometry args={object.scale} />;
      case 'sphere':
        return <sphereGeometry args={[object.scale[0], 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[object.scale[0], object.scale[2], 16, 100]} />;
      case 'plane':
        return <planeGeometry args={object.scale} />;
      default:
        return <boxGeometry args={object.scale} />;
    }
  };

  const getMaterial = () => {
    const preset = MATERIAL_PRESETS[object.material];
    return (
      <meshStandardMaterial
        color={object.color}
        metalness={preset.metalness}
        roughness={preset.roughness}
        transparent={preset.transparent}
        opacity={preset.opacity}
        emissive={preset.emissive}
        emissiveIntensity={preset.emissiveIntensity}
      />
    );
  };

  if (!object.visible) return null;

  return (
    <mesh
      ref={meshRef}
      position={object.position}
      rotation={object.rotation}
      scale={object.scale}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(object.id);
      }}
    >
      {getGeometry()}
      {getMaterial()}
      
      {/* Selection Outline */}
      {isSelected && (
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[object.scale[0] + 0.1, object.scale[1] + 0.1, object.scale[2] + 0.1]} />
          <meshBasicMaterial color="#00ff88" wireframe />
        </mesh>
      )}
    </mesh>
  );
};

// Transform Controls Component
const TransformControls: React.FC<{
  object: Object3D | null;
  onUpdate: (updates: Partial<Object3D>) => void;
}> = ({ object, onUpdate }) => {
  if (!object) return null;

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Position</label>
        <div className="grid grid-cols-3 gap-2">
          {['X', 'Y', 'Z'].map((axis, index) => (
            <div key={axis}>
              <label className="text-xs text-muted-foreground">{axis}</label>
              <input
                type="number"
                value={object.position[index]}
                onChange={(e) => {
                  const newPosition = [...object.position] as [number, number, number];
                  newPosition[index] = parseFloat(e.target.value) || 0;
                  onUpdate({ position: newPosition });
                }}
                className="w-full px-2 py-1 text-sm bg-background/50 border border-white/10 rounded"
                step="0.1"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Rotation</label>
        <div className="grid grid-cols-3 gap-2">
          {['X', 'Y', 'Z'].map((axis, index) => (
            <div key={axis}>
              <label className="text-xs text-muted-foreground">{axis}</label>
              <input
                type="number"
                value={object.rotation[index]}
                onChange={(e) => {
                  const newRotation = [...object.rotation] as [number, number, number];
                  newRotation[index] = parseFloat(e.target.value) || 0;
                  onUpdate({ rotation: newRotation });
                }}
                className="w-full px-2 py-1 text-sm bg-background/50 border border-white/10 rounded"
                step="0.1"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Scale</label>
        <div className="grid grid-cols-3 gap-2">
          {['X', 'Y', 'Z'].map((axis, index) => (
            <div key={axis}>
              <label className="text-xs text-muted-foreground">{axis}</label>
              <input
                type="number"
                value={object.scale[index]}
                onChange={(e) => {
                  const newScale = [...object.scale] as [number, number, number];
                  newScale[index] = parseFloat(e.target.value) || 1;
                  onUpdate({ scale: newScale });
                }}
                className="w-full px-2 py-1 text-sm bg-background/50 border border-white/10 rounded"
                step="0.1"
                min="0.1"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Material</label>
        <select
          value={object.material}
          onChange={(e) => onUpdate({ material: e.target.value as any })}
          className="w-full px-2 py-1 text-sm bg-background/50 border border-white/10 rounded"
        >
          {Object.entries(MATERIAL_PRESETS).map(([key, preset]) => (
            <option key={key} value={key}>{preset.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Color</label>
        <input
          type="color"
          value={object.color}
          onChange={(e) => onUpdate({ color: e.target.value })}
          className="w-full h-8 bg-background/50 border border-white/10 rounded"
        />
      </div>
    </div>
  );
};

// Main 3D Environment Builder Component
export const RealTime3DEnvironmentBuilder: React.FC = () => {
  const [objects, setObjects] = useState<Object3D[]>([
    {
      id: '1',
      type: 'box',
      name: 'Ground',
      position: [0, -1, 0],
      rotation: [0, 0, 0],
      scale: [10, 0.1, 10],
      color: '#333333',
      material: 'standard',
      visible: true,
      locked: false,
    }
  ]);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('objects');
  const [lighting, setLighting] = useState({
    ambient: 0.3,
    directional: 0.6,
    color: '#ffffff',
  });

  const selectedObject = objects.find(obj => obj.id === selectedObjectId);

  const addObject = useCallback((asset: Asset3D) => {
    const newObject: Object3D = {
      id: Date.now().toString(),
      type: asset.type,
      name: asset.name,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#ffffff',
      material: 'standard',
      visible: true,
      locked: false,
    };
    setObjects(prev => [...prev, newObject]);
    setSelectedObjectId(newObject.id);
  }, []);

  const updateObject = useCallback((id: string, updates: Partial<Object3D>) => {
    setObjects(prev => prev.map(obj => 
      obj.id === id ? { ...obj, ...updates } : obj
    ));
  }, []);

  const deleteObject = useCallback((id: string) => {
    setObjects(prev => prev.filter(obj => obj.id !== id));
    if (selectedObjectId === id) {
      setSelectedObjectId(null);
    }
  }, [selectedObjectId]);

  const duplicateObject = useCallback((id: string) => {
    const object = objects.find(obj => obj.id === id);
    if (object) {
      const newObject: Object3D = {
        ...object,
        id: Date.now().toString(),
        name: `${object.name} Copy`,
        position: [object.position[0] + 1, object.position[1], object.position[2]],
      };
      setObjects(prev => [...prev, newObject]);
      setSelectedObjectId(newObject.id);
    }
  }, [objects]);

  const exportScene = () => {
    const sceneData = {
      objects,
      lighting,
      camera: { position: [5, 5, 5], fov: 60 },
    };
    
    const blob = new Blob([JSON.stringify(sceneData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scene.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-background via-background/95 to-background/90 flex">
      {/* Left Sidebar - Asset Library */}
      <div className="w-80 bg-background/50 backdrop-blur-xl border-r border-white/10 p-4 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Asset Library</h2>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="objects">Objects</TabsTrigger>
              <TabsTrigger value="lighting">Lighting</TabsTrigger>
            </TabsList>

            <TabsContent value="objects">
              <div className="space-y-4">
                {Object.entries(
                  ASSET_LIBRARY.reduce((acc, asset) => {
                    if (!acc[asset.category]) acc[asset.category] = [];
                    acc[asset.category].push(asset);
                    return acc;
                  }, {} as Record<string, Asset3D[]>)
                ).map(([category, assets]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 capitalize">
                      {category}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {assets.map((asset) => (
                        <Button
                          key={asset.id}
                          variant="outline"
                          size="sm"
                          onClick={() => addObject(asset)}
                          className="h-auto p-2 flex flex-col items-center gap-1"
                        >
                          <span className="text-lg">{asset.preview}</span>
                          <span className="text-xs">{asset.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lighting">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ambient Light</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={lighting.ambient}
                    onChange={(e) => setLighting(prev => ({ ...prev, ambient: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                  <span className="text-xs text-muted-foreground">{lighting.ambient}</span>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Directional Light</label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={lighting.directional}
                    onChange={(e) => setLighting(prev => ({ ...prev, directional: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                  <span className="text-xs text-muted-foreground">{lighting.directional}</span>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Light Color</label>
                  <input
                    type="color"
                    value={lighting.color}
                    onChange={(e) => setLighting(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full h-8 bg-background/50 border border-white/10 rounded"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Scene Objects List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Scene Objects</h3>
            <Button variant="outline" size="sm" onClick={exportScene}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {objects.map((object) => (
              <Card
                key={object.id}
                className={`p-3 cursor-pointer transition-colors ${
                  selectedObjectId === object.id 
                    ? 'bg-purple-500/20 border-purple-500/50' 
                    : 'bg-background/30 hover:bg-background/50'
                }`}
                onClick={() => setSelectedObjectId(object.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateObject(object.id, { visible: !object.visible });
                      }}
                    >
                      {object.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <span className="text-sm font-medium">{object.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateObject(object.id);
                      }}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteObject(object.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Center - 3D Canvas */}
      <div className="flex-1 relative">
        <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
          <ambientLight intensity={lighting.ambient} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={lighting.directional}
            color={lighting.color}
          />
          
          {objects.map((object) => (
            <SceneObject3D
              key={object.id}
              object={object}
              isSelected={selectedObjectId === object.id}
              onSelect={setSelectedObjectId}
              onUpdate={(updates) => updateObject(object.id, updates)}
            />
          ))}
          
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          <Environment preset="sunset" />
        </Canvas>
      </div>

      {/* Right Sidebar - Properties */}
      <div className="w-80 bg-background/50 backdrop-blur-xl border-l border-white/10 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Properties</h2>
        
        {selectedObject ? (
          <div>
            <div className="mb-4">
              <input
                type="text"
                value={selectedObject.name}
                onChange={(e) => updateObject(selectedObject.id, { name: e.target.value })}
                className="w-full px-3 py-2 bg-background/50 border border-white/10 rounded-lg"
              />
            </div>
            
            <TransformControls
              object={selectedObject}
              onUpdate={(updates) => updateObject(selectedObject.id, updates)}
            />
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <Move3D className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Select an object to edit its properties</p>
          </div>
        )}
      </div>
    </div>
  );
};
