import React, { useRef, useEffect, useState } from 'react';
import { audioFx } from '../utils/audioFx';
import { Activity, ShieldCheck, Server, RefreshCw, Cpu, Layers } from 'lucide-react';

interface TopologyNode {
  id: string;
  name: string;
  label: string;
  x: number;
  y: number;
  ip: string;
  protocol: string;
  status: 'optimal' | 'transmitting' | 'inspecting';
  role: string;
  metrics: string;
}

interface Packet {
  fromNodeIndex: number;
  toNodeIndex: number;
  progress: number;
  speed: number;
  color: string;
}

export const NetworkTopologyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<TopologyNode | null>(null);
  const [pingLatency, setPingLatency] = useState<number>(14);
  const [isSimulatingTraffic, setIsSimulatingTraffic] = useState<boolean>(true);
  const [packetCount, setPacketCount] = useState<number>(1840);

  // Nodes positioned in relative percentages (0 to 1)
  const nodesRef = useRef<TopologyNode[]>([
    {
      id: 'hq-server',
      name: 'HQ Central Server',
      label: 'ERP & Master DB',
      x: 0.18,
      y: 0.28,
      ip: '10.10.1.15',
      protocol: 'TCP / 443 / 3306',
      status: 'optimal',
      role: 'Enterprise inventory sync & centralized pricing master',
      metrics: 'Uptime 99.98% · 12ms latency'
    },
    {
      id: 'switch-core',
      name: 'Store Managed Switch',
      label: 'Layer 2/3 Core',
      x: 0.50,
      y: 0.48,
      ip: '192.168.1.1',
      protocol: '802.1Q / DHCP / VLAN 20',
      status: 'optimal',
      role: 'VLAN segmentation, PoE access points & NVR isolation',
      metrics: '24-Port Gigabit · 0 CRC Errors'
    },
    {
      id: 'xilnex-pos',
      name: 'Xilnex POS Register',
      label: 'Store Terminal 01',
      x: 0.22,
      y: 0.76,
      ip: '192.168.1.25',
      protocol: 'HTTPS / SQL Express',
      status: 'optimal',
      role: 'Retail sales transaction engine, offline sync & receipt printer',
      metrics: 'Active Session · Queue: 0 Pending'
    },
    {
      id: 'edc-pinpad',
      name: 'EDC Payment Gateway',
      label: 'Card & QR Terminal',
      x: 0.78,
      y: 0.76,
      ip: '192.168.1.30',
      protocol: 'TLS 1.3 / Port 8443',
      status: 'optimal',
      role: 'Credit/debit settlement, DuitNow QR & bank host link',
      metrics: 'Handshake Verified · Response 210ms'
    },
    {
      id: 'lark-cloud',
      name: 'Lark SaaS Workspace',
      label: 'Super Admin Directory',
      x: 0.82,
      y: 0.28,
      ip: 'api.larksuite.com',
      protocol: 'OAuth 2.0 / REST API',
      status: 'optimal',
      role: 'Enterprise identity, departmental approval bots & Helpdesk ticketing',
      metrics: 'Super Admin Active · 2FA Enforced'
    },
    {
      id: 'aws-cloud',
      name: 'AWS Cloud Foundations',
      label: 'IAM & Cloud Infra',
      x: 0.50,
      y: 0.16,
      ip: 'aws.ap-southeast-1',
      protocol: 'IAM / S3 / EC2 VPC',
      status: 'optimal',
      role: 'Cloud practitioner foundations, automated backup & monitoring',
      metrics: 'CLF-C02 Certified · Multi-AZ'
    }
  ]);

  // Edges connecting node indices
  const connections = useRef<[number, number][]>([
    [0, 1], // HQ -> Switch
    [1, 2], // Switch -> POS
    [1, 3], // Switch -> EDC Pinpad
    [1, 4], // Switch -> Lark
    [0, 5], // HQ -> AWS
    [4, 5], // Lark -> AWS
    [2, 3]  // POS <-> EDC
  ]);

  const packetsRef = useRef<Packet[]>([]);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });

  useEffect(() => {
    // Generate initial packets
    const packets: Packet[] = [];
    connections.current.forEach(([from, to]) => {
      packets.push({
        fromNodeIndex: from,
        toNodeIndex: to,
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.006,
        color: from === 2 || to === 3 ? '#38bdf8' : '#34d399'
      });
      packets.push({
        fromNodeIndex: to,
        toNodeIndex: from,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.005,
        color: '#60a5fa'
      });
    });
    packetsRef.current = packets;

    // Default select first node for initial view
    setSelectedNode(nodesRef.current[1]); // Store Core Switch

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const render = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Subtle background grid lines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.45)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw connection lines
      connections.current.forEach(([fromIdx, toIdx]) => {
        const from = nodesRef.current[fromIdx];
        const to = nodesRef.current[toIdx];
        const x1 = from.x * w;
        const y1 = from.y * h;
        const x2 = to.x * w;
        const y2 = to.y * h;

        // Gradient connection conduit
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
        grad.addColorStop(1, 'rgba(52, 211, 153, 0.22)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Update and draw packets
      if (isSimulatingTraffic) {
        packetsRef.current.forEach((pkt) => {
          pkt.progress += pkt.speed;
          if (pkt.progress >= 1) {
            pkt.progress = 0;
          }

          const from = nodesRef.current[pkt.fromNodeIndex];
          const to = nodesRef.current[pkt.toNodeIndex];
          const currentX = from.x * w + (to.x * w - from.x * w) * pkt.progress;
          const currentY = from.y * h + (to.y * h - from.y * h) * pkt.progress;

          // Glowing packet head
          ctx.beginPath();
          ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
          ctx.fillStyle = pkt.color;
          ctx.shadowColor = pkt.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      // Draw nodes
      nodesRef.current.forEach((node) => {
        const nx = node.x * w;
        const ny = node.y * h;
        const isSelected = selectedNode?.id === node.id;

        // Distance to mouse for subtle interactive highlight
        const dist = Math.hypot(mousePosRef.current.x - nx, mousePosRef.current.y - ny);
        const isHovered = dist < 32;

        // Outer pulse circle
        ctx.beginPath();
        ctx.arc(nx, ny, isSelected ? 22 : 18, 0, Math.PI * 2);
        ctx.fillStyle = isSelected
          ? 'rgba(56, 189, 248, 0.18)'
          : isHovered
          ? 'rgba(56, 189, 248, 0.1)'
          : 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = isSelected
          ? '#38bdf8'
          : isHovered
          ? '#7dd3fc'
          : 'rgba(71, 85, 105, 0.6)';
        ctx.lineWidth = isSelected ? 2 : 1.5;
        ctx.fill();
        ctx.stroke();

        // Inner solid core
        ctx.beginPath();
        ctx.arc(nx, ny, 5, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#38bdf8' : '#34d399';
        ctx.shadowColor = isSelected ? '#38bdf8' : '#34d399';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node Title Tag (Monospace label below node)
        ctx.font = '500 11px JetBrains Mono, monospace';
        ctx.fillStyle = isSelected ? '#f8fafc' : '#94a3b8';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, nx, ny + 28);

        ctx.font = '400 9px JetBrains Mono, monospace';
        ctx.fillStyle = isSelected ? '#38bdf8' : '#64748b';
        ctx.fillText(node.ip, nx, ny + 40);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Increment packet telemetry gently
    const interval = setInterval(() => {
      setPacketCount((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 1200);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, [isSimulatingTraffic, selectedNode]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Check hit on any node
    let hitFound = false;
    nodesRef.current.forEach((node) => {
      const nx = node.x * rect.width;
      const ny = node.y * rect.height;
      const dist = Math.hypot(clickX - nx, clickY - ny);
      if (dist < 32) {
        setSelectedNode(node);
        hitFound = true;
        audioFx.playClick(600);
      }
    });

    if (!hitFound) {
      // Audio click
      audioFx.playClick(400);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const triggerPingTest = () => {
    audioFx.playCommand();
    setPingLatency(Math.floor(10 + Math.random() * 8));
    setIsSimulatingTraffic(false);
    setTimeout(() => {
      setIsSimulatingTraffic(true);
      audioFx.playSuccess();
    }, 400);
  };

  return (
    <div className="bg-[#080D1A] border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
      {/* Top HUD Control Strip */}
      <div className="bg-slate-900/90 border-b border-slate-800/90 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-[11px] font-semibold text-sky-400 tracking-wider">
            SYSTEM TOPOLOGY // LIVE CONDUIT
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            PACKETS: <span className="text-emerald-400 font-mono tabular-nums">{packetCount}</span>
          </span>
          <span className="text-slate-400 text-[11px]">
            LATENCY: <span className="text-sky-300 font-mono tabular-nums">{pingLatency}ms</span>
          </span>

          <button
            type="button"
            onClick={triggerPingTest}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 rounded transition-colors"
          >
            <RefreshCw className="w-3 h-3 animate-spin-once" />
            <span>Ping Mesh</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div
        ref={containerRef}
        className="relative w-full h-[320px] sm:h-[360px] cursor-crosshair bg-gradient-to-b from-[#080D1A] to-[#050811]"
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          className="w-full h-full block"
        />

        {/* Ambient Overlay Hint */}
        <div className="absolute bottom-2.5 left-3 pointer-events-none text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>Click any topology node to inspect diagnostic parameters</span>
        </div>
      </div>

      {/* Node Inspector Bottom HUD Drawer */}
      {selectedNode && (
        <div className="bg-[#050812] border-t border-slate-800 p-4 font-mono text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-sky-400" />
              <span className="font-semibold text-white tracking-wide">{selectedNode.name}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">{selectedNode.label}</span>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <span className="text-slate-400">IP: <span className="text-emerald-400">{selectedNode.ip}</span></span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">PROTO: <span className="text-sky-300">{selectedNode.protocol}</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-slate-300 text-[11px]">
            <div className="md:col-span-8">
              <span className="text-slate-500 uppercase tracking-wider block text-[10px] mb-0.5">Operational Context:</span>
              <p className="text-slate-200 leading-relaxed font-sans">{selectedNode.role}</p>
            </div>
            <div className="md:col-span-4 bg-slate-900/60 p-2 rounded border border-slate-800 flex flex-col justify-center">
              <span className="text-slate-500 uppercase tracking-wider block text-[10px] mb-0.5">Live Telemetry:</span>
              <span className="text-sky-300 font-mono text-[11px]">{selectedNode.metrics}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
