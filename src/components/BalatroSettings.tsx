import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface BalatroSettingsProps {
  pixelFilter: number;
  setPixelFilter: (value: number) => void;
  mouseInteraction: boolean;
  setMouseInteraction: (value: boolean) => void;
  isRotate: boolean;
  setIsRotate: (value: boolean) => void;
  color1: string;
  setColor1: (value: string) => void;
  color2: string;
  setColor2: (value: string) => void;
  color3: string;
  setColor3: (value: string) => void;
}

const BalatroSettings: React.FC<BalatroSettingsProps> = ({
  pixelFilter,
  setPixelFilter,
  mouseInteraction,
  setMouseInteraction,
  isRotate,
  setIsRotate,
  color1,
  setColor1,
  color2,
  setColor2,
  color3,
  setColor3
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-20">
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="absolute top-16 right-0 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-6 w-80 shadow-2xl">
          <h3 className="text-white text-xl font-semibold mb-6">Customize</h3>
          
          <div className="space-y-6">
            {/* Colors */}
            <div className="space-y-3">
              <Label className="text-white text-sm font-medium">Colors</Label>
              <div className="flex space-x-3">
                <div className="flex-1">
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-full h-10 rounded border border-white bg-black cursor-pointer"
                    style={{ backgroundColor: color1 }}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-full h-10 rounded border border-white bg-black cursor-pointer"
                    style={{ backgroundColor: color2 }}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="color"
                    value={color3}
                    onChange={(e) => setColor3(e.target.value)}
                    className="w-full h-10 rounded border border-white bg-black cursor-pointer"
                    style={{ backgroundColor: color3 }}
                  />
                </div>
              </div>
            </div>

            {/* Pixelation */}
            <div className="space-y-3">
              <Label className="text-white text-sm font-medium">Pixelation</Label>
              <div className="space-y-2">
                <div className="relative">
                  <div 
                    className="w-full h-2 bg-white rounded-full cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percentage = x / rect.width;
                      const newValue = Math.round(100 + (percentage * (2000 - 100)));
                      setPixelFilter(Math.max(100, Math.min(2000, newValue)));
                    }}
                  >
                    <div 
                      className="h-2 bg-white rounded-full relative"
                      style={{ width: `${((pixelFilter - 100) / (2000 - 100)) * 100}%` }}
                    >
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-900"></div>
                    </div>
                  </div>
                  <div className="absolute right-0 top-0">
                    <span className="text-white text-sm">{pixelFilter}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enable Mouse Interaction */}
            <div className="flex items-center justify-between">
              <Label className="text-white text-sm font-medium">Enable Mouse Interaction</Label>
              <div className="relative">
                <button
                  onClick={() => setMouseInteraction(!mouseInteraction)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    mouseInteraction ? 'bg-white' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      mouseInteraction ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                    style={{ marginTop: '2px' }}
                  ></div>
                </button>
              </div>
            </div>

            {/* Rotate */}
            <div className="flex items-center justify-between">
              <Label className="text-white text-sm font-medium">Rotate</Label>
              <div className="relative">
                <button
                  onClick={() => setIsRotate(!isRotate)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    isRotate ? 'bg-white' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      isRotate ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                    style={{ marginTop: '2px' }}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BalatroSettings;
