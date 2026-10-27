import React, { useState } from 'react';
import { FRONTIER_TOPICS, FrontierTopic } from '../data/portfolioData';
import { 
  Compass, 
  Terminal, 
  Cpu, 
  Network, 
  ShieldCheck, 
  Cloud, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Sparkles,
  HelpCircle,
  Code2
} from 'lucide-react';
import { audioFx } from '../utils/audioFx';
import { TiltCard } from './TiltCard';

export const TheFrontier: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('linux-internals');

  const selectedTopic = FRONTIER_TOPICS.find((t) => t.id === selectedTopicId) || FRONTIER_TOPICS[0];

  const domainIcons: Record<string, React.ReactNode> = {
    'Operating Systems': <Terminal className="w-5 h-5 text-sky-400" />,
    'Computer Networks': <Network className="w-5 h-5 text-indigo-400" />,
    'Cybersecurity Concepts': <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    'Cloud & Infrastructure': <Cloud className="w-5 h-5 text-amber-400" />
  };

  return (
    <section id="frontier" className="py-20 lg:py-28 relative bg-[#040711] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase mb-3">
            <Compass className="w-4 h-4 text-sky-400" />
            <span>SPACE 06</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>THE FRONTIER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug mb-3">
            Active Learning & Technical Horizons
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            I don't believe in pretending to have mastered everything. Here is an honest look into the computing domains I am actively studying, the questions I'm investigating, and how these foundations connect back to real systems.
          </p>
        </div>

        {/* 4 Topic Exploration Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {FRONTIER_TOPICS.map((topic) => {
            const isSelected = selectedTopicId === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => {
                  audioFx.playClick(500);
                  setSelectedTopicId(topic.id);
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-sky-500/50 shadow-lg shadow-sky-500/10'
                    : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900/60 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
                    {domainIcons[topic.domain]}
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/60">
                    {topic.status}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500 block mb-0.5">
                  {topic.domain}
                </span>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  {topic.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Detailed Topic Investigation Dossier */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-8">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-1">
                <span>ACTIVE HORIZON</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{selectedTopic.domain}</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {selectedTopic.title}
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {selectedTopic.tagline}
              </p>
            </div>

            <div className="self-start md:self-auto p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
              <span className="text-slate-500 block text-[10px] uppercase">INVESTIGATION STATUS</span>
              <span className="text-sky-300 font-semibold">{selectedTopic.status}</span>
            </div>
          </div>

          {/* 3-Column Topic Deep Dive */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Cols: Why It Matters & Core Questions */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  WHY THIS MATTERS BEYOND THEORY:
                </span>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  {selectedTopic.whyItMatters}
                </p>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2.5">
                  CORE QUESTIONS BEING INVESTIGATED:
                </span>
                <div className="space-y-2.5">
                  {selectedTopic.questionsInvestigated.map((q, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                      <HelpCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Sample Command, Key Concepts & Practical Work Link */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Sample Shell Diagnostic Command */}
              {selectedTopic.sampleCommandOrCode && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>SAMPLE DIAGNOSTIC / PROBE</span>
                    </span>
                  </div>
                  <pre className="text-xs font-mono text-sky-300 bg-slate-900/90 p-2.5 rounded border border-slate-800 overflow-x-auto">
                    <code>$ {selectedTopic.sampleCommandOrCode}</code>
                  </pre>
                </div>
              )}

              {/* Key Concept Badges */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2.5">
                <span className="text-[11px] font-mono text-slate-400 uppercase block">
                  KEY CONCEPTS STUDIED:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTopic.keyConcepts.map((concept) => (
                    <span
                      key={concept}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Practical Production Connection */}
              <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-800/30 text-xs space-y-1.5 text-slate-300">
                <span className="font-mono text-sky-400 text-[11px] font-semibold block uppercase">
                  CONNECTION TO REAL-WORLD WORK:
                </span>
                <p className="leading-relaxed">
                  {selectedTopic.practicalConnection}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
