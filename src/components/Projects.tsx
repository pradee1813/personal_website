import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'GenAI & LLMs', 'Computer Vision', 'Applied ML & Graphs', 'Systems'];

  const filteredProjects = useMemo(() => {
    return PORTFOLIO_DATA.projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-20 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold font-mono-code">
              Selected Works &amp; Systems
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight [text-wrap:balance]">
              Production implementations &amp; algorithms.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
              Explore deep learning pipelines, quantized inference microservices, and graph optimization solvers engineered for measurable performance.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stack, title or problem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:border-stone-900 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Interactive Segmented Filter Controls (Buttons adhering to Zero-Pill Section A) */}
        <div className="flex items-center gap-1 p-1 bg-stone-100/90 border border-stone-200 rounded-xl mb-10 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center bg-white border border-dashed border-stone-300 rounded-2xl space-y-3">
            <p className="text-stone-600 text-sm">No projects match the selected filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-medium text-stone-800 bg-stone-100 rounded-md hover:bg-stone-200"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredProjects.map((project, idx) => {
              const isLarge = idx === 0 && selectedCategory === 'All' && !searchQuery;

              return (
                <div
                  key={project.id}
                  onClick={() => setActiveModalProject(project)}
                  className={`group cursor-pointer bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-stone-400 transition-all duration-200 hover:shadow-sm flex flex-col justify-between ${
                    isLarge ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className={`${isLarge ? 'grid grid-cols-1 lg:grid-cols-12 gap-6' : ''}`}>
                    {/* Visual Media Slot */}
                    <div
                      className={`relative aspect-16/9 overflow-hidden bg-stone-100 ${
                        isLarge ? 'lg:col-span-6 lg:h-full' : ''
                      }`}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors" />
                    </div>

                    {/* Content Body */}
                    <div
                      className={`p-6 sm:p-7 flex flex-col justify-between ${
                        isLarge ? 'lg:col-span-6' : ''
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Unboxed Metadata Header (NO PILLS) */}
                        <div className="flex items-center gap-2 text-xs font-mono-code text-stone-500">
                          <span>{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.year}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.role}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight group-hover:text-stone-700 transition-colors">
                          {project.title}
                        </h3>

                        {/* Summary */}
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                          {project.summary}
                        </p>
                      </div>

                      {/* Quantified Metrics */}
                      <div className="mt-6 pt-4 border-t border-stone-100 grid grid-cols-3 gap-2 text-center">
                        {project.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="space-y-0.5">
                            <div className="font-mono-code text-base sm:text-lg font-bold text-stone-900 tabular-nums">
                              {m.value}
                            </div>
                            <div className="text-[10px] text-stone-400 uppercase tracking-tight">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tech stack & Action Button */}
                      <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2 text-xs">
                        <div className="text-[11px] font-mono-code text-stone-500 truncate max-w-[70%]">
                          {project.technologies.slice(0, 3).join(' · ')}
                          {project.technologies.length > 3 && ' · +more'}
                        </div>

                        <span className="inline-flex items-center gap-1 font-medium text-stone-900 group-hover:translate-x-0.5 transition-transform text-xs">
                          <span>Read Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Project Case Study Deep Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
