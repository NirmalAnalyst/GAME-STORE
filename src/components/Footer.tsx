import React from 'react';
import { Shield, Sparkles, Send } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#08090C] border-t border-white/[0.08] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <span className="text-xl font-bold tracking-widest text-white font-display uppercase">
              VALKYRIE
            </span>
            <p className="text-slate-400 leading-relaxed text-xs">
              Precision esports hardware studio. We engineer analog Hall-Effect keyboards, ultralight magnesium chassis mice, and high-framerate battlestations for top-tier competitive play.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Designed in Gothenburg & Tokyo
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-mono">
              Hardware Roster
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('store')}
                  className="hover:text-white transition-colors"
                >
                  Keyboards & Rapid Trigger
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('store')}
                  className="hover:text-white transition-colors"
                >
                  8000Hz Ultralight Mice
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('store')}
                  className="hover:text-white transition-colors"
                >
                  Planar Studio Audio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('store')}
                  className="hover:text-white transition-colors"
                >
                  QD-OLED High-Refresh Displays
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-mono">
              Interactive Labs
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('builder')}
                  className="hover:text-white transition-colors text-left"
                >
                  Custom Rig Builder & FPS Benchmarker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('switch-studio')}
                  className="hover:text-white transition-colors text-left"
                >
                  Switch & Acoustic Sound Synthesizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('battlestations')}
                  className="hover:text-white transition-colors text-left"
                >
                  Pro Tour Battlestation Inspector
                </button>
              </li>
              <li>
                <span className="text-slate-500 font-mono text-[11px]">
                  Firmware Suite (WebUSB v2.4)
                </span>
              </li>
            </ul>
          </div>

          {/* Service & Guarantee */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-mono">
              Tournament Guarantee
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Every Valkyrie peripheral and custom battlestation is certified with a 3-Year comprehensive replacement warranty and zero-deadzone calibration.
            </p>
            <div className="flex items-center gap-2 text-[#00F0B5] font-mono text-xs pt-1">
              <Shield className="w-4 h-4" />
              <span>Cross-Ship Replacement Guarantee</span>
            </div>
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Valkyrie Precision Gear Co. All rights reserved.
          </div>
          <div className="flex items-center gap-6 font-mono">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>Warranty Claims</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
