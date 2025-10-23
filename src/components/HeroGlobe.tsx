import React, { Suspense } from "react";
import { World } from "@/components/ui/globe";

interface HeroGlobeProps {
  className?: string;
}

export default function HeroGlobe({ className = "" }: HeroGlobeProps) {
  const globeConfig = {
    pointSize: 0,
    globeColor: "#1a1a2e",
    showAtmosphere: false,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#1a1a2e",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "#ffffff",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 0,
    arcLength: 0,
    rings: 0,
    maxRings: 0,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
    polygonAltitude: 0.01,
  };
  
  // Empty data for clean globe
  const sampleArcs: any[] = [];

  return (
    <div className={`w-full h-full relative ${className}`}>
      <style jsx global>{`
        .three-globe-controls {
          display: none !important;
        }
        .orbit-controls {
          display: none !important;
        }
        canvas[style*="cursor"] {
          cursor: grab !important;
        }
      `}</style>
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg">
          <div className="text-white text-lg">Loading Globe...</div>
        </div>
      }>
        <World data={sampleArcs} globeConfig={globeConfig} />
      </Suspense>
    </div>
  );
}
