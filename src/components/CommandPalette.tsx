import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Command, 
  X, 
  ArrowRight, 
  FileText, 
  Layers, 
  Briefcase, 
  Cpu, 
  Terminal, 
  Mail, 
  Volume2, 
  VolumeX, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { ExplorationRoute, PERSONAL_INFO } from '../data/portfolioData';
import { audioFx } from '../utils/audioFx';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoute: (route: ExplorationRoute) => void;
  onOpenResume: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

interface PaletteAction {
  id: string;
  category: 'Navigation' | 'Recruiter Routes' | 'Actions' | 'Tools';
  label: string;
  shortcut?: string;
  icon: React.ReactNode;
  perform: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectRoute,
  onOpenResume,
  isAudioMuted,
  onToggleAudio
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    onClose();
    const el = document.querySelector(id);
    if (el) {
      const navHeight = 76;
      const elPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    audioFx.playSuccess();
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1000);
  };

  const actions: PaletteAction[] = [
    {
      id: 'nav-hero',
      category: 'Navigation',
      label: 'Home & Systems Topology HUD',
      shortcut: 'H',
      icon: <Terminal className="w-4 h-4 text-sky-400" />,
      perform: () => scrollTo('#top')
    },
    {
      id: 'nav-lab',
      category: 'Navigation',
      label: 'Space 01 · The Lab (Interactive Computing Experiments)',
      shortcut: 'L',
      icon: <Cpu className="w-4 h-4 text-sky-400" />,
      perform: () => scrollTo('#lab')
    },
    {
      id: 'nav-systems',
      category: 'Navigation',
      label: 'Space 02 · Systems Architecture (Retail POS & SaaS Pipelines)',
      shortcut: 'S',
      icon: <Layers className="w-4 h-4 text-sky-400" />,
      perform: () => scrollTo('#systems')
    },
    {
      id: 'nav-origin',
      category: 'Navigation',
      label: 'The Origin · Grounding & Curiosity (Mindset)',
      shortcut: 'O',
      icon: <Layers className="w-4 h-4 text-slate-400" />,
      perform: () => scrollTo('#about')
    },
    {
      id: 'nav-exp',
      category: 'Navigation',
      label: 'Space 03 · Field Notes (Career Progression & Timeline)',
      shortcut: 'E',
      icon: <Briefcase className="w-4 h-4 text-sky-400" />,
      perform: () => scrollTo('#experience')
    },
    {
      id: 'nav-investigations',
      category: 'Navigation',
      label: 'Forensic Investigation Bay & Diagnostic Triage',
      shortcut: 'I',
      icon: <Terminal className="w-4 h-4 text-amber-400" />,
      perform: () => scrollTo('#investigations')
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      label: 'Space 04 · Technical Case Studies & Debriefs',
      shortcut: 'C',
      icon: <Terminal className="w-4 h-4 text-sky-400" />,
      perform: () => scrollTo('#projects')
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      label: 'Space 05 · The Toolkit (Daily Drivers & Capabilities)',
      shortcut: 'T',
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
      perform: () => scrollTo('#skills')
    },
    {
      id: 'nav-frontier',
      category: 'Navigation',
      label: 'Space 06 · The Frontier (Active Learning Horizons)',
      shortcut: 'F',
      icon: <Terminal className="w-4 h-4 text-indigo-400" />,
      perform: () => scrollTo('#frontier')
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      label: 'Space 07 · Dispatch & Professional Inquiry',
      shortcut: 'D',
      icon: <Mail className="w-4 h-4 text-sky-400" />,
      perform: () => scrollTo('#contact')
    },
    // Routes
    {
      id: 'route-app-support',
      category: 'Recruiter Routes',
      label: 'Filter Route: Application Support (POS, Triage, UAT)',
      icon: <ArrowRight className="w-4 h-4 text-sky-400" />,
      perform: () => {
        onSelectRoute('app-support');
        onClose();
        scrollTo('#experience');
      }
    },
    {
      id: 'route-it-ops',
      category: 'Recruiter Routes',
      label: 'Filter Route: IT Operations & Multi-Site Support',
      icon: <ArrowRight className="w-4 h-4 text-sky-400" />,
      perform: () => {
        onSelectRoute('it-ops');
        onClose();
        scrollTo('#experience');
      }
    },
    {
      id: 'route-biz',
      category: 'Recruiter Routes',
      label: 'Filter Route: Business Systems & SaaS Administration',
      icon: <ArrowRight className="w-4 h-4 text-sky-400" />,
      perform: () => {
        onSelectRoute('business-systems');
        onClose();
        scrollTo('#experience');
      }
    },
    {
      id: 'route-infra',
      category: 'Recruiter Routes',
      label: 'Filter Route: Infrastructure & Layer 1–4 Networking',
      icon: <ArrowRight className="w-4 h-4 text-sky-400" />,
      perform: () => {
        onSelectRoute('infrastructure');
        onClose();
        scrollTo('#experience');
      }
    },
    {
      id: 'route-cloud',
      category: 'Recruiter Routes',
      label: 'Filter Route: Cloud Foundations (AWS Certified)',
      icon: <ArrowRight className="w-4 h-4 text-sky-400" />,
      perform: () => {
        onSelectRoute('cloud');
        onClose();
        scrollTo('#experience');
      }
    },
    // Actions
    {
      id: 'action-resume',
      category: 'Actions',
      label: 'Open Verified ATS Resume (Printable / PDF)',
      shortcut: 'R',
      icon: <FileText className="w-4 h-4 text-sky-400" />,
      perform: () => {
        onClose();
        onOpenResume();
      }
    },
    {
      id: 'action-email',
      category: 'Actions',
      label: copiedEmail ? 'Copied to Clipboard!' : `Copy Email (${PERSONAL_INFO.email})`,
      shortcut: 'C',
      icon: copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-slate-300" />,
      perform: copyEmail
    },
    {
      id: 'action-audio',
      category: 'Actions',
      label: isAudioMuted ? 'Enable Cybernetic Audio FX' : 'Mute Cybernetic Audio FX',
      shortcut: 'M',
      icon: isAudioMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-sky-400" />,
      perform: () => {
        onToggleAudio();
        onClose();
      }
    }
  ];

  const filtered = actions.filter((act) =>
    act.label.toLowerCase().includes(query.toLowerCase()) ||
    act.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      audioFx.playClick(600);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      audioFx.playClick(600);
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].perform();
      audioFx.playCommand();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-[#090E1D] border border-slate-700/80 rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-800 p-4 flex items-center gap-3 bg-slate-900/90">
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, chapter, or route (e.g. 'simulator', 'POS', 'resume')..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-slate-800/40">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500 font-mono">
              No matching commands or routes found for "{query}".
            </div>
          ) : (
            filtered.map((action, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={action.id}
                  onClick={() => {
                    action.perform();
                    audioFx.playCommand();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-sky-500/20 text-white border border-sky-500/40'
                      : 'text-slate-300 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1 rounded bg-slate-800/80 shrink-0">
                      {action.icon}
                    </span>
                    <span className="text-xs sm:text-sm font-medium">{action.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 hidden sm:inline">
                      {action.category}
                    </span>
                    {action.shortcut && (
                      <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
                        {action.shortcut}
                      </kbd>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="px-1 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-400">↑</kbd> <kbd className="px-1 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-400">↓</kbd> to navigate</span>
            <span>·</span>
            <span><kbd className="px-1 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-400">Enter</kbd> to select</span>
          </div>
          <span className="text-sky-400 font-semibold">ARIES.EXE HUD</span>
        </div>
      </div>
    </div>
  );
};
