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
  ShieldCheck,
  Compass,
  Check,
  Play,
  RotateCcw,
  Radio,
  BookOpen
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { audioFx } from '../utils/audioFx';

interface HeroProps {
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenCommandPalette }) => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'probe' | 'terminal'>('philosophy');
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Interactive Ping Probe State
  const [pingRunning, setPingRunning] = useState<boolean>(false);
  const [pingResults, setPingResults] = useState<Array<{ host: string; rtt: number; status: 'ok' | 'loss' }>>([
    { host: 'Store POS Terminal (192.168.10.42)', rtt: 1.1, status: 'ok' },
    { host: 'Branch Gateway NAT (192.168.10.1)', rtt: 1.8, status: 'ok' },
    { host: 'Merchant Payment Host (203.0.113.84)', rtt: 14.2, status: 'ok' },
  ]);

  // Terminal state
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Aries Razak // Personal Technology Universe',
    'Type "help", "lab", "systems", "stack", or "philosophy" to explore.'
  ]);
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);

  // Synchronized Digital Clock (MYT · UTC+8)
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

  const runPingProbe = () => {
    audioFx.playCommand();
    setPingRunning(true);
    setTimeout(() => {
      setPingResults([
        { host: 'Store POS Terminal (192.168.10.42)', rtt: +(Math.random() * 0.8 + 0.8).toFixed(1), status: 'ok' },
        { host: 'Branch Gateway NAT (192.168.10.1)', rtt: +(Math.random() * 1.2 + 1.2).toFixed(1), status: 'ok' },
        { host: 'Merchant Payment Host (203.0.113.84)', rtt: +(Math.random() * 6.0 + 11.0).toFixed(1), status: 'ok' },
      ]);
      setPingRunning(false);
      audioFx.playSuccess();
    }, 900);
  };

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    audioFx.playCommand();

    let output = '';
    if (cleanCmd === 'profile' || cleanCmd === 'whoami') {
      output = `Aries Razak — ${PERSONAL_INFO.headline}\n"${PERSONAL_INFO.positioningStatement}"\nLocation: ${PERSONAL_INFO.location}\nAWS Certified Cloud Practitioner · UiTM CS & Math Graduate`;
    } else if (cleanCmd === 'lab') {
      output = 'Navigating to The Lab: Packet flight simulator, cache eviction visualizer, and UNIX permission matrix.';
      const el = document.querySelector('#lab');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (cleanCmd === 'systems') {
      output = 'Navigating to Systems: Retail POS pipelines, SaaS governance, and MVC software architectures.';
      const el = document.querySelector('#systems');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (cleanCmd === 'stack') {
      output = 'Production Daily Drivers:\n• Application: Xilnex Retail POS, Ingenico EDC Pinpads, DuitNow QR\n• SaaS & Identity: Lark Super Admin, Google Workspace, Microsoft 365\n• Networking: Layer 1-4 Cabling (T-568B), 802.1Q VLANs, Dual-WAN Gateways\n• Foundations: AWS Certified Cloud Practitioner, PHP Laravel, MySQL, Linux Shell';
    } else if (cleanCmd === 'philosophy') {
      output = '"Some projects come from production incidents. Others begin with a question I want to investigate under the hood. Understanding both the software code and physical network cable means no problem is a black box."';
    } else if (cleanCmd === 'help') {
      output = 'Available Commands:\n• profile    - View verified background\n• lab        - Jump directly to interactive computing lab\n• systems    - Inspect systems architecture pipeline\n• stack      - View verified daily driver tools\n• philosophy - Read core engineering mindset\n• ping       - Execute network latency probe\n• clear      - Clear console output';
    } else if (cleanCmd === 'ping') {
      output = 'PING branch-gw.internal (192.168.10.1): 56 data bytes\n64 bytes: icmp_seq=1 ttl=64 time=1.4 ms\n64 bytes: icmp_seq=2 ttl=64 time=1.2 ms\n--- 0% packet loss, RTT avg 1.3ms ---';
    } else if (cleanCmd === 'clear') {
      setTerminalLogs([]);
      return;
    } else {
      output = `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`;
    }

    setTerminalLogs((prev) => [...prev, `$ ${cmd}`, output]);
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
    <section id="top" className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background ambient radial lighting */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-sky-500/10 blur-[150px] pointer-events-none rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Introduction */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Location & Time Indicator */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-4 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-lg">
              <span className="text-sky-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                <span>ARIES RAZAK</span>
              </span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="text-slate-300">SELANGOR / KL</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-sky-400" />
                <span className="tabular-nums font-mono">{currentTime || '21:00:00'} MYT (UTC+8)</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 
              style={{ textWrap: 'balance' } as React.CSSProperties}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] font-bold text-white tracking-tight leading-[1.14] mb-5"
            >
              I keep business systems running. And I explore what happens beneath the interface.
            </h1>

            {/* Dual Identity Supporting Narrative */}
            <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed mb-4 max-w-xl">
              I'm <strong className="font-bold text-white tracking-wide">{PERSONAL_INFO.displayName}</strong>. By day, I support multi-site retail applications, enterprise SaaS, and IT infrastructure. By night, I investigate how computing works from code to network packet.
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8 max-w-xl">
              Whether diagnosing payment pinpad timeouts, terminating physical RJ45 cables, administering enterprise collaboration platforms, or tracing operating system syscalls, I like understanding where things break, why they fail, and how to engineer them better.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#lab"
                onClick={(e) => handleLinkClick(e, '#lab')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-all duration-150 shadow-lg shadow-sky-500/20 hover:-translate-y-0.5"
              >
                <Cpu className="w-4 h-4" />
                <span>Enter The Lab</span>
              </a>

              <a
                href="#experience"
                onClick={(e) => handleLinkClick(e, '#experience')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all duration-150 hover:-translate-y-0.5"
              >
                <span>Field Experience</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => {
                  audioFx.playClick(600);
                  onOpenCommandPalette();
                }}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-3 text-sm font-mono text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
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
                className="inline-flex items-center justify-center gap-1.5 px-3 py-3 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors rounded-lg"
              >
                <FileText className="w-4 h-4 text-sky-400" />
                <span>Resume</span>
              </button>
            </div>

            {/* Verified Foundation Badges */}
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
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>System Application Specialist (emart24)</span>
              </div>
            </div>

          </div>

          {/* Right Column: The Explorer's Interactive Workbench */}
          <div className="lg:col-span-6 w-full">
            
            {/* View Mode Switcher Header */}
            <div className="flex items-center justify-between mb-3 px-1 text-xs font-mono">
              <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    audioFx.playClick(500);
                    setActiveTab('philosophy');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors ${
                    activeTab === 'philosophy'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>The Mindset</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audioFx.playClick(500);
                    setActiveTab('probe');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors ${
                    activeTab === 'probe'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Live Probe</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audioFx.playClick(500);
                    setActiveTab('terminal');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors ${
                    activeTab === 'terminal'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <TerminalIcon className="w-3.5 h-3.5" />
                  <span>Interactive Shell</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-500 hidden sm:inline">
                Aries Razak // Space Console
              </span>
            </div>

            {/* Workbench Viewport Container */}
            <div className="bg-[#080D1A] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden min-h-[360px] flex flex-col justify-between">
              
              {/* TAB 1: THE MINDSET (Editorial Philosophy) */}
              {activeTab === 'philosophy' && (
                <div className="p-6 sm:p-7 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                    <span className="text-sky-400 font-semibold uppercase">HOW I APPROACH TECHNOLOGY</span>
                    <span>DUAL PERSPECTIVE</span>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <span className="font-mono text-sky-300 text-xs font-semibold block mb-1">
                        1. Understanding what happens beneath the interface
                      </span>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        When an application throws an error, I don't stop at closing the alert dialog. I trace whether the issue originates in the UI layer, network socket, database transaction lock, or physical patch cable.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <span className="font-mono text-emerald-300 text-xs font-semibold block mb-1">
                        2. Respecting both code logic and physical cabling
                      </span>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Having built modules in Laravel and crimped RJ45 connectors with a ratcheting tool, I know that digital systems depend as much on proper Layer-1 physical termination as they do on clean software architecture.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <span className="font-mono text-amber-300 text-xs font-semibold block mb-1">
                        3. Grounded in practice, energized by curiosity
                      </span>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Some projects come from high-pressure production incidents. Others begin with an intellectual question: "How does this packet actually travel through the NAT gateway?" Both matter.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: LIVE PROBE (Diagnostic Ping Simulator) */}
              {activeTab === 'probe' && (
                <div className="p-6 sm:p-7 space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                    <span className="text-sky-400 font-semibold uppercase">ICMP LATENCY PROBE</span>
                    <span>1-CLICK SIMULATOR</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Test round-trip time (RTT) and packet transit across the three key hops in a distributed retail store network:
                  </p>

                  <div className="space-y-3">
                    {pingResults.map((res, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-white">{res.host}</span>
                        </div>
                        <span className="text-emerald-400 font-bold">
                          {res.rtt} ms
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={runPingProbe}
                      disabled={pingRunning}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 rounded-lg text-xs font-mono transition-colors"
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>{pingRunning ? 'Probing Link...' : 'Dispatch Ping Probe'}</span>
                    </button>
                    <span className="text-[11px] font-mono text-slate-500">
                      0% packet loss · RTT avg 5.7ms
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 3: INTERACTIVE SHELL */}
              {activeTab === 'terminal' && (
                <div className="flex flex-col h-full font-mono text-xs">
                  {/* Console Title Bar */}
                  <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300 text-[11px] font-semibold">
                      ARIES.DEV / INTERACTIVE EXPLORER SHELL
                    </span>
                    <span className="text-[10px] text-sky-400">READY</span>
                  </div>

                  {/* Log Area */}
                  <div className="p-4 space-y-1.5 text-slate-300 h-[240px] overflow-y-auto bg-slate-950/90 text-[11px] leading-relaxed">
                    {terminalLogs.map((log, index) => (
                      <div
                        key={index}
                        className={
                          log.startsWith('$')
                            ? 'text-sky-300 font-semibold'
                            : 'text-slate-300 whitespace-pre-wrap'
                        }
                      >
                        {log}
                      </div>
                    ))}
                    <div ref={terminalBottomRef} />
                  </div>

                  {/* Input Form */}
                  <form
                    onSubmit={handleTerminalSubmit}
                    className="bg-slate-900/90 border-t border-slate-800 px-3 py-2 flex items-center gap-2"
                  >
                    <span className="text-sky-400 font-bold">$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="Type 'lab', 'systems', 'stack', 'philosophy', 'help'..."
                      className="flex-1 bg-transparent text-white text-xs placeholder-slate-500 focus:outline-none font-mono"
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1 text-[11px] bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 rounded border border-sky-500/30 transition-colors"
                    >
                      Run
                    </button>
                  </form>

                  {/* Quick Run Pills */}
                  <div className="p-2 bg-slate-950 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span className="text-slate-500 mr-1">QUICK:</span>
                    {['lab', 'systems', 'stack', 'philosophy', 'ping', 'help'].map((cmd) => (
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

              {/* Bottom Quick Context Bar */}
              <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>VERIFIED IT SPECIALIST</span>
                <span className="text-sky-400">EXPLORING BENEATH THE INTERFACE</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
