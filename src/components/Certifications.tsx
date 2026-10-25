import React from 'react';
import { CERTIFICATIONS, EDUCATION_DATA } from '../data/portfolioData';
import { Award, GraduationCap, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-400 uppercase mb-3">
            <span>Accreditation & Academics</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
            Education & Certifications
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Formally earned credentials and ongoing professional development in cloud infrastructure, service management, and computer science.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Formal Education */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-sky-400 block">Formal Education</span>
                <span className="text-xs text-slate-400 font-mono">{EDUCATION_DATA.period}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 leading-snug">
              {EDUCATION_DATA.degree}
            </h3>

            <p className="text-sm font-medium text-slate-300 mb-1">
              {EDUCATION_DATA.institution}
            </p>
            <p className="text-xs text-slate-400 mb-6">
              {EDUCATION_DATA.location}
            </p>

            <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                Coursework & Foundations
              </span>
              {EDUCATION_DATA.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Professional Certifications & In-Progress Study */}
          <div className="lg:col-span-7 space-y-4">
            {CERTIFICATIONS.map((cert) => {
              const isCertified = cert.status === 'Certified';
              const isInProgress = cert.status === 'In Progress';

              return (
                <div
                  key={cert.name}
                  className={`p-5 sm:p-6 rounded-xl border transition-all ${
                    isCertified
                      ? 'bg-slate-900/80 border-sky-500/30'
                      : isInProgress
                      ? 'bg-slate-900/50 border-amber-500/30'
                      : 'bg-slate-900/50 border-slate-800/80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {isCertified ? (
                          <Award className="w-5 h-5 text-sky-400" />
                        ) : isInProgress ? (
                          <Clock className="w-5 h-5 text-amber-400" />
                        ) : (
                          <Sparkles className="w-5 h-5 text-indigo-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white leading-snug">
                          {cert.name}
                        </h4>
                        <span className="text-xs text-slate-400 block mt-0.5">
                          {cert.issuer}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-mono px-2.5 py-0.5 rounded self-start shrink-0 font-medium ${
                        isCertified
                          ? 'text-sky-300 bg-sky-950/70 border border-sky-700/50'
                          : isInProgress
                          ? 'text-amber-300 bg-amber-950/70 border border-amber-700/50'
                          : 'text-indigo-300 bg-indigo-950/70 border border-indigo-700/50'
                      }`}
                    >
                      {cert.dateOrStatus}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    {cert.description}
                  </p>

                  {cert.credentialNote && (
                    <div className="mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400 italic">
                      "{cert.credentialNote}"
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
