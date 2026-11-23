# GDG on Campus RV College of Engineering (GDG RVCE)
### Interface Unlocked UI Design Challenge — Production Engineering Submission

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.1-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

An award-winning, studio-grade frontend platform built for the **GDG on Campus RV College of Engineering (GDG RVCE) — Interface Unlocked UI Design Challenge**.

---

## 🏛️ Architectural Foundations & Phase 1 Highlights

- **Exact Route Scope:** Strict, compliant implementation of the three official pages:
  - `/` — Home (Hero marquee, Google 4-colour pillars, bespoke developer emote gallery)
  - `/events` — Events & Sprints (Flagship hackathons, codelabs, study jams with 16:9 vector artwork)
  - `/team` — Core Team (Bauhaus developer portraits, engineering domain tracks, fictional roster)
- **Dual-Theme Design Token Engine:**
  - **Daylight Blueprint (`light`):** Architectural engineering blueprint aesthetic on `#FAFAFB` canvas with high-contrast text and subtle 32px coordinate dot grid.
  - **Obsidian IDE (`dark`):** Deep slate `#0A0D12` canvas with glowing Google brand accents, zero flash on initial load via synchronous inline script.
- **Official Google Brand Fidelity:**
  - Google Blue (`#4285F4`) — Workshops, Core Tech, Primary CTAs
  - Google Red (`#EA4335`) — Hackathons, Flagship Sprints, Map Pins
  - Google Yellow (`#FBBC04`) — Study Jams, Keynotes (always paired with `#111827` dark ink for >7:1 WCAG AAA contrast)
  - Google Green (`#34A853`) — Open Source, CI/CD, Community Builds
  - Authentic geometric GDG `< >` rounded chevron emblem.
- **Local Visual Asset Studio (`scripts/generate-visual-assets.mjs`):**
  - Generates 31 multi-layered, production-grade vector SVG assets locally with zero external network dependencies:
    - `public/assets/brand/gdg-rvce-mark.svg` — Official GDG `< >` chevron logo
    - `public/assets/emotes/` — 12 developer emotes & sticker badges (128x128)
    - `public/assets/covers/` — 8 architectural 16:9 vector event illustrations (1200x675)
    - `public/assets/avatars/` — 10 Bauhaus-inspired geometric developer portraits (240x240)
- **Global Navigation Shell:**
  - `Navbar` — Sticky glassmorphic bar with spring active indicator, theme toggle, mobile drawer.
  - `CommandPalette` — Keyboard-first modal (`⌘K` / `Ctrl+K`) with fuzzy navigation, theme switching, and Google 4-colour confetti celebrations.
  - `ScrollProgressBar` — Dynamic 3px viewport indicator driven by Framer Motion spring physics.
  - `Footer` — Architectural footer with RVCE campus coordinates (`12.9237° N, 77.4987° E`), mandatory independence disclaimer, and open-source attributions dialog.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Local Vector Assets
```bash
npm run assets:build
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production
```bash
npm run build
```

---

## ⚖️ Brand Compliance & Disclaimers
GDG on Campus RVCE is an independent student developer community and is not an official Google product.
All student names, events, and schedules presented are sample demonstration data.

---

Crafted with passion by the student builders of **GDG on Campus RV College of Engineering (GDG RVCE)**.
