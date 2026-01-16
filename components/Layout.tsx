
import React from 'react';
import { Home, Briefcase, ListTodo, Trophy, Package } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  balance: number;
  level: number;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, balance, level }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Miner' },
    { id: 'cases', icon: Package, label: 'Cases' },
    { id: 'inventory', icon: Briefcase, label: 'Vault' },
    { id: 'tasks', icon: ListTodo, label: 'Tasks' },
    { id: 'ranks', icon: Trophy, label: 'Top' },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto relative overflow-hidden bg-[#050507]">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-orbitron text-cyan-400 font-bold">
            {level}
          </div>
          <div>
            <h1 className="text-xs text-gray-400 uppercase tracking-widest font-bold">Recruit</h1>
            <p className="text-sm font-semibold">GHOST_USER</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <span className="text-orange-500 font-bold">$</span>
          <span className="font-orbitron text-sm font-bold tracking-tighter">{balance.toLocaleString()}</span>
          <span className="text-[10px] text-orange-400 opacity-70 font-bold uppercase">Tanga</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4 custom-scrollbar">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-4 left-4 right-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex justify-around items-center z-30 shadow-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
                isActive ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-bold uppercase tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
