# CUBIC.ai — Flagship Marketing Platform

Award-level single-page marketing website for **CUBIC.ai**, engineered with Next.js (App Router), TypeScript, Tailwind CSS, GSAP, ScrollTrigger, and Lenis smooth scrolling.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
The site will run at `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
npm start
```

---

## 🎨 Brand Color Theme

All brand colors are extracted from the glossy iridescent emblem and declared as CSS variables in `app/globals.css`:

| Variable | Hex Code | Description |
|---|---|---|
| `--midnight` | `#070B1F` | Dark hero, footer, and section backgrounds |
| `--indigo` | `#0F1646` | Dark surface cards & live runtime panel |
| `--royal` | `#2B3BE0` | Primary brand accent & button gradient start |
| `--cyan` | `#22C7F5` | Highlight accent & glow effects |
| `--violet` | `#7C5CFF` | Secondary accent & gradient midpoint |
| `--orchid` | `#D17BEA` | Soft pink-purple accent & glow highlights |
| `--mist` | `#EEF1FF` | Light section background (Services, Process) |
| `--white` | `#FFFFFF` | Card surface on light sections & primary text on dark |
| `--ink` | `#0B1030` | High-contrast body text on light backgrounds |
| `--muted` | `#5A6285` | Secondary text on light backgrounds |

To customize colors, edit the `:root` variables in [`app/globals.css`](file:///c:/Users/ANIRUDH/Downloads/cubic/app/globals.css).

---

## 🛠️ How to Edit Content & Copy

Each section of the page is modularized into component files under `/components`:

1. **Navbar** ([`components/Navbar.tsx`](file:///c:/Users/ANIRUDH/Downloads/cubic/components/Navbar.tsx)):
   - Nav links, logo sizing, sticky blur threshold, CTA actions.
2. **Hero** ([`components/Hero.tsx`](file:///c:/Users/ANIRUDH/Downloads/cubic/components/Hero.tsx)):
   - Headlines ("Websites. Agentic AI. Mobile apps. Built to scale."), subtext, trust indicators, floating 3D logo, and live swarm terminal.
3. **Services Ticker** ([`components/Ticker.tsx`](file:///c:/Users/ANIRUDH/Downloads/cubic/components/Ticker.tsx)):
   - Continuous marquee items with scroll velocity acceleration.
4. **Services Grid** ([`components/Services.tsx`](file:///c:/Users/ANIRUDH/Downloads/cubic/components/Services.tsx)):
   - The 4 core service cards: Websites & Web Apps, Agentic AI & Custom LLMs, Android & iOS Mobile Apps, Custom Software & APIs.
5. **Agentic AI Section** ([`components/AgenticAI.tsx`](file:///c:/Users/ANIRUDH/Downloads/cubic/components/AgenticAI.tsx)):
   - Checklist items, live interactive `CUBIC_SWARM_RUNTIME` step simulator with pause/run and reset controls.
6. **Process Section** ([`components/Process.tsx`](file:///c:/Users/ANIRUDH/Downloads/cubic/components/Process.tsx)):
   - 4-phase lifecycle (Discover, Design, Build, Launch & Grow). Pinned horizontal scroll on desktop, vertical stack on mobile.
7. **Results & Metrics** ([`components/Results.tsx`](file:///c:/Users/ANIRUDH/Downloads/cubic/components/Results.tsx)):
   - 4 animated stat counters (99.98% uptime, 4.2x velocity, 50M+ requests, 100+ shipped).
8. **Final CTA** ([`components/FinalCTA.tsx`](file:///c:/Users/ANIRUDH/Downloads/cubic/components/FinalCTA.tsx)):
   - High-impact closing callout and email trigger.
9. **Footer** ([`components/Footer.tsx`](file:///c:/Users/ANIRUDH/Downloads/cubic/components/Footer.tsx)):
   - Multi-column footer links, social SVG icons, back-to-top trigger, copyright.
10. **Contact Modal** ([`components/ContactModal.tsx`](file:///c:/Users/ANIRUDH/Downloads/cubic/components/ContactModal.tsx)):
    - Interactive scoping form for lead capture.

---

## ⚡ Animation & Smooth Scroll Details

- **Lenis Smooth Scroll**: Integrated with GSAP's ticker in [`components/SmoothScroll.tsx`](file:///c:/Users/ANIRUDH/Downloads/cubic/components/SmoothScroll.tsx):
  ```ts
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  ```
- **Accessibility (`prefers-reduced-motion`)**: Automatically disables Lenis and GSAP animations when the user has reduced motion enabled in their OS.
- **Progressive Enhancement**: Content remains completely visible and accessible even if JavaScript is disabled.

---

## 📁 Logo & Favicon Assets

- Transparent emblem: [`assets/logo.png`](file:///c:/Users/ANIRUDH/Downloads/cubic/assets/logo.png) & [`public/assets/logo.png`](file:///c:/Users/ANIRUDH/Downloads/cubic/public/assets/logo.png)
- 512px High-Res Favicon: [`assets/favicon-512.png`](file:///c:/Users/ANIRUDH/Downloads/cubic/assets/favicon-512.png) & [`public/favicon.png`](file:///c:/Users/ANIRUDH/Downloads/cubic/public/favicon.png)
