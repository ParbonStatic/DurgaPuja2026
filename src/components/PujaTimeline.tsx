import React, { useState } from 'react';
import { PUJA_DAYS_2026 } from '../data/pujaData';
import { PujaDay } from '../types';
import { Calendar, Flame, Droplets, Sparkles, Music, Heart, Utensils, Shirt } from 'lucide-react';

export const PujaTimeline: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<PujaDay>(PUJA_DAYS_2026[1]); // Default to Sasthi (Oct 19, 2026)

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#DC2626]" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-blue-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#D97706]" />;
      case 'Music':
        return <Music className="w-5 h-5 text-purple-600" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-[#DC2626]" />;
      default:
        return <Calendar className="w-5 h-5 text-[#D97706]" />;
    }
  };

  return (
    <section id="puja" className="py-20 bg-gorod-texture border-t border-[#D97706]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#991B1B]/10 border border-[#991B1B]/30 text-[#991B1B] text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span className="font-bengali-sans">দুর্গাপূজা ২০২৬ পরিক্রমা (October 19, 2026)</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#7F1D1D]">
            Durga Puja 2026 Calendar & <span className="font-bengali-serif text-[#D97706]">পূজা পরিক্রমা</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base font-light">
            Journey through the six sacred days of Durga Puja 2026—from Mahalaya dawn to Maha Ashtami Pushpanjali and Bijoya Dashami Sindoor Khela.
          </p>
        </div>

        {/* Timeline Day Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {PUJA_DAYS_2026.map((day) => {
            const isSelected = selectedDay.id === day.id;
            return (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day)}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-200 transform hover:-translate-y-0.5 ${
                  isSelected
                    ? 'bg-[#991B1B] text-[#FFFDF7] border-[#D97706] shadow-xl ring-2 ring-[#D97706]/40 scale-[1.02]'
                    : 'bg-white text-gray-800 border-amber-200 hover:bg-amber-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-[#7F1D1D] text-[#FEF08A]' : 'bg-amber-100 text-[#991B1B]'
                    }`}
                  >
                    {day.date2026.split(',')[0]}
                  </span>
                  {renderIcon(day.iconName)}
                </div>
                <div className="font-bengali-serif font-bold text-sm mt-1 leading-tight">
                  {day.dayNameBn.split('-')[0]}
                </div>
                <div className="text-[10px] opacity-75 mt-0.5 font-sans">
                  {day.dayNameEn.split('-')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Day Feature Spotlight Card */}
        <div className="bg-[#FFFDF7] rounded-3xl border-4 border-[#D97706] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Day Meta & Sacred Ritual */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-[#991B1B] text-xs font-bold font-bengali-sans">
                <span>{selectedDay.banglaDate}</span>
                <span>•</span>
                <span>{selectedDay.tithi}</span>
              </div>

              <div>
                <h3 className="font-bengali-serif text-3xl sm:text-4xl font-extrabold text-[#7F1D1D] leading-tight">
                  {selectedDay.dayNameBn}
                </h3>
                <p className="text-sm font-semibold text-[#D97706] mt-1">{selectedDay.dayNameEn}</p>
                <p className="text-xs text-gray-500 font-mono mt-0.5">Date: {selectedDay.date2026}</p>
              </div>

              {/* Ritual Highlight */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                <span className="font-bengali-sans font-bold text-xs text-[#991B1B] uppercase tracking-wider block">
                  প্রধান সামাজিক ও ধর্মীয় আচার (Primary Sacred Rituals):
                </span>
                <p className="text-sm text-gray-800 leading-relaxed font-light">
                  {selectedDay.primaryRitual}
                </p>
              </div>

              {/* Spiritual Significance */}
              <div className="p-4 bg-[#7F1D1D] text-[#FFFDF7] rounded-2xl border border-[#D97706]/40 space-y-1 shadow-md">
                <span className="font-bengali-sans font-bold text-xs text-[#FEF08A] uppercase tracking-wider block">
                  আধ্যাত্মিক তাৎপর্য (Spiritual Significance):
                </span>
                <p className="text-xs sm:text-sm text-gray-100 leading-relaxed font-light">
                  {selectedDay.spiritualSignificance}
                </p>
              </div>

            </div>

            {/* Right Column: Traditional Bhog & Attire Guide */}
            <div className="lg:col-span-5 bg-amber-50/80 p-6 rounded-3xl border-2 border-amber-200 space-y-5">
              
              {/* Bhog Offering */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#7F1D1D]">
                  <Utensils className="w-4 h-4 text-[#D97706]" />
                  <h4 className="font-bengali-sans font-bold text-sm">
                    বিশেষ পূজা ভোগ ও প্রসাদ (Bhog Delicacies):
                  </h4>
                </div>
                <p className="text-xs text-gray-800 leading-relaxed bg-white p-3 rounded-xl border border-amber-200 shadow-sm font-medium">
                  {selectedDay.bhogSpeciality}
                </p>
              </div>

              {/* Attire Guide */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#7F1D1D]">
                  <Shirt className="w-4 h-4 text-[#991B1B]" />
                  <h4 className="font-bengali-sans font-bold text-sm">
                    ঐতিহ্যবাহী পোশাক প্রস্তাবনা (Traditional Attire):
                  </h4>
                </div>
                <p className="text-xs text-gray-800 leading-relaxed bg-white p-3 rounded-xl border border-amber-200 shadow-sm font-medium">
                  {selectedDay.attireRecommendation}
                </p>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-gray-500 font-bengali-serif italic block">
                  "আসছে বছর আবার হবে • শারদীয়া ২০২৬"
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
