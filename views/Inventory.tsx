
import React from 'react';
import { UserStats } from '../types';
import { SKINS, RARITY_COLORS } from '../constants';
import { Search, Filter, History } from 'lucide-react';

interface InventoryProps {
  inventory: string[];
}

const Inventory: React.FC<InventoryProps> = ({ inventory }) => {
  const ownedSkins = inventory.map(id => SKINS.find(s => s.id === id)).filter(Boolean);
  
  const totalValue = ownedSkins.reduce((acc, skin) => acc + (skin?.price || 0), 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500 pb-10">
      {/* Stats Summary */}
      <div className="flex gap-4">
        <div className="flex-1 glass-card rounded-2xl p-4 border-l-4 border-cyan-500">
           <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total Items</p>
           <p className="text-xl font-orbitron font-bold">{ownedSkins.length}</p>
        </div>
        <div className="flex-1 glass-card rounded-2xl p-4 border-l-4 border-orange-500">
           <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Est. Value</p>
           <p className="text-xl font-orbitron font-bold">${totalValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
           <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
           <input 
             type="text" 
             placeholder="Search items..." 
             className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-cyan-500/50"
           />
        </div>
        <button className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-gray-500">
          <Filter size={18} />
        </button>
      </div>

      {ownedSkins.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-30 gap-4">
          <History size={64} />
          <p className="font-bold uppercase tracking-widest text-sm">Vault is empty</p>
          <p className="text-xs max-w-[200px] text-center">Open some cases to start your collection!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {ownedSkins.map((skin, idx) => skin && (
            <div key={`${skin.id}-${idx}`} className="glass-card rounded-xl p-2 border-b-2" style={{ borderBottomColor: RARITY_COLORS[skin.rarity] }}>
              <div className="aspect-square bg-black/40 rounded-lg flex items-center justify-center overflow-hidden mb-2">
                 <img src={skin.imageUrl} alt={skin.name} className="w-full h-full object-cover opacity-80" />
              </div>
              <div>
                <p className="text-[8px] text-gray-500 font-black uppercase truncate">{skin.weapon}</p>
                <h4 className="text-[10px] font-bold truncate">{skin.name}</h4>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-white/5" style={{ color: RARITY_COLORS[skin.rarity] }}>{skin.rarity}</span>
                  <span className="text-[10px] font-orbitron text-orange-400">${skin.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;
