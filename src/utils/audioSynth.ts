// Web Audio API Synthesizer for Bengali Traditional Instruments
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Play Dhak Drum Beat (Bass or Treble Rim)
export function playDhakBeat(type: 'bass' | 'rim' | 'roll' = 'bass') {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'bass') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);

      gain.gain.setValueAtTime(0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'rim') {
      // Bamboo stick rim shot on Dhak
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;
      filter.Q.value = 3.5;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
    } else if (type === 'roll') {
      // Rapid Dhak drumroll
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          playDhakBeat(i % 2 === 0 ? 'bass' : 'rim');
        }, i * 70);
      }
    }
  } catch (err) {
    console.warn('Audio Synth Error:', err);
  }
}

// 2. Play Kansar Bell (Metallic Gong)
export function playKansarBell() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const frequencies = [820, 1240, 1680, 2150];
    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const decay = 1.2 + index * 0.2;
      gain.gain.setValueAtTime(0.25 / (index + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + decay);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  } catch (err) {
    console.warn('Audio Synth Error:', err);
  }
}

// 3. Play Shankha (Conch Shell Drone)
export function playShankhaSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = 2.8;

    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc2.type = 'triangle';

    // Pitch envelope rising then sustaining
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.4);
    osc.frequency.linearRampToValueAtTime(370, now + duration - 0.5);
    osc.frequency.exponentialRampToValueAtTime(220, now + duration);

    osc2.frequency.setValueAtTime(520, now);
    osc2.frequency.exponentialRampToValueAtTime(760, now + 0.4);
    osc2.frequency.linearRampToValueAtTime(740, now + duration - 0.5);
    osc2.frequency.exponentialRampToValueAtTime(440, now + duration);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.3);
    gain.gain.setValueAtTime(0.5, now + duration - 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration);
    osc2.stop(now + duration);
  } catch (err) {
    console.warn('Audio Synth Error:', err);
  }
}

// 4. Play Dhunuchi Naach Loop (Rhythmic sequence player)
let loopTimer: any = null;
export function toggleDhunuchiNaachLoop(onStateChange?: (isPlaying: boolean) => void): boolean {
  if (loopTimer) {
    clearInterval(loopTimer);
    loopTimer = null;
    if (onStateChange) onStateChange(false);
    return false;
  }

  let beatCount = 0;
  // Folk 6/8 rhythm: Ta-Dhin-Dhin | Ta-Dhin-Dhin
  loopTimer = setInterval(() => {
    const patternStep = beatCount % 6;
    if (patternStep === 0) {
      playDhakBeat('bass');
      playKansarBell();
    } else if (patternStep === 1 || patternStep === 2) {
      playDhakBeat('rim');
    } else if (patternStep === 3) {
      playDhakBeat('bass');
    } else if (patternStep === 4) {
      playDhakBeat('rim');
    } else if (patternStep === 5) {
      playKansarBell();
    }
    beatCount++;
  }, 160);

  if (onStateChange) onStateChange(true);
  return true;
}
