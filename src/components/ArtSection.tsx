import React, { useState } from 'react';
import { ART_WORKS } from '../data/art';
import { ArtWork } from '../types';
import { Palette, Info, Copy, Check, Sparkles, Eye } from 'lucide-react';

export const ArtSection: React.FC = () => {
  const [selectedArt, setSelectedArt] = useState<ArtWork | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const categories = [
    'All',
    'Jamini Roy Tempera',
    'Kalighat Patachitra',
    'Terracotta Craft',
    'Clay Idol & Kumartuli',
    'Bengal School'
  ];

  const filteredArt = ART_WORKS.filter(
    (art) => activeCategory === 'All' || art.styleCategory === activeCategory
  );

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  // SVG Artwork Render Helper
  const renderSvgArt = (type: ArtWork['svgArtType']) => {
    switch (type) {
      case 'jamini_durga':
        return (
          <svg className="w-full h-48" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="150" fill="#991B1B" />
            <circle cx="100" cy="75" r="50" fill="#D97706" />
            {/* Jamini Roy Flat Eyes */}
            <path d="M60 70 C75 55 95 60 100 75 C90 90 70 85 60 70 Z" fill="#FFFDF7" stroke="#1E1B18" strokeWidth="3" />
            <circle cx="80" cy="71" r="5" fill="#1E1B18" />
            <path d="M140 70 C125 55 105 60 100 75 C110 90 130 85 140 70 Z" fill="#FFFDF7" stroke="#1E1B18" strokeWidth="3" />
            <circle cx="120" cy="71" r="5" fill="#1E1B18" />
            <path d="M100 45 L100 60" stroke="#FEF08A" strokeWidth="3" />
            <circle cx="100" cy="40" r="4" fill="#FEF08A" />
            <path d="M75 110 C90 120 110 120 125 110" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );

      case 'kalighat_cat':
        return (
          <svg className="w-full h-48" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="150" fill="#FFFDF7" />
            <path d="M40 30 Q100 10 160 30 Q180 80 150 130 Q100 140 50 130 Q20 80 40 30 Z" fill="#F59E0B" opacity="0.2" />
            {/* Sweeping Kalighat lines */}
            <path d="M50 80 C80 40 120 40 150 80" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
            <path d="M60 90 C85 60 115 60 140 90" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
            <circle cx="75" cy="70" r="8" fill="#1E293B" />
            <circle cx="125" cy="70" r="8" fill="#1E293B" />
          </svg>
        );

      case 'terracotta_temple':
        return (
          <svg className="w-full h-48" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="150" fill="#451A03" />
            {/* Terracotta Grid Tiles */}
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3, 4].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={10 + col * 36}
                  y={10 + row * 32}
                  width="32"
                  height="28"
                  fill="#9A3412"
                  stroke="#EA580C"
                  strokeWidth="1.5"
                  rx="3"
                />
              ))
            )}
            <circle cx="100" cy="75" r="22" fill="#EA580C" />
            <path d="M100 60 L100 90 M85 75 L115 75" stroke="#FFEDD5" strokeWidth="3" />
          </svg>
        );

      case 'kumartuli_idol':
        return (
          <svg className="w-full h-48" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="150" fill="#78350F" />
            <circle cx="100" cy="65" r="35" fill="#A16207" />
            <circle cx="100" cy="65" r="30" fill="#EAB308" />
            <path d="M85 60 C90 55 110 55 115 60" stroke="#78350F" strokeWidth="3" />
            <circle cx="92" cy="62" r="3" fill="#1E1B18" />
            <circle cx="108" cy="62" r="3" fill="#1E1B18" />
            {/* Crown ornament */}
            <path d="M70 40 L100 15 L130 40 Z" fill="#FEF3C7" stroke="#A16207" strokeWidth="2" />
          </svg>
        );

      default:
        return (
          <svg className="w-full h-48" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="150" fill="#B45309" />
            <circle cx="100" cy="75" r="40" fill="#FDE047" opacity="0.8" />
            <path d="M40 120 C80 80 120 80 160 120" stroke="#7C2D12" strokeWidth="8" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <section id="art" className="py-20 bg-gorod-texture border-t border-[#D97706]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#991B1B]/10 border border-[#991B1B]/30 text-[#991B1B] text-xs font-semibold">
            <Palette className="w-3.5 h-3.5" />
            <span className="font-bengali-sans">চিত্রকলা ও ঐতিহ্যবাহী শিল্প</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#7F1D1D]">
            Bengali Fine Arts & <span className="font-bengali-serif text-[#D97706]">শিল্প ও সংস্কৃতি</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base font-light">
            Discover the iconic art movements of Bengal—from Jamini Roy’s bold temperas and Kalighat Patachitra scrolls to Bishnupur Terracotta and Kumartuli clay idol craftsmanship.
          </p>
        </div>

        {/* Style Categories Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#991B1B] text-[#FFFDF7] shadow-md'
                  : 'bg-white text-gray-700 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              {cat === 'All' ? 'সকল শিল্পরীতি (All)' : cat}
            </button>
          ))}
        </div>

        {/* Artwork Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArt.map((art) => (
            <div
              key={art.id}
              className="bg-[#FFFDF7] rounded-3xl border-2 border-[#D97706]/30 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              
              {/* Card Header & SVG Illustration */}
              <div>
                <div className="relative overflow-hidden rounded-t-2xl border-b border-amber-200">
                  {renderSvgArt(art.svgArtType)}
                  
                  <div className="absolute top-3 left-3 bg-[#991B1B]/90 text-[#FEF08A] px-2.5 py-1 rounded-md text-[10px] font-bold uppercase backdrop-blur-sm">
                    {art.styleCategory}
                  </div>

                  <button
                    onClick={() => setSelectedArt(art)}
                    className="absolute bottom-3 right-3 bg-white/90 text-[#7F1D1D] p-2 rounded-full shadow hover:bg-white transition flex items-center gap-1 text-xs font-bold"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-bengali-serif font-bold text-xl text-[#7F1D1D] leading-snug">
                    {art.titleBn}
                  </h3>
                  <p className="text-xs text-gray-600 font-medium">{art.titleEn}</p>

                  <div className="text-xs font-bengali-sans text-[#D97706] font-semibold">
                    শিল্পী: {art.artistBn} ({art.artistEn}) • {art.period}
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
                    {art.descriptionEn}
                  </p>
                </div>
              </div>

              {/* Color Swatches & Action Bar */}
              <div className="px-6 pb-6 pt-2 border-t border-amber-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 font-semibold uppercase block mb-1">
                    Palette Swatches:
                  </span>
                  <div className="flex space-x-1.5">
                    {art.colorPaletteHex.map((hex, i) => (
                      <button
                        key={i}
                        onClick={() => handleCopyColor(hex)}
                        className="w-5 h-5 rounded-full border border-gray-300 shadow-sm transition hover:scale-125 relative group/swatch"
                        style={{ backgroundColor: hex }}
                        title={`Click to copy ${hex}`}
                      />
                    ))}
                  </div>
                  {copiedColor && (
                    <span className="text-[10px] text-green-600 font-bold block mt-1">
                      Copied {copiedColor}!
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedArt(art)}
                  className="px-3 py-1.5 bg-[#991B1B] hover:bg-[#7F1D1D] text-[#FEF08A] rounded-lg text-xs font-bengali-sans font-semibold transition"
                >
                  গল্প ও রচয়িতা
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detailed Story Modal */}
      {selectedArt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF7] max-w-2xl w-full rounded-3xl border-4 border-[#D97706] p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedArt(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#991B1B] text-xl font-bold w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center"
            >
              ✕
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider">
                {selectedArt.styleCategory} • {selectedArt.period}
              </span>
              <h3 className="font-bengali-serif text-2xl font-bold text-[#7F1D1D]">
                {selectedArt.titleBn}
              </h3>
              <p className="text-sm text-gray-600">{selectedArt.titleEn}</p>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
              {renderSvgArt(selectedArt.svgArtType)}
            </div>

            <div className="space-y-3">
              <h4 className="font-bengali-sans font-bold text-sm text-[#991B1B]">
                শিল্প ইতিহাস ও তাৎপর্য (Art History & Story):
              </h4>
              <p className="text-sm text-gray-800 leading-relaxed">
                {selectedArt.culturalStory}
              </p>
            </div>

            <div className="p-4 bg-amber-100/60 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-gray-700 font-bengali-sans block">
                রং নির্বাচন (Traditional Bengali Color Palette):
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedArt.colorPaletteHex.map((hex, i) => (
                  <button
                    key={i}
                    onClick={() => handleCopyColor(hex)}
                    className="px-3 py-1 bg-white rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: hex }} />
                    {hex}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={() => setSelectedArt(null)}
                className="px-6 py-2.5 bg-[#991B1B] text-white rounded-xl font-bengali-sans text-xs font-bold"
              >
                বন্ধ করুন (Close)
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
