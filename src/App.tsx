import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CursorFollower } from './components/CursorFollower';
import { Hero } from './components/Hero';
import { DhakSoundboard } from './components/DhakSoundboard';
import { LiteratureSection } from './components/LiteratureSection';
import { ArtSection } from './components/ArtSection';
import { AlpanaCanvas } from './components/AlpanaCanvas';
import { PujaTimeline } from './components/PujaTimeline';
import { GlossaryModal } from './components/GlossaryModal';
import { AiPoemModal } from './components/AiPoemModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [aiPoemOpen, setAiPoemOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-gray-900 font-sans selection:bg-[#D97706] selection:text-white relative">
      
      {/* Custom Bel Pata Mouse Pointer & Particle Trail */}
      <CursorFollower />

      {/* Navigation Header Bar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenAiGenerator={() => setAiPoemOpen(true)}
        onOpenGlossary={() => setGlossaryOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        {/* 1. Hero Section with Durga Puja 2026 Countdown */}
        <Hero
          onNavigate={(secId) => {
            setActiveSection(secId);
          }}
          onOpenAiGenerator={() => setAiPoemOpen(true)}
        />

        {/* 2. Interactive Dhak & Kansar Rhythm Soundboard */}
        <DhakSoundboard />

        {/* 3. Bengali Literature Heritage */}
        <LiteratureSection onOpenAiGenerator={() => setAiPoemOpen(true)} />

        {/* 4. Bengali Art & Heritage Gallery */}
        <ArtSection />

        {/* 5. Interactive Digital Alpana Designer Canvas */}
        <AlpanaCanvas />

        {/* 6. Durga Puja 2026 Day-by-Day Journey */}
        <PujaTimeline />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <GlossaryModal isOpen={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
      <AiPoemModal isOpen={aiPoemOpen} onClose={() => setAiPoemOpen(false)} />

    </div>
  );
}
