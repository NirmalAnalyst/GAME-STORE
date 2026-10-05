import React, { useState } from 'react';
import { BATTLESTATIONS } from '../data/battlestations';
import { Product } from '../types/gaming';
import { PRODUCTS, battlestationHeroImg } from '../data/products';
import { Plus, Check, Eye, Sparkles } from 'lucide-react';

interface BattlestationsProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const Battlestations: React.FC<BattlestationsProps> = ({
  onQuickView,
  onAddToCart,
}) => {
  const currentSetup = BATTLESTATIONS[0];
  const [activeHotspotId, setActiveHotspotId] = useState<string>(currentSetup.hotspots[0].id);

  const activeHotspot = currentSetup.hotspots.find((h) => h.id === activeHotspotId);
  const activeProduct = PRODUCTS.find((p) => p.id === activeHotspot?.productId);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#00F0B5] uppercase font-mono">
          <span>Pro Battlestations</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span>Gear Hotspot Explorer</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Inspect Pro Tour Battlestations
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Hover or click on the interactive markers below to inspect the exact esports peripherals, audio setup, and custom hardware running on the stage.
        </p>
      </div>

      {/* Interactive Visual Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Photo with Pins (8 cols) */}
        <div className="lg:col-span-8 relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-[#111319] shadow-2xl">
          <img
            src={battlestationHeroImg}
            alt="Pro esports desk setup"
            className="w-full h-full object-cover object-center filter brightness-[0.85]"
            referrerPolicy="no-referrer"
          />

          {/* Scrim overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Hotspot Pins */}
          {currentSetup.hotspots.map((spot) => {
            const isSelected = activeHotspotId === spot.id;
            return (
              <div
                key={spot.id}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <button
                  onClick={() => setActiveHotspotId(spot.id)}
                  className={`group relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00F0B5] text-slate-950 scale-125 shadow-lg shadow-[#00F0B5]/50 ring-4 ring-[#00F0B5]/30'
                      : 'bg-black/80 hover:bg-[#00F0B5] text-white hover:text-slate-950 border border-white/30'
                  }`}
                  aria-label={`Inspect ${spot.label}`}
                >
                  <Plus className={`w-4 h-4 transition-transform duration-200 ${isSelected ? 'rotate-45' : ''}`} />
                </button>

                {/* Floating mini tool-tip badge */}
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded bg-[#0D0F15]/95 border border-white/15 text-[11px] font-mono whitespace-nowrap text-white pointer-events-none transition-opacity ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {spot.label} · ${spot.price}
                </div>
              </div>
            );
          })}

          {/* Bottom Setup Title Tag */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
            <div>
              <span className="font-bold">{currentSetup.title}</span>
              <span className="text-slate-400 ml-2 font-mono">{currentSetup.player}</span>
            </div>
            <div className="text-[#00F0B5] font-mono hidden sm:inline">
              5 Hotspots Available
            </div>
          </div>
        </div>

        {/* Selected Gear Inspector Card (4 cols) */}
        <div className="lg:col-span-4 bg-[#11131A] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Hardware Inspector
            </span>
            <span className="text-xs text-[#00F0B5] font-mono">Active Target</span>
          </div>

          {activeProduct ? (
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#161922] border border-white/10 relative">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {activeProduct.badge && (
                  <div className="absolute top-2.5 left-2.5 text-[10px] font-mono uppercase bg-black/80 px-2 py-0.5 rounded text-[#00F0B5] border border-white/10">
                    {activeProduct.badge}
                  </div>
                )}
              </div>

              <div>
                <div className="text-xs text-slate-400 font-mono uppercase">
                  {activeProduct.subCategory}
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  {activeProduct.name}
                </h3>
                <div className="text-xl font-bold text-[#00F0B5] font-mono mt-1 tabular-nums">
                  ${activeProduct.price}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {activeProduct.description}
              </p>

              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => onAddToCart(activeProduct)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-[#00F0B5] hover:bg-[#00d6a2] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-[#00F0B5]/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add This Gear to Bag</span>
                </button>

                <button
                  onClick={() => onQuickView(activeProduct)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>Inspect Full Specifications</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 py-12 text-center font-mono">
              Click any pin on the battlestation to view details
            </div>
          )}

          {/* Quick Roster of all gear in this setup */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
              All Equipment in this Setup
            </span>
            <div className="space-y-1.5">
              {currentSetup.hotspots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspotId(spot.id)}
                  className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    activeHotspotId === spot.id
                      ? 'bg-white/10 text-[#00F0B5]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="truncate pr-2">{spot.label}</span>
                  <span className="font-mono tabular-nums text-slate-300">${spot.price}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
