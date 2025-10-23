import { useState, useEffect, useRef } from 'react';
import { RefreshCw, Maximize2, Minimize2, Smartphone, Tablet, Monitor } from 'lucide-react';

interface LivePreviewProps {
  html: string;
  css?: string;
  javascript?: string;
  autoRefresh?: boolean;
}

type DeviceMode = 'mobile' | 'tablet' | 'desktop';

export default function LivePreview({ html, css = '', javascript = '', autoRefresh = true }: LivePreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Auto-refresh when content changes
  useEffect(() => {
    if (autoRefresh) {
      setRefreshKey(prev => prev + 1);
    }
  }, [html, css, javascript, autoRefresh]);

  // Combine HTML, CSS, and JS into a complete document
  const getPreviewContent = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Live Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    ${css}
    
    /* Smooth scrolling */
    html {
      scroll-behavior: smooth;
    }
    
    /* Hide scrollbar in preview */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #1a1a1a;
    }
    ::-webkit-scrollbar-thumb {
      background: #4a5568;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #718096;
    }
  </style>
</head>
<body>
  ${html}
  
  <script>
    ${javascript}
    
    // Error handling
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      console.error('Preview Error:', msg, 'at', lineNo + ':' + columnNo);
      return false;
    };
    
    // Hot reload support
    if (window.location !== window.parent.location) {
      console.log('🔥 Live preview loaded');
    }
  </script>
</body>
</html>
    `;
  };

  // Get device dimensions
  const getDeviceDimensions = () => {
    switch (deviceMode) {
      case 'mobile':
        return { width: '375px', height: '667px' }; // iPhone SE
      case 'tablet':
        return { width: '768px', height: '1024px' }; // iPad
      case 'desktop':
        return { width: '100%', height: '100%' };
      default:
        return { width: '100%', height: '100%' };
    }
  };

  const dimensions = getDeviceDimensions();

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`flex flex-col bg-gray-900 ${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'}`}>
      {/* Toolbar */}
      <div className="bg-[#252526] border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 font-medium">Live Preview</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Live"></div>
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

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Refresh Preview"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Preview Area */}
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
          <iframe
            key={refreshKey}
            ref={iframeRef}
            srcDoc={getPreviewContent()}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-forms allow-modals allow-popups allow-same-origin"
            title="Live Preview"
            loading="lazy"
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#252526] border-t border-gray-700 px-4 py-1.5 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span>Device: {deviceMode.charAt(0).toUpperCase() + deviceMode.slice(1)}</span>
          <span>•</span>
          <span>
            {dimensions.width} x {dimensions.height}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={autoRefresh ? 'text-green-400' : 'text-gray-500'}>
            {autoRefresh ? '● Auto-refresh ON' : '○ Auto-refresh OFF'}
          </span>
        </div>
      </div>
    </div>
  );
}

