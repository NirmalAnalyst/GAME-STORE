/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { PromoBanner } from './components/PromoBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RigBuilder } from './components/RigBuilder';
import { SwitchStudio } from './components/SwitchStudio';
import { Battlestations } from './components/Battlestations';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SpecsCompareModal } from './components/SpecsCompareModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ProductCategory } from './types/gaming';
import { Filter, SlidersHorizontal, ArrowUpDown, Check, Plus, Sparkles, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('store');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initial sample tournament loadout
    return [
      {
        id: 'valkyrie-forge-75-default',
        product: PRODUCTS[0],
        quantity: 1,
        selectedVariant: 'Gateron Magnetic Jade (Smooth 30gf)',
        selectedColor: 'Obsidian Black',
      },
      {
        id: 'valkyrie-phantom-8k-default',
        product: PRODUCTS[1],
        quantity: 1,
        selectedVariant: 'Ultra-Grip Matte',
        selectedColor: 'Matte Obsidian',
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [selectedProductForPDP, setSelectedProductForPDP] = useState<Product | null>(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Compare List
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  // Notification Toast for user actions
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, variant?: string, color?: string) => {
    const itemId = `${product.id}-${variant || 'default'}-${color || 'default'}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          quantity,
          selectedVariant: variant,
          selectedColor: color,
        },
      ];
    });
    showToast(`Added ${product.name} to Bag`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Toggle Compare
  const handleToggleCompare = (product: Product) => {
    setComparedProductIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      if (prev.length >= 3) {
        showToast('Maximum 3 devices in comparison matrix');
        return prev;
      }
      showToast(`Added ${product.name} to comparison`);
      return [...prev, product.id];
    });
  };

  const comparedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => comparedProductIds.includes(p.id));
  }, [comparedProductIds]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.highlightSpecs.some((s) => s.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Sort order
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Tournament Gear' },
    { id: 'keyboards', label: 'Rapid Trigger Keyboards' },
    { id: 'mice', label: 'Ultralight Mice' },
    { id: 'audio', label: 'Planar Audio' },
    { id: 'displays', label: 'OLED Displays' },
    { id: 'rigs', label: 'Custom Rigs' },
    { id: 'accessories', label: 'Mats & Accessories' },
  ];

  return (
    <div className="min-h-screen bg-[#090A0D] text-slate-100 flex flex-col font-sans selection:bg-[#00F0B5]/20 selection:text-[#00F0B5]">
      {/* 1. Dismissible Slim Promo Banner (<= 40px) */}
      <PromoBanner />

      {/* 2. Top Bar Navigation (Strict 3-zone contract) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((acc, c) => acc + c.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        compareCount={comparedProductIds.length}
        openCompare={() => setIsCompareOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'store' && (
          <div className="space-y-12">
            {/* Storefront Hero with high-resolution visual and primary direct routes */}
            <Hero
              onExploreGear={() => {
                const el = document.getElementById('catalog-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenBuilder={() => setActiveTab('builder')}
            />

            {/* Gear Catalog Container */}
            <section id="catalog-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
              {/* Category Controls & Sorting Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
                {/* Segmented Filter Controls */}
                <div className="flex items-center gap-1.5 p-1 bg-[#12141C] border border-white/10 rounded-xl overflow-x-auto scrollbar-none">
                  {categories.map((cat) => {
                    const isSelected = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                          isSelected
                            ? 'bg-[#1E2330] text-white shadow-sm font-semibold border border-[#00F0B5]/30'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* Sort Order Selector */}
                <div className="flex items-center gap-3 self-end md:self-auto text-xs">
                  <span className="text-slate-400 font-mono">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#12141C] text-xs text-white px-3 py-1.5 rounded-lg border border-white/10 focus:border-[#00F0B5] focus:outline-none cursor-pointer font-mono"
                  >
                    <option value="featured">Featured Picks</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {/* Active Search Notification */}
              {searchQuery && (
                <div className="flex items-center justify-between bg-[#131620] px-4 py-2.5 rounded-lg border border-white/5 text-xs">
                  <span className="text-slate-300">
                    Showing results matching <strong className="text-white font-mono">"{searchQuery}"</strong> ({filteredProducts.length} devices)
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[#00F0B5] hover:underline font-mono"
                  >
                    Clear Filter
                  </button>
                </div>
              )}

              {/* Featured Products Grid: 3-column desktop grid with generous gap-6 */}
              {filteredProducts.length === 0 ? (
                <div className="py-24 text-center space-y-3">
                  <div className="text-slate-400 text-sm font-mono">
                    No hardware matches the selected parameters.
                  </div>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-[#00F0B5] bg-white/5 border border-[#00F0B5]/30 rounded-lg hover:bg-[#00F0B5]/10 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => setSelectedProductForPDP(p)}
                      onAddToCart={(p) => handleAddToCart(p, 1)}
                      isCompared={comparedProductIds.includes(product.id)}
                      onToggleCompare={handleToggleCompare}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Curated Interactive Showcase Teasers */}
            <section className="bg-[#0C0E14] border-y border-white/[0.08] py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Interactive Rig Builder Callout Card */}
                  <div className="p-8 rounded-2xl bg-[#11131A] border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#00F0B5]/40 transition-colors">
                    <div className="space-y-3">
                      <div className="text-xs font-mono uppercase text-[#00F0B5]">
                        Interactive Configurator
                      </div>
                      <h3 className="text-2xl font-bold text-white font-display">
                        Build Your Custom Esports Battlestation
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Customize CPUs, RTX 5090 graphics, low-latency DDR5, and calculate real-time in-game FPS benchmarks across Cyberpunk, Valorant, and CS2 with automated thermal wattage headroom checks.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('builder')}
                      className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 bg-[#00F0B5] hover:bg-[#00d6a2] px-5 py-3 rounded-lg transition-colors w-fit cursor-pointer"
                    >
                      <span>Launch Rig Configurator Studio</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Interactive Switch Sound Studio Callout Card */}
                  <div className="p-8 rounded-2xl bg-[#11131A] border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#38BDF8]/40 transition-colors">
                    <div className="space-y-3">
                      <div className="text-xs font-mono uppercase text-[#38BDF8]">
                        Acoustic Synthesizer
                      </div>
                      <h3 className="text-2xl font-bold text-white font-display">
                        Test Mechanical & Magnetic Switch Acoustics
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Experience procedural Web Audio simulation of Hall-Effect Rapid Trigger switches, deep thocky linear stems, and clickbars. Adjust actuation distances from 0.05mm to 3.5mm.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('switch-studio')}
                      className="inline-flex items-center gap-2 text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/15 px-5 py-3 rounded-lg transition-colors w-fit cursor-pointer"
                    >
                      <span>Open Switch Acoustic Studio</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Tab 2: Custom PC Rig Builder */}
        {activeTab === 'builder' && (
          <RigBuilder
            onAddCustomRigToCart={(customRig) => {
              handleAddToCart(customRig, 1);
              setIsCartOpen(true);
            }}
          />
        )}

        {/* Tab 3: Switch Acoustic & Rapid Trigger Studio */}
        {activeTab === 'switch-studio' && <SwitchStudio />}

        {/* Tab 4: Battlestations Setup Explorer */}
        {activeTab === 'battlestations' && (
          <Battlestations
            onQuickView={(p) => setSelectedProductForPDP(p)}
            onAddToCart={(p) => handleAddToCart(p, 1)}
          />
        )}
      </main>

      {/* Product Detail Modal (PDP) with contiguous purchase module */}
      <ProductDetailModal
        product={selectedProductForPDP}
        onClose={() => setSelectedProductForPDP(null)}
        onAddToCart={(p, qty, variant, color) => {
          handleAddToCart(p, qty, variant, color);
        }}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={(discount) => {
          setAppliedDiscount(discount);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal & Order Tracking Receipt */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountPercent={appliedDiscount}
        onOrderSuccess={() => {
          setCartItems([]);
          showToast('Order confirmed and dispatched for flight testing!');
        }}
      />

      {/* Side-by-side Specifications Comparison Matrix */}
      <SpecsCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedProducts={comparedProducts}
        onRemoveFromCompare={(id) => {
          setComparedProductIds((prev) => prev.filter((pId) => pId !== id));
        }}
        onAddToCart={(p) => {
          handleAddToCart(p, 1);
        }}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161B26] border border-[#00F0B5]/40 text-white text-xs font-mono py-2.5 px-4 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-[#00F0B5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
}
