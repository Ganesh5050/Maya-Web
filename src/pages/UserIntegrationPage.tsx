import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  User,
  Link,
  CheckCircle,
  TestTube,
  Settings,
  Shield,
  ArrowRight,
  Star,
  Crown,
  Play,
  Download,
} from 'lucide-react';

// Import all User & Integration components
import UserAuthentication from '@/components/UserAuthentication';
import APIIntegration from '@/components/APIIntegration';
import StatusChecker from '@/components/StatusChecker';
import FeatureTestSuite from '@/components/FeatureTestSuite';
import FeatureTester from '@/components/FeatureTester';

const UserIntegrationPage: React.FC = () => {
  const integrationFeatures = [
    {
      id: 'user-authentication',
      title: 'User Authentication',
      description: 'Complete authentication system with OAuth, email/password, and session management',
      icon: <User className="w-8 h-8" />,
      badge: 'Auth',
      color: 'from-green-500 to-emerald-500',
      component: <UserAuthentication />,
    },
    {
      id: 'api-integration',
      title: 'API Integration',
      description: 'Seamless integration with 25+ external APIs and services for enhanced functionality',
      icon: <Link className="w-8 h-8" />,
      badge: '25+ APIs',
      color: 'from-blue-500 to-cyan-500',
      component: <APIIntegration />,
    },
    {
      id: 'status-checker',
      title: 'Status Checker',
      description: 'Real-time monitoring of all integrated services and API health status',
      icon: <CheckCircle className="w-8 h-8" />,
      badge: 'Monitor',
      color: 'from-purple-500 to-pink-500',
      component: <StatusChecker />,
    },
    {
      id: 'feature-test-suite',
      title: 'Feature Test Suite',
      description: 'Comprehensive testing framework for all Maya-Web features and integrations',
      icon: <TestTube className="w-8 h-8" />,
      badge: 'Testing',
      color: 'from-orange-500 to-red-500',
      component: <FeatureTestSuite />,
    },
    {
      id: 'feature-tester',
      title: 'Feature Tester',
      description: 'Interactive testing environment for validating all implemented features',
      icon: <Settings className="w-8 h-8" />,
      badge: 'Interactive',
      color: 'from-indigo-500 to-purple-500',
      component: <FeatureTester />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      {/* Hero Section */}
      <motion.section
        className="relative py-20 md:py-32 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500">
                <User className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                User & Integration
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Complete user management and seamless integration with 25+ external services and APIs
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-green-500/20 text-green-300 px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                Enterprise Security
              </Badge>
              <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                25+ Integrations
              </Badge>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {integrationFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700 hover:border-green-500/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color}`}>
                        {feature.icon}
                      </div>
                      <Badge variant="outline" className="border-green-500/50 text-green-300">
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-white text-xl mb-2">
                      {feature.title}
                    </CardTitle>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      onClick={() => {
                        const element = document.getElementById(feature.id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Explore Feature
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Individual Feature Sections */}
          {integrationFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              id={feature.id}
              className="mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">
                  {feature.title}
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  {feature.description}
                </p>
              </div>
              {feature.component}
            </motion.div>
          ))}

          {/* CTA Section */}
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-lg rounded-3xl p-12 border border-green-500/20">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Integrate Everything?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Connect Maya-Web with your favorite tools and services for a seamless development experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-4"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Integration
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-500/50 text-green-300 hover:bg-green-500/10 px-8 py-4"
                >
                  <Download className="w-5 h-5 mr-2" />
                  View Documentation
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default UserIntegrationPage;
