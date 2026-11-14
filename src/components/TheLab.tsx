import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Network, 
  Terminal, 
  Database, 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  ArrowRight, 
  Server, 
  Wifi, 
  Lock, 
  Check, 
  Layers,
  Sparkles,
  Info,
  Clock,
  Radio,
  FileCode
} from 'lucide-react';
import { audioFx } from '../utils/audioFx';
import { TiltCard } from './TiltCard';

/* =========================================================================
   WORKBENCH 1: NETWORK PACKET FLIGHT SIMULATOR DATA & TYPES
   ========================================================================= */

interface PacketHop {
  nodeId: string;
  label: string;
  layer: 'Layer 2 (Data Link)' | 'Layer 3 (Network)' | 'Layer 4 (Transport)' | 'Layer 7 (Application)';
  action: string;
  details: string;
  latencyMs: number;
}

interface PacketPreset {
  id: string;
  name: string;
  protocol: 'HTTP/2' | 'DNS' | 'TCP' | 'ISO-8583' | 'ICMP';
  port: string;
  payloadSummary: string;
  description: string;
  hops: PacketHop[];
}

const PACKET_PRESETS: PacketPreset[] = [
  {
    id: 'http-catalog',
    name: 'HTTPS API Request (Store Catalog Sync)',
    protocol: 'HTTP/2',
    port: 'TCP 443',
    payloadSummary: 'GET /api/v2/catalog/retail-sku?branch=18 HTTP/2',
    description: 'Simulates an encrypted web API request from a store checkout terminal to the central cloud catalog service.',
    hops: [
      {
        nodeId: 'client',
        label: 'Client POS Terminal (192.168.10.42)',
        layer: 'Layer 7 (Application)',
        action: 'Formulates TLS ClientHello & serialized JSON payload',
        details: 'Store terminal initiates connection via local TCP socket on ephemeral port 49152.',
        latencyMs: 0.1
      },
      {
        nodeId: 'switch',
        label: 'Managed Store Switch (VLAN 10)',
        layer: 'Layer 2 (Data Link)',
        action: '802.1Q Ethernet Frame forwarding based on MAC address table',
        details: 'Switch inspects destination MAC, tags packet with VLAN 10 (POS Network), forwards to trunk port.',
        latencyMs: 0.4
      },
      {
        nodeId: 'gateway',
        label: 'Store Edge Gateway & NAT Router (192.168.10.1)',
        layer: 'Layer 3 (Network)',
        action: 'Network Address Translation (PAT) & Routing',
        details: 'Rewrites private source IP 192.168.10.42:49152 to documentation WAN IP 198.51.100.22:51022. Selects primary broadband route.',
        latencyMs: 1.2
      },
      {
        nodeId: 'proxy',
        label: 'Cloud Edge WAF & Reverse Proxy (203.0.113.84)',
        layer: 'Layer 7 (Application)',
        action: 'TLS 1.3 Termination, Rate Limiting & SSL Decryption',
        details: 'Terminates TLS session, inspects request headers, validates API token, forwards to internal microservice.',
        latencyMs: 12.8
      },
      {
        nodeId: 'backend',
        label: 'Application Server Cluster (10.0.4.15)',
        layer: 'Layer 7 (Application)',
        action: 'PHP Laravel Kernel & Route Dispatch',
        details: 'Resolves CatalogController@getSKUs, verifies store branch authorization, queries database read-replica.',
        latencyMs: 16.2
      },
      {
        nodeId: 'database',
        label: 'Relational Database Engine (MySQL 8.0)',
        layer: 'Layer 7 (Application)',
        action: 'InnoDB Index Scan & Prepared Query Execution',
        details: 'SELECT * FROM tbl_products WHERE branch_id = 18 AND is_active = 1; Returns 124 record rows in 2.1ms.',
        latencyMs: 18.5
      },
      {
        nodeId: 'client',
        label: 'Client POS Terminal (Received 200 OK)',
        layer: 'Layer 7 (Application)',
        action: 'Response Rendered on Checkout Register Screen',
        details: 'HTTP/2 200 OK received with 14.8KB payload. Catalog cached locally in memory.',
        latencyMs: 24.3
      }
    ]
  },
  {
    id: 'dns-lookup',
    name: 'DNS Query (Demo Domain Resolution)',
    protocol: 'DNS',
    port: 'UDP 53',
    payloadSummary: 'Standard Query 0x3f2a A catalog.retail-demo.example',
    description: 'Simulates recursive DNS resolution translating a human-friendly domain into a destination IP address.',
    hops: [
      {
        nodeId: 'client',
        label: 'Client Workstation (192.168.10.15)',
        layer: 'Layer 7 (Application)',
        action: 'Queries local resolver stub',
        details: 'Checks OS /etc/hosts cache; misses. Dispatches UDP packet to configured primary DNS server.',
        latencyMs: 0.1
      },
      {
        nodeId: 'switch',
        label: 'Managed Store Switch',
        layer: 'Layer 2 (Data Link)',
        action: 'Layer 2 Frame Forwarding',
        details: 'Forwarding UDP datagram frame to default gateway uplink.',
        latencyMs: 0.3
      },
      {
        nodeId: 'gateway',
        label: 'Gateway Local DNS Proxy',
        layer: 'Layer 3 (Network)',
        action: 'Forwarding to Public Recursive Resolver',
        details: 'NAT translation applied. Outgoing packet routed to Cloudflare/Google DNS resolver (1.1.1.1).',
        latencyMs: 1.1
      },
      {
        nodeId: 'dns',
        label: 'Recursive DNS Resolver (1.1.1.1)',
        layer: 'Layer 7 (Application)',
        action: 'Root Nameserver & Authoritative Zone Lookup',
        details: 'Authoritative zone hit: catalog.retail-demo.example resolves to A-record 203.0.113.84 with TTL 300s.',
        latencyMs: 7.4
      },
      {
        nodeId: 'client',
        label: 'Client Workstation',
        layer: 'Layer 7 (Application)',
        action: 'IP Address Cached in OS Resolver Buffer',
        details: 'Client caches IP 203.0.113.84. Ready to initiate TCP handshake.',
        latencyMs: 9.8
      }
    ]
  },
  {
    id: 'tcp-handshake',
    name: 'TCP 3-Way Handshake (Connection Establishment)',
    protocol: 'TCP',
    port: 'TCP 443',
    payloadSummary: '[SYN] -> [SYN, ACK] -> [ACK] Seq=0, Win=65535',
    description: 'Simulates the reliable 3-step TCP synchronization protocol required before any HTTP/TLS data can be exchanged.',
    hops: [
      {
        nodeId: 'client',
        label: 'Client Station',
        layer: 'Layer 4 (Transport)',
        action: 'Step 1: Dispatches TCP SYN',
        details: 'Client sets SYN flag, chooses Initial Sequence Number (ISN=1001), advertises Window Size 65535.',
        latencyMs: 0.1
      },
      {
        nodeId: 'gateway',
        label: 'Branch Gateway NAT',
        layer: 'Layer 3 (Network)',
        action: 'Stateful Connection Tracking (conntrack)',
        details: 'Creates entry in firewall connection table: SYN_SENT state recorded.',
        latencyMs: 1.0
      },
      {
        nodeId: 'proxy',
        label: 'Server Endpoint (Reverse Proxy)',
        layer: 'Layer 4 (Transport)',
        action: 'Step 2: Returns TCP SYN-ACK',
        details: 'Server receives SYN, allocates socket buffers, sets ISN=5001, ACKs client Seq+1 (1002).',
        latencyMs: 8.2
      },
      {
        nodeId: 'client',
        label: 'Client Station',
        layer: 'Layer 4 (Transport)',
        action: 'Step 3: Dispatches TCP ACK',
        details: 'Client ACKs server sequence (5002). Connection state transitions to ESTABLISHED. Full-duplex stream ready.',
        latencyMs: 14.6
      }
    ]
  },
  {
    id: 'pos-payment',
    name: 'POS Payment Authorization (ISO 8583)',
    protocol: 'ISO-8583',
    port: 'TCP 8443',
    payloadSummary: 'MTI 0100: Auth Request [PAN: **** **** **** 4821, Amount: RM 24.50]',
    description: 'Simulates the financial transaction protocol used when a customer taps a card or scans a QR code on an EDC pinpad.',
    hops: [
      {
        nodeId: 'client',
        label: 'Ingenico EDC Payment Pinpad (Store Counter)',
        layer: 'Layer 7 (Application)',
        action: 'EMV Chip Read & Pinpad Cryptogram Generation',
        details: 'Generates ISO 8583 MTI 0100 message with encrypted PIN block and dynamic terminal transaction counter.',
        latencyMs: 0.2
      },
      {
        nodeId: 'switch',
        label: 'Isolated Retail POS Switch (VLAN 20)',
        layer: 'Layer 2 (Data Link)',
        action: 'PCI-DSS Isolated Network Transport',
        details: 'Traffic physically segregated from in-store guest Wi-Fi and CCTV traffic via dedicated 802.1Q VLAN.',
        latencyMs: 0.5
      },
      {
        nodeId: 'gateway',
        label: 'Store Router (Dual-WAN Tunnel)',
        layer: 'Layer 3 (Network)',
        action: 'IPSec VPN Tunnel Egress to Bank Gateway',
        details: 'Encapsulates payload into encrypted tunnel directed to merchant bank acquirer gateway IP.',
        latencyMs: 1.8
      },
      {
        nodeId: 'proxy',
        label: 'Merchant Acquirer Payment Switch',
        layer: 'Layer 7 (Application)',
        action: 'Card Scheme Clearing & Issuer Bank Handshake',
        details: 'Routes to card network (Visa/Mastercard/PayNet DuitNow). Validates available credit line, holds funds.',
        latencyMs: 240.0
      },
      {
        nodeId: 'client',
        label: 'Ingenico EDC Pinpad (Received MTI 0110)',
        layer: 'Layer 7 (Application)',
        action: 'Response Code 00: Transaction Approved',
        details: 'Approval code #849201 generated. Thermal receipt printer prints customer slip. POS register drawer triggers.',
        latencyMs: 265.4
      }
    ]
  }
];

/* Node layout positions on a 100x100 virtual canvas */
interface CanvasNode {
  id: string;
  name: string;
  category: string;
  x: number; // 0-100%
  y: number; // 0-100%
  icon: React.ComponentType<{ className?: string }>;
}

const NETWORK_NODES: CanvasNode[] = [
  { id: 'client', name: 'Terminal / Client', category: 'Endpoint Station', x: 10, y: 50, icon: Terminal },
  { id: 'switch', name: 'Managed Switch', category: 'VLAN 10 / L2', x: 26, y: 25, icon: Server },
  { id: 'gateway', name: 'Dual-WAN Gateway', category: 'NAT Router / L3', x: 44, y: 50, icon: Wifi },
  { id: 'dns', name: 'DNS Resolver', category: 'Recursive 1.1.1.1', x: 44, y: 82, icon: Radio },
  { id: 'proxy', name: 'Edge WAF / Proxy', category: 'Cloud Ingress / L7', x: 65, y: 35, icon: Lock },
  { id: 'backend', name: 'App Cluster', category: 'Laravel API / L7', x: 84, y: 35, icon: Cpu },
  { id: 'database', name: 'Database Engine', category: 'MySQL 8.0 Storage', x: 84, y: 72, icon: Database },
];

/* =========================================================================
   WORKBENCH 2: CACHE EVICTION VISUALIZER DATA & LOGIC
   ========================================================================= */

interface CacheItem {
  key: string;
  value: string;
  accessCount: number;
  lastAccessCycle: number;
}

/* =========================================================================
   WORKBENCH 3: UNIX PERMISSIONS BITMASK MATRIX DATA
   ========================================================================= */

interface PermissionState {
  owner: { r: boolean; w: boolean; x: boolean };
  group: { r: boolean; w: boolean; x: boolean };
  others: { r: boolean; w: boolean; x: boolean };
}

/* =========================================================================
   MAIN COMPONENT
   ========================================================================= */

export const TheLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'network' | 'cache' | 'permissions'>('network');

  /* ------------------- Workbench 1 State (Network Tracer) ------------------- */
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [currentHopIndex, setCurrentHopIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1); // 1x or 2x
  const activePreset = PACKET_PRESETS[selectedPresetIndex];
  const activeHop = activePreset.hops[currentHopIndex];

  // Auto-play packet animation timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      const intervalMs = (playSpeed === 1 ? 1400 : 700);
      timer = setTimeout(() => {
        if (currentHopIndex < activePreset.hops.length - 1) {
          setCurrentHopIndex((prev) => prev + 1);
          audioFx.playPacketHop();
        } else {
          setIsPlaying(false);
          audioFx.playSuccess();
        }
      }, intervalMs);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentHopIndex, activePreset.hops.length, playSpeed]);

  const handleSelectPreset = (idx: number) => {
    audioFx.playClick(500);
    setSelectedPresetIndex(idx);
    setCurrentHopIndex(0);
    setIsPlaying(false);
  };

  const handleDispatch = () => {
    audioFx.playCommand();
    setCurrentHopIndex(0);
    setIsPlaying(true);
  };

  const handleStepNext = () => {
    audioFx.playPacketHop();
    setIsPlaying(false);
    if (currentHopIndex < activePreset.hops.length - 1) {
      setCurrentHopIndex((prev) => prev + 1);
    } else {
      setCurrentHopIndex(0);
    }
  };

  const handleResetSim = () => {
    audioFx.playClick(400);
    setIsPlaying(false);
    setCurrentHopIndex(0);
  };

  /* ------------------- Workbench 2 State (Cache Eviction) ------------------- */
  const CACHE_CAPACITY = 4;
  const [cachePolicy, setCachePolicy] = useState<'LRU' | 'FIFO'>('LRU');
  const [cacheItems, setCacheItems] = useState<CacheItem[]>([
    { key: 'SKU_1001', value: 'Milk 1L (emart24)', accessCount: 3, lastAccessCycle: 1 },
    { key: 'USER_882', value: 'Cashier Session #4', accessCount: 1, lastAccessCycle: 2 },
    { key: 'TOKEN_AUTH', value: 'JWT Bearer Key', accessCount: 4, lastAccessCycle: 3 },
  ]);
  const [cycleCounter, setCycleCounter] = useState<number>(4);
  const [cacheStats, setCacheStats] = useState({ hits: 5, misses: 3, total: 8 });
  const [cacheLogs, setCacheLogs] = useState<string[]>([
    'Cache initialized with 3 items (Capacity: 4). Policy: LRU.'
  ]);
  const [customKeyInput, setCustomKeyInput] = useState<string>('');

  const accessKey = (keyName: string, keyValue?: string) => {
    audioFx.playClick(500);
    const newCycle = cycleCounter + 1;
    setCycleCounter(newCycle);

    const existingIndex = cacheItems.findIndex((item) => item.key === keyName);

    if (existingIndex !== -1) {
      // CACHE HIT!
      audioFx.playSuccess();
      const updated = [...cacheItems];
      updated[existingIndex].accessCount += 1;
      updated[existingIndex].lastAccessCycle = newCycle;

      // In LRU, hit items move to the most-recently-used position
      if (cachePolicy === 'LRU') {
        const item = updated.splice(existingIndex, 1)[0];
        updated.push(item);
      }

      setCacheItems(updated);
      setCacheStats((prev) => ({
        ...prev,
        hits: prev.hits + 1,
        total: prev.total + 1
      }));
      setCacheLogs((prev) => [
        `[CYCLE ${newCycle}] HIT: Key "${keyName}" found in cache. Updated access metadata.`,
        ...prev.slice(0, 9)
      ]);
    } else {
      // CACHE MISS!
      audioFx.playAlert();
      let updated = [...cacheItems];
      let logMsg = `[CYCLE ${newCycle}] MISS: Key "${keyName}" not present in cache.`;

      if (updated.length >= CACHE_CAPACITY) {
        // Must evict an item!
        let evictedItem: CacheItem;
        if (cachePolicy === 'LRU') {
          // Evict item with lowest lastAccessCycle (Least Recently Used)
          let minIndex = 0;
          for (let i = 1; i < updated.length; i++) {
            if (updated[i].lastAccessCycle < updated[minIndex].lastAccessCycle) {
              minIndex = i;
            }
          }
          evictedItem = updated.splice(minIndex, 1)[0];
          logMsg += ` Evicted "${evictedItem.key}" (Least Recently Used: cycle ${evictedItem.lastAccessCycle}).`;
        } else {
          // FIFO: Evict first inserted (index 0)
          evictedItem = updated.shift()!;
          logMsg += ` Evicted "${evictedItem.key}" (First In First Out order).`;
        }
      }

      const newItem: CacheItem = {
        key: keyName,
        value: keyValue || `Data payload for ${keyName}`,
        accessCount: 1,
        lastAccessCycle: newCycle
      };
      updated.push(newItem);

      setCacheItems(updated);
      setCacheStats((prev) => ({
        ...prev,
        misses: prev.misses + 1,
        total: prev.total + 1
      }));
      setCacheLogs((prev) => [logMsg, ...prev.slice(0, 9)]);
    }
  };

  const handleResetCache = () => {
    audioFx.playClick(400);
    setCacheItems([
      { key: 'SKU_1001', value: 'Milk 1L (emart24)', accessCount: 1, lastAccessCycle: 1 },
      { key: 'USER_882', value: 'Cashier Session #4', accessCount: 1, lastAccessCycle: 2 },
    ]);
    setCycleCounter(3);
    setCacheStats({ hits: 0, misses: 0, total: 0 });
    setCacheLogs(['Cache reset to fresh state. Capacity 4.']);
  };

  /* ------------------- Workbench 3 State (Unix Permissions) ------------------- */
  const [permissions, setPermissions] = useState<PermissionState>({
    owner: { r: true, w: true, x: true },
    group: { r: true, w: false, x: true },
    others: { r: true, w: false, x: true }
  });

  const togglePerm = (category: 'owner' | 'group' | 'others', bit: 'r' | 'w' | 'x') => {
    audioFx.playClick(600);
    setPermissions((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [bit]: !prev[category][bit]
      }
    }));
  };

  const calcOctalDigit = (p: { r: boolean; w: boolean; x: boolean }) => {
    return (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);
  };

  const octalOwner = calcOctalDigit(permissions.owner);
  const octalGroup = calcOctalDigit(permissions.group);
  const octalOthers = calcOctalDigit(permissions.others);
  const octalString = `0${octalOwner}${octalGroup}${octalOthers}`;

  const symbolicString = `-${permissions.owner.r ? 'r' : '-'}${permissions.owner.w ? 'w' : '-'}${permissions.owner.x ? 'x' : '-'}${permissions.group.r ? 'r' : '-'}${permissions.group.w ? 'w' : '-'}${permissions.group.x ? 'x' : '-'}${permissions.others.r ? 'r' : '-'}${permissions.others.w ? 'w' : '-'}${permissions.others.x ? 'x' : '-'}`;

  const binaryString = `${permissions.owner.r ? '1' : '0'}${permissions.owner.w ? '1' : '0'}${permissions.owner.x ? '1' : '0'} ${permissions.group.r ? '1' : '0'}${permissions.group.w ? '1' : '0'}${permissions.group.x ? '1' : '0'} ${permissions.others.r ? '1' : '0'}${permissions.others.w ? '1' : '0'}${permissions.others.x ? '1' : '0'}`;

  const applyPreset = (ownerVal: number, groupVal: number, othersVal: number) => {
    audioFx.playCommand();
    const decode = (val: number) => ({
      r: (val & 4) !== 0,
      w: (val & 2) !== 0,
      x: (val & 1) !== 0
    });
    setPermissions({
      owner: decode(ownerVal),
      group: decode(groupVal),
      others: decode(othersVal)
    });
  };

  return (
    <section id="lab" className="py-10 lg:py-16 relative bg-[#1B1B1D] border-y border-[#323238]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#B0E0E6] uppercase mb-3">
              <span className="px-2 py-0.5 rounded bg-[#DC343B]/20 text-[#DC343B] border border-[#DC343B]/40 text-[11px] font-bold">
                [SIMULATION]
              </span>
              <Cpu className="w-4 h-4 text-[#B0E0E6]" aria-hidden="true" />
              <span>THE PERSONAL TECHNOLOGY LAB</span>
              <span aria-hidden="true" className="text-[#4B5563]">·</span>
              <span className="text-[#9CA3AF]">BROWSER-NATIVE SANDBOX</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug mb-3">
              Interactive Computing Experiments & Simulations
            </h2>
            <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed font-sans mb-4">
              Explore what happens beneath the interface. Step into this client-side workbench to
              inspect OSI Layer 2–7 packet hops, test cache eviction algorithms, and calculate UNIX
              permission bitmasks in real time.
            </p>

            {/* Persistent Educational Simulation Disclaimer */}
            <div className="p-3.5 rounded-xl bg-[#222226] border border-[#323238] text-xs font-mono space-y-1.5 mb-6 text-[#D1D5DB]">
              <div className="flex items-start gap-2">
                <span className="text-[#B0E0E6] font-bold shrink-0">MODELS:</span>
                <span>
                  Deterministic OSI Layer 2–7 packet hops, RFC 793 TCP handshake flags, in-memory
                  FIFO & LRU cache eviction cycles, and UNIX octal permission bitmasks.
                </span>
              </div>
              <div className="flex items-start gap-2 pt-1.5 border-t border-[#323238]">
                <span className="text-[#DC343B] font-bold shrink-0">DOES NOT MODEL:</span>
                <span>
                  Live network sniffing, real server transactions, or real-time payment gateway
                  clearance. All data is illustrative and generated locally.
                </span>
              </div>
            </div>
          </div>

          {/* Workbench Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#222226] border border-[#323238] rounded-lg self-start md:self-auto overflow-x-auto max-w-full font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                audioFx.playClick(500);
                setActiveTab('network');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'network'
                  ? 'bg-[#1B1B1D] text-[#B0E0E6] border border-[#B0E0E6]/50 font-bold'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-[#B0E0E6]" aria-hidden="true" />
              <span>01. Packet Flight</span>
            </button>

            <button
              type="button"
              onClick={() => {
                audioFx.playClick(500);
                setActiveTab('cache');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'cache'
                  ? 'bg-[#1B1B1D] text-[#B0E0E6] border border-[#B0E0E6]/50 font-bold'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-[#B0E0E6]" aria-hidden="true" />
              <span>02. Cache (LRU / FIFO)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                audioFx.playClick(500);
                setActiveTab('permissions');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'permissions'
                  ? 'bg-[#1B1B1D] text-[#B0E0E6] border border-[#B0E0E6]/50 font-bold'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-[#DC343B]" aria-hidden="true" />
              <span>03. UNIX Permissions</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
           VIEW 1: NETWORK PACKET FLIGHT SIMULATOR
           ========================================================================= */}
        {activeTab === 'network' && (
          <div className="space-y-6">
            {/* Protocol Preset Selector */}
            <div className="flex flex-wrap items-center gap-2 bg-[#222226] p-2.5 rounded-xl border border-[#323238]">
              <span className="text-xs font-mono text-[#9CA3AF] px-2 uppercase tracking-wider">
                SELECT PROTOCOL:
              </span>
              {PACKET_PRESETS.map((preset, idx) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(idx)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
                    selectedPresetIndex === idx
                      ? 'bg-[#1B1B1D] text-[#B0E0E6] border border-[#B0E0E6]/60 font-medium'
                      : 'text-[#9CA3AF] hover:text-white hover:bg-[#2B2B30]'
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#DC343B]">[{preset.protocol}]</span>
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>

            {/* Interactive Simulation Arena */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 8 Cols: Visual Network Canvas */}
              <div className="lg:col-span-8 bg-[#222226] border border-[#323238] rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#323238] text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B0E0E6]" aria-hidden="true" />
                    <span className="text-white font-semibold">{activePreset.name}</span>
                    <span className="text-[#4B5563]">·</span>
                    <span className="text-[#B0E0E6] font-mono">{activePreset.port}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#9CA3AF] text-[11px]">
                    <span>
                      HOP {currentHopIndex + 1} OF {activePreset.hops.length}
                    </span>
                  </div>
                </div>

                {/* Network Nodes Coordinate Canvas */}
                <div className="relative h-[320px] sm:h-[360px] w-full bg-[#151517] border border-[#323238] rounded-xl overflow-hidden p-4">
                  <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="10%" y1="50%" x2="26%" y2="25%" stroke="#323238" strokeWidth="2" strokeDasharray="3 3" />
                    <line x1="26%" y1="25%" x2="44%" y2="50%" stroke="#323238" strokeWidth="2" />
                    <line x1="44%" y1="50%" x2="44%" y2="82%" stroke="#323238" strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="44%" y1="50%" x2="65%" y2="35%" stroke="#323238" strokeWidth="2" />
                    <line x1="65%" y1="35%" x2="84%" y2="35%" stroke="#323238" strokeWidth="2" />
                    <line x1="84%" y1="35%" x2="84%" y2="72%" stroke="#323238" strokeWidth="2" />
                  </svg>

                  {NETWORK_NODES.map((node) => {
                    const isCurrent = activeHop?.nodeId === node.id;
                    const NodeIcon = node.icon;

                    return (
                      <div
                        key={node.id}
                        style={{
                          left: `${node.x}%`,
                          top: `${node.y}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        className={`absolute flex flex-col items-center text-center transition-all duration-300 z-10 ${
                          isCurrent ? 'scale-110' : 'opacity-85'
                        }`}
                      >
                        <div
                          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border shadow-lg transition-all ${
                            isCurrent
                              ? 'bg-[#DC343B]/20 border-[#DC343B] text-white ring-4 ring-[#DC343B]/20'
                              : 'bg-[#1B1B1D] border-[#323238] text-[#B0E0E6]'
                          }`}
                        >
                          <NodeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-[11px] font-semibold text-white mt-1.5 whitespace-nowrap">
                          {node.name}
                        </span>
                        <span className="text-[9px] font-mono text-[#9CA3AF] whitespace-nowrap">
                          {node.category}
                        </span>
                      </div>
                    );
                  })}

                  {activeHop && (
                    <div className="absolute bottom-3 left-3 bg-[#1B1B1D]/95 border border-[#323238] px-3 py-1.5 rounded-lg text-[11px] font-mono flex items-center gap-2 text-[#B0E0E6]">
                      <span className="w-2 h-2 rounded-full bg-[#DC343B]" aria-hidden="true" />
                      <span>
                        PACKET AT: <strong className="text-white">{activeHop.label.split('(')[0]}</strong>
                      </span>
                    </div>
                  )}

                  {activeHop && (
                    <div className="absolute top-3 right-3 bg-[#1B1B1D]/95 border border-[#323238] px-3 py-1 rounded text-[11px] font-mono text-[#B0E0E6] flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#B0E0E6]" aria-hidden="true" />
                      <span>+{activeHop.latencyMs}ms elapsed</span>
                    </div>
                  )}
                </div>

                {/* Controls Bar */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#323238]">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDispatch}
                      disabled={isPlaying}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#DC343B] hover:bg-[#c52b31] disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                      <span>{isPlaying ? 'Simulating...' : 'Dispatch Packet'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleStepNext}
                      disabled={isPlaying}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1B1B1D] hover:bg-[#2B2B30] text-[#B0E0E6] text-xs font-medium rounded-lg border border-[#323238] transition-colors cursor-pointer"
                    >
                      <span>Step Next</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={handleResetSim}
                      className="p-2 text-[#9CA3AF] hover:text-white hover:bg-[#1B1B1D] rounded-lg transition-colors border border-[#323238] cursor-pointer"
                      aria-label="Reset Simulation"
                      title="Reset Simulation"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#9CA3AF]">
                    <span>SPEED:</span>
                    <button
                      type="button"
                      onClick={() => setPlaySpeed(1)}
                      className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                        playSpeed === 1
                          ? 'bg-[#B0E0E6]/20 text-[#B0E0E6] font-bold border border-[#B0E0E6]/40'
                          : 'text-[#9CA3AF]'
                      }`}
                    >
                      1x
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlaySpeed(2)}
                      className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                        playSpeed === 2
                          ? 'bg-[#B0E0E6]/20 text-[#B0E0E6] font-bold border border-[#B0E0E6]/40'
                          : 'text-[#9CA3AF]'
                      }`}
                    >
                      2x
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 4 Cols: Packet Telemetry Inspector */}
              <div className="lg:col-span-4 bg-[#222226] border border-[#323238] rounded-2xl p-6 space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#B0E0E6] uppercase tracking-wider mb-1">
                    <Info className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>HOP INSPECTOR TELEMETRY</span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {activeHop?.label}
                  </h3>
                  <span className="inline-block mt-1.5 text-[11px] font-mono text-[#DC343B] bg-[#1B1B1D] border border-[#DC343B]/40 px-2 py-0.5 rounded">
                    {activeHop?.layer}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1B1B1D] border border-[#323238] space-y-2">
                  <span className="text-[11px] font-mono text-[#9CA3AF] uppercase block">
                    CURRENT NODE ACTION:
                  </span>
                  <p className="text-xs font-medium text-white leading-relaxed">
                    {activeHop?.action}
                  </p>
                  <p className="text-xs text-[#D1D5DB] leading-relaxed pt-1.5 border-t border-[#323238]">
                    {activeHop?.details}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#151517] border border-[#323238] font-mono text-[11px] space-y-1 text-[#D1D5DB]">
                  <div className="text-[#9CA3AF] text-[10px] pb-1 border-b border-[#323238] flex justify-between">
                    <span>PAYLOAD HEADER</span>
                    <span className="text-[#B0E0E6]">{activePreset.protocol}</span>
                  </div>
                  <div className="pt-1 text-[#B0E0E6] break-all">
                    {activePreset.payloadSummary}
                  </div>
                  <div className="text-[#9CA3AF] text-[10px] pt-1">
                    Port: {activePreset.port} · Hops traversed: {currentHopIndex + 1}/
                    {activePreset.hops.length}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#1B1B1D] border border-[#323238] text-[11px] text-[#D1D5DB] leading-relaxed">
                  <strong className="text-[#B0E0E6]">Educational Simulation:</strong> Demonstrates
                  packet routing, NAT translation, 802.1Q tagging, and protocol steps cleanly in the
                  browser.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
           VIEW 2: CACHE EVICTION ALGORITHM PLAYGROUND (LRU vs FIFO)
           ========================================================================= */}
        {activeTab === 'cache' && (
          <div className="bg-[#222226] border border-[#323238] rounded-2xl p-6 sm:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#323238]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#B0E0E6] uppercase tracking-wider mb-1">
                  <Database className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>ALGORITHM BENCHMARK · CAPACITY: 4 SLOTS</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Cache Eviction Simulator (LRU vs. FIFO)
                </h3>
                <p className="text-xs sm:text-sm text-[#D1D5DB] mt-1">
                  Watch how operating systems and proxies retain hot data and evict records when
                  capacity fills.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#9CA3AF] mr-1">POLICY:</span>
                <button
                  type="button"
                  onClick={() => {
                    audioFx.playClick(500);
                    setCachePolicy('LRU');
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors font-mono cursor-pointer ${
                    cachePolicy === 'LRU'
                      ? 'bg-[#DC343B] text-white font-bold'
                      : 'text-[#9CA3AF] hover:text-white bg-[#1B1B1D] border border-[#323238]'
                  }`}
                >
                  LRU
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audioFx.playClick(500);
                    setCachePolicy('FIFO');
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors font-mono cursor-pointer ${
                    cachePolicy === 'FIFO'
                      ? 'bg-[#DC343B] text-white font-bold'
                      : 'text-[#9CA3AF] hover:text-white bg-[#1B1B1D] border border-[#323238]'
                  }`}
                >
                  FIFO
                </button>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-[#9CA3AF] uppercase tracking-wider block mb-2.5">
                DISPATCH REQUEST FOR KEY (CLICK TO TRIGGER CACHE LOOKUP):
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {['SKU_1001', 'USER_882', 'TOKEN_AUTH', 'ORDER_904', 'PROMO_CODE', 'CATEGORY_FOOD'].map(
                  (k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => accessKey(k)}
                      className="px-3 py-2 bg-[#1B1B1D] hover:bg-[#2B2B30] text-white border border-[#323238] hover:border-[#B0E0E6]/60 rounded-lg text-xs font-mono transition-colors cursor-pointer"
                    >
                      + GET "{k}"
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={handleResetCache}
                  className="px-3 py-2 text-xs font-mono text-[#9CA3AF] hover:text-white hover:bg-[#1B1B1D] rounded-lg border border-[#323238] transition-colors ml-auto flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reset Cache</span>
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF] mb-3">
                <span>
                  ACTIVE MEMORY SLOTS ({cacheItems.length}/{CACHE_CAPACITY})
                </span>
                <span className="text-[#B0E0E6]">
                  HIT RATIO:{' '}
                  {cacheStats.total > 0
                    ? Math.round((cacheStats.hits / cacheStats.total) * 100)
                    : 0}
                  % ({cacheStats.hits} Hits / {cacheStats.misses} Misses)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {Array.from({ length: CACHE_CAPACITY }).map((_, slotIdx) => {
                  const item = cacheItems[slotIdx];

                  return (
                    <div
                      key={slotIdx}
                      className={`p-4 rounded-xl border transition-all ${
                        item
                          ? 'bg-[#1B1B1D] border-[#323238]'
                          : 'bg-[#151517] border-dashed border-[#323238] text-[#9CA3AF]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF] mb-2">
                        <span>SLOT #{slotIdx + 1}</span>
                        {item && (
                          <span className="text-[10px] text-[#B0E0E6] font-semibold bg-[#222226] px-2 py-0.5 rounded border border-[#323238]">
                            CYCLE {item.lastAccessCycle}
                          </span>
                        )}
                      </div>

                      {item ? (
                        <div>
                          <div className="font-mono text-sm font-bold text-white tracking-tight mb-1 truncate">
                            {item.key}
                          </div>
                          <div className="text-xs text-[#9CA3AF] truncate mb-3">{item.value}</div>
                          <div className="pt-2 border-t border-[#323238] text-[11px] font-mono text-[#D1D5DB] flex justify-between">
                            <span>Hits: {item.accessCount}</span>
                            <span className="text-[#DC343B]">
                              {cachePolicy === 'LRU' && slotIdx === 0 ? 'Next Evict' : ''}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-18 flex items-center justify-center text-xs font-mono text-[#9CA3AF]">
                          [EMPTY SLOT]
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
              <div className="lg:col-span-7 bg-[#151517] border border-[#323238] rounded-xl p-4 font-mono text-xs">
                <span className="text-[11px] text-[#9CA3AF] block mb-2 font-semibold">
                  CACHE OPERATION LOG STREAM:
                </span>
                <div className="space-y-1.5 h-[130px] overflow-y-auto text-[11px]">
                  {cacheLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={
                        log.includes('HIT:')
                          ? 'text-[#B0E0E6]'
                          : log.includes('MISS:')
                          ? 'text-[#DC343B]'
                          : 'text-[#D1D5DB]'
                      }
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 p-4 rounded-xl bg-[#1B1B1D] border border-[#323238] space-y-2 text-xs">
                <span className="font-mono text-[#B0E0E6] text-[11px] font-semibold block uppercase">
                  HOW LRU WORKS UNDER THE HOOD:
                </span>
                <p className="text-[#D1D5DB] leading-relaxed">
                  To achieve <strong className="text-white">O(1) lookup</strong> and{' '}
                  <strong className="text-white">O(1) eviction</strong>, production LRU caches
                  pair a <strong>Hash Map</strong> with a <strong>Doubly Linked List</strong>.
                </p>
                <p className="text-[#9CA3AF] leading-relaxed text-[11px]">
                  Accessing an item promotes it to the head. When capacity fills, the tail node is
                  unlinked and evicted in constant time.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
           VIEW 3: UNIX PERMISSIONS & BITMASK MATRIX
           ========================================================================= */}
        {activeTab === 'permissions' && (
          <div className="bg-[#222226] border border-[#323238] rounded-2xl p-6 sm:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#323238]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#DC343B] uppercase tracking-wider mb-1">
                  <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>LINUX SECURITY & ACCESS CONTROL</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  UNIX File Permission Bitmask Calculator
                </h3>
                <p className="text-xs sm:text-sm text-[#D1D5DB] mt-1">
                  Toggle read, write, and execute bits to inspect octal modes, symbolic notations,
                  and 9-bit binary representations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[#9CA3AF]">PRESETS:</span>
                <button
                  type="button"
                  onClick={() => applyPreset(7, 5, 5)}
                  className="px-2.5 py-1 text-xs font-mono bg-[#1B1B1D] hover:bg-[#2B2B30] text-[#B0E0E6] border border-[#323238] rounded cursor-pointer"
                >
                  chmod 755
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(6, 4, 4)}
                  className="px-2.5 py-1 text-xs font-mono bg-[#1B1B1D] hover:bg-[#2B2B30] text-white border border-[#323238] rounded cursor-pointer"
                >
                  chmod 644
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(6, 0, 0)}
                  className="px-2.5 py-1 text-xs font-mono bg-[#1B1B1D] hover:bg-[#2B2B30] text-[#DC343B] border border-[#323238] rounded cursor-pointer"
                >
                  chmod 600
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(4, 0, 0)}
                  className="px-2.5 py-1 text-xs font-mono bg-[#1B1B1D] hover:bg-[#2B2B30] text-[#B0E0E6] border border-[#323238] rounded cursor-pointer"
                >
                  chmod 400
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Owner Bits */}
              <div className="p-5 rounded-xl bg-[#1B1B1D] border border-[#323238] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#323238]">
                  <span className="font-bold text-white text-sm">OWNER (u)</span>
                  <span className="font-mono text-sm font-bold text-[#B0E0E6]">
                    Octal: {octalOwner}
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { bit: 'r' as const, label: 'Read (r)', weight: 4 },
                    { bit: 'w' as const, label: 'Write (w)', weight: 2 },
                    { bit: 'x' as const, label: 'Execute (x)', weight: 1 },
                  ].map(({ bit, label, weight }) => (
                    <button
                      key={bit}
                      type="button"
                      onClick={() => togglePerm('owner', bit)}
                      className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer ${
                        permissions.owner[bit]
                          ? 'bg-[#B0E0E6]/15 border-[#B0E0E6]/50 text-white font-medium'
                          : 'bg-[#151517] border-[#323238] text-[#9CA3AF]'
                      }`}
                    >
                      <span className="text-xs">{label}</span>
                      <span className="font-mono text-xs">+{weight}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Group Bits */}
              <div className="p-5 rounded-xl bg-[#1B1B1D] border border-[#323238] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#323238]">
                  <span className="font-bold text-white text-sm">GROUP (g)</span>
                  <span className="font-mono text-sm font-bold text-[#B0E0E6]">
                    Octal: {octalGroup}
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { bit: 'r' as const, label: 'Read (r)', weight: 4 },
                    { bit: 'w' as const, label: 'Write (w)', weight: 2 },
                    { bit: 'x' as const, label: 'Execute (x)', weight: 1 },
                  ].map(({ bit, label, weight }) => (
                    <button
                      key={bit}
                      type="button"
                      onClick={() => togglePerm('group', bit)}
                      className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer ${
                        permissions.group[bit]
                          ? 'bg-[#B0E0E6]/15 border-[#B0E0E6]/50 text-white font-medium'
                          : 'bg-[#151517] border-[#323238] text-[#9CA3AF]'
                      }`}
                    >
                      <span className="text-xs">{label}</span>
                      <span className="font-mono text-xs">+{weight}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Others Bits */}
              <div className="p-5 rounded-xl bg-[#1B1B1D] border border-[#323238] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#323238]">
                  <span className="font-bold text-white text-sm">OTHERS (o)</span>
                  <span className="font-mono text-sm font-bold text-[#DC343B]">
                    Octal: {octalOthers}
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { bit: 'r' as const, label: 'Read (r)', weight: 4 },
                    { bit: 'w' as const, label: 'Write (w)', weight: 2 },
                    { bit: 'x' as const, label: 'Execute (x)', weight: 1 },
                  ].map(({ bit, label, weight }) => (
                    <button
                      key={bit}
                      type="button"
                      onClick={() => togglePerm('others', bit)}
                      className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer ${
                        permissions.others[bit]
                          ? 'bg-[#DC343B]/15 border-[#DC343B]/50 text-white font-medium'
                          : 'bg-[#151517] border-[#323238] text-[#9CA3AF]'
                      }`}
                    >
                      <span className="text-xs">{label}</span>
                      <span className="font-mono text-xs">+{weight}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#151517] border border-[#323238] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <span className="text-[11px] font-mono text-[#9CA3AF] uppercase block mb-1">
                  OCTAL NOTATION (CHMOD)
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#B0E0E6]">
                  chmod {octalString.slice(1)}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-[#9CA3AF] uppercase block mb-1">
                  SYMBOLIC STRING (LS -L)
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-white">
                  {symbolicString}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-[#9CA3AF] uppercase block mb-1">
                  9-BIT BINARY BITMASK
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#DC343B]">
                  {binaryString}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#1B1B1D] border border-[#323238] text-xs space-y-2">
              <span className="font-mono text-[#B0E0E6] font-semibold block uppercase">
                DEFENSIVE SECURITY & LEAST PRIVILEGE:
              </span>
              <p className="text-[#D1D5DB] leading-relaxed">
                OpenSSH rejects private keys with{' '}
                <code className="text-[#DC343B] bg-[#151517] px-1.5 py-0.5 rounded">chmod 777</code>{' '}
                because any local user or service account on a shared Linux host could read the
                key. Setting{' '}
                <code className="text-[#B0E0E6] bg-[#151517] px-1.5 py-0.5 rounded">600</code> or{' '}
                <code className="text-[#B0E0E6] bg-[#151517] px-1.5 py-0.5 rounded">400</code>{' '}
                restricts read access solely to the owner.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
