import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside 
      aria-label="Promotion"
      className="relative z-50 flex items-center justify-between px-4 py-2 text-xs font-medium text-slate-200 bg-[#12151D] border-b border-white/5 h-10 max-h-10 overflow-hidden"
    >
      <div className="mx-auto flex items-center gap-2 truncate">
        <Sparkles className="w-3.5 h-3.5 text-[#00F0B5] shrink-0" aria-hidden="true" />
        <span className="truncate">
          Global express air shipping on all bespoke rigs & orders over $150
        </span>
        <span className="hidden sm:inline text-slate-500" aria-hidden="true">·</span>
        <span className="hidden sm:inline text-[#00F0B5] font-semibold">
          Use code ESPORTS10 for 10% off
        </span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="p-1 text-slate-400 hover:text-white transition-colors shrink-0 rounded"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
