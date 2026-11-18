import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
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
import { CASE_STUDIES, StratumType } from './data/universeContent';
import { Loader2, X, ArrowLeft } from 'lucide-react';

// Code-split secondary views and interactive workbench
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

const CASE_STUDY_IDS = new Set(CASE_STUDIES.map((cs) => cs.id));

function resolveCaseIdFromLocation(): string | null {
  const params = new URLSearchParams(window.location.search);
  const queryCase = params.get('case');
  if (queryCase && CASE_STUDY_IDS.has(queryCase)) {
    return queryCase;
  }
  const hashId = window.location.hash.replace(/^#/, '');
  if (hashId && CASE_STUDY_IDS.has(hashId)) {
    return hashId;
  }
  return null;
}

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('portfolio');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);
  const [labModalOpen, setLabModalOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [selectedAtlasNodeId, setSelectedAtlasNodeId] = useState<string | null>(null);
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(
    () => resolveCaseIdFromLocation() || CASE_STUDIES[0]?.id || null
  );

  // Store triggering element so Escape / Close restores keyboard focus cleanly
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const labCloseRef = useRef<HTMLButtonElement | null>(null);

  const captureFocusAndOpen = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (document.activeElement instanceof HTMLElement) {
      lastFocusedRef.current = document.activeElement;
    }
    setter(true);
  };

  const closeOverlayAndRestoreFocus = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(false);
    setTimeout(() => {
      lastFocusedRef.current?.focus();
    }, 20);
  };

  const scrollToElementCleanly = (elementId: string, instant = false) => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior: ScrollBehavior = instant || prefersReduced ? 'auto' : 'smooth';
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior, block: 'start' });
    }
  };

  // Sync initial view or deep-linked case study on fresh load and browser hash changes
  useEffect(() => {
    const applyUrlState = (isInitialLoad: boolean) => {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view') as ActiveView | null;
      const hashId = window.location.hash.replace(/^#/, '');
      const linkedCaseId = resolveCaseIdFromLocation();

      if (linkedCaseId) {
        setActiveView('portfolio');
        setExpandedCaseId(linkedCaseId);
        // Wait for layout paint so the expanded case sits right below sticky header
        setTimeout(() => {
          scrollToElementCleanly(linkedCaseId, isInitialLoad);
        }, 120);
        return;
      }

      if (viewParam && ['portfolio', 'trace', 'atlas', 'plain'].includes(viewParam)) {
        setActiveView(viewParam);
      } else if (hashId === 'trace' || hashId === 'atlas' || hashId === 'plain') {
        setActiveView(hashId as ActiveView);
      }
    };

    applyUrlState(true);

    const onHashChange = () => applyUrlState(false);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleViewChange = (view: ActiveView) => {
    setActiveView(view);
    const url = new URL(window.location.href);
    if (view === 'portfolio') {
      url.searchParams.delete('view');
    } else {
      url.searchParams.set('view', view);
      url.hash = '';
    }
    window.history.replaceState({}, '', url.toString());
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (activeView !== 'portfolio') {
      handleViewChange('portfolio');
      setTimeout(() => scrollToElementCleanly(sectionId), 100);
    } else {
      scrollToElementCleanly(sectionId);
    }
  };

  const handleOpenCaseStudy = (caseId?: string) => {
    const targetId = caseId || 'projects';
    if (caseId && CASE_STUDY_IDS.has(caseId)) {
      setExpandedCaseId(caseId);
      const url = new URL(window.location.href);
      url.searchParams.delete('view');
      url.searchParams.delete('case');
      url.hash = `#${caseId}`;
      window.history.replaceState({}, '', url.toString());
    }

    if (activeView !== 'portfolio') {
      setActiveView('portfolio');
      setTimeout(() => scrollToElementCleanly(targetId), 120);
    } else {
      setTimeout(() => scrollToElementCleanly(targetId), 40);
    }
  };

  const handleToggleCaseCard = (caseId: string | null) => {
    setExpandedCaseId(caseId);
    const url = new URL(window.location.href);
    if (caseId) {
      url.hash = `#${caseId}`;
    } else if (CASE_STUDY_IDS.has(url.hash.replace(/^#/, ''))) {
      url.hash = '';
    }
    window.history.replaceState({}, '', url.toString());
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        audioFx.playClick(600);
        setCommandPaletteOpen((prev) => {
          if (!prev && document.activeElement instanceof HTMLElement) {
            lastFocusedRef.current = document.activeElement;
          } else if (prev) {
            setTimeout(() => lastFocusedRef.current?.focus(), 20);
          }
          return !prev;
        });
      } else if (e.key === 'Escape') {
        if (terminalModalOpen) closeOverlayAndRestoreFocus(setTerminalModalOpen);
        if (labModalOpen) closeOverlayAndRestoreFocus(setLabModalOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalModalOpen, labModalOpen]);

  useEffect(() => {
    if (labModalOpen) {
      setTimeout(() => labCloseRef.current?.focus(), 40);
    }
  }, [labModalOpen]);

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
      scrollToElementCleanly(`stratum-${stratumId}`);
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
      <Navbar
        activeView={activeView}
        onChangeView={handleViewChange}
        onNavigateSection={handleNavigateSection}
        onOpenResume={() => captureFocusAndOpen(setResumeModalOpen)}
      />

      <main className="flex-1 relative z-10 pt-16">
        {activeView === 'plain' ? (
          <Suspense
            fallback={
              <div className="py-24 text-center font-mono text-sm text-stone-600 flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-stone-800" />
                <span>Loading Printable Summary...</span>
              </div>
            }
          >
            <div className="max-w-4xl mx-auto px-6 pt-6 print:hidden">
              <button
                type="button"
                onClick={() => handleViewChange('portfolio')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1B1B1D] text-[#B0E0E6] text-xs font-mono hover:bg-[#2B2B30] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back to Overview</span>
              </button>
            </div>
            <PlainView />
          </Suspense>
        ) : activeView === 'atlas' ? (
          <Suspense
            fallback={
              <div className="py-32 text-center font-mono text-sm text-[#B0E0E6] flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading Skill Atlas...</span>
              </div>
            }
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 print:hidden">
              <button
                type="button"
                onClick={() => handleViewChange('portfolio')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#222226] border border-[#323238] hover:border-[#B0E0E6]/60 text-[#B0E0E6] text-xs font-mono transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back to Overview</span>
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
                <span>Loading Educational Walkthrough...</span>
              </div>
            }
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 print:hidden">
              <button
                type="button"
                onClick={() => handleViewChange('portfolio')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#222226] border border-[#323238] hover:border-[#B0E0E6]/60 text-[#B0E0E6] text-xs font-mono transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back to Overview</span>
              </button>
            </div>
            <TraceView
              onSelectNodeInAtlas={handleSelectNodeInAtlas}
              onOpenLab={() => captureFocusAndOpen(setLabModalOpen)}
            />
            <ReceiptSection />
          </Suspense>
        ) : (
          <>
            <HeroSection
              onChangeView={handleViewChange}
              onOpenResume={() => captureFocusAndOpen(setResumeModalOpen)}
              onOpenTerminal={() => captureFocusAndOpen(setTerminalModalOpen)}
              onOpenCommandPalette={() => captureFocusAndOpen(setCommandPaletteOpen)}
              onOpenCaseStudy={handleOpenCaseStudy}
              isAudioMuted={isAudioMuted}
              onToggleAudio={handleToggleAudio}
            />
            <AboutSection
              onOpenLab={() => captureFocusAndOpen(setLabModalOpen)}
              onOpenBeepToReceipt={() => handleViewChange('trace')}
              onOpenTerminal={() => captureFocusAndOpen(setTerminalModalOpen)}
            />
            <TimelineSection />
            <ConstellationSection
              onOpenFullAtlas={(nodeId) => handleSelectNodeInAtlas(nodeId || '')}
            />
            <ProjectsSection
              expandedCaseId={expandedCaseId}
              onSelectCaseId={handleToggleCaseCard}
              onOpenLab={() => captureFocusAndOpen(setLabModalOpen)}
              onOpenBeepToReceipt={() => handleViewChange('trace')}
            />
            <ContactSection
              onOpenResume={() => captureFocusAndOpen(setResumeModalOpen)}
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
          aria-label="Interactive Portfolio Shell"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm no-print"
          onClick={() => closeOverlayAndRestoreFocus(setTerminalModalOpen)}
        >
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <InteractiveTerminal
              isModal
              onClose={() => closeOverlayAndRestoreFocus(setTerminalModalOpen)}
              onOpenResume={() => {
                setTerminalModalOpen(false);
                captureFocusAndOpen(setResumeModalOpen);
              }}
              onJumpToSection={(id) => {
                closeOverlayAndRestoreFocus(setTerminalModalOpen);
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto no-print"
          onClick={() => closeOverlayAndRestoreFocus(setLabModalOpen)}
        >
          <div
            className="bg-[#1B1B1D] border border-[#323238] rounded-2xl max-w-6xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative my-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-20 bg-[#222226] px-6 py-3.5 flex items-center justify-between border-b border-[#323238] font-mono text-xs">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-[#DC343B]/20 text-[#DC343B] border border-[#DC343B]/40 text-[10px] font-bold">
                  SIMULATION
                </span>
                <span className="text-white font-semibold">
                  Interactive Computing Workbench
                </span>
              </div>
              <button
                ref={labCloseRef}
                type="button"
                onClick={() => closeOverlayAndRestoreFocus(setLabModalOpen)}
                className="p-1.5 rounded-lg text-[#D1D5DB] hover:text-white border border-[#323238] hover:border-[#B0E0E6]/60 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
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
                    <span>Loading Simulations...</span>
                  </div>
                }
              >
                <TheLab />
              </Suspense>
            </div>
          </div>
        </div>
      )}

      {activeView !== 'plain' && (
        <Footer
          onOpenResume={() => captureFocusAndOpen(setResumeModalOpen)}
          onOpenTerminal={() => captureFocusAndOpen(setTerminalModalOpen)}
          onOpenCommandPalette={() => captureFocusAndOpen(setCommandPaletteOpen)}
          onChangeView={handleViewChange}
        />
      )}

      {resumeModalOpen && (
        <Suspense fallback={null}>
          <ResumeModal
            isOpen={resumeModalOpen}
            onClose={() => closeOverlayAndRestoreFocus(setResumeModalOpen)}
          />
        </Suspense>
      )}

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => closeOverlayAndRestoreFocus(setCommandPaletteOpen)}
        onSelectView={handleViewChange}
        onNavigateSection={handleNavigateSection}
        onSelectNode={handleSelectNodeInAtlas}
        onJumpToStratum={handleJumpToStratum}
        onOpenResume={() => captureFocusAndOpen(setResumeModalOpen)}
        onOpenTerminal={() => captureFocusAndOpen(setTerminalModalOpen)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
      />
    </div>
  );
}
