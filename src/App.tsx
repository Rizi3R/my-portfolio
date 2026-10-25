import React, { useState } from 'react';
import { ExplorationRoute } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { RouteSelector } from './components/RouteSelector';
import { Hero } from './components/Hero';
import { OperationalStrip } from './components/OperationalStrip';
import { About } from './components/About';
import { ExperienceSection } from './components/Experience';
import { SkillsSection } from './components/Skills';
import { ProjectsSection } from './components/Projects';
import { ProjectShowcase } from './components/ProjectShowcase';
import { CertificationsSection } from './components/Certifications';
import { LearningJourneySection } from './components/LearningJourney';
import { ContactSection } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [activeRoute, setActiveRoute] = useState<ExplorationRoute>('all');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 flex flex-col font-sans selection:bg-sky-500/25 selection:text-sky-200">
      
      {/* Top Navigation with Scroll Progress Indicator */}
      <Navbar onOpenResume={() => setResumeModalOpen(true)} />

      {/* Sticky 'Choose Your Route' Recruiter Perspective Selector */}
      <RouteSelector
        activeRoute={activeRoute}
        onRouteChange={setActiveRoute}
      />

      {/* Main Content Sections (Story-Driven Chapters) */}
      <main className="flex-1">
        {/* Opening: Hero with Interactive Terminal Status Panel */}
        <Hero onOpenResume={() => setResumeModalOpen(true)} />

        {/* 4 Professional Themes Bar */}
        <OperationalStrip />

        {/* Chapter 01: The Operator */}
        <About />

        {/* Chapter 02: The Journey (Interactive Career Timeline) */}
        <ExperienceSection activeRoute={activeRoute} />

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
    </div>
  );
}
