import React, { useState, useEffect, useRef } from 'react';
import { SWITCH_PROFILES } from '../data/switches';
import { SwitchProfile } from '../types/gaming';
import { playSwitchSound } from '../utils/switchAudio';
import { Volume2, VolumeX, Sliders, Sparkles, Activity, Keyboard } from 'lucide-react';

export const SwitchStudio: React.FC = () => {
  const [selectedSwitch, setSelectedSwitch] = useState<SwitchProfile>(SWITCH_PROFILES[0]);
  const [rapidTriggerActuation, setRapidTriggerActuation] = useState<number>(0.1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [typedChars, setTypedChars] = useState<string>('VALKYRIE 8000HZ');
  const [keyPressCount, setKeyPressCount] = useState<number>(14);
  const [isKeyPressed, setIsKeyPressed] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Play sound helper
  const triggerSwitchSound = (type = selectedSwitch.soundType) => {
    if (!soundEnabled) return;
    playSwitchSound(type);
  };

  const handleInteractiveKeyClick = () => {
    setIsKeyPressed(true);
    triggerSwitchSound();
    setKeyPressCount((prev) => prev + 1);
    setTimeout(() => setIsKeyPressed(false), 120);
  };

  const handleVirtualType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTypedChars(val);
    setKeyPressCount((prev) => prev + 1);
    triggerSwitchSound();
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#00F0B5] uppercase font-mono">
            <span>Acoustic & Switch Laboratory</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>Real-Time Synthesizer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            The Switch & Acoustic Studio
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            Test mechanical switch travel, acoustic timbre, and Hall-Effect magnetic Rapid Trigger sensitivity in real-time with procedural Web Audio synthesis.
          </p>
        </div>

        {/* Audio Mute Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-semibold transition-colors ${
            soundEnabled
              ? 'bg-[#181D28] border-[#00F0B5]/40 text-[#00F0B5]'
              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
          }`}
          aria-label={soundEnabled ? 'Mute audio' : 'Unmute audio'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span>{soundEnabled ? 'Acoustics Active' : 'Muted'}</span>
        </button>
      </div>

      {/* Main Switch Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Switch Roster (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
            Select Switch Profile
          </span>

          <div className="space-y-3">
            {SWITCH_PROFILES.map((sw) => {
              const isSelected = selectedSwitch.id === sw.id;
              return (
                <div
                  key={sw.id}
                  onClick={() => {
                    setSelectedSwitch(sw);
                    triggerSwitchSound(sw.soundType);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#161B26] border-[#00F0B5] shadow-lg shadow-[#00F0B5]/10'
                      : 'bg-[#11131A] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                        style={{ backgroundColor: sw.colorHex }}
                      />
                      <h4 className="text-sm font-semibold text-white">{sw.name}</h4>
                    </div>

                    <span className="text-xs font-mono uppercase text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {sw.type}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {sw.description}
                  </p>

                  <div className="flex items-center gap-3 mt-3 pt-2 border-t border-white/5 text-[11px] font-mono text-slate-400">
                    <span>Actuation: {sw.actuationDistance}mm</span>
                    <span className="text-slate-600">·</span>
                    <span>Force: {sw.actuationForce}gf</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-[#00F0B5] uppercase">{sw.soundType}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Keycap, Travel Physics & Typing Tester (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Keycap & Travel Physics Inspector */}
          <div className="bg-[#11131A] border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#00F0B5]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Interactive Stem & Travel Inspection
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Click keycap or press any key to test sound
              </span>
            </div>

            {/* Interactive 3D Keycap Stage */}
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4 bg-[#0D0F15] rounded-xl p-6 border border-white/5">
              {/* Interactive Mechanical Keycap */}
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={handleInteractiveKeyClick}
                  className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center font-mono font-bold transition-all duration-100 cursor-pointer select-none shadow-2xl ${
                    isKeyPressed
                      ? 'translate-y-2 bg-[#00F0B5] text-slate-950 shadow-inner'
                      : 'translate-y-0 bg-[#1A1F2D] text-white hover:bg-[#202738] border-b-4 border-slate-950 active:translate-y-2 active:border-b-0'
                  }`}
                  style={{
                    borderColor: isKeyPressed ? '#00F0B5' : '#0B0D13',
                  }}
                  aria-label="Test switch sound"
                >
                  <span className="text-lg">W</span>
                  <span className="text-[10px] text-slate-400 font-normal mt-1">
                    {selectedSwitch.soundType.toUpperCase()}
                  </span>
                </button>
                <span className="text-[11px] text-slate-500 font-mono">
                  {keyPressCount} keystrokes registered
                </span>
              </div>

              {/* Physical Travel & Force Metrics */}
              <div className="space-y-4 w-full sm:w-60">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>Actuation Point</span>
                    <span className="text-white font-bold">{selectedSwitch.actuationDistance} mm</span>
                  </div>
                  <div className="w-full h-2 bg-[#1C202C] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00F0B5] rounded-full"
                      style={{
                        width: `${(selectedSwitch.actuationDistance / selectedSwitch.totalTravel) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>Bottom-Out Travel</span>
                    <span className="text-white font-bold">{selectedSwitch.totalTravel} mm</span>
                  </div>
                  <div className="w-full h-2 bg-[#1C202C] rounded-full overflow-hidden">
                    <div className="h-full bg-[#38BDF8] rounded-full w-full" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>Spring Weight</span>
                    <span className="text-white font-bold">{selectedSwitch.actuationForce} gf</span>
                  </div>
                  <div className="w-full h-2 bg-[#1C202C] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-400 rounded-full"
                      style={{ width: `${(selectedSwitch.actuationForce / 70) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hall-Effect Rapid Trigger Continuous Sensitivity Slider */}
            {selectedSwitch.type === 'magnetic' && (
              <div className="p-4 bg-[#141822] rounded-xl border border-[#00F0B5]/30 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#00F0B5]" />
                    <span className="font-semibold text-white uppercase tracking-wider font-mono">
                      Rapid Trigger Sensitivity (0.01mm increments)
                    </span>
                  </div>
                  <span className="text-[#00F0B5] font-mono font-bold text-sm">
                    {rapidTriggerActuation.toFixed(2)} mm
                  </span>
                </div>

                <input
                  type="range"
                  min="0.05"
                  max="3.5"
                  step="0.05"
                  value={rapidTriggerActuation}
                  onChange={(e) => {
                    setRapidTriggerActuation(parseFloat(e.target.value));
                    triggerSwitchSound();
                  }}
                  className="w-full accent-[#00F0B5] cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>0.05mm (Instantaneous FPS Strafing)</span>
                  <span>3.5mm (Heavy Typing Reset)</span>
                </div>
              </div>
            )}
          </div>

          {/* Live Virtual Typing Chamber */}
          <div className="bg-[#11131A] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-[#00F0B5]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Live Typing Acoustics Sandbox
                </h3>
              </div>
              <span className="text-xs text-emerald-400 font-mono">
                Audio Engine Synchronized
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Type directly in the box below to hear the acoustic resonance profile of <strong className="text-white">{selectedSwitch.name}</strong> as you type:
            </p>

            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={typedChars}
                onChange={handleVirtualType}
                placeholder="Type here to test switch clack and thock..."
                className="w-full bg-[#0D0F15] text-white font-mono text-base px-4 py-3 rounded-xl border border-white/10 focus:border-[#00F0B5] focus:outline-none transition-colors"
              />
              <button
                onClick={() => setTypedChars('')}
                className="absolute right-3 top-3 text-xs text-slate-500 hover:text-white font-mono"
              >
                Clear
              </button>
            </div>

            <div className="text-xs text-slate-400 font-mono flex items-center justify-between pt-2">
              <span>Acoustic Timbre: <span className="text-white">{selectedSwitch.soundDescription}</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
