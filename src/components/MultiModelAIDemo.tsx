import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Code, 
  Search, 
  Palette, 
  Zap, 
  Sparkles,
  CheckCircle,
  Clock,
  ArrowRight,
  Copy,
  Download,
  RefreshCw
} from 'lucide-react';
import { AIAPIService } from '@/services/apiClient';

const MultiModelAIDemo: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'text' | 'code' | 'research' | 'analysis'>('text');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
        const result = await AIAPIService.generateText(prompt, selectedModel);
      setResponse(result.content);
    } catch (error) {
      console.error('Generation failed:', error);
      setResponse('Error generating response. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTrendingDesigns = async () => {
    setIsGenerating(true);
    try {
      const trends = await MultiModelPipeline.getTrendingDesigns();
      setResponse(`Current Design Trends:\n\n${trends.trends.join('\n')}\n\nSources: ${trends.sources.join(', ')}`);
    } catch (error) {
      console.error('Trends failed:', error);
      setResponse('Error fetching trends. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const modelInfo = {
    text: { name: 'Gemini Pro', description: 'Fast text generation', icon: <Brain className="w-4 h-4" />, color: 'bg-blue-500' },
    code: { name: 'Gemini Pro', description: 'Code generation', icon: <Code className="w-4 h-4" />, color: 'bg-green-500' },
    research: { name: 'Perplexity', description: 'Real-time research', icon: <Search className="w-4 h-4" />, color: 'bg-purple-500' },
    analysis: { name: 'Gemini Pro', description: 'Design analysis', icon: <Palette className="w-4 h-4" />, color: 'bg-orange-500' }
  };

  return (
    <motion.section 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              Multi-Model AI Pipeline
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Powered by Gemini Pro + Perplexity + OpenAI for the ultimate AI experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  AI Command Center
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Model Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Select AI Model:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(modelInfo).map(([key, info]) => (
                      <Button
                        key={key}
                        variant={selectedModel === key ? 'default' : 'outline'}
                        className={`h-auto p-3 flex flex-col items-center gap-2 ${
                          selectedModel === key ? info.color : 'border-gray-600'
                        }`}
                        onClick={() => setSelectedModel(key as any)}
                      >
                        {info.icon}
                        <div className="text-center">
                          <div className="text-xs font-medium">{info.name}</div>
                          <div className="text-xs opacity-80">{info.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Prompt Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Your Prompt:</label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to create, research, or analyze..."
                    className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 min-h-[100px]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={handleTrendingDesigns}
                    disabled={isGenerating}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Trends
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Model Capabilities */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">AI Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Brain className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">GPT-3.5 Turbo: Text generation, voice commands</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Code className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Gemini Pro: Fast responses, code generation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">Perplexity: Real-time research, citations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Palette className="w-4 h-4 text-orange-400" />
                    <span className="text-gray-300">Vision API: Image analysis, design extraction</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Response Section */}
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">AI Response</CardTitle>
                  {response && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(response)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        {copiedCode === response ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 p-4 rounded-lg min-h-[300px]">
                  {response ? (
                    <pre className="text-gray-300 whitespace-pre-wrap text-sm">
                      {response}
                    </pre>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Enter a prompt to see AI magic happen!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Examples */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { text: "Create a React component for a hero section", model: 'code' },
                    { text: "Research latest web design trends", model: 'research' },
                    { text: "Analyze this color scheme for accessibility", model: 'analysis' },
                    { text: "Generate marketing copy for a SaaS product", model: 'text' }
                  ].map((example, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
                      onClick={() => {
                        setPrompt(example.text);
                        setSelectedModel(example.model as any);
                      }}
                    >
                      <ArrowRight className="w-3 h-3 mr-2" />
                      {example.text}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default MultiModelAIDemo;
