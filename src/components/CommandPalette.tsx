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
  Briefcase,
  FolderGit2,
  Sparkles,
  BookOpen,
  Phone,
  Layers,
} from 'lucide-react';
import { PROFILE, STRATA, NODES, CASE_STUDIES, EXPERIENCES, StratumType } from '../data/universeContent';
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
  category: 'Navigation' | 'Perspectives & Tools' | 'Skills' | 'Actions';
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
        sublabel: 'Overview, intro, and hero',
        shortcut: 'H',
        icon: <Home className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onSelectView('portfolio');
          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 60);
          onClose();
        },
      },
      {
        id: 'nav-projects',
        category: 'Navigation',
        label: 'Case Studies',
        sublabel: `Selected Work & ${CASE_STUDIES.length} real support cases`,
        icon: <FolderGit2 className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onNavigateSection('featured-work');
          onClose();
        },
      },
      {
        id: 'nav-experience',
        category: 'Navigation',
        label: 'Experience',
        sublabel: `Work & internship timeline (${EXPERIENCES.length} roles)`,
        icon: <Briefcase className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onNavigateSection('experience');
          onClose();
        },
      },
      {
        id: 'nav-skills',
        category: 'Navigation',
        label: 'Skills & Core Capabilities',
        sublabel: 'Core capabilities, structured skills list, and optional atlas',
        icon: <Sparkles className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onNavigateSection('constellation');
          onClose();
        },
      },
      {
        id: 'nav-workbenches',
        category: 'Navigation',
        label: 'Workbenches & Practice',
        sublabel: 'Beep to Receipt, Skill Atlas, Shell, Lab & Summary',
        icon: <Layers className="w-4 h-4 text-[#F2A77D]" />,
        perform: () => {
          onNavigateSection('workbenches');
          onClose();
        },
      },
      {
        id: 'nav-learning',
        category: 'Navigation',
        label: 'Active Learning',
        sublabel: 'Currently learning UiPath & RPA',
        icon: <BookOpen className="w-4 h-4 text-[#F2A77D]" />,
        perform: () => {
          onNavigateSection('experience');
          onClose();
        },
      },
      {
        id: 'nav-contact',
        category: 'Navigation',
        label: 'Contact',
        sublabel: 'Direct email, LinkedIn, and résumé access',
        icon: <Phone className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onNavigateSection('contact');
          onClose();
        },
      },
      {
        id: 'nav-resume',
        category: 'Navigation',
        label: 'View Résumé',
        sublabel: 'Open printable résumé preview',
        shortcut: 'R',
        icon: <FileText className="w-4 h-4 text-[#F2A77D]" />,
        perform: () => {
          onClose();
          onOpenResume();
        },
      },
      {
        id: 'tool-terminal',
        category: 'Perspectives & Tools',
        label: 'Open Interactive Shell',
        sublabel: 'Run commands: help, about, skills, experience, projects',
        shortcut: 'T',
        icon: <Terminal className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onClose();
          onOpenTerminal();
        },
      },
      {
        id: 'view-trace',
        category: 'Perspectives & Tools',
        label: 'Beep to Receipt (Educational Walkthrough)',
        sublabel: 'Educational model of how a retail checkout works across 6 layers',
        icon: <Compass className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onSelectView('trace');
          onClose();
        },
      },
      {
        id: 'view-atlas',
        category: 'Perspectives & Tools',
        label: 'Full Skill Atlas',
        sublabel: `${NODES.length} capabilities across 4 tracks`,
        icon: <Network className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onSelectView('atlas');
          onClose();
        },
      },
      {
        id: 'view-plain',
        category: 'Perspectives & Tools',
        label: 'Printable Summary',
        sublabel: 'High-contrast printable portfolio summary',
        icon: <FileText className="w-4 h-4 text-[#CFCAC0]" />,
        perform: () => {
          onSelectView('plain');
          onClose();
        },
      },
      {
        id: 'jump-receipt',
        category: 'Perspectives & Tools',
        label: 'Summary Receipt',
        sublabel: 'Printable experience and education receipt view',
        icon: <Receipt className="w-4 h-4 text-[#A8C5FF]" />,
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
        label: `Layer 0${i + 1}: ${st.title}`,
        sublabel: st.subtitle,
        icon: <span className="text-xs font-mono font-bold text-[#A8C5FF]">0{i + 1}</span>,
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
          <Check className="w-4 h-4 text-[#A8C5FF]" />
        ) : (
          <Mail className="w-4 h-4 text-[#A8C5FF]" />
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
          <VolumeX className="w-4 h-4 text-[#9A94A8]" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#A8C5FF]" />
        ),
        perform: onToggleAudio,
      },
      {
        id: 'act-linkedin',
        category: 'Actions',
        label: 'Open LinkedIn Profile',
        sublabel: 'External LinkedIn profile',
        icon: <ExternalLink className="w-4 h-4 text-[#CFCAC0]" />,
        perform: () => {
          const anchor = document.createElement('a');
          anchor.href = PROFILE.linkedIn;
          anchor.target = '_blank';
          anchor.rel = 'noopener noreferrer';
          anchor.click();
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
        category: 'Skills',
        label: `${node.label}`,
        sublabel: `${node.category} · ${node.summary}`,
        icon: <span className="text-xs font-mono text-[#A8C5FF]">◆</span>,
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
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#0A0913]/85 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command navigation palette"
    >
      <div
        className="w-full max-w-xl bg-[#0A0913] border border-[#242138] rounded-2xl shadow-2xl overflow-hidden text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 border-b border-[#242138] bg-[#12101F]">
          <Search className="w-4 h-4 text-[#A8C5FF] mr-3 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Jump to Case Studies, Experience, Skills, Workbenches, Contact, Résumé..."
            className="w-full py-3.5 bg-transparent text-[#F6F2E9] placeholder-[#9A94A8] focus:outline-none text-xs sm:text-sm"
            aria-label="Search sections, commands, or skills"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#9A94A8] hover:text-[#F6F2E9] p-1 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-[#242138]" role="listbox">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center text-[#9A94A8]">
              No matching destination found for "{query}".
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
                      ? 'bg-[#12101F] text-[#F6F2E9]'
                      : 'text-[#CFCAC0] hover:bg-[#12101F]/60'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="shrink-0">{action.icon}</span>
                    <div className="truncate">
                      <div className="font-semibold text-[#F6F2E9] truncate flex items-center gap-2">
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F2A77D]" aria-hidden="true" />
                        )}
                        <span>{action.label}</span>
                      </div>
                      {action.sublabel && (
                        <div className="text-[11px] text-[#9A94A8] truncate">{action.sublabel}</div>
                      )}
                    </div>
                  </div>
                  {action.shortcut && (
                    <kbd className="shrink-0 ml-2 px-2 py-0.5 rounded bg-[#12101F] border border-[#242138] text-[10px] font-mono text-[#A8C5FF]">
                      {action.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2.5 border-t border-[#242138] bg-[#12101F] flex items-center justify-between text-[11px] font-mono text-[#9A94A8]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>Esc Close</span>
          </div>
          <span className="text-[#A8C5FF]">{NODES.length} Skills · ⌘K / Ctrl+K</span>
        </div>
      </div>
    </div>
  );
};
