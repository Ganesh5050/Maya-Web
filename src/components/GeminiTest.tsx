import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Code, 
  Sparkles,
  CheckCircle,
  Clock,
  Copy,
  RefreshCw,
  Zap
} from 'lucide-react';
import { GeminiService } from '@/services/multiModelAI';

const GeminiTest: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [testType, setTestType] = useState<'text' | 'code' | 'analysis'>('text');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      let result: string;
      
      switch (testType) {
        case 'code':
          result = await GeminiService.generateCode(prompt);
          break;
        case 'analysis':
          result = await GeminiService.analyzeDesign(prompt);
          break;
        default:
          result = await GeminiService.generateText(prompt);
      }
      
      setResponse(result);
    } catch (error) {
      console.error('Gemini generation failed:', error);
      setResponse('Error generating response. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const quickTests = [
    { text: "Create a React component for a hero section", type: 'code' as const },
    { text: "Analyze this color scheme for accessibility", type: 'analysis' as const },
    { text: "Generate marketing copy for a SaaS product", type: 'text' as const },
    { text: "Write a TypeScript interface for a user profile", type: 'code' as const },
    { text: "Suggest improvements for a landing page design", type: 'analysis' as const }
  ];

  return (
    <motion.section 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12"
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
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              Gemini Pro Integration Test
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Testing your Gemini Pro API key with real AI responses
          </p>
          <Badge className="bg-green-600 text-white px-4 py-2">
            <CheckCircle className="w-4 h-4 mr-2" />
            API Key Connected
          </Badge>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Gemini Pro Test Center
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Test Type Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Test Type:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'text', label: 'Text', icon: <Brain className="w-4 h-4" /> },
                      { key: 'code', label: 'Code', icon: <Code className="w-4 h-4" /> },
                      { key: 'analysis', label: 'Analysis', icon: <Sparkles className="w-4 h-4" /> }
                    ].map(({ key, label, icon }) => (
                      <Button
                        key={key}
                        variant={testType === key ? 'default' : 'outline'}
                        className={`h-auto p-3 flex flex-col items-center gap-2 ${
                          testType === key ? 'bg-blue-600' : 'border-gray-600'
                        }`}
                        onClick={() => setTestType(key as any)}
                      >
                        {icon}
                        <span className="text-xs">{label}</span>
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
                    placeholder="Enter your prompt to test Gemini Pro..."
                    className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 min-h-[100px]"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating with Gemini Pro...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Test Gemini Pro
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
                      onClick={() => {
                        setPrompt(test.text);
                        setTestType(test.type);
                      }}
                    >
                      <Sparkles className="w-3 h-3 mr-2" />
                      {test.text}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Response Section */}
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Gemini Pro Response</CardTitle>
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
                      <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Enter a prompt to test Gemini Pro!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* API Status */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">API Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Gemini Pro</span>
                    <Badge className="bg-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">API Key</span>
                    <Badge className="bg-blue-600">
                      AIzaSy...GOBo
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Model</span>
                    <Badge className="bg-purple-600">
                      gemini-pro
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Status</span>
                    <Badge className="bg-green-600">
                      <Clock className="w-3 h-3 mr-1" />
                      Ready
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default GeminiTest;
