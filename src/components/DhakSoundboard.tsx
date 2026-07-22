import React, { useState } from 'react';
import { Music, Volume2, Play, Square, Sparkles, Flame } from 'lucide-react';
import { playDhakBeat, playKansarBell, playShankhaSound, toggleDhunuchiNaachLoop } from '../utils/audioSynth';

export const DhakSoundboard: React.FC = () => {
  const [isPlayingLoop, setIsPlayingLoop] = useState(false);
  const [activePad, setActivePad] = useState<string | null>(null);

  const triggerPad = (padName: string, action: () => void) => {
    setActivePad(padName);
    action();
    setTimeout(() => setActivePad(null), 300);
  };

  const handleToggleLoop = () => {
    const newState = toggleDhunuchiNaachLoop((playing) => setIsPlayingLoop(playing));
    setIsPlayingLoop(newState);
  };

  return (
    <section id="dhak" className="py-20 bg-gorod-texture border-y border-[#D97706]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#991B1B]/10 border border-[#991B1B]/30 text-[#991B1B] text-xs font-semibold">
            <Music className="w-3.5 h-3.5" />
            <span className="font-bengali-sans">ঐতিহ্যবাহী বাদ্যযন্ত্র soundboard</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#7F1D1D]">
            Dhak Rhythm & <span className="font-bengali-serif text-[#D97706]">পূজার উৎসবের ধ্বনি</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base font-light">
            The beating of the <span className="font-bengali-sans font-bold text-[#991B1B]">ঢাক</span> (Dhak drum) is the universal sound of Durga Puja across Bengal. Tap the interactive instrument pads below to synthesize authentic festive sounds!
          </p>
        </div>

        {/* Main Soundboard & Interactive Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Pads Grid */}
          <div className="lg:col-span-7 bg-[#FFFDF7] p-6 sm:p-8 rounded-3xl border-2 border-[#D97706]/40 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h3 className="font-bengali-serif font-bold text-xl text-[#7F1D1D] flex items-center gap-2">
                <Music className="w-5 h-5 text-[#D97706]" />
                ধ্বনি সংমিশ্রণ (Sound Pads)
              </h3>
              <span className="text-xs text-gray-500 font-sans">
                Click pads to play live Web Audio
              </span>
            </div>

            {/* Instrument Pads Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              {/* Pad 1: Dhak Bass */}
              <button
                onClick={() => triggerPad('dhakBass', () => playDhakBeat('bass'))}
                className={`p-5 rounded-2xl border-2 text-left transition-all duration-150 transform active:scale-95 flex flex-col justify-between h-36 ${
                  activePad === 'dhakBass'
                    ? 'bg-[#991B1B] text-[#FEF08A] border-[#FEF08A] shadow-lg scale-105'
                    : 'bg-amber-50/80 hover:bg-amber-100/80 border-[#D97706]/40 text-[#7F1D1D]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded-full bg-[#991B1B]/10 flex items-center justify-center font-bold text-xs">
                    🥁
                  </div>
                  <span className="text-[10px] uppercase tracking-wider opacity-60">Bass</span>
                </div>
                <div>
                  <div className="font-bengali-sans font-bold text-lg">ঢাকের গম্ভীরা</div>
                  <div className="text-xs opacity-75">Dhak Deep Bass</div>
                </div>
              </button>

              {/* Pad 2: Dhak Rim Stick */}
              <button
                onClick={() => triggerPad('dhakRim', () => playDhakBeat('rim'))}
                className={`p-5 rounded-2xl border-2 text-left transition-all duration-150 transform active:scale-95 flex flex-col justify-between h-36 ${
                  activePad === 'dhakRim'
                    ? 'bg-[#991B1B] text-[#FEF08A] border-[#FEF08A] shadow-lg scale-105'
                    : 'bg-amber-50/80 hover:bg-amber-100/80 border-[#D97706]/40 text-[#7F1D1D]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded-full bg-[#991B1B]/10 flex items-center justify-center font-bold text-xs">
                    🥢
                  </div>
                  <span className="text-[10px] uppercase tracking-wider opacity-60">Treble</span>
                </div>
                <div>
                  <div className="font-bengali-sans font-bold text-lg">কাঠির বোল</div>
                  <div className="text-xs opacity-75">Rim Stick Shot</div>
                </div>
              </button>

              {/* Pad 3: Dhak Drumroll */}
              <button
                onClick={() => triggerPad('dhakRoll', () => playDhakBeat('roll'))}
                className={`p-5 rounded-2xl border-2 text-left transition-all duration-150 transform active:scale-95 flex flex-col justify-between h-36 ${
                  activePad === 'dhakRoll'
                    ? 'bg-[#991B1B] text-[#FEF08A] border-[#FEF08A] shadow-lg scale-105'
                    : 'bg-amber-50/80 hover:bg-amber-100/80 border-[#D97706]/40 text-[#7F1D1D]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded-full bg-[#991B1B]/10 flex items-center justify-center font-bold text-xs">
                    ⚡
                  </div>
                  <span className="text-[10px] uppercase tracking-wider opacity-60">Roll</span>
                </div>
                <div>
                  <div className="font-bengali-sans font-bold text-lg">দ্রুত দুন্দুভি</div>
                  <div className="text-xs opacity-75">Fast Dhak Roll</div>
                </div>
              </button>

              {/* Pad 4: Kansar Bell */}
              <button
                onClick={() => triggerPad('kansar', () => playKansarBell())}
                className={`p-5 rounded-2xl border-2 text-left transition-all duration-150 transform active:scale-95 flex flex-col justify-between h-36 ${
                  activePad === 'kansar'
                    ? 'bg-[#D97706] text-white border-[#FEF08A] shadow-lg scale-105'
                    : 'bg-amber-50/80 hover:bg-amber-100/80 border-[#D97706]/40 text-[#7F1D1D]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded-full bg-[#D97706]/10 flex items-center justify-center font-bold text-xs">
                    🔔
                  </div>
                  <span className="text-[10px] uppercase tracking-wider opacity-60">Chime</span>
                </div>
                <div>
                  <div className="font-bengali-sans font-bold text-lg">কাঁসর ঘণ্টা</div>
                  <div className="text-xs opacity-75">Kansar Brass Gong</div>
                </div>
              </button>

              {/* Pad 5: Shankha / Conch Shell */}
              <button
                onClick={() => triggerPad('shankha', () => playShankhaSound())}
                className={`p-5 rounded-2xl border-2 text-left transition-all duration-150 transform active:scale-95 flex flex-col justify-between h-36 ${
                  activePad === 'shankha'
                    ? 'bg-[#991B1B] text-[#FEF08A] border-[#FEF08A] shadow-lg scale-105'
                    : 'bg-amber-50/80 hover:bg-amber-100/80 border-[#D97706]/40 text-[#7F1D1D]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded-full bg-[#991B1B]/10 flex items-center justify-center font-bold text-xs">
                    🐚
                  </div>
                  <span className="text-[10px] uppercase tracking-wider opacity-60">Wind</span>
                </div>
                <div>
                  <div className="font-bengali-sans font-bold text-lg">মঙ্গল শঙ্খ</div>
                  <div className="text-xs opacity-75">Conch Shell Drone</div>
                </div>
              </button>

              {/* Pad 6: Dhunuchi Naach Auto Loop Toggle */}
              <button
                onClick={handleToggleLoop}
                className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 transform active:scale-95 flex flex-col justify-between h-36 ${
                  isPlayingLoop
                    ? 'bg-gradient-to-br from-[#991B1B] to-[#D97706] text-white border-[#FEF08A] shadow-xl ring-4 ring-[#D97706]/30'
                    : 'bg-[#7F1D1D] text-[#FEF08A] border-[#D97706] hover:bg-[#991B1B]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <Flame className={`w-6 h-6 ${isPlayingLoop ? 'animate-bounce text-[#FEF08A]' : 'text-amber-300'}`} />
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/20">
                    {isPlayingLoop ? 'LOOPING' : 'OFF'}
                  </span>
                </div>
                <div>
                  <div className="font-bengali-sans font-bold text-lg flex items-center gap-1">
                    {isPlayingLoop ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    ধুনুচি নাচ লুপ
                  </div>
                  <div className="text-xs opacity-80">Dhunuchi Folk Beat</div>
                </div>
              </button>

            </div>

            {/* Visualizer Bar */}
            <div className="p-4 bg-amber-100/60 rounded-2xl border border-amber-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#D97706]" />
                <span className="text-xs font-bengali-sans text-gray-700 font-medium">
                  {isPlayingLoop ? 'ধুনুচি বাদ্যরসে নৃত্য পরিবেশিত হচ্ছে...' : 'যেকোনো বোলে ট্যাপ করে পূজার আমেজ অনুভব করুন'}
                </span>
              </div>
              <div className="flex space-x-1 items-end h-6">
                {[40, 70, 30, 90, 60, 100, 50, 80].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full transition-all duration-200 ${
                      isPlayingLoop || activePad ? 'bg-[#991B1B] animate-pulse' : 'bg-gray-300'
                    }`}
                    style={{ height: isPlayingLoop || activePad ? `${(h * Math.random()) + 20}%` : '20%' }}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Cultural Lore & Dhunuchi Naach Tradition */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#7F1D1D] to-[#991B1B] p-6 sm:p-8 rounded-3xl border-2 border-[#D97706]/60 text-[#FFFDF7] shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1 text-xs text-[#FEF08A] bg-[#991B1B] px-3 py-1 rounded-full border border-[#D97706]/40">
                <Flame className="w-3.5 h-3.5" />
                <span className="font-bengali-sans">ধুনুচি নাচ ও ঢাকের মাহাত্ম্য</span>
              </div>

              <h3 className="font-bengali-serif text-2xl font-bold text-[#FEF08A]">
                The Sacred Rhythm of Dhunuchi Naach
              </h3>

              <p className="text-sm text-gray-100 leading-relaxed font-light">
                On <span className="font-bengali-sans font-semibold text-[#FEF08A]">মহানবমী</span> (Maha Nabami evening), devotees perform the iconic <span className="font-bengali-sans font-semibold text-[#FEF08A]">ধুনুচি নাচ</span> (Dhunuchi dance). Holding smoldering earthenware pots filled with aromatic coconut husk, camphor, and frankincense, dancers sway in ecstatic harmony to the intoxicating tempo of the Dhak.
              </p>

              <div className="p-4 bg-black/30 rounded-2xl border border-amber-500/30 space-y-2">
                <p className="font-bengali-serif text-amber-200 text-xs italic">
                  "ঢাকের কাঠির মিষ্টি সুর, পূজার বাকি নেইকো দূর..."
                </p>
                <p className="text-[11px] text-gray-300">
                  "The sweet sound of the Dhak drum stick announces Mother Durga's arrival to every corner of Bengal."
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-[#FEF08A]">
              <span className="font-bengali-sans">শারদীয়া ২০২৬ সঙ্গীত সংগ্রহ</span>
              <button
                onClick={playShankhaSound}
                className="underline hover:text-white transition flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" />
                শঙ্খ বাজিয়ে আরতি করুন
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
