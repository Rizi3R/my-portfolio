import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar, ActiveView } from './components/Navbar';
import { TraceView } from './components/TraceView';
import { ReceiptSection } from './components/ReceiptSection';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';
import { audioFx } from './utils/audioFx';
import { StratumType } from './data/universeContent';
import { Loader2, X } from 'lucide-react';

// Code-split heavy interactive modules to optimize initial bundle
const AtlasView = lazy(() => import('./components/AtlasView').then(m => ({ default: m.AtlasView })));
const PlainView = lazy(() => import('./components/PlainView').then(m => ({ default: m.PlainView })));
const TheLab = lazy(() => import('./components/TheLab').then(m => ({ default: m.TheLab })));
const ResumeModal = lazy(() => import('./components/ResumeModal').then(m => ({ default: m.ResumeModal })));

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('trace');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [selectedAtlasNodeId, setSelectedAtlasNodeId] = useState<string | null>(null);
  const [labModalOpen, setLabModalOpen] = useState(false);

  // Initialize view from URL hash or query param on first render
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view') as ActiveView;
    if (viewParam && ['trace', 'atlas', 'plain'].includes(viewParam)) {
      setActiveView(viewParam);
    } else if (window.location.hash === '#atlas') {
      setActiveView('atlas');
    } else if (window.location.hash === '#plain') {
      setActiveView('plain');
    }
  }, []);

  // Sync view updates to URL search params without page reload
  const handleViewChange = (view: ActiveView) => {
    setActiveView(view);
    const url = new URL(window.location.href);
    if (view === 'trace') {
      url.searchParams.delete('view');
    } else {
      url.searchParams.set('view', view);
    }
    window.history.replaceState({}, '', url.toString());
  };

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
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

  const handleSelectNodeInAtlas = (nodeId: string) => {
    setSelectedAtlasNodeId(nodeId);
    handleViewChange('atlas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToStratum = (stratumId: StratumType) => {
    handleViewChange('trace');
    setTimeout(() => {
      const element = document.getElementById(`stratum-${stratumId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOpenExperience = (expId: string) => {
    handleViewChange('trace');
    setTimeout(() => {
      const receiptEl = document.getElementById('receipt');
      if (receiptEl) {
        receiptEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className={`min-h-screen text-stone-100 flex flex-col font-sans selection:bg-cyan-500/25 selection:text-cyan-200 relative overflow-x-hidden ${
      activeView === 'plain' ? 'bg-white text-stone-900' : 'tech-universe-bg'
    }`}>
      
      {/* Top Navigation */}
      <Navbar 
        activeView={activeView}
        onChangeView={handleViewChange}
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Content */}
      <main className="flex-1 relative z-10 pt-16">
        {activeView === 'plain' ? (
          <Suspense fallback={
            <div className="py-24 text-center font-mono text-sm text-stone-600 flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-stone-800" />
              <span>Loading Semantic Specification...</span>
            </div>
          }>
            <PlainView />
          </Suspense>
        ) : activeView === 'atlas' ? (
          <Suspense fallback={
            <div className="py-32 text-center font-mono text-sm text-cyan-400 flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading Knowledge Topology Atlas...</span>
            </div>
          }>
            <AtlasView 
              initialSelectedNodeId={selectedAtlasNodeId}
              onJumpToStratum={handleJumpToStratum}
              onOpenExperience={handleOpenExperience}
            />
            {/* Direct jump to Receipt at base of Atlas */}
            <ReceiptSection />
          </Suspense>
        ) : (
          /* Default TRACE View: The "Beep to Receipt" Journey */
          <>
            <TraceView 
              onSelectNodeInAtlas={handleSelectNodeInAtlas}
              onOpenLab={() => setLabModalOpen(true)}
            />

            {/* Thermal Receipt: The physical artifact closing the loop */}
            <ReceiptSection />
          </>
        )}
      </main>

      {/* Interactive Packet Lab Modal Workbench (Opens without 1200px page layout shift) */}
      {labModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="Interactive Computing Lab Modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
          onClick={() => setLabModalOpen(false)}
        >
          <div 
            className="bg-[#050811] border border-stone-800 rounded-none max-w-6xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative my-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Header */}
            <div className="sticky top-0 z-20 bg-stone-950 px-6 py-3 flex items-center justify-between border-b border-stone-800 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                  [SIMULATION]
                </span>
                <span className="text-stone-300 font-bold">INTERACTIVE COMPUTING WORKBENCH</span>
              </div>
              <button
                onClick={() => setLabModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white border border-stone-800 hover:border-stone-700 cursor-pointer"
                aria-label="Close interactive lab modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Lab Component */}
            <div className="p-4 sm:p-8">
              <Suspense fallback={
                <div className="py-20 text-center font-mono text-sm text-cyan-400 flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Mounting Simulation Sandbox...</span>
                </div>
              }>
                <TheLab />
              </Suspense>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      {activeView !== 'plain' && (
        <Footer onOpenResume={() => setResumeModalOpen(true)} />
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
        onSelectNode={handleSelectNodeInAtlas}
        onJumpToStratum={handleJumpToStratum}
        onOpenResume={() => setResumeModalOpen(true)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
      />
    </div>
  );
}
