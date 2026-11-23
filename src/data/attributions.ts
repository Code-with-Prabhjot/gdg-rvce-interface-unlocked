export interface AttributionItem {
  name: string;
  category: 'Typography' | 'Icons' | 'Motion & Animation' | 'Visual Assets' | 'Framework';
  license: string;
  sourceUrl: string;
  description: string;
}

export const OPEN_SOURCE_ATTRIBUTIONS: AttributionItem[] = [
  {
    name: 'Space Grotesk',
    category: 'Typography',
    license: 'SIL Open Font License 1.1',
    sourceUrl: 'https://fonts.google.com/specimen/Space+Grotesk',
    description: 'Proportional, display-grade geometric sans-serif designed by Florian Karsten, based on Space Mono.'
  },
  {
    name: 'Plus Jakarta Sans',
    category: 'Typography',
    license: 'SIL Open Font License 1.1',
    sourceUrl: 'https://fonts.google.com/specimen/Plus+Jakarta+Sans',
    description: 'Clean, modern body typography family designed by Tokotype for optimal legibility across high-density interfaces.'
  },
  {
    name: 'JetBrains Mono',
    category: 'Typography',
    license: 'SIL Open Font License 1.1',
    sourceUrl: 'https://fonts.google.com/specimen/JetBrains+Mono',
    description: 'Monospaced typeface crafted specifically for developers, technical coordinates, code snippets, and badge metadata.'
  },
  {
    name: 'Lucide Icons',
    category: 'Icons',
    license: 'ISC License',
    sourceUrl: 'https://lucide.dev',
    description: 'Community-crafted, razor-sharp icon set providing clean visual signifiers for UI actions, theme toggles, and navigation.'
  },
  {
    name: 'Phosphor Icons',
    category: 'Icons',
    license: 'MIT License',
    sourceUrl: 'https://phosphoricons.com',
    description: 'Flexible, cohesive icon system utilized for developer emotes, social badges, and technical UI indicators.'
  },
  {
    name: 'Framer Motion',
    category: 'Motion & Animation',
    license: 'MIT License',
    sourceUrl: 'https://www.framer.com/motion/',
    description: 'Production-ready declarative spring physics and motion engine powering route transitions, scroll bars, and layout pills.'
  },
  {
    name: 'canvas-confetti',
    category: 'Motion & Animation',
    license: 'ISC License',
    sourceUrl: 'https://github.com/catdad/canvas-confetti',
    description: 'High-performance HTML5 canvas confetti celebration engine mapped to the four official Google brand colours.'
  },
  {
    name: 'GDG RVCE Bespoke Vector Studio',
    category: 'Visual Assets',
    license: 'MIT License',
    sourceUrl: 'https://github.com/Code-with-Prabhjot/gdg-rvce-interface-unlocked',
    description: 'Locally generated SVG asset suite comprising official GDG chevrons, 12 developer emotes, 8 16:9 architectural event covers, and 10 Bauhaus developer avatar portraits.'
  },
  {
    name: 'Next.js 15 & React 19',
    category: 'Framework',
    license: 'MIT License',
    sourceUrl: 'https://nextjs.org',
    description: 'The React Framework for the Web featuring App Router, server-driven performance, zero-runtime theme scripts, and font optimization.'
  },
  {
    name: 'Tailwind CSS v4',
    category: 'Framework',
    license: 'MIT License',
    sourceUrl: 'https://tailwindcss.com',
    description: 'Modern utility-first CSS engine configured with semantic tokens for Daylight Blueprint and Obsidian IDE themes.'
  }
];
