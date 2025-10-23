/**
 * Generation Progress - Show real-time progress of AI generation
 * Visual feedback for each step of the agent workflow
 */

import { CheckCircle, Circle, XCircle, Loader2, FileCode, CheckCheck, AlertCircle, FolderTree, Hammer, Shield, Wrench, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GenerationProgress as Progress } from '@/services/agentWorkflow';

interface GenerationProgressProps {
  progress: Progress[];
  currentStep?: Progress;
}

export default function GenerationProgress({ progress, currentStep }: GenerationProgressProps) {
  const steps = ['planning', 'generating', 'validating', 'fixing', 'complete'] as const;
  
  const getStepStatus = (step: typeof steps[number]) => {
    const stepProgress = progress.find(p => p.step === step);
    if (!stepProgress) return 'pending';
    return stepProgress.status;
  };

  const getStepIcon = (step: typeof steps[number]) => {
    const status = getStepStatus(step);
    
    if (status === 'complete') return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === 'active') return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
    if (status === 'error') return <XCircle className="w-5 h-5 text-red-500" />;
    return <Circle className="w-5 h-5 text-gray-400" />;
  };

  const getStepLabel = (step: typeof steps[number]) => {
    switch (step) {
      case 'planning': return (
        <div className="flex items-center gap-2">
          <FolderTree className="w-4 h-4" />
          <span>Creating Project Plan</span>
        </div>
      );
      case 'generating': return (
        <div className="flex items-center gap-2">
          <Hammer className="w-4 h-4" />
          <span>Generating Files</span>
        </div>
      );
      case 'validating': return (
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>Validating Code</span>
        </div>
      );
      case 'fixing': return (
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4" />
          <span>Fixing Errors</span>
        </div>
      );
      case 'complete': return (
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Complete</span>
        </div>
      );
    }
  };

  const getProgressPercentage = (step: typeof steps[number]) => {
    const stepProgress = progress.find(p => p.step === step);
    if (!stepProgress || !stepProgress.totalFiles) return 0;
    return (stepProgress.completedFiles || 0) / stepProgress.totalFiles * 100;
  };

  return (
    <div className="space-y-6 p-6 bg-[#1a1a1a] rounded-xl border border-gray-800">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
          <FileCode className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">Generating Your Website</h3>
          <p className="text-gray-400 text-sm">
            {currentStep?.message || 'AI is working on your project...'}
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step);
          const stepProgress = progress.find(p => p.step === step);
          const percentage = getProgressPercentage(step);

          return (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  {getStepIcon(step)}
                </div>

                {/* Label and Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">
                      {getStepLabel(step)}
                    </div>
                    
                    {stepProgress?.currentFile && (
                      <div className="text-xs text-gray-500">
                        {stepProgress.currentFile}
                      </div>
                    )}
                  </div>

                  {stepProgress && stepProgress.totalFiles && stepProgress.totalFiles > 0 && (
                    <div className="text-sm text-gray-400 mt-1">
                      {stepProgress.completedFiles}/{stepProgress.totalFiles} files
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                {status === 'complete' && (
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-xs text-green-400">
                    <CheckCheck className="w-3 h-3" />
                    Done
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-400">
                    <AlertCircle className="w-3 h-3" />
                    Error
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {stepProgress && stepProgress.totalFiles && stepProgress.totalFiles > 0 && (
                <div className="ml-9">
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Overall Progress */}
      <div className="pt-4 border-t border-gray-800">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Overall Progress</span>
          <span className="text-white font-medium">
            {Math.round((progress.filter(p => p.status === 'complete').length / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-3 mt-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: `${(progress.filter(p => p.status === 'complete').length / steps.length) * 100}%` 
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}

