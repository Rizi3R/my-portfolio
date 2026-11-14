import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar, ActiveView } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TimelineSection } from './components/TimelineSection';
import { ConstellationSection } from './components/ConstellationSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { ReceiptSection } from './components/ReceiptSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';
import { audioFx } from './utils/audioFx';
import { StratumType } from './data/universeContent';
import { Loader2, X, ArrowLeft } from 'lucide-react';

// Code-split secondary workspace perspectives and heavy simulation modules
const TraceView = lazy(() =>
  import('./components/TraceView').then((m) => ({ default: m.TraceView }))
);
const AtlasView = lazy(() =>
  import('./components/AtlasView').then((m) => ({ default: m.AtlasView }))
);
const PlainView = lazy(() =>
  import('./components/PlainView').then((m) => ({ default: m.PlainView }))
);
const TheLab = lazy(() =>
  import('./components/TheLab').then((m) => ({ default: m.TheLab }))
);
const ResumeModal = lazy(() =>
  import('./components/ResumeModal').then((m) => ({ default: m.ResumeModal }))
);

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('portfolio');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);
  const [labModalOpen, setLabModalOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [selectedAtlasNodeId, setSelectedAtlasNodeId] = useState<string | null>(null);

  // Initialize view from URL query param or hash on first render
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view') as ActiveView | null;
    if (viewParam && ['portfolio', 'trace', 'atlas', 'plain'].includes(viewParam)) {
      setActiveView(viewParam);
    } else if (window.location.hash === '#trace') {
      setActiveView('trace');
    } else if (window.location.hash === '#atlas') {
      setActiveView('atlas');
    } else if (window.location.hash === '#plain') {
      setActiveView('plain');
    }
  }, []);

  // Sync view updates cleanly to URL search params without reload
  const handleViewChange = (view: ActiveView) => {
    setActiveView(view);
    const url = new URL(window.location.href);
    if (view === 'portfolio') {
      url.searchParams.delete('view');
    } else {
      url.searchParams.set('view', view);
    }
    window.history.replaceState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (activeView !== 'portfolio') {
      handleViewChange('portfolio');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 90);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Global keyboard shortcuts (Cmd/Ctrl+K for Command Palette, Escape for open drawers)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        audioFx.playClick(600);
        setCommandPaletteOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (terminalModalOpen) setTerminalModalOpen(false);
        if (labModalOpen) setLabModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalModalOpen, labModalOpen]);

  // Lock body scroll when overlay dialogs are mounted
  useEffect(() => {
    if (terminalModalOpen || labModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [terminalModalOpen, labModalOpen]);

  const handleToggleAudio = () => {
    const isNowUnmuted = audioFx.toggleMute();
    setIsAudioMuted(!isNowUnmuted);
  };

  const handleSelectNodeInAtlas = (nodeId: string) => {
    if (nodeId) {
      setSelectedAtlasNodeId(nodeId);
    }
    handleViewChange('atlas');
  };

  const handleJumpToStratum = (stratumId: StratumType) => {
    handleViewChange('trace');
    setTimeout(() => {
      document.getElementById(`stratum-${stratumId}`)?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  const handleOpenExperience = () => {
    handleNavigateSection('experience');
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-[#B0E0E6]/25 selection:text-[#B0E0E6] relative overflow-x-hidden ${
        activeView === 'plain' ? 'bg-white text-stone-900' : 'tech-universe-bg text-white'
      }`}
    >
      {/* Top Bar Navigation (3-Zone Contract) */}
      <Navbar
        activeView={activeView}
        onChangeView={handleViewChange}
        onNavigateSection={handleNavigateSection}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 relative z-10 pt-16">
        {activeView === 'plain' ? (
          <Suspense
            fallback={
              <div className="py-24 text-center font-mono text-sm text-stone-600 flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-stone-800" />
                <span>Loading Semantic Specification...</span>
              </div>
            }
          >
            <div className="max-w-4xl mx-auto px-6 pt-6 print:hidden">
              <button
                type="button"
                onClick={() => handleViewChange('portfolio')}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1B1B1D] text-[#B0E0E6] text-xs font-mono hover:bg-[#2B2B30] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back to Portfolio Overview</span>
              </button>
            </div>
            <PlainView />
          </Suspense>
        ) : activeView === 'atlas' ? (
          <Suspense
            fallback={
              <div className="py-32 text-center font-mono text-sm text-[#B0E0E6] flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading Knowledge Topology Atlas...</span>
              </div>
            }
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 print:hidden">
              <button
                type="button"
                onClick={() => handleViewChange('portfolio')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#222226] border border-[#323238] hover:border-[#B0E0E6]/50 text-[#B0E0E6] text-xs font-mono transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back to Portfolio Overview</span>
              </button>
            </div>
            <AtlasView
              initialSelectedNodeId={selectedAtlasNodeId}
              onJumpToStratum={handleJumpToStratum}
              onOpenExperience={handleOpenExperience}
            />
            <ReceiptSection />
          </Suspense>
        ) : activeView === 'trace' ? (
          <Suspense
            fallback={
              <div className="py-32 text-center font-mono text-sm text-[#B0E0E6] flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading Beep to Receipt Strata...</span>
              </div>
            }
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 print:hidden">
              <button
                type="button"
                onClick={() => handleViewChange('portfolio')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#222226] border border-[#323238] hover:border-[#B0E0E6]/50 text-[#B0E0E6] text-xs font-mono transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back to Portfolio Overview</span>
              </button>
            </div>
            <TraceView
              onSelectNodeInAtlas={handleSelectNodeInAtlas}
              onOpenLab={() => setLabModalOpen(true)}
            />
            <ReceiptSection />
          </Suspense>
        ) : (
          /* Default Primary Portfolio Experience */
          <>
            <HeroSection
              activeView={activeView}
              onChangeView={handleViewChange}
              onOpenResume={() => setResumeModalOpen(true)}
              onOpenTerminal={() => setTerminalModalOpen(true)}
              onOpenCommandPalette={() => setCommandPaletteOpen(true)}
              onNavigateSection={handleNavigateSection}
              isAudioMuted={isAudioMuted}
              onToggleAudio={handleToggleAudio}
            />
            <AboutSection
              onOpenLab={() => setLabModalOpen(true)}
              onOpenBeepToReceipt={() => handleViewChange('trace')}
              onOpenTerminal={() => setTerminalModalOpen(true)}
            />
            <TimelineSection />
            <ConstellationSection
              onOpenFullAtlas={(nodeId) => handleSelectNodeInAtlas(nodeId || '')}
            />
            <ProjectsSection
              onOpenLab={() => setLabModalOpen(true)}
              onOpenBeepToReceipt={() => handleViewChange('trace')}
            />
            <ContactSection
              onOpenResume={() => setResumeModalOpen(true)}
              onJumpToSection={handleNavigateSection}
            />
            <ReceiptSection />
          </>
        )}
      </main>

      {/* Interactive Terminal Modal Overlay */}
      {terminalModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Interactive Portfolio Terminal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={() => setTerminalModalOpen(false)}
        >
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <InteractiveTerminal
              isModal
              onClose={() => setTerminalModalOpen(false)}
              onOpenResume={() => {
                setTerminalModalOpen(false);
                setResumeModalOpen(true);
              }}
              onJumpToSection={(id) => {
                setTerminalModalOpen(false);
                handleNavigateSection(id);
              }}
            />
          </div>
        </div>
      )}

      {/* Interactive Computing Lab Modal Workbench */}
      {labModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Interactive Computing Lab Workbench"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={() => setLabModalOpen(false)}
        >
          <div
            className="bg-[#1B1B1D] border border-[#323238] rounded-2xl max-w-6xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative my-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-20 bg-[#222226] px-6 py-3.5 flex items-center justify-between border-b border-[#323238] font-mono text-xs">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-[#DC343B]/20 text-[#DC343B] border border-[#DC343B]/40 text-[10px] font-bold">
                  [SIMULATION]
                </span>
                <span className="text-white font-semibold">
                  Interactive Computing Workbench
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLabModalOpen(false)}
                className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-white border border-[#323238] hover:border-[#B0E0E6]/50 cursor-pointer"
                aria-label="Close interactive lab modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-8">
              <Suspense
                fallback={
                  <div className="py-20 text-center font-mono text-sm text-[#B0E0E6] flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Mounting Simulation Sandbox...</span>
                  </div>
                }
              >
                <TheLab />
              </Suspense>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      {activeView !== 'plain' && (
        <Footer
          onOpenResume={() => setResumeModalOpen(true)}
          onOpenTerminal={() => setTerminalModalOpen(true)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />
      )}

      {/* ATS-Optimized Technical Resume Modal */}
      {resumeModalOpen && (
        <Suspense fallback={null}>
          <ResumeModal
            isOpen={resumeModalOpen}
            onClose={() => setResumeModalOpen(false)}
          />
        </Suspense>
      )}

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectView={handleViewChange}
        onNavigateSection={handleNavigateSection}
        onSelectNode={handleSelectNodeInAtlas}
        onJumpToStratum={handleJumpToStratum}
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenTerminal={() => setTerminalModalOpen(true)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
      />
    </div>
  );
}
