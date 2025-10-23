import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { FileText, Code, Palette, Settings, Save, Download, Play } from 'lucide-react';

interface FileData {
  content: string;
  language: string;
}

interface CodeEditorProps {
  files: { [path: string]: FileData };
  activeFile: string;
  onFileChange: (path: string, content: string) => void;
  onFileSelect: (path: string) => void;
  onSave?: () => void;
  onRun?: () => void;
}

export default function CodeEditor({
  files,
  activeFile,
  onFileChange,
  onFileSelect,
  onSave,
  onRun
}: CodeEditorProps) {
  const [editorTheme, setEditorTheme] = useState<'vs-dark' | 'light'>('vs-dark');
  const [fontSize, setFontSize] = useState(14);

  const currentFile = files[activeFile];
  const fileList = Object.keys(files).sort();

  // Get icon for file type
  const getFileIcon = (path: string) => {
    const ext = path.split('.').pop()?.toLowerCase();
    
    switch (ext) {
      case 'tsx':
      case 'ts':
      case 'jsx':
      case 'js':
        return <Code className="w-4 h-4 text-blue-400" />;
      case 'css':
        return <Palette className="w-4 h-4 text-pink-400" />;
      case 'html':
        return <FileText className="w-4 h-4 text-orange-400" />;
      case 'json':
        return <Settings className="w-4 h-4 text-yellow-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  // Get file name from path
  const getFileName = (path: string) => {
    const parts = path.split('/');
    return parts[parts.length - 1];
  };

  // Get folder from path
  const getFolder = (path: string) => {
    const parts = path.split('/');
    parts.pop();
    return parts.join('/') || 'root';
  };

  // Group files by folder
  const groupedFiles = fileList.reduce((acc, path) => {
    const folder = getFolder(path);
    if (!acc[folder]) acc[folder] = [];
    acc[folder].push(path);
    return acc;
  }, {} as { [folder: string]: string[] });

  return (
    <div className="flex h-full bg-[#1e1e1e] text-white">
      {/* File Explorer Sidebar */}
      <div className="w-64 bg-[#252526] border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Explorer</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {Object.entries(groupedFiles).map(([folder, paths]) => (
            <div key={folder} className="mb-2">
              {folder !== 'root' && (
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {folder}
                </div>
              )}
              {paths.map((path) => (
                <button
                  key={path}
                  onClick={() => onFileSelect(path)}
                  className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700/50 transition-colors ${
                    activeFile === path ? 'bg-gray-700 border-l-2 border-blue-500' : ''
                  }`}
                >
                  {getFileIcon(path)}
                  <span className="truncate">{getFileName(path)}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Editor Controls */}
        <div className="border-t border-gray-700 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Theme:</span>
            <button
              onClick={() => setEditorTheme(editorTheme === 'vs-dark' ? 'light' : 'vs-dark')}
              className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
            >
              {editorTheme === 'vs-dark' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Font Size:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFontSize(Math.max(10, fontSize - 1))}
                className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center">{fontSize}</span>
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Tab Bar */}
        <div className="bg-[#252526] border-b border-gray-700 flex items-center overflow-x-auto">
          <div className="flex items-center px-2 py-1 bg-[#1e1e1e] border-r border-gray-700">
            {getFileIcon(activeFile)}
            <span className="ml-2 text-sm">{getFileName(activeFile)}</span>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1 relative">
          {currentFile ? (
            <Editor
              height="100%"
              language={currentFile.language}
              value={currentFile.content}
              onChange={(value) => value !== undefined && onFileChange(activeFile, value)}
              theme={editorTheme}
              options={{
                fontSize,
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
                tabSize: 2,
                formatOnPaste: true,
                formatOnType: true,
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
                folding: true,
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                cursorBlinking: 'smooth',
                smoothScrolling: true
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg">No file selected</p>
                <p className="text-sm mt-2">Select a file from the explorer to start editing</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="bg-[#252526] border-t border-gray-700 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>{currentFile?.language || 'plaintext'}</span>
            <span>•</span>
            <span>{fileList.length} files</span>
          </div>
          
          <div className="flex items-center gap-2">
            {onSave && (
              <button
                onClick={onSave}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            )}
            {onRun && (
              <button
                onClick={onRun}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
              >
                <Play className="w-4 h-4" />
                Run
              </button>
            )}
            <button
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

