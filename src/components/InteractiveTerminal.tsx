import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Terminal as TerminalIcon, X, RotateCcw } from 'lucide-react';
import { useI18n } from '../i18n';
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

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isModal = false,
  onClose,
  onOpenResume,
  onJumpToSection,
}) => {
  const { locale, t, content, format } = useI18n();

  const initialLines: TerminalLine[] = useMemo(
    () => [
      {
        id: 1,
        type: 'accent',
        text: format(t.terminal.welcomeHeader, { name: content.profile.displayName }),
      },
      {
        id: 2,
        type: 'output',
        text: t.terminal.welcomeBody,
      },
    ],
    [t.terminal.welcomeHeader, t.terminal.welcomeBody, content.profile.displayName, format]
  );

  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [hasUserHistory, setHasUserHistory] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nextIdRef = useRef(10);

  useDialogFocusTrap(containerRef, isModal);

  useEffect(() => {
    if (!hasUserHistory) {
      setLines(initialLines);
    }
  }, [locale, initialLines, hasUserHistory]);

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

  const resetTerminal = () => {
    setHasUserHistory(false);
    setLines(initialLines);
  };

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const cmd = trimmed.toLowerCase();
    setHistory((prev) => [trimmed, ...prev.slice(0, 24)]);
    setHistoryIdx(-1);
    setInput('');

    if (cmd === 'clear') {
      resetTerminal();
      return;
    }

    setHasUserHistory(true);
    appendLines([{ type: 'command', text: `shell> ${trimmed}` }]);

    if (cmd === 'help') {
      appendLines([
        { type: 'accent', text: t.terminal.helpTitle },
        ...Object.entries(t.terminal.helpCommands).map(([key, desc]) => ({
          type: 'output' as const,
          text: `  ${key.padEnd(13, ' ')}- ${desc}`,
        })),
      ]);
      return;
    }

    if (cmd === 'about' || cmd === 'whoami') {
      appendLines([
        { type: 'accent', text: `${content.profile.fullName} (${content.profile.displayName})` },
        { type: 'output', text: format(t.terminal.labels.focus, { title: content.profile.title }) },
        {
          type: 'output',
          text: format(t.terminal.labels.current, {
            role: content.profile.currentRole,
            company: content.profile.currentCompany,
          }),
        },
        { type: 'output', text: format(t.terminal.labels.summary, { intro: content.profile.intro }) },
      ]);
      return;
    }

    if (cmd === 'experience') {
      appendLines([
        {
          type: 'accent',
          text: format(t.terminal.labels.experienceHeader, {
            count: content.experiences.length,
          }),
        },
        ...content.experiences.map((exp) => ({
          type: 'output' as const,
          text: `• ${exp.role} · ${exp.organization} (${exp.period}) - ${exp.technologies.slice(0, 4).join(', ')}`,
        })),
      ]);
      return;
    }

    if (cmd === 'skills') {
      appendLines([
        { type: 'accent', text: t.terminal.labels.skillsHeader },
        ...content.skillGroups.map((group) => ({
          type: 'output' as const,
          text: `  • ${group.title}: ${group.items.join(', ')}`,
        })),
      ]);
      return;
    }

    if (cmd === 'projects') {
      appendLines([
        {
          type: 'accent',
          text: format(t.terminal.labels.projectsHeader, { count: content.caseStudies.length }),
        },
        ...content.caseStudies.map((cs, i) => ({
          type: 'output' as const,
          text: `  0${i + 1}. ${cs.title} (${cs.organization})`,
        })),
      ]);
      return;
    }

    if (cmd === 'education' || cmd === 'certifications') {
      appendLines([
        { type: 'accent', text: t.terminal.labels.educationHeader },
        {
          type: 'output',
          text: `  • ${content.education.degree} - ${content.education.institution} (${content.education.period})`,
        },
        ...content.certifications.map((c) => ({
          type: 'output' as const,
          text: `  • ${c.name} - ${c.issuer} [${c.kindLabel}]`,
        })),
      ]);
      return;
    }

    if (cmd === 'learning') {
      appendLines([
        { type: 'accent', text: t.terminal.labels.learningHeader },
        ...content.learning.map((l) => ({
          type: 'output' as const,
          text: `  ○ ${l.topic}: ${l.note}`,
        })),
      ]);
      return;
    }

    if (cmd === 'contact') {
      appendLines([
        { type: 'accent', text: t.terminal.labels.contactHeader },
        { type: 'output', text: `  ${t.terminal.labels.email}:    ${content.profile.email}` },
        { type: 'output', text: `  ${t.terminal.labels.linkedIn}: ${content.profile.linkedIn}` },
        { type: 'output', text: `  ${t.terminal.labels.location}: ${content.profile.location}` },
      ]);
      return;
    }

    if (cmd === 'beep') {
      audioFx.playSuccess();
      appendLines([
        { type: 'accent', text: t.terminal.labels.beepHeader },
        {
          type: 'output',
          text: t.terminal.labels.beepOutput,
        },
      ]);
      return;
    }

    if (cmd === 'resume') {
      if (onOpenResume) {
        onOpenResume();
        appendLines([{ type: 'accent', text: t.terminal.labels.openingResume }]);
      } else {
        appendLines([{ type: 'output', text: t.terminal.labels.resumeHint }]);
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
        text: format(t.terminal.labels.unknownCommand, {
          command: trimmed,
          commands: SUPPORTED_COMMANDS.join(', '),
        }),
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
            {t.terminal.headerTitle}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={resetTerminal}
            className="p-2 rounded text-[#CFCAC0] hover:text-[#A8C5FF] transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
            aria-label={t.terminal.resetAria}
            title={t.terminal.resetAria}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded text-[#CFCAC0] hover:text-[#F6F2E9] border border-[#242138] hover:border-[#A8C5FF]/50 cursor-pointer min-w-11 min-h-11 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
              aria-label={t.terminal.closeAria}
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
        <span className="text-[#CFCAC0] mr-1 shrink-0">{t.terminal.quickRun}</span>
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
          placeholder={t.terminal.placeholder}
          autoComplete="off"
          spellCheck={false}
          className="flex-1 min-w-0 bg-transparent text-[#F6F2E9] placeholder-[#B5B0C2] text-xs focus:outline-none"
        />
        <button
          type="submit"
          className="px-3 py-1.5 min-h-[36px] rounded bg-[#A8C5FF] hover:bg-[#bfd5ff] text-[#191723] text-xs font-semibold cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F2E9]"
        >
          {t.terminal.run}
        </button>
      </form>
    </div>
  );
};
