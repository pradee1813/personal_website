import React, { useState } from 'react';
import { ArrowDown, Copy, Check, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="about" className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* Editorial Subtitle & Location Line */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-medium mb-6">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
          <span>Available for AI Engineering & Research</span>
          <span aria-hidden="true">·</span>
          <span>Bangalore, India</span>
          <span aria-hidden="true">·</span>
          <span>GenAI & Computer Vision</span>
        </div>

        {/* Main Grid: Left Typography, Right Portrait & Proof */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bold Headline & Context */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.08] tracking-tight text-stone-900 font-normal [text-wrap:balance]">
              Engineering intelligent systems with <span className="italic font-normal">mathematical rigor</span> and production scale.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-light">
              Hi, I’m <strong className="font-semibold text-stone-900">{PORTFOLIO_DATA.personal.name}</strong> — an Artificial Intelligence &amp; Machine Learning specialist. I bridge foundational graph algorithms and modern foundation models to build verifiable, low-latency AI software that works reliably in production.
            </p>

            {/* Quick Action Affordances */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors shadow-xs"
              >
                <span>View Selected Works</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-800 bg-white border border-stone-300 rounded-lg hover:border-stone-400 hover:bg-stone-50 transition-colors shadow-xs"
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:border-stone-400 hover:bg-stone-50 transition-colors shadow-xs"
                title="Click to copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-500" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Contact Line */}
            <div className="pt-2 flex items-center gap-2 text-xs text-stone-500">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              <span>Direct:</span>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="text-stone-800 hover:underline font-mono-code"
              >
                {PORTFOLIO_DATA.personal.email}
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Portrait Card & Evidence Stats */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-100">
                {!imageError ? (
                  <img
                    src="/src/assets/images/pradeesha_portrait_1790162617646.jpg"
                    alt="Pradeesha S — AI & Machine Learning Engineer"
                    className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    referrerPolicy="no-referrer"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  /* Fallback container adhering to Zero-Broken-Image Policy */
                  <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-500 p-6 text-center">
                    <span className="font-serif-display text-4xl text-stone-800 font-bold mb-2">PS</span>
                    <span className="text-xs font-medium text-stone-600">Pradeesha S</span>
                    <span className="text-[11px] text-stone-400">AI &amp; Machine Learning Engineer</span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm border border-stone-200/80 rounded-lg py-2 px-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-stone-900">Pradeesha S.</span>
                    <span className="text-stone-500 font-mono-code text-[11px]">AI Systems &amp; Vision</span>
                  </div>
                </div>
              </div>

              {/* Adjacent Quantitative Proof Grid */}
              <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-2 gap-4">
                {PORTFOLIO_DATA.personal.stats.map((stat, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="font-mono-code text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-xs text-stone-500 leading-snug">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credential statement without pills */}
            <div className="p-4 bg-stone-100/60 border border-stone-200/80 rounded-xl text-xs text-stone-600 space-y-1">
              <div className="font-medium text-stone-800">Key Domain Focus</div>
              <p className="leading-relaxed">
                Hands-on with PyTorch, vLLM continuous batching, quantized inference (AWQ/GPTQ), TensorRT edge acceleration, and hybrid vector-BM25 retrieval architectures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
