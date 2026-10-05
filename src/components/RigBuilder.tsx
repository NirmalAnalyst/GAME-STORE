import React, { useState, useMemo } from 'react';
import { RIG_COMPONENTS, GAME_BENCHMARKS } from '../data/rigComponents';
import { RigComponent, ComponentCategory, Product } from '../types/gaming';
import { Cpu, Zap, Activity, Check, Plus, RotateCcw, Monitor, ShieldCheck, ChevronRight } from 'lucide-react';
import { battlestationHeroImg } from '../data/products';

interface RigBuilderProps {
  onAddCustomRigToCart: (customRigProduct: Product) => void;
}

export const RigBuilder: React.FC<RigBuilderProps> = ({ onAddCustomRigToCart }) => {
  // Initial selected components
  const [selectedComponents, setSelectedComponents] = useState<Record<ComponentCategory, RigComponent>>({
    cpu: RIG_COMPONENTS.find(c => c.id === 'cpu-9800x3d')!,
    gpu: RIG_COMPONENTS.find(c => c.id === 'gpu-5090')!,
    ram: RIG_COMPONENTS.find(c => c.id === 'ram-64gb-6000')!,
    storage: RIG_COMPONENTS.find(c => c.id === 'ssd-gen5-2tb')!,
    cooler: RIG_COMPONENTS.find(c => c.id === 'cooler-aio-360')!,
    psu: RIG_COMPONENTS.find(c => c.id === 'psu-1200w-titanium')!,
    case: RIG_COMPONENTS.find(c => c.id === 'case-glass-chamber')!,
  });

  const [activeCategory, setActiveCategory] = useState<ComponentCategory>('cpu');
  const [selectedResolution, setSelectedResolution] = useState<'1080p' | '1440p' | '4k'>('1440p');
  const [addedNotice, setAddedNotice] = useState(false);

  // Categories config
  const categories: { id: ComponentCategory; label: string; icon: string }[] = [
    { id: 'cpu', label: 'Processor (CPU)', icon: 'Cpu' },
    { id: 'gpu', label: 'Graphics Card (GPU)', icon: 'Activity' },
    { id: 'ram', label: 'DDR5 Memory', icon: 'Zap' },
    { id: 'storage', label: 'PCIe NVMe SSD', icon: 'HardDrive' },
    { id: 'cooler', label: 'Thermal Cooling', icon: 'Fan' },
    { id: 'psu', label: 'Power Supply (PSU)', icon: 'BatteryCharging' },
    { id: 'case', label: 'Battlestation Chassis', icon: 'Box' },
  ];

  // Calculated Price
  const totalPrice = useMemo(() => {
    return Object.values(selectedComponents).reduce((sum, item) => sum + item.price, 0);
  }, [selectedComponents]);

  // Calculated Power Draw
  const totalPowerDraw = useMemo(() => {
    const rawDraw = Object.values(selectedComponents).reduce((sum, item) => sum + (item.wattage || 0), 0);
    // Add baseline motherboard and fan overhead
    return rawDraw + 65;
  }, [selectedComponents]);

  const psuWattage = useMemo(() => {
    if (selectedComponents.psu.id === 'psu-1200w-titanium') return 1200;
    return 1000;
  }, [selectedComponents.psu]);

  const powerHeadroomPercent = Math.round(((psuWattage - totalPowerDraw) / psuWattage) * 100);

  // Live FPS Estimator Calculation
  const estimatedFpsList = useMemo(() => {
    const cpuFactor = selectedComponents.cpu.fpsScore / 100;
    const gpuFactor = selectedComponents.gpu.fpsScore / 100;

    return GAME_BENCHMARKS.map((game) => {
      let baseFps = game.baseFps1440p;
      if (selectedResolution === '1080p') baseFps = game.baseFps1080p;
      if (selectedResolution === '4k') baseFps = game.baseFps4k;

      // Compound multiplier based on engine CPU/GPU sensitivity
      const performanceMultiplier = 0.5 + (gpuFactor * game.gpuImpact + cpuFactor * game.cpuImpact) * 0.5;
      const calculatedFps = Math.round(baseFps * performanceMultiplier);

      return {
        ...game,
        fps: calculatedFps,
      };
    });
  }, [selectedComponents, selectedResolution]);

  const handleSelectComponent = (comp: RigComponent) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [comp.category]: comp,
    }));
  };

  const handleAddRigToCart = () => {
    const rigProduct: Product = {
      id: `custom-rig-${Date.now()}`,
      name: `Custom Esports Rig (${selectedComponents.cpu.name.split(' ')[2]} + ${selectedComponents.gpu.name.split(' ').slice(2).join(' ')})`,
      category: 'rigs',
      subCategory: 'Custom Configured Esports Battlestation',
      price: totalPrice,
      rating: 5.0,
      reviewsCount: 1,
      image: battlestationHeroImg,
      badge: 'Custom Assembled',
      highlightSpecs: [
        selectedComponents.cpu.name,
        selectedComponents.gpu.name,
        selectedComponents.ram.name,
      ],
      specs: {
        'Processor': selectedComponents.cpu.name,
        'Graphics Card': selectedComponents.gpu.name,
        'Memory': selectedComponents.ram.name,
        'Storage': selectedComponents.storage.name,
        'Cooler': selectedComponents.cooler.name,
        'Power Supply': selectedComponents.psu.name,
        'Chassis': selectedComponents.case.name,
        'Power Draw': `${totalPowerDraw}W (${powerHeadroomPercent}% headroom)`,
      },
      description: `Bespoke custom battlestation configured with ${selectedComponents.cpu.name} and ${selectedComponents.gpu.name}. Stress-tested for 72 hours before dispatch.`,
      features: [
        'Hand-built and cable-managed by senior system technicians',
        '72-hour thermal stress test and memory stability burn-in included',
        '3-Year full parts and labor warranty with VIP priority support',
      ],
      inStock: true,
    };

    onAddCustomRigToCart(rigProduct);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#00F0B5] uppercase font-mono">
          <span>Configurator Studio</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span>Live Frame Benchmark Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Precision Custom Rig Architect
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Select tournament-grade components with guaranteed zero bottlenecking. Real-time estimated FPS calculations reflect native frame generation benchmarks.
        </p>
      </div>

      {/* Main Builder Grid: Left = Component Selectors, Right = Telemetry & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Component Categories and Options (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* Category Tabs (Segmented Control) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#12141C] border border-white/10 rounded-xl overflow-x-auto">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              const currentChoice = selectedComponents[cat.id];
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex flex-col text-left px-3 py-2 rounded-lg transition-all whitespace-nowrap min-w-[110px] ${
                    isSelected
                      ? 'bg-[#1E2330] text-white border border-[#00F0B5]/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider">
                    {cat.label.split(' ')[0]}
                  </span>
                  <span className="text-xs font-mono truncate text-slate-300">
                    ${currentChoice.price}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Current Category Component List */}
          <div className="bg-[#11131A] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-semibold text-white font-display">
                Select {categories.find((c) => c.id === activeCategory)?.label}
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {RIG_COMPONENTS.filter((c) => c.category === activeCategory).length} options available
              </span>
            </div>

            <div className="space-y-3">
              {RIG_COMPONENTS.filter((c) => c.category === activeCategory).map((comp) => {
                const isSelected = selectedComponents[activeCategory]?.id === comp.id;
                return (
                  <div
                    key={comp.id}
                    onClick={() => handleSelectComponent(comp)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#181C26] border-[#00F0B5] shadow-md shadow-[#00F0B5]/10'
                        : 'bg-[#141720] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#00F0B5] font-mono uppercase">
                          {comp.brand}
                        </span>
                        <span className="text-slate-600" aria-hidden="true">·</span>
                        <h4 className="text-sm font-semibold text-white">{comp.name}</h4>
                      </div>
                      <p className="text-xs text-slate-400 font-mono">{comp.specs}</p>
                      {comp.wattage > 0 && (
                        <div className="text-[11px] text-slate-500 font-mono">
                          Power Draw: ~{comp.wattage}W
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                      <div className="text-right">
                        <div className="text-base font-bold text-white font-mono tabular-nums">
                          ${comp.price}
                        </div>
                      </div>

                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                          isSelected
                            ? 'bg-[#00F0B5] border-[#00F0B5] text-slate-950'
                            : 'border-white/20 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Specification Roster */}
          <div className="bg-[#11131A] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Current Build Summary
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(selectedComponents).map(([catKey, comp]) => (
                <div key={catKey} className="p-3 bg-[#151822] rounded-lg border border-white/5 flex items-center justify-between">
                  <div className="truncate pr-2">
                    <div className="text-slate-400 uppercase text-[10px] font-mono tracking-wider">
                      {catKey}
                    </div>
                    <div className="text-white font-medium truncate">{comp.name}</div>
                  </div>
                  <span className="text-slate-300 font-mono tabular-nums shrink-0">
                    ${comp.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Telemetry, FPS Benchmark & Cart Action (4-5 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-20">
          {/* Estimated FPS Engine */}
          <div className="bg-[#11131A] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00F0B5]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Calculated In-Game FPS
                </h3>
              </div>
              <div className="flex items-center gap-1 bg-[#181C26] p-1 rounded-lg border border-white/10 text-xs">
                {(['1080p', '1440p', '4k'] as const).map((res) => (
                  <button
                    key={res}
                    onClick={() => setSelectedResolution(res)}
                    className={`px-2 py-0.5 rounded font-mono uppercase text-[11px] transition-colors ${
                      selectedResolution === res
                        ? 'bg-[#00F0B5] text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>

            {/* Game Benchmarks List */}
            <div className="space-y-3.5">
              {estimatedFpsList.map((game) => {
                const maxCap = 750;
                const barWidthPercent = Math.min(100, Math.round((game.fps / maxCap) * 100));

                return (
                  <div key={game.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium truncate max-w-[200px]">
                        {game.name}
                      </span>
                      <span className="text-white font-mono font-bold tabular-nums">
                        {game.fps} <span className="text-[10px] text-slate-500 font-normal">FPS</span>
                      </span>
                    </div>
                    {/* Visual Bar */}
                    <div className="w-full h-1.5 bg-[#1C202C] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#38BDF8] to-[#00F0B5] rounded-full transition-all duration-300"
                        style={{ width: `${barWidthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Power & Thermal Headroom Gauge */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#00F0B5]" />
                  <span>Thermal & Power Draw</span>
                </span>
                <span className="text-slate-300 font-mono tabular-nums">
                  {totalPowerDraw}W / {psuWattage}W
                </span>
              </div>
              <div className="w-full h-2 bg-[#1C202C] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    powerHeadroomPercent > 25 ? 'bg-[#00F0B5]' : 'bg-amber-400'
                  }`}
                  style={{ width: `${Math.min(100, Math.round((totalPowerDraw / psuWattage) * 100))}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 font-mono text-right">
                {powerHeadroomPercent}% Thermal Safety Headroom
              </div>
            </div>
          </div>

          {/* Pricing & Checkout Module */}
          <div className="bg-[#11131A] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                Total Custom Investment
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                  ${totalPrice.toLocaleString()}
                </span>
                <span className="text-xs text-[#00F0B5] font-mono">
                  + Free Flight Dispatch
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00F0B5] shrink-0" />
                <span>3-Year zero-cost replacement warranty on all components</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Clean Windows 11 Pro install with zero OEM bloatware</span>
              </div>
            </div>

            <button
              onClick={handleAddRigToCart}
              className="w-full py-3.5 px-4 text-sm font-semibold text-slate-950 bg-[#00F0B5] hover:bg-[#00d6a2] rounded-xl transition-all duration-150 shadow-md shadow-[#00F0B5]/20 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              {addedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Custom Rig Added to Bag!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add Configured Rig to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
