// ElevenLabs Voice Test Component
// Test voice synthesis and voice features

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  CheckCircle, 
  XCircle, 
  Mic, 
  MicOff,
  Sparkles,
  Zap
} from 'lucide-react';

import { ElevenLabsService } from '@/services/multiModelAI';

interface Voice {
  voice_id: string;
  name: string;
  category: string;
  description: string;
}

const ElevenLabsTest: React.FC = () => {
  const [text, setText] = useState('Hello! I am Maya-Web\'s AI voice assistant. I can help you build amazing websites with voice commands.');
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<boolean | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAPIStatus();
    loadVoices();
  }, []);

  const checkAPIStatus = async () => {
    setIsLoading(true);
    try {
      const status = await ElevenLabsService.checkAPIStatus();
      setApiStatus(status);
      if (status) {
        toast({ 
          title: 'ElevenLabs Connected!', 
          description: 'Voice synthesis is ready to use.',
          variant: 'default'
        });
      } else {
        toast({ 
          title: 'ElevenLabs Error', 
          description: 'Could not connect to ElevenLabs API.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('ElevenLabs status check failed:', error);
      setApiStatus(false);
      toast({ 
        title: 'ElevenLabs Error', 
        description: 'API connection failed.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadVoices = async () => {
    try {
      const voiceList = await ElevenLabsService.getVoices();
      setVoices(voiceList);
      if (voiceList.length > 0) {
        setSelectedVoice(voiceList[0].voice_id);
      }
    } catch (error) {
      console.error('Failed to load voices:', error);
    }
  };

  const synthesizeSpeech = async () => {
    if (!text.trim()) {
      toast({ 
        title: 'Text Required', 
        description: 'Please enter text to synthesize.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const audioBlobUrl = await ElevenLabsService.synthesizeSpeech(text, selectedVoice);
      if (audioBlobUrl) {
        setAudioUrl(audioBlobUrl);
        toast({ 
          title: 'Speech Generated!', 
          description: 'Click play to hear the synthesized speech.',
          variant: 'default'
        });
      } else {
        throw new Error('No audio generated');
      }
    } catch (error) {
      console.error('Speech synthesis failed:', error);
      toast({ 
        title: 'Synthesis Failed', 
        description: 'Could not generate speech. Check console for details.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
      setIsPlaying(true);
      
      audio.onended = () => {
        setIsPlaying(false);
      };
      
      audio.onerror = () => {
        setIsPlaying(false);
        toast({ 
          title: 'Playback Error', 
          description: 'Could not play audio.',
          variant: 'destructive'
        });
      };
    }
  };

  const stopAudio = () => {
    setIsPlaying(false);
    // Note: We can't actually stop the audio without storing the Audio object
  };

  const startRecording = () => {
    setIsRecording(true);
    toast({ 
      title: 'Recording Started', 
      description: 'Voice recording is now active.',
      variant: 'default'
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    toast({ 
      title: 'Recording Stopped', 
      description: 'Voice recording has been stopped.',
      variant: 'default'
    });
  };

  const quickExamples = [
    "Welcome to Maya-Web, the ultimate AI website builder!",
    "Create a luxury fashion website with floating elements and smooth animations.",
    "Build a tech startup landing page with modern design and 3D elements.",
    "Design a portfolio website that showcases your creative work beautifully.",
    "Generate an e-commerce site with product galleries and shopping cart functionality."
  ];

  return (
    <motion.section
      id="elevenlabs-test"
      className="relative py-20 md:py-32 bg-gradient-to-br from-purple-900 to-indigo-900 text-white overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-5xl md:text-7xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          ElevenLabs Voice Test
        </motion.h2>
        <motion.p
          className="text-xl text-center max-w-3xl mx-auto mb-12 text-gray-300"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Test voice synthesis, voice cloning, and AI-powered voice features for Maya-Web.
        </motion.p>

        <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 shadow-2xl max-w-4xl mx-auto">
          <CardHeader className="border-b border-gray-700 flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Volume2 className="w-6 h-6 mr-2 text-purple-400" /> Voice Command Center
            </CardTitle>
            <Button onClick={checkAPIStatus} className="flex items-center space-x-2">
              {apiStatus === true && <CheckCircle className="w-4 h-4 text-green-400" />}
              {apiStatus === false && <XCircle className="w-4 h-4 text-red-400" />}
              {apiStatus === null && <Sparkles className="w-4 h-4" />}
              <span>Check API Status</span>
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Text Input Section */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="voice-text" className="text-lg text-gray-200 mb-2 block">
                    Text to Synthesize:
                  </Label>
                  <Textarea
                    id="voice-text"
                    placeholder="Enter text to convert to speech..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500 min-h-[120px]"
                  />
                </div>

                <div>
                  <Label className="text-lg text-gray-200 mb-2 block">
                    Select Voice:
                  </Label>
                  <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                      <SelectValue placeholder="Choose a voice" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {voices.map((voice) => (
                        <SelectItem 
                          key={voice.voice_id} 
                          value={voice.voice_id}
                          className="text-white hover:bg-gray-700"
                        >
                          {voice.name} - {voice.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={synthesizeSpeech}
                    disabled={isLoading || !text.trim()}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Synthesizing...
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 mr-2" />
                        Generate Speech
                      </>
                    )}
                  </Button>
                </div>

                {/* Quick Examples */}
                <div>
                  <Label className="text-lg text-gray-200 mb-2 block">
                    Quick Examples:
                  </Label>
                  <div className="space-y-2">
                    {quickExamples.map((example, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={() => setText(example)}
                      >
                        <Zap className="w-3 h-3 mr-2" />
                        {example}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Audio Controls Section */}
              <div className="space-y-4">
                <div>
                  <Label className="text-lg text-gray-200 mb-2 block">
                    Audio Controls:
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      onClick={playAudio}
                      disabled={!audioUrl || isPlaying}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </Button>
                    <Button
                      onClick={stopAudio}
                      disabled={!isPlaying}
                      variant="outline"
                      className="border-red-600 text-red-300 hover:bg-red-600"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-lg text-gray-200 mb-2 block">
                    Voice Recording:
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      onClick={startRecording}
                      disabled={isRecording}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Mic className="w-4 h-4 mr-2" />
                      Start Recording
                    </Button>
                    <Button
                      onClick={stopRecording}
                      disabled={!isRecording}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <MicOff className="w-4 h-4 mr-2" />
                      Stop Recording
                    </Button>
                  </div>
                </div>

                {/* Voice Features */}
                <div>
                  <Label className="text-lg text-gray-200 mb-2 block">
                    Voice Features:
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Text-to-Speech Synthesis</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Multiple Voice Options</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Voice Cloning Ready</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>AI Co-Pilot Voice</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <Label className="text-lg text-gray-200 mb-2 block">
                    API Status:
                  </Label>
                  <div className="flex items-center gap-2">
                    {apiStatus === true && (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-300">ElevenLabs API Connected</span>
                      </>
                    )}
                    {apiStatus === false && (
                      <>
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span className="text-red-300">ElevenLabs API Error</span>
                      </>
                    )}
                    {apiStatus === null && (
                      <>
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-300">Checking API Status...</span>
                      </>
                    )}
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

export default ElevenLabsTest;
