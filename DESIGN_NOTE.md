# Design Note — GDG on Campus RV College of Engineering (GDG RVCE)

**Challenge:** Interface Unlocked · UI Design Challenge | **Author:** Prabhjot Singh  
**Live Prototype:** https://gdg-rvce-interface-unlocked.vercel.app | **Repository:** https://github.com/Code-with-Prabhjot/gdg-rvce-interface-unlocked

### 1. Visual Direction & Community Fit
To represent **GDG on Campus RV College of Engineering (`GDG RVCE`)**, we rejected generic corporate templates and low-contrast glassmorphism in favour of an **Architectural Blueprint & Kinetic Canvas**. Grounded in Swiss drafting systems—strict 8-pixel spacing rhythms, crisp hairline borders, and disciplined typographic hierarchy—every screen frames student software engineering like a real production release.
- **Home (`/`):** Opens with an interactive real-time 3D `< >` chevron prism, live flagship countdown, four hands-on engineering pillar simulators (Cloud, Hackathons, Study Jams, Open Source), a four-stage Learning Tracks roadmap, and a 10-scene campus studio gallery.
- **Events (`/events`):** Combines instant multi-track search, Grid / Schedule List / Calendar Matrix views, one-click `.ics` calendar export, and an Event Detail Drawer with on-site registration that generates persistent, phone-scannable four-colour QR sample passes.
- **Team (`/team`):** Features dual-sided builder cards (flipping between Profile and Technical Spec), a detailed Builder Drawer, a Cross-Vertical Collaboration Matrix, and an interactive Chapter Circuit Topology.

### 2. Colour System, Dual Themes & Typography
Our palette maps Google's four official colours semantically across both **Daylight Blueprint** (a crisp `#FAFAFB` drafting grid) and **Obsidian IDE** (`#0A0D12` dark developer canvas), paired with WCAG AA/AAA calibrated ink tokens (`4.5:1` to `10:1` contrast) so every button, badge, and four-stop gradient stays effortless to read:
- **Google Blue (`#4285F4`):** Core workshops, systems labs, and active navigation states.
- **Google Red (`#EA4335`):** Flagship hackathons, build sprints, and urgent countdowns.
- **Google Yellow (`#FBBC04`):** Study jams, community keynotes, and design tracks—strictly paired with `#111827` dark ink or high-contrast amber tokens on light surfaces.
- **Google Green (`#34A853`):** Open-source releases, verified QR passes, and live API health indicators.

Typography pairs **Space Grotesk** for architectural display headings, **Plus Jakarta Sans** for clean UI readability, and **JetBrains Mono** for telemetry, schedules, and code specifications.

### 3. Brand Compliance, Accessibility & Scalability
Every screen strictly honours Interface Unlocked rules and Google community guidelines: the separated four-colour `< >` chevron mark maintains clear breathing room across 51 original vector illustrations, favicons, and `1200×630` social preview cards; chapter naming consistently reads **"GDG on Campus RV College of Engineering"** or **"GDG RVCE"** alongside an explicit footer independence disclaimer; and all content uses 100% fictional sample data with zero analytics, RSVP counters, attendee lists, or live chat. Built with modular components and design tokens in **Next.js 15, React 19, and Tailwind CSS v4**, this three-page foundation is engineered to scale cleanly into the full GDG RVCE chapter platform across mobile (`320px`, `44×44px` touch targets) and desktop (`2560px`).
