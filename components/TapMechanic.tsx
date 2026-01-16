
import React, { useState, useEffect, useCallback } from 'react';
import { DollarSign, Star, Zap, Shield, Timer } from 'lucide-react';

interface TapMechanicProps {
  onReward: (amount: number) => void;
}

const SYMBOLS = [
  { icon: DollarSign, color: 'text-green-400', value: 200, label: 'DOLLAR' },
  { icon: Star, color: 'text-yellow-400', value: 150, label: 'GOLD' },
  { icon: Zap, color: 'text-gray-300', value: 100, label: 'SILVER' },
  { icon: Shield, color: 'text-orange-800', value: 70, label: 'BRONZE' },
];

const TapMechanic: React.FC<TapMechanicProps> = ({ onReward }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(true);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isSpinning) {
      interval = window.setInterval(() => {
        setRotation(r => (r + 15) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isSpinning]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsSpinning(true);
    }
  }, [cooldown]);

  const handleTap = () => {
    if (!isSpinning || cooldown > 0) return;

    setIsSpinning(false);
    
    // Determine landing symbol based on rotation
    // In a real app, this would be server-side
    const index = Math.floor(Math.random() * SYMBOLS.length);
    const symbol = SYMBOLS[index];
    
    onReward(symbol.value);
    setCooldown(5); // 5 second cooldown
  };

  return (
    <div className="flex flex-col items-center gap-6 my-8">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Background glow */}
        <div className="absolute inset-0 bg-cyan-500/10 blur-[60px] rounded-full"></div>
        
        {/* Outer Ring */}
        <div className="absolute inset-0 border-2 border-dashed border-cyan-500/20 rounded-full animate-spin-slow"></div>
        
        {/* Symbols ring */}
        <div 
          className="relative w-full h-full transition-transform duration-300 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {SYMBOLS.map((S, i) => {
            const Icon = S.icon;
            const angle = (i * 360) / SYMBOLS.length;
            return (
              <div 
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ transform: `rotate(${angle}deg) translateY(-90px) rotate(-${angle}deg)` }}
              >
                <div className={`w-12 h-12 rounded-xl glass-card flex items-center justify-center border border-white/10 ${S.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Tap Button */}
        <button
          onClick={handleTap}
          disabled={cooldown > 0}
          className={`absolute w-32 h-32 rounded-full z-10 flex flex-col items-center justify-center transition-all ${
            cooldown > 0 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed border-4 border-gray-700' 
              : 'bg-cyan-500 text-black hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.5)] border-4 border-cyan-300'
          }`}
        >
          {cooldown > 0 ? (
            <>
              <Timer size={32} />
              <span className="font-orbitron font-bold text-xl">{cooldown}s</span>
            </>
          ) : (
            <>
              <span className="font-orbitron font-black text-2xl tracking-tighter">TAP</span>
              <span className="text-[10px] font-bold uppercase tracking-widest mt-1">RS-71 CORE</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        {SYMBOLS.map((S, i) => (
          <div key={i} className="glass-card rounded-lg p-2 flex items-center gap-2 border-l-2 border-cyan-500">
            <S.icon size={16} className={S.color} />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase leading-none">{S.label}</span>
              <span className="text-xs font-orbitron font-bold">+{S.value} T</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TapMechanic;
