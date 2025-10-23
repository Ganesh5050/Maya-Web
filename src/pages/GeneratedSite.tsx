import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { websiteStorage, GeneratedWebsite } from '@/services/websiteStorage';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe, Code, Share2, Download } from 'lucide-react';

export default function GeneratedSite() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [website, setWebsite] = useState<GeneratedWebsite | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const site = websiteStorage.getWebsite(slug);
      setWebsite(site);
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading website...</p>
        </div>
      </div>
    );
  }

  if (!website) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Website Not Found</h1>
          <p className="text-gray-600 mb-8">The website you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/builder')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Builder
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/builder')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Builder
            </Button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">
                  {website.title.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="font-semibold text-gray-900">{website.title}</span>
            </div>
            <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {website.type}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Code className="w-4 h-4 mr-2" />
              View Code
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Website Preview */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-t-xl border border-gray-200 border-b-0">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${website.primaryColor} 0%, ${website.secondaryColor} 100%)` 
                  }}
                >
                  <span className="text-white font-bold text-lg">
                    {website.title.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{website.title}</span>
              </div>
              <div className="flex items-center space-x-6">
                {website.sections.includes('features') && (
                  <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">
                    Features
                  </a>
                )}
                {website.sections.includes('pricing') && (
                  <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">
                    Pricing
                  </a>
                )}
                {website.sections.includes('about') && (
                  <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium">
                    About
                  </a>
                )}
                {website.type === 'ecommerce' && (
                  <a href="#shop" className="text-gray-600 hover:text-gray-900 font-medium">
                    Shop
                  </a>
                )}
                {website.type === 'blog' && (
                  <a href="#blog" className="text-gray-600 hover:text-gray-900 font-medium">
                    Blog
                  </a>
                )}
                <Button variant="outline" size="sm">
                  {website.type === 'ecommerce' ? 'Sign In' : 'Log In'}
                </Button>
                <Button 
                  size="sm"
                  style={{ 
                    background: `linear-gradient(135deg, ${website.primaryColor} 0%, ${website.secondaryColor} 100%)` 
                  }}
                  className="text-white hover:opacity-90"
                >
                  {website.type === 'ecommerce' ? 'Shop Now' :
                   website.type === 'portfolio' ? 'Hire Me' :
                   website.type === 'business' ? 'Contact Us' :
                   'Get Started'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white border-x border-gray-200 px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ 
                backgroundColor: `${website.primaryColor}20`,
                color: website.primaryColor 
              }}
            >
              <Globe className="w-4 h-4 mr-2" />
              {website.type === 'ecommerce' ? 'E-commerce Platform' :
               website.type === 'portfolio' ? 'Portfolio Website' :
               website.type === 'business' ? 'Business Website' :
               website.type === 'blog' ? 'Blog Platform' :
               'Professional Website'}
            </div>
            
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              {website.description.split('.')[0] || website.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              {website.description}
            </p>
            
            <div className="flex items-center justify-center space-x-4">
              <Button 
                size="lg"
                style={{ 
                  background: `linear-gradient(135deg, ${website.primaryColor} 0%, ${website.secondaryColor} 100%)` 
                }}
                className="text-white hover:opacity-90 px-8 py-6 text-lg"
              >
                Get Started →
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">{website.features.length}</div>
                <div className="text-sm text-gray-600 mt-1">Features</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">{website.sections.length}</div>
                <div className="text-sm text-gray-600 mt-1">Sections</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600 mt-1">Responsive</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white border-x border-gray-200 px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-600 text-center mb-12">
              Everything you need to succeed
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {website.features.map((feature, idx) => (
                <div key={idx} className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${website.primaryColor}20` }}
                  >
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature}</h3>
                  <p className="text-gray-600 text-sm">
                    Powerful {feature.toLowerCase()} capabilities built right in.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="bg-white rounded-b-xl border border-gray-200 border-t-0 px-8 py-8"
          style={{ 
            background: `linear-gradient(135deg, ${website.primaryColor}10 0%, ${website.secondaryColor}10 100%)` 
          }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-600 text-sm">
              © 2024 {website.title}. All rights reserved. Built with Maya-Web Builder.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Generated from prompt: "{website.prompt}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

