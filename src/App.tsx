import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Navbar, ActiveView } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TimelineSection } from './components/TimelineSection';
import { ConstellationSection } from './components/ConstellationSection';
import { CredentialsSection } from './components/CredentialsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { audioFx } from './utils/audioFx';
import { useDialogFocusTrap } from './utils/useDialogFocusTrap';
import { CASE_STUDIES, StratumType } from './data/universeContent';
import { useI18n } from './i18n';
import { Loader2, X, ArrowLeft } from 'lucide-react';

// Code-split secondary views and interactive workbench
const InteractiveTerminal = lazy(() =>
  import('./components/InteractiveTerminal').then((module) => ({ default: module.InteractiveTerminal }))
);
const TraceView = lazy(() =>
  import('./components/TraceView').then((m) => ({ default: m.TraceView }))
);
const AtlasView = lazy(() =>
  import('./components/AtlasView').then((m) => ({ default: m.AtlasView }))
);
const PlainView = lazy(() =>
  import('./components/PlainView').then((m) => ({ default: m.PlainView }))
);
const ReceiptSection = lazy(() =>
  import('./components/ReceiptSection').then((m) => ({ default: m.ReceiptSection }))
);
const TheLab = lazy(() =>
  import('./components/TheLab').then((m) => ({ default: m.TheLab }))
);
const ResumeModal = lazy(() =>
  import('./components/ResumeModal').then((m) => ({ default: m.ResumeModal }))
);

const CASE_STUDY_IDS = new Set(CASE_STUDIES.map((cs) => cs.id));
const SECTION_ANCHOR_IDS = new Set([
  'top',
  'featured-work',
  'projects',
  'experience',
  'constellation',
  'skills',
  'credentials',
  'education',
  'workbenches',
  'lab',
  'about',
  'contact',
]);

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

function isTypingInEditableElement(): boolean {
  const active = document.activeElement;
  if (!(active instanceof HTMLElement)) return false;
  const tag = active.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (active.isContentEditable) return true;
  return false;
}

export default function App() {
  const { t, format } = useI18n();
  const [activeView, setActiveView] = useState<ActiveView>('portfolio');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);
  const [labModalOpen, setLabModalOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [selectedAtlasNodeId, setSelectedAtlasNodeId] = useState<string | null>(null);
  const [caseNavigationVersion, setCaseNavigationVersion] = useState(0);
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(
    resolveCaseIdFromLocation
  );

  // Store triggering element so Escape / Close restores keyboard focus reliably
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const labCloseRef = useRef<HTMLButtonElement | null>(null);
  const labSheetRef = useRef<HTMLDivElement | null>(null);
  const appShellRef = useRef<HTMLDivElement | null>(null);

  const hasAnyModalOpen =
    resumeModalOpen || commandPaletteOpen || terminalModalOpen || labModalOpen;

  useDialogFocusTrap(labSheetRef, labModalOpen);

  // Apply native HTML `inert` to background page shell while any modal/dialog is open
  useEffect(() => {
    const shell = appShellRef.current;
    if (!shell) return;
    shell.inert = hasAnyModalOpen;
    if (!hasAnyModalOpen && lastFocusedRef.current) {
      lastFocusedRef.current.focus();
      lastFocusedRef.current = null;
    }
  }, [hasAnyModalOpen]);

  const captureFocusAndOpen = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    trigger?: HTMLElement | null
  ) => {
    if (!hasAnyModalOpen) {
      if (trigger instanceof HTMLElement) {
        lastFocusedRef.current = trigger;
      } else if (document.activeElement instanceof HTMLElement) {
        lastFocusedRef.current = document.activeElement;
      }
    }
    setter(true);
  };

  const closeOverlayAndRestoreFocus = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(false);
  };

  const scrollToElementCleanly = (elementId: string, instant = false) => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior: ScrollBehavior = instant || prefersReduced ? 'auto' : 'smooth';
    if (elementId === 'top') {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior, block: 'start' });
    }
  };

  // Sync view and anchor state on initial load, hashchange, and browser Back/Forward (popstate)
  useEffect(() => {
    const applyUrlState = (isInitialLoad: boolean) => {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view') as ActiveView | null;
      const hashId = window.location.hash.replace(/^#/, '');
      const linkedCaseId = resolveCaseIdFromLocation();

      if (linkedCaseId) {
        setActiveView('portfolio');
        setExpandedCaseId(linkedCaseId);
        setCaseNavigationVersion((version) => version + 1);
        setTimeout(() => {
          scrollToElementCleanly(linkedCaseId, isInitialLoad);
        }, 120);
        return;
      }

      if (viewParam && ['portfolio', 'trace', 'atlas', 'plain', 'receipt'].includes(viewParam)) {
        setActiveView(viewParam);
        return;
      }

      if (
        hashId === 'trace' ||
        hashId === 'atlas' ||
        hashId === 'plain' ||
        hashId === 'receipt'
      ) {
        setActiveView(hashId as ActiveView);
        return;
      }

      setActiveView('portfolio');
      if (hashId && SECTION_ANCHOR_IDS.has(hashId)) {
        setTimeout(() => {
          scrollToElementCleanly(hashId, isInitialLoad);
        }, 100);
      }
    };

    applyUrlState(true);

    const onUrlChange = () => applyUrlState(false);
    window.addEventListener('hashchange', onUrlChange);
    window.addEventListener('popstate', onUrlChange);
    return () => {
      window.removeEventListener('hashchange', onUrlChange);
      window.removeEventListener('popstate', onUrlChange);
    };
  }, []);

  const handleViewChange = (view: ActiveView) => {
    setActiveView(view);
    const url = new URL(window.location.href);
    if (view === 'portfolio') {
      url.searchParams.delete('view');
      url.hash = '';
    } else {
      url.searchParams.set('view', view);
      url.hash = '';
    }
    if (url.toString() !== window.location.href) {
      window.history.pushState({}, '', url.toString());
    }
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete('view');
    url.searchParams.delete('case');
    url.hash = sectionId === 'top' ? '#top' : `#${sectionId}`;
    if (url.toString() !== window.location.href) {
      window.history.pushState({}, '', url.toString());
    }

    if (activeView !== 'portfolio') {
      setActiveView('portfolio');
      setTimeout(() => scrollToElementCleanly(sectionId), 100);
    } else {
      scrollToElementCleanly(sectionId);
    }
  };

  const handleOpenCaseStudy = (caseId?: string) => {
    const targetId = caseId || 'featured-work';
    const url = new URL(window.location.href);
    url.searchParams.delete('view');
    url.searchParams.delete('case');

    if (caseId && CASE_STUDY_IDS.has(caseId)) {
      setExpandedCaseId(caseId);
      setCaseNavigationVersion((version) => version + 1);
      url.hash = `#${caseId}`;
    } else {
      url.hash = '#featured-work';
    }

    if (url.toString() !== window.location.href) {
      window.history.pushState({}, '', url.toString());
    }

    const showDestination = () => {
      document.getElementById(`${targetId}-heading`)?.focus({ preventScroll: true });
      scrollToElementCleanly(targetId);
    };

    if (activeView !== 'portfolio') setActiveView('portfolio');
    setTimeout(showDestination, activeView === 'portfolio' ? 40 : 120);
  };

  const handleToggleCaseCard = (caseId: string | null) => {
    setExpandedCaseId(caseId);
    const url = new URL(window.location.href);
    url.searchParams.delete('case');
    if (caseId) {
      url.hash = `#${caseId}`;
    } else if (CASE_STUDY_IDS.has(url.hash.replace(/^#/, ''))) {
      url.hash = '#featured-work';
    }
    window.history.replaceState({}, '', url.toString());
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        // Ignore shortcut if another modal is open or user is typing in another input
        if (resumeModalOpen || terminalModalOpen || labModalOpen) return;
        if (!commandPaletteOpen && isTypingInEditableElement()) return;

        e.preventDefault();
        audioFx.playClick(600);
        setCommandPaletteOpen((prev) => {
          if (!prev && document.activeElement instanceof HTMLElement) {
            lastFocusedRef.current = document.activeElement;
          }
          return !prev;
        });
      } else if (e.key === 'Escape') {
        if (commandPaletteOpen) {
          closeOverlayAndRestoreFocus(setCommandPaletteOpen);
        } else if (terminalModalOpen) {
          closeOverlayAndRestoreFocus(setTerminalModalOpen);
        } else if (labModalOpen) {
          closeOverlayAndRestoreFocus(setLabModalOpen);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, terminalModalOpen, labModalOpen, resumeModalOpen]);

  useEffect(() => {
    if (labModalOpen) {
      labCloseRef.current?.focus();
    }
  }, [labModalOpen]);

  useEffect(() => {
    if (hasAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasAnyModalOpen]);

  const handleToggleAudio = () => {
    const isNowUnmuted = audioFx.toggleMute();
    setIsAudioMuted(!isNowUnmuted);
  };

  const handleSelectNodeInAtlas = (nodeId: string) => {
    setSelectedAtlasNodeId(nodeId || null);
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
      className={`min-h-screen flex flex-col font-sans selection:bg-[#A8C5FF]/25 selection:text-[#F6F2E9] relative overflow-x-hidden ${
        activeView === 'plain' ? 'bg-white text-[#191723]' : 'bg-[#0A0913] text-[#F6F2E9]'
      }`}
    >
      {/* Background page shell: marked inert while any overlay dialog is open */}
      <div ref={appShellRef} className={`flex-1 flex flex-col ${resumeModalOpen ? 'print:hidden' : ''}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#A8C5FF] focus:text-[#191723] focus:text-xs focus:font-semibold focus:shadow-lg print:hidden"
        >
          {t.accessibility.skipToMain}
        </a>

        <Navbar
          activeView={activeView}
          onChangeView={handleViewChange}
          onNavigateSection={handleNavigateSection}
          onOpenResume={(trigger) => captureFocusAndOpen(setResumeModalOpen, trigger)}
        />

        <main
          id="main-content"
          className="flex-1 relative z-10 pt-16"
        >
          {activeView === 'plain' ? (
            <ErrorBoundary
              fallbackTitle={t.common.errorBoundaryTitle}
              onResetView={() => handleViewChange('portfolio')}
            >
              <Suspense
                fallback={
                  <div className="py-24 text-center font-mono text-sm text-[#474457] flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-[#191723]" aria-hidden="true" />
                    <span>{format(t.common.loadingView, { view: t.footer.printableSummary })}</span>
                  </div>
                }
              >
                <div className="max-w-4xl mx-auto px-5 sm:px-10 pt-6 print:hidden">
                  <button
                    type="button"
                    onClick={() => handleViewChange('portfolio')}
                    className="inline-flex items-center gap-2 px-3.5 py-2 min-h-11 rounded-lg bg-[#0A0913] text-[#F6F2E9] text-xs font-mono hover:bg-[#191723] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#191723]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t.accessibility.backToOverview}</span>
                  </button>
                </div>
                <PlainView />
              </Suspense>
            </ErrorBoundary>
          ) : activeView === 'atlas' ? (
            <ErrorBoundary
              fallbackTitle={t.common.errorBoundaryTitle}
              onResetView={() => handleViewChange('portfolio')}
            >
              <Suspense
                fallback={
                  <div className="py-32 text-center font-mono text-sm text-[#A8C5FF] flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    <span>{format(t.common.loadingView, { view: t.atlas.title })}</span>
                  </div>
                }
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 print:hidden">
                  <button
                    type="button"
                    onClick={() => handleViewChange('portfolio')}
                    className="inline-flex items-center gap-2 px-3.5 py-2 min-h-11 rounded-lg bg-[#12101F] border border-[#242138] hover:border-[#A8C5FF]/60 text-[#A8C5FF] text-xs font-mono transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t.accessibility.backToOverview}</span>
                  </button>
                </div>
                <AtlasView
                  initialSelectedNodeId={selectedAtlasNodeId}
                  onJumpToStratum={handleJumpToStratum}
                  onOpenExperience={handleOpenExperience}
                  onOpenCaseStudy={handleOpenCaseStudy}
                />
              </Suspense>
            </ErrorBoundary>
          ) : activeView === 'trace' ? (
            <ErrorBoundary
              fallbackTitle={t.common.errorBoundaryTitle}
              onResetView={() => handleViewChange('portfolio')}
            >
              <Suspense
                fallback={
                  <div className="py-32 text-center font-mono text-sm text-[#A8C5FF] flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    <span>{format(t.common.loadingView, { view: t.interactiveLab.items.walkthrough.title })}</span>
                  </div>
                }
              >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 print:hidden">
                  <button
                    type="button"
                    onClick={() => handleViewChange('portfolio')}
                    className="inline-flex items-center gap-2 px-3.5 py-2 min-h-11 rounded-lg bg-[#12101F] border border-[#242138] hover:border-[#A8C5FF]/60 text-[#A8C5FF] text-xs font-mono transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t.accessibility.backToOverview}</span>
                  </button>
                </div>
                <TraceView
                  onSelectNodeInAtlas={handleSelectNodeInAtlas}
                  onOpenLab={(trigger) => captureFocusAndOpen(setLabModalOpen, trigger)}
                  onOpenReceipt={() => handleViewChange('receipt')}
                />
              </Suspense>
            </ErrorBoundary>
          ) : activeView === 'receipt' ? (
            <ErrorBoundary
              fallbackTitle={t.common.errorBoundaryTitle}
              onResetView={() => handleViewChange('portfolio')}
            >
              <Suspense
                fallback={
                  <div className="py-32 text-center font-mono text-sm text-[#A8C5FF] flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    <span>{format(t.common.loadingView, { view: t.receipt.heading })}</span>
                  </div>
                }
              >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 print:hidden">
                  <button
                    type="button"
                    onClick={() => handleViewChange('portfolio')}
                    className="inline-flex items-center gap-2 px-3.5 py-2 min-h-11 rounded-lg bg-[#12101F] border border-[#242138] hover:border-[#A8C5FF]/60 text-[#A8C5FF] text-xs font-mono transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t.accessibility.backToOverview}</span>
                  </button>
                </div>
                <ReceiptSection />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <>
              <HeroSection
                onOpenResume={(trigger) => captureFocusAndOpen(setResumeModalOpen, trigger)}
                onOpenCaseStudy={handleOpenCaseStudy}
              />
              <ProjectsSection
                expandedCaseId={expandedCaseId}
                onSelectCaseId={handleToggleCaseCard}
                navigationVersion={caseNavigationVersion}
              />
              <TimelineSection />
              <ConstellationSection
                onOpenFullAtlas={(nodeId) => handleSelectNodeInAtlas(nodeId || '')}
              />
              <CredentialsSection />
              <AboutSection
                onOpenLab={(trigger) => captureFocusAndOpen(setLabModalOpen, trigger)}
                onOpenBeepToReceipt={() => handleViewChange('trace')}
                onOpenAtlas={() => handleSelectNodeInAtlas('')}
                onOpenTerminal={(trigger) => captureFocusAndOpen(setTerminalModalOpen, trigger)}
              />
              <ContactSection
                onOpenResume={(trigger) => captureFocusAndOpen(setResumeModalOpen, trigger)}
              />
            </>
          )}
        </main>

        {activeView !== 'plain' && (
          <Footer
            onOpenResume={(trigger) => captureFocusAndOpen(setResumeModalOpen, trigger)}
            onOpenCommandPalette={(trigger) => captureFocusAndOpen(setCommandPaletteOpen, trigger)}
            onChangeView={handleViewChange}
          />
        )}
      </div>

      {/* Interactive Terminal Modal Overlay */}
      {terminalModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.terminal.dialogLabel}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A0913]/85 backdrop-blur-sm no-print"
          onClick={() => closeOverlayAndRestoreFocus(setTerminalModalOpen)}
        >
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <Suspense fallback={<p role="status" className="text-white">{format(t.common.loadingView, { view: t.terminal.dialogLabel })}</p>}>
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
            </Suspense>
          </div>
        </div>
      )}

      {/* Interactive Computing Lab Modal Workbench */}
      {labModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.lab.modalDialogLabel}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0A0913]/88 backdrop-blur-md overflow-y-auto no-print"
          onClick={() => closeOverlayAndRestoreFocus(setLabModalOpen)}
        >
          <div
            ref={labSheetRef}
            className="bg-[#0A0913] border border-[#242138] rounded-2xl max-w-6xl w-full max-h-[92dvh] overflow-y-auto shadow-2xl relative my-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-20 bg-[#12101F] px-6 py-3.5 flex items-center justify-between border-b border-[#242138] font-mono text-xs gap-2">
              <div className="flex flex-wrap items-center gap-2.5 min-w-0">
                <span className="px-2 py-0.5 rounded bg-[#F2A77D]/15 text-[#F2A77D] border border-[#F2A77D]/40 text-xs font-bold">
                  {t.lab.modalBadge}
                </span>
                <span className="text-[#F6F2E9] font-semibold">
                  {t.lab.modalTitle}
                </span>
              </div>
              <button
                ref={labCloseRef}
                type="button"
                onClick={() => closeOverlayAndRestoreFocus(setLabModalOpen)}
                className="p-2 rounded-lg text-[#CFCAC0] hover:text-[#F6F2E9] border border-[#242138] hover:border-[#A8C5FF]/60 cursor-pointer min-w-11 min-h-11 flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
                aria-label={t.lab.closeModal}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-8">
              <ErrorBoundary fallbackTitle={t.common.errorBoundaryTitle}>
                <Suspense
                  fallback={
                    <div className="py-20 text-center font-mono text-sm text-[#A8C5FF] flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      <span>{t.lab.loading}</span>
                    </div>
                  }
                >
                  <TheLab />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      )}

      {resumeModalOpen && (
        <ErrorBoundary
          fallbackTitle={t.common.errorBoundaryTitle}
          onResetView={() => closeOverlayAndRestoreFocus(setResumeModalOpen)}
        >
          <Suspense fallback={null}>
            <ResumeModal
              isOpen={resumeModalOpen}
              onClose={() => closeOverlayAndRestoreFocus(setResumeModalOpen)}
            />
          </Suspense>
        </ErrorBoundary>
      )}

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => closeOverlayAndRestoreFocus(setCommandPaletteOpen)}
        onSelectView={handleViewChange}
        onNavigateSection={handleNavigateSection}
        onSelectNode={handleSelectNodeInAtlas}
        onJumpToStratum={handleJumpToStratum}
        onOpenResume={() => {
          setCommandPaletteOpen(false);
          captureFocusAndOpen(setResumeModalOpen);
        }}
        onOpenTerminal={() => {
          setCommandPaletteOpen(false);
          captureFocusAndOpen(setTerminalModalOpen);
        }}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
      />
    </div>
  );
}
