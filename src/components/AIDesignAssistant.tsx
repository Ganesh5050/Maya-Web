import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bot, 
  Sparkles, 
  Wand2, 
  Palette, 
  Type, 
  Layout, 
  Image,
  Zap,
  Lightbulb,
  RefreshCw,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Send,
  Mic,
  MicOff,
  Loader2,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

// Mock AI suggestions
const generateAISuggestions = (context: string) => {
  const suggestions = [
    {
      id: '1',
      type: 'color',
      title: 'Enhance Color Scheme',
      description: 'Add a gradient background with holographic effects to make the hero section more engaging',
      action: 'Apply gradient background with primary colors',
      confidence: 95,
      icon: Palette
    },
    {
      id: '2',
      type: 'animation',
      title: 'Add 3D Animations',
      description: 'Implement floating particles and magnetic cursor effects for better user interaction',
      action: 'Enable particle system and magnetic interactions',
      confidence: 88,
      icon: Zap
    },
    {
      id: '3',
      type: 'layout',
      title: 'Optimize Layout',
      description: 'Rearrange sections for better flow and add more whitespace between elements',
      action: 'Reorganize sections and adjust spacing',
      confidence: 82,
      icon: Layout
    },
    {
      id: '4',
      type: 'content',
      title: 'Improve Typography',
      description: 'Use larger, bolder fonts for headings and add subtle text animations',
      action: 'Update font sizes and add text animations',
      confidence: 90,
      icon: Type
    }
  ];
  
  return suggestions;
};

const AIDesignAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      id: '1',
      type: 'ai',
      message: 'Hi! I\'m your AI design assistant. I can help you improve your website with suggestions for colors, animations, layouts, and more. What would you like to work on?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Mock voice recognition
    if (!isListening) {
      setTimeout(() => {
        setUserInput('Make the hero section more engaging with 3D effects');
        setIsListening(false);
      }, 3000);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: userInput,
      timestamp: new Date().toISOString()
    };
    
    setChatHistory([...chatHistory, userMessage]);
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const suggestions = generateAISuggestions(userInput);
      setAiSuggestions(suggestions);
      
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: `I've analyzed your request and found ${suggestions.length} suggestions to improve your website. Here are my recommendations:`,
        timestamp: new Date().toISOString(),
        suggestions: suggestions
      };
      
      setChatHistory([...chatHistory, userMessage, aiResponse]);
      setIsGenerating(false);
      setUserInput('');
    }, 2000);
  };

  const handleApplySuggestion = (suggestion: any) => {
    // Mock applying suggestion
    console.log('Applying suggestion:', suggestion);
    // In real implementation, this would modify the website
  };

  const handleFeedback = (suggestionId: string, isPositive: boolean) => {
    console.log('Feedback:', suggestionId, isPositive);
    // In real implementation, this would train the AI
  };

  return (
    <div className="h-screen flex bg-background">
      {/* AI Assistant Panel */}
      <div className="w-96 glass border-r border-glass-border flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-glass-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold">AI Design Assistant</h2>
              <p className="text-sm text-muted-foreground">Powered by Maya-Web AI</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-green-400">Online & Ready</span>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] glass rounded-2xl p-4 ${
                  message.type === 'user' 
                    ? 'bg-primary/20 border-primary/30' 
                    : 'bg-muted/20'
                }`}>
                  <p className="text-sm">{message.message}</p>
                  
                  {/* AI Suggestions */}
                  {message.suggestions && (
                    <div className="mt-4 space-y-2">
                      {message.suggestions.map((suggestion: any) => (
                        <div key={suggestion.id} className="glass rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <suggestion.icon className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">{suggestion.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {suggestion.confidence}% confidence
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {suggestion.description}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="hero"
                              onClick={() => handleApplySuggestion(suggestion)}
                              className="text-xs"
                            >
                              Apply
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeedback(suggestion.id, true)}
                              className="text-xs h-6 w-6 p-0"
                            >
                              <ThumbsUp className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeedback(suggestion.id, false)}
                              className="text-xs h-6 w-6 p-0"
                            >
                              <ThumbsDown className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {/* Loading Indicator */}
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-glass-border">
            <div className="space-y-3">
              {/* Voice Input Button */}
              <div className="flex justify-center">
                <Button
                  variant={isListening ? "hero" : "ghost"}
                  size="sm"
                  onClick={handleVoiceInput}
                  className="group"
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-4 h-4 mr-2" />
                      Listening...
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 mr-2" />
                      Voice Input
                    </>
                  )}
                </Button>
              </div>

              {/* Text Input */}
              <div className="flex gap-2">
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Describe what you'd like to improve..."
                  className="flex-1 glass resize-none"
                  rows={2}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!userInput.trim() || isGenerating}
                  variant="hero"
                  size="sm"
                  className="self-end"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="glass border-b border-glass-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Website Editor</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-sm text-muted-foreground">AI Assistant Active</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Analyze Page
            </Button>
            <Button variant="hero" size="sm">
              <Wand2 className="w-4 h-4 mr-2" />
              Auto-Improve
            </Button>
          </div>
        </div>

        {/* Website Preview */}
        <div className="flex-1 bg-muted/10 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Website Preview</h3>
            <p className="text-muted-foreground mb-6">
              Your website will appear here with AI suggestions applied in real-time
            </p>
            
            {/* Mock Website Sections */}
            <div className="max-w-2xl mx-auto space-y-4">
              {[
                { name: 'Hero Section', color: 'from-blue-500 to-purple-500', suggestions: 2 },
                { name: 'About Section', color: 'from-green-500 to-teal-500', suggestions: 1 },
                { name: 'Features Section', color: 'from-orange-500 to-red-500', suggestions: 3 },
                { name: 'Contact Section', color: 'from-purple-500 to-pink-500', suggestions: 1 }
              ].map((section, index) => (
                <motion.div
                  key={section.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-2xl p-6 hover:shadow-glow-soft transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                        <Layout className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{section.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {section.suggestions} AI suggestions available
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Lightbulb className="w-4 h-4 mr-2" />
                        View Suggestions
                      </Button>
                      <Button variant="hero" size="sm">
                        <Zap className="w-4 h-4 mr-2" />
                        Apply All
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestions Sidebar */}
      <AnimatePresence>
        {aiSuggestions.length > 0 && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="w-80 glass border-l border-glass-border p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">AI Suggestions</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAiSuggestions([])}
              >
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-2xl p-4 hover:shadow-glow-soft transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <suggestion.icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{suggestion.title}</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-xs text-muted-foreground">
                          {suggestion.confidence}% confidence
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {suggestion.description}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="hero"
                      onClick={() => handleApplySuggestion(suggestion)}
                      className="flex-1"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Apply
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleFeedback(suggestion.id, true)}
                      className="h-8 w-8 p-0"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleFeedback(suggestion.id, false)}
                      className="h-8 w-8 p-0"
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Apply All Suggestions
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIDesignAssistant;
