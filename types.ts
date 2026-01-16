
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Contraband';

export interface Skin {
  id: string;
  weapon: string;
  name: string;
  rarity: Rarity;
  price: number;
  imageUrl: string;
}

export interface Case {
  id: string;
  name: string;
  description: string;
  cost: number;
  color: string;
  skins: string[];
}

export interface UserStats {
  tanga: number;
  xp: number;
  level: number;
  inventory: string[];
  lastTap: number; // Timestamp of the last successful tap
  streak: number;
  activeTab: string;
}
