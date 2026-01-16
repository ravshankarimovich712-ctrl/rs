
import React from 'react';
import { Case } from '../types';
import { CASES } from '../constants';
import { PackageOpen, Sparkles } from 'lucide-react';

interface CasesProps {
  onOpenCase: (caseId: string) => void;
  balance: number;
}

const Cases: React.FC<CasesProps> = ({ onOpenCase, balance }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-orbitron font-bold tracking-widest uppercase">Case Shop</h2>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Luck is with you</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {CASES.map((c) => {
          const canAfford = balance >= c.cost;
          return (
            <div 
              key={c.id}
              className={`glass-card rounded-2xl p-4 flex flex-col items-center gap-3 border-b-4 transition-all active:scale-95 ${canAfford ? 'opacity-100 hover:border-cyan-500/50' : 'opacity-60 grayscale'}`}
              style={{ borderBottomColor: c.color }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-white/20 blur-[20px] rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                <PackageOpen size={64} className="relative z-10" style={{ color: c.color }} />
              </div>
              
              <div className="text-center">
                <h3 className="font-bold text-sm uppercase">{c.name}</h3>
                <p className="text-[10px] text-gray-500 font-medium mb-2">{c.description}</p>
                <div className="flex items-center justify-center gap-1 font-orbitron font-bold">
                   <span className="text-orange-500 text-xs">$</span>
                   <span className="text-sm">{c.cost.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => onOpenCase(c.id)}
                disabled={!canAfford}
                className={`w-full py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  canAfford ? 'bg-white text-black hover:bg-cyan-500' : 'bg-white/5 text-gray-500 cursor-not-allowed'
                }`}
              >
                Open Case
              </button>
            </div>
          );
        })}
      </div>

      {/* Special Offer */}
      <div className="relative overflow-hidden glass-card rounded-2xl p-6 border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black/40">
        <div className="absolute top-0 right-0 p-2 bg-purple-500 text-[8px] font-black uppercase rounded-bl-xl tracking-tighter">Hot</div>
        <Sparkles className="absolute -bottom-4 -left-4 text-purple-500/20" size={100} />
        
        <div className="relative z-10">
          <h3 className="text-lg font-orbitron font-bold text-purple-400">KNIFE CASE</h3>
          <p className="text-xs text-gray-400 mb-4 max-w-[200px]">Guaranteed 100% Contraband drop rate. The ultimate collection piece.</p>
          <div className="flex items-center gap-2">
            <span className="text-orange-500 font-bold">$</span>
            <span className="text-xl font-orbitron font-bold">100,000,000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cases;
