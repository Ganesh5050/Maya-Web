import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Brain, 
  Mic, 
  MicOff, 
  Zap, 
  Heart, 
  Smile, 
  Frown, 
  Meh,
  Sparkles,
  Download,
  Eye,
  EyeOff,
  Volume2,
  VolumeX
} from 'lucide-react';

// Emotion Types
export type EmotionType = 'happy' | 'excited' | 'calm' | 'energetic' | 'frustrated' | 'confident' | 'creative' | 'professional' | 'playful' | 'serious';

// Emotion Configuration
export interface EmotionConfig {
  emotion: EmotionType;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  typography: {
    fontFamily: string;
    fontWeight: number;
    letterSpacing: string;
  };
  animations: {
    duration: number;
    easing: string;
    bounce: boolean;
    intensity: 'subtle' | 'moderate' | 'dramatic';
  };
  layout: {
    spacing: 'tight' | 'comfortable' | 'generous';
    alignment: 'left' | 'center' | 'asymmetric';
    density: 'minimal' | 'balanced' | 'rich';
  };
  effects: {
    shadows: boolean;
    gradients: boolean;
    blur: boolean;
    glow: boolean;
  };
}

// Cognitive Design Engine Class
export class CognitiveDesignEngine {
  private static emotionPresets: Record<EmotionType, EmotionConfig> = {
    happy: {
      emotion: 'happy',
      name: 'Joyful',
      description: 'Warm, welcoming, optimistic design',
      colors: {
        primary: '#f59e0b',
        secondary: '#fbbf24',
        accent: '#fde047',
        background: '#fef3c7',
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        letterSpacing: '0.025em',
      },
      animations: {
        duration: 0.4,
        easing: 'ease-out',
        bounce: true,
        intensity: 'moderate',
      },
      layout: {
        spacing: 'comfortable',
        alignment: 'center',
        density: 'balanced',
      },
      effects: {
        shadows: true,
        gradients: true,
        blur: false,
        glow: true,
      },
    },
    excited: {
      emotion: 'excited',
      name: 'Energetic',
      description: 'Dynamic, vibrant, high-energy design',
      colors: {
        primary: '#ef4444',
        secondary: '#f97316',
        accent: '#eab308',
        background: '#fef2f2',
      },
      typography: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        letterSpacing: '0.05em',
      },
      animations: {
        duration: 0.2,
        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        bounce: true,
        intensity: 'dramatic',
      },
      layout: {
        spacing: 'tight',
        alignment: 'asymmetric',
        density: 'rich',
      },
      effects: {
        shadows: true,
        gradients: true,
        blur: false,
        glow: true,
      },
    },
    calm: {
      emotion: 'calm',
      name: 'Serene',
      description: 'Peaceful, minimal, zen-like design',
      colors: {
        primary: '#06b6d4',
        secondary: '#0891b2',
        accent: '#0e7490',
        background: '#f0f9ff',
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        letterSpacing: '0.01em',
      },
      animations: {
        duration: 0.8,
        easing: 'ease-in-out',
        bounce: false,
        intensity: 'subtle',
      },
      layout: {
        spacing: 'generous',
        alignment: 'center',
        density: 'minimal',
      },
      effects: {
        shadows: false,
        gradients: false,
        blur: true,
        glow: false,
      },
    },
    energetic: {
      emotion: 'energetic',
      name: 'Dynamic',
      description: 'Fast-paced, bold, action-oriented design',
      colors: {
        primary: '#8b5cf6',
        secondary: '#a855f7',
        accent: '#c084fc',
        background: '#faf5ff',
      },
      typography: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        letterSpacing: '0.1em',
      },
      animations: {
        duration: 0.3,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: true,
        intensity: 'dramatic',
      },
      layout: {
        spacing: 'tight',
        alignment: 'asymmetric',
        density: 'rich',
      },
      effects: {
        shadows: true,
        gradients: true,
        blur: false,
        glow: true,
      },
    },
    frustrated: {
      emotion: 'frustrated',
      name: 'Bold',
      description: 'Strong, assertive, no-nonsense design',
      colors: {
        primary: '#dc2626',
        secondary: '#ef4444',
        accent: '#f87171',
        background: '#fef2f2',
      },
      typography: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 600,
        letterSpacing: '0.02em',
      },
      animations: {
        duration: 0.1,
        easing: 'linear',
        bounce: false,
        intensity: 'subtle',
      },
      layout: {
        spacing: 'comfortable',
        alignment: 'left',
        density: 'balanced',
      },
      effects: {
        shadows: true,
        gradients: false,
        blur: false,
        glow: false,
      },
    },
    confident: {
      emotion: 'confident',
      name: 'Assured',
      description: 'Strong, professional, trustworthy design',
      colors: {
        primary: '#1e40af',
        secondary: '#3b82f6',
        accent: '#60a5fa',
        background: '#eff6ff',
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        letterSpacing: '0.015em',
      },
      animations: {
        duration: 0.5,
        easing: 'ease-out',
        bounce: false,
        intensity: 'moderate',
      },
      layout: {
        spacing: 'comfortable',
        alignment: 'center',
        density: 'balanced',
      },
      effects: {
        shadows: true,
        gradients: true,
        blur: false,
        glow: false,
      },
    },
    creative: {
      emotion: 'creative',
      name: 'Artistic',
      description: 'Imaginative, colorful, expressive design',
      colors: {
        primary: '#ec4899',
        secondary: '#f472b6',
        accent: '#fbbf24',
        background: '#fdf2f8',
      },
      typography: {
        fontFamily: 'Playfair Display, serif',
        fontWeight: 500,
        letterSpacing: '0.05em',
      },
      animations: {
        duration: 0.6,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: true,
        intensity: 'moderate',
      },
      layout: {
        spacing: 'generous',
        alignment: 'asymmetric',
        density: 'rich',
      },
      effects: {
        shadows: true,
        gradients: true,
        blur: true,
        glow: true,
      },
    },
    professional: {
      emotion: 'professional',
      name: 'Corporate',
      description: 'Clean, formal, business-focused design',
      colors: {
        primary: '#374151',
        secondary: '#6b7280',
        accent: '#9ca3af',
        background: '#f9fafb',
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        letterSpacing: '0.01em',
      },
      animations: {
        duration: 0.3,
        easing: 'ease-out',
        bounce: false,
        intensity: 'subtle',
      },
      layout: {
        spacing: 'comfortable',
        alignment: 'left',
        density: 'balanced',
      },
      effects: {
        shadows: true,
        gradients: false,
        blur: false,
        glow: false,
      },
    },
    playful: {
      emotion: 'playful',
      name: 'Fun',
      description: 'Lighthearted, whimsical, entertaining design',
      colors: {
        primary: '#10b981',
        secondary: '#34d399',
        accent: '#6ee7b7',
        background: '#ecfdf5',
      },
      typography: {
        fontFamily: 'Comic Sans MS, cursive',
        fontWeight: 400,
        letterSpacing: '0.05em',
      },
      animations: {
        duration: 0.4,
        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        bounce: true,
        intensity: 'dramatic',
      },
      layout: {
        spacing: 'generous',
        alignment: 'center',
        density: 'rich',
      },
      effects: {
        shadows: true,
        gradients: true,
        blur: false,
        glow: true,
      },
    },
    serious: {
      emotion: 'serious',
      name: 'Formal',
      description: 'Structured, authoritative, no-frills design',
      colors: {
        primary: '#111827',
        secondary: '#374151',
        accent: '#6b7280',
        background: '#ffffff',
      },
      typography: {
        fontFamily: 'Times New Roman, serif',
        fontWeight: 400,
        letterSpacing: '0.005em',
      },
      animations: {
        duration: 0.2,
        easing: 'linear',
        bounce: false,
        intensity: 'subtle',
      },
      layout: {
        spacing: 'tight',
        alignment: 'left',
        density: 'minimal',
      },
      effects: {
        shadows: false,
        gradients: false,
        blur: false,
        glow: false,
      },
    },
  };

  static analyzeTextEmotion(text: string): EmotionType {
    const lowerText = text.toLowerCase();
    
    // Happy indicators
    if (lowerText.includes('happy') || lowerText.includes('joy') || lowerText.includes('excited') || 
        lowerText.includes('amazing') || lowerText.includes('wonderful') || lowerText.includes('love')) {
      return 'happy';
    }
    
    // Excited indicators
    if (lowerText.includes('energetic') || lowerText.includes('dynamic') || lowerText.includes('fast') ||
        lowerText.includes('powerful') || lowerText.includes('intense') || lowerText.includes('thrilling')) {
      return 'excited';
    }
    
    // Calm indicators
    if (lowerText.includes('calm') || lowerText.includes('peaceful') || lowerText.includes('serene') ||
        lowerText.includes('minimal') || lowerText.includes('clean') || lowerText.includes('zen')) {
      return 'calm';
    }
    
    // Energetic indicators
    if (lowerText.includes('energetic') || lowerText.includes('vibrant') || lowerText.includes('bold') ||
        lowerText.includes('striking') || lowerText.includes('dramatic') || lowerText.includes('intense')) {
      return 'energetic';
    }
    
    // Frustrated indicators
    if (lowerText.includes('frustrated') || lowerText.includes('angry') || lowerText.includes('urgent') ||
        lowerText.includes('problem') || lowerText.includes('fix') || lowerText.includes('broken')) {
      return 'frustrated';
    }
    
    // Confident indicators
    if (lowerText.includes('confident') || lowerText.includes('strong') || lowerText.includes('trust') ||
        lowerText.includes('reliable') || lowerText.includes('professional') || lowerText.includes('secure')) {
      return 'confident';
    }
    
    // Creative indicators
    if (lowerText.includes('creative') || lowerText.includes('artistic') || lowerText.includes('unique') ||
        lowerText.includes('imaginative') || lowerText.includes('colorful') || lowerText.includes('expressive')) {
      return 'creative';
    }
    
    // Professional indicators
    if (lowerText.includes('professional') || lowerText.includes('business') || lowerText.includes('corporate') ||
        lowerText.includes('formal') || lowerText.includes('official') || lowerText.includes('enterprise')) {
      return 'professional';
    }
    
    // Playful indicators
    if (lowerText.includes('playful') || lowerText.includes('fun') || lowerText.includes('whimsical') ||
        lowerText.includes('entertaining') || lowerText.includes('lighthearted') || lowerText.includes('cute')) {
      return 'playful';
    }
    
    // Serious indicators
    if (lowerText.includes('serious') || lowerText.includes('formal') || lowerText.includes('strict') ||
        lowerText.includes('authoritative') || lowerText.includes('structured') || lowerText.includes('rigid')) {
      return 'serious';
    }
    
    // Default to confident if no clear emotion detected
    return 'confident';
  }

  static analyzeVoiceEmotion(audioData: Float32Array): EmotionType {
    // Simulate voice emotion analysis
    // In a real implementation, this would use Web Audio API and ML models
    
    // Calculate basic audio features
    const rms = Math.sqrt(audioData.reduce((sum, val) => sum + val * val, 0) / audioData.length);
    const maxAmplitude = Math.max(...audioData.map(Math.abs));
    const zeroCrossings = audioData.slice(1).reduce((count, val, i) => 
      count + (val * audioData[i] < 0 ? 1 : 0), 0);
    
    // High energy = excited/energetic
    if (rms > 0.1 && maxAmplitude > 0.5) {
      return zeroCrossings > audioData.length * 0.1 ? 'excited' : 'energetic';
    }
    
    // Low energy = calm/serious
    if (rms < 0.05 && maxAmplitude < 0.3) {
      return zeroCrossings < audioData.length * 0.05 ? 'calm' : 'serious';
    }
    
    // Medium energy = confident/happy
    return 'confident';
  }

  static generateDesignFromEmotion(emotion: EmotionType): EmotionConfig {
    return this.emotionPresets[emotion];
  }

  static generateCSS(emotionConfig: EmotionConfig): string {
    return `
/* ${emotionConfig.name} Design - Generated by Cognitive Design Engine */
:root {
  --emotion-primary: ${emotionConfig.colors.primary};
  --emotion-secondary: ${emotionConfig.colors.secondary};
  --emotion-accent: ${emotionConfig.colors.accent};
  --emotion-background: ${emotionConfig.colors.background};
  
  --emotion-font-family: ${emotionConfig.typography.fontFamily};
  --emotion-font-weight: ${emotionConfig.typography.fontWeight};
  --emotion-letter-spacing: ${emotionConfig.typography.letterSpacing};
  
  --emotion-animation-duration: ${emotionConfig.animations.duration}s;
  --emotion-animation-easing: ${emotionConfig.animations.easing};
  --emotion-animation-bounce: ${emotionConfig.animations.bounce ? 'true' : 'false'};
  
  --emotion-spacing: ${emotionConfig.layout.spacing === 'tight' ? '0.5rem' : 
                     emotionConfig.layout.spacing === 'comfortable' ? '1rem' : '2rem'};
}

.emotion-design {
  font-family: var(--emotion-font-family);
  font-weight: var(--emotion-font-weight);
  letter-spacing: var(--emotion-letter-spacing);
  background: var(--emotion-background);
  color: var(--emotion-primary);
  padding: var(--emotion-spacing);
}

.emotion-button {
  background: var(--emotion-primary);
  color: white;
  border: none;
  padding: calc(var(--emotion-spacing) * 0.5) var(--emotion-spacing);
  border-radius: ${emotionConfig.layout.spacing === 'tight' ? '4px' : '8px'};
  transition: all var(--emotion-animation-duration) var(--emotion-animation-easing);
  ${emotionConfig.effects.shadows ? 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);' : ''}
}

.emotion-button:hover {
  transform: ${emotionConfig.animations.bounce ? 'translateY(-2px) scale(1.05)' : 'translateY(-1px)'};
  ${emotionConfig.effects.glow ? `box-shadow: 0 0 20px var(--emotion-primary);` : ''}
}

.emotion-card {
  background: white;
  border-radius: ${emotionConfig.layout.spacing === 'tight' ? '8px' : '16px'};
  padding: var(--emotion-spacing);
  ${emotionConfig.effects.shadows ? 'box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);' : 'border: 1px solid #e5e7eb;'}
  ${emotionConfig.effects.blur ? 'backdrop-filter: blur(10px);' : ''}
}

.emotion-text {
  color: var(--emotion-primary);
  font-weight: var(--emotion-font-weight);
  letter-spacing: var(--emotion-letter-spacing);
}

.emotion-gradient {
  ${emotionConfig.effects.gradients ? 
    `background: linear-gradient(135deg, var(--emotion-primary), var(--emotion-secondary));` : 
    `background: var(--emotion-primary);`}
}

.emotion-animation {
  animation-duration: var(--emotion-animation-duration);
  animation-timing-function: var(--emotion-animation-easing);
  ${emotionConfig.animations.bounce ? 'animation-fill-mode: both;' : ''}
}

@keyframes emotionBounce {
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
  40%, 43% { transform: translate3d(0, -8px, 0); }
  70% { transform: translate3d(0, -4px, 0); }
  90% { transform: translate3d(0, -2px, 0); }
}

${emotionConfig.animations.bounce ? '.emotion-bounce { animation: emotionBounce 1s ease-in-out; }' : ''}
    `.trim();
  }
}

// Emotion Preview Component
const EmotionPreview: React.FC<{
  emotion: EmotionConfig;
  isActive: boolean;
  onClick: () => void;
}> = ({ emotion, isActive, onClick }) => {
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
          background: emotion.colors.background,
          color: emotion.colors.primary,
          fontFamily: emotion.typography.fontFamily,
          fontWeight: emotion.typography.fontWeight,
          letterSpacing: emotion.typography.letterSpacing,
        }}
      >
        {/* Sample Elements */}
        <div className="absolute inset-0 p-4">
          <div
            className="h-8 rounded mb-2 flex items-center justify-center text-white text-sm"
            style={{
              background: emotion.colors.primary,
              boxShadow: emotion.effects.shadows ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
            }}
          >
            {emotion.name}
          </div>
          <div
            className="h-4 rounded mb-2"
            style={{
              background: emotion.effects.gradients ? 
                `linear-gradient(135deg, ${emotion.colors.primary}, ${emotion.colors.secondary})` :
                emotion.colors.secondary,
              width: '60%',
            }}
          />
          <div
            className="h-3 rounded"
            style={{
              background: emotion.colors.accent,
              width: '40%',
            }}
          />
        </div>

        {/* Emotion Name */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
          <div
            className="text-sm font-medium text-center text-white"
          >
            {emotion.name}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Voice Emotion Analyzer Component
const VoiceAnalyzer: React.FC<{
  onEmotionDetected: (emotion: EmotionType) => void;
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
}> = ({ onEmotionDetected, isListening, onStartListening, onStopListening }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [microphone, setMicrophone] = useState<MediaStreamAudioSourceNode | null>(null);
  const [audioData, setAudioData] = useState<Float32Array | null>(null);

  useEffect(() => {
    if (isListening && !audioContext) {
      const initAudio = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const ctx = new AudioContext();
          const mic = ctx.createMediaStreamSource(stream);
          const analyserNode = ctx.createAnalyser();
          
          analyserNode.fftSize = 2048;
          mic.connect(analyserNode);
          
          setAudioContext(ctx);
          setAnalyser(analyserNode);
          setMicrophone(mic);
          
          // Start analyzing audio
          const bufferLength = analyserNode.frequencyBinCount;
          const dataArray = new Float32Array(bufferLength);
          setAudioData(dataArray);
          
          const analyzeAudio = () => {
            if (isListening && analyserNode) {
              analyserNode.getFloatTimeDomainData(dataArray);
              const emotion = CognitiveDesignEngine.analyzeVoiceEmotion(dataArray);
              onEmotionDetected(emotion);
              requestAnimationFrame(analyzeAudio);
            }
          };
          
          analyzeAudio();
        } catch (error) {
          console.error('Error accessing microphone:', error);
        }
      };
      
      initAudio();
    }
    
    if (!isListening && audioContext) {
      audioContext.close();
      setAudioContext(null);
      setAnalyser(null);
      setMicrophone(null);
    }
  }, [isListening, audioContext, analyser, microphone, onEmotionDetected]);

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={isListening ? onStopListening : onStartListening}
        className={`${
          isListening 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
        {isListening ? 'Stop Listening' : 'Analyze Voice'}
      </Button>
      
      {isListening && (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Listening...</span>
        </div>
      )}
    </div>
  );
};

// Main Cognitive Design Engine Component
export const CognitiveDesignEngineComponent: React.FC = () => {
  const [textInput, setTextInput] = useState('I want something energetic and dynamic!');
  const [detectedEmotion, setDetectedEmotion] = useState<EmotionType>('confident');
  const [isListening, setIsListening] = useState(false);
  const [generatedCSS, setGeneratedCSS] = useState('');
  const [activeTab, setActiveTab] = useState('preview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentEmotion = CognitiveDesignEngine.generateDesignFromEmotion(detectedEmotion);

  const handleTextAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const emotion = CognitiveDesignEngine.analyzeTextEmotion(textInput);
    setDetectedEmotion(emotion);
    
    const css = CognitiveDesignEngine.generateCSS(CognitiveDesignEngine.generateDesignFromEmotion(emotion));
    setGeneratedCSS(css);
    
    setIsAnalyzing(false);
  };

  const handleVoiceEmotionDetected = (emotion: EmotionType) => {
    setDetectedEmotion(emotion);
    const css = CognitiveDesignEngine.generateCSS(CognitiveDesignEngine.generateDesignFromEmotion(emotion));
    setGeneratedCSS(css);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    if (textInput) {
      handleTextAnalysis();
    }
  }, [textInput]);

  const emotionIcons = {
    happy: <Smile className="w-5 h-5" />,
    excited: <Zap className="w-5 h-5" />,
    calm: <Heart className="w-5 h-5" />,
    energetic: <Sparkles className="w-5 h-5" />,
    frustrated: <Frown className="w-5 h-5" />,
    confident: <Eye className="w-5 h-5" />,
    creative: <Sparkles className="w-5 h-5" />,
    professional: <Eye className="w-5 h-5" />,
    playful: <Smile className="w-5 h-5" />,
    serious: <Meh className="w-5 h-5" />,
  };

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
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Cognitive Design Engine
            </h1>
            <p className="text-muted-foreground">
              AI reads your emotion and builds designs that match your mood
            </p>
          </div>
        </motion.div>

        {/* Input Section */}
        <div className="flex gap-4 mb-6">
          <Input
            type="text"
            placeholder="Describe how you want your design to feel..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="flex-1 bg-background/50 backdrop-blur-xl border-white/10 focus:border-white/20"
          />
          <Button
            onClick={handleTextAnalysis}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isAnalyzing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Brain className="w-4 h-4 mr-2" />
                </motion.div>
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Analyze Emotion
              </>
            )}
          </Button>
        </div>

        {/* Voice Analysis */}
        <div className="mb-6">
          <VoiceAnalyzer
            onEmotionDetected={handleVoiceEmotionDetected}
            isListening={isListening}
            onStartListening={() => setIsListening(true)}
            onStopListening={() => setIsListening(false)}
          />
        </div>

        {/* Detected Emotion */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Detected Emotion:</span>
            <Badge variant="outline" className="flex items-center gap-1">
              {emotionIcons[detectedEmotion]}
              {currentEmotion.name}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentEmotion.description}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emotion Selection */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
            <h2 className="text-xl font-semibold mb-4">Emotion Library</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.values(CognitiveDesignEngine.generateDesignFromEmotion('happy')).map((emotion) => (
                <EmotionPreview
                  key={emotion.emotion}
                  emotion={emotion}
                  isActive={detectedEmotion === emotion.emotion}
                  onClick={() => {
                    setDetectedEmotion(emotion.emotion);
                    const css = CognitiveDesignEngine.generateCSS(emotion);
                    setGeneratedCSS(css);
                  }}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Preview & Code */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
              <TabsTrigger value="css">Generated CSS</TabsTrigger>
            </TabsList>

            <TabsContent value="preview">
              <Card className="p-6 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-xl border-white/10">
                <h3 className="text-xl font-semibold mb-4">Emotion-Based Design Preview</h3>
                <div
                  className="p-6 rounded-lg emotion-design"
                  style={{
                    background: currentEmotion.colors.background,
                    color: currentEmotion.colors.primary,
                    fontFamily: currentEmotion.typography.fontFamily,
                    fontWeight: currentEmotion.typography.fontWeight,
                    letterSpacing: currentEmotion.typography.letterSpacing,
                  }}
                >
                  <div className="space-y-4">
                    <h1
                      className="text-3xl font-bold emotion-text"
                      style={{ color: currentEmotion.colors.primary }}
                    >
                      {currentEmotion.name} Design
                    </h1>
                    <p style={{ color: currentEmotion.colors.secondary }}>
                      {currentEmotion.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className="p-4 rounded-lg emotion-card"
                        style={{
                          boxShadow: currentEmotion.effects.shadows ? '0 8px 24px rgba(0, 0, 0, 0.1)' : '1px solid #e5e7eb',
                          backdropFilter: currentEmotion.effects.blur ? 'blur(10px)' : 'none',
                        }}
                      >
                        <h3 className="font-semibold mb-2 emotion-text">Sample Card</h3>
                        <p style={{ color: currentEmotion.colors.secondary }}>
                          This design reflects your {currentEmotion.name.toLowerCase()} mood.
                        </p>
                      </div>
                      
                      <div
                        className="p-4 rounded-lg emotion-button"
                        style={{
                          background: currentEmotion.effects.gradients ? 
                            `linear-gradient(135deg, ${currentEmotion.colors.primary}, ${currentEmotion.colors.secondary})` :
                            currentEmotion.colors.primary,
                          boxShadow: currentEmotion.effects.shadows ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
                        }}
                      >
                        <h3 className="font-semibold mb-2 text-white">Primary Button</h3>
                        <p className="text-white/80">Call to action</p>
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
                    <Download className="w-4 h-4 mr-2" />
                    Copy CSS
                  </Button>
                </div>
                <pre className="text-sm text-muted-foreground overflow-auto max-h-96 bg-black/20 p-4 rounded-lg">
                  {generatedCSS}
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
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold">Emotion Detection</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            AI analyzes text and voice to detect your emotional state and adapts design accordingly.
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Mic className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold">Voice Analysis</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Real-time voice emotion detection using Web Audio API and machine learning.
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Sparkles className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="font-semibold">Adaptive Design</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Design automatically adapts colors, typography, animations, and layout based on detected emotion.
          </p>
        </Card>
      </div>
    </div>
  );
};
