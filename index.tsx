
import { RARITY_COLORS, SKINS, CASES } from './constants';
import { UserStats, Skin } from './types';

let state: UserStats = JSON.parse(localStorage.getItem('rs71_save') || 'null') || {
  tanga: 5000,
  xp: 0,
  level: 1,
  inventory: [],
  streak: 0,
  activeTab: 'home',
  lastTap: 0
};

const COOLDOWN_HOURS = 10;
const TAP_REWARD = 2500;

function save() {
  localStorage.setItem('rs71_save', JSON.stringify(state));
}

const updateHeader = () => {
  const balanceEl = document.getElementById('balance-display');
  const levelEl = document.getElementById('user-level');
  if (balanceEl) balanceEl.innerText = Math.floor(state.tanga).toLocaleString();
  if (levelEl) levelEl.innerText = state.level.toString();
};

const addTanga = (amount: number) => {
  state.tanga += amount;
  state.xp += Math.floor(amount / 20);
  state.level = Math.floor(Math.sqrt(state.xp / 100)) + 1;
  updateHeader();
  save();
};

const sellSkin = (index: number) => {
  const skinId = state.inventory[index];
  const skin = SKINS.find(s => s.id === skinId);
  if (!skin) return;

  const sellPrice = Math.floor(skin.price * 0.7);
  if (confirm(`${skin.weapon} | ${skin.name}ni ${sellPrice} Tangaga sotmoqchimisiz?`)) {
    state.inventory.splice(index, 1);
    addTanga(sellPrice);
    (window as any).router.navigate('inventory');
  }
};

const withdrawSteam = () => {
  alert("Steam orqali chiqarish funksiyasi 28-fevral kuni ochiladi!");
};

const handleTap = () => {
  const now = Date.now();
  const cooldownMs = COOLDOWN_HOURS * 60 * 60 * 1000;
  if (now - state.lastTap < cooldownMs) return;
  state.lastTap = now;
  addTanga(TAP_REWARD);
  (window as any).router.navigate('home');
};

const openCase = (caseId: string) => {
  const c = CASES.find(x => x.id === caseId);
  if (!c || state.tanga < c.cost) return alert("Mablag' yetarli emas!");

  state.tanga -= c.cost;
  updateHeader();

  // Probability logic: 1 in 12 chance for "Good" items (Epic+)
  const isLucky = Math.random() < 0.083; // ~1/12
  const availableSkins = SKINS.filter(s => c.skins.includes(s.id));
  
  let winSkin: Skin;
  if (isLucky) {
    const highTier = availableSkins.filter(s => ['Legendary', 'Contraband', 'Epic'].includes(s.rarity));
    winSkin = highTier.length > 0 ? highTier[Math.floor(Math.random() * highTier.length)] : availableSkins[0];
  } else {
    const lowTier = availableSkins.filter(s => !['Legendary', 'Contraband', 'Epic'].includes(s.rarity));
    winSkin = lowTier.length > 0 ? lowTier[Math.floor(Math.random() * lowTier.length)] : availableSkins[0];
  }

  const modal = document.getElementById('unboxing-modal')!;
  const carousel = document.getElementById('unboxing-carousel')!;
  const resultDiv = document.getElementById('unboxing-result')!;
  const resultName = document.getElementById('result-name')!;

  modal.style.display = 'flex';
  resultDiv.style.opacity = '0';
  carousel.style.transition = 'none';
  carousel.style.transform = 'translateX(0)';
  carousel.innerHTML = '';

  for (let i = 0; i < 40; i++) {
    const skin = (i === 35) ? winSkin : SKINS[Math.floor(Math.random() * SKINS.length)];
    const div = document.createElement('div');
    div.className = "flex-shrink-0 w-24 h-32 glass-card rounded-lg flex flex-col items-center justify-between p-2 border-b-4";
    div.style.borderColor = RARITY_COLORS[skin.rarity];
    div.innerHTML = `<img src="${skin.imageUrl}" class="w-full h-16 object-contain"><div class="text-center"><p class="text-[8px] font-bold text-gray-500 uppercase">${skin.weapon}</p><p class="text-[10px] font-bold truncate w-20">${skin.name}</p></div>`;
    carousel.appendChild(div);
  }

  setTimeout(() => {
    carousel.style.transition = 'transform 5s cubic-bezier(0.1, 0, 0.1, 1)';
    carousel.style.transform = 'translateX(calc(-35 * 100px + 50% - 50px))';
  }, 50);

  setTimeout(() => {
    resultDiv.style.opacity = '1';
    resultName.innerText = `${winSkin.weapon} | ${winSkin.name}`;
    resultName.style.color = RARITY_COLORS[winSkin.rarity];
    state.inventory.push(winSkin.id);
    save();
    setTimeout(() => { modal.style.display = 'none'; }, 3000);
  }, 5500);
};

(window as any).router = {
  navigate: (tab: string) => {
    state.activeTab = tab;
    renderView();
  }
};
(window as any).handleTap = handleTap;
(window as any).openCase = openCase;
(window as any).sellSkin = sellSkin;
(window as any).withdrawSteam = withdrawSteam;

function renderView() {
  const container = document.getElementById('view-container')!;
  const tab = state.activeTab;

  if (tab === 'home') {
    const now = Date.now();
    const cooldownMs = COOLDOWN_HOURS * 60 * 60 * 1000;
    const diff = now - state.lastTap;
    const isReady = diff >= cooldownMs;

    container.innerHTML = `
      <div class="space-y-6">
        <div class="glass-card rounded-2xl p-4 border-l-4 border-cyan-500">
           <h3 class="text-xs font-bold text-gray-500 uppercase">Miner Status</h3>
           <p class="text-lg font-orbitron font-bold">${isReady ? 'READY TO EXTRACT' : 'MINING...'}</p>
        </div>
        <div class="flex flex-col items-center py-8">
          <button id="tap-btn" onclick="handleTap()" ${!isReady ? 'disabled' : ''} 
            class="w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all ${isReady ? 'bg-cyan-500 text-black shadow-[0_0_40px_rgba(6,182,212,0.6)]' : 'bg-gray-800 text-gray-500'}">
            <span class="font-orbitron font-black text-2xl">${isReady ? 'START' : 'WAIT'}</span>
            <span id="cooldown-timer" class="text-[10px] font-bold mt-1"></span>
          </button>
          <p class="mt-4 text-[10px] text-gray-500 uppercase tracking-widest">+${TAP_REWARD} Tanga every 10h</p>
        </div>
      </div>
    `;

    if (!isReady) {
      const itv = setInterval(() => {
        const remaining = cooldownMs - (Date.now() - state.lastTap);
        if (remaining <= 0) { clearInterval(itv); renderView(); return; }
        const h = Math.floor(remaining / 3600000);
        const m = Math.floor((remaining % 3600000) / 60000);
        const s = Math.floor((remaining % 60000) / 1000);
        const el = document.getElementById('cooldown-timer');
        if (el) el.innerText = `${h}h ${m}m ${s}s`;
      }, 1000);
    }
  } else if (tab === 'cases') {
    container.innerHTML = `<div class="grid grid-cols-2 gap-4 pb-12">${CASES.map(c => `<div class="glass-card rounded-2xl p-4 flex flex-col items-center gap-3 border-b-4" style="border-bottom-color: ${c.color}"><div class="text-4xl">📦</div><h3 class="font-bold text-[10px] uppercase">${c.name}</h3><div class="font-orbitron font-bold text-xs">$${c.cost.toLocaleString()}</div><button onclick="openCase('${c.id}')" class="w-full py-2 bg-white text-black rounded-lg text-[9px] font-black uppercase">Ochish</button></div>`).join('')}</div>`;
  } else if (tab === 'inventory') {
    const owned = state.inventory.map(id => SKINS.find(s => s.id === id)).filter(Boolean);
    container.innerHTML = `<div class="space-y-3 pb-12">${owned.length === 0 ? '<p class="text-center py-20 text-gray-600">Bo\'sh</p>' : owned.map((skin, idx) => `<div class="glass-card rounded-xl p-3 flex items-center gap-3 border-r-4" style="border-right-color: ${RARITY_COLORS[skin!.rarity]}"><img src="${skin!.imageUrl}" class="w-12 h-10 object-contain"><div class="flex-1 min-w-0"><p class="text-[8px] text-gray-500 font-bold uppercase truncate">${skin!.weapon}</p><h4 class="text-[10px] font-bold truncate">${skin!.name}</h4><p class="text-[10px] font-orbitron text-orange-400">$${skin!.price}</p></div><div class="flex flex-col gap-1"><button onclick="sellSkin(${idx})" class="px-2 py-1 bg-red-500/10 text-red-500 rounded text-[7px] font-black uppercase border border-red-500/10">Sotish</button><button onclick="withdrawSteam()" class="px-2 py-1 bg-cyan-500/10 text-cyan-500 rounded text-[7px] font-black uppercase border border-cyan-500/10">Steam</button></div></div>`).reverse().join('')}</div>`;
  } else if (tab === 'tasks') {
    container.innerHTML = `
      <div class="space-y-4">
        <h2 class="text-sm font-orbitron font-bold uppercase tracking-widest">Vazifalar</h2>
        <div class="space-y-3">
          <div class="glass-card p-4 rounded-xl flex items-center justify-between border-l-4 border-cyan-500">
            <div><p class="font-bold text-xs uppercase">Telegram Kanal 1</p><p class="text-[10px] text-cyan-400">+200 TANGA</p></div>
            <button class="bg-cyan-500 text-black px-3 py-1.5 rounded-lg text-[10px] font-bold">AZO BO'LISH</button>
          </div>
          <div class="glass-card p-4 rounded-xl flex items-center justify-between border-l-4 border-cyan-500">
            <div><p class="font-bold text-xs uppercase">Telegram Kanal 2</p><p class="text-[10px] text-cyan-400">+150 TANGA</p></div>
            <button class="bg-cyan-500 text-black px-3 py-1.5 rounded-lg text-[10px] font-bold">AZO BO'LISH</button>
          </div>
          <div class="glass-card p-4 rounded-xl flex items-center justify-between border-l-4 border-cyan-500">
            <div><p class="font-bold text-xs uppercase">Do'stlarni taklif qilish</p><p class="text-[10px] text-cyan-400">+1000 TANGA</p></div>
            <button class="bg-cyan-500 text-black px-3 py-1.5 rounded-lg text-[10px] font-bold">ULASHISH</button>
          </div>
        </div>
      </div>
    `;
  }
}

updateHeader();
renderView();
