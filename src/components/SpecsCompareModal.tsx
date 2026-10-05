import React from 'react';
import { X, Trash2, Plus } from 'lucide-react';
import { Product } from '../types/gaming';

interface SpecsCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: Product[];
  onRemoveFromCompare: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const SpecsCompareModal: React.FC<SpecsCompareModalProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  onRemoveFromCompare,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  // Gather unique spec keys across compared items
  const allSpecKeys = Array.from(
    new Set(
      comparedProducts.flatMap((p) => Object.keys(p.specs))
    )
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#11131A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#151822]">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white font-display uppercase tracking-wider">
              Side-by-Side Gear Specification Matrix
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              ({comparedProducts.length} devices)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close compare"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Matrix */}
        <div className="p-6 overflow-x-auto">
          {comparedProducts.length === 0 ? (
            <div className="py-16 text-center text-slate-500 font-mono text-xs">
              No products selected for comparison. Click the compare icon on any product card in the store.
            </div>
          ) : (
            <div className="min-w-[600px] space-y-6">
              {/* Product Header Cards Row */}
              <div className="grid grid-cols-4 gap-4 items-end pb-4 border-b border-white/10">
                <div className="text-xs text-slate-400 font-mono uppercase font-bold">
                  Device Profile
                </div>
                {comparedProducts.map((prod) => (
                  <div key={prod.id} className="space-y-3 relative">
                    <button
                      onClick={() => onRemoveFromCompare(prod.id)}
                      className="absolute top-1 right-1 p-1 text-slate-400 hover:text-rose-400 rounded transition-colors"
                      title="Remove from compare"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-28 object-cover rounded-lg bg-[#181B26] border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white truncate">{prod.name}</h4>
                      <div className="text-sm font-bold text-[#00F0B5] font-mono tabular-nums mt-0.5">
                        ${prod.price}
                      </div>
                    </div>
                    <button
                      onClick={() => onAddToCart(prod)}
                      className="w-full py-1.5 px-3 text-xs font-semibold text-slate-950 bg-[#00F0B5] hover:bg-[#00d6a2] rounded-md transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Specs Rows */}
              <div className="space-y-2">
                {allSpecKeys.map((key) => (
                  <div
                    key={key}
                    className="grid grid-cols-4 gap-4 py-2.5 px-2 rounded-lg text-xs font-mono border-b border-white/5 hover:bg-white/[0.02]"
                  >
                    <div className="text-slate-400 font-medium">{key}</div>
                    {comparedProducts.map((prod) => (
                      <div key={prod.id} className="text-slate-200">
                        {prod.specs[key] || '—'}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
