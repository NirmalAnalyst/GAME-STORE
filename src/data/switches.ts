import { SwitchProfile } from '../types/gaming';

export const SWITCH_PROFILES: SwitchProfile[] = [
  {
    id: 'magnetic-jade',
    name: 'Valkyrie Magnetic Jade',
    type: 'magnetic',
    actuationDistance: 0.1, // starts at 0.1mm
    totalTravel: 3.5,
    actuationForce: 30,
    soundType: 'thock',
    colorHex: '#00F0B5',
    description:
      'Ultra-sensitive Hall-Effect magnetic switch with continuous analog flux sensing. Features rapid trigger dynamic reset from 0.1mm to 4.0mm with 0.01mm resolution.',
    soundDescription: 'Deep, dense acoustic thock with low housing vibration',
  },
  {
    id: 'linear-titanium',
    name: 'Valkyrie Apex Linear',
    type: 'linear',
    actuationDistance: 1.2,
    totalTravel: 3.6,
    actuationForce: 42,
    soundType: 'clack',
    colorHex: '#38BDF8',
    description:
      'Buttery pre-lubed POM stem on a custom nylon bottom housing. Designed for ultra-rapid double-taps and fluid WASD movement.',
    soundDescription: 'Crisp metallic bottom-out clack with snappy rebound',
  },
  {
    id: 'tactile-obsidian',
    name: 'Valkyrie Tactile Obsidian',
    type: 'tactile',
    actuationDistance: 2.0,
    totalTravel: 3.8,
    actuationForce: 52,
    soundType: 'thock',
    colorHex: '#A855F7',
    description:
      'High-profile D-shape tactile bump right at the very beginning of key stroke. Delivers positive finger confirmation without jarring resistance.',
    soundDescription: 'Full-bodied bass thock with muffled acoustic signature',
  },
  {
    id: 'clicky-crystal',
    name: 'Valkyrie Clickbar Cryo',
    type: 'clicky',
    actuationDistance: 1.8,
    totalTravel: 3.6,
    actuationForce: 50,
    soundType: 'crisp',
    colorHex: '#F59E0B',
    description:
      'Thick tempered clickbar mechanism that generates an acoustic ping on both the downstroke and upstroke for unmatched auditory feedback.',
    soundDescription: 'High-pitch mechanical snap with clean acoustic resonance',
  },
  {
    id: 'silent-frost',
    name: 'Valkyrie Frost Silent Linear',
    type: 'linear',
    actuationDistance: 1.6,
    totalTravel: 3.8,
    actuationForce: 38,
    soundType: 'mute',
    colorHex: '#94A3B8',
    description:
      'Internal dual-layer silicone dampening pads absorbing 92% of keystroke resonance. Ideal for midnight streaming and tournament open mics.',
    soundDescription: 'Velvety silent impact below 26 decibels',
  },
];
