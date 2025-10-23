import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Code, 
  Search,
  CheckCircle,
  Clock,
  Copy,
  Zap,
  Sparkles
} from 'lucide-react';
import { OpenAIService } from '@/services/openai';
import { GeminiService, PerplexityService } from '@/services/multiModelAI';

const AITestPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState<{
    openai: string;
    gemini: string;
    perplexity: string;
  }>({
    openai: '',
    gemini: '',
    perplexity: ''
  });
  const [isGenerating, setIsGenerating] = useState<{
    openai: boolean;
    gemini: boolean;
    perplexity: boolean;
  }>({
    openai: false,
    gemini: false,
    perplexity: false
  });

  const testAllAPIs = async () => {
    if (!prompt.trim()) return;

    // Test OpenAI
    setIsGenerating(prev => ({ ...prev, openai: true }));
    try {
      const openaiResponse = await OpenAIService.generateText(prompt);
      setResponses(prev => ({ ...prev, openai: openaiResponse }));
    } catch (error) {
      setResponses(prev => ({ ...prev, openai: 'Error: ' + error }));
    } finally {
      setIsGenerating(prev => ({ ...prev, openai: false }));
    }

    // Test Gemini
    setIsGenerating(prev => ({ ...prev, gemini: true }));
    try {
      const geminiResponse = await GeminiService.generateText(prompt);
      setResponses(prev => ({ ...prev, gemini: geminiResponse }));
    } catch (error) {
      setResponses(prev => ({ ...prev, gemini: 'Error: ' + error }));
    } finally {
      setIsGenerating(prev => ({ ...prev, gemini: false }));
    }

    // Test Perplexity
    setIsGenerating(prev => ({ ...prev, perplexity: true }));
    try {
      const perplexityResponse = await PerplexityService.searchAndGenerate(prompt);
      setResponses(prev => ({ 
        ...prev, 
        perplexity: perplexityResponse.content + '\n\nSources: ' + perplexityResponse.sources.join(', ')
      }));
    } catch (error) {
      setResponses(prev => ({ ...prev, perplexity: 'Error: ' + error }));
    } finally {
      setIsGenerating(prev => ({ ...prev, perplexity: false }));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const quickTests = [
    "Create a React component for a modern hero section",
    "Write a TypeScript interface for a user profile",
    "Generate marketing copy for a SaaS product",
    "Explain the benefits of using Tailwind CSS",
    "Create a simple landing page design concept"
  ];

  return (
    <motion.section 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-12"
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
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              AI Integration Test Center
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Test all your AI APIs: OpenAI, Gemini Pro, and Perplexity
          </p>
          <div className="flex justify-center gap-2">
            <Badge className="bg-green-600 text-white px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              OpenAI Connected
            </Badge>
            <Badge className="bg-green-600 text-white px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              Gemini Connected
            </Badge>
            <Badge className="bg-green-600 text-white px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              Perplexity Connected
            </Badge>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  AI Test Center
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Prompt Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Your Prompt:</label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt to test all AI services..."
                    className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 min-h-[120px]"
                  />
                </div>

                {/* Test All Button */}
                <Button
                  onClick={testAllAPIs}
                  disabled={Object.values(isGenerating).some(Boolean) || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {Object.values(isGenerating).some(Boolean) ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Testing AI Services...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Test All AI Services
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Tests */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quickTests.map((test, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
                      onClick={() => setPrompt(test)}
                    >
                      <Sparkles className="w-3 h-3 mr-2" />
                      {test}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Response Section */}
          <div className="space-y-6">
            {/* OpenAI Response */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    OpenAI GPT-3.5
                  </CardTitle>
                  {responses.openai && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(responses.openai)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 p-4 rounded-lg min-h-[200px]">
                  {isGenerating.openai ? (
                    <div className="flex items-center justify-center text-gray-400">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-2"></div>
                      Generating with OpenAI...
                    </div>
                  ) : responses.openai ? (
                    <pre className="text-gray-300 whitespace-pre-wrap text-sm">
                      {responses.openai}
                    </pre>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>OpenAI response will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Gemini Response */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Gemini Pro
                  </CardTitle>
                  {responses.gemini && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(responses.gemini)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 p-4 rounded-lg min-h-[200px]">
                  {isGenerating.gemini ? (
                    <div className="flex items-center justify-center text-gray-400">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mr-2"></div>
                      Generating with Gemini...
                    </div>
                  ) : responses.gemini ? (
                    <pre className="text-gray-300 whitespace-pre-wrap text-sm">
                      {responses.gemini}
                    </pre>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>Gemini response will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Perplexity Response */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Perplexity AI
                  </CardTitle>
                  {responses.perplexity && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(responses.perplexity)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 p-4 rounded-lg min-h-[200px]">
                  {isGenerating.perplexity ? (
                    <div className="flex items-center justify-center text-gray-400">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mr-2"></div>
                      Researching with Perplexity...
                    </div>
                  ) : responses.perplexity ? (
                    <pre className="text-gray-300 whitespace-pre-wrap text-sm">
                      {responses.perplexity}
                    </pre>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>Perplexity response will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AITestPage;
