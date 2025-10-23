/**
 * Diff Viewer - Show code changes made by AI
 * Allows users to review and accept/reject AI modifications
 */

import { useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer-continued';
import { Check, X, Eye, EyeOff, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiffViewerProps {
  oldCode: string;
  newCode: string;
  fileName: string;
  language?: string;
  onAccept?: () => void;
  onReject?: () => void;
}

export default function DiffViewer({
  oldCode,
  newCode,
  fileName,
  language = 'typescript',
  onAccept,
  onReject
}: DiffViewerProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDiffOnly, setShowDiffOnly] = useState(false);

  // Count changes
  const oldLines = oldCode.split('\n');
  const newLines = newCode.split('\n');
  const addedLines = newLines.length - oldLines.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-[#252526]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>

          <div>
            <h3 className="font-medium text-white">{fileName}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400">{language}</span>
              <span className="text-xs text-gray-600">•</span>
              {addedLines > 0 ? (
                <span className="text-xs text-green-400">+{addedLines} lines</span>
              ) : addedLines < 0 ? (
                <span className="text-xs text-red-400">{addedLines} lines</span>
              ) : (
                <span className="text-xs text-gray-400">No line changes</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Show Diff Only Toggle */}
          <button
            onClick={() => setShowDiffOnly(!showDiffOnly)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors ${
              showDiffOnly
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            {showDiffOnly ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            Diff Only
          </button>

          {/* Action Buttons */}
          {onReject && (
            <button
              onClick={onReject}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded text-sm text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
              Reject
            </button>
          )}
          
          {onAccept && (
            <button
              onClick={onAccept}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded text-sm text-green-400 transition-colors"
            >
              <Check className="w-4 h-4" />
              Accept
            </button>
          )}
        </div>
      </div>

      {/* Diff Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="diff-viewer-container">
              <ReactDiffViewer
                oldValue={oldCode}
                newValue={newCode}
                splitView={true}
                showDiffOnly={showDiffOnly}
                useDarkTheme={true}
                leftTitle="Before"
                rightTitle="After"
                styles={{
                  variables: {
                    dark: {
                      diffViewerBackground: '#1a1a1a',
                      diffViewerColor: '#e5e7eb',
                      addedBackground: '#1e3a1e',
                      addedColor: '#a6e3a1',
                      removedBackground: '#3a1e1e',
                      removedColor: '#f38ba8',
                      wordAddedBackground: '#2d5a2d',
                      wordRemovedBackground: '#5a2d2d',
                      addedGutterBackground: '#1e3a1e',
                      removedGutterBackground: '#3a1e1e',
                      gutterBackground: '#252526',
                      gutterBackgroundDark: '#1a1a1a',
                      highlightBackground: '#2a2a2a',
                      highlightGutterBackground: '#333333',
                    },
                  },
                  line: {
                    padding: '8px 12px',
                    fontSize: '14px',
                    fontFamily: 'JetBrains Mono, Menlo, Monaco, monospace',
                  },
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

