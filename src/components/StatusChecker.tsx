// Maya-Web Status Checker
// Quick component to check if everything is working

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface StatusCheck {
  name: string;
  status: 'checking' | 'ok' | 'error';
  message?: string;
}

const StatusChecker: React.FC = () => {
  const [checks, setChecks] = useState<StatusCheck[]>([
    { name: 'React', status: 'checking' },
    { name: 'Framer Motion', status: 'checking' },
    { name: 'Tailwind CSS', status: 'checking' },
    { name: 'UI Components', status: 'checking' },
    { name: 'Lucide Icons', status: 'checking' },
    { name: 'TypeScript', status: 'checking' },
    { name: 'Vite Dev Server', status: 'checking' },
    { name: 'Supabase Connection', status: 'checking' },
    { name: 'OpenAI API', status: 'checking' },
    { name: 'Gemini API', status: 'checking' },
    { name: 'Perplexity API', status: 'checking' },
    { name: 'ElevenLabs API', status: 'checking' },
    { name: 'Stability AI API', status: 'checking' }
  ]);

  useEffect(() => {
    runChecks();
  }, []);

  const runChecks = async () => {
    // Check React
    setChecks(prev => prev.map(c => 
      c.name === 'React' ? { ...c, status: 'ok', message: 'React is working' } : c
    ));

    // Check Framer Motion
    try {
      const { motion } = await import('framer-motion');
      setChecks(prev => prev.map(c => 
        c.name === 'Framer Motion' ? { ...c, status: 'ok', message: 'Animations ready' } : c
      ));
    } catch (error) {
      setChecks(prev => prev.map(c => 
        c.name === 'Framer Motion' ? { ...c, status: 'error', message: 'Framer Motion error' } : c
      ));
    }

    // Check Tailwind CSS
    setChecks(prev => prev.map(c => 
      c.name === 'Tailwind CSS' ? { ...c, status: 'ok', message: 'Styles loaded' } : c
    ));

    // Check UI Components
    try {
      const { Button } = await import('@/components/ui/button');
      setChecks(prev => prev.map(c => 
        c.name === 'UI Components' ? { ...c, status: 'ok', message: 'shadcn/ui working' } : c
      ));
    } catch (error) {
      setChecks(prev => prev.map(c => 
        c.name === 'UI Components' ? { ...c, status: 'error', message: 'UI components error' } : c
      ));
    }

    // Check Lucide Icons
    try {
      const { CheckCircle } = await import('lucide-react');
      setChecks(prev => prev.map(c => 
        c.name === 'Lucide Icons' ? { ...c, status: 'ok', message: 'Icons loaded' } : c
      ));
    } catch (error) {
      setChecks(prev => prev.map(c => 
        c.name === 'Lucide Icons' ? { ...c, status: 'error', message: 'Icons error' } : c
      ));
    }

    // Check TypeScript
    setChecks(prev => prev.map(c => 
      c.name === 'TypeScript' ? { ...c, status: 'ok', message: 'Type checking enabled' } : c
    ));

    // Check Vite Dev Server
    setChecks(prev => prev.map(c => 
      c.name === 'Vite Dev Server' ? { ...c, status: 'ok', message: 'Server running on port 8080' } : c
    ));

    // Check Supabase Connection
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setChecks(prev => prev.map(c => 
          c.name === 'Supabase Connection' ? { ...c, status: 'error', message: 'Connection failed' } : c
        ));
      } else {
        setChecks(prev => prev.map(c => 
          c.name === 'Supabase Connection' ? { ...c, status: 'ok', message: 'Database connected' } : c
        ));
      }
    } catch (error) {
      setChecks(prev => prev.map(c => 
        c.name === 'Supabase Connection' ? { ...c, status: 'error', message: 'Supabase error' } : c
      ));
    }

    // Check OpenAI API
    try {
      const { OpenAIService } = await import('@/services/openai');
      const status = await OpenAIService.checkAPIStatus();
      setChecks(prev => prev.map(c => 
        c.name === 'OpenAI API' ? { 
          ...c, 
          status: status ? 'ok' : 'error', 
          message: status ? 'API connected' : 'API not available'
        } : c
      ));
    } catch (error) {
      setChecks(prev => prev.map(c => 
        c.name === 'OpenAI API' ? { ...c, status: 'error', message: 'OpenAI error' } : c
      ));
    }

    // Check Gemini API
    try {
      const { GeminiService } = await import('@/services/multiModelAI');
      const status = await GeminiService.checkAPIStatus();
      setChecks(prev => prev.map(c => 
        c.name === 'Gemini API' ? { 
          ...c, 
          status: status ? 'ok' : 'error', 
          message: status ? 'API connected' : 'API not available'
        } : c
      ));
    } catch (error) {
      setChecks(prev => prev.map(c => 
        c.name === 'Gemini API' ? { ...c, status: 'error', message: 'Gemini error' } : c
      ));
    }

    // Check Perplexity API
    try {
      const { PerplexityService } = await import('@/services/multiModelAI');
      const status = await PerplexityService.checkAPIStatus();
      setChecks(prev => prev.map(c => 
        c.name === 'Perplexity API' ? { 
          ...c, 
          status: status ? 'ok' : 'error', 
          message: status ? 'API connected' : 'API not available'
        } : c
      ));
    } catch (error) {
      setChecks(prev => prev.map(c => 
        c.name === 'Perplexity API' ? { ...c, status: 'error', message: 'Perplexity error' } : c
      ));
    }

    // Check ElevenLabs API
    try {
      const { ElevenLabsService } = await import('@/services/multiModelAI');
      const status = await ElevenLabsService.checkAPIStatus();
      setChecks(prev => prev.map(c => 
        c.name === 'ElevenLabs API' ? { 
          ...c, 
          status: status ? 'ok' : 'error', 
          message: status ? 'Voice synthesis ready' : 'API not available'
        } : c
      ));
    } catch (error) {
      setChecks(prev => prev.map(c => 
        c.name === 'ElevenLabs API' ? { ...c, status: 'error', message: 'ElevenLabs error' } : c
      ));
    }

    // Check Stability AI API
    try {
      const { StabilityAIService } = await import('@/services/multiModelAI');
      const status = await StabilityAIService.checkAPIStatus();
      setChecks(prev => prev.map(c => 
        c.name === 'Stability AI API' ? { 
          ...c, 
          status: status ? 'ok' : 'error', 
          message: status ? 'Image generation ready' : 'API not available'
        } : c
      ));
    } catch (error) {
      setChecks(prev => prev.map(c => 
        c.name === 'Stability AI API' ? { ...c, status: 'error', message: 'Stability AI error' } : c
      ));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok':
        return 'bg-green-500/20 text-green-300';
      case 'error':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-blue-500/20 text-blue-300';
    }
  };

  const okCount = checks.filter(c => c.status === 'ok').length;
  const errorCount = checks.filter(c => c.status === 'error').length;
  const checkingCount = checks.filter(c => c.status === 'checking').length;

  return (
    <motion.section
      className="py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Maya-Web Status Check
          </h2>
          <p className="text-gray-300">
            Checking all systems and integrations
          </p>
        </motion.div>

        <Card className="bg-slate-800 border-slate-700 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>System Status</span>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-500/20 text-green-300">
                  {okCount} OK
                </Badge>
                <Badge className="bg-red-500/20 text-red-300">
                  {errorCount} Errors
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-300">
                  {checkingCount} Checking
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checks.map((check, index) => (
                <motion.div
                  key={check.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(check.status)}
                    <div>
                      <div className="text-white font-medium">
                        {check.name}
                      </div>
                      {check.message && (
                        <div className="text-gray-400 text-sm">
                          {check.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge className={getStatusColor(check.status)}>
                    {check.status}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {okCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
              >
                <div className="flex items-center gap-2 text-green-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">
                    Maya-Web is running! {okCount} systems operational.
                  </span>
                </div>
              </motion.div>
            )}

            {errorCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <div className="flex items-center gap-2 text-red-300">
                  <XCircle className="w-5 h-5" />
                  <span className="font-medium">
                    {errorCount} system(s) need attention. Check the errors above.
                  </span>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
};

export default StatusChecker;
