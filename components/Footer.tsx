'use client';

import React from 'react';
import Image from 'next/image';
import { useLenisScroll } from './SmoothScroll';
import { Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenContact: (service?: string) => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  const { scrollTo } = useLenisScroll();

  const serviceLinks = [
    { name: 'Websites & Web Apps', href: '#services' },
    { name: 'Agentic AI Swarms', href: '#agentic-ai' },
    { name: 'iOS & Android Apps', href: '#services' },
    { name: 'Custom Cloud Software', href: '#services' },
    { name: 'Enterprise RAG Systems', href: '#agentic-ai' },
  ];

  const companyLinks = [
    { name: 'Engineering Philosophy', href: '#process' },
    { name: 'Case Studies', href: '#results' },
    { name: 'Development Lifecycle', href: '#process' },
    { name: 'Client Results', href: '#results' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070B1F] text-slate-400 border-t border-cyan-500/15 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleBackToTop();
              }}
              className="flex items-center mb-5 group cursor-pointer"
              aria-label="CUBIC.ai Home"
            >
              <div className="relative h-10 w-auto transition-transform group-hover:scale-105">
                <Image
                  src="/assets/logo_crop.png"
                  alt="CUBIC.ai Logo"
                  width={134}
                  height={40}
                  className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(34,199,245,0.35)]"
                />
              </div>
            </a>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              Engineering high-performance web applications, intelligent agentic AI swarms, fluid mobile experiences, and mission-critical custom enterprise software.
            </p>

            {/* Social SVGs */}
            <div className="flex items-center gap-3">
              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors text-slate-300"
                aria-label="CUBIC.ai GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors text-slate-300"
                aria-label="CUBIC.ai Twitter/X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors text-slate-300"
                aria-label="CUBIC.ai LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              {/* Email */}
              <a
                href="mailto:info.cubicteam@gmail.com"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors text-slate-300"
                aria-label="Email CUBIC.ai"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 sm:col-span-1">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 sm:col-span-1">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Start Building
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Have a scoped requirement or an early prototype? We will review your architecture and provide an estimate within 24 hours.
            </p>
            <button
              onClick={() => onOpenContact('Project Start from Footer')}
              className="btn-primary px-5 py-2.5 text-xs w-full flex items-center justify-center cursor-pointer"
            >
              Request Scoping Call
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CUBIC.ai Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Portal</span>
            <button
              onClick={handleBackToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
