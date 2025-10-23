import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { websiteStorage, GeneratedWebsite } from '@/services/websiteStorage';
import { dynamicGenerator } from '@/services/dynamicWebsiteGenerator';
import { 
  Send, 
  Sparkles, 
  Code,
  Eye,
  Loader2,
  ArrowLeft,
  ExternalLink,
  Download,
  RefreshCw
} from 'lucide-react';

export default function ModernWebsiteBuilder() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWebsite, setGeneratedWebsite] = useState<GeneratedWebsite | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { role: 'user', content: prompt }]);
    setIsGenerating(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate website
    const analysis = analyzePrompt(prompt);
    const colors = dynamicGenerator.generateColorScheme(analysis.type, prompt);
    const title = dynamicGenerator.generateTitleVariations(extractTitle(prompt), analysis.type);
    const description = dynamicGenerator.generateSmartDescription(title, analysis.type, prompt);
    const features = dynamicGenerator.generateSmartFeatures(prompt, analysis.type);
    const sections = dynamicGenerator.generateSmartSections(prompt, analysis.type);

    const website: GeneratedWebsite = {
      id: '',
      slug: '',
      type: analysis.type,
      prompt: prompt,
      title: title,
      description: description,
      primaryColor: colors.primary,
      secondaryColor: colors.secondary,
      features: features,
      sections: sections,
      components: [],
      techStack: { framework: 'React', styling: 'Tailwind CSS', backend: 'Node.js' },
      files: {},
      createdAt: new Date().toISOString()
    };

    const slug = websiteStorage.saveWebsite(website);
    website.slug = slug;
    website.id = slug;

    setGeneratedWebsite(website);
    
    // Add assistant response
    setChatHistory(prev => [...prev, { 
      role: 'assistant', 
      content: `I've created a ${analysis.type} website called "${title}". The site includes ${features.length} features and ${sections.length} sections. You can view it in the preview panel or open it in a new tab.` 
    }]);
    
    setIsGenerating(false);
    setPrompt('');
  };

  const analyzePrompt = (prompt: string) => {
    const lowerPrompt = prompt.toLowerCase();
    const types = {
      ecommerce: ['shop', 'store', 'ecommerce', 'buy', 'sell', 'product'],
      portfolio: ['portfolio', 'personal', 'about me', 'resume'],
      blog: ['blog', 'article', 'news', 'post'],
      landing: ['landing', 'marketing', 'campaign'],
      business: ['business', 'corporate', 'company'],
      saas: ['saas', 'app', 'dashboard', 'platform'],
      agency: ['agency', 'creative', 'design']
    };

    let detectedType = 'landing';
    let maxMatches = 0;
    
    Object.entries(types).forEach(([type, keywords]) => {
      const matches = keywords.filter(keyword => lowerPrompt.includes(keyword)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        detectedType = type;
      }
    });

    return {
      type: detectedType,
      techStack: { framework: 'React', styling: 'Tailwind CSS', backend: 'Node.js' }
    };
  };

  const extractTitle = (prompt: string) => {
    let cleanPrompt = prompt
      .replace(/^(create|build|make|design|develop)\s+(a|an)?\s*/i, '')
      .replace(/\s+(website|site|page|platform|app)\s+(for|about)?\s*/i, ' ')
      .trim();
    
    const forMatch = cleanPrompt.match(/for\s+(.+)/i);
    if (forMatch) {
      cleanPrompt = forMatch[1];
    }
    
    const words = cleanPrompt.split(' ');
    const titleWords = words
      .filter(word => word.length > 0)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .slice(0, 4);
    
    return titleWords.join(' ') || 'My Awesome Website';
  };

  return (
    <div className="h-screen w-screen bg-[#1a1a1a] flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="h-14 bg-[#0a0a0a] border-b border-gray-800 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="h-6 w-px bg-gray-700"></div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="text-white font-semibold">Maya-Web AI Builder</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {generatedWebsite && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCode(!showCode)}
                className="text-gray-400 hover:text-white"
              >
                {showCode ? <Eye className="w-4 h-4 mr-2" /> : <Code className="w-4 h-4 mr-2" />}
                {showCode ? 'Preview' : 'Code'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(`/site/${generatedWebsite.slug}`, '_blank')}
                className="text-gray-400 hover:text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Main Content - Split Screen */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Chat */}
        <div className="w-2/5 bg-[#0a0a0a] border-r border-gray-800 flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-2">Describe your website</h2>
            <p className="text-gray-400 text-sm">Tell me what you want to build, and I'll create it for you.</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {chatHistory.map((message, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-[#1a1a1a] text-gray-200 border border-gray-800'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-[#1a1a1a] text-gray-200 border border-gray-800 rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                    <span className="text-sm">Generating your website...</span>
                  </div>
                </div>
              </motion.div>
            )}

            {chatHistory.length === 0 && !isGenerating && (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4 opacity-50" />
                <p className="text-gray-500 text-sm mb-6">
                  Start by describing the website you want to create
                </p>
                <div className="space-y-2">
                  {[
                    'Create an ecommerce store for Nike shoes',
                    'Build a portfolio for a photographer',
                    'Make a landing page for a SaaS product'
                  ].map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPrompt(example)}
                      className="block w-full text-left px-4 py-3 bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800 rounded-lg text-sm text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-800">
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
                placeholder="Describe your website... (e.g., 'Create an ecommerce site for selling sneakers')"
                className="w-full bg-[#1a1a1a] border-gray-800 text-white placeholder:text-gray-600 pr-12 resize-none focus:border-purple-600 focus:ring-purple-600/20"
                rows={3}
              />
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="absolute bottom-2 right-2 bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed h-8 w-8 p-0"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 bg-[#1a1a1a] flex flex-col">
          {generatedWebsite ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Preview Header */}
              <div className="h-12 bg-[#0a0a0a] border-b border-gray-800 flex items-center justify-between px-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">
                    localhost:3000/{generatedWebsite.slug}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setGeneratedWebsite(null)}
                  className="text-gray-500 hover:text-gray-300 h-6 px-2"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Clear
                </Button>
              </div>

              {/* Preview Content */}
              <div className="flex-1 overflow-auto bg-white">
                {showCode ? (
                  <div className="p-6 bg-[#0a0a0a] text-gray-300 font-mono text-sm">
                    <pre className="whitespace-pre-wrap">
                      {`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${generatedWebsite.title}</title>
</head>
<body>
  <header style="background: linear-gradient(135deg, ${generatedWebsite.primaryColor}, ${generatedWebsite.secondaryColor}); padding: 2rem; color: white;">
    <h1>${generatedWebsite.title}</h1>
  </header>
  <main style="padding: 3rem;">
    <section>
      <h2>Welcome</h2>
      <p>${generatedWebsite.description}</p>
    </section>
    <section>
      <h2>Features</h2>
      <ul>
        ${generatedWebsite.features.map(f => `<li>${f}</li>`).join('\n        ')}
      </ul>
    </section>
  </main>
</body>
</html>`}
                    </pre>
                  </div>
                ) : (
                  <div className="min-h-full">
                    {/* Website Preview */}
                    <div 
                      className="py-6 px-8 text-white"
                      style={{ 
                        background: `linear-gradient(135deg, ${generatedWebsite.primaryColor}, ${generatedWebsite.secondaryColor})` 
                      }}
                    >
                      <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                          <h1 className="text-3xl font-bold">{generatedWebsite.title}</h1>
                          <nav className="flex items-center space-x-6 text-sm">
                            {generatedWebsite.sections.map((section, idx) => (
                              <a key={idx} href={`#${section}`} className="hover:underline capitalize">
                                {section.replace('-', ' ')}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>
                    </div>

                    <div className="max-w-6xl mx-auto px-8 py-16">
                      <div className="text-center mb-16">
                        <div 
                          className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
                          style={{ 
                            backgroundColor: `${generatedWebsite.primaryColor}20`,
                            color: generatedWebsite.primaryColor 
                          }}
                        >
                          {generatedWebsite.type.charAt(0).toUpperCase() + generatedWebsite.type.slice(1)} Website
                        </div>
                        <h2 className="text-5xl font-bold text-gray-900 mb-6">
                          {generatedWebsite.description.split('.')[0]}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                          {generatedWebsite.description}
                        </p>
                        <button
                          className="px-8 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: generatedWebsite.primaryColor }}
                        >
                          Get Started
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {generatedWebsite.features.slice(0, 6).map((feature, idx) => (
                          <div key={idx} className="p-6 border border-gray-200 rounded-lg">
                            <div 
                              className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-2xl"
                              style={{ backgroundColor: `${generatedWebsite.primaryColor}20` }}
                            >
                              ✓
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">{feature}</h3>
                            <p className="text-sm text-gray-600">
                              Powerful {feature.toLowerCase()} capabilities built right in.
                            </p>
                          </div>
                        ))}
                      </div>

                      <div 
                        className="p-8 rounded-xl text-center"
                        style={{ backgroundColor: `${generatedWebsite.primaryColor}10` }}
                      >
                        <p className="text-gray-600 text-sm">
                          © 2024 {generatedWebsite.title}. Built with Maya-Web AI Builder.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">Preview Panel</h3>
                <p className="text-gray-600 text-sm">
                  Your generated website will appear here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

