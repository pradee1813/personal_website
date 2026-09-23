import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, CheckCircle2, ArrowRight } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-stone-200 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
          <div className="space-y-1">
            {/* Unboxed metadata */}
            <div className="flex items-center gap-2 text-xs font-mono-code text-stone-500">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
              <span aria-hidden="true">·</span>
              <span>Role: {project.role}</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-stone-900 font-semibold leading-tight">
              {project.title}
            </h2>
            <p className="text-sm text-stone-600 font-light leading-relaxed">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors shrink-0"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Image Banner */}
        <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
          {!imgError ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-50 text-stone-400">
              <span className="font-serif-display text-2xl text-stone-700 font-medium">
                {project.title}
              </span>
              <span className="text-xs text-stone-500 mt-1">Architecture &amp; System Schematics</span>
            </div>
          )}
        </div>

        {/* Quantified Outcomes / Metrics Strip */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="space-y-0.5 text-center">
              <div className="font-mono-code text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                {metric.value}
              </div>
              <div className="text-[11px] sm:text-xs text-stone-500">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Problem Statement & Architecture */}
        <div className="space-y-5 text-sm leading-relaxed">
          <div>
            <h4 className="font-mono-code text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1.5">
              The Engineering Problem
            </h4>
            <p className="text-stone-700 font-light">{project.problem}</p>
          </div>

          <div>
            <h4 className="font-mono-code text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1.5">
              Architectural Solution
            </h4>
            <p className="text-stone-700 font-light">{project.architecture}</p>
          </div>

          <div>
            <h4 className="font-mono-code text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2">
              Key Technical Breakthroughs
            </h4>
            <ul className="space-y-2 text-stone-700">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack rendered as clean unboxed typography */}
          <div className="pt-2">
            <h4 className="font-mono-code text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-700">
              {project.technologies.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span className="font-mono-code bg-stone-100 text-stone-800 px-2 py-0.5 rounded text-[11px]">
                    {tech}
                  </span>
                  {idx < project.technologies.length - 1 && (
                    <span className="text-stone-300">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-stone-500">
            Engineered by <strong className="text-stone-800">Pradeesha S</strong>
          </div>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-md hover:border-stone-400 hover:bg-stone-50 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repository</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
            )}

            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-medium text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
