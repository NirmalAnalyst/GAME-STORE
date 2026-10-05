/**
 * Procedural Mechanical Keyboard Switch Sound Synthesizer using Web Audio API.
 * Emulates tactile switch bottom-out, stem strike, housing resonance, and clickbar sounds.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSwitchSound(soundType: 'thock' | 'clack' | 'mute' | 'crisp' = 'thock', pitchVariation = 0) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Pitch randomization for natural mechanical variance
    const rand = (Math.random() - 0.5) * 0.15 + pitchVariation;

    if (soundType === 'thock') {
      // Deep acoustic bottom out: low frequency body + dampened transient
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, now);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140 * (1 + rand), now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.04);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);

      // Add slight housing noise burst
      playNoiseBurst(ctx, now, 0.015, 0.12, 1200);

    } else if (soundType === 'crisp') {
      // Clickbar / Blue switch style: sharp click transient + higher pitched stem strike
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(2200 * (1 + rand), now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.02);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);

      // High noise snap
      playNoiseBurst(ctx, now, 0.012, 0.22, 3400);

    } else if (soundType === 'clack') {
      // Aluminum plate higher pitched clack: crisp top-out & bottom-out
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(750, now);
      filter.Q.setValueAtTime(2, now);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320 * (1 + rand), now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.035);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.055);

      playNoiseBurst(ctx, now, 0.02, 0.15, 2100);

    } else {
      // Muted / Silent: muffled bottom-out with soft low thud
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110 * (1 + rand), now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.03);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch (e) {
    console.debug('Audio playback skipped:', e);
  }
}

function playNoiseBurst(ctx: AudioContext, time: number, duration: number, volume: number, cutoff: number) {
  try {
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = cutoff;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(time);
    noise.stop(time + duration);
  } catch (e) {
    // ignore
  }
}
