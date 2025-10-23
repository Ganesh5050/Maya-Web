import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward,
  Settings,
  Layers,
  Clock,
  Zap,
  Download,
  Upload,
  Copy,
  Trash2,
  Plus,
  Minus,
  RotateCcw,
  Save,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Film,
  Sparkles,
  Wand2,
  Target,
  Move,
  Scale,
  RotateCw
} from 'lucide-react';

// Animation Timeline Service
class AnimationTimelineService {
  private static timeline: any[] = [];
  private static currentTime: number = 0;
  private static duration: number = 5;
  private static isPlaying: boolean = false;
  private static playbackSpeed: number = 1;

  static addKeyframe(elementId: string, time: number, properties: any) {
    const keyframe = {
      id: Date.now().toString(),
      elementId,
      time,
      properties,
      easing: 'ease-out',
      type: 'transform'
    };
    
    this.timeline.push(keyframe);
    this.timeline.sort((a, b) => a.time - b.time);
    
    return keyframe;
  }

  static removeKeyframe(keyframeId: string) {
    this.timeline = this.timeline.filter(kf => kf.id !== keyframeId);
  }

  static updateKeyframe(keyframeId: string, updates: any) {
    const keyframe = this.timeline.find(kf => kf.id === keyframeId);
    if (keyframe) {
      Object.assign(keyframe, updates);
    }
  }

  static getTimeline() {
    return this.timeline;
  }

  static getCurrentTime() {
    return this.currentTime;
  }

  static setCurrentTime(time: number) {
    this.currentTime = Math.max(0, Math.min(time, this.duration));
  }

  static getDuration() {
    return this.duration;
  }

  static setDuration(duration: number) {
    this.duration = Math.max(1, duration);
  }

  static play() {
    this.isPlaying = true;
  }

  static pause() {
    this.isPlaying = false;
  }

  static stop() {
    this.isPlaying = false;
    this.currentTime = 0;
  }

  static isCurrentlyPlaying() {
    return this.isPlaying;
  }

  static setPlaybackSpeed(speed: number) {
    this.playbackSpeed = Math.max(0.1, Math.min(speed, 3));
  }

  static getPlaybackSpeed() {
    return this.playbackSpeed;
  }

  static generateFramerMotionCode(): string {
    const elements = [...new Set(this.timeline.map(kf => kf.elementId))];
    
    let code = `import { motion } from 'framer-motion';\n\n`;
    
    elements.forEach(elementId => {
      const elementKeyframes = this.timeline.filter(kf => kf.elementId === elementId);
      if (elementKeyframes.length === 0) return;
      
      const sortedKeyframes = elementKeyframes.sort((a, b) => a.time - b.time);
      
      code += `const ${elementId}Variants = {\n`;
      code += `  initial: {\n`;
      
      const initialKeyframe = sortedKeyframes[0];
      Object.entries(initialKeyframe.properties).forEach(([key, value]) => {
        code += `    ${key}: ${JSON.stringify(value)},\n`;
      });
      
      code += `  },\n`;
      code += `  animate: {\n`;
      
      sortedKeyframes.forEach((keyframe, index) => {
        const progress = keyframe.time / this.duration;
        code += `    ${Math.round(progress * 100)}%: {\n`;
        Object.entries(keyframe.properties).forEach(([key, value]) => {
          code += `      ${key}: ${JSON.stringify(value)},\n`;
        });
        code += `    },\n`;
      });
      
      code += `  },\n`;
      code += `  transition: {\n`;
      code += `    duration: ${this.duration},\n`;
      code += `    ease: "${sortedKeyframes[0]?.easing || 'ease-out'}"\n`;
      code += `  }\n`;
      code += `};\n\n`;
    });
    
    code += `// Usage in component:\n`;
    elements.forEach(elementId => {
      code += `<motion.div\n`;
      code += `  variants={${elementId}Variants}\n`;
      code += `  initial="initial"\n`;
      code += `  animate="animate"\n`;
      code += `>\n`;
      code += `  {/* Your content */}\n`;
      code += `</motion.div>\n\n`;
    });
    
    return code;
  }

  static generateGSAPCode(): string {
    const elements = [...new Set(this.timeline.map(kf => kf.elementId))];
    
    let code = `import { gsap } from 'gsap';\n\n`;
    code += `const timeline = gsap.timeline();\n\n`;
    
    this.timeline.forEach(keyframe => {
      const progress = keyframe.time / this.duration;
      code += `timeline.to(".${keyframe.elementId}", {\n`;
      code += `  duration: ${this.duration * (1 - progress)},\n`;
      Object.entries(keyframe.properties).forEach(([key, value]) => {
        code += `  ${key}: ${JSON.stringify(value)},\n`;
      });
      code += `  ease: "${keyframe.easing}"\n`;
      code += `}, ${keyframe.time});\n\n`;
    });
    
    code += `// Start animation:\n`;
    code += `timeline.play();\n`;
    
    return code;
  }

  static clearTimeline() {
    this.timeline = [];
    this.currentTime = 0;
  }
}

// Keyframe Editor Component
const KeyframeEditor: React.FC<{ keyframe: any; onUpdate: (updates: any) => void; onDelete: () => void }> = ({ 
  keyframe, 
  onUpdate, 
  onDelete 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="bg-slate-700 border-slate-600">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            <span className="text-sm font-medium text-white">
              {keyframe.elementId} at {keyframe.time.toFixed(1)}s
            </span>
            <Badge variant="outline" className="text-xs">
              {keyframe.type}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onDelete}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* Transform Properties */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Transform</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400">X Position</label>
                  <Input
                    type="number"
                    value={keyframe.properties.x || 0}
                    onChange={(e) => onUpdate({
                      properties: { ...keyframe.properties, x: parseFloat(e.target.value) || 0 }
                    })}
                    className="bg-slate-800 border-slate-600 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Y Position</label>
                  <Input
                    type="number"
                    value={keyframe.properties.y || 0}
                    onChange={(e) => onUpdate({
                      properties: { ...keyframe.properties, y: parseFloat(e.target.value) || 0 }
                    })}
                    className="bg-slate-800 border-slate-600 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Scale</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={keyframe.properties.scale || 1}
                    onChange={(e) => onUpdate({
                      properties: { ...keyframe.properties, scale: parseFloat(e.target.value) || 1 }
                    })}
                    className="bg-slate-800 border-slate-600 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Rotation</label>
                  <Input
                    type="number"
                    value={keyframe.properties.rotate || 0}
                    onChange={(e) => onUpdate({
                      properties: { ...keyframe.properties, rotate: parseFloat(e.target.value) || 0 }
                    })}
                    className="bg-slate-800 border-slate-600 text-white text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Visual Properties */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Visual</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400">Opacity</label>
                  <Slider
                    value={[keyframe.properties.opacity || 1]}
                    onValueChange={([value]) => onUpdate({
                      properties: { ...keyframe.properties, opacity: value }
                    })}
                    max={1}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Blur</label>
                  <Input
                    type="number"
                    value={keyframe.properties.blur || 0}
                    onChange={(e) => onUpdate({
                      properties: { ...keyframe.properties, blur: parseFloat(e.target.value) || 0 }
                    })}
                    className="bg-slate-800 border-slate-600 text-white text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Easing */}
            <div>
              <label className="text-xs text-gray-400">Easing</label>
              <select
                value={keyframe.easing}
                onChange={(e) => onUpdate({ easing: e.target.value })}
                className="w-full bg-slate-800 border border-slate-600 text-white text-sm rounded px-3 py-2"
              >
                <option value="linear">Linear</option>
                <option value="ease-in">Ease In</option>
                <option value="ease-out">Ease Out</option>
                <option value="ease-in-out">Ease In Out</option>
                <option value="bounce">Bounce</option>
                <option value="elastic">Elastic</option>
              </select>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
};

// Main Animation Timeline Editor Component
const AnimationTimelineEditor: React.FC = () => {
  const [timeline, setTimeline] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedElement, setSelectedElement] = useState('element1');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeType, setCodeType] = useState<'framer' | 'gsap'>('framer');
  
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeline(AnimationTimelineService.getTimeline());
  }, []);

  const handlePlay = () => {
    if (isPlaying) {
      AnimationTimelineService.pause();
      setIsPlaying(false);
    } else {
      AnimationTimelineService.play();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    AnimationTimelineService.stop();
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleTimeChange = (time: number) => {
    AnimationTimelineService.setCurrentTime(time);
    setCurrentTime(time);
  };

  const handleAddKeyframe = () => {
    const keyframe = AnimationTimelineService.addKeyframe(selectedElement, currentTime, {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      opacity: 1,
      blur: 0
    });
    setTimeline([...AnimationTimelineService.getTimeline()]);
  };

  const handleUpdateKeyframe = (keyframeId: string, updates: any) => {
    AnimationTimelineService.updateKeyframe(keyframeId, updates);
    setTimeline([...AnimationTimelineService.getTimeline()]);
  };

  const handleDeleteKeyframe = (keyframeId: string) => {
    AnimationTimelineService.removeKeyframe(keyframeId);
    setTimeline([...AnimationTimelineService.getTimeline()]);
  };

  const handleGenerateCode = () => {
    const code = codeType === 'framer' 
      ? AnimationTimelineService.generateFramerMotionCode()
      : AnimationTimelineService.generateGSAPCode();
    setGeneratedCode(code);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Film className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              🎬 Animation Timeline Editor
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Professional-grade animation editor with visual keyframes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Timeline Controls */}
          <div className="lg:col-span-3 space-y-6">
            {/* Playback Controls */}
            <Card className="bg-slate-800 border-slate-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Timeline Controls</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={isPlaying ? "default" : "secondary"}>
                      {isPlaying ? "Playing" : "Paused"}
                    </Badge>
                    <Badge variant="outline">
                      {playbackSpeed}x Speed
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <Button
                    onClick={handleStop}
                    variant="outline"
                    size="sm"
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handlePlay}
                    className={isPlaying ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                    size="sm"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">
                        {currentTime.toFixed(1)}s / {duration}s
                      </span>
                    </div>
                    <Slider
                      value={[currentTime]}
                      onValueChange={([value]) => handleTimeChange(value)}
                      max={duration}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-300">Duration:</label>
                    <Input
                      type="number"
                      value={duration}
                      onChange={(e) => {
                        const newDuration = parseFloat(e.target.value) || 5;
                        AnimationTimelineService.setDuration(newDuration);
                        setDuration(newDuration);
                      }}
                      className="w-20 bg-slate-700 border-slate-600 text-white text-sm"
                    />
                    <span className="text-sm text-gray-400">s</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-300">Speed:</label>
                    <Slider
                      value={[playbackSpeed]}
                      onValueChange={([value]) => {
                        AnimationTimelineService.setPlaybackSpeed(value);
                        setPlaybackSpeed(value);
                      }}
                      max={3}
                      min={0.1}
                      step={0.1}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Timeline Visualization */}
            <Card className="bg-slate-800 border-slate-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Timeline</h3>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedElement}
                      onChange={(e) => setSelectedElement(e.target.value)}
                      className="bg-slate-700 border border-slate-600 text-white text-sm rounded px-3 py-1"
                    >
                      <option value="element1">Element 1</option>
                      <option value="element2">Element 2</option>
                      <option value="element3">Element 3</option>
                    </select>
                    <Button
                      onClick={handleAddKeyframe}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Keyframe
                    </Button>
                  </div>
                </div>

                {/* Timeline Ruler */}
                <div className="relative h-16 bg-slate-900 rounded-lg mb-4 overflow-hidden">
                  <div className="absolute inset-0 flex">
                    {Array.from({ length: Math.ceil(duration) + 1 }, (_, i) => (
                      <div key={i} className="flex-1 border-r border-slate-600 relative">
                        <div className="absolute top-0 left-1 text-xs text-gray-400">
                          {i}s
                        </div>
                        {i < duration && (
                          <div className="absolute top-4 left-0 w-full h-px bg-slate-600">
                            {Array.from({ length: 9 }, (_, j) => (
                              <div
                                key={j}
                                className="absolute top-0 w-px h-2 bg-slate-500"
                                style={{ left: `${(j + 1) * 10}%` }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Keyframes */}
                  {timeline.map((keyframe) => (
                    <div
                      key={keyframe.id}
                      className="absolute top-2 w-3 h-12 bg-purple-400 rounded cursor-pointer hover:bg-purple-300"
                      style={{ left: `${(keyframe.time / duration) * 100}%` }}
                      title={`${keyframe.elementId} at ${keyframe.time.toFixed(1)}s`}
                    />
                  ))}

                  {/* Playhead */}
                  <div
                    className="absolute top-0 w-0.5 h-full bg-red-400 pointer-events-none"
                    style={{ left: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </div>
            </Card>

            {/* Keyframes List */}
            <Card className="bg-slate-800 border-slate-700">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Keyframes</h3>
                <div className="space-y-3">
                  {timeline.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                      <Film className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No keyframes added yet</p>
                      <p className="text-sm mt-2">Click "Add Keyframe" to start animating</p>
                    </div>
                  ) : (
                    timeline.map((keyframe) => (
                      <KeyframeEditor
                        key={keyframe.id}
                        keyframe={keyframe}
                        onUpdate={(updates) => handleUpdateKeyframe(keyframe.id, updates)}
                        onDelete={() => handleDeleteKeyframe(keyframe.id)}
                      />
                    ))
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Code Generation */}
            <Card className="bg-slate-800 border-slate-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Export Code</h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setCodeType('framer')}
                      variant={codeType === 'framer' ? 'default' : 'outline'}
                      size="sm"
                    >
                      Framer
                    </Button>
                    <Button
                      onClick={() => setCodeType('gsap')}
                      variant={codeType === 'gsap' ? 'default' : 'outline'}
                      size="sm"
                    >
                      GSAP
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleGenerateCode}
                  className="w-full mb-4 bg-purple-600 hover:bg-purple-700"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Code
                </Button>

                {generatedCode && (
                  <div className="space-y-3">
                    <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto max-h-64">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                        {generatedCode}
                      </pre>
                    </div>
                    <Button
                      onClick={copyCode}
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Code
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Animation Presets */}
            <Card className="bg-slate-800 border-slate-700">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Presets</h3>
                <div className="space-y-2">
                  {[
                    { name: 'Fade In', icon: <Eye className="w-4 h-4" /> },
                    { name: 'Slide Up', icon: <Move className="w-4 h-4" /> },
                    { name: 'Scale In', icon: <Scale className="w-4 h-4" /> },
                    { name: 'Rotate In', icon: <RotateCw className="w-4 h-4" /> },
                    { name: 'Bounce', icon: <Target className="w-4 h-4" /> },
                    { name: 'Elastic', icon: <Zap className="w-4 h-4" /> }
                  ].map((preset, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700"
                    >
                      {preset.icon}
                      <span className="ml-2">{preset.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Features */}
            <Card className="bg-slate-800 border-slate-700">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
                <div className="space-y-3">
                  {[
                    { icon: <Film className="w-4 h-4" />, text: "Visual keyframe editor" },
                    { icon: <Clock className="w-4 h-4" />, text: "Precise timing control" },
                    { icon: <Settings className="w-4 h-4" />, text: "Easing curve customization" },
                    { icon: <Layers className="w-4 h-4" />, text: "Multi-element animation" },
                    { icon: <Download className="w-4 h-4" />, text: "Export to Framer/GSAP" },
                    { icon: <Play className="w-4 h-4" />, text: "Real-time preview" }
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

export default AnimationTimelineEditor;
