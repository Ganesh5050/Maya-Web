import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, HoveredLink } from '@/components/ui/navbar-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  Zap,
  Palette,
  Workflow,
  Users,
  Info,
  Rocket,
  Sparkles,
  Brain,
  Film,
  Code,
  Settings,
  Globe,
  Star,
} from 'lucide-react';

const AnimatedNavbar: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      <Menu setActive={setActive}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-12">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-black dark:text-white">Maya-Web</span>
        </Link>

        {/* Home */}
        <MenuItem setActive={setActive} active={active} item="Home">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink asChild>
              <Link to="/">Homepage</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/#features">Features</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/#status-checker">Status Checker</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/#feature-tester">Feature Tester</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/#working-ai-generator">AI Generator</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/#multi-model-ai-demo">Multi-Model AI</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/#animation-library-demo">Animation Library</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/#revolutionary-features-demo">Revolutionary Features</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/#working-scene-3d-editor">3D Scene Editor</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/#deployment-dashboard">Deployment Dashboard</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/#pricing">Pricing</Link>
            </HoveredLink>
          </div>
        </MenuItem>

        {/* AI Tools */}
        <MenuItem setActive={setActive} active={active} item="AI Tools">
          <div className="flex flex-col space-y-4 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="font-semibold text-black dark:text-white">AI Tools</span>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs">
                9 AI Models
              </Badge>
            </div>
            <HoveredLink asChild>
              <Link to="/ai-tools#ai-copilot">AI Co-Pilot</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/ai-tools#working-ai-generator">AI Generator</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/ai-tools#gemini-test">Gemini Pro</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/ai-tools#perplexity-test">Perplexity AI</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/ai-tools#elevenlabs-test">ElevenLabs Voice</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/ai-tools#stability-ai-test">Stability AI</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/ai-tools#multi-model-ai-demo">Multi-Model Demo</Link>
            </HoveredLink>
          </div>
        </MenuItem>

        {/* Design & Animation */}
        <MenuItem setActive={setActive} active={active} item="Design & Animation">
          <div className="flex flex-col space-y-4 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-4 h-4 text-pink-500" />
              <span className="font-semibold text-black dark:text-white">Design & Animation</span>
              <Badge variant="secondary" className="bg-pink-500/20 text-pink-300 text-xs">
                200+ Effects
              </Badge>
            </div>
            <HoveredLink asChild>
              <Link to="/design-animation#animation-timeline-editor">Timeline Editor</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/design-animation#animation-library-demo">Animation Library</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/design-animation#revolutionary-features-demo">Revolutionary Features</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/design-animation#layout-optimizer">Layout Optimizer</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/design-animation#design-system-extractor">Design Extractor</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/design-animation#working-scene-3d-editor">3D Scene Editor</Link>
            </HoveredLink>
          </div>
        </MenuItem>

        {/* Workflow & Development */}
        <MenuItem setActive={setActive} active={active} item="Workflow & Development">
          <div className="flex flex-col space-y-4 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <Workflow className="w-4 h-4 text-blue-500" />
              <span className="font-semibold text-black dark:text-white">Workflow & Development</span>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                20+ Platforms
              </Badge>
            </div>
            <HoveredLink asChild>
              <Link to="/workflow-development#workflow-demo">Workflow Demo</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/workflow-development#workflow-manager">Workflow Manager</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/workflow-development#development-workflow">Development Workflow</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/workflow-development#template-marketplace">Template Marketplace</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/workflow-development#analytics-dashboard">Analytics Dashboard</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/workflow-development#deployment-dashboard">Deployment Dashboard</Link>
            </HoveredLink>
          </div>
        </MenuItem>

        {/* User & Integration */}
        <MenuItem setActive={setActive} active={active} item="User & Integration">
          <div className="flex flex-col space-y-4 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-green-500" />
              <span className="font-semibold text-black dark:text-white">User & Integration</span>
              <Badge variant="secondary" className="bg-green-500/20 text-green-300 text-xs">
                25+ APIs
              </Badge>
            </div>
            <HoveredLink asChild>
              <Link to="/user-integration#user-authentication">User Authentication</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/user-integration#api-integration">API Integration</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/user-integration#status-checker">Status Checker</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/user-integration#feature-test-suite">Feature Test Suite</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/user-integration#feature-tester">Feature Tester</Link>
            </HoveredLink>
          </div>
        </MenuItem>

        {/* About */}
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-indigo-500" />
              <span className="font-semibold text-black dark:text-white">About</span>
            </div>
            <HoveredLink asChild>
              <Link to="/about">About Maya-Web</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/about#team">Our Team</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/about#roadmap">Roadmap</Link>
            </HoveredLink>
            <HoveredLink asChild>
              <Link to="/about#blog">Blog & Insights</Link>
            </HoveredLink>
          </div>
        </MenuItem>

        {/* CTA Button */}
        <div className="ml-8">
          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            asChild
          >
            <Link to="/ai-tools">
              <Rocket className="w-4 h-4 mr-2" />
              Launch Builder
            </Link>
          </Button>
        </div>
      </Menu>
    </div>
  );
};

export default AnimatedNavbar;
