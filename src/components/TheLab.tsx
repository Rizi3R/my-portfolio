import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Cpu,
  Network,
  Terminal,
  Database,
  Play,
  RotateCcw,
  ArrowRight,
  Server,
  Wifi,
  Lock,
  Info,
  Clock,
  Radio,
} from 'lucide-react';
import { audioFx } from '../utils/audioFx';
import { useI18n } from '../i18n';

/* =========================================================================
   WORKBENCH 1: NETWORK PACKET FLIGHT SIMULATOR BASE DATA & TYPES
   ========================================================================= */

interface BasePacketHop {
  nodeId: string;
  latencyMs: number;
}

interface BasePacketPreset {
  id: 'http-catalog' | 'dns-lookup' | 'tcp-handshake' | 'pos-payment';
  protocol: 'HTTP/2' | 'DNS' | 'TCP' | 'PAYMENT' | 'ICMP';
  port: string;
  payloadSummary: string;
  hops: BasePacketHop[];
}

const BASE_PACKET_PRESETS: BasePacketPreset[] = [
  {
    id: 'http-catalog',
    protocol: 'HTTP/2',
    port: 'TCP 443',
    payloadSummary: 'GET /api/v2/catalog/retail-sku?branch=18 HTTP/2',
    hops: [
      { nodeId: 'client', latencyMs: 0.1 },
      { nodeId: 'switch', latencyMs: 0.4 },
      { nodeId: 'gateway', latencyMs: 1.2 },
      { nodeId: 'proxy', latencyMs: 12.8 },
      { nodeId: 'backend', latencyMs: 16.2 },
      { nodeId: 'database', latencyMs: 18.5 },
      { nodeId: 'client', latencyMs: 24.3 },
    ],
  },
  {
    id: 'dns-lookup',
    protocol: 'DNS',
    port: 'UDP 53',
    payloadSummary: 'Standard Query 0x3f2a A catalog.retail-demo.example',
    hops: [
      { nodeId: 'client', latencyMs: 0.1 },
      { nodeId: 'switch', latencyMs: 0.3 },
      { nodeId: 'gateway', latencyMs: 1.1 },
      { nodeId: 'dns', latencyMs: 7.4 },
      { nodeId: 'client', latencyMs: 9.8 },
    ],
  },
  {
    id: 'tcp-handshake',
    protocol: 'TCP',
    port: 'TCP 443',
    payloadSummary: '[SYN] -> [SYN, ACK] -> [ACK] Seq=0, Win=65535',
    hops: [
      { nodeId: 'client', latencyMs: 0.1 },
      { nodeId: 'gateway', latencyMs: 1.0 },
      { nodeId: 'proxy', latencyMs: 8.2 },
      { nodeId: 'client', latencyMs: 14.6 },
    ],
  },
  {
    id: 'pos-payment',
    protocol: 'PAYMENT',
    port: 'TCP 8443',
    payloadSummary: 'Example Auth Message [Amount: RM 24.50]',
    hops: [
      { nodeId: 'client', latencyMs: 0.2 },
      { nodeId: 'switch', latencyMs: 0.5 },
      { nodeId: 'gateway', latencyMs: 1.8 },
      { nodeId: 'proxy', latencyMs: 240.0 },
      { nodeId: 'client', latencyMs: 265.4 },
    ],
  },
];

interface BaseCanvasNode {
  id: string;
  x: number;
  y: number;
  icon: React.ComponentType<{ className?: string }>;
}

const BASE_NETWORK_NODES: BaseCanvasNode[] = [
  { id: 'client', x: 10, y: 50, icon: Terminal },
  { id: 'switch', x: 26, y: 25, icon: Server },
  { id: 'gateway', x: 44, y: 50, icon: Wifi },
  { id: 'dns', x: 44, y: 82, icon: Radio },
  { id: 'proxy', x: 65, y: 35, icon: Lock },
  { id: 'backend', x: 84, y: 35, icon: Cpu },
  { id: 'database', x: 84, y: 72, icon: Database },
];

/* =========================================================================
   WORKBENCH 2: CACHE EVICTION VISUALIZER DATA & TYPES
   ========================================================================= */

interface CacheItem {
  key: string;
  valueKey?: string;
  value: string;
  accessCount: number;
  lastAccessCycle: number;
}

interface CacheLogEntry {
  type: 'info' | 'hit' | 'miss';
  text: string;
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
  const { t, locale, format } = useI18n();
  const [activeTab, setActiveTab] = useState<'network' | 'cache' | 'permissions'>('network');

  /* ------------------- Workbench 1 State (Network Tracer) ------------------- */
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [currentHopIndex, setCurrentHopIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1);

  const packetPresets = useMemo(
    () =>
      BASE_PACKET_PRESETS.map((preset) => {
        const localized = t.lab.network.presets[preset.id];
        return {
          ...preset,
          name: localized.name,
          description: localized.description,
          hops: preset.hops.map((hop, i) => ({
            ...hop,
            ...(localized.hops[i] || { label: hop.nodeId, layer: '', action: '', details: '' }),
          })),
        };
      }),
    [t.lab.network.presets]
  );

  const networkNodes = useMemo(
    () =>
      BASE_NETWORK_NODES.map((node) => {
        const localized = t.lab.network.nodes[node.id];
        return {
          ...node,
          name: localized?.name ?? node.id,
          category: localized?.category ?? '',
        };
      }),
    [t.lab.network.nodes]
  );

  const activePreset = packetPresets[selectedPresetIndex];
  const activeHop = activePreset.hops[currentHopIndex];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isPlaying) {
      const intervalMs = playSpeed === 1 ? 1400 : 700;
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
    return () => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    };
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
  const [cacheItems, setCacheItems] = useState<CacheItem[]>(() => [
    {
      key: 'SKU_1001',
      valueKey: 'SKU_1001',
      value: t.lab.cache.defaultValues.SKU_1001,
      accessCount: 3,
      lastAccessCycle: 1,
    },
    {
      key: 'USER_882',
      valueKey: 'USER_882',
      value: t.lab.cache.defaultValues.USER_882,
      accessCount: 1,
      lastAccessCycle: 2,
    },
    {
      key: 'TOKEN_AUTH',
      valueKey: 'TOKEN_AUTH',
      value: t.lab.cache.defaultValues.TOKEN_AUTH,
      accessCount: 4,
      lastAccessCycle: 3,
    },
  ]);
  const [cycleCounter, setCycleCounter] = useState<number>(4);
  const [cacheStats, setCacheStats] = useState({ hits: 5, misses: 3, total: 8 });
  const [cacheLogs, setCacheLogs] = useState<CacheLogEntry[]>(() => [
    { type: 'info', text: t.lab.cache.initLog },
  ]);
  const hasInteractedWithCacheRef = useRef(false);

  // Sync default cache item labels and initial log when locale switches before interaction
  useEffect(() => {
    setCacheItems((prev) =>
      prev.map((item) =>
        item.valueKey && t.lab.cache.defaultValues[item.valueKey]
          ? { ...item, value: t.lab.cache.defaultValues[item.valueKey] }
          : item
      )
    );
    if (!hasInteractedWithCacheRef.current) {
      setCacheLogs([{ type: 'info', text: t.lab.cache.initLog }]);
    }
  }, [locale, t.lab.cache.defaultValues, t.lab.cache.initLog]);

  const accessKey = (keyName: string, keyValue?: string) => {
    hasInteractedWithCacheRef.current = true;
    audioFx.playClick(500);
    const newCycle = cycleCounter + 1;
    setCycleCounter(newCycle);

    const existingIndex = cacheItems.findIndex((item) => item.key === keyName);

    if (existingIndex !== -1) {
      audioFx.playSuccess();
      const updated = cacheItems.map((item) => ({ ...item }));
      updated[existingIndex].accessCount += 1;
      updated[existingIndex].lastAccessCycle = newCycle;

      if (cachePolicy === 'LRU') {
        const item = updated.splice(existingIndex, 1)[0];
        updated.push(item);
      }

      setCacheItems(updated);
      setCacheStats((prev) => ({
        ...prev,
        hits: prev.hits + 1,
        total: prev.total + 1,
      }));
      setCacheLogs((prev) => [
        {
          type: 'hit',
          text: format(t.lab.cache.hitLog, { cycle: newCycle, key: keyName }),
        },
        ...prev.slice(0, 9),
      ]);
    } else {
      audioFx.playAlert();
      const updated = cacheItems.map((item) => ({ ...item }));
      let logMsg = format(t.lab.cache.missLog, { cycle: newCycle, key: keyName });

      if (updated.length >= CACHE_CAPACITY) {
        let evictedItem: CacheItem;
        if (cachePolicy === 'LRU') {
          let minIndex = 0;
          for (let i = 1; i < updated.length; i++) {
            if (updated[i].lastAccessCycle < updated[minIndex].lastAccessCycle) {
              minIndex = i;
            }
          }
          evictedItem = updated.splice(minIndex, 1)[0];
          logMsg += format(t.lab.cache.evictedLruSuffix, {
            key: evictedItem.key,
            cycle: evictedItem.lastAccessCycle,
          });
        } else {
          evictedItem = updated.shift()!;
          logMsg += format(t.lab.cache.evictedFifoSuffix, {
            key: evictedItem.key,
          });
        }
      }

      const defaultVal = t.lab.cache.defaultValues[keyName];
      const newItem: CacheItem = {
        key: keyName,
        valueKey: defaultVal ? keyName : undefined,
        value: keyValue || defaultVal || format(t.lab.cache.customValuePrefix, { key: keyName }),
        accessCount: 1,
        lastAccessCycle: newCycle,
      };
      updated.push(newItem);

      setCacheItems(updated);
      setCacheStats((prev) => ({
        ...prev,
        misses: prev.misses + 1,
        total: prev.total + 1,
      }));
      setCacheLogs((prev) => [{ type: 'miss', text: logMsg }, ...prev.slice(0, 9)]);
    }
  };

  const handleResetCache = () => {
    hasInteractedWithCacheRef.current = true;
    audioFx.playClick(400);
    setCacheItems([
      {
        key: 'SKU_1001',
        valueKey: 'SKU_1001',
        value: t.lab.cache.defaultValues.SKU_1001,
        accessCount: 1,
        lastAccessCycle: 1,
      },
      {
        key: 'USER_882',
        valueKey: 'USER_882',
        value: t.lab.cache.defaultValues.USER_882,
        accessCount: 1,
        lastAccessCycle: 2,
      },
    ]);
    setCycleCounter(3);
    setCacheStats({ hits: 0, misses: 0, total: 0 });
    setCacheLogs([{ type: 'info', text: t.lab.cache.resetLog }]);
  };

  /* ------------------- Workbench 3 State (Unix Permissions) ------------------- */
  const [permissions, setPermissions] = useState<PermissionState>({
    owner: { r: true, w: true, x: true },
    group: { r: true, w: false, x: true },
    others: { r: true, w: false, x: true },
  });

  const togglePerm = (category: 'owner' | 'group' | 'others', bit: 'r' | 'w' | 'x') => {
    audioFx.playClick(600);
    setPermissions((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [bit]: !prev[category][bit],
      },
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
      x: (val & 1) !== 0,
    });
    setPermissions({
      owner: decode(ownerVal),
      group: decode(groupVal),
      others: decode(othersVal),
    });
  };

  return (
    <section id="lab" className="py-10 lg:py-16 relative bg-[#13161C] border-y border-[#2E3644] text-[#EEF4F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#B9D6E6] uppercase mb-3">
              <span className="px-2 py-0.5 rounded bg-[#F0583C]/15 text-[#F0583C] border border-[#F0583C]/40 text-[11px] font-bold">
                {t.lab.badgeSimulation}
              </span>
              <Cpu className="w-4 h-4 text-[#B9D6E6]" aria-hidden="true" />
              <span>{t.lab.eyebrowTitle}</span>
              <span aria-hidden="true" className="text-[#4A5464]">·</span>
              <span className="text-[#97A4B3]">{t.lab.eyebrowSub}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#EEF4F8] tracking-tight leading-snug mb-3">
              {t.lab.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#B4C2CF] leading-relaxed font-sans mb-4">
              {t.lab.intro}
            </p>

            {/* Persistent Educational Simulation Disclaimer */}
            <div className="p-3.5 rounded-xl bg-[#1B2029] border border-[#2E3644] text-xs font-mono space-y-1.5 mb-6 text-[#B4C2CF]">
              <div className="flex items-start gap-2">
                <span className="text-[#B9D6E6] font-bold shrink-0">{t.lab.modelsLabel}</span>
                <span>{t.lab.modelsText}</span>
              </div>
              <div className="flex items-start gap-2 pt-1.5 border-t border-[#2E3644]">
                <span className="text-[#F0583C] font-bold shrink-0">{t.lab.doesNotModelLabel}</span>
                <span>{t.lab.doesNotModelText}</span>
              </div>
            </div>
          </div>

          {/* Workbench Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#1B2029] border border-[#2E3644] rounded-lg self-start md:self-auto overflow-x-auto max-w-full font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                audioFx.playClick(500);
                setActiveTab('network');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'network'
                  ? 'bg-[#B9D6E6] text-[#13161C] font-bold'
                  : 'text-[#97A4B3] hover:text-[#EEF4F8]'
              }`}
            >
              <Network className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.lab.tabs.network}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                audioFx.playClick(500);
                setActiveTab('cache');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'cache'
                  ? 'bg-[#B9D6E6] text-[#13161C] font-bold'
                  : 'text-[#97A4B3] hover:text-[#EEF4F8]'
              }`}
            >
              <Database className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.lab.tabs.cache}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                audioFx.playClick(500);
                setActiveTab('permissions');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'permissions'
                  ? 'bg-[#B9D6E6] text-[#13161C] font-bold'
                  : 'text-[#97A4B3] hover:text-[#EEF4F8]'
              }`}
            >
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.lab.tabs.permissions}</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
           VIEW 1: NETWORK PACKET FLIGHT SIMULATOR
           ========================================================================= */}
        {activeTab === 'network' && (
          <div className="space-y-6">
            {/* Protocol Preset Selector */}
            <div className="flex flex-wrap items-center gap-2 bg-[#1B2029] p-2.5 rounded-xl border border-[#2E3644]">
              <span className="text-xs font-mono text-[#97A4B3] px-2 uppercase tracking-wider">
                {t.lab.network.selectProtocol}
              </span>
              {packetPresets.map((preset, idx) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(idx)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
                    selectedPresetIndex === idx
                      ? 'bg-[#13161C] text-[#B9D6E6] border border-[#B9D6E6]/60 font-medium'
                      : 'text-[#97A4B3] hover:text-[#EEF4F8] hover:bg-[#232935]'
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#F0583C]">[{preset.protocol}]</span>
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>

            {/* Interactive Simulation Arena */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 8 Cols: Visual Network Canvas */}
              <div className="lg:col-span-8 bg-[#1B2029] border border-[#2E3644] rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2E3644] text-xs font-mono gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-[#B9D6E6] shrink-0" aria-hidden="true" />
                    <span className="text-[#EEF4F8] font-semibold truncate">{activePreset.name}</span>
                    <span className="text-[#4A5464]">·</span>
                    <span className="text-[#B9D6E6] font-mono shrink-0">{activePreset.port}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#97A4B3] text-[11px] shrink-0">
                    <span>
                      {format(t.lab.network.hopCounter, {
                        current: currentHopIndex + 1,
                        total: activePreset.hops.length,
                      })}
                    </span>
                  </div>
                </div>

                {/* Network Nodes Coordinate Canvas */}
                <div className="overflow-x-auto bg-[#13161C] border border-[#2E3644] rounded-xl">
                  <div className="relative min-w-[520px] h-[320px] sm:h-[360px] w-full overflow-hidden p-4">
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="10%" y1="50%" x2="26%" y2="25%" stroke="#2E3644" strokeWidth="2" strokeDasharray="3 3" />
                      <line x1="26%" y1="25%" x2="44%" y2="50%" stroke="#2E3644" strokeWidth="2" />
                      <line x1="44%" y1="50%" x2="44%" y2="82%" stroke="#2E3644" strokeWidth="1.5" strokeDasharray="4 4" />
                      <line x1="44%" y1="50%" x2="65%" y2="35%" stroke="#2E3644" strokeWidth="2" />
                      <line x1="65%" y1="35%" x2="84%" y2="35%" stroke="#2E3644" strokeWidth="2" />
                      <line x1="84%" y1="35%" x2="84%" y2="72%" stroke="#2E3644" strokeWidth="2" />
                    </svg>

                    {networkNodes.map((node) => {
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
                                ? 'bg-[#F0583C]/20 border-[#F0583C] text-[#EEF4F8] ring-4 ring-[#F0583C]/20'
                                : 'bg-[#1B2029] border-[#2E3644] text-[#B9D6E6]'
                            }`}
                          >
                            <NodeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <span className="text-[11px] font-semibold text-[#EEF4F8] mt-1.5 whitespace-nowrap">
                            {node.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#A7B5C3] whitespace-nowrap">
                            {node.category}
                          </span>
                        </div>
                      );
                    })}

                    {activeHop && (
                      <div className="absolute bottom-3 left-3 bg-[#1B2029]/95 border border-[#2E3644] px-3 py-1.5 rounded-lg text-[11px] font-mono flex items-center gap-2 text-[#B9D6E6]">
                        <span className="w-2 h-2 rounded-full bg-[#F0583C]" aria-hidden="true" />
                        <span>
                          {t.lab.network.packetAt}{' '}
                          <strong className="text-[#EEF4F8]">
                            {activeHop.label.split(/[（(]/)[0].trim()}
                          </strong>
                        </span>
                      </div>
                    )}

                    {activeHop && (
                      <div className="absolute top-3 right-3 bg-[#1B2029]/95 border border-[#2E3644] px-3 py-1 rounded text-[11px] font-mono text-[#B9D6E6] flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#B9D6E6]" aria-hidden="true" />
                        <span>{format(t.lab.network.elapsedMs, { ms: activeHop.latencyMs })}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Controls Bar */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#2E3644]">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDispatch}
                      disabled={isPlaying}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#B9D6E6] hover:bg-[#cfe3ee] disabled:opacity-50 text-[#13161C] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                      <span>{isPlaying ? t.lab.network.simulating : t.lab.network.dispatchPacket}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleStepNext}
                      disabled={isPlaying}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#13161C] hover:bg-[#232935] text-[#B9D6E6] text-xs font-medium rounded-lg border border-[#2E3644] transition-colors cursor-pointer"
                    >
                      <span>{t.lab.network.stepNext}</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={handleResetSim}
                      className="p-2 text-[#97A4B3] hover:text-[#EEF4F8] hover:bg-[#13161C] rounded-lg transition-colors border border-[#2E3644] cursor-pointer"
                      aria-label={t.lab.network.resetTooltip}
                      title={t.lab.network.resetTooltip}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#97A4B3]">
                    <span>{t.lab.network.speedLabel}</span>
                    <button
                      type="button"
                      onClick={() => setPlaySpeed(1)}
                      className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                        playSpeed === 1
                          ? 'bg-[#B9D6E6]/20 text-[#B9D6E6] font-bold border border-[#B9D6E6]/40'
                          : 'text-[#97A4B3]'
                      }`}
                    >
                      1x
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlaySpeed(2)}
                      className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                        playSpeed === 2
                          ? 'bg-[#B9D6E6]/20 text-[#B9D6E6] font-bold border border-[#B9D6E6]/40'
                          : 'text-[#97A4B3]'
                      }`}
                    >
                      2x
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 4 Cols: Packet Telemetry Inspector */}
              <div className="lg:col-span-4 bg-[#1B2029] border border-[#2E3644] rounded-2xl p-6 space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#B9D6E6] uppercase tracking-wider mb-1">
                    <Info className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t.lab.network.inspectorHeader}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#EEF4F8] tracking-tight">
                    {activeHop?.label}
                  </h3>
                  <span className="inline-block mt-1.5 text-[11px] font-mono text-[#F0583C] bg-[#13161C] border border-[#F0583C]/40 px-2 py-0.5 rounded">
                    {activeHop?.layer}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#13161C] border border-[#2E3644] space-y-2">
                  <span className="text-[11px] font-mono text-[#97A4B3] uppercase block">
                    {t.lab.network.currentNodeAction}
                  </span>
                  <p className="text-xs font-medium text-[#EEF4F8] leading-relaxed">
                    {activeHop?.action}
                  </p>
                  <p className="text-xs text-[#B4C2CF] leading-relaxed pt-1.5 border-t border-[#2E3644]">
                    {activeHop?.details}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#13161C] border border-[#2E3644] font-mono text-[11px] space-y-1 text-[#B4C2CF]">
                  <div className="text-[#97A4B3] text-[10px] pb-1 border-b border-[#2E3644] flex justify-between">
                    <span>{t.lab.network.payloadHeader}</span>
                    <span className="text-[#B9D6E6]">{activePreset.protocol}</span>
                  </div>
                  <div className="pt-1 text-[#B9D6E6] break-all">
                    {activePreset.payloadSummary}
                  </div>
                  <div className="text-[#97A4B3] text-[10px] pt-1">
                    {format(t.lab.network.portLabel, {
                      port: activePreset.port,
                      current: currentHopIndex + 1,
                      total: activePreset.hops.length,
                    })}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#13161C] border border-[#2E3644] text-[11px] text-[#B4C2CF] leading-relaxed">
                  <strong className="text-[#B9D6E6]">{t.lab.network.simulationNoteTitle}</strong>{' '}
                  {t.lab.network.simulationNoteBody}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
           VIEW 2: CACHE EVICTION ALGORITHM PLAYGROUND (LRU vs FIFO)
           ========================================================================= */}
        {activeTab === 'cache' && (
          <div className="bg-[#1B2029] border border-[#2E3644] rounded-2xl p-6 sm:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#2E3644]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#B9D6E6] uppercase tracking-wider mb-1">
                  <Database className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.lab.cache.eyebrow}</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#EEF4F8] tracking-tight">
                  {t.lab.cache.heading}
                </h3>
                <p className="text-xs sm:text-sm text-[#B4C2CF] mt-1">
                  {t.lab.cache.intro}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#97A4B3] mr-1">{t.lab.cache.policyLabel}</span>
                <button
                  type="button"
                  onClick={() => {
                    audioFx.playClick(500);
                    setCachePolicy('LRU');
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors font-mono cursor-pointer ${
                    cachePolicy === 'LRU'
                      ? 'bg-[#B9D6E6] text-[#13161C] font-bold'
                      : 'text-[#97A4B3] hover:text-[#EEF4F8] bg-[#13161C] border border-[#2E3644]'
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
                      ? 'bg-[#B9D6E6] text-[#13161C] font-bold'
                      : 'text-[#97A4B3] hover:text-[#EEF4F8] bg-[#13161C] border border-[#2E3644]'
                  }`}
                >
                  FIFO
                </button>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-[#97A4B3] uppercase tracking-wider block mb-2.5">
                {t.lab.cache.dispatchLabel}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {['SKU_1001', 'USER_882', 'TOKEN_AUTH', 'ORDER_904', 'PROMO_CODE', 'CATEGORY_FOOD'].map(
                  (k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => accessKey(k)}
                      className="px-3 py-2 bg-[#13161C] hover:bg-[#232935] text-[#EEF4F8] border border-[#2E3644] hover:border-[#B9D6E6]/60 rounded-lg text-xs font-mono transition-colors cursor-pointer"
                    >
                      {format(t.lab.cache.getPrefix, { key: k })}
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={handleResetCache}
                  className="px-3 py-2 text-xs font-mono text-[#97A4B3] hover:text-[#EEF4F8] hover:bg-[#13161C] rounded-lg border border-[#2E3644] transition-colors ml-auto flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.lab.cache.resetCache}</span>
                </button>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#97A4B3] mb-3">
                <span>
                  {format(t.lab.cache.activeSlots, {
                    used: cacheItems.length,
                    capacity: CACHE_CAPACITY,
                  })}
                </span>
                <span className="text-[#B9D6E6]">
                  {format(t.lab.cache.hitRatio, {
                    ratio:
                      cacheStats.total > 0
                        ? Math.round((cacheStats.hits / cacheStats.total) * 100)
                        : 0,
                    hits: cacheStats.hits,
                    hitsWord: t.lab.cache.hitsWord,
                    misses: cacheStats.misses,
                    missesWord: t.lab.cache.missesWord,
                  })}
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
                          ? 'bg-[#13161C] border-[#2E3644]'
                          : 'bg-[#13161C]/60 border-dashed border-[#2E3644] text-[#97A4B3]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-[#97A4B3] mb-2">
                        <span>{format(t.lab.cache.slotPrefix, { number: slotIdx + 1 })}</span>
                        {item && (
                          <span className="text-[10px] text-[#B9D6E6] font-semibold bg-[#1B2029] px-2 py-0.5 rounded border border-[#2E3644]">
                            {format(t.lab.cache.cyclePrefix, { cycle: item.lastAccessCycle })}
                          </span>
                        )}
                      </div>

                      {item ? (
                        <div>
                          <div className="font-mono text-sm font-bold text-[#EEF4F8] tracking-tight mb-1 truncate">
                            {item.key}
                          </div>
                          <div className="text-xs text-[#97A4B3] truncate mb-3">{item.value}</div>
                          <div className="pt-2 border-t border-[#2E3644] text-[11px] font-mono text-[#B4C2CF] flex justify-between">
                            <span>{format(t.lab.cache.hitsLabel, { count: item.accessCount })}</span>
                            <span className="text-[#F0583C]">
                              {cachePolicy === 'LRU' && slotIdx === 0 ? t.lab.cache.nextEvict : ''}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-18 flex items-center justify-center text-xs font-mono text-[#97A4B3]">
                          {t.lab.cache.emptySlot}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
              <div className="lg:col-span-7 bg-[#13161C] border border-[#2E3644] rounded-xl p-4 font-mono text-xs">
                <span className="text-[11px] text-[#97A4B3] block mb-2 font-semibold">
                  {t.lab.cache.logHeader}
                </span>
                <div className="space-y-1.5 h-[130px] overflow-y-auto text-[11px]">
                  {cacheLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={
                        log.type === 'hit'
                          ? 'text-[#B9D6E6]'
                          : log.type === 'miss'
                          ? 'text-[#F0583C]'
                          : 'text-[#B4C2CF]'
                      }
                    >
                      {log.text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 p-4 rounded-xl bg-[#13161C] border border-[#2E3644] space-y-2 text-xs">
                <span className="font-mono text-[#B9D6E6] text-[11px] font-semibold block uppercase">
                  {t.lab.cache.howItWorksTitle}
                </span>
                <p className="text-[#B4C2CF] leading-relaxed">
                  {t.lab.cache.howItWorksBody1}
                </p>
                <p className="text-[#97A4B3] leading-relaxed text-[11px]">
                  {t.lab.cache.howItWorksBody2}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
           VIEW 3: UNIX PERMISSIONS & BITMASK MATRIX
           ========================================================================= */}
        {activeTab === 'permissions' && (
          <div className="bg-[#1B2029] border border-[#2E3644] rounded-2xl p-6 sm:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#2E3644]">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#F0583C] uppercase tracking-wider mb-1">
                  <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.lab.permissions.eyebrow}</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#EEF4F8] tracking-tight">
                  {t.lab.permissions.heading}
                </h3>
                <p className="text-xs sm:text-sm text-[#B4C2CF] mt-1">
                  {t.lab.permissions.intro}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[#97A4B3]">
                  {t.lab.permissions.presetsLabel}
                </span>
                <button
                  type="button"
                  onClick={() => applyPreset(7, 5, 5)}
                  className="px-2.5 py-1 text-xs font-mono bg-[#13161C] hover:bg-[#232935] text-[#B9D6E6] border border-[#2E3644] rounded cursor-pointer"
                >
                  chmod 755
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(6, 4, 4)}
                  className="px-2.5 py-1 text-xs font-mono bg-[#13161C] hover:bg-[#232935] text-[#EEF4F8] border border-[#2E3644] rounded cursor-pointer"
                >
                  chmod 644
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(6, 0, 0)}
                  className="px-2.5 py-1 text-xs font-mono bg-[#13161C] hover:bg-[#232935] text-[#F0583C] border border-[#2E3644] rounded cursor-pointer"
                >
                  chmod 600
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(4, 0, 0)}
                  className="px-2.5 py-1 text-xs font-mono bg-[#13161C] hover:bg-[#232935] text-[#B9D6E6] border border-[#2E3644] rounded cursor-pointer"
                >
                  chmod 400
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Owner Bits */}
              <div className="p-5 rounded-xl bg-[#13161C] border border-[#2E3644] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#2E3644]">
                  <span className="font-bold text-[#EEF4F8] text-sm">
                    {t.lab.permissions.ownerLabel}
                  </span>
                  <span className="font-mono text-sm font-bold text-[#B9D6E6]">
                    {format(t.lab.permissions.octalLabel, { value: octalOwner })}
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { bit: 'r' as const, label: t.lab.permissions.readLabel, weight: 4 },
                    { bit: 'w' as const, label: t.lab.permissions.writeLabel, weight: 2 },
                    { bit: 'x' as const, label: t.lab.permissions.executeLabel, weight: 1 },
                  ].map(({ bit, label, weight }) => (
                    <button
                      key={bit}
                      type="button"
                      onClick={() => togglePerm('owner', bit)}
                      className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer ${
                        permissions.owner[bit]
                          ? 'bg-[#B9D6E6]/15 border-[#B9D6E6]/50 text-[#EEF4F8] font-medium'
                          : 'bg-[#1B2029] border-[#2E3644] text-[#97A4B3]'
                      }`}
                    >
                      <span className="text-xs">{label}</span>
                      <span className="font-mono text-xs">+{weight}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Group Bits */}
              <div className="p-5 rounded-xl bg-[#13161C] border border-[#2E3644] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#2E3644]">
                  <span className="font-bold text-[#EEF4F8] text-sm">
                    {t.lab.permissions.groupLabel}
                  </span>
                  <span className="font-mono text-sm font-bold text-[#B9D6E6]">
                    {format(t.lab.permissions.octalLabel, { value: octalGroup })}
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { bit: 'r' as const, label: t.lab.permissions.readLabel, weight: 4 },
                    { bit: 'w' as const, label: t.lab.permissions.writeLabel, weight: 2 },
                    { bit: 'x' as const, label: t.lab.permissions.executeLabel, weight: 1 },
                  ].map(({ bit, label, weight }) => (
                    <button
                      key={bit}
                      type="button"
                      onClick={() => togglePerm('group', bit)}
                      className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer ${
                        permissions.group[bit]
                          ? 'bg-[#B9D6E6]/15 border-[#B9D6E6]/50 text-[#EEF4F8] font-medium'
                          : 'bg-[#1B2029] border-[#2E3644] text-[#97A4B3]'
                      }`}
                    >
                      <span className="text-xs">{label}</span>
                      <span className="font-mono text-xs">+{weight}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Others Bits */}
              <div className="p-5 rounded-xl bg-[#13161C] border border-[#2E3644] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#2E3644]">
                  <span className="font-bold text-[#EEF4F8] text-sm">
                    {t.lab.permissions.othersLabel}
                  </span>
                  <span className="font-mono text-sm font-bold text-[#F0583C]">
                    {format(t.lab.permissions.octalLabel, { value: octalOthers })}
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { bit: 'r' as const, label: t.lab.permissions.readLabel, weight: 4 },
                    { bit: 'w' as const, label: t.lab.permissions.writeLabel, weight: 2 },
                    { bit: 'x' as const, label: t.lab.permissions.executeLabel, weight: 1 },
                  ].map(({ bit, label, weight }) => (
                    <button
                      key={bit}
                      type="button"
                      onClick={() => togglePerm('others', bit)}
                      className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer ${
                        permissions.others[bit]
                          ? 'bg-[#F0583C]/15 border-[#F0583C]/50 text-[#EEF4F8] font-medium'
                          : 'bg-[#1B2029] border-[#2E3644] text-[#97A4B3]'
                      }`}
                    >
                      <span className="text-xs">{label}</span>
                      <span className="font-mono text-xs">+{weight}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#13161C] border border-[#2E3644] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <span className="text-[11px] font-mono text-[#97A4B3] uppercase block mb-1">
                  {t.lab.permissions.octalHeader}
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#B9D6E6]">
                  chmod {octalString.slice(1)}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-[#97A4B3] uppercase block mb-1">
                  {t.lab.permissions.symbolicHeader}
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#EEF4F8]">
                  {symbolicString}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-[#97A4B3] uppercase block mb-1">
                  {t.lab.permissions.binaryHeader}
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#F0583C]">
                  {binaryString}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#13161C] border border-[#2E3644] text-xs space-y-2">
              <span className="font-mono text-[#B9D6E6] font-semibold block uppercase">
                {t.lab.permissions.securityTitle}
              </span>
              <p className="text-[#B4C2CF] leading-relaxed">
                {t.lab.permissions.securityBody}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
