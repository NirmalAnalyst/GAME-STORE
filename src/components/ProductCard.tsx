import React from 'react';
import { Plus, SlidersHorizontal, Check } from 'lucide-react';
import { Product } from '../types/gaming';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isCompared,
  onToggleCompare,
}) => {
  return (
    <article className="group relative flex flex-col bg-[#111319] border border-white/[0.08] hover:border-white/20 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
      {/* Visual Canvas: 65-70% height area */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative aspect-[4/3] w-full bg-[#161922] overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle Single Text Tag (NO PILL BADGE) */}
        {product.badge && (
          <div className="absolute top-3 left-3 text-[11px] font-semibold tracking-wider uppercase text-[#00F0B5] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
            {product.badge}
          </div>
        )}

        {/* Compare Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(product);
          }}
          className={`absolute top-3 right-3 p-1.5 rounded-md backdrop-blur-md border transition-colors ${
            isCompared
              ? 'bg-[#00F0B5] text-slate-950 border-[#00F0B5]'
              : 'bg-black/50 text-slate-300 border-white/10 hover:text-white hover:bg-black/80'
          }`}
          title={isCompared ? 'Remove from comparison' : 'Compare specifications'}
          aria-label={isCompared ? 'Remove from comparison' : 'Compare specifications'}
        >
          {isCompared ? <Check className="w-3.5 h-3.5" /> : <SlidersHorizontal className="w-3.5 h-3.5" />}
        </button>

        {/* Quick View Overlay Bar */}
        <div className="absolute inset-x-0 bottom-0 py-2 px-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between text-xs text-white">
          <span className="font-medium text-[#00F0B5]">Inspect Specifications</span>
          <span className="text-slate-400 font-mono tabular-nums">{product.reviewsCount} verified reviews</span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex flex-col flex-1 p-5 gap-3 justify-between">
        <div>
          {/* Unboxed Metadata with Typographic Dot Separators */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="uppercase tracking-wider">{product.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="truncate">{product.subCategory}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-base font-semibold text-white mt-1 group-hover:text-[#00F0B5] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Key Hardware Specs Highlight */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-xs text-slate-300 font-mono">
            {product.highlightSpecs.map((spec, i) => (
              <React.Fragment key={i}>
                <span className="text-slate-300">{spec}</span>
                {i < product.highlightSpecs.length - 1 && (
                  <span aria-hidden="true" className="text-slate-600">/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white font-mono tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through font-mono tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-white/5 hover:bg-[#00F0B5] hover:text-slate-950 border border-white/10 hover:border-[#00F0B5] rounded-lg transition-all duration-150 active:scale-[0.98] cursor-pointer"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </article>
  );
};
