import React from 'react';
import { ArrowRight, Cpu, Zap, ShieldCheck } from 'lucide-react';
import { battlestationHeroImg } from '../data/products';

interface HeroProps {
  onExploreGear: () => void;
  onOpenBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreGear, onOpenBuilder }) => {
  return (
    <section className="relative w-full border-b border-white/[0.08] overflow-hidden bg-[#090A0D]">
      {/* Background Hero Image with Measured Contrast Scrim */}
      <div className="relative aspect-[21/9] min-h-[520px] max-h-[680px] w-full overflow-hidden">
        <img
          src={battlestationHeroImg}
          alt="Precision esports battlestation featuring custom aluminum mechanical keyboard, ultralight wireless mouse, and high-refresh QD-OLED display"
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.08] scale-100 transition-transform duration-700 hover:scale-[1.02]"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Scrims ensuring WCAG AA 4.5:1 contrast across all viewports */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D] via-[#090A0D]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090A0D] via-[#090A0D]/60 to-transparent" />

        {/* Hero Foreground Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl space-y-6">
              {/* Unboxed Kicker Metadata */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#00F0B5] uppercase font-mono">
                <span>Valkyrie Laboratory</span>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <span>Season 2026 Competitive Drop</span>
              </div>

              {/* Main Headline with balanced wrap */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-display leading-[1.08] [text-wrap:balance]">
                Tools Forged for Pure Competition
              </h1>

              {/* Body prose */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal [text-wrap:pretty]">
                Sub-millimeter actuation, 8000Hz polling optical microswitches, and zero-compromise thermal architecture. Built exclusively for players who prioritize frame times and absolute mechanical precision.
              </p>

              {/* 2 Primary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onExploreGear}
                  className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-[#00F0B5] hover:bg-[#00d6a2] rounded-lg transition-all duration-150 shadow-md shadow-[#00F0B5]/20 active:scale-[0.98] whitespace-nowrap cursor-pointer"
                >
                  <span>Explore Tournament Gear</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenBuilder}
                  className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg transition-all duration-150 active:scale-[0.98] whitespace-nowrap backdrop-blur-sm cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-[#38BDF8]" />
                  <span>Configure Custom Rig</span>
                </button>
              </div>

              {/* Claim-to-Proof Adjacent Quantitative Metrics */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-6 sm:gap-8 max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">
                    0.02<span className="text-sm font-normal text-slate-400">ms</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">
                    Magnetic Actuation
                  </div>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">
                    46<span className="text-sm font-normal text-slate-400">g</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">
                    Magnesium Exoskeleton
                  </div>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#00F0B5] font-mono tabular-nums">
                    8000<span className="text-sm font-normal text-slate-400">Hz</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">
                    True USB & Wireless
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="bg-[#0C0E14] border-t border-white/[0.06] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#00F0B5]" />
            <span className="text-slate-300 font-medium">Rapid Trigger Firmware</span>
            <span>— 0.01mm Dynamic Stroke Reset</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
            <span className="text-slate-300 font-medium">3-Year Factory Warranty</span>
            <span>— Advanced Cross-Ship Replacement</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span className="text-slate-300 font-medium">In-Stock Warehouses</span>
            <span>— Same-Day Dispatch Before 4 PM EST</span>
          </div>
        </div>
      </div>
    </section>
  );
};
