import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, Package, Clock, Copy, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/gaming';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountPercent: number;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountPercent,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [formData, setFormData] = useState({
    name: 'Alex Mercer',
    email: 'alex.mercer@esports.gg',
    address: '742 Evergreen Terrace',
    city: 'Seattle',
    postalCode: '98101',
    country: 'United States',
    paymentMethod: 'card',
  });
  const [orderNumber, setOrderNumber] = useState('VK-84920');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const isFreeShipping = rawSubtotal >= 150 || rawSubtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 15;
  const grandTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `VK-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(generatedOrderNum);
    setStep('confirmed');
    onOrderSuccess();
  };

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#11131A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#151822]">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white font-display uppercase tracking-wider">
              {step === 'form' ? 'Express Checkout' : 'Order Confirmed'}
            </h3>
            <span className="text-xs text-[#00F0B5] font-mono">· 256-Bit Encrypted</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Quick Order Overview */}
            <div className="bg-[#161924] p-4 rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">
                {cartItems.length} items ready for air freight
              </span>
              <span className="text-white font-bold text-sm tabular-nums">
                Total: ${grandTotal.toLocaleString()}
              </span>
            </div>

            {/* Contact & Shipping Details */}
            <div className="space-y-4">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Shipping Destination
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#181B26] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:border-[#00F0B5] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Email for Shipment Tracking
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#181B26] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:border-[#00F0B5] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#181B26] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:border-[#00F0B5] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#181B26] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:border-[#00F0B5] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-[#181B26] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:border-[#00F0B5] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#181B26] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:border-[#00F0B5] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Payment Method
              </span>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'card', label: 'Credit / Debit Card' },
                  { id: 'apple', label: 'Apple Pay' },
                  { id: 'cod', label: 'Cash on Delivery' },
                ].map((pm) => (
                  <button
                    type="button"
                    key={pm.id}
                    onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                      formData.paymentMethod === pm.id
                        ? 'bg-[#00F0B5]/10 border-[#00F0B5] text-white font-semibold'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                type="submit"
                className="w-full py-3.5 px-4 text-xs font-bold text-slate-950 bg-[#00F0B5] hover:bg-[#00d6a2] rounded-xl transition-all duration-150 shadow-md shadow-[#00F0B5]/20 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Authorize & Place Order · ${grandTotal.toLocaleString()}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00F0B5]" />
                <span>3-Year zero-cost replacement warranty included</span>
              </div>
            </div>
          </form>
        ) : (
          /* Order Confirmed State with Tracking Receipt */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#00F0B5]/20 border border-[#00F0B5] text-[#00F0B5] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="text-2xl font-bold text-white font-display">
                Order {orderNumber} Confirmed
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                A verification receipt has been dispatched to {formData.email}
              </p>
            </div>

            {/* Tracking Card */}
            <div className="bg-[#151822] p-5 rounded-xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Air Freight Tracking Code:</span>
                <button
                  onClick={handleCopyOrder}
                  className="flex items-center gap-1.5 font-mono text-[#00F0B5] font-bold hover:underline"
                >
                  <span>{orderNumber}</span>
                  <Copy className="w-3.5 h-3.5" />
                  {copied && <span className="text-[10px] text-white">Copied!</span>}
                </button>
              </div>

              {/* Progress Timeline */}
              <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[10px] font-mono">
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-[#00F0B5] text-slate-950 flex items-center justify-center mx-auto font-bold">
                    ✓
                  </div>
                  <div className="text-white font-semibold">Payment Verified</div>
                </div>

                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-[#38BDF8] text-slate-950 flex items-center justify-center mx-auto font-bold">
                    2
                  </div>
                  <div className="text-[#38BDF8] font-semibold">Bench Testing</div>
                </div>

                <div className="space-y-1 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-white/10 text-slate-400 flex items-center justify-center mx-auto">
                    3
                  </div>
                  <div className="text-slate-400">Flight Dispatch</div>
                </div>

                <div className="space-y-1 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-white/10 text-slate-400 flex items-center justify-center mx-auto">
                    4
                  </div>
                  <div className="text-slate-400">Delivered</div>
                </div>
              </div>
            </div>

            {/* Destination summary */}
            <div className="p-4 bg-[#141620] rounded-xl border border-white/5 text-xs font-mono space-y-1 text-slate-300">
              <div className="text-slate-500 uppercase text-[10px]">Delivering To:</div>
              <div className="text-white font-semibold">{formData.name}</div>
              <div>{formData.address}, {formData.city} {formData.postalCode}</div>
              <div>{formData.country}</div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-[#00F0B5] hover:bg-[#00d6a2] rounded-xl transition-colors cursor-pointer"
            >
              Return to Gear Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
