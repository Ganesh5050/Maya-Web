/**
 * Sandpack Preview - Real React runtime in browser
 * Replaces static iframe with live, hot-reloading preview
 */

import { Sandpack, SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview as Preview, SandpackConsole } from '@codesandbox/sandpack-react';
import { useState } from 'react';
import { Smartphone, Tablet, Monitor, RefreshCw, Maximize2, Minimize2, Terminal as TerminalIcon } from 'lucide-react';

interface SandpackPreviewProps {
  files: {
    [path: string]: {
      content: string;
      language: string;
    };
  };
  dependencies?: Record<string, string>;
  showEditor?: boolean;
  showConsole?: boolean;
}

type DeviceMode = 'mobile' | 'tablet' | 'desktop';

export default function SandpackPreview({ 
  files, 
  dependencies = {},
  showEditor = false,
  showConsole = true 
}: SandpackPreviewProps) {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(showConsole);
  const [refreshKey, setRefreshKey] = useState(0);

  // Convert our file format to Sandpack format
  const sandpackFiles: Record<string, string> = {};
  
  for (const [path, file] of Object.entries(files)) {
    // Sandpack expects paths without 'src/' prefix for React templates
    const sandpackPath = path.startsWith('src/') ? path.slice(4) : path;
    sandpackFiles[`/${sandpackPath}`] = file.content;
  }

  // Get device dimensions
  const getDeviceDimensions = () => {
    switch (deviceMode) {
      case 'mobile':
        return { width: '375px', height: '667px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      case 'desktop':
        return { width: '100%', height: '100%' };
    }
  };

  const dimensions = getDeviceDimensions();

  // Default dependencies for React apps
  const defaultDependencies = {
    'react': '^18.2.0',
    'react-dom': '^18.2.0',
    'framer-motion': '^10.16.0',
    'lucide-react': '^0.294.0',
    ...dependencies
  };

  return (
    <div className={`flex flex-col bg-gray-900 ${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'}`}>
      {/* Toolbar */}
      <div className="bg-[#252526] border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 font-medium">Live Preview</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Live"></div>
          <span className="text-xs text-gray-500">Sandpack Runtime</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Device Mode Selector */}
          <div className="flex items-center gap-1 bg-gray-700 rounded p-1">
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded transition-colors ${
                deviceMode === 'mobile' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              title="Mobile View (375x667)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded transition-colors ${
                deviceMode === 'tablet' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              title="Tablet View (768x1024)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded transition-colors ${
                deviceMode === 'desktop' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              title="Desktop View (100%)"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Toggle */}
          <button
            onClick={() => setShowTerminal(!showTerminal)}
            className={`p-2 rounded transition-colors ${
              showTerminal ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            title="Toggle Console"
          >
            <TerminalIcon className="w-4 h-4" />
          </button>

          {/* Refresh Button */}
          <button
            onClick={() => setRefreshKey(prev => prev + 1)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Refresh Preview"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Sandpack Container */}
      <div className="flex-1 overflow-hidden">
        <SandpackProvider
          key={refreshKey}
          template="react-ts"
          files={sandpackFiles}
          customSetup={{
            dependencies: defaultDependencies
          }}
          theme="dark"
          options={{
            autorun: true,
            autoReload: true,
            recompileMode: 'immediate',
            recompileDelay: 300,
          }}
        >
          <SandpackLayout>
            {showEditor && (
              <SandpackCodeEditor
                showTabs
                showLineNumbers
                showInlineErrors
                wrapContent
                closableTabs
              />
            )}
            
            <div className="flex flex-col h-full">
              {/* Preview */}
              <div className="flex-1 flex items-center justify-center bg-gray-800 p-4 overflow-auto">
                <div
                  className="bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
                  style={{
                    width: dimensions.width,
                    height: dimensions.height,
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                >
                  <Preview
                    showOpenInCodeSandbox={false}
                    showRefreshButton={false}
                    showNavigator={true}
                  />
                </div>
              </div>

              {/* Console */}
              {showTerminal && (
                <div className="h-48 border-t border-gray-700">
                  <SandpackConsole
                    showHeader
                    showSyntaxError
                    resetOnPreviewRestart
                  />
                </div>
              )}
            </div>
          </SandpackLayout>
        </SandpackProvider>
      </div>

      {/* Status Bar */}
      <div className="bg-[#252526] border-t border-gray-700 px-4 py-1.5 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span>Device: {deviceMode.charAt(0).toUpperCase() + deviceMode.slice(1)}</span>
          <span>•</span>
          <span>{dimensions.width} x {dimensions.height}</span>
          <span>•</span>
          <span>{Object.keys(files).length} files</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-400">● Hot Reload Active</span>
        </div>
      </div>
    </div>
  );
}

