import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FocusAreas } from './components/FocusAreas';
import { Projects } from './components/Projects';
import { AiPlayground } from './components/AiPlayground';
import { Experience } from './components/Experience';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-900 flex flex-col font-sans selection:bg-stone-200 selection:text-stone-900">
      {/* Strict 3-zone navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Split Hero Section with authentic portrait & proof */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* 3 Core Architectural Pillars */}
        <FocusAreas />

        {/* Selected Works with interactive category filtering & case study modals */}
        <Projects />

        {/* Interactive Inference & VRAM Architecture Lab */}
        <AiPlayground />

        {/* Editorial Timeline of Experience & Publications */}
        <Experience />

        {/* 4-Domain Technical Competencies Repertoire */}
        <SkillsMatrix />

        {/* Direct Contact Form & Links */}
        <ContactSection />
      </main>

      {/* Quiet, verified footer */}
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      {/* Printable Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
