import React, { useState } from 'react';
import { RotateCcw, Sun, Moon, Layers, ShieldCheck, Sparkles, Move3d } from 'lucide-react';

// Declare custom JSX element for <model-viewer> in React JSX namespace
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

interface Building3DViewerProps {
  propertyTitle: string;
  modelUrl?: string; // Optional 3D GLB model URL
}

export const Building3DViewer: React.FC<Building3DViewerProps> = ({
  propertyTitle,
  modelUrl,
}) => {
  const [activeFloor, setActiveFloor] = useState<'GLOBAL' | 'RDC' | 'ETAGE_1' | 'ROOFTOP'>('GLOBAL');
  const [lightMode, setLightMode] = useState<'DAY' | 'NIGHT'>('DAY');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // High quality sample GLB 3D architectural model
  const sample3DGlb =
    modelUrl ||
    'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Building/glTF-Binary/Building.glb';

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#f2ca50]/40 space-y-6 shadow-2xl relative overflow-hidden bg-[#121414]">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#4d4635]/30 pb-4">
        <div>
          <span className="font-['Hanken_Grotesk'] text-xs font-bold text-[#f2ca50] tracking-[0.2em] flex items-center gap-2 mb-1">
            <Move3d className="w-4 h-4 text-[#f2ca50]" />
            MAQUETTE ARCHITECTURALE 3D RÉELLE & VISITE 360°
          </span>
          <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#e2e2e2]">
            Exploration 3D de l'Immeuble ({propertyTitle})
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Day / Night 3D Lighting Toggle */}
          <button
            type="button"
            onClick={() => setLightMode(lightMode === 'DAY' ? 'NIGHT' : 'DAY')}
            className="flex items-center gap-1.5 bg-[#1a1c1c] border border-[#4d4635]/50 px-3 py-1.5 rounded-lg text-xs font-['Hanken_Grotesk'] font-bold text-[#d0c5af] hover:text-[#f2ca50] transition-colors cursor-pointer"
          >
            {lightMode === 'DAY' ? <Sun className="w-4 h-4 text-[#f2ca50]" /> : <Moon className="w-4 h-4 text-[#68dba9]" />}
            <span>{lightMode === 'DAY' ? 'ÉCLAIRAGE JOUR' : 'ÉCLAIRAGE NUIT'}</span>
          </button>

          {/* Auto Rotate Toggle */}
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-['Hanken_Grotesk'] font-bold transition-all cursor-pointer ${
              autoRotate ? 'bg-[#f2ca50] text-[#3c2f00]' : 'bg-[#1a1c1c] text-[#d0c5af] border border-[#4d4635]'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>360° AUTO</span>
          </button>
        </div>
      </div>

      {/* 3D Model Display Container */}
      <div className="relative h-[480px] sm:h-[540px] w-full rounded-xl overflow-hidden bg-[#0c0f0f] border border-[#4d4635]/40 shadow-inner group">
        
        {/* Interactive 3D Web Component */}
        <model-viewer
          src={sample3DGlb}
          alt={`Modèle 3D de ${propertyTitle}`}
          camera-controls
          touch-action="pan-y"
          {...(autoRotate ? { 'auto-rotate': '' } : {})}
          shadow-intensity="1.5"
          shadow-softness="0.8"
          exposure={lightMode === 'DAY' ? '1.1' : '0.4'}
          environment-image={lightMode === 'DAY' ? 'neutral' : 'legacy'}
          interaction-prompt="auto"
          ar
          ar-modes="webxr scene-viewer quick-look"
          style={{ width: '100%', height: '100%', backgroundColor: '#0c0f0f' }}
        >
          {/* Loading Slot Overlay */}
          <div slot="poster" className="w-full h-full flex flex-col items-center justify-center bg-[#0c0f0f] text-[#d0c5af] space-y-3">
            <Sparkles className="w-8 h-8 text-[#f2ca50] animate-spin" />
            <span className="font-['Hanken_Grotesk'] text-xs font-bold tracking-widest text-[#f2ca50]">
              CHARGEMENT DU MODÈLE 3D ARCHITECTURAL...
            </span>
          </div>
        </model-viewer>

        {/* Floating 3D Badge Overlay */}
        <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2">
          <span className="bg-[#121414]/90 backdrop-blur border border-[#f2ca50]/40 text-[#f2ca50] font-['Hanken_Grotesk'] font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
            MODÈLE BÂTIMENT 3D CERTIFIÉ CK
          </span>
        </div>

        {/* Floor Selection Overlay Tabs */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 bg-[#1a1c1c]/95 backdrop-blur-md p-2 rounded-xl border border-[#f2ca50]/40 shadow-2xl flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-['Hanken_Grotesk'] font-bold text-[#99907c] px-2 tracking-wider flex items-center gap-1 shrink-0">
            <Layers className="w-3.5 h-3.5 text-[#f2ca50]" /> ÉTAGES :
          </span>

          {(['GLOBAL', 'RDC', 'ETAGE_1', 'ROOFTOP'] as const).map((floor) => (
            <button
              key={floor}
              type="button"
              onClick={() => setActiveFloor(floor)}
              className={`text-xs font-['Hanken_Grotesk'] font-bold px-3 py-1.5 rounded-lg transition-all shrink-0 cursor-pointer ${
                activeFloor === floor
                  ? 'bg-[#f2ca50] text-[#3c2f00] shadow-md'
                  : 'bg-[#121414] text-[#d0c5af] hover:text-[#f2ca50] border border-[#4d4635]/40'
              }`}
            >
              {floor === 'GLOBAL' ? 'VUE 3D GLOBALE' : floor === 'RDC' ? 'REZ-DE-CHAUSSÉE' : floor === 'ETAGE_1' ? 'ÉTAGE 1 & SUITES' : 'ROOFTOP & PENTHOUSE'}
            </button>
          ))}
        </div>

      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-['Manrope'] text-[#d0c5af] pt-2 border-t border-[#4d4635]/30">
        <p className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25a475]"></span>
          <span>Faites pivoter la maquette 3D avec votre souris ou doigt pour observer chaque façade.</span>
        </p>
        <span className="font-['Hanken_Grotesk'] font-bold text-[#f2ca50] tracking-wider shrink-0">
          RÉALITÉ AUGMENTÉE (AR) COMPATIBLE SMARTPHONE
        </span>
      </div>

    </div>
  );
};
