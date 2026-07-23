import React from 'react';
import { Heart, Sparkles, Volume2 } from 'lucide-react';
import { playShankhaSound } from '../utils/audioSynth';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#7F1D1D] text-[#FFFDF7] border-t-4 border-[#D97706] pt-12 pb-8 relative overflow-hidden">
      
      {/* Background Subtle Alpana Watermark */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Top Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#D97706]/40 items-center">
          
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🕉️</span>
              <h3 className="font-bengali-serif text-2xl font-bold text-[#FEF08A]">
                শুভ শারদীয়া ২০২৬ • Subho Sharodiya
              </h3>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed font-light max-w-md">
              A tribute to Bengal's heritage, literature, art, and the divine spirit of Durga Puja on October 19, 2026. Celebrating 20% authentic Bengali wording with timeless traditions.
            </p>
          </div>

          <div className="md:col-span-6 flex flex-col sm:flex-row items-center justify-md-end gap-3">
            <button
              onClick={playShankhaSound}
              className="w-full sm:w-auto px-4 py-2.5 bg-[#991B1B] hover:bg-[#D97706] text-[#FEF08A] rounded-xl text-xs font-bengali-sans font-bold border border-[#D97706]/60 transition shadow flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              শঙ্খ ধ্বনিতে প্রণাম
            </button>

            <a
              href="#hero"
              className="w-full sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bengali-sans font-semibold text-center transition border border-white/20"
            >
              উপরে যান (Back to Top)
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-amber-200/80 gap-3">
          <div className="font-bengali-sans flex items-center gap-1">
            <span>© ২০২৬ শারদীয়া শ্রদ্ধাঞ্জলি</span>
            <span>•</span>
            <span>১৪৩৩ বঙ্গাব্দ</span>
            <span>•</span>
            <span>ParbonStatic Project</span>
          </div>

          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#DC2626] fill-current inline" />
            <span>for Bengali Art, Literature & Culture</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
