import { BattlestationSetup } from '../types/gaming';

export const BATTLESTATIONS: BattlestationSetup[] = [
  {
    id: 'setup-stealth-fps',
    title: 'The Apex Stealth Battlestation',
    player: 'KAI // Pro CS2 & Valorant IGL',
    role: 'Competitive Tactical Setup',
    description:
      'Engineered for tournament play: 540Hz QD-OLED vision, zero-friction glass skates on high-density Cordura, and custom 75% rapid trigger magnetic keyboard.',
    accentColor: '#00F0B5',
    hotspots: [
      {
        id: 'spot-1',
        x: 48,
        y: 68,
        productId: 'valkyrie-forge-75',
        label: 'Valkyrie Forge 75',
        sublabel: 'Magnetic Hall-Effect · 0.1mm Rapid Trigger',
        price: 219,
      },
      {
        id: 'spot-2',
        x: 64,
        y: 72,
        productId: 'valkyrie-phantom-8k',
        label: 'Valkyrie Phantom 8K',
        sublabel: '46g Magnesium Wireless · 8000Hz Polling',
        price: 159,
      },
      {
        id: 'spot-3',
        x: 50,
        y: 35,
        productId: 'valkyrie-horizon-32',
        label: 'Valkyrie Horizon 32 OLED',
        sublabel: '4K 240Hz · 0.03ms QD-OLED',
        price: 999,
      },
      {
        id: 'spot-4',
        x: 28,
        y: 52,
        productId: 'valkyrie-sonar-planar',
        label: 'Valkyrie Sonar Planar',
        sublabel: 'Open-Back 90mm Planar Magnetic Headset',
        price: 299,
      },
      {
        id: 'spot-5',
        x: 82,
        y: 42,
        productId: 'valkyrie-apex-titan-rig',
        label: 'Valkyrie Apex Titan Custom Rig',
        sublabel: 'Ryzen 7 9800X3D + RTX 5090 Flagship',
        price: 3699,
      },
    ],
  },
];
