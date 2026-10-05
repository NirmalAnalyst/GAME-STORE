import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Check } from 'lucide-react';
import { CartItem } from '../types/gaming';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (discountPercent: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const freeShippingThreshold = 150;
  const isFreeShipping = rawSubtotal >= freeShippingThreshold || rawSubtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 15;
  const grandTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const clean = promoInput.trim().toUpperCase();
    if (clean === 'ESPORTS10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Tournament discount applied!');
    } else if (clean === 'PROTIER') {
      setDiscountPercent(15);
      setPromoSuccess('15% Pro-tier partner code applied!');
    } else {
      setPromoError('Invalid promotional voucher code');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0D0F16] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white font-display uppercase tracking-wider">
                Shopping Bag
              </h2>
              <span className="text-xs text-slate-400 font-mono tabular-nums">
                ({cartItems.reduce((acc, c) => acc + c.quantity, 0)} items)
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping Progress bar */}
          <div className="bg-[#121520] px-5 py-2.5 border-b border-white/5 text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-2 text-[#00F0B5] font-mono">
                <Check className="w-3.5 h-3.5" />
                <span>You unlocked free global express air shipping</span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between text-slate-400 font-mono">
                  <span>Add ${(freeShippingThreshold - rawSubtotal).toFixed(0)} more for Free Air Express</span>
                  <span>${rawSubtotal} / ${freeShippingThreshold}</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00F0B5]"
                    style={{ width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Itemized List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="text-slate-500 font-mono text-sm">Your bag is currently empty</div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#00F0B5] bg-white/5 border border-[#00F0B5]/30 rounded-lg hover:bg-[#00F0B5]/10 transition-colors"
                >
                  Explore Tournament Hardware
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 bg-[#141722] rounded-xl border border-white/5"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 object-cover rounded-lg bg-[#181B26] border border-white/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-500 hover:text-rose-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Selected options */}
                      {(item.selectedVariant || item.selectedColor) && (
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                          {item.selectedVariant} {item.selectedColor && `· ${item.selectedColor}`}
                        </div>
                      )}
                    </div>

                    {/* Price and Quantity Stepper */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <span className="text-xs font-bold text-white font-mono tabular-nums">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>

                      <div className="flex items-center bg-[#0E1017] border border-white/10 rounded-md">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Calculations */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-[#12141E] border-t border-white/10 space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. ESPORTS10)"
                      className="w-full bg-[#181B26] text-xs text-white pl-8 pr-3 py-2 rounded-lg border border-white/10 uppercase placeholder:normal-case font-mono focus:border-[#00F0B5] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoSuccess && (
                  <div className="text-[11px] text-[#00F0B5] font-mono">{promoSuccess}</div>
                )}
                {promoError && (
                  <div className="text-[11px] text-rose-400 font-mono">{promoError}</div>
                )}
              </form>

              {/* Subtotal Breakdowns */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white tabular-nums">${rawSubtotal.toLocaleString()}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#00F0B5]">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="tabular-nums">-${discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Express Air Shipping</span>
                  <span className="tabular-nums">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                  <span>Estimated Total</span>
                  <span className="text-[#00F0B5] tabular-nums text-base">
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={() => onProceedToCheckout(discountPercent)}
                className="w-full py-3 px-4 text-xs font-semibold text-slate-950 bg-[#00F0B5] hover:bg-[#00d6a2] rounded-xl transition-all duration-150 shadow-md shadow-[#00F0B5]/20 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Express Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00F0B5]" />
                <span>256-Bit Encrypted Direct Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
