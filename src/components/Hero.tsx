import React from 'react';
import { Music, BookOpen, Palette, Volume2, Sparkles, ChevronDown } from 'lucide-react';
import { playShankhaSound, playDhakBeat } from '../utils/audioSynth';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenAiGenerator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenAiGenerator }) => {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 bg-gorod-texture flex items-center overflow-hidden">
      
      {/* Background Decorative Elements - Alpana Ornaments & Swaying Kash Phool */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-alpana-pattern"></div>
      
      {/* Top Crimson & Gold Gradient Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#DC2626]/20 via-[#F59E0B]/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      {/* Swaying Kash Phool (Silver Feather Grass) SVG Silhouettes at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none flex justify-between items-end px-4 sm:px-12 opacity-30 z-0">
        <svg className="w-32 h-36 text-[#94A3B8] animate-sway" viewBox="0 0 100 120" fill="currentColor">
          <path d="M50 120 C 50 80, 20 40, 10 0 C 15 20, 30 40, 50 120 M50 120 C 50 70, 70 30, 90 0 C 80 20, 65 50, 50 120" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        <svg className="w-40 h-44 text-[#64748B] animate-sway-delayed hidden sm:block" viewBox="0 0 100 120" fill="currentColor">
          <path d="M50 120 C 50 80, 15 35, 5 0 C 10 20, 25 40, 50 120 M50 120 C 50 75, 75 25, 95 0 C 85 20, 65 50, 50 120" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        <svg className="w-36 h-40 text-[#94A3B8] animate-sway" viewBox="0 0 100 120" fill="currentColor">
          <path d="M50 120 C 50 80, 20 40, 10 0 C 15 20, 30 40, 50 120 M50 120 C 50 70, 70 30, 90 0 C 80 20, 65 50, 50 120" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Pill - Date & Tribute Notice */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#991B1B]/10 border border-[#991B1B]/30 text-[#991B1B] text-xs font-medium backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-ping"></span>
              <span className="font-bengali-sans font-semibold">দুর্গাপূজা ২০২৬: ১৯শে অক্টোবর, ২০২৬</span>
              <span className="text-[#B45309] font-sans font-normal border-l border-[#991B1B]/20 pl-2">
                19 October 2026 (Maha Sasthi)
              </span>
            </div>

            {/* Main Headline - Aesthetic Bengal Blend */}
            <div className="space-y-2">
              <p className="font-bengali-serif text-2xl sm:text-3xl text-[#B45309] font-bold tracking-wide">
                শুভ শারদীয়া ও বঙ্গ সংস্কৃতির অর্ঘ্য
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#7F1D1D] leading-tight">
                Aesthetic Heritage & <br />
                <span className="text-gold-gradient font-bengali-serif">দুর্গাপূজা Tribute</span>
              </h1>
            </div>

            {/* Description blending 20% Bengali script & 80% English */}
            <p className="text-gray-800 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              Welcome to an aesthetic tribute celebrating <span className="font-bengali-sans font-semibold text-[#991B1B]">বাংলার শিল্প ও সাহিত্য</span> (Bengali art and literature) on the eve of Durga Puja 2026. Experience the rhythmic resonance of <span className="font-bengali-sans font-semibold text-[#B45309]">ঢাক ও শঙ্খ</span> (Dhak and Conch shell), explore timeless literary works, admire Jamini Roy folk art, and draw digital <span className="font-bengali-sans font-semibold text-[#991B1B]">আল্পনা</span> patterns.
            </p>

            {/* Quick Interactive Audio Action Bar */}
            <div className="p-4 rounded-xl bg-white/80 border border-[#D97706]/30 shadow-md backdrop-blur-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#991B1B] text-[#FEF08A] flex items-center justify-center shadow">
                  <Volume2 className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <h4 className="font-bengali-sans font-bold text-sm text-[#7F1D1D]">
                    ঐতিহ্যবাহী শব্দ ও সুর
                  </h4>
                  <p className="text-xs text-gray-600">
                    Experience real Bengali soundscapes with synthesized audio
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    playShankhaSound();
                  }}
                  className="px-3 py-1.5 bg-[#991B1B] hover:bg-[#7F1D1D] text-[#FEF08A] rounded-lg text-xs font-bengali-sans font-semibold transition shadow active:scale-95 flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  শঙ্খ ধ্বনি
                </button>
                <button
                  onClick={() => {
                    playDhakBeat('roll');
                  }}
                  className="px-3 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-lg text-xs font-bengali-sans font-semibold transition shadow active:scale-95 flex items-center gap-1"
                >
                  <Music className="w-3.5 h-3.5" />
                  ঢাকের বাদ্য
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  onNavigate('dhak');
                  const el = document.getElementById('dhak');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-[#FFFDF7] font-semibold text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Music className="w-4 h-4 text-[#FEF08A]" />
                <span className="font-bengali-sans">ঢাক ও ধ্বনি শুনুন</span>
                <span className="text-xs opacity-75 font-sans">(Dhak Rhythm)</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('literature');
                  const el = document.getElementById('literature');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-[#7F1D1D] border-2 border-[#991B1B]/40 font-semibold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#D97706]" />
                <span className="font-bengali-sans">সাহিত্য সম্ভার</span>
                <span className="text-xs opacity-70 font-sans">(Literature)</span>
              </button>

              <button
                onClick={onOpenAiGenerator}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D97706] to-[#991B1B] text-white font-semibold text-sm shadow-md hover:opacity-95 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#FEF08A]" />
                <span className="font-bengali-sans">এআই কবিতা তৈরি করুন</span>
              </button>
            </div>

          </div>

          {/* Right Visual Column - Durga Trinayani Artwork Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Glowing Backdrop Circle */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#991B1B] via-[#D97706] to-[#FEF08A] opacity-25 blur-2xl animate-pulse"></div>

            {/* Sacred Frame Card */}
            <div className="relative w-full max-w-md bg-[#FFFDF7] rounded-3xl p-6 border-4 border-[#D97706]/60 shadow-2xl space-y-6 overflow-hidden">
              
              {/* Corner Alpana Motif Accents */}
              <div className="absolute top-2 left-2 text-[#991B1B] opacity-60 text-xs">✽ ✾ ✽</div>
              <div className="absolute top-2 right-2 text-[#991B1B] opacity-60 text-xs">✽ ✾ ✽</div>

              {/* Durga Eye Portrait Illustration (SVG) */}
              <div className="relative py-6 flex flex-col items-center justify-center bg-gradient-to-b from-[#7F1D1D] to-[#991B1B] rounded-2xl shadow-inner border border-[#D97706]/40">
                <p className="font-bengali-serif text-[#FEF08A] text-sm tracking-widest font-bold mb-2">
                  ॥ জয়া দুর্গেশ্বরী ॥
                </p>

                {/* Durga Trinayani Central Eye Graphics */}
                <div className="relative my-2 animate-eye-glow">
                  <svg width="220" height="140" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Third Eye (Trinayani Forehead Eye) */}
                    <path d="M100 20 C92 32 88 40 88 45 C88 52 93 56 100 56 C107 56 112 52 112 45 C112 40 108 32 100 20 Z" fill="#FEF08A" stroke="#DC2626" strokeWidth="2"/>
                    <circle cx="100" cy="42" r="4" fill="#991B1B"/>
                    
                    {/* Left Sacred Eye */}
                    <path d="M25 65 C50 40 85 45 95 68 C80 90 40 85 25 65 Z" fill="#FFFDF7" stroke="#FEF08A" strokeWidth="3"/>
                    <circle cx="60" cy="65" r="12" fill="#1E1B18"/>
                    <circle cx="60" cy="65" r="5" fill="#FEF08A"/>
                    <path d="M15 52 C45 35 80 40 90 55" stroke="#FEF08A" strokeWidth="3.5" strokeLinecap="round"/>

                    {/* Right Sacred Eye */}
                    <path d="M175 65 C150 40 115 45 105 68 C120 90 160 85 175 65 Z" fill="#FFFDF7" stroke="#FEF08A" strokeWidth="3"/>
                    <circle cx="140" cy="65" r="12" fill="#1E1B18"/>
                    <circle cx="140" cy="65" r="5" fill="#FEF08A"/>
                    <path d="M185 52 C155 35 120 40 110 55" stroke="#FEF08A" strokeWidth="3.5" strokeLinecap="round"/>

                    {/* Nose Pin / Nath Ring */}
                    <circle cx="100" cy="92" r="14" fill="none" stroke="#F59E0B" strokeWidth="2.5"/>
                    <circle cx="114" cy="92" r="3" fill="#DC2626"/>
                  </svg>
                </div>

                <p className="font-bengali-serif text-[#FAF6F0] text-xs font-medium text-center px-4 mt-2">
                  "যা দেবী সর্বভূতেষু শক্তিরূপেণ সংস্থিতা..."
                </p>
                <p className="text-[11px] text-[#FEF08A]/80 font-sans italic mt-0.5">
                  Salutations to the Goddess who abides in all beings as energy.
                </p>
              </div>

              {/* Cultural Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div
                  onClick={() => onNavigate('art')}
                  className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 hover:bg-amber-100 transition cursor-pointer group"
                >
                  <Palette className="w-5 h-5 text-[#991B1B] mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="font-bengali-sans font-bold text-xs text-[#7F1D1D] block">
                    যামিনী রায় ও পটচিত্র
                  </span>
                  <span className="text-[10px] text-gray-600 block">Jamini Roy & Folk Art</span>
                </div>

                <div
                  onClick={() => onNavigate('alpana')}
                  className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 hover:bg-amber-100 transition cursor-pointer group"
                >
                  <Sparkles className="w-5 h-5 text-[#D97706] mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="font-bengali-sans font-bold text-xs text-[#7F1D1D] block">
                    ডিজিটাল আল্পনা
                  </span>
                  <span className="text-[10px] text-gray-600 block">Digital Alpana Draw</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Scroll Down Indicator */}
        <div className="pt-12 text-center">
          <button
            onClick={() => {
              const el = document.getElementById('dhak');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex flex-col items-center text-xs text-gray-500 hover:text-[#991B1B] transition"
          >
            <span className="font-bengali-sans mb-1">সংস্কৃতি পরিক্রমা শুরু করুন</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#D97706]" />
          </button>
        </div>

      </div>
    </section>
  );
};
