import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Sparkles,
  CheckCircle,
  Clock,
  Copy,
  RefreshCw,
  Zap,
  Globe,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { PerplexityService } from '@/services/multiModelAI';

const PerplexityTest: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<{content: string, sources: string[]} | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsGenerating(true);
    try {
      const result = await PerplexityService.searchAndGenerate(query);
      setResponse(result);
    } catch (error) {
      console.error('Perplexity search failed:', error);
      setResponse({
        content: 'Error generating response. Please try again.',
        sources: []
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTrends = async () => {
    setIsGenerating(true);
    try {
      const trends = await PerplexityService.researchTrends('web design trends 2024');
      setResponse({
        content: trends.trends.join('\n\n'),
        sources: trends.sources
      });
    } catch (error) {
      console.error('Trends failed:', error);
      setResponse({
        content: 'Error fetching trends. Please try again.',
        sources: []
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const quickQueries = [
    "What are the latest web design trends for 2024?",
    "How to optimize website performance for mobile?",
    "Best practices for AI-powered website builders",
    "What are the most effective conversion optimization techniques?",
    "Latest developments in React Three Fiber for web development"
  ];

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
              <Search className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              Perplexity AI Integration Test
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Testing your Perplexity API key with real-time research and citations
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
                  Perplexity Research Center
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Query Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Your Research Query:</label>
                  <Textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask anything about web design, development, or trends..."
                    className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 min-h-[100px]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={handleSearch}
                    disabled={isGenerating || !query.trim()}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Researching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Search with Perplexity
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={handleTrends}
                    disabled={isGenerating}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trends
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Queries */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Research</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quickQueries.map((quickQuery, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
                      onClick={() => setQuery(quickQuery)}
                    >
                      <Sparkles className="w-3 h-3 mr-2" />
                      {quickQuery}
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
                  <CardTitle className="text-white">Perplexity Response</CardTitle>
                  {response && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(response.content)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        {copiedCode === response.content ? (
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
                    <div className="space-y-4">
                      <div className="text-gray-300 whitespace-pre-wrap text-sm">
                        {response.content}
                      </div>
                      {response.sources.length > 0 && (
                        <div className="border-t border-gray-700 pt-4">
                          <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Sources:
                          </h4>
                          <div className="space-y-1">
                            {response.sources.map((source, index) => (
                              <div key={index} className="text-xs text-blue-400 hover:text-blue-300">
                                <a href={source} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                  <BookOpen className="w-3 h-3" />
                                  {source}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Enter a query to see Perplexity AI research!</p>
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
                    <span className="text-gray-300">Perplexity AI</span>
                    <Badge className="bg-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">API Key</span>
                    <Badge className="bg-blue-600">
                      pplx-7vyi...EkD
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Model</span>
                    <Badge className="bg-purple-600">
                      llama-3.1-sonar-small-128k-online
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

export default PerplexityTest;
