import React from 'react';
import {
  PROFILE,
  EXPERIENCES,
  CASE_STUDIES,
  CERTIFICATIONS,
  EDUCATION,
  STRATA,
  NODES,
  LEARNING_ENTRIES,
} from '../data/universeContent';
import { Printer } from 'lucide-react';

export const PlainView: React.FC = () => {
  return (
    <article
      className="max-w-4xl mx-auto py-12 px-6 sm:px-10 bg-white text-stone-900 font-sans selection:bg-stone-900 selection:text-white"
      style={{ minHeight: '100vh' }}
    >
      {/* Top Document Meta Bar */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-stone-900 pb-4 mb-8 font-mono text-xs">
        <div>
          <span className="font-bold">PRINTABLE SUMMARY:</span> ARIES RAZAK
        </div>
        <div className="flex items-center gap-4 print:hidden">
          <span className="text-stone-700">High-Contrast Summary</span>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-900 text-white font-mono text-xs uppercase hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Print / Save PDF</span>
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
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-mono text-stone-700 mb-4">
          <span>Location: {PROFILE.location}</span>
          <span>
            Email:{' '}
            <a href={`mailto:${PROFILE.email}`} className="text-stone-900 underline">
              {PROFILE.email}
            </a>
          </span>
          <span>
            LinkedIn:{' '}
            <a
              href={PROFILE.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-900 underline"
            >
              Profile Link
            </a>
          </span>
        </div>
        <div className="p-4 bg-[#F6F2E9] border border-[#DDD6C7] text-sm leading-relaxed text-[#191723]">
          <p className="font-bold font-mono text-xs uppercase text-[#191723] mb-1">Summary</p>
          <p>{PROFILE.resumeSummary}</p>
        </div>
      </header>

      {/* Table of Contents */}
      <nav
        aria-label="Printable Summary Table of Contents"
        className="mb-12 p-4 bg-stone-50 border border-stone-200 text-xs font-mono"
      >
        <div className="font-bold uppercase tracking-wider mb-2 text-stone-900">
          Summary Sections
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 list-decimal list-inside text-stone-700">
          <li>
            <a href="#plain-experience" className="hover:underline">
              Work &amp; Internship History
            </a>
          </li>
          <li>
            <a href="#plain-case-studies" className="hover:underline">
              Case Studies ({CASE_STUDIES.length})
            </a>
          </li>
          <li>
            <a href="#plain-credentials" className="hover:underline">
              Education &amp; Credentials
            </a>
          </li>
          <li>
            <a href="#plain-learning" className="hover:underline">
              Currently Learning
            </a>
          </li>
          <li>
            <a href="#plain-knowledge-graph" className="hover:underline">
              Skills Overview ({NODES.length} Items)
            </a>
          </li>
          <li>
            <a href="#plain-strata" className="hover:underline">
              Educational Walkthrough: Beep to Receipt
            </a>
          </li>
        </ol>
      </nav>

      {/* SECTION 1: WORK HISTORY */}
      <section id="plain-experience" className="mb-14 scroll-mt-10">
        <h2 className="text-xl font-bold font-mono uppercase tracking-wide border-b border-stone-900 pb-2 mb-6">
          1. Work &amp; Internship History
        </h2>
        <div className="space-y-8">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="pb-6 border-b border-stone-200 last:border-b-0 break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                <h3 className="text-lg font-bold text-stone-950 font-mono">
                  {exp.role}
                  {exp.isInternship ? ' (Internship)' : ''}
                </h3>
                <span className="font-mono text-xs font-bold text-stone-700 uppercase">
                  {exp.period}
                </span>
              </div>
              <div className="text-sm font-semibold text-stone-700 mb-3">
                {exp.organization} · {exp.location}
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-stone-800 leading-relaxed mb-4">
                {exp.highlights.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
              <div className="text-xs font-mono text-stone-700">
                {exp.technologies.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: CASE STUDIES */}
      <section id="plain-case-studies" className="mb-14 scroll-mt-10">
        <h2 className="text-xl font-bold font-mono uppercase tracking-wide border-b border-stone-900 pb-2 mb-6">
          2. Case Studies
        </h2>
        <div className="space-y-8">
          {CASE_STUDIES.map((cs) => (
            <div key={cs.id} className="p-5 border border-stone-300 bg-stone-50/50 break-inside-avoid">
              <div className="text-xs font-mono font-bold text-stone-600 uppercase mb-1">
                {cs.organization}
              </div>
              <h3 className="text-base sm:text-lg font-bold font-mono text-stone-900 mb-2">
                {cs.title}
              </h3>

              <div className="space-y-3 text-xs leading-relaxed text-stone-800">
                <div>
                  <strong className="font-mono uppercase text-stone-900">The Situation: </strong>
                  {cs.situation}
                </div>
                <div>
                  <strong className="font-mono uppercase text-stone-900">My Responsibility: </strong>
                  {cs.responsibility}
                </div>
                <div>
                  <strong className="font-mono uppercase text-stone-900 block mb-1">
                    What I Did:{' '}
                  </strong>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    {cs.whatIDid.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>
                {cs.outcome && (
                  <div className="p-3 bg-stone-100 border border-stone-300">
                    <strong className="font-mono uppercase text-stone-900 block mb-1">
                      Outcome:{' '}
                    </strong>
                    <p>{cs.outcome}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: EDUCATION & CREDENTIALS */}
      <section id="plain-credentials" className="mb-14 scroll-mt-10">
        <h2 className="text-xl font-bold font-mono uppercase tracking-wide border-b border-stone-900 pb-2 mb-6">
          3. Education &amp; Credentials
        </h2>
        <div className="space-y-4 text-sm">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between p-3 border border-stone-300 break-inside-avoid">
            <div>
              <div className="font-bold text-stone-900 font-mono">{EDUCATION.degree}</div>
              <div className="text-xs text-stone-600">
                {EDUCATION.institution} · {EDUCATION.period}
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-stone-800 uppercase mt-1 sm:mt-0">
              Diploma
            </span>
          </div>

          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col sm:flex-row sm:items-baseline justify-between p-3 border border-stone-300 break-inside-avoid"
            >
              <div>
                <div className="font-bold text-stone-900 font-mono">{cert.name}</div>
                <div className="text-xs text-stone-600">
                  {cert.issuer} · {cert.note}
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-stone-800 uppercase mt-1 sm:mt-0">
                {cert.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: CURRENTLY LEARNING */}
      <section id="plain-learning" className="mb-14 scroll-mt-10">
        <h2 className="text-xl font-bold font-mono uppercase tracking-wide border-b border-stone-900 pb-2 mb-6">
          4. Currently Learning
        </h2>
        <div className="space-y-4">
          {LEARNING_ENTRIES.map((entry) => (
            <div key={entry.id} className="p-4 border border-stone-300 bg-stone-50">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-mono text-sm font-bold text-stone-900">{entry.topic}</span>
                <span className="px-2 py-0.5 bg-stone-200 text-stone-800 font-mono text-[10px] uppercase font-bold tracking-wider">
                  {entry.status}
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-sans">{entry.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: SKILLS OVERVIEW */}
      <section id="plain-knowledge-graph" className="mb-14 scroll-mt-10">
        <h2 className="text-xl font-bold font-mono uppercase tracking-wide border-b border-stone-900 pb-2 mb-6">
          5. Skills &amp; Application Overview
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-stone-300 font-sans">
            <thead className="bg-stone-100 font-mono uppercase text-stone-900 border-b border-stone-300">
              <tr>
                <th className="p-2.5 border-r border-stone-300">Skill / Area</th>
                <th className="p-2.5 border-r border-stone-300">Category</th>
                <th className="p-2.5 border-r border-stone-300">Where Applied</th>
                <th className="p-2.5">Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {NODES.map((node) => (
                <tr key={node.id} className="hover:bg-stone-50">
                  <td className="p-2.5 font-bold font-mono text-stone-900 border-r border-stone-200 whitespace-nowrap">
                    {node.label}
                  </td>
                  <td className="p-2.5 font-mono text-stone-700 border-r border-stone-200 whitespace-nowrap">
                    {node.category}
                  </td>
                  <td className="p-2.5 text-stone-800 text-xs border-r border-stone-200 leading-relaxed min-w-[220px]">
                    {node.usage || 'Self-directed exploration'}
                  </td>
                  <td className="p-2.5 text-stone-700 leading-relaxed min-w-[240px]">
                    {node.summary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 6: ILLUSTRATIVE WALKTHROUGH */}
      <section id="plain-strata" className="mb-14 scroll-mt-10">
        <h2 className="text-xl font-bold font-mono uppercase tracking-wide border-b border-stone-900 pb-2 mb-2">
          6. Illustrative Walkthrough: Beep to Receipt
        </h2>
        <p className="text-xs text-stone-600 mb-6">
          Educational model illustrating how a checkout scan can move across hardware, software, networks, and people.
        </p>
        <div className="space-y-4">
          {STRATA.map((st, i) => (
            <div key={st.id} className="p-4 border border-stone-300 break-inside-avoid">
              <div className="text-xs font-mono text-stone-600 mb-1">
                LAYER 0{i + 1} · {st.subtitle}
              </div>
              <h3 className="text-base font-bold font-mono text-stone-900 mb-1.5">{st.title}</h3>
              <p className="text-sm leading-relaxed text-stone-700 mb-2">{st.description}</p>
              <div className="text-xs font-mono text-stone-700 bg-stone-100 p-2 border border-stone-200">
                Components: {st.exampleComponents.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="pt-8 border-t-2 border-stone-900 font-mono text-xs text-stone-600 text-center">
        <div>Aries Razak · {PROFILE.title}</div>
      </footer>
    </article>
  );
};
