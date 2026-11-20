import React, { useState, useRef, useEffect } from 'react';
import {
  PROFILE,
  EXPERIENCES,
  CASE_STUDIES,
  EDUCATION,
  CERTIFICATIONS,
  LEARNING_ENTRIES,
  SKILL_GROUPS,
} from '../data/universeContent';
import { Terminal as TerminalIcon, X, RotateCcw } from 'lucide-react';
import { audioFx } from '../utils/audioFx';
import { useDialogFocusTrap } from '../utils/useDialogFocusTrap';

interface TerminalLine {
  id: number;
  type: 'command' | 'output' | 'accent' | 'error';
  text: string;
}

interface InteractiveTerminalProps {
  isModal?: boolean;
  onClose?: () => void;
  onOpenResume?: () => void;
  onJumpToSection?: (id: string) => void;
}

const SUPPORTED_COMMANDS = [
  'help',
  'about',
  'skills',
  'experience',
  'projects',
  'education',
  'learning',
  'contact',
  'beep',
  'resume',
  'clear',
];

const INITIAL_LINES: TerminalLine[] = [
  {
    id: 1,
    type: 'accent',
    text: `${PROFILE.displayName} Portfolio Shell (Read-Only Demo)`,
  },
  {
    id: 2,
    type: 'output',
    text: 'Type "help" or click a command below to inspect roles, skills, case studies, or contact details.',
  },
];

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isModal = false,
  onClose,
  onOpenResume,
  onJumpToSection,
}) => {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nextIdRef = useRef(10);

  useDialogFocusTrap(containerRef, isModal);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (isModal) {
      inputRef.current?.focus();
    }
  }, [isModal]);

  const appendLines = (entries: Array<{ type: TerminalLine['type']; text: string }>) => {
    setLines((prev) => [
      ...prev,
      ...entries.map((entry) => {
        nextIdRef.current += 1;
        return { id: nextIdRef.current, ...entry };
      }),
    ]);
  };

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const cmd = trimmed.toLowerCase();
    setHistory((prev) => [trimmed, ...prev.slice(0, 24)]);
    setHistoryIdx(-1);
    setInput('');

    appendLines([{ type: 'command', text: `shell> ${trimmed}` }]);

    if (cmd === 'clear') {
      setLines(INITIAL_LINES);
      return;
    }

    if (cmd === 'help') {
      appendLines([
        { type: 'accent', text: 'Supported commands:' },
        { type: 'output', text: '  about        - Background and target roles' },
        { type: 'output', text: '  skills       - Core capabilities across 4 groups' },
        { type: 'output', text: '  experience   - Work and diploma internship history' },
        { type: 'output', text: '  projects     - Featured case studies' },
        { type: 'output', text: '  education    - UiTM diploma and credentials' },
        { type: 'output', text: '  learning     - Current study (UiPath & RPA)' },
        { type: 'output', text: '  contact      - Email, LinkedIn, and location' },
        { type: 'output', text: '  beep         - Illustrative checkout beep step example' },
        { type: 'output', text: '  resume       - Open résumé preview' },
        { type: 'output', text: '  clear        - Reset output' },
      ]);
      return;
    }

    if (cmd === 'about' || cmd === 'whoami') {
      appendLines([
        { type: 'accent', text: `${PROFILE.fullName} (${PROFILE.displayName})` },
        { type: 'output', text: `Focus: ${PROFILE.title}` },
        { type: 'output', text: `Current: ${PROFILE.currentRole} at ${PROFILE.currentCompany}` },
        { type: 'output', text: `Summary: ${PROFILE.intro}` },
      ]);
      return;
    }

    if (cmd === 'experience') {
      appendLines([
        { type: 'accent', text: `Experience & Diploma Internship (${EXPERIENCES.length} Entries):` },
        ...EXPERIENCES.map((exp) => ({
          type: 'output' as const,
          text: `• ${exp.role} · ${exp.organization} (${exp.period}) - ${exp.technologies.slice(0, 4).join(', ')}`,
        })),
      ]);
      return;
    }

    if (cmd === 'skills') {
      appendLines([
        { type: 'accent', text: 'Core Skills Across 4 Groups:' },
        ...SKILL_GROUPS.map((group) => ({
          type: 'output' as const,
          text: `  • ${group.title}: ${group.items.join(', ')}`,
        })),
      ]);
      return;
    }

    if (cmd === 'projects') {
      appendLines([
        { type: 'accent', text: `Case Studies (${CASE_STUDIES.length}):` },
        ...CASE_STUDIES.map((cs, i) => ({
          type: 'output' as const,
          text: `  0${i + 1}. ${cs.title} (${cs.organization})`,
        })),
      ]);
      return;
    }

    if (cmd === 'education' || cmd === 'certifications') {
      appendLines([
        { type: 'accent', text: 'Education & Credentials:' },
        {
          type: 'output',
          text: `  • ${EDUCATION.degree} - ${EDUCATION.institution} (${EDUCATION.period})`,
        },
        ...CERTIFICATIONS.map((c) => ({
          type: 'output' as const,
          text: `  • ${c.name} - ${c.issuer} [${c.kindLabel}]`,
        })),
      ]);
      return;
    }

    if (cmd === 'learning') {
      appendLines([
        { type: 'accent', text: 'Current Learning:' },
        ...LEARNING_ENTRIES.map((l) => ({
          type: 'output' as const,
          text: `  ○ ${l.topic}: ${l.note}`,
        })),
      ]);
      return;
    }

    if (cmd === 'contact') {
      appendLines([
        { type: 'accent', text: 'Direct Contact:' },
        { type: 'output', text: `  Email:    ${PROFILE.email}` },
        { type: 'output', text: `  LinkedIn: ${PROFILE.linkedIn}` },
        { type: 'output', text: `  Location: ${PROFILE.location}` },
      ]);
      return;
    }

    if (cmd === 'beep') {
      audioFx.playSuccess();
      appendLines([
        { type: 'accent', text: '[ILLUSTRATIVE EXAMPLE] Conceptual Checkout Flow' },
        {
          type: 'output',
          text: 'Scanner input -> Item lookup -> Promo check -> Sample receipt output.',
        },
      ]);
      return;
    }

    if (cmd === 'resume') {
      if (onOpenResume) {
        onOpenResume();
        appendLines([{ type: 'accent', text: 'Opening résumé preview...' }]);
      } else {
        appendLines([{ type: 'output', text: 'Use the Résumé button in the navigation bar.' }]);
      }
      return;
    }

    if (cmd === 'goto skills' && onJumpToSection) {
      onJumpToSection('constellation');
      onClose?.();
      return;
    }

    appendLines([
      {
        type: 'error',
        text: `Unknown command: "${trimmed}". Try one of: ${SUPPORTED_COMMANDS.join(', ')}.`,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = Math.min(historyIdx + 1, history.length - 1);
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      } else {
        setHistoryIdx(-1);
        setInput('');
      }
    } else if (e.key === 'Tab' && !e.shiftKey) {
      const q = input.trim().toLowerCase();
      if (q) {
        const match = SUPPORTED_COMMANDS.find((c) => c.startsWith(q));
        if (match && match !== q) {
          e.preventDefault();
          setInput(match);
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="bg-[#0A0913] border border-[#242138] rounded-2xl overflow-hidden shadow-2xl font-mono text-xs sm:text-sm"
    >
      <div className="px-4 py-3 bg-[#12101F] border-b border-[#242138] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <TerminalIcon className="w-4 h-4 text-[#A8C5FF] shrink-0" aria-hidden="true" />
          <span className="text-xs font-semibold text-[#F6F2E9] truncate">
            Portfolio Shell · Read-Only Demo
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setLines(INITIAL_LINES)}
            className="p-2 rounded text-[#CFCAC0] hover:text-[#A8C5FF] transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
            aria-label="Reset shell output"
            title="Reset shell"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded text-[#CFCAC0] hover:text-[#F6F2E9] border border-[#242138] hover:border-[#A8C5FF]/50 cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
              aria-label="Close portfolio shell dialog"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div
        ref={outputRef}
        onClick={() => inputRef.current?.focus()}
        className="p-4 sm:p-5 h-72 sm:h-80 overflow-y-auto space-y-2 text-xs leading-relaxed cursor-text break-words"
        role="log"
        aria-live="polite"
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className={`break-words whitespace-pre-wrap ${
              line.type === 'command'
                ? 'text-[#A8C5FF] font-semibold pt-1'
                : line.type === 'accent'
                ? 'text-[#F6F2E9] font-semibold'
                : line.type === 'error'
                ? 'text-[#F2A77D]'
                : 'text-[#CFCAC0]'
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>

      <div className="px-4 py-2.5 bg-[#12101F] border-t border-[#242138] flex items-center gap-1.5 overflow-x-auto text-xs">
        <span className="text-[#CFCAC0] mr-1 shrink-0">Quick run:</span>
        {['help', 'about', 'skills', 'experience', 'projects', 'education', 'contact', 'beep', 'clear'].map(
          (cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-1 rounded bg-[#0A0913] hover:bg-[#19162B] text-[#A8C5FF] border border-[#242138] hover:border-[#A8C5FF]/60 transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
            >
              {cmd}
            </button>
          )
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          executeCommand(input);
        }}
        className="px-4 py-3 bg-[#12101F] border-t border-[#242138] flex items-center gap-2.5"
      >
        <label
          htmlFor={isModal ? 'terminal-modal-input' : 'terminal-inline-input'}
          className="text-[#A8C5FF] text-xs font-semibold shrink-0"
        >
          shell&gt;
        </label>
        <input
          id={isModal ? 'terminal-modal-input' : 'terminal-inline-input'}
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help' and press Enter..."
          autoComplete="off"
          spellCheck={false}
          className="flex-1 min-w-0 bg-transparent text-[#F6F2E9] placeholder-[#B5B0C2] text-xs focus:outline-none"
        />
        <button
          type="submit"
          className="px-3 py-1.5 min-h-[36px] rounded bg-[#A8C5FF] hover:bg-[#bfd5ff] text-[#191723] text-xs font-semibold cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F2E9]"
        >
          Run
        </button>
      </form>
    </div>
  );
};
