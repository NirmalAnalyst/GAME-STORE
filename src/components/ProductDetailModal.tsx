import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, Truck, RotateCcw, Plus, Minus } from 'lucide-react';
import { Product } from '../types/gaming';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, variant?: string, color?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      if (product.variants?.options.length) {
        setSelectedVariant(product.variants.options[0].name);
      } else {
        setSelectedVariant('');
      }
      if (product.colors?.length) {
        setSelectedColor(product.colors[0].name);
      } else {
        setSelectedColor('');
      }
      setQuantity(1);
      setAddedNotice(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedVariant || undefined, selectedColor || undefined);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
    }, 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#11131A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white bg-black/40 hover:bg-black/80 border border-white/10 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Gallery / Visual Column */}
          <div className="p-6 sm:p-8 bg-[#151822] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-white/10">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 text-xs font-semibold tracking-wider uppercase text-[#00F0B5] bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Hardware Highlights Strip */}
              <div className="bg-[#0E1017] p-3 rounded-lg border border-white/5 space-y-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                  Engineered Highlights
                </span>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-[#00F0B5]">
                  {product.highlightSpecs.map((h, i) => (
                    <span key={i} className="bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Assurance */}
            <div className="pt-6 border-t border-white/10 mt-6 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-400">
              <div className="space-y-1">
                <ShieldCheck className="w-4 h-4 mx-auto text-[#00F0B5]" />
                <div>3-Year Warranty</div>
              </div>
              <div className="space-y-1">
                <Truck className="w-4 h-4 mx-auto text-[#38BDF8]" />
                <div>Express Freight</div>
              </div>
              <div className="space-y-1">
                <RotateCcw className="w-4 h-4 mx-auto text-slate-400" />
                <div>30-Day Trial</div>
              </div>
            </div>
          </div>

          {/* Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Unboxed category metadata */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span className="uppercase tracking-wider">{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>{product.subCategory}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400">Ready to Ship</span>
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="text-2xl font-bold text-white font-display">
                  {product.name}
                </h2>
                <div className="flex items-baseline gap-3 mt-1.5">
                  <span className="text-2xl font-bold text-[#00F0B5] font-mono tabular-nums">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-500 line-through font-mono tabular-nums">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 font-mono">
                    Free global shipping included
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Variant Selection if available */}
              {product.variants && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300 uppercase tracking-wider">
                      {product.variants.type}
                    </span>
                    <span className="text-[#00F0B5] font-medium">{selectedVariant}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {product.variants.options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedVariant(opt.name)}
                        className={`px-3 py-2 text-left text-xs font-medium rounded-lg border transition-colors flex items-center justify-between ${
                          selectedVariant === opt.name
                            ? 'bg-[#00F0B5]/10 border-[#00F0B5] text-white'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <span>{opt.name}</span>
                        {selectedVariant === opt.name && (
                          <Check className="w-3.5 h-3.5 text-[#00F0B5]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colorways Selection if available */}
              {product.colors && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300 uppercase tracking-wider">
                      Finish / Colorway
                    </span>
                    <span className="text-slate-400 font-medium">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          selectedColor === color.name
                            ? 'border-[#00F0B5] bg-white/10 text-white'
                            : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications Table */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Technical Specifications
                </span>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col py-1 border-b border-white/5">
                      <dt className="text-slate-500 font-medium">{key}</dt>
                      <dd className="text-slate-200 font-mono mt-0.5">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Action Buttons & Quantity */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-4">
                {/* Quantity Stepper */}
                <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-slate-400 hover:text-white rounded transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono font-semibold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white rounded transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Buy CTA */}
                <button
                  onClick={handleAdd}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-slate-950 bg-[#00F0B5] hover:bg-[#00d6a2] rounded-lg transition-all duration-150 shadow-md shadow-[#00F0B5]/20 active:scale-[0.98] cursor-pointer"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-slate-950" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <span>Add to Bag · ${(product.price * quantity).toLocaleString()}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
