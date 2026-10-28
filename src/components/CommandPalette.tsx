import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  Command, 
  X, 
  ArrowRight, 
  FileText, 
  Compass,
  Network,
  Receipt,
  Mail, 
  Volume2, 
  VolumeX, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { PROFILE, STRATA, NODES } from '../data/universeContent';
import { audioFx } from '../utils/audioFx';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectView: (view: 'trace' | 'atlas' | 'plain') => void;
  onSelectNode: (nodeId: string) => void;
  onJumpToStratum: (stratumId: any) => void;
  onOpenResume: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

interface PaletteAction {
  id: string;
  category: 'Perspectives' | 'Strata Navigation' | 'Topology Nodes' | 'Actions';
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
  onSelectNode,
  onJumpToStratum,
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
      }, 1500);
    } catch {
      onClose();
    }
  };

  // Base navigation actions
  const baseActions: PaletteAction[] = [
    {
      id: 'view-trace',
      category: 'Perspectives',
      label: 'Switch to Trace Journey (Beep to Receipt)',
      sublabel: 'Continuous 6-strata vertical progression',
      shortcut: '1',
      icon: <Compass className="w-4 h-4 text-cyan-400" />,
      perform: () => {
        onSelectView('trace');
        onClose();
      }
    },
    {
      id: 'view-atlas',
      category: 'Perspectives',
      label: 'Switch to Atlas Knowledge Graph',
      sublabel: 'Deterministic 30-node topology with filters',
      shortcut: '2',
      icon: <Network className="w-4 h-4 text-sky-400" />,
      perform: () => {
        onSelectView('atlas');
        onClose();
      }
    },
    {
      id: 'view-plain',
      category: 'Perspectives',
      label: 'Switch to Plain Semantic Reader Specification',
      sublabel: 'Light paper document for crawlers and print',
      shortcut: '3',
      icon: <FileText className="w-4 h-4 text-amber-400" />,
      perform: () => {
        onSelectView('plain');
        onClose();
      }
    },
    {
      id: 'jump-receipt',
      category: 'Perspectives',
      label: 'The Thermal Receipt (Dossier & Print Resume)',
      sublabel: 'Verified work chronology, credentials, contact',
      shortcut: 'R',
      icon: <Receipt className="w-4 h-4 text-emerald-400" />,
      perform: () => {
        onClose();
        setTimeout(() => {
          const el = document.getElementById('receipt');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    },
    // Strata Navigation
    ...STRATA.map((st, i) => ({
      id: `stratum-${st.id}`,
      category: 'Strata Navigation' as const,
      label: `Stratum 0${i + 1}: ${st.title}`,
      sublabel: st.tagline,
      icon: <span className="text-xs font-mono font-bold text-cyan-400">0{i + 1}</span>,
      perform: () => {
        onJumpToStratum(st.id);
        onClose();
      }
    })),
    // Actions & Tools
    {
      id: 'act-copy-email',
      category: 'Actions',
      label: copiedEmail ? 'Email Copied!' : `Copy Email (${PROFILE.email})`,
      sublabel: 'Clipboard action with iframe fallback',
      shortcut: 'C',
      icon: copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-cyan-400" />,
      perform: copyEmail
    },
    {
      id: 'act-toggle-audio',
      category: 'Actions',
      label: isAudioMuted ? 'Enable Audio Synthesizer Cues' : 'Mute Audio Cues',
      sublabel: 'Interactive click and navigation tones',
      shortcut: 'M',
      icon: isAudioMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />,
      perform: () => {
        onToggleAudio();
      }
    },
    {
      id: 'act-linkedin',
      category: 'Actions',
      label: 'Open LinkedIn Profile',
      sublabel: 'Verified external profile',
      icon: <ExternalLink className="w-4 h-4 text-stone-400" />,
      perform: () => {
        window.open(PROFILE.linkedIn, '_blank', 'noopener,noreferrer');
        onClose();
      }
    }
  ];

  // Dynamic search across all 30 topology nodes
  const nodeActions: PaletteAction[] = NODES.map(node => ({
    id: `node-${node.id}`,
    category: 'Topology Nodes',
    label: `${node.label} [${node.status.toUpperCase()}]`,
    sublabel: `${node.stratum.toUpperCase()} · ${node.summary}`,
    icon: <span className="text-xs font-mono text-cyan-400">◆</span>,
    perform: () => {
      onSelectNode(node.id);
      onClose();
    }
  }));

  const allActions = useMemo(() => [...baseActions, ...nodeActions], [copiedEmail, isAudioMuted]);

  const filteredActions = useMemo(() => {
    if (!query.trim()) return baseActions;
    const q = query.toLowerCase();
    return allActions.filter(act => 
      act.label.toLowerCase().includes(q) || 
      (act.sublabel && act.sublabel.toLowerCase().includes(q))
    );
  }, [query, allActions, baseActions]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredActions]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredActions.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredActions.length) % Math.max(1, filteredActions.length));
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
      aria-label="Command search palette"
    >
      <div 
        className="w-full max-w-xl bg-stone-950 border border-stone-800 shadow-2xl overflow-hidden font-mono text-xs"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-stone-800 bg-stone-900/50">
          <Search className="w-4 h-4 text-stone-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, stratum, or node name..."
            className="w-full py-3.5 bg-transparent text-stone-100 placeholder-stone-500 focus:outline-none"
            aria-label="Search commands or nodes"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-stone-500 hover:text-stone-300 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-stone-900">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center text-stone-500">
              No matching commands or nodes found for "{query}".
            </div>
          ) : (
            filteredActions.map((action, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={action.id}
                  onClick={() => action.perform()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-stone-900 text-stone-100 border-l-2 border-cyan-400' 
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="shrink-0">{action.icon}</span>
                    <div className="truncate">
                      <div className="font-bold text-stone-200 truncate">{action.label}</div>
                      {action.sublabel && (
                        <div className="text-[10px] text-stone-500 truncate">{action.sublabel}</div>
                      )}
                    </div>
                  </div>
                  {action.shortcut && (
                    <span className="shrink-0 ml-2 px-1.5 py-0.5 bg-stone-900 border border-stone-800 text-[10px] text-stone-400">
                      {action.shortcut}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hint Bar */}
        <div className="px-4 py-2 border-t border-stone-800 bg-stone-900/30 flex items-center justify-between text-[10px] text-stone-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="text-cyan-400/80">30 Nodes · 6 Strata</span>
        </div>
      </div>
    </div>
  );
};
