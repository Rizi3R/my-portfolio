import React, { useState } from 'react';
import { 
  Server, 
  Wifi, 
  CreditCard, 
  ShieldCheck, 
  Cloud, 
  ArrowRight, 
  Cpu, 
  HardDrive,
  Activity,
  Layers
} from 'lucide-react';
import { audioFx } from '../utils/audioFx';

interface ArchNode {
  id: string;
  label: string;
  sublabel: string;
  protocol: string;
  status: 'OPTIMAL' | 'ENCRYPTED' | 'STANDBY';
  telemetry: string;
  details: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ArchitectureMatrix: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('pos');

  const nodes: ArchNode[] = [
    {
      id: 'stores',
      label: '48+ Nationwide Stores',
      sublabel: 'Retail Outlets & Kiosks',
      protocol: 'Layer 1-2 Ethernet / WiFi',
      status: 'OPTIMAL',
      telemetry: '99.8% Online · Latency < 15ms',
      details: 'On-site physical retail POS terminals, EDC pinpads, network thermal receipt printers, and IP CCTV cameras commissioned across nationwide outlets.',
      icon: Layers,
    },
    {
      id: 'switch',
      label: 'Store Gateway & AP',
      sublabel: 'Managed Switch & Dual-WAN',
      protocol: '802.1Q VLAN / DHCP / 4G Backup',
      status: 'OPTIMAL',
      telemetry: 'Auto-Failover Active (WAN1/WAN2)',
      details: 'Configured VLAN segregation separating POS transaction traffic from public store guest WiFi. Automatic failover to secondary 4G cellular APN on broadband drops.',
      icon: Wifi,
    },
    {
      id: 'tunnel',
      label: 'Encrypted Site-to-Site Tunnel',
      sublabel: 'Secure VPN Gateway',
      protocol: 'IPsec / AES-256 / WireGuard',
      status: 'ENCRYPTED',
      telemetry: '0 Packet Drops · TLS 1.3 Handshake',
      details: 'Enterprise encrypted tunnel routing branch transactions and inventory updates securely to corporate headquarters and cloud hosts.',
      icon: ShieldCheck,
    },
    {
      id: 'pos',
      label: 'Cloud POS Core (Xilnex)',
      sublabel: 'Central Transaction Engine',
      protocol: 'REST API / WebSockets / MySQL',
      status: 'OPTIMAL',
      telemetry: 'Sync Interval: Real-Time · DB RPO < 1s',
      details: 'Central point-of-sale server handling SKU catalogs, dynamic promotional rules, stock audits, daily cash drawer reconciliation, and live inventory sync.',
      icon: Server,
    },
    {
      id: 'payment',
      label: 'Bank Acquirer Gateway',
      sublabel: 'EDC & DuitNow QR Host',
      protocol: 'ISO 8583 / HTTPS / Port 8443',
      status: 'OPTIMAL',
      telemetry: 'Auth Speed: 0.8s avg · SLA 99.95%',
      details: 'Bank payment clearing house authorizing credit/debit card pinpads and DuitNow QR settlements. Monitored for 504 host timeouts and network retry spikes.',
      icon: CreditCard,
    },
  ];

  const currentNode = nodes.find(n => n.id === selectedNodeId) || nodes[3];

  return (
    <div className="bg-[#090D18] border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
      
      {/* Title Bar */}
      <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-slate-200 font-semibold text-[11px] tracking-wide">
            ENTERPRISE ARCHITECTURE PIPELINE
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-semibold">ALL SYSTEMS NOMINAL</span>
        </div>
      </div>

      {/* Interactive Horizontal Pipeline Visualizer */}
      <div className="p-4 bg-slate-950/70 border-b border-slate-800/80 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[520px] gap-2">
          {nodes.map((node, index) => {
            const isSelected = selectedNodeId === node.id;
            const Icon = node.icon;

            return (
              <React.Fragment key={node.id}>
                <button
                  type="button"
                  onClick={() => {
                    audioFx.playClick(700);
                    setSelectedNodeId(node.id);
                  }}
                  className={`flex-1 p-2.5 rounded-lg border text-left transition-all relative flex flex-col items-center text-center ${
                    isSelected
                      ? 'bg-sky-500/15 border-sky-400 text-sky-200 shadow-md shadow-sky-500/10 ring-1 ring-sky-400/40'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center mb-1.5 ${
                    isSelected ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-800/60 text-slate-400'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-bold truncate w-full">{node.label}</span>
                  <span className="text-[9px] text-slate-500 truncate w-full">{node.protocol.split('/')[0]}</span>
                </button>

                {index < nodes.length - 1 && (
                  <div className="flex items-center justify-center px-0.5 text-sky-500/40" aria-hidden="true">
                    <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Detailed Node Inspector Pane */}
      <div className="p-4.5 bg-slate-950/90 font-mono space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">LAYER INSPECTOR:</span>
            <span className="text-white font-bold">{currentNode.label}</span>
          </div>
          <span className="text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/50 text-[10px]">
            {currentNode.status}
          </span>
        </div>

        <p className="text-xs font-sans text-slate-300 leading-relaxed">
          {currentNode.details}
        </p>

        <div className="grid grid-cols-2 gap-2 pt-2 text-[10px]">
          <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
            <span className="text-slate-500 block mb-0.5">PROTOCOL & STANDARD</span>
            <span className="text-sky-300 font-semibold">{currentNode.protocol}</span>
          </div>
          <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
            <span className="text-slate-500 block mb-0.5">LIVE TELEMETRY</span>
            <span className="text-slate-200">{currentNode.telemetry}</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
        <span>Click any stage in the flow above to inspect infrastructure telemetry</span>
        <span className="text-sky-400 font-semibold">emart24 Multi-Site Architecture</span>
      </div>

    </div>
  );
};
