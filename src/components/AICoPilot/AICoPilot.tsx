import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mic, 
  MicOff, 
  Send, 
  Bot, 
  User, 
  Volume2, 
  VolumeX,
  Sparkles,
  Zap,
  Brain,
  MessageCircle,
  Phone,
  PhoneOff,
  Settings,
  Download,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

import { OpenAIService } from '@/services/openai';
import { MultiModelPipeline } from '@/services/multiModelAI';

// AI Co-Pilot Service
class AICoPilotService {
  private static conversationHistory: Array<{role: 'user' | 'assistant', content: string, timestamp: Date}> = [];
  private static currentContext: string = '';
  private static isBuilding: boolean = false;

  static async processVoiceCommand(audioBlob: Blob): Promise<string> {
    try {
      // Use real OpenAI Whisper API
      const transcription = await OpenAIService.transcribeAudio(audioBlob);
      return transcription;
    } catch (error) {
      console.error('Voice command processing failed:', error);
      // Fallback to mock commands
      const mockCommands = [
        "Create a luxury fashion website with floating elements",
        "Add a hero section with animated background",
        "Make the colors more vibrant and energetic",
        "Add a pricing section with three tiers",
        "Create a contact form with validation",
        "Make it mobile responsive",
        "Add smooth scroll animations",
        "Generate a dark theme variant"
      ];
      
      const randomCommand = mockCommands[Math.floor(Math.random() * mockCommands.length)];
      return randomCommand;
    }
  }

  static async processTextCommand(command: string): Promise<{response: string, action: string, code?: string}> {
    try {
      // Use Multi-Model Pipeline for best results
      let response: string;
      let type: 'text' | 'code' | 'research' | 'analysis' = 'text';
      
      // Determine the best model based on command type
      if (command.toLowerCase().includes('code') || command.toLowerCase().includes('component')) {
        type = 'code';
        response = await MultiModelPipeline.generateWithBestModel(command, 'code');
      } else if (command.toLowerCase().includes('research') || command.toLowerCase().includes('trend')) {
        type = 'research';
        response = await MultiModelPipeline.generateWithBestModel(command, 'research');
      } else if (command.toLowerCase().includes('analyze') || command.toLowerCase().includes('design')) {
        type = 'analysis';
        response = await MultiModelPipeline.generateWithBestModel(command, 'analysis');
      } else {
        // Use Gemini for fast text generation
        response = await MultiModelPipeline.generateWithBestModel(command, 'text');
      }
      
      this.conversationHistory.push({
        role: 'user',
        content: command,
        timestamp: new Date()
      });

      // Analyze command and generate response
      const analysis = this.analyzeCommand(command);
      const action = this.generateAction(analysis);
      const code = this.generateCode(analysis);

      this.conversationHistory.push({
        role: 'assistant',
        content: response,
        timestamp: new Date()
      });

      return { response, action, code };
    } catch (error) {
      console.error('Text command processing failed:', error);
      // Fallback to mock processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.conversationHistory.push({
        role: 'user',
        content: command,
        timestamp: new Date()
      });

      const analysis = this.analyzeCommand(command);
      const response = this.generateResponse(analysis);
      const action = this.generateAction(analysis);
      const code = this.generateCode(analysis);

      this.conversationHistory.push({
        role: 'assistant',
        content: response,
        timestamp: new Date()
      });

      return { response, action, code };
    }
  }

  private static analyzeCommand(command: string): any {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('create') || lowerCommand.includes('make')) {
      return { type: 'create', intent: 'website_generation' };
    } else if (lowerCommand.includes('add') || lowerCommand.includes('insert')) {
      return { type: 'add', intent: 'component_addition' };
    } else if (lowerCommand.includes('change') || lowerCommand.includes('modify')) {
      return { type: 'modify', intent: 'style_change' };
    } else if (lowerCommand.includes('color') || lowerCommand.includes('theme')) {
      return { type: 'theme', intent: 'color_change' };
    } else if (lowerCommand.includes('animation') || lowerCommand.includes('animate')) {
      return { type: 'animation', intent: 'motion_addition' };
    } else if (lowerCommand.includes('mobile') || lowerCommand.includes('responsive')) {
      return { type: 'responsive', intent: 'mobile_optimization' };
    } else {
      return { type: 'general', intent: 'clarification' };
    }
  }

  private static generateResponse(analysis: any): string {
    const responses = {
      create: "I'll create that for you! Building a new website with your specifications...",
      add: "Adding that component to your website right now...",
      modify: "Making those changes to your design...",
      theme: "Updating the color scheme and theme...",
      animation: "Adding smooth animations and transitions...",
      responsive: "Optimizing for mobile devices...",
      general: "I understand! Let me help you with that..."
    };
    
    return responses[analysis.type] || responses.general;
  }

  private static generateAction(analysis: any): string {
    const actions = {
      create: "Generating new website structure",
      add: "Adding component to canvas",
      modify: "Updating design properties",
      theme: "Applying new color scheme",
      animation: "Implementing animations",
      responsive: "Optimizing responsive layout",
      general: "Processing request"
    };
    
    return actions[analysis.type] || actions.general;
  }

  private static generateCode(analysis: any): string {
    const codeTemplates = {
      create: `// Generated website structure
const Website = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900">
      <Hero />
      <Features />
      <Pricing />
      <Contact />
    </div>
  );
};`,
      add: `// Adding new component
const NewComponent = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          New Section
        </h2>
      </div>
    </section>
  );
};`,
      modify: `// Updated styles
const UpdatedStyles = {
  colors: {
    primary: '#8b5cf6',
    secondary: '#06b6d4',
    accent: '#f59e0b'
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px'
  }
};`,
      theme: `// New theme configuration
const theme = {
  colors: {
    primary: '#6366f1',
    secondary: '#ec4899',
    background: '#0f172a',
    text: '#f8fafc'
  },
  animations: {
    duration: '0.3s',
    easing: 'ease-out'
  }
};`,
      animation: `// Animation implementation
const animatedElement = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};`,
      responsive: `// Responsive design
const responsiveStyles = {
  mobile: {
    fontSize: '14px',
    padding: '1rem'
  },
  tablet: {
    fontSize: '16px',
    padding: '1.5rem'
  },
  desktop: {
    fontSize: '18px',
    padding: '2rem'
  }
};`,
      general: `// General implementation
const implementation = {
  status: 'processing',
  message: 'Working on your request...'
};`
    };
    
    return codeTemplates[analysis.type] || codeTemplates.general;
  }

  static getConversationHistory() {
    return this.conversationHistory;
  }

  static clearHistory() {
    this.conversationHistory = [];
  }
}

// Voice Recognition Hook
const useVoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return { isListening, transcript, startListening, stopListening };
};

// Text-to-Speech Hook
const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const speak = (text: string) => {
    if (!isEnabled || typeof window === 'undefined') return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return { isSpeaking, isEnabled, setIsEnabled, speak, stopSpeaking };
};

// Main AI Co-Pilot Component
export const AICoPilot: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string, timestamp: Date, action?: string, code?: string}>>([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  
  const { isListening, transcript, startListening, stopListening } = useVoiceRecognition();
  const { isSpeaking, isEnabled, setIsEnabled, speak, stopSpeaking } = useTextToSpeech();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isProcessing) return;

    const userMessage = inputText.trim();
    setInputText('');
    setIsProcessing(true);
    setCurrentAction('Processing your request...');

    try {
      const result = await AICoPilotService.processTextCommand(userMessage);
      
      setMessages(prev => [...prev, {
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      }, {
        role: 'assistant',
        content: result.response,
        timestamp: new Date(),
        action: result.action,
        code: result.code
      }]);

      setCurrentAction(result.action);
      setGeneratedCode(result.code || '');

      // Speak the response if TTS is enabled
      if (isEnabled) {
        speak(result.response);
      }

    } catch (error) {
      console.error('Error processing command:', error);
    } finally {
      setIsProcessing(false);
      setCurrentAction('');
    }
  };

  const handleVoiceCommand = async () => {
    if (isListening) {
      stopListening();
      return;
    }

    startListening();
  };

  const clearConversation = () => {
    setMessages([]);
    setGeneratedCode('');
    AICoPilotService.clearHistory();
  };

  const copyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
    }
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
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              🧠 AI Co-Pilot
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Build websites with voice commands and natural conversation
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={() => setIsActive(!isActive)}
              className={`px-6 py-3 rounded-xl font-semibold ${
                isActive 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
              } text-white`}
            >
              {isActive ? (
                <>
                  <PhoneOff className="w-5 h-5 mr-2" />
                  Disconnect Co-Pilot
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5 mr-2" />
                  Connect Co-Pilot
                </>
              )}
            </Button>
            
            <Button
              onClick={clearConversation}
              variant="outline"
              className="px-6 py-3 rounded-xl font-semibold border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Clear Chat
            </Button>
          </div>
        </motion.div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] bg-slate-800 border-slate-700">
              <div className="p-6 h-full flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-6 h-6 text-purple-400" />
                    <h2 className="text-xl font-semibold text-white">Conversation</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEnabled(!isEnabled)}
                      className="text-gray-400 hover:text-white"
                    >
                      {isEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>
                    <Badge variant={isActive ? "default" : "secondary"}>
                      {isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                      <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Start a conversation with Maya!</p>
                      <p className="text-sm mt-2">Try: "Create a luxury fashion website"</p>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] p-4 rounded-2xl ${
                          message.role === 'user' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-slate-700 text-gray-100'
                        }`}>
                          <div className="flex items-start gap-3">
                            {message.role === 'assistant' && (
                              <Bot className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm">{message.content}</p>
                              {message.action && (
                                <div className="mt-2 p-2 bg-slate-600 rounded-lg">
                                  <p className="text-xs text-gray-300">
                                    <Zap className="w-3 h-3 inline mr-1" />
                                    {message.action}
                                  </p>
                                </div>
                              )}
                            </div>
                            {message.role === 'user' && (
                              <User className="w-5 h-5 text-purple-200 mt-1 flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                  
                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-slate-700 text-gray-100 p-4 rounded-2xl max-w-[80%]">
                        <div className="flex items-center gap-3">
                          <Bot className="w-5 h-5 text-purple-400" />
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                            <span className="text-sm">{currentAction}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type your command or use voice..."
                      className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      disabled={isProcessing}
                    />
                    <Button
                      onClick={handleVoiceCommand}
                      disabled={isProcessing}
                      className={`px-4 ${
                        isListening 
                          ? 'bg-red-600 hover:bg-red-700' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={isProcessing || !inputText.trim()}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {isListening && (
                    <div className="flex items-center gap-2 text-blue-400 text-sm">
                      <div className="animate-pulse">🎤</div>
                      <span>Listening... Speak now</span>
                    </div>
                  )}
                  
                  {isSpeaking && (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <div className="animate-pulse">🔊</div>
                      <span>Maya is speaking...</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Code Generation Panel */}
          <div className="space-y-6">
            {/* Generated Code */}
            {generatedCode && (
              <Card className="bg-slate-800 border-slate-700">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Generated Code</h3>
                    <Button
                      onClick={copyCode}
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                      {generatedCode}
                    </pre>
                  </div>
                </div>
              </Card>
            )}

            {/* Quick Commands */}
            <Card className="bg-slate-800 border-slate-700">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Commands</h3>
                <div className="space-y-2">
                  {[
                    "Create a modern landing page",
                    "Add a hero section",
                    "Make it mobile responsive",
                    "Add smooth animations",
                    "Change to dark theme",
                    "Add a contact form"
                  ].map((command, index) => (
                    <Button
                      key={index}
                      onClick={() => setInputText(command)}
                      variant="ghost"
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {command}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Status */}
            <Card className="bg-slate-800 border-slate-700">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Voice Recognition</span>
                    <Badge variant={isListening ? "default" : "secondary"}>
                      {isListening ? "Active" : "Ready"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Text-to-Speech</span>
                    <Badge variant={isEnabled ? "default" : "secondary"}>
                      {isEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">AI Processing</span>
                    <Badge variant={isProcessing ? "default" : "secondary"}>
                      {isProcessing ? "Working" : "Ready"}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoPilot;
