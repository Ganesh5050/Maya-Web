import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Info,
  Users,
  Map,
  BookOpen,
  Rocket,
  Heart,
  Target,
  Zap,
  Crown,
  Star,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Maya AI',
      role: 'Lead AI Engineer',
      description: 'The brain behind Maya-Web\'s revolutionary AI capabilities',
      avatar: '🤖',
    },
    {
      name: 'Design Team',
      role: 'Creative Directors',
      description: 'Crafting beautiful, functional user experiences',
      avatar: '🎨',
    },
    {
      name: 'DevOps Squad',
      role: 'Infrastructure Engineers',
      description: 'Ensuring 99.9% uptime and lightning-fast performance',
      avatar: '⚡',
    },
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Maya-Web Launch',
      description: 'Revolutionary AI website builder with 3D capabilities',
      status: 'completed',
    },
    {
      year: 'Q2 2024',
      title: 'Multi-Model AI Integration',
      description: 'Integration of 9+ AI models for superior results',
      status: 'completed',
    },
    {
      year: 'Q3 2024',
      title: 'Real-Time Collaboration',
      description: 'Team collaboration features with AI conflict resolution',
      status: 'in-progress',
    },
    {
      year: 'Q4 2024',
      title: 'Singularity Mode',
      description: 'Full ecosystem generation from single prompts',
      status: 'planned',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
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
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500">
                <Info className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                About Maya-Web
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The world's first intelligent 3D AI website builder, revolutionizing how websites are created
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-300 px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                Industry Leader
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                Future-Ready
              </Badge>
            </div>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-white mb-4 flex items-center justify-center gap-3">
                  <Target className="w-8 h-8 text-indigo-400" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-xl text-gray-300 mb-6 max-w-4xl mx-auto">
                  To democratize website creation by making professional-grade 3D websites accessible to everyone, 
                  powered by cutting-edge AI that understands design, emotion, and user intent.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 w-fit mx-auto mb-4">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">1000x Faster</h3>
                    <p className="text-gray-400">Build websites in seconds, not hours</p>
                  </div>
                  <div className="text-center">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 w-fit mx-auto mb-4">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">AI-Powered</h3>
                    <p className="text-gray-400">9+ AI models working together</p>
                  </div>
                  <div className="text-center">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 w-fit mx-auto mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">User-Centric</h3>
                    <p className="text-gray-400">Designed for creators, by creators</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Team Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Users className="w-10 h-10 text-indigo-400" />
                Our Team
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                A diverse team of AI researchers, designers, and engineers working together to build the future
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700 text-center">
                    <CardHeader>
                      <div className="text-6xl mb-4">{member.avatar}</div>
                      <CardTitle className="text-white text-xl">{member.name}</CardTitle>
                      <Badge variant="outline" className="border-indigo-500/50 text-indigo-300 w-fit mx-auto">
                        {member.role}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">{member.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Roadmap Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Map className="w-10 h-10 text-indigo-400" />
                Roadmap
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Our journey to revolutionize website creation
              </p>
            </div>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <Badge
                            variant={
                              milestone.status === 'completed'
                                ? 'default'
                                : milestone.status === 'in-progress'
                                ? 'secondary'
                                : 'outline'
                            }
                            className={
                              milestone.status === 'completed'
                                ? 'bg-green-500'
                                : milestone.status === 'in-progress'
                                ? 'bg-blue-500'
                                : 'border-gray-500 text-gray-400'
                            }
                          >
                            {milestone.status === 'completed' ? '✓' : milestone.status === 'in-progress' ? '⏳' : '📅'}
                          </Badge>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">{milestone.title}</h3>
                            <Badge variant="outline" className="border-indigo-500/50 text-indigo-300">
                              {milestone.year}
                            </Badge>
                          </div>
                          <p className="text-gray-400">{milestone.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Blog Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <BookOpen className="w-10 h-10 text-indigo-400" />
                Latest Insights
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Stay updated with our latest developments and industry insights
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'The Future of AI Website Building',
                  excerpt: 'Exploring how AI is revolutionizing web development',
                  date: 'Dec 2024',
                },
                {
                  title: '3D Web Design Trends 2024',
                  excerpt: 'Latest trends in three-dimensional web experiences',
                  date: 'Nov 2024',
                },
                {
                  title: 'Building with Maya-Web: A Complete Guide',
                  excerpt: 'Step-by-step guide to creating stunning websites',
                  date: 'Oct 2024',
                },
              ].map((post, index) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700 hover:border-indigo-500/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <CardTitle className="text-white text-lg mb-2">{post.title}</CardTitle>
                      <Badge variant="outline" className="border-indigo-500/50 text-indigo-300 w-fit">
                        {post.date}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 mb-4">{post.excerpt}</p>
                      <Button variant="outline" className="border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-lg rounded-3xl p-12 border border-indigo-500/20">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Join the Revolution?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Be part of the future of website creation. Start building with Maya-Web today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-4"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Building
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 px-8 py-4"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
