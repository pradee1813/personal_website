import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Check } from 'lucide-react';

export const SkillsMatrix: React.FC = () => {
  return (
    <section className="py-20 border-b border-stone-200 bg-[#FAFAF9]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-14 space-y-2">
          <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold font-mono-code">
            Technical Repertoire
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight [text-wrap:balance]">
            Tools, architectures &amp; production toolchains.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
            Curated competencies across model formulation, distributed training harnesses, and modern cloud ML runtimes.
          </p>
        </div>

        {/* 4-Box Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PORTFOLIO_DATA.skillsMatrix.map((cat, idx) => (
            <div
              key={cat.title}
              className="p-6 sm:p-7 bg-white border border-stone-200 rounded-2xl space-y-5 shadow-2xs"
            >
              <div className="space-y-1 pb-3 border-b border-stone-100">
                <div className="font-mono-code text-xs text-stone-400">0{idx + 1}.</div>
                <h3 className="font-semibold text-stone-900 text-base sm:text-lg">
                  {cat.title}
                </h3>
                <p className="text-xs text-stone-500 font-light">
                  {cat.description}
                </p>
              </div>

              {/* Clean unboxed item list */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700">
                {cat.items.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="leading-snug">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
