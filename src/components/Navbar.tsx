import React, { useState, useEffect } from 'react';
import { Music, Sparkles, Menu, X, BookOpen, Palette, Calendar, Volume2, PenTool } from 'lucide-react';
import { playShankhaSound } from '../utils/audioSynth';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onOpenAiGenerator: () => void;
  onOpenGlossary: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onOpenAiGenerator,
  onOpenGlossary,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [daysLeft, setDaysLeft] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Calculate days remaining to Durga Puja (October 19, 2026)
    const targetDate = new Date('2026-10-19T00:00:00');
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setDaysLeft(days > 0 ? days : 0);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { id: 'hero', labelBn: 'আগমনী', labelEn: 'Home', icon: Sparkles },
    { id: 'dhak', labelBn: 'ঢাক ও ধ্বনি', labelEn: 'Dhak Rhythm', icon: Music },
    { id: 'literature', labelBn: 'সাহিত্য সম্ভার', labelEn: 'Literature', icon: BookOpen },
    { id: 'art', labelBn: 'শিল্প ও সংস্কৃতি', labelEn: 'Art Gallery', icon: Palette },
    { id: 'alpana', labelBn: 'আল্পনা ক্যানভাস', labelEn: 'Alpana Canvas', icon: PenTool },
    { id: 'puja', labelBn: 'পূজা পরিক্রমা', labelEn: 'Puja 2026', icon: Calendar },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#7F1D1D]/95 backdrop-blur-md shadow-lg py-2.5 border-b border-[#D97706]/40'
          : 'bg-gradient-to-b from-[#7F1D1D]/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Durga Eyes Icon */}
          <button
            onClick={() => {
              setActiveSection('hero');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-3 text-left group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D97706] to-[#FEF08A] p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#7F1D1D] rounded-full flex items-center justify-center">
                {/* Durga Trinayani SVG */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4C7 8 3 12 3 12C3 12 7 16 12 20C17 16 21 12 21 12C21 12 17 8 12 4Z" fill="#DC2626" stroke="#FEF08A" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="3" fill="#FEF08A"/>
                  <circle cx="12" cy="12" r="1.5" fill="#1E1B18"/>
                </svg>
              </div>
            </div>
            <div>
              <div className="font-bengali-serif text-lg font-bold text-[#FFFDF7] leading-tight flex items-center gap-1.5">
                শারদীয়া <span className="text-[#F59E0B] text-xs font-sans px-1.5 py-0.5 bg-[#991B1B] rounded border border-[#D97706]/50">২০২৬</span>
              </div>
              <p className="text-[10px] text-[#FEF08A]/80 tracking-wider uppercase">
                Aesthetic Bengali Tribute
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-[#D97706] text-[#FFFDF7] font-medium shadow-sm'
                      : 'text-[#FAF6F0]/90 hover:text-[#FEF08A] hover:bg-[#991B1B]/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#FEF08A]" />
                  <span className="font-bengali-sans font-medium">{item.labelBn}</span>
                  <span className="text-[11px] opacity-70 ml-0.5">({item.labelEn})</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Widgets */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Live Durga Puja Countdown Badge */}
            <div className="bg-[#991B1B]/80 border border-[#D97706]/60 rounded-full px-3 py-1 flex items-center space-x-2 text-xs text-[#FFFDF7] shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="font-bengali-sans">পূজা আসতে:</span>
              <span className="font-bold text-[#F59E0B]">{daysLeft} দিন</span>
            </div>

            {/* Shankha Blow Sound Button */}
            <button
              onClick={playShankhaSound}
              title="Play Sacred Conch Shell Sound (শঙ্খ ধ্বনি)"
              className="p-2 bg-[#991B1B] hover:bg-[#D97706] text-[#FEF08A] rounded-full border border-[#D97706]/60 transition-colors shadow-sm active:scale-95 flex items-center gap-1 text-xs"
            >
              <Volume2 className="w-4 h-4" />
              <span className="font-bengali-sans text-xs hidden xl:inline">শঙ্খ ধ্বনি</span>
            </button>

            {/* AI Sharodiya Wish Modal Trigger */}
            <button
              onClick={onOpenAiGenerator}
              className="bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#F59E0B] hover:to-[#D97706] text-white px-3.5 py-1.5 rounded-lg text-xs font-medium shadow-md flex items-center space-x-1.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FEF08A]" />
              <span className="font-bengali-sans font-bold">এআই কবিতা</span>
            </button>

            {/* Glossary Drawer Trigger */}
            <button
              onClick={onOpenGlossary}
              className="p-2 text-[#FEF08A] hover:bg-[#991B1B]/80 rounded-lg text-xs border border-[#D97706]/30 transition-colors"
              title="Bengali Glossary & Terms"
            >
              শব্দকোষ
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenAiGenerator}
              className="bg-[#D97706] text-white p-1.5 rounded-md text-xs font-medium flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#FFFDF7] hover:bg-[#991B1B] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#7F1D1D] border-b border-[#D97706]/40 px-4 pt-2 pb-6 space-y-2 mt-2 shadow-2xl">
          <div className="bg-[#991B1B] p-2.5 rounded-lg mb-3 border border-[#D97706]/40 text-center text-xs text-[#FEF08A]">
            <span className="font-bengali-sans font-bold text-sm text-[#FFFDF7] block">
              দুর্গাপূজা ২০২৬ (Durga Puja 2026)
            </span>
            <span>১৯শে অক্টোবর, ২০২৬ • বাকি মাত্র {daysLeft} দিন</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`p-2.5 rounded-lg text-left text-xs flex items-center space-x-2 ${
                    activeSection === item.id
                      ? 'bg-[#D97706] text-white font-bold'
                      : 'bg-[#991B1B]/70 text-[#FAF6F0] hover:bg-[#991B1B]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#FEF08A]" />
                  <div>
                    <div className="font-bengali-sans">{item.labelBn}</div>
                    <div className="text-[10px] opacity-75">{item.labelEn}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                playShankhaSound();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 bg-[#991B1B] border border-[#D97706]/60 text-[#FEF08A] rounded-lg text-xs font-bengali-sans flex items-center justify-center gap-1"
            >
              <Volume2 className="w-4 h-4" />
              শঙ্খ বাজান
            </button>
            <button
              onClick={() => {
                onOpenGlossary();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 bg-[#991B1B] border border-[#D97706]/60 text-[#FFFDF7] rounded-lg text-xs font-bengali-sans flex items-center justify-center gap-1"
            >
              শব্দকোষ অর্থ
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
