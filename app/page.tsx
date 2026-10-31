'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Services from '@/components/Services';
import AgenticAI from '@/components/AgenticAI';
import Process from '@/components/Process';
import FinalCTA from '@/components/FinalCTA';
import TerminalContact from '@/components/TerminalContact';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Websites and web apps');

  const handleOpenContact = (service?: string) => {
    if (service) {
      setSelectedService(service);
    }
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <main className="relative min-h-screen bg-white text-[#0B1030]">
      {/* Sticky Top Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* 1. Hero Section */}
      <Hero onOpenContact={handleOpenContact} />

      {/* 2. Ticker Strip */}
      <Ticker />

      {/* 3. Core Services Section */}
      <Services onOpenContact={handleOpenContact} />

      {/* 4. Agentic AI Deep Dive Section */}
      <AgenticAI onOpenContact={handleOpenContact} />

      {/* 5. Horizontal Pinned Process Section */}
      <Process />

      {/* 6. Final High-Impact CTA */}
      <FinalCTA onOpenContact={handleOpenContact} />

      {/* 8. Terminal Contact Form */}
      <TerminalContact />

      {/* 9. Multi-Column Engineering Footer */}
      <Footer onOpenContact={handleOpenContact} />

      {/* Interactive Project Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={handleCloseContact}
        defaultService={selectedService}
      />
    </main>
  );
}
