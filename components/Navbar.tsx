'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLenisScroll } from './SmoothScroll';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenContact: (service?: string) => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const { scrollTo } = useLenisScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Agentic AI', href: '#agentic-ai' },
    { name: 'Process', href: '#process' },
    { name: 'Results', href: '#results' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-3.5 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo with dark text */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center group focus:outline-none rounded-lg p-1 cursor-pointer"
          aria-label="CUBIC.ai Home"
        >
          <div className="relative h-8 w-auto">
            <Image
              src="/assets/logo_crop_dark.png"
              alt="CUBIC.ai Logo"
              width={112}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-medium text-slate-700 hover:text-black transition-colors duration-150"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs - Minimal Black & Outlined */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onOpenContact('General Inquiry')}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-black hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
          >
            Talk to us
          </button>
          <button
            onClick={() => onOpenContact('Project Start')}
            className="bg-black hover:bg-neutral-800 text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm active:scale-95"
          >
            <span>Start a project</span>
            <span className="text-xs">&rarr;</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:text-black focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-white border-b border-slate-100 shadow-lg">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-slate-800 hover:text-black py-1"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact('Talk to us');
                }}
                className="w-full py-2.5 text-xs font-medium border border-slate-200 text-slate-800 rounded-full hover:bg-slate-50"
              >
                Talk to us
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact('Start a project');
                }}
                className="w-full py-2.5 text-xs font-medium bg-black text-white rounded-full hover:bg-neutral-800 flex items-center justify-center gap-1.5"
              >
                <span>Start a project</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
