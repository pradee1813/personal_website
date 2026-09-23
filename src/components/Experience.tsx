import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, GraduationCap, Award, BookOpen } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-b border-stone-200 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-2">
          <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold font-mono-code">
            Career &amp; Research Track
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight [text-wrap:balance]">
            Experience, research &amp; academic distinctions.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
            A chronological timeline of engineering leadership, applied research initiatives, and algorithm optimization.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-10">
          {PORTFOLIO_DATA.experience.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 bg-[#FAFAF9] border border-stone-200 rounded-2xl space-y-4 hover:border-stone-400 transition-colors"
            >
              {/* Header row with unboxed metadata */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-200 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-lg sm:text-xl font-semibold text-stone-900">
                    {item.role}
                  </h3>
                  <div className="text-sm font-medium text-stone-700">
                    {item.organization}
                  </div>
                </div>

                {/* Zero-Pill metadata: plain text with dot separators */}
                <div className="flex items-center gap-2 text-xs font-mono-code text-stone-500">
                  <span>{item.period}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.type}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 font-light leading-relaxed">
                {item.description}
              </p>

              {/* Measurable Deliverables / Achievements */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono-code uppercase tracking-wider text-stone-400 font-medium">
                  Key Milestones &amp; Outcomes
                </div>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {item.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2">
                      <span className="text-stone-400 select-none mt-0.5">—</span>
                      <span className="leading-relaxed font-light">{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono-code text-[11px] text-stone-400">Stack:</span>
                {item.skills.map((skill, sIdx) => (
                  <span
                    key={skill}
                    className="font-mono-code text-[11px] text-stone-700 bg-white border border-stone-200 px-2 py-0.5 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Publications & Academic Papers Section */}
        <div className="mt-16 pt-12 border-t border-stone-200">
          <div className="max-w-2xl mb-8 space-y-1">
            <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold font-mono-code">
              Research &amp; Publications
            </div>
            <h3 className="font-serif-display text-2xl text-stone-900 font-normal">
              Peer-reviewed contributions &amp; symposium papers.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.publications.map((pub, pIdx) => (
              <div
                key={pIdx}
                className="p-6 bg-[#FAFAF9] border border-stone-200 rounded-2xl space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-stone-500">
                    <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                    <span>{pub.venue}</span>
                    <span aria-hidden="true">·</span>
                    <span>{pub.year}</span>
                  </div>

                  <h4 className="font-semibold text-stone-900 text-sm sm:text-base leading-snug">
                    {pub.title}
                  </h4>

                  <p className="text-xs text-stone-600 font-light leading-relaxed">
                    {pub.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/80 text-[11px] font-mono-code text-stone-500">
                  Type: {pub.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
