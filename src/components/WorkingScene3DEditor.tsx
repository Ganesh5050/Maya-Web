import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  TransformControls, 
  Box, 
  Sphere, 
  Cylinder,
  Cone,
  Torus,
  Octahedron,
  Plane,
  Text3D,
  Float,
  Environment,
  Lightformer,
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';
import { 
  Box as CubeIcon, 
  Circle as SphereIcon, 
  Cylinder as CylinderIcon,
  Triangle as ConeIcon,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Eye,
  EyeOff,
  Grid,
  Sun,
  Moon,
  Palette,
  Move,
  RotateCw,
  Scale,
  Save,
  Copy,
  Trash2,
  Plus,
  Minus,
  RotateCcw as RotateIcon
} from 'lucide-react';

// 3D Object Component with real functionality
const Object3D = ({ object, isSelected, onSelect, onUpdate }) => {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current && object.autoRotate) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const renderGeometry = () => {
    switch (object.type) {
      case 'box':
        return <boxGeometry args={[object.scale[0], object.scale[1], object.scale[2]]} />;
      case 'sphere':
        return <sphereGeometry args={[object.scale[0], 32, 32]} />;
      case 'cylinder':
        return <cylinderGeometry args={[object.scale[0], object.scale[0], object.scale[1], 32]} />;
      case 'cone':
        return <coneGeometry args={[object.scale[0], object.scale[1], 32]} />;
      case 'torus':
        return <torusGeometry args={[object.scale[0], object.scale[0] * 0.3, 16, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[object.scale[0]]} />;
      case 'plane':
        return <planeGeometry args={[object.scale[0], object.scale[1]]} />;
      case 'text':
        return (
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={object.fontSize || 0.5}
            height={object.height || 0.1}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            {object.text || 'Text'}
            <meshStandardMaterial color={object.color} />
          </Text3D>
        );
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  const renderMaterial = () => {
    switch (object.material) {
      case 'glass':
        return <meshPhysicalMaterial 
          color={object.color} 
          transparent 
          opacity={0.7} 
          roughness={0.1} 
          metalness={0.1}
          transmission={0.9}
        />;
      case 'metal':
        return <meshStandardMaterial 
          color={object.color} 
          metalness={0.9} 
          roughness={0.1}
        />;
      case 'emissive':
        return <meshStandardMaterial 
          color={object.color} 
          emissive={object.color}
          emissiveIntensity={0.5}
        />;
      default:
        return <meshStandardMaterial color={object.color} />;
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(object.id);
  };

  const handleTransform = (e) => {
    if (e.target.object) {
      const newObject = {
        ...object,
        position: [e.target.object.position.x, e.target.object.position.y, e.target.object.position.z],
        rotation: [e.target.object.rotation.x, e.target.object.rotation.y, e.target.object.rotation.z],
        scale: [e.target.object.scale.x, e.target.object.scale.y, e.target.object.scale.z]
      };
      onUpdate(object.id, newObject);
    }
  };

  if (object.type === 'text') {
    return (
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={object.fontSize || 0.5}
          height={object.height || 0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={object.position}
          rotation={object.rotation}
          onClick={handleClick}
          onPointerOver={() => setIsHovered(true)}
          onPointerOut={() => setIsHovered(false)}
        >
          {object.text || 'Text'}
          {renderMaterial()}
        </Text3D>
      </Float>
    );
  }

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={object.position}
        rotation={object.rotation}
        scale={object.scale}
        onClick={handleClick}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        {renderGeometry()}
        {renderMaterial()}
        {isHovered && (
          <meshStandardMaterial 
            color={object.color} 
            emissive={object.color}
            emissiveIntensity={0.2}
          />
        )}
      </mesh>
    </Float>
  );
};

// Scene Component with real functionality
const Scene = ({ objects, selectedObject, onSelect, onUpdate, transformMode, showGrid, showLights }) => {
  return (
    <>
      <Environment preset="city" />
      {showLights && (
        <>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
        </>
      )}
      
      {objects.map((object) => (
        <Object3D
          key={object.id}
          object={object}
          isSelected={selectedObject?.id === object.id}
          onSelect={onSelect}
          onUpdate={onUpdate}
        />
      ))}
      
      {selectedObject && (
        <TransformControls
          object={selectedObject}
          mode={transformMode}
          onObjectChange={(e) => {
            if (e.target.object) {
              const newObject = {
                ...selectedObject,
                position: [e.target.object.position.x, e.target.object.position.y, e.target.object.position.z],
                rotation: [e.target.object.rotation.x, e.target.object.rotation.y, e.target.object.rotation.z],
                scale: [e.target.object.scale.x, e.target.object.scale.y, e.target.object.scale.z]
              };
              onUpdate(selectedObject.id, newObject);
            }
          }}
        />
      )}
      
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.25}
        scale={10}
        blur={1.5}
        far={4.5}
      />
    </>
  );
};

const WorkingScene3DEditor = () => {
  const [objects, setObjects] = useState([
    {
      id: '1',
      type: 'box',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#8B5CF6',
      material: 'glass',
      autoRotate: true
    },
    {
      id: '2',
      type: 'sphere',
      position: [2, 0, 0],
      rotation: [0, 0, 0],
      scale: [0.8, 0.8, 0.8],
      color: '#06B6D4',
      material: 'metal',
      autoRotate: false
    }
  ]);
  
  const [selectedObject, setSelectedObject] = useState(null);
  const [showGrid, setShowGrid] = useState(true);
  const [showLights, setShowLights] = useState(true);
  const [transformMode, setTransformMode] = useState<'translate' | 'rotate' | 'scale'>('translate');
  const [savedScenes, setSavedScenes] = useState([]);
  const [sceneName, setSceneName] = useState('');

  const objectTypes = [
    { type: 'box', icon: CubeIcon, name: 'Box' },
    { type: 'sphere', icon: SphereIcon, name: 'Sphere' },
    { type: 'cylinder', icon: CylinderIcon, name: 'Cylinder' },
    { type: 'cone', icon: ConeIcon, name: 'Cone' },
    { type: 'torus', icon: RotateIcon, name: 'Torus' },
    { type: 'octahedron', icon: CubeIcon, name: 'Octahedron' },
    { type: 'plane', icon: Grid, name: 'Plane' },
    { type: 'text', icon: Settings, name: 'Text' }
  ];

  const materials = [
    { type: 'standard', name: 'Standard', color: '#8B5CF6' },
    { type: 'glass', name: 'Glass', color: '#06B6D4' },
    { type: 'metal', name: 'Metal', color: '#F59E0B' },
    { type: 'emissive', name: 'Emissive', color: '#EF4444' }
  ];

  const addObject = (type) => {
    const newObject = {
      id: Date.now().toString(),
      type,
      position: [Math.random() * 4 - 2, Math.random() * 2, Math.random() * 4 - 2],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#8B5CF6',
      material: 'standard',
      autoRotate: false,
      ...(type === 'text' && { text: 'New Text', fontSize: 0.5, height: 0.1 })
    };
    setObjects([...objects, newObject]);
  };

  const deleteObject = (id) => {
    setObjects(objects.filter(obj => obj.id !== id));
    if (selectedObject?.id === id) {
      setSelectedObject(null);
    }
  };

  const updateObject = (id, updates) => {
    setObjects(objects.map(obj => 
      obj.id === id ? { ...obj, ...updates } : obj
    ));
    if (selectedObject?.id === id) {
      setSelectedObject({ ...selectedObject, ...updates });
    }
  };

  const duplicateObject = (id) => {
    const object = objects.find(obj => obj.id === id);
    if (object) {
      const duplicated = {
        ...object,
        id: Date.now().toString(),
        position: [
          object.position[0] + 1,
          object.position[1],
          object.position[2]
        ]
      };
      setObjects([...objects, duplicated]);
    }
  };

  const saveScene = () => {
    if (sceneName.trim()) {
      const scene = {
        id: Date.now().toString(),
        name: sceneName,
        objects: objects,
        createdAt: new Date().toISOString()
      };
      setSavedScenes(prev => [scene, ...prev]);
      localStorage.setItem('maya-scenes', JSON.stringify([scene, ...savedScenes]));
      setSceneName('');
    }
  };

  const loadScene = (scene) => {
    setObjects(scene.objects);
    setSelectedObject(null);
  };

  const exportScene = () => {
    const sceneData = {
      name: sceneName || 'Untitled Scene',
      objects: objects,
      metadata: {
        createdAt: new Date().toISOString(),
        objectCount: objects.length
      }
    };
    
    const blob = new Blob([JSON.stringify(sceneData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sceneName || 'scene'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearScene = () => {
    setObjects([]);
    setSelectedObject(null);
  };

  useEffect(() => {
    // Load saved scenes from localStorage
    const saved = localStorage.getItem('maya-scenes');
    if (saved) {
      setSavedScenes(JSON.parse(saved));
    }
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Settings className="w-4 h-4 mr-2" />
            Working 3D Scene Editor
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Create Stunning 3D Scenes
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Design interactive 3D environments with advanced materials, lighting, and animations. 
            Perfect for creating immersive web experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Object Library */}
          <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">3D Objects</CardTitle>
              <CardDescription className="text-gray-300">
                Add objects to your scene
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {objectTypes.map((objType) => (
                <Button
                  key={objType.type}
                  variant="outline"
                  className="w-full justify-start border-gray-600 text-gray-300 hover:border-purple-500 hover:text-white"
                  onClick={() => addObject(objType.type)}
                >
                  <objType.icon className="w-4 h-4 mr-3" />
                  {objType.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Scene Canvas */}
          <div className="lg:col-span-2">
            <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">3D Scene</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={showGrid ? "default" : "outline"}
                      onClick={() => setShowGrid(!showGrid)}
                      className={showGrid ? "bg-purple-600 text-white" : "border-gray-600 text-gray-300"}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={showLights ? "default" : "outline"}
                      onClick={() => setShowLights(!showLights)}
                      className={showLights ? "bg-yellow-600 text-white" : "border-gray-600 text-gray-300"}
                    >
                      <Sun className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-black rounded-lg overflow-hidden">
                  <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                    <Scene
                      objects={objects}
                      selectedObject={selectedObject}
                      onSelect={setSelectedObject}
                      onUpdate={updateObject}
                      transformMode={transformMode}
                      showGrid={showGrid}
                      showLights={showLights}
                    />
                    <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                  </Canvas>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Properties Panel */}
          <Card className="bg-black/20 backdrop-blur-xl border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">Properties</CardTitle>
              <CardDescription className="text-gray-300">
                {selectedObject ? `Edit ${selectedObject.type}` : 'Select an object'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedObject ? (
                <>
                  {/* Transform Controls */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-300">Transform</h4>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={transformMode === 'translate' ? "default" : "outline"}
                        onClick={() => setTransformMode('translate')}
                        className={transformMode === 'translate' ? "bg-blue-600 text-white" : "border-gray-600 text-gray-300"}
                      >
                        <Move className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={transformMode === 'rotate' ? "default" : "outline"}
                        onClick={() => setTransformMode('rotate')}
                        className={transformMode === 'rotate' ? "bg-green-600 text-white" : "border-gray-600 text-gray-300"}
                      >
                        <RotateCw className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={transformMode === 'scale' ? "default" : "outline"}
                        onClick={() => setTransformMode('scale')}
                        className={transformMode === 'scale' ? "bg-purple-600 text-white" : "border-gray-600 text-gray-300"}
                      >
                        <Scale className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Color */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-300">Color</h4>
                    <input
                      type="color"
                      value={selectedObject.color}
                      onChange={(e) => updateObject(selectedObject.id, { color: e.target.value })}
                      className="w-full h-10 rounded border border-gray-600 bg-black"
                    />
                  </div>

                  {/* Material */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-300">Material</h4>
                    <div className="space-y-2">
                      {materials.map((material) => (
                        <Button
                          key={material.type}
                          size="sm"
                          variant={selectedObject.material === material.type ? "default" : "outline"}
                          onClick={() => updateObject(selectedObject.id, { material: material.type })}
                          className={`w-full justify-start ${
                            selectedObject.material === material.type 
                              ? "bg-purple-600 text-white" 
                              : "border-gray-600 text-gray-300"
                          }`}
                        >
                          <Palette className="w-4 h-4 mr-2" />
                          {material.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Scale */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-300">Scale</h4>
                    <Slider
                      value={[selectedObject.scale[0]]}
                      onValueChange={([value]) => updateObject(selectedObject.id, { 
                        scale: [value, value, value] 
                      })}
                      min={0.1}
                      max={3}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  {/* Auto Rotate */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Auto Rotate</span>
                    <Button
                      size="sm"
                      variant={selectedObject.autoRotate ? "default" : "outline"}
                      onClick={() => updateObject(selectedObject.id, { 
                        autoRotate: !selectedObject.autoRotate 
                      })}
                      className={selectedObject.autoRotate ? "bg-green-600 text-white" : "border-gray-600 text-gray-300"}
                    >
                      {selectedObject.autoRotate ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    </Button>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => duplicateObject(selectedObject.id)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteObject(selectedObject.id)}
                      className="w-full"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Object
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                  <p className="text-gray-400">Select an object to edit its properties</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Scene Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <Card className="bg-black/20 backdrop-blur-xl border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white">Scene Management</CardTitle>
              <CardDescription className="text-gray-300">
                Save, load, and export your 3D scenes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Enter scene name"
                  value={sceneName}
                  onChange={(e) => setSceneName(e.target.value)}
                  className="flex-1 bg-black/30 border-cyan-500/30 text-white placeholder-gray-400"
                />
                <Button
                  onClick={saveScene}
                  disabled={!sceneName.trim()}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Scene
                </Button>
                <Button
                  onClick={exportScene}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button
                  onClick={clearScene}
                  variant="outline"
                  className="border-red-600 text-red-300 hover:border-red-500"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>

              {/* Saved Scenes */}
              {savedScenes.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-300">Saved Scenes</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {savedScenes.slice(0, 6).map((scene) => (
                      <div key={scene.id} className="p-3 bg-black/30 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-white font-medium">{scene.name}</h5>
                          <Badge className="bg-cyan-500/20 text-cyan-300">
                            {scene.objects.length} objects
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-400 mb-2">
                          {new Date(scene.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-cyan-600 hover:bg-cyan-700 text-white"
                            onClick={() => loadScene(scene)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Load
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-gray-300"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkingScene3DEditor;
