import React from 'react';
import { ShoppingBag, Search, SlidersHorizontal } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  compareCount: number;
  openCompare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  searchQuery,
  setSearchQuery,
  isSearchOpen,
  setIsSearchOpen,
  compareCount,
  openCompare,
}) => {
  const navLinks = [
    { id: 'store', label: 'Gear Store' },
    { id: 'builder', label: 'Rig Builder' },
    { id: 'switch-studio', label: 'Switch Studio' },
    { id: 'battlestations', label: 'Battlestations' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090A0D]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('store')}
          className="text-xl font-bold tracking-widest text-white font-display hover:text-[#00F0B5] transition-colors uppercase select-none"
        >
          VALKYRIE
        </button>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`relative py-1 whitespace-nowrap transition-colors ${
                  isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00F0B5] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Quick Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isSearchOpen
                ? 'bg-white/10 text-[#00F0B5]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            aria-label="Toggle search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Compare Button if items added */}
          {compareCount > 0 && (
            <button
              onClick={openCompare}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors whitespace-nowrap"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#00F0B5]" />
              <span>Compare</span>
              <span className="text-white font-mono tabular-nums">({compareCount})</span>
            </button>
          )}

          {/* Cart Bag Action */}
          <button
            onClick={openCart}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-[#00F0B5] hover:bg-[#00d6a2] rounded-lg transition-all duration-150 whitespace-nowrap shadow-sm shadow-[#00F0B5]/20 active:scale-[0.98]"
            aria-label={`Shopping Bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="font-mono tabular-nums bg-slate-950/20 px-1.5 py-0.5 rounded text-[11px]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Expanded Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-white/[0.06] bg-[#0C0E14] px-4 py-3">
          <div className="max-w-2xl mx-auto relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyboards, 8K mice, planar audio, switches, specs..."
              className="w-full bg-[#141721] text-sm text-white pl-9 pr-24 py-2 rounded-lg border border-white/10 focus:border-[#00F0B5] focus:outline-none transition-colors"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation bar */}
      <div className="md:hidden flex items-center justify-around border-t border-white/[0.06] bg-[#0C0E14] px-2 py-2 overflow-x-auto">
        {navLinks.map((link) => {
          const isActive = activeTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`px-3 py-1 text-xs font-medium whitespace-nowrap rounded ${
                isActive ? 'text-[#00F0B5] bg-white/5' : 'text-slate-400'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
