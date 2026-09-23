import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowUp, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Bangalore is Asia/Kolkata (IST = UTC+5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentTime(now.toLocaleTimeString('en-US', options) + ' IST');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 bg-[#FAFAF9] text-stone-700 text-xs">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        {/* Top Tier */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="space-y-1">
            <span className="font-serif-display text-xl font-semibold text-stone-900">
              Pradeesha S.
            </span>
            <p className="text-stone-500 font-light text-xs">
              AI &amp; Machine Learning Engineer · Bangalore, India
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-stone-600 font-medium">
            <a href="#about" className="hover:text-stone-950 transition-colors">
              About
            </a>
            <a href="#focus" className="hover:text-stone-950 transition-colors">
              Focus
            </a>
            <a href="#projects" className="hover:text-stone-950 transition-colors">
              Projects
            </a>
            <a href="#playground" className="hover:text-stone-950 transition-colors">
              Architecture Lab
            </a>
            <a href="#experience" className="hover:text-stone-950 transition-colors">
              Experience
            </a>
            <button
              onClick={onOpenResume}
              className="hover:text-stone-950 transition-colors underline cursor-pointer"
            >
              Resume
            </button>
          </div>
        </div>

        {/* Bottom Tier: Local Time, Socials & Back to Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-stone-500">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} Pradeesha S.</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved.</span>
            {currentTime && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono-code tabular-nums text-stone-600">
                  Bangalore: {currentTime}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 transition-colors inline-flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="hover:text-stone-900 transition-colors inline-flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
            <button
              onClick={scrollToTop}
              className="hover:text-stone-900 transition-colors inline-flex items-center gap-1 cursor-pointer ml-2"
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
