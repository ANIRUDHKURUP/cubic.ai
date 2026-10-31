import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  metadataBase: new URL('https://cubic.ai'),
  title: 'CUBIC.ai — Websites. Agentic AI. Mobile apps. Built to scale.',
  description:
    'Award-winning engineering company building high-performance web applications, autonomous agentic AI swarms, native mobile apps, and scalable custom enterprise software.',
  keywords: [
    'CUBIC.ai',
    'Agentic AI',
    'Custom Software',
    'Web Development',
    'Mobile Apps',
    'AI Agents',
    'SaaS Development',
  ],
  authors: [{ name: 'CUBIC.ai Engineering Team' }],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'CUBIC.ai — Websites. Agentic AI. Mobile apps. Built to scale.',
    description:
      'We engineer high-performance web platforms, autonomous AI swarms, fluid mobile applications, and enterprise custom software.',
    url: 'https://cubic.ai',
    siteName: 'CUBIC.ai',
    images: [
      {
        url: '/assets/logo.png',
        width: 512,
        height: 512,
        alt: 'CUBIC.ai Glossy Iridescent Emblem',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-cyan-500/30 selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
