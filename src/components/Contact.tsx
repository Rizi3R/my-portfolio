import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Linkedin, Copy, Check, ArrowUpRight, Send, MessageSquare, Terminal } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('Application Support Role');

  const topics = [
    { id: 'app-support', label: 'Application Support Role', subject: 'Opportunity: Application Support Specialist / Systems Analyst' },
    { id: 'it-ops', label: 'IT Operations & Service Desk', subject: 'Inquiry: IT Operations & Systems Support Role' },
    { id: 'business-systems', label: 'Business Systems / SaaS', subject: 'Opportunity: Business Systems & SaaS Administrator' },
    { id: 'infrastructure', label: 'IT Infrastructure & Network', subject: 'Inquiry: IT Infrastructure & Network Support' },
    { id: 'general', label: 'Professional Networking', subject: 'Connecting: Professional IT Networking' },
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const currentTopic = topics.find((t) => t.label === selectedSubject) || topics[0];
  const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(currentTopic.subject)}`;

  return (
    <section id="contact" className="py-20 lg:py-28 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Chapter Label */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-400 uppercase mb-3">
            <span>Chapter 06</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>The Next Mission</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
            Have a technical challenge worth solving?
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            I'm interested in opportunities where I can support business-critical systems, solve practical technical problems, and continue growing across IT operations and application systems.
          </p>
        </div>

        {/* 2-Column Contact Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Links & Email Copy */}
          <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white mb-2">
                Connect Directly
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether you have an open position in application support, systems operations, or IT infrastructure, feel free to reach out directly via email or LinkedIn.
              </p>
            </div>

            {/* Email Box with One-Click Copy */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-slate-400 block">Primary Email</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-xs sm:text-sm font-mono text-white hover:text-sky-300 transition-colors truncate block"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-all shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 ${
                  copied
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700/60'
                }`}
                aria-label="Copy email address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to clipboard!' : 'Copy Email'}</span>
              </button>
            </div>

            {/* LinkedIn Profile Box */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">LinkedIn Profile</span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    linkedin.com/in/aries-razak-a36045256
                  </span>
                </div>
              </div>

              <a
                href={PERSONAL_INFO.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-md transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <span>View Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p>📍 Location: {PERSONAL_INFO.location}</p>
              <p>📞 Phone: {PERSONAL_INFO.phone}</p>
              <p>🕒 Response time: Typically within 24 hours</p>
              <p>📄 Full contact details & references available upon interview request</p>
            </div>
          </div>

          {/* Right Column: Pre-Configured Message Composer */}
          <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-sky-400" />
                <h3 className="text-base font-bold text-white">
                  Quick Email Composer
                </h3>
              </div>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                Select your inquiry role below to instantly open your email client with an organized subject line:
              </p>

              {/* Topic Selector */}
              <div className="space-y-2 mb-5">
                {topics.map((t) => (
                  <label
                    key={t.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedSubject === t.label
                        ? 'bg-sky-500/10 border-sky-500/40 text-white'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="email-topic"
                      value={t.label}
                      checked={selectedSubject === t.label}
                      onChange={() => setSelectedSubject(t.label)}
                      className="accent-sky-400 w-4 h-4"
                    />
                    <span className="text-xs font-medium text-slate-200">
                      {t.label}
                    </span>
                  </label>
                ))}
              </div>

              {/* Live Preview of Subject Line */}
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 mb-6">
                <span className="text-slate-400">Subject: </span>
                <span className="text-sky-300 font-medium">{currentTopic.subject}</span>
              </div>
            </div>

            <a
              href={mailtoLink}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-md transition-colors shadow-md shadow-sky-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <Send className="w-4 h-4" />
              <span>Launch Email to Aries</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
