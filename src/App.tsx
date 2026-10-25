import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OperationalStrip } from './components/OperationalStrip';
import { About } from './components/About';
import { ExperienceSection } from './components/Experience';
import { SkillsSection } from './components/Skills';
import { ProjectsSection } from './components/Projects';
import { CertificationsSection } from './components/Certifications';
import { LearningJourneySection } from './components/LearningJourney';
import { ContactSection } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 flex flex-col font-sans selection:bg-sky-500/25 selection:text-sky-200">
      {/* Top Navigation */}
      <Navbar onOpenResume={() => setResumeModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenResume={() => setResumeModalOpen(true)} />

        {/* 2. Operational Presence Strip */}
        <OperationalStrip />

        {/* 3. About / Professional Philosophy */}
        <About />

        {/* 4. Professional Experience Timeline */}
        <ExperienceSection />

        {/* 5. Technical Skills Inventory */}
        <SkillsSection />

        {/* 6. Technical Case Studies */}
        <ProjectsSection />

        {/* 7. Education & Certifications */}
        <CertificationsSection />

        {/* 8. Learning Journey: Building Beyond the Ticket */}
        <LearningJourneySection />

        {/* 9. Contact & Direct Connection */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenResume={() => setResumeModalOpen(true)} />

      {/* Verified Technical Resume Modal (Print & ATS-Optimized) */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
