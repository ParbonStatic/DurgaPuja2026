import React, { useState } from 'react';
import { LITERARY_WORKS } from '../data/literature';
import { LiteraryWork } from '../types';
import { BookOpen, Sparkles, Volume2, Quote, Check, Search } from 'lucide-react';

interface LiteratureSectionProps {
  onOpenAiGenerator: () => void;
}

export const LiteratureSection: React.FC<LiteratureSectionProps> = ({ onOpenAiGenerator }) => {
  const [selectedWork, setSelectedWork] = useState<LiteraryWork | null>(LITERARY_WORKS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const categories = ['All', 'Poetry', 'Song / Agamani', 'Children / Whimsical', 'Prose'];

  const filteredWorks = LITERARY_WORKS.filter((work) => {
    const matchesCategory = activeCategory === 'All' || work.category === activeCategory;
    const matchesSearch =
      work.titleBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.authorBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.authorEn.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'bn-IN'; // Bengali speech
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis is not supported in this browser.');
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="literature" className="py-20 bg-[#FFFDF7] relative overflow-hidden">
      
      {/* Background Decorative Touches */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#991B1B]/10 border border-[#991B1B]/30 text-[#991B1B] text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span className="font-bengali-sans">বাংলা সাহিত্য ও কবিতার অর্ঘ্য</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#7F1D1D]">
              Bengali Literature & <span className="font-bengali-serif text-[#D97706]">সাহিত্য সম্ভার</span>
            </h2>
            <p className="text-gray-700 text-sm sm:text-base font-light max-w-2xl">
              Immerse yourself in Bengali poetry and prose from Rabindranath Tagore, Kazi Nazrul Islam, Sukumar Ray, and Jibanananda Das. 20% authentic Bengali wording blended with English meanings.
            </p>
          </div>

          {/* AI Poem Generator Callout */}
          <button
            onClick={onOpenAiGenerator}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#991B1B] text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-[#FEF08A]" />
            <span className="font-bengali-sans font-bold">এআই কবিতা তৈরি করুন</span>
          </button>
        </div>

        {/* Filter Pills & Search Box */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-amber-50/80 p-3 rounded-2xl border border-amber-200">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[#991B1B] text-[#FFFDF7] shadow-sm'
                    : 'text-gray-700 hover:bg-amber-100'
                }`}
              >
                {cat === 'All' ? 'সবকিছু (All)' : cat}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search author, title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
            />
          </div>

        </div>

        {/* Main Content Layout: Card Selection Grid + Detailed Reader View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Literary Works List (5 cols) */}
          <div className="lg:col-span-5 space-y-3 max-h-[650px] overflow-y-auto pr-1">
            {filteredWorks.map((work) => {
              const isSelected = selectedWork?.id === work.id;
              return (
                <div
                  key={work.id}
                  onClick={() => setSelectedWork(work)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#7F1D1D] text-[#FFFDF7] border-[#D97706] shadow-lg scale-[1.01]'
                      : 'bg-white hover:bg-amber-50/60 border-amber-200 text-gray-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                          isSelected ? 'bg-[#991B1B] text-[#FEF08A]' : 'bg-amber-100 text-[#991B1B]'
                        }`}
                      >
                        {work.category}
                      </span>
                      <h3
                        className={`font-bengali-serif font-bold text-lg mt-1.5 ${
                          isSelected ? 'text-[#FEF08A]' : 'text-[#7F1D1D]'
                        }`}
                      >
                        {work.titleBn}
                      </h3>
                      <p className={`text-xs ${isSelected ? 'text-gray-200' : 'text-gray-600'}`}>
                        {work.titleEn}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-current/10 flex items-center justify-between text-xs">
                    <span className="font-bengali-sans font-medium">
                      {work.authorBn} ({work.authorEn})
                    </span>
                    <span className="text-[11px] opacity-75">{work.year}</span>
                  </div>
                </div>
              );
            })}

            {filteredWorks.length === 0 && (
              <div className="text-center py-12 text-gray-500 bg-amber-50/50 rounded-2xl">
                কোন সাহিত্যকর্ম পাওয়া যায়নি (No literary works found).
              </div>
            )}
          </div>

          {/* Right Column: Detailed Interactive Literary Reader (7 cols) */}
          {selectedWork && (
            <div className="lg:col-span-7 bg-gorod-texture p-6 sm:p-8 rounded-3xl border-2 border-[#D97706]/40 shadow-xl space-y-6 relative">
              
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-200">
                <div>
                  <span className="text-xs font-semibold text-[#D97706] uppercase tracking-wider">
                    {selectedWork.category} • {selectedWork.year}
                  </span>
                  <h3 className="font-bengali-serif text-2xl font-bold text-[#7F1D1D]">
                    {selectedWork.titleBn}
                  </h3>
                  <p className="text-sm text-gray-600">{selectedWork.titleEn}</p>
                </div>

                {/* Reader Toolbar Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleSpeak(selectedWork.fullTextBn)}
                    className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition ${
                      isSpeaking
                        ? 'bg-[#991B1B] text-white border-[#991B1B] animate-pulse'
                        : 'bg-white text-[#7F1D1D] border-amber-300 hover:bg-amber-100'
                    }`}
                    title="Listen to Bengali Recitation"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="font-bengali-sans hidden sm:inline">আবৃত্তি শোনেন</span>
                  </button>

                  <button
                    onClick={() => handleCopy(`${selectedWork.titleBn}\n${selectedWork.fullTextBn}`)}
                    className="p-2 bg-white text-gray-700 rounded-lg border border-amber-300 hover:bg-amber-100 text-xs transition"
                    title="Copy Text"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Quote className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Author Badge */}
              <div className="flex items-center space-x-3 bg-amber-100/60 p-3 rounded-xl border border-amber-200">
                <div className="w-10 h-10 rounded-full bg-[#991B1B] text-[#FEF08A] font-bengali-serif font-bold text-lg flex items-center justify-center">
                  {selectedWork.authorBn[0]}
                </div>
                <div>
                  <h4 className="font-bengali-serif font-bold text-sm text-[#7F1D1D]">
                    {selectedWork.authorBn}
                  </h4>
                  <p className="text-xs text-gray-600">{selectedWork.authorEn}</p>
                </div>
              </div>

              {/* Dual Text Viewer (Bengali Script & English Meaning Side-by-Side or Stacked) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-amber-200 shadow-inner">
                
                {/* Bengali Original Script */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#991B1B] uppercase tracking-wider block font-bengali-sans">
                    মূল বাংলা বাণী (Bengali Script)
                  </span>
                  <p className="font-bengali-serif text-base sm:text-lg text-gray-900 leading-relaxed whitespace-pre-line font-medium">
                    {selectedWork.fullTextBn}
                  </p>
                </div>

                {/* English Poetic Translation */}
                <div className="space-y-2 border-t md:border-t-0 md:border-l border-amber-200 pt-4 md:pt-0 md:pl-6">
                  <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider block">
                    Poetic Translation & Meaning
                  </span>
                  <p className="font-serif text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line italic">
                    {selectedWork.fullTextEn}
                  </p>
                </div>

              </div>

              {/* Bengali Vocabulary Highlights (20% balance) */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#7F1D1D] font-bengali-sans block">
                  শব্দার্থ হাইলাইট (Key Bengali Terms):
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedWork.bengaliWordHighlights.map((hw, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-medium text-gray-800 flex items-center gap-1.5"
                    >
                      <span className="font-bengali-sans font-bold text-[#991B1B]">{hw.wordBn}</span>
                      <span className="text-gray-500 text-[11px]">= {hw.meaningEn}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Cultural Context Note */}
              <div className="p-4 bg-amber-50/90 rounded-2xl border border-amber-200 text-xs text-gray-700 space-y-1">
                <span className="font-bold text-[#991B1B] font-bengali-sans block">
                  সাংস্কৃতিক প্রাসঙ্গিকতা (Cultural Context):
                </span>
                <p className="leading-relaxed">{selectedWork.culturalNote}</p>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
