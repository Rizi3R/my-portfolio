import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  FileText, 
  Terminal as TerminalIcon, 
  Network, 
  Activity, 
  Cpu, 
  Command, 
  Clock,
  Layers,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { NetworkTopologyCanvas } from './NetworkTopologyCanvas';
import { ArchitectureMatrix } from './ArchitectureMatrix';
import { audioFx } from '../utils/audioFx';

interface HeroProps {
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenCommandPalette }) => {
  const [hudView, setHudView] = useState<'topology' | 'terminal' | 'architecture'>('topology');
  const [activeCommand, setActiveCommand] = useState<string>('profile');
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'ARIES-OS v2.9.2 [ENTERPRISE IT KERNEL LOADED]',
    'Multi-Site Application Support & Infrastructure Console',
    'Type "help" or select quick commands below to interrogate system profile.'
  ]);
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);

  // Synchronized Digital Clock (UTC + MYT)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const mytString = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Kuala_Lumpur',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentTime(mytString);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    audioFx.playClick(500);
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 76;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    audioFx.playCommand();

    let output = '';
    if (cleanCmd === 'profile' || cleanCmd === '--profile' || cleanCmd === 'whoami') {
      output = `Aries Razak — ${PERSONAL_INFO.headline}\n"${PERSONAL_INFO.positioningStatement}"\nLocation: ${PERSONAL_INFO.location}\nAWS Certified Cloud Practitioner · UiTM CS & Math Graduate`;
    } else if (cleanCmd === 'stack' || cleanCmd === '--stack') {
      output = 'Production Stack:\n• Xilnex POS · EDC Payment Pinpads · DuitNow QR Integration\n• Lark Super Admin · Google Workspace · M365 Administration\n• Layer 1-4 Networking · RJ45 T-568B Cabling · VLAN/DHCP · AP Commissioning\n• AWS Certified Cloud Practitioner · MySQL · PHP Laravel';
    } else if (cleanCmd === 'contact' || cleanCmd === '--contact') {
      output = `Email: ${PERSONAL_INFO.email}\nLinkedIn: ${PERSONAL_INFO.linkedIn}\nPhone: ${PERSONAL_INFO.phone}\nLocation: Selangor / Kuala Lumpur, Malaysia`;
    } else if (cleanCmd === 'help' || cleanCmd === '--help') {
      output = 'Available Commands:\n• profile      - View professional positioning & background\n• stack        - View verified production stack\n• contact      - Interrogate verified public contacts\n• topology     - Switch viewport to Live Network Mesh\n• architecture - Switch viewport to Retail Pipeline Matrix\n• ping         - Execute diagnostic ICMP ping\n• clear        - Clear console history';
    } else if (cleanCmd === 'topology' || cleanCmd === 'map') {
      setHudView('topology');
      output = 'Switching viewport to Live Network Topology Mesh...';
    } else if (cleanCmd === 'architecture' || cleanCmd === 'pipeline' || cleanCmd === 'matrix') {
      setHudView('architecture');
      output = 'Switching viewport to Enterprise Architecture Pipeline...';
    } else if (cleanCmd === 'ping' || cleanCmd.startsWith('ping')) {
      output = 'PING emart24-hq.internal (10.10.1.15): 56 data bytes\n64 bytes: icmp_seq=0 ttl=64 time=11.4 ms\n64 bytes: icmp_seq=1 ttl=64 time=10.8 ms\n--- 0% packet loss, RTT avg 11.1ms ---';
    } else if (cleanCmd === 'clear') {
      setTerminalLogs([]);
      return;
    } else {
      output = `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`;
    }

    setTerminalLogs((prev) => [...prev, `$ ${cmd}`, output]);
    setActiveCommand(cleanCmd);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    executeCommand(terminalInput);
    setTerminalInput('');
  };

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  return (
    <section id="top" className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-500/10 blur-[140px] pointer-events-none rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Introduction */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Cybernetic HUD Telemetry Header with Live Clock */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-4 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-md">
              <span className="text-sky-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>ONLINE</span>
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="text-slate-300">SELANGOR / KL</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="text-sky-300 flex items-center gap-1">
                <Clock className="w-3 h-3 text-sky-400" />
                <span className="tabular-nums font-mono">{currentTime || '21:00:00'} MYT (UTC+8)</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 
              style={{ textWrap: 'balance' } as React.CSSProperties}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.12] mb-6"
            >
              {PERSONAL_INFO.tagline}
            </h1>

            {/* Prominent Name & Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed mb-4 max-w-xl">
              I'm <strong className="font-bold text-white tracking-wide">{PERSONAL_INFO.displayName}</strong>. {PERSONAL_INFO.shortBio}
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8 max-w-xl">
              From multi-site retail POS triage and enterprise SaaS governance to Layer 1–4 networking and cloud foundations, I investigate root causes, translate user issues into technical clarity, and keep business systems operating without interruption.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#simulator"
                onClick={(e) => handleLinkClick(e, '#simulator')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-md transition-all duration-150 shadow-lg shadow-sky-500/25 hover:shadow-sky-400/40 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <Cpu className="w-4 h-4" />
                <span>Launch Incident Simulator</span>
              </a>

              <a
                href="#projects"
                onClick={(e) => handleLinkClick(e, '#projects')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-md transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <span>Mission Debriefs</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => {
                  audioFx.playClick(600);
                  onOpenCommandPalette();
                }}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 text-sm font-mono text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-md transition-colors"
                title="Open Command Palette (Cmd+K)"
              >
                <Command className="w-4 h-4 text-sky-400" />
                <span className="text-xs">Cmd+K</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  audioFx.playClick(600);
                  onOpenResume();
                }}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-md"
              >
                <FileText className="w-4 h-4 text-sky-400" />
                <span>Resume</span>
              </button>
            </div>

            {/* Verified Credentials Bar */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                <span className="text-slate-200 font-medium">AWS Certified Cloud Practitioner</span>
              </div>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 shadow-sm shadow-sky-400/50" />
                <span>CS & Mathematics (UiTM)</span>
              </div>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Tri-Mode Interactive HUD (Topology Canvas / Terminal / Architecture Matrix) */}
          <div className="lg:col-span-6 w-full">
            
            {/* View Mode Switcher Header */}
            <div className="flex items-center justify-between mb-3 px-1 text-xs font-mono">
              <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    audioFx.playClick(500);
                    setHudView('topology');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors ${
                    hudView === 'topology'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Network className="w-3.5 h-3.5" />
                  <span>Network Mesh</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audioFx.playClick(500);
                    setHudView('terminal');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors ${
                    hudView === 'terminal'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <TerminalIcon className="w-3.5 h-3.5" />
                  <span>CLI Terminal</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audioFx.playClick(500);
                    setHudView('architecture');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors ${
                    hudView === 'architecture'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Pipeline Matrix</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-500 hidden sm:inline">
                Interactive HUD v2.9
              </span>
            </div>

            {/* Viewport Render */}
            {hudView === 'topology' ? (
              <NetworkTopologyCanvas />
            ) : hudView === 'architecture' ? (
              <ArchitectureMatrix />
            ) : (
              <div className="bg-[#090D18] border border-slate-800 rounded-xl shadow-2xl overflow-hidden font-mono text-xs">
                
                {/* Terminal Title Bar */}
                <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                    </div>
                    <span className="text-slate-300 text-[11px] ml-2 font-semibold">
                      ARIES.EXE / COMMAND INTERPRETER
                    </span>
                  </div>
                  <span className="text-[10px] text-sky-400 font-semibold">
                    ONLINE
                  </span>
                </div>

                {/* Terminal Scrolling Log Area */}
                <div className="p-4 space-y-2 text-slate-300 h-[280px] overflow-y-auto bg-slate-950/90 font-mono text-[11px] leading-relaxed">
                  {terminalLogs.map((log, index) => (
                    <div
                      key={index}
                      className={
                        log.startsWith('$')
                          ? 'text-sky-300 font-semibold'
                          : log.includes('ERR') || log.includes('failed')
                          ? 'text-red-400'
                          : 'text-slate-300 whitespace-pre-wrap'
                      }
                    >
                      {log}
                    </div>
                  ))}
                  <div ref={terminalBottomRef} />
                </div>

                {/* Interactive CLI Input Line */}
                <form
                  onSubmit={handleTerminalSubmit}
                  className="bg-slate-900/90 border-t border-slate-800 px-3 py-2 flex items-center gap-2"
                >
                  <span className="text-sky-400 font-bold">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type a command (e.g., 'profile', 'stack', 'ping', 'architecture')..."
                    className="flex-1 bg-transparent text-white text-xs placeholder-slate-500 focus:outline-none font-mono"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1 text-[11px] bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 rounded border border-sky-500/30 transition-colors"
                  >
                    Send
                  </button>
                </form>

                {/* Quick Command Action Buttons */}
                <div className="p-2.5 bg-slate-950 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="text-slate-500 mr-1">QUICK RUN:</span>
                  {['profile', 'stack', 'contact', 'topology', 'architecture', 'ping', 'help'].map((cmd) => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => executeCommand(cmd)}
                      className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 hover:text-sky-300 hover:bg-slate-800 border border-slate-800 transition-colors"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
