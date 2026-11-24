# Design Note — GDG on Campus RV College of Engineering (Interface Unlocked)

### 1. Visual Direction & Community Fit
To represent RV College of Engineering's premier developer community, we rejected superficial glassmorphism and generic corporate SaaS aesthetics in favour of an **Architectural Blueprint & Kinetic Canvas**. RVCE is renowned for technical discipline; its student chapter required an interface authentic to modern software engineering. We drew upon Swiss design principles—rigorous 8-pixel grids, asymmetric information density, and precise technical borders—married with interactive telemetry. Code primitives, campus coordinates (`12.9237° N, 77.4987° E`), 4 interactive Bento simulators, developer diagnostics (Backend API Inspector, Blueprint X-Ray, CLI terminal), an HTML5 constellation canvas, and spring-physics 3D prisms turn passive visitors into engaged contributors. The experience honors student craft by presenting community initiatives as production-grade software releases rather than promotional announcements.

### 2. Colour & Typography System
Our visual hierarchy is anchored by strict semantic governance of Google's four official brand colours:
- **Google Blue (`#4285F4`):** Core technical workshops, architecture deep dives, and primary navigation states.
- **Google Red (`#EA4335`):** Flagship hackathons, live sprint badges, campus geolocation pins, and urgent countdowns.
- **Google Yellow (`#FBBC04`):** Study jams, community keynotes, and sprint badges. Critically, to eliminate low-contrast accessibility failures on bright backgrounds, yellow fills are universally paired with `#111827` dark ink, exceeding 7:1 contrast for strict WCAG AAA compliance.
- **Google Green (`#34A853`):** Open-source builds, CI/CD telemetry, verified pass badges, and Git status indicators.

These accents operate across dual high-contrast themes: **Daylight Blueprint** (drafting table canvas with 32px blueprint grid lines) and **Obsidian IDE** (deep `#0A0D12` developer editor palette with zero-flash client initialization). Typography pairs **Space Grotesk** for confident architectural headings, **Plus Jakarta Sans** for neutral editorial readability, and **JetBrains Mono** for code specs, status telemetry, and CLI interactions.

### 3. GDG Brand Guidelines & Ground-Rule Compliance
The platform complies fully with Interface Unlocked challenge rules and Google developer community policies. The official GDG `< >` chevron mark preserves geometric proportions and isolated breathing room. Chapter identity consistently adheres to official naming: *"GDG on Campus RV College of Engineering"* and *"GDG RVCE"*. The mandatory independence disclaimer is prominently integrated into the footer. Every event, speaker, and team profile uses fictional sample data. In accordance with competition ground rules, all analytics trackers, attendee counts, RSVP tally bars, and comment streams are completely absent. Built with Next.js 15 App Router, React 19, Tailwind CSS v4, and stateless backend API routes, the architecture delivers a zero-overflow, keyboard-accessible foundation ready for the GDG RVCE build team.
