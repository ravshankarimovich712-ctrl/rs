
import React, { useState } from 'react';
import TapMechanic from '../components/TapMechanic';
import { UserStats } from '../types';
import { Calendar, Info, TrendingUp } from 'lucide-react';

interface HomeProps {
  stats: UserStats;
  onReward: (amount: number) => void;
  onClaimDaily: () => void;
}

const Home: React.FC<HomeProps> = ({ stats, onReward, onClaimDaily }) => {
  const [showRewardToast, setShowRewardToast] = useState<number | null>(null);

  const handleReward = (amount: number) => {
    onReward(amount);
    setShowRewardToast(amount);
    setTimeout(() => setShowRewardToast(null), 2000);
  };

  const xpProgress = (stats.xp % 100);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Toast */}
      {showRewardToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-black px-4 py-2 rounded-full font-bold shadow-lg animate-bounce">
          +{showRewardToast} TANGA
        </div>
      )}

      {/* Level Card */}
      <div className="glass-card rounded-2xl p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex justify-between items-end mb-2">
           <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Rank Progress</h3>
              <p className="text-lg font-orbitron font-bold">LEVEL {stats.level}</p>
           </div>
           <span className="text-xs font-bold text-cyan-400">{xpProgress}/100 XP</span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] transition-all duration-500" 
            style={{ width: `${xpProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Main Game */}
      <div className="flex flex-col items-center">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <TrendingUp size={16} /> Live Extraction
        </h2>
        <TapMechanic onReward={handleReward} />
      </div>

      {/* Daily Reward Banner */}
      <div 
        onClick={onClaimDaily}
        className="glass-card rounded-2xl p-4 flex items-center justify-between border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 to-black/20 cursor-pointer active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-inner">
             <Calendar size={24} />
           </div>
           <div>
             <h4 className="font-bold">Daily Check-in</h4>
             <p className="text-xs text-gray-400">Current Streak: {stats.streak} Days</p>
           </div>
        </div>
        <button className="bg-cyan-500 text-black px-4 py-2 rounded-xl font-bold text-xs uppercase shadow-lg">
          Claim
        </button>
      </div>

      {/* Info Notice */}
      <div className="flex gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
        <Info className="text-orange-500 shrink-0" size={20} />
        <p className="text-xs text-orange-200 leading-tight">
          <strong>Important:</strong> External withdrawals via Steam open on February 29th. Collect skins until then!
        </p>
      </div>
    </div>
  );
};

export default Home;
