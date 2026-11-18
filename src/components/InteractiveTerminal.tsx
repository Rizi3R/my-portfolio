import React, { useState, useRef, useEffect } from 'react';
import {
  PROFILE,
  EXPERIENCES,
  CASE_STUDIES,
  EDUCATION,
  CERTIFICATIONS,
  LEARNING_ENTRIES,
  NODES,
} from '../data/universeContent';
import { Terminal as TerminalIcon, X, RotateCcw } from 'lucide-react';
import { audioFx } from '../utils/audioFx';

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
    text: `${PROFILE.displayName} Portfolio Shell (Read-Only Sandbox)`,
  },
  {
    id: 2,
    type: 'output',
    text: 'Type "help" or click a command below to inspect roles, skills, case studies, or contact info.',
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
  const outputRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nextIdRef = useRef(10);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (isModal) {
      setTimeout(() => inputRef.current?.focus(), 60);
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

    appendLines([{ type: 'command', text: `aries@portfolio:~$ ${trimmed}` }]);

    if (cmd === 'clear') {
      setLines(INITIAL_LINES);
      return;
    }

    if (cmd === 'help') {
      appendLines([
        { type: 'accent', text: 'Available commands:' },
        { type: 'output', text: '  about        - Background and focus areas' },
        { type: 'output', text: '  skills       - Core capabilities grouped across 4 tracks' },
        { type: 'output', text: '  experience   - Work and internship chronology' },
        { type: 'output', text: '  projects     - Case studies' },
        { type: 'output', text: '  education    - UiTM diploma and credentials' },
        { type: 'output', text: '  learning     - Current learning (UiPath & RPA)' },
        { type: 'output', text: '  contact      - Email, LinkedIn, and location' },
        { type: 'output', text: '  beep         - Educational checkout beep sample' },
        { type: 'output', text: '  resume       - Open résumé preview' },
        { type: 'output', text: '  clear        - Clear terminal output' },
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
        { type: 'accent', text: `Work & Internship History (${EXPERIENCES.length} Entries):` },
        ...EXPERIENCES.map((exp) => ({
          type: 'output' as const,
          text: `• ${exp.role} @ ${exp.organization} (${exp.period}) - ${exp.technologies.slice(0, 4).join(', ')}`,
        })),
      ]);
      return;
    }

    if (cmd === 'skills') {
      const appSupport = NODES.filter((n) => n.category === 'Application Support').map((n) => n.label);
      const bizSystems = NODES.filter((n) => n.category === 'Business Systems & SaaS').map((n) => n.label);
      const itOps = NODES.filter((n) => n.category === 'IT Operations & Helpdesk').map((n) => n.label);
      const foundations = NODES.filter((n) => n.category === 'Technical Foundations').map((n) => n.label);
      appendLines([
        { type: 'accent', text: 'Core Skills Across 4 Tracks:' },
        { type: 'output', text: `  ◆ Application Support:      ${appSupport.join(', ')}` },
        { type: 'output', text: `  ◆ Business Systems & SaaS:  ${bizSystems.join(', ')}` },
        { type: 'output', text: `  ◆ IT Operations & Helpdesk: ${itOps.join(', ')}` },
        { type: 'output', text: `  ■ Technical Foundations:    ${foundations.join(', ')}` },
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
        { type: 'output', text: `  • ${EDUCATION.degree} - ${EDUCATION.institution} (${EDUCATION.period})` },
        ...CERTIFICATIONS.map((c) => ({
          type: 'output' as const,
          text: `  • ${c.name} - ${c.issuer} [${c.status}]`,
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
        { type: 'accent', text: 'Direct Contact Channels:' },
        { type: 'output', text: `  Email:    ${PROFILE.email}` },
        { type: 'output', text: `  LinkedIn: ${PROFILE.linkedIn}` },
        { type: 'output', text: `  Location: ${PROFILE.location}` },
      ]);
      return;
    }

    if (cmd === 'beep') {
      audioFx.playSuccess();
      appendLines([
        { type: 'accent', text: '[EDUCATIONAL WALKTHROUGH] Sample Barcode Scan' },
        {
          type: 'output',
          text: 'Scanner input -> App item lookup -> sample basket total -> simulated receipt print.',
        },
      ]);
      return;
    }

    if (cmd === 'resume') {
      if (onOpenResume) {
        onOpenResume();
        appendLines([{ type: 'accent', text: 'Opening resume preview...' }]);
      } else {
        appendLines([{ type: 'output', text: 'Use the View Resume button in the navigation bar.' }]);
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
        text: `Command not found: "${trimmed}". Type "help" to see supported commands.`,
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
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const q = input.trim().toLowerCase();
      if (!q) return;
      const match = SUPPORTED_COMMANDS.find((c) => c.startsWith(q));
      if (match) setInput(match);
    }
  };

  return (
    <div className="bg-[#141416] border border-[#323238] rounded-2xl overflow-hidden shadow-2xl font-mono text-xs sm:text-sm">
      <div className="px-4 py-3 bg-[#1B1B1D] border-b border-[#323238] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <TerminalIcon className="w-3.5 h-3.5 text-[#B0E0E6]" aria-hidden="true" />
          <span className="text-xs font-semibold text-white">
            aries-portfolio : interactive shell
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLines(INITIAL_LINES)}
            className="p-1.5 rounded text-[#D1D5DB] hover:text-[#B0E0E6] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
            aria-label="Reset terminal output"
            title="Reset terminal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded text-[#D1D5DB] hover:text-white border border-[#323238] cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
              aria-label="Close terminal modal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div
        ref={outputRef}
        onClick={() => inputRef.current?.focus()}
        className="p-4 sm:p-5 h-72 sm:h-80 overflow-y-auto space-y-2 text-xs leading-relaxed cursor-text"
        role="log"
        aria-live="polite"
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className={
              line.type === 'command'
                ? 'text-[#B0E0E6] font-semibold pt-1'
                : line.type === 'accent'
                ? 'text-white font-semibold'
                : line.type === 'error'
                ? 'text-[#F87171]'
                : 'text-[#E5E7EB]'
            }
          >
            {line.text}
          </div>
        ))}
      </div>

      <div className="px-4 py-2.5 bg-[#1B1B1D] border-t border-[#323238] flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <span className="text-[#D1D5DB] mr-1 shrink-0">Quick run:</span>
        {['help', 'about', 'skills', 'experience', 'projects', 'education', 'contact', 'beep', 'clear'].map(
          (cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-1 rounded bg-[#222226] hover:bg-[#2B2B30] text-[#B0E0E6] border border-[#323238] hover:border-[#B0E0E6]/60 transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
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
        className="px-4 py-3 bg-[#161618] border-t border-[#323238] flex items-center gap-2.5"
      >
        <label
          htmlFor={isModal ? 'terminal-modal-input' : 'terminal-inline-input'}
          className="text-[#B0E0E6] text-xs font-semibold shrink-0"
        >
          aries@portfolio:~$
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
          className="flex-1 bg-transparent text-white placeholder-[#9CA3AF] text-xs focus:outline-none"
        />
        <button
          type="submit"
          className="px-3 py-1 rounded bg-[#DC343B] hover:bg-[#c52b31] text-white text-xs font-semibold cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
        >
          Run
        </button>
      </form>
    </div>
  );
};
