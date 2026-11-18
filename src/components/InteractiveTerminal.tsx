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
  'contact',
  'learning',
  'visitors',
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
    text: 'Type "help" or click a command below to query roles, skills, case studies, or contact info.',
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

  const executeCommand = async (rawCmd: string) => {
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
        { type: 'output', text: '  about        - Background and current role' },
        { type: 'output', text: '  skills       - Work-backed skills and active learning' },
        { type: 'output', text: '  experience   - Work and internship chronology' },
        { type: 'output', text: '  projects     - Featured case studies' },
        { type: 'output', text: '  education    - UiTM diploma and credentials' },
        { type: 'output', text: '  learning     - Currently exploring (UiPath & RPA)' },
        { type: 'output', text: '  contact      - Email, LinkedIn, and location' },
        { type: 'output', text: '  visitors     - Query server visitor count' },
        { type: 'output', text: '  beep         - Simulated scanner beep walkthrough' },
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
      const prof = NODES.filter((n) => n.status === 'professional')
        .slice(0, 6)
        .map((n) => n.label);
      const prac = NODES.filter((n) => n.status === 'project').map((n) => n.label);
      const learn = NODES.filter((n) => n.status === 'learning').map((n) => n.label);
      appendLines([
        { type: 'accent', text: 'Skills Grouped by Background:' },
        { type: 'output', text: `  ◆ Work-Backed:               ${prof.join(', ')}` },
        { type: 'output', text: `  ■ Internship / Education:    ${prac.join(', ')}` },
        { type: 'output', text: `  ○ Currently Learning:        ${learn.join(', ')}` },
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
        { type: 'accent', text: 'Active Learning:' },
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

    if (cmd === 'visitors') {
      try {
        const res = await fetch('/api/visitors');
        const data = (await res.json()) as { configured: boolean; count: number | null };
        if (data.configured && data.count !== null) {
          appendLines([
            { type: 'accent', text: `People who have visited: ${data.count.toLocaleString()}` },
          ]);
        } else {
          appendLines([
            { type: 'output', text: 'Visitor persistence is currently awaiting configuration.' },
          ]);
        }
      } catch {
        appendLines([{ type: 'error', text: 'Unable to reach /api/visitors right now.' }]);
      }
      return;
    }

    if (cmd === 'beep') {
      audioFx.playSuccess();
      appendLines([
        { type: 'accent', text: '[ILLUSTRATIVE SIMULATION] Sample Barcode Scan' },
        {
          type: 'output',
          text: 'Scanner input -> POS app SKU lookup -> sample basket total -> simulated receipt print.',
        },
      ]);
      return;
    }

    if (cmd === 'resume') {
      if (onOpenResume) {
        onOpenResume();
        appendLines([{ type: 'accent', text: 'Opening resume viewer...' }]);
      } else {
        appendLines([{ type: 'output', text: 'Use the View Resume button in the navigation bar.' }]);
      }
      return;
    }

    if (cmd === 'skills' && onJumpToSection) {
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
          <span className="w-2.5 h-2.5 rounded-full bg-[#DC343B]" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#B0E0E6]" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#4B5563]" aria-hidden="true" />
          <TerminalIcon className="w-3.5 h-3.5 text-[#B0E0E6] ml-1" aria-hidden="true" />
          <span className="text-xs font-semibold text-white">
            aries-portfolio : interactive shell
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLines(INITIAL_LINES)}
            className="p-1.5 rounded text-[#9CA3AF] hover:text-[#B0E0E6] transition-colors cursor-pointer"
            aria-label="Reset terminal output"
            title="Reset terminal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded text-[#9CA3AF] hover:text-white border border-[#323238] cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
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
                : 'text-[#D1D5DB]'
            }
          >
            {line.text}
          </div>
        ))}
      </div>

      <div className="px-4 py-2.5 bg-[#1B1B1D] border-t border-[#323238] flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <span className="text-[#9CA3AF] mr-1 shrink-0">Quick run:</span>
        {['help', 'about', 'skills', 'experience', 'projects', 'education', 'contact', 'beep', 'clear'].map(
          (cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-1 rounded bg-[#222226] hover:bg-[#2B2B30] text-[#B0E0E6] border border-[#323238] hover:border-[#B0E0E6]/50 transition-colors shrink-0 cursor-pointer"
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
          className="flex-1 bg-transparent text-white placeholder-[#6B7280] text-xs focus:outline-none"
        />
        <button
          type="submit"
          className="px-3 py-1 rounded bg-[#DC343B] hover:bg-[#c52b31] text-white text-xs font-semibold cursor-pointer shrink-0"
        >
          Run
        </button>
      </form>
    </div>
  );
};
