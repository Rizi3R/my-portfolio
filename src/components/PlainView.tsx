import React from 'react';
import { 
  PROFILE, 
  EXPERIENCES, 
  CASE_STUDIES, 
  CERTIFICATIONS, 
  STRATA, 
  NODES, 
  EDGES,
  LEARNING_ENTRIES
} from '../data/universeContent';
import { Printer, ArrowUpRight } from 'lucide-react';

export const PlainView: React.FC = () => {
  return (
    <article 
      className="max-w-4xl mx-auto py-12 px-6 sm:px-10 bg-white text-stone-900 font-sans selection:bg-stone-900 selection:text-white"
      style={{ minHeight: '100vh' }}
    >
      {/* Top Document Meta Bar */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-stone-900 pb-4 mb-8 font-mono text-xs">
        <div>
          <span className="font-bold">DOCUMENT ID:</span> AR-UNIVERSE-PLAIN-SPEC · REVISION 2026.1
        </div>
        <div className="flex items-center gap-4 print:hidden">
          <span className="text-stone-500">Semantic Reader & Print Edition</span>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 text-white font-mono text-xs uppercase hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Specification</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="mb-10 pb-8 border-b border-stone-300">
        <h1 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-stone-950 mb-2">
          {PROFILE.fullName}
        </h1>
        <div className="text-base sm:text-lg font-mono font-medium text-stone-700 mb-3">
          {PROFILE.title}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-mono text-stone-600 mb-4">
          <span>Location: {PROFILE.location}</span>
          <span>Email: <a href={`mailto:${PROFILE.email}`} className="text-stone-900 underline">{PROFILE.email}</a></span>
          <span>LinkedIn: <a href={PROFILE.linkedIn} target="_blank" rel="noopener noreferrer" className="text-stone-900 underline">Profile Link</a></span>
        </div>
        <div className="p-4 bg-stone-100 border-l-4 border-stone-800 text-sm leading-relaxed text-stone-800">
          <p className="font-bold font-mono text-xs uppercase text-stone-900 mb-1">
            CORE OPERATIONAL PREMISE
          </p>
          <p>{PROFILE.intro} {PROFILE.premise}</p>
        </div>
      </header>

      {/* Table of Contents */}
      <nav aria-label="Plain Document Table of Contents" className="mb-12 p-4 bg-stone-50 border border-stone-200 text-xs font-mono">
        <div className="font-bold uppercase tracking-wider mb-2 text-stone-900">
          DOCUMENT SECTIONS
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 list-decimal list-inside text-stone-700">
          <li><a href="#plain-strata" className="hover:underline">The 6 Computing Strata (Beep to Receipt)</a></li>
          <li><a href="#plain-experience" className="hover:underline">Verified Employment History</a></li>
          <li><a href="#plain-case-studies" className="hover:underline">Operational Case Studies</a></li>
          <li><a href="#plain-learning" className="hover:underline">Currently Learning & Active Explorations</a></li>
          <li><a href="#plain-credentials" className="hover:underline">Certifications & Education</a></li>
          <li><a href="#plain-knowledge-graph" className="hover:underline">Full Technical Topology ({NODES.length} Verified Nodes)</a></li>
        </ol>
      </nav>

      {/* SECTION 1: THE 6 COMPUTING STRATA */}
      <section id="plain-strata" className="mb-14 scroll-mt-10">
        <h2 className="text-xl font-bold font-mono uppercase tracking-wide border-b border-stone-900 pb-2 mb-6">
          1. The 6 Computing Strata: "Beep to Receipt"
        </h2>
        <div className="space-y-6">
          {STRATA.map((st, i) => (
            <div key={st.id} className="p-4 border border-stone-300">
              <div className="flex flex-wrap items-center justify-between text-xs font-mono text-stone-500 mb-1">
                <span>STRATUM 0{i + 1} OF 06</span>
                <span className="font-bold uppercase text-stone-900">{st.tagline}</span>
              </div>
              <h3 className="text-lg font-bold font-mono text-stone-900 mb-2">
                {st.title}
              </h3>
              <p className="text-sm leading-relaxed text-stone-700 mb-3">
                {st.stepDescription}
              </p>
              <div className="text-xs font-mono text-stone-600 bg-stone-100 p-2 border border-stone-200">
                <span className="font-bold">Annotated Technical Components: </span>
                {st.annotationNodeIds.map(nId => {
                  const node = NODES.find(n => n.id === nId);
                  return node ? `${node.label} (${node.status})` : nId;
                }).join(' · ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: VERIFIED EMPLOYMENT HISTORY */}
      <section id="plain-experience" className="mb-14 scroll-mt-10">
        <h2 className="text-xl font-bold font-mono uppercase tracking-wide border-b border-stone-900 pb-2 mb-6">
          2. Verified Employment History
        </h2>
        <div className="space-y-8">
          {EXPERIENCES.map(exp => (
            <div key={exp.id} className="pb-6 border-b border-stone-200 last:border-b-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                <h3 className="text-lg font-bold text-stone-950 font-mono">
                  {exp.role}
                </h3>
                <span className="font-mono text-xs font-bold text-stone-600 uppercase">
                  {exp.period}
                </span>
              </div>
              <div className="text-sm font-semibold text-stone-700 mb-3">
                {exp.organization} · {exp.location}
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-stone-800 leading-relaxed mb-4">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-stone-100 text-stone-800 border border-stone-300 text-xs font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: OPERATIONAL CASE STUDIES */}
      <section id="plain-case-studies" className="mb-14 scroll-mt-10">
        <h2 className="text-xl font-bold font-mono uppercase tracking-wide border-b border-stone-900 pb-2 mb-6">
          3. Real Operational Case Studies
        </h2>
        <div className="space-y-8">
          {CASE_STUDIES.map(cs => (
            <div key={cs.id} className="p-5 border border-stone-300 bg-stone-50/50">
              <div className="text-xs font-mono font-bold text-stone-500 uppercase mb-1">
                {cs.organization} · Stratum: {cs.stratum}
              </div>
              <h3 className="text-base sm:text-lg font-bold font-mono text-stone-900 mb-2">
                {cs.title}
              </h3>
              <p className="text-sm font-medium text-stone-700 italic mb-4">
                "{cs.hook}"
              </p>
              
              <div className="space-y-3 text-xs leading-relaxed text-stone-800">
                <div>
                  <strong className="font-mono uppercase text-stone-900">The Challenge: </strong>
                  {cs.challenge}
                </div>
                <div>
                  <strong className="font-mono uppercase text-stone-900">Investigation Methodology: </strong>
                  {cs.investigation}
                </div>
                <div>
                  <strong className="font-mono uppercase text-stone-900 block mb-1">Actions Taken: </strong>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    {cs.actions.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-stone-100 border border-stone-300">
                  <strong className="font-mono uppercase text-stone-900 block mb-1">Verified Outcomes: </strong>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    {cs.outcome.map((out, i) => (
                      <li key={i}>{out}</li>
                    ))}
                  </ul>
                </div>
                <div className="font-mono text-[11px] text-stone-600">
                  <strong>Takeaway: </strong> {cs.takeaway}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: CURRENTLY LEARNING & ACTIVE EXPLORATIONS */}
      <section id="plain-learning" className="mb-14 scroll-mt-10">
        <h2 className="text-xl font-bold font-mono uppercase tracking-wide border-b border-stone-900 pb-2 mb-6">
          4. Currently Learning & Active Explorations
        </h2>
        <p className="text-xs font-mono text-stone-600 mb-4 uppercase">
          Active technical investigations and learning areas (strictly isolated from production claims)
        </p>
        <div className="space-y-4">
          {LEARNING_ENTRIES.map(entry => (
            <div key={entry.id} className="p-4 border border-stone-300 bg-stone-50">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-mono text-sm font-bold text-stone-900">{entry.topic}</span>
                <span className="px-2 py-0.5 bg-stone-200 text-stone-800 font-mono text-[10px] uppercase font-bold tracking-wider">
                  STATUS: {entry.status}
                </span>
              </div>
              <div className="text-xs font-mono text-stone-600 mb-2">
                <strong>Context:</strong> {entry.context}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-sans">
                "{entry.note}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: CERTIFICATIONS & EDUCATION */}
      <section id="plain-credentials" className="mb-14 scroll-mt-10">
        <h2 className="text-xl font-bold font-mono uppercase tracking-wide border-b border-stone-900 pb-2 mb-6">
          5. Certifications & Academic Credentials
        </h2>
        <div className="space-y-4 text-sm">
          {CERTIFICATIONS.map(cert => (
            <div key={cert.name} className="flex flex-col sm:flex-row sm:items-baseline justify-between p-3 border border-stone-300">
              <div>
                <div className="font-bold text-stone-900 font-mono">{cert.name}</div>
                <div className="text-xs text-stone-600">{cert.issuer} · {cert.credentialNote}</div>
              </div>
              <span className="font-mono text-xs font-bold text-stone-800 uppercase mt-1 sm:mt-0">
                {cert.status}
              </span>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between p-3 border border-stone-300">
            <div>
              <div className="font-bold text-stone-900 font-mono">Diploma in Computer Science & Mathematics</div>
              <div className="text-xs text-stone-600">Universiti Teknologi MARA (UiTM) · 2019 – 2022</div>
            </div>
            <span className="font-mono text-xs font-bold text-stone-800 uppercase mt-1 sm:mt-0">
              Graduated
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 6: FULL TECHNICAL TOPOLOGY */}
      <section id="plain-knowledge-graph" className="mb-14 scroll-mt-10">
        <h2 className="text-xl font-bold font-mono uppercase tracking-wide border-b border-stone-900 pb-2 mb-6">
          6. Full Technical Topology (All {NODES.length} Verified Nodes)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-stone-300 font-sans">
            <thead className="bg-stone-100 font-mono uppercase text-stone-900 border-b border-stone-300">
              <tr>
                <th className="p-2.5 border-r border-stone-300">Node Label</th>
                <th className="p-2.5 border-r border-stone-300">Stratum</th>
                <th className="p-2.5 border-r border-stone-300">Status</th>
                <th className="p-2.5 border-r border-stone-300">Applied Operational Usage</th>
                <th className="p-2.5">Factual Operational Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {NODES.map(node => (
                <tr key={node.id} className="hover:bg-stone-50">
                  <td className="p-2.5 font-bold font-mono text-stone-900 border-r border-stone-200 whitespace-nowrap">
                    {node.label}
                  </td>
                  <td className="p-2.5 font-mono uppercase text-stone-600 border-r border-stone-200 whitespace-nowrap">
                    {node.stratum}
                  </td>
                  <td className="p-2.5 font-mono uppercase text-stone-800 border-r border-stone-200 whitespace-nowrap font-semibold">
                    {node.status}
                  </td>
                  <td className="p-2.5 text-stone-800 font-mono text-[11px] border-r border-stone-200 leading-relaxed min-w-[220px]">
                    {node.usage || 'Exploratory architecture node'}
                  </td>
                  <td className="p-2.5 text-stone-700 leading-relaxed min-w-[260px]">
                    {node.summary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t-2 border-stone-900 font-mono text-xs text-stone-500 text-center">
        <div>Generated directly from single source of truth: <code>src/data/universeContent.ts</code></div>
        <div className="mt-1">Zero external tracking cookies · No backend server calls · Static deployment ready</div>
      </footer>
    </article>
  );
};
