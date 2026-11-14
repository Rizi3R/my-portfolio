import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  FileText,
  Compass,
  Network,
  Receipt,
  Mail,
  Volume2,
  VolumeX,
  Check,
  ExternalLink,
  Terminal,
  Home,
  User,
  Briefcase,
  FolderGit2,
  Sparkles,
  BookOpen,
  Phone,
} from 'lucide-react';
import { PROFILE, STRATA, NODES, StratumType } from '../data/universeContent';
import { audioFx } from '../utils/audioFx';
import { ActiveView } from './Navbar';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectView: (view: ActiveView) => void;
  onNavigateSection: (sectionId: string) => void;
  onSelectNode: (nodeId: string) => void;
  onJumpToStratum: (stratumId: StratumType) => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

interface PaletteAction {
  id: string;
  category: 'Navigation' | 'Perspectives & Tools' | 'Constellation Nodes' | 'Actions';
  label: string;
  sublabel?: string;
  shortcut?: string;
  icon: React.ReactNode;
  perform: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectView,
  onNavigateSection,
  onSelectNode,
  onJumpToStratum,
  onOpenResume,
  onOpenTerminal,
  isAudioMuted,
  onToggleAudio,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 40);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const copyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(PROFILE.email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = PROFILE.email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedEmail(true);
      audioFx.playSuccess();
      setTimeout(() => {
        setCopiedEmail(false);
        onClose();
      }, 1200);
    } catch {
      onClose();
    }
  };

  const baseActions: PaletteAction[] = useMemo(
    () => [
      {
        id: 'nav-home',
        category: 'Navigation',
        label: 'Home',
        sublabel: 'Top overview, recruiter summary, and visitor counter',
        shortcut: 'H',
        icon: <Home className="w-4 h-4 text-[#B0E0E6]" />,
        perform: () => {
          onSelectView('portfolio');
          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 60);
          onClose();
        },
      },
      {
        id: 'nav-about',
        category: 'Navigation',
        label: 'About',
        sublabel: 'Personal technology dashboard and approach',
        icon: <User className="w-4 h-4 text-[#B0E0E6]" />,
        perform: () => {
          onNavigateSection('about');
          onClose();
        },
      },
      {
        id: 'nav-experience',
        category: 'Navigation',
        label: 'Experience',
        sublabel: 'Interactive career timeline across 4 verified roles',
        icon: <Briefcase className="w-4 h-4 text-[#B0E0E6]" />,
        perform: () => {
          onNavigateSection('experience');
          onClose();
        },
      },
      {
        id: 'nav-skills',
        category: 'Navigation',
        label: 'Skills (Technology Constellation)',
        sublabel: 'Interactive 11-category skill graph with evidence levels',
        icon: <Sparkles className="w-4 h-4 text-[#B0E0E6]" />,
        perform: () => {
          onNavigateSection('constellation');
          onClose();
        },
      },
      {
        id: 'nav-projects',
        category: 'Navigation',
        label: 'Projects',
        sublabel: '5 operational case studies and interactive lab experiments',
        icon: <FolderGit2 className="w-4 h-4 text-[#B0E0E6]" />,
        perform: () => {
          onNavigateSection('projects');
          onClose();
        },
      },
      {
        id: 'nav-learning',
        category: 'Navigation',
        label: 'Learning',
        sublabel: 'Currently exploring: UiPath RPA, ITIL 4, Linux Internals',
        icon: <BookOpen className="w-4 h-4 text-[#DC343B]" />,
        perform: () => {
          onNavigateSection('about');
          onClose();
        },
      },
      {
        id: 'nav-contact',
        category: 'Navigation',
        label: 'Contact',
        sublabel: 'Direct email, LinkedIn, and interactive terminal',
        icon: <Phone className="w-4 h-4 text-[#B0E0E6]" />,
        perform: () => {
          onNavigateSection('contact');
          onClose();
        },
      },
      {
        id: 'nav-resume',
        category: 'Navigation',
        label: 'Resume',
        sublabel: 'Open printable ATS-formatted technical resume',
        shortcut: 'R',
        icon: <FileText className="w-4 h-4 text-[#DC343B]" />,
        perform: () => {
          onClose();
          onOpenResume();
        },
      },
      {
        id: 'tool-terminal',
        category: 'Perspectives & Tools',
        label: 'Open Interactive Terminal',
        sublabel: 'Run commands: help, about, skills, experience, projects',
        shortcut: 'T',
        icon: <Terminal className="w-4 h-4 text-[#B0E0E6]" />,
        perform: () => {
          onClose();
          onOpenTerminal();
        },
      },
      {
        id: 'view-trace',
        category: 'Perspectives & Tools',
        label: 'Beep to Receipt (6 Computing Strata)',
        sublabel: 'Trace a barcode scan from hardware laser to thermal receipt',
        icon: <Compass className="w-4 h-4 text-[#B0E0E6]" />,
        perform: () => {
          onSelectView('trace');
          onClose();
        },
      },
      {
        id: 'view-atlas',
        category: 'Perspectives & Tools',
        label: 'Full Atlas Knowledge Graph',
        sublabel: `Deterministic ${NODES.length}-node topology across 6 strata`,
        icon: <Network className="w-4 h-4 text-[#B0E0E6]" />,
        perform: () => {
          onSelectView('atlas');
          onClose();
        },
      },
      {
        id: 'view-plain',
        category: 'Perspectives & Tools',
        label: 'Plain Semantic Reader Specification',
        sublabel: 'High-contrast printable paper document mode',
        icon: <FileText className="w-4 h-4 text-[#9CA3AF]" />,
        perform: () => {
          onSelectView('plain');
          onClose();
        },
      },
      {
        id: 'jump-receipt',
        category: 'Perspectives & Tools',
        label: 'Thermal Receipt Dossier',
        sublabel: 'Receipt-styled career verification summary',
        icon: <Receipt className="w-4 h-4 text-[#B0E0E6]" />,
        perform: () => {
          onClose();
          setTimeout(() => {
            document.getElementById('receipt')?.scrollIntoView({ behavior: 'smooth' });
          }, 60);
        },
      },
      ...STRATA.map((st, i) => ({
        id: `stratum-${st.id}`,
        category: 'Perspectives & Tools' as const,
        label: `Stratum 0${i + 1}: ${st.title}`,
        sublabel: st.tagline,
        icon: <span className="text-xs font-mono font-bold text-[#B0E0E6]">0{i + 1}</span>,
        perform: () => {
          onJumpToStratum(st.id);
          onClose();
        },
      })),
      {
        id: 'act-copy-email',
        category: 'Actions',
        label: copiedEmail ? 'Email Copied!' : `Copy Email (${PROFILE.email})`,
        sublabel: 'Copy contact email to clipboard',
        shortcut: 'C',
        icon: copiedEmail ? (
          <Check className="w-4 h-4 text-[#B0E0E6]" />
        ) : (
          <Mail className="w-4 h-4 text-[#B0E0E6]" />
        ),
        perform: copyEmail,
      },
      {
        id: 'act-toggle-audio',
        category: 'Actions',
        label: isAudioMuted ? 'Enable Audio Cues' : 'Mute Audio Cues',
        sublabel: 'Subtle click and scanner feedback tones',
        shortcut: 'M',
        icon: isAudioMuted ? (
          <VolumeX className="w-4 h-4 text-[#9CA3AF]" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#B0E0E6]" />
        ),
        perform: onToggleAudio,
      },
      {
        id: 'act-linkedin',
        category: 'Actions',
        label: 'Open LinkedIn Profile',
        sublabel: 'Verified external profile',
        icon: <ExternalLink className="w-4 h-4 text-[#9CA3AF]" />,
        perform: () => {
          window.open(PROFILE.linkedIn, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [copiedEmail, isAudioMuted]
  );

  const nodeActions: PaletteAction[] = useMemo(
    () =>
      NODES.map((node) => ({
        id: `node-${node.id}`,
        category: 'Constellation Nodes',
        label: `${node.label}`,
        sublabel: `${node.category} · ${node.summary}`,
        icon: <span className="text-xs font-mono text-[#B0E0E6]">◆</span>,
        perform: () => {
          onSelectNode(node.id);
          onClose();
        },
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const allActions = useMemo(() => [...baseActions, ...nodeActions], [baseActions, nodeActions]);

  const filteredActions = useMemo(() => {
    if (!query.trim()) return baseActions;
    const q = query.toLowerCase();
    return allActions.filter(
      (act) =>
        act.label.toLowerCase().includes(q) ||
        (act.sublabel && act.sublabel.toLowerCase().includes(q)) ||
        act.category.toLowerCase().includes(q)
    );
  }, [query, allActions, baseActions]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredActions]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredActions.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + filteredActions.length) % Math.max(1, filteredActions.length)
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].perform();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command navigation palette"
    >
      <div
        className="w-full max-w-xl bg-[#1B1B1D] border border-[#323238] rounded-2xl shadow-2xl overflow-hidden text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-[#323238] bg-[#222226]">
          <Search className="w-4 h-4 text-[#B0E0E6] mr-3 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Jump to Home, About, Experience, Projects, Skills, Learning, Contact, Resume..."
            className="w-full py-3.5 bg-transparent text-white placeholder-[#9CA3AF] focus:outline-none text-xs sm:text-sm"
            aria-label="Search sections, commands, or skill nodes"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#9CA3AF] hover:text-white p-1 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-[#28282E]" role="listbox">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center text-[#9CA3AF]">
              No matching destination or skill node found for "{query}".
            </div>
          ) : (
            filteredActions.map((action, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => action.perform()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#222226] text-white'
                      : 'text-[#D1D5DB] hover:bg-[#222226]/60'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="shrink-0">{action.icon}</span>
                    <div className="truncate">
                      <div className="font-semibold text-white truncate flex items-center gap-2">
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#DC343B]" aria-hidden="true" />
                        )}
                        <span>{action.label}</span>
                      </div>
                      {action.sublabel && (
                        <div className="text-[11px] text-[#9CA3AF] truncate">{action.sublabel}</div>
                      )}
                    </div>
                  </div>
                  {action.shortcut && (
                    <kbd className="shrink-0 ml-2 px-2 py-0.5 rounded bg-[#1B1B1D] border border-[#323238] text-[10px] font-mono text-[#B0E0E6]">
                      {action.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint Bar */}
        <div className="px-4 py-2.5 border-t border-[#323238] bg-[#222226] flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>Esc Close</span>
          </div>
          <span className="text-[#B0E0E6]">{NODES.length} Skill Nodes · ⌘K / Ctrl+K</span>
        </div>
      </div>
    </div>
  );
};
