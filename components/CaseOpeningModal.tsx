
import React, { useState, useEffect, useRef } from 'react';
import { Skin, Rarity } from '../types';
import { SKINS, RARITY_COLORS } from '../constants';

interface CaseOpeningModalProps {
  isOpen: boolean;
  onClose: (skin: Skin) => void;
  resultSkin: Skin;
}

const CaseOpeningModal: React.FC<CaseOpeningModalProps> = ({ isOpen, onClose, resultSkin }) => {
  const [isSpinning, setIsSpinning] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Create a long list for the animation
  const animationItems = React.useMemo(() => {
    const list = [];
    for (let i = 0; i < 40; i++) {
        list.push(SKINS[Math.floor(Math.random() * SKINS.length)]);
    }
    list[35] = resultSkin; // Place the winner
    return list;
  }, [resultSkin]);

  useEffect(() => {
    if (isOpen) {
      setIsSpinning(true);
      const timer = setTimeout(() => {
        setIsSpinning(false);
        // Delay callback to show result
        setTimeout(() => onClose(resultSkin), 2000);
      }, 5000); // 5s spin duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, resultSkin]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/95 backdrop-blur-xl">
      <div className="w-full max-w-md relative flex flex-col items-center">
        <h2 className="text-xl font-orbitron font-bold text-cyan-400 mb-8 uppercase tracking-widest animate-pulse">
          Unboxing...
        </h2>

        {/* The Carousel */}
        <div className="relative w-full h-40 overflow-hidden border-y border-white/10 bg-black/40 shadow-inner">
          {/* Picker line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400 z-10 shadow-[0_0_10px_#facc15]"></div>
          
          <div 
            ref={scrollRef}
            className={`flex items-center gap-1 transition-transform duration-[5000ms] ease-[cubic-bezier(0.1,0,0.1,1)] h-full ${isSpinning ? '' : ''}`}
            style={{ 
                transform: isSpinning 
                    ? `translateX(0px)` 
                    : `translateX(calc(-35 * 110px + 50% - 55px))` // Center the 35th item
            }}
          >
            {animationItems.map((skin, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-24 h-32 glass-card rounded-lg flex flex-col items-center justify-between p-2 border-b-4"
                style={{ borderColor: RARITY_COLORS[skin.rarity] }}
              >
                <img src={skin.imageUrl} className="w-full h-16 object-contain rounded" />
                <div className="text-center">
                   <p className="text-[8px] font-bold text-gray-400 uppercase truncate w-20">{skin.weapon}</p>
                   <p className="text-[10px] font-bold truncate w-20 leading-tight">{skin.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Result Card */}
        {!isSpinning && (
          <div className="mt-8 animate-bounce text-center">
            <span className="text-sm text-gray-400 font-bold uppercase tracking-tighter">You received</span>
            <div className="text-xl font-orbitron font-bold" style={{ color: RARITY_COLORS[resultSkin.rarity] }}>
              {resultSkin.weapon} | {resultSkin.name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseOpeningModal;
