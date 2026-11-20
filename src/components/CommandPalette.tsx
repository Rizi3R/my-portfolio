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
  AlertCircle,
} from 'lucide-react';
import type { StratumType } from '../data/universeContent';
import { useI18n } from '../i18n';
import { audioFx } from '../utils/audioFx';
import { copyTextToClipboard } from '../utils/clipboard';
import { useDialogFocusTrap } from '../utils/useDialogFocusTrap';
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
  keywords?: string;
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
  const { t, content, format } = useI18n();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useDialogFocusTrap(dialogRef, isOpen);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setCopyStatus('idle');
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const copyEmail = async () => {
    const ok = await copyTextToClipboard(content.profile.email);
    if (ok) {
      setCopyStatus('copied');
      audioFx.playSuccess();
      setTimeout(() => {
        setCopyStatus('idle');
        onClose();
      }, 1100);
    } else {
      setCopyStatus('error');
      setTimeout(() => {
        setCopyStatus('idle');
      }, 2400);
    }
  };

  const baseActions: PaletteAction[] = useMemo(
    () => [
      {
        id: 'nav-home',
        category: 'Navigation',
        label: t.commandPalette.actions.home.label,
        sublabel: t.commandPalette.actions.home.sublabel,
        keywords: 'home overview intro hero top',
        shortcut: 'H',
        icon: <Home className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onSelectView('portfolio');
          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          setTimeout(
            () => window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' }),
            60
          );
          onClose();
        },
      },
      {
        id: 'nav-projects',
        category: 'Navigation',
        label: t.commandPalette.actions.work.label,
        sublabel: format(t.commandPalette.actions.work.sublabel, {
          count: content.caseStudies.length,
        }),
        keywords: 'work projects case studies lark xilnex',
        icon: <FolderGit2 className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onNavigateSection('featured-work');
          onClose();
        },
      },
      {
        id: 'nav-experience',
        category: 'Navigation',
        label: t.commandPalette.actions.experience.label,
        sublabel: format(t.commandPalette.actions.experience.sublabel, {
          count: content.experiences.length,
        }),
        keywords: 'experience timeline employment emart24 hwc',
        icon: <Briefcase className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onNavigateSection('experience');
          onClose();
        },
      },
      {
        id: 'nav-skills',
        category: 'Navigation',
        label: t.commandPalette.actions.skills.label,
        sublabel: t.commandPalette.actions.skills.sublabel,
        keywords: 'skills capabilities',
        icon: <Sparkles className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onNavigateSection('constellation');
          onClose();
        },
      },
      {
        id: 'nav-credentials',
        category: 'Navigation',
        label: t.commandPalette.actions.credentials.label,
        sublabel: t.commandPalette.actions.credentials.sublabel,
        keywords: 'education credentials uitm aws uipath diploma',
        icon: <BookOpen className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onNavigateSection('credentials');
          onClose();
        },
      },
      {
        id: 'nav-workbenches',
        category: 'Navigation',
        label: t.commandPalette.actions.workbenches.label,
        sublabel: t.commandPalette.actions.workbenches.sublabel,
        keywords: 'interactive lab shell atlas trace computing',
        icon: <Layers className="w-4 h-4 text-[#F2A77D]" />,
        perform: () => {
          onNavigateSection('workbenches');
          onClose();
        },
      },
      {
        id: 'nav-contact',
        category: 'Navigation',
        label: t.commandPalette.actions.contact.label,
        sublabel: t.commandPalette.actions.contact.sublabel,
        keywords: 'contact email linkedin resume',
        icon: <Phone className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onNavigateSection('contact');
          onClose();
        },
      },
      {
        id: 'nav-resume',
        category: 'Navigation',
        label: t.commandPalette.actions.resume.label,
        sublabel: t.commandPalette.actions.resume.sublabel,
        keywords: 'resume cv print pdf',
        shortcut: 'R',
        icon: <FileText className="w-4 h-4 text-[#F2A77D]" />,
        perform: () => {
          onOpenResume();
        },
      },
      {
        id: 'tool-terminal',
        category: 'Perspectives & Tools',
        label: t.commandPalette.actions.terminal.label,
        sublabel: t.commandPalette.actions.terminal.sublabel,
        keywords: 'shell terminal cli portfolio shell',
        shortcut: 'T',
        icon: <Terminal className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onOpenTerminal();
        },
      },
      {
        id: 'view-trace',
        category: 'Perspectives & Tools',
        label: t.commandPalette.actions.trace.label,
        sublabel: t.commandPalette.actions.trace.sublabel,
        keywords: 'beep to receipt walkthrough trace layers',
        icon: <Compass className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onSelectView('trace');
          onClose();
        },
      },
      {
        id: 'view-atlas',
        category: 'Perspectives & Tools',
        label: t.commandPalette.actions.atlas.label,
        sublabel: format(t.commandPalette.actions.atlas.sublabel, {
          count: content.nodes.length,
        }),
        keywords: 'skill atlas graph network',
        icon: <Network className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onSelectView('atlas');
          onClose();
        },
      },
      {
        id: 'view-plain',
        category: 'Perspectives & Tools',
        label: t.commandPalette.actions.plain.label,
        sublabel: t.commandPalette.actions.plain.sublabel,
        keywords: 'printable summary plain view',
        icon: <FileText className="w-4 h-4 text-[#CFCAC0]" />,
        perform: () => {
          onSelectView('plain');
          onClose();
        },
      },
      {
        id: 'view-receipt',
        category: 'Perspectives & Tools',
        label: t.commandPalette.actions.receipt.label,
        sublabel: t.commandPalette.actions.receipt.sublabel,
        keywords: 'summary receipt printable',
        icon: <Receipt className="w-4 h-4 text-[#A8C5FF]" />,
        perform: () => {
          onSelectView('receipt');
          onClose();
        },
      },
      ...content.strata.map((st, i) => ({
        id: `stratum-${st.id}`,
        category: 'Perspectives & Tools' as const,
        label: format(t.commandPalette.actions.layerPrefix, {
          index: i + 1,
          title: st.title,
        }),
        sublabel: st.subtitle,
        keywords: `layer 0${i + 1} ${st.id}`,
        icon: <span className="text-xs font-mono font-bold text-[#A8C5FF]">0{i + 1}</span>,
        perform: () => {
          onJumpToStratum(st.id);
          onClose();
        },
      })),
      {
        id: 'act-copy-email',
        category: 'Actions',
        label:
          copyStatus === 'copied'
            ? t.commandPalette.actions.copyEmail.copied
            : copyStatus === 'error'
            ? format(t.commandPalette.actions.copyEmail.failed, { email: content.profile.email })
            : format(t.commandPalette.actions.copyEmail.label, { email: content.profile.email }),
        sublabel: t.commandPalette.actions.copyEmail.sublabel,
        keywords: 'copy email address clipboard',
        shortcut: 'C',
        icon:
          copyStatus === 'copied' ? (
            <Check className="w-4 h-4 text-[#A8C5FF]" />
          ) : copyStatus === 'error' ? (
            <AlertCircle className="w-4 h-4 text-[#F2A77D]" />
          ) : (
            <Mail className="w-4 h-4 text-[#A8C5FF]" />
          ),
        perform: copyEmail,
      },
      {
        id: 'act-toggle-audio',
        category: 'Actions',
        label: isAudioMuted
          ? t.commandPalette.actions.toggleAudio.enable
          : t.commandPalette.actions.toggleAudio.mute,
        sublabel: t.commandPalette.actions.toggleAudio.sublabel,
        keywords: 'audio sound cues mute enable',
        shortcut: 'M',
        icon: isAudioMuted ? (
          <VolumeX className="w-4 h-4 text-[#B5B0C2]" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#A8C5FF]" />
        ),
        perform: onToggleAudio,
      },
      {
        id: 'act-linkedin',
        category: 'Actions',
        label: t.commandPalette.actions.linkedIn.label,
        sublabel: t.commandPalette.actions.linkedIn.sublabel,
        keywords: 'linkedin external profile',
        icon: <ExternalLink className="w-4 h-4 text-[#CFCAC0]" />,
        perform: () => {
          const anchor = document.createElement('a');
          anchor.href = content.profile.linkedIn;
          anchor.target = '_blank';
          anchor.rel = 'noopener noreferrer';
          anchor.click();
          onClose();
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [copyStatus, isAudioMuted, t, content]
  );

  const nodeActions: PaletteAction[] = useMemo(
    () =>
      content.nodes.map((node) => ({
        id: `node-${node.id}`,
        category: 'Skills',
        label: node.label,
        sublabel: `${content.constellationCategories[node.category]} · ${node.summary}`,
        keywords: `${node.category} ${node.id}`,
        icon: <span className="text-xs font-mono text-[#A8C5FF]">◆</span>,
        perform: () => {
          onSelectNode(node.id);
          onClose();
        },
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [content]
  );

  const allActions = useMemo(() => [...baseActions, ...nodeActions], [baseActions, nodeActions]);

  const filteredActions = useMemo(() => {
    if (!query.trim()) return baseActions;
    const q = query.toLowerCase();
    return allActions.filter((act) => {
      const localizedCat = t.commandPalette.categories[act.category] || act.category;
      return (
        act.label.toLowerCase().includes(q) ||
        (act.sublabel && act.sublabel.toLowerCase().includes(q)) ||
        (act.keywords && act.keywords.toLowerCase().includes(q)) ||
        localizedCat.toLowerCase().includes(q) ||
        act.category.toLowerCase().includes(q)
      );
    });
  }, [query, allActions, baseActions, t.commandPalette.categories]);

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
      aria-label={t.commandPalette.dialogLabel}
    >
      <div
        ref={dialogRef}
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
            placeholder={t.commandPalette.searchPlaceholder}
            className="w-full py-3.5 bg-transparent text-[#F6F2E9] placeholder-[#B5B0C2] focus:outline-none text-xs sm:text-sm"
            aria-label={t.commandPalette.searchInputAriaLabel}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#B5B0C2] hover:text-[#F6F2E9] p-1.5 cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
              aria-label={t.commandPalette.clearSearch}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-1 text-[#B5B0C2] hover:text-[#F6F2E9] p-1.5 cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
            aria-label={t.commandPalette.closeLabel}
          >
            <span className="font-mono text-xs">Esc</span>
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-[#242138]" role="listbox">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center text-[#B5B0C2]">
              {format(t.commandPalette.emptyState, { query })}
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
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F2A77D] shrink-0" aria-hidden="true" />
                        )}
                        <span>{action.label}</span>
                      </div>
                      {action.sublabel && (
                        <div className="text-xs text-[#B5B0C2] truncate">{action.sublabel}</div>
                      )}
                    </div>
                  </div>
                  {action.shortcut && (
                    <kbd className="shrink-0 ml-2 px-2 py-0.5 rounded bg-[#12101F] border border-[#242138] text-xs font-mono text-[#A8C5FF]">
                      {action.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2.5 border-t border-[#242138] bg-[#12101F] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#B5B0C2]">
          <div className="flex items-center gap-3">
            <span>↑↓ {t.commandPalette.footerNavigate}</span>
            <span>↵ {t.commandPalette.footerOpen}</span>
            <span>Esc {t.commandPalette.footerClose}</span>
          </div>
          <span className="text-[#A8C5FF]">
            {format(t.commandPalette.footerSkillsCount, { count: content.nodes.length })}
          </span>
        </div>
      </div>
    </div>
  );
};
