import React, { useState, useEffect } from 'react';
import { ExplorationRoute } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { RouteSelector } from './components/RouteSelector';
import { Hero } from './components/Hero';
import { OperationalStrip } from './components/OperationalStrip';
import { About } from './components/About';
import { ExperienceSection } from './components/Experience';
import { IncidentSimulator } from './components/IncidentSimulator';
import { SkillsSection } from './components/Skills';
import { ProjectsSection } from './components/Projects';
import { ProjectShowcase } from './components/ProjectShowcase';
import { CertificationsSection } from './components/Certifications';
import { LearningJourneySection } from './components/LearningJourney';
import { ContactSection } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { CyberBackground } from './components/CyberBackground';
import { audioFx } from './utils/audioFx';

export default function App() {
  const [activeRoute, setActiveRoute] = useState<ExplorationRoute>('all');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        audioFx.playClick(600);
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleAudio = () => {
    const isNowUnmuted = audioFx.toggleMute();
    setIsAudioMuted(!isNowUnmuted);
  };

  return (
    <div className="min-h-screen bg-[#040814] text-slate-100 flex flex-col font-sans selection:bg-sky-500/25 selection:text-sky-200 relative overflow-x-hidden">
      
      {/* Interactive 60fps Cyber Constellation Canvas Background */}
      <CyberBackground />

      {/* Top Navigation with Scroll Progress Indicator & HUD Controls */}
      <Navbar 
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
      />

      {/* Sticky 'Choose Your Route' Recruiter Perspective Selector */}
      <RouteSelector
        activeRoute={activeRoute}
        onRouteChange={(route) => {
          audioFx.playClick(500);
          setActiveRoute(route);
        }}
      />

      {/* Main Content Sections (Story-Driven Chapters & Interactive Hubs) */}
      <main className="flex-1 relative z-10">
        {/* Opening: Hero with Tri-Mode HUD (Topology, Terminal, and Architecture Matrix) */}
        <Hero 
          onOpenResume={() => setResumeModalOpen(true)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        {/* 4 Professional Themes Bar */}
        <OperationalStrip />

        {/* Chapter 01: The Operator (Mindset & Progression) */}
        <About />

        {/* Chapter 02: The Journey (Interactive Career Timeline) */}
        <ExperienceSection activeRoute={activeRoute} />

        {/* Interactive Feature: The Diagnostic Sandbox (Incident Simulator) */}
        <div id="simulator">
          <IncidentSimulator />
        </div>

        {/* Chapter 03: The Problem Solver (Missions & Case Studies) */}
        <ProjectsSection activeRoute={activeRoute} />

        {/* Chapter 04: The Toolkit (Interactive Skills Explorer) */}
        <SkillsSection activeRoute={activeRoute} />

        {/* Chapter 05: The Builder (Projects & Technical Implementations) */}
        <ProjectShowcase activeRoute={activeRoute} />

        {/* Accreditations: Certifications & Education */}
        <CertificationsSection />

        {/* Target Roles: Building Toward What's Next */}
        <LearningJourneySection />

        {/* Chapter 06: The Next Mission (Contact & Outreach) */}
        <ContactSection />
      </main>

      {/* Footer with Chapter Summary & Back-to-Top */}
      <Footer onOpenResume={() => setResumeModalOpen(true)} />

      {/* Verified Technical Resume Modal (ATS-Optimized & Print-Ready) */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Interactive Cybernetic Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectRoute={(route) => setActiveRoute(route)}
        onOpenResume={() => setResumeModalOpen(true)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
      />
    </div>
  );
}
