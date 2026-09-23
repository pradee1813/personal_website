import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, Linkedin, MapPin, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white border border-stone-200 rounded-2xl shadow-2xl p-6 sm:p-10 space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 print:hidden">
          <div className="text-xs font-mono-code text-stone-500">
            Curriculum Vitae · Pradeesha S
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-md hover:bg-stone-100 transition-colors"
              aria-label="Close resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="space-y-7 text-stone-900">
          {/* Header */}
          <div className="border-b border-stone-200 pb-5 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="font-serif-display text-3xl sm:text-4xl font-bold tracking-tight">
                {PORTFOLIO_DATA.personal.name}
              </h1>
              <span className="font-mono-code text-sm font-semibold text-stone-700">
                {PORTFOLIO_DATA.personal.title}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 font-mono-code pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                {PORTFOLIO_DATA.personal.location}
              </span>
              <span>·</span>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="flex items-center gap-1 hover:underline text-stone-900"
              >
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                {PORTFOLIO_DATA.personal.email}
              </a>
              <span>·</span>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline text-stone-900"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                linkedin.com/in/pradeesha-s-ai
              </a>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono-code font-bold uppercase tracking-wider text-stone-500">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
              Results-driven Artificial Intelligence &amp; Machine Learning Engineer specializing in generative AI inference architectures, computer vision, and graph optimization algorithms. Proven track record of architecting low-hallucination enterprise RAG platforms, optimizing 70B parameter LLM inference via AWQ quantization, and delivering 60 FPS edge computer vision systems.
            </p>
          </div>

          {/* Core Technical Competencies */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono-code font-bold uppercase tracking-wider text-stone-500">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
              <div>
                <strong className="text-stone-900">Models &amp; Frameworks:</strong> PyTorch, Transformers, vLLM, LangChain, OpenCV, TensorRT, TorchVision, ONNX.
              </div>
              <div>
                <strong className="text-stone-900">Languages &amp; Runtimes:</strong> Python, C++, TypeScript, SQL, CUDA fundamentals, Bash.
              </div>
              <div>
                <strong className="text-stone-900">Generative AI:</strong> RAG (Hybrid BM25 + Vector), LoRA/QLoRA, Prompt Tuning, ChromaDB, FAISS.
              </div>
              <div>
                <strong className="text-stone-900">Systems &amp; Serving:</strong> Continuous Batching, AWQ Quantization, Docker, FastAPI, Ray, Linux.
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono-code font-bold uppercase tracking-wider text-stone-500">
              Engineering &amp; Research Experience
            </h2>
            <div className="space-y-5">
              {PORTFOLIO_DATA.experience.map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                    <div>
                      <strong className="text-stone-900 text-sm">{exp.role}</strong>
                      <span className="text-stone-600 ml-1.5">| {exp.organization}</span>
                    </div>
                    <span className="font-mono-code text-stone-500">{exp.period} · {exp.location}</span>
                  </div>

                  <p className="text-xs text-stone-600 font-light">{exp.description}</p>

                  <ul className="space-y-1 text-xs text-stone-700 pl-3">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="list-disc leading-relaxed">
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects Summary */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono-code font-bold uppercase tracking-wider text-stone-500">
              Key Engineering Projects
            </h2>
            <div className="space-y-3 text-xs">
              {PORTFOLIO_DATA.projects.slice(0, 3).map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-stone-900">{proj.title}</span>
                    <span className="font-mono-code text-stone-500">{proj.year}</span>
                  </div>
                  <p className="text-stone-600 font-light">{proj.summary}</p>
                  <div className="text-[11px] font-mono-code text-stone-500">
                    Tech: {proj.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publications & Academic Honors */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono-code font-bold uppercase tracking-wider text-stone-500">
              Publications &amp; Honors
            </h2>
            <div className="space-y-2 text-xs">
              {PORTFOLIO_DATA.publications.map((pub, idx) => (
                <div key={idx}>
                  <strong className="text-stone-900">{pub.title}</strong>
                  <span className="text-stone-500 ml-1.5">({pub.venue}, {pub.year})</span>
                  <p className="text-stone-600 font-light">{pub.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
