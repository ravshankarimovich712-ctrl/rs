
import { Skin, Case, Rarity } from './types';

export const RARITY_COLORS: Record<Rarity, string> = {
  Common: '#b0c3d9',
  Uncommon: '#5e98d9',
  Rare: '#4b69ff',
  Epic: '#8847ff',
  Legendary: '#d32ce6',
  Contraband: '#eb4b4b',
};

export const SKINS: Skin[] = [
  // Common
  { id: 'g1', weapon: 'Glock-18', name: 'Candy Apple', rarity: 'Common', price: 200, imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0v73fyhB4Nm3hr-Kk_L-Pr7Vn35cppRz272S89jw0A3j-0ttYm71LdCcdgc-NF-Brle5x-vph565u5_AnXFku3Zz7H_cnBOpwUYbiS8Yl_M' },
  { id: 'p1', weapon: 'P250', name: 'Sand Dune', rarity: 'Common', price: 50, imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujbEgdi1_v3fDhG_926hIWFkvvLP7LWnn8f65By0r-Y9I2i0ALl-0ZpYmD6cY_AdlA8M1vS-AK3w7rujJ-8u8_An3Vlv3V07H_cnBOpwUYbrv9EowU' },
  // Rare/Epic
  { id: 'ak1', weapon: 'AK-47', name: 'Asimov', rarity: 'Legendary', price: 7500, imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjx2jJemkV09-5lpKKqPrxN7LEmyVQ7MEpiLuSrY6ki1K1_UtvNm_3I4-ccVNsYF6Frle5k-7m1sfuv53OzGwj5Hev96U2' },
  { id: 'u1', weapon: 'USP-S', name: 'Kill Confirmed', rarity: 'Legendary', price: 9000, imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujbeRdhx2jJemkV09-5lpKKqPrxN7LEmyVS6pBy37uW8I2i2Fex-kY-YmqlctKccVRtZlyDq1S5k-3vgp-9v5nBzGwj5Hd7L0N6' },
  // Contraband
  { id: 'awp1', weapon: 'AWP', name: 'Dragon Lore', rarity: 'Contraband', price: 55000, imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m560lvL3PYTdn2xZ_It02rHCpIn33gS3rkttMDj6I9Scc1U7YV_U8gO4wO7vgpC9u5_AnXFgu3Zz7H_cnBOpwUYbiS8Yl_M' },
  { id: 'k1', weapon: 'Karambit', name: 'Doppler', rarity: 'Contraband', price: 120000, imageUrl: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20mvbmPbLgqWpD78BmfuzOyoHwjF2hqiE1YmHycY_AdAU2Z1_R-VDrxL3sh5C7uJvIz3ZguSRw7X_cmxe1hR0YarNxxavJGp89R_A' },
];

export const CASES: Case[] = [
  { id: 'basic', name: 'Basic', description: 'Oddiy narsalar', cost: 700, color: '#607d8b', skins: ['g1', 'p1', 'ak1'] },
  { id: 'gentra', name: 'Gentra', description: 'O\'rtacha keys', cost: 2400, color: '#9e9e9e', skins: ['g1', 'ak1', 'u1'] },
  { id: '571', name: '571', description: 'Eksklyuziv', cost: 2900, color: '#ff9800', skins: ['ak1', 'u1'] },
  { id: 'tank', name: 'Tank', description: 'Og\'ir qurollar', cost: 3200, color: '#4caf50', skins: ['ak1', 'awp1'] },
  { id: 'malibu', name: 'Malibu', description: 'Yozgi kayfiyat', cost: 3600, color: '#00bcd4', skins: ['u1', 'ak1', 'awp1'] },
  { id: 'diamond', name: 'Diamond', description: 'Eng qimmat qurollar', cost: 25000, color: '#2196f3', skins: ['awp1', 'k1'] },
  { id: 'knife', name: 'Knife Case', description: 'Faqat pichoqlar', cost: 100000000, color: '#9c27b0', skins: ['k1'] },
];
