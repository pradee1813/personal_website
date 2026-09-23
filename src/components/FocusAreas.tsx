import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Sparkles, Eye, Cpu, CheckCircle2 } from 'lucide-react';

export const FocusAreas: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Sparkles className="w-5 h-5 text-stone-800" />;
      case 1:
        return <Eye className="w-5 h-5 text-stone-800" />;
      default:
        return <Cpu className="w-5 h-5 text-stone-800" />;
    }
  };

  return (
    <section id="focus" className="py-20 border-b border-stone-200 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-2">
          <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold font-mono-code">
            Core Disciplines
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight [text-wrap:balance]">
            Where theory meets production infrastructure.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
            I specialize in the intersection of mathematical foundations, foundation model adaptation, and low-latency edge deployment.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {PORTFOLIO_DATA.focusAreas.map((area, idx) => (
            <div
              key={area.index}
              className="group flex flex-col justify-between p-6 sm:p-7 bg-[#FAFAF9] border border-stone-200 rounded-2xl transition-all duration-200 hover:border-stone-400 hover:shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="font-mono-code text-sm font-semibold text-stone-400 group-hover:text-stone-900 transition-colors">
                    {area.index}.
                  </span>
                  <div className="p-2 rounded-lg bg-white border border-stone-200/80 shadow-2xs">
                    {getIcon(idx)}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-stone-900 tracking-tight leading-snug">
                  {area.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  {area.description}
                </p>
              </div>

              {/* Deliverables list with clean typographic markers */}
              <div className="mt-6 pt-5 border-t border-stone-200 space-y-2.5">
                <div className="text-[11px] font-mono-code uppercase tracking-wider text-stone-400 font-medium">
                  Key Technical Focus
                </div>
                <ul className="space-y-2 text-xs text-stone-700">
                  {area.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
