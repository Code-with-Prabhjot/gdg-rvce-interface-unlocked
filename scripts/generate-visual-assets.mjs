import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BRAND_DIR = path.join(rootDir, 'public', 'assets', 'brand');
const EMOTES_DIR = path.join(rootDir, 'public', 'assets', 'emotes');
const COVERS_DIR = path.join(rootDir, 'public', 'assets', 'covers');
const AVATARS_DIR = path.join(rootDir, 'public', 'assets', 'avatars');

[BRAND_DIR, EMOTES_DIR, COVERS_DIR, AVATARS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const GOOGLE_COLORS = {
  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FBBC04',
  green: '#34A853',
  darkInk: '#111827',
  gray800: '#1F2937',
  gray900: '#111827',
};

// ==========================================
// 1. BRAND EMBLEM (gdg-rvce-mark.svg)
// ==========================================
const gdgRvceMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 64" fill="none" role="img" aria-label="GDG RVCE Chevron Emblem">
  <defs>
    <filter id="mark-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.18" />
    </filter>
  </defs>
  <!-- Left Chevron: < -->
  <!-- Top Arm: Red #EA4335 -->
  <path d="M46 11L22 32" stroke="${GOOGLE_COLORS.red}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" filter="url(#mark-glow)"/>
  <!-- Bottom Arm: Blue #4285F4 -->
  <path d="M22 32L46 53" stroke="${GOOGLE_COLORS.blue}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" filter="url(#mark-glow)"/>
  
  <!-- Right Chevron: > -->
  <!-- Top Arm: Green #34A853 -->
  <path d="M74 11L98 32" stroke="${GOOGLE_COLORS.green}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" filter="url(#mark-glow)"/>
  <!-- Bottom Arm: Yellow #FBBC04 -->
  <path d="M98 32L74 53" stroke="${GOOGLE_COLORS.yellow}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" filter="url(#mark-glow)"/>
</svg>`;

fs.writeFileSync(path.join(BRAND_DIR, 'gdg-rvce-mark.svg'), gdgRvceMarkSvg.trim());

// ==========================================
// 2. DEVELOPER EMOTES (12 items, 128x128)
// ==========================================
const emotes = {
  'ship-it.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <defs>
      <linearGradient id="rocketBody" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#E2E8F0"/>
      </linearGradient>
      <filter id="emoteGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.2"/>
      </filter>
    </defs>
    <!-- Background Circle Badge -->
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#1E293B" stroke="#334155" stroke-width="2" filter="url(#emoteGlow)"/>
    <!-- Exhaust Plume -->
    <path d="M42 86L26 102C24 104 22 106 20 108C22 106 28 102 32 98L48 82Z" fill="${GOOGLE_COLORS.yellow}"/>
    <path d="M46 82L32 96C30 98 28 100 24 104C26 100 32 94 36 90L52 76Z" fill="${GOOGLE_COLORS.red}"/>
    <circle cx="28" cy="100" r="4" fill="${GOOGLE_COLORS.yellow}"/>
    <!-- Rocket Thruster Cone -->
    <polygon points="46,74 54,82 44,88 38,80" fill="#64748B" stroke="#0F172A" stroke-width="2"/>
    <!-- Left Wing -->
    <path d="M44 64L28 72L40 84Z" fill="${GOOGLE_COLORS.red}" stroke="#0F172A" stroke-width="2"/>
    <!-- Right Wing -->
    <path d="M64 44L72 28L84 40Z" fill="${GOOGLE_COLORS.blue}" stroke="#0F172A" stroke-width="2"/>
    <!-- Rocket Main Fuselage -->
    <path d="M52 38C58 26 84 18 96 18C96 30 88 56 76 62L52 38Z" fill="url(#rocketBody)" stroke="#0F172A" stroke-width="3"/>
    <!-- Porthole Window -->
    <circle cx="74" cy="38" r="8" fill="${GOOGLE_COLORS.blue}" stroke="#0F172A" stroke-width="2"/>
    <circle cx="76" cy="36" r="3" fill="#FFFFFF"/>
    <!-- Front Nose Cone -->
    <path d="M84 24C92 20 96 18 96 18C96 18 94 22 90 30L84 24Z" fill="${GOOGLE_COLORS.red}"/>
    <!-- Speed Lines -->
    <path d="M96 52L108 58" stroke="${GOOGLE_COLORS.green}" stroke-width="3" stroke-linecap="round"/>
    <path d="M52 96L58 108" stroke="${GOOGLE_COLORS.green}" stroke-width="3" stroke-linecap="round"/>
    <path d="M92 76L102 82" stroke="${GOOGLE_COLORS.yellow}" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Tiny GDG Chevron Badge -->
    <text x="64" y="112" font-family="monospace" font-size="10" font-weight="bold" fill="#94A3B8" text-anchor="middle">SHIP IT &gt;</text>
  </svg>`,

  'bug-squashed.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#064E3B" stroke="${GOOGLE_COLORS.green}" stroke-width="2"/>
    <!-- Shield Outline -->
    <path d="M64 24L92 34V60C92 78 80 94 64 100C48 94 36 78 36 60V34L64 24Z" fill="#047857" stroke="#10B981" stroke-width="3"/>
    <!-- Squashed Bug Backside -->
    <ellipse cx="64" cy="62" rx="14" ry="16" fill="#065F46" stroke="#047857" stroke-width="2"/>
    <!-- Crossed Out Stems -->
    <path d="M46 54L38 48M46 64L36 64M46 74L38 80" stroke="#34D399" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M82 54L90 48M82 64L92 64M82 74L90 80" stroke="#34D399" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Giant Victory Checkmark -->
    <path d="M48 62L60 74L82 48" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="64" cy="40" r="5" fill="${GOOGLE_COLORS.yellow}"/>
  </svg>`,

  'coffee-compile.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#18181B" stroke="#3F3F46" stroke-width="2"/>
    <!-- Binary Steam -->
    <text x="44" y="32" font-family="monospace" font-size="11" font-weight="bold" fill="${GOOGLE_COLORS.green}">01</text>
    <text x="62" y="24" font-family="monospace" font-size="11" font-weight="bold" fill="${GOOGLE_COLORS.yellow}">10</text>
    <text x="76" y="34" font-family="monospace" font-size="11" font-weight="bold" fill="${GOOGLE_COLORS.blue}">11</text>
    <path d="M50 36Q46 42 52 48" stroke="#71717A" stroke-width="2" stroke-linecap="round"/>
    <path d="M68 30Q64 38 70 46" stroke="#71717A" stroke-width="2" stroke-linecap="round"/>
    <!-- Mug Handle -->
    <path d="M82 62C92 62 98 68 98 76C98 84 92 90 82 90" stroke="${GOOGLE_COLORS.blue}" stroke-width="6" stroke-linecap="round"/>
    <!-- Mug Body -->
    <rect x="34" y="52" width="50" height="44" rx="8" fill="#27272A" stroke="#52525B" stroke-width="3"/>
    <!-- GDG Chevron Accent on Mug -->
    <path d="M52 68L46 74L52 80" stroke="${GOOGLE_COLORS.red}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M66 68L72 74L66 80" stroke="${GOOGLE_COLORS.green}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="28" y1="102" x2="90" y2="102" stroke="#52525B" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  'gemini-spark.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#090D16" stroke="#1E293B" stroke-width="2"/>
    <!-- Ambient Sparkles -->
    <circle cx="34" cy="36" r="3" fill="${GOOGLE_COLORS.yellow}"/>
    <circle cx="94" cy="88" r="3" fill="${GOOGLE_COLORS.green}"/>
    <circle cx="90" cy="38" r="2" fill="${GOOGLE_COLORS.red}"/>
    <circle cx="36" cy="92" r="2" fill="${GOOGLE_COLORS.blue}"/>
    <!-- Central Prism Star (Gemini Diamond) -->
    <path d="M64 20Q64 64 20 64Q64 64 64 108Q64 64 108 64Q64 64 64 20Z" fill="url(#geminiGrad)" stroke="#FFFFFF" stroke-width="1.5"/>
    <defs>
      <linearGradient id="geminiGrad" x1="20" y1="20" x2="108" y2="108" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="${GOOGLE_COLORS.blue}"/>
        <stop offset="35%" stop-color="${GOOGLE_COLORS.red}"/>
        <stop offset="70%" stop-color="${GOOGLE_COLORS.yellow}"/>
        <stop offset="100%" stop-color="${GOOGLE_COLORS.green}"/>
      </linearGradient>
    </defs>
    <!-- Core Sparkle Center -->
    <circle cx="64" cy="64" r="5" fill="#FFFFFF"/>
  </svg>`,

  'cloud-deploy.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#0F172A" stroke="#334155" stroke-width="2"/>
    <!-- Isometric Base Platter -->
    <ellipse cx="64" cy="96" rx="36" ry="14" fill="#1E293B" stroke="#475569" stroke-width="2"/>
    <!-- Cloud Silhouette -->
    <path d="M44 74C37 74 32 68 32 61C32 54 37 49 43 48C45 38 54 32 64 32C74 32 82 38 85 47C90 48 96 53 96 60C96 68 90 74 82 74Z" fill="${GOOGLE_COLORS.blue}" stroke="#60A5FA" stroke-width="2.5"/>
    <!-- Upward Deploy Pulse Arrow -->
    <path d="M64 86L64 54M64 54L54 64M64 54L74 64" stroke="${GOOGLE_COLORS.green}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="64" cy="52" r="3" fill="#FFFFFF"/>
  </svg>`,

  'pixel-heart.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#18181B" stroke="#27272A" stroke-width="2"/>
    <!-- 8-Bit Pixel Heart Grid -->
    <g fill="${GOOGLE_COLORS.red}">
      <rect x="36" y="36" width="12" height="12"/>
      <rect x="48" y="36" width="12" height="12"/>
      <rect x="68" y="36" width="12" height="12"/>
      <rect x="80" y="36" width="12" height="12"/>
      
      <rect x="24" y="48" width="12" height="12"/>
      <rect x="36" y="48" width="12" height="12"/>
      <rect x="48" y="48" width="12" height="12"/>
      <rect x="60" y="48" width="12" height="12"/>
      <rect x="68" y="48" width="12" height="12"/>
      <rect x="80" y="48" width="12" height="12"/>
      <rect x="92" y="48" width="12" height="12"/>

      <rect x="24" y="60" width="12" height="12"/>
      <rect x="36" y="60" width="12" height="12"/>
      <rect x="48" y="60" width="12" height="12"/>
      <rect x="60" y="60" width="12" height="12"/>
      <rect x="68" y="60" width="12" height="12"/>
      <rect x="80" y="60" width="12" height="12"/>
      <rect x="92" y="60" width="12" height="12"/>

      <rect x="36" y="72" width="12" height="12"/>
      <rect x="48" y="72" width="12" height="12"/>
      <rect x="60" y="72" width="12" height="12"/>
      <rect x="68" y="72" width="12" height="12"/>
      <rect x="80" y="72" width="12" height="12"/>

      <rect x="48" y="84" width="12" height="12"/>
      <rect x="60" y="84" width="12" height="12"/>
      <rect x="68" y="84" width="12" height="12"/>

      <rect x="60" y="96" width="12" height="12"/>
    </g>
    <!-- Pixel Specular Highlights -->
    <rect x="36" y="48" width="12" height="12" fill="#FFFFFF" fill-opacity="0.8"/>
  </svg>`,

  'merge-clean.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#0F172A" stroke="#334155" stroke-width="2"/>
    <!-- Main Branch Line -->
    <path d="M40 28V100" stroke="#64748B" stroke-width="4" stroke-linecap="round"/>
    <!-- Feature Branch Curve -->
    <path d="M40 44C56 44 88 52 88 72V76C88 88 56 94 44 94" stroke="${GOOGLE_COLORS.green}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Branch Commits -->
    <circle cx="40" cy="38" r="8" fill="#1E293B" stroke="#94A3B8" stroke-width="3"/>
    <circle cx="40" cy="64" r="8" fill="#1E293B" stroke="#94A3B8" stroke-width="3"/>
    <circle cx="88" cy="74" r="8" fill="#1E293B" stroke="${GOOGLE_COLORS.yellow}" stroke-width="3"/>
    <!-- Clean Merge Target Commit -->
    <circle cx="40" cy="94" r="9" fill="${GOOGLE_COLORS.green}" stroke="#FFFFFF" stroke-width="3"/>
    <path d="M36 94L39 97L45 91" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  'terminal-wizard.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#0A0D12" stroke="#1E293B" stroke-width="2"/>
    <!-- Terminal Header Bar -->
    <rect x="20" y="24" width="88" height="80" rx="8" fill="#121721" stroke="#334155" stroke-width="2"/>
    <line x1="20" y1="42" x2="108" y2="42" stroke="#334155" stroke-width="2"/>
    <!-- Window Dots -->
    <circle cx="30" cy="33" r="3.5" fill="${GOOGLE_COLORS.red}"/>
    <circle cx="40" cy="33" r="3.5" fill="${GOOGLE_COLORS.yellow}"/>
    <circle cx="50" cy="33" r="3.5" fill="${GOOGLE_COLORS.green}"/>
    <!-- Prompt Text & Cursor -->
    <text x="28" y="62" font-family="monospace" font-size="12" font-weight="bold" fill="${GOOGLE_COLORS.blue}">&gt;_</text>
    <text x="48" y="62" font-family="monospace" font-size="10" font-weight="bold" fill="#F8FAFC">gdg run</text>
    <text x="28" y="80" font-family="monospace" font-size="9" fill="${GOOGLE_COLORS.green}">✔ build ok</text>
    <rect x="84" y="52" width="6" height="12" fill="${GOOGLE_COLORS.yellow}"/>
  </svg>`,

  'kotlin-android.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#064E3B" stroke="#059669" stroke-width="2"/>
    <!-- Android Antennae -->
    <line x1="48" y1="42" x2="40" y2="30" stroke="${GOOGLE_COLORS.green}" stroke-width="4" stroke-linecap="round"/>
    <line x1="80" y1="42" x2="88" y2="30" stroke="${GOOGLE_COLORS.green}" stroke-width="4" stroke-linecap="round"/>
    <!-- Android Head Dome -->
    <path d="M34 66C34 49.4 47.4 36 64 36C80.6 36 94 49.4 94 66H34Z" fill="${GOOGLE_COLORS.green}" stroke="#10B981" stroke-width="2"/>
    <!-- Robot Eyes -->
    <circle cx="50" cy="52" r="4" fill="#FFFFFF"/>
    <circle cx="78" cy="52" r="4" fill="#FFFFFF"/>
    <!-- Kotlin Prism Shape Overlay -->
    <polygon points="44,72 84,72 64,96" fill="#F97316"/>
    <polygon points="44,72 64,96 44,96" fill="#7C3AED"/>
  </svg>`,

  'rvce-bengaluru.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#1E1B4B" stroke="#312E81" stroke-width="2"/>
    <!-- Concentric Coordinate Rings -->
    <circle cx="64" cy="58" r="32" stroke="#4338CA" stroke-width="1.5" stroke-dasharray="3 3"/>
    <circle cx="64" cy="58" r="22" stroke="#4338CA" stroke-width="1.5"/>
    <!-- Pin Shape in Google Red -->
    <path d="M64 26C51.8 26 42 35.8 42 48C42 63 64 88 64 88C64 88 86 63 86 48C86 35.8 76.2 26 64 26Z" fill="${GOOGLE_COLORS.red}" stroke="#B91C1C" stroke-width="2"/>
    <circle cx="64" cy="46" r="8" fill="#FFFFFF"/>
    <circle cx="64" cy="46" r="4" fill="${GOOGLE_COLORS.blue}"/>
    <!-- Bengaluru Coordinate Label -->
    <text x="64" y="106" font-family="monospace" font-size="8" font-weight="bold" fill="${GOOGLE_COLORS.yellow}" text-anchor="middle">12.92°N 77.50°E</text>
  </svg>`,

  'night-owl.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#0F172A" stroke="#1E293B" stroke-width="2"/>
    <!-- Owl Ears / Tuft -->
    <polygon points="36,44 48,26 56,44" fill="#334155"/>
    <polygon points="92,44 80,26 72,44" fill="#334155"/>
    <!-- Owl Body Dome -->
    <circle cx="64" cy="68" r="36" fill="#1E293B" stroke="#475569" stroke-width="2"/>
    <!-- Code Bracket Eyes Spectacles (< >) -->
    <circle cx="48" cy="62" r="14" fill="#0F172A" stroke="${GOOGLE_COLORS.blue}" stroke-width="3"/>
    <circle cx="80" cy="62" r="14" fill="#0F172A" stroke="${GOOGLE_COLORS.green}" stroke-width="3"/>
    <line x1="62" y1="62" x2="66" y2="62" stroke="#94A3B8" stroke-width="3"/>
    <text x="48" y="67" font-family="monospace" font-size="14" font-weight="bold" fill="${GOOGLE_COLORS.yellow}" text-anchor="middle">&lt;</text>
    <text x="80" y="67" font-family="monospace" font-size="14" font-weight="bold" fill="${GOOGLE_COLORS.yellow}" text-anchor="middle">&gt;</text>
    <!-- Beak -->
    <polygon points="60,72 68,72 64,80" fill="${GOOGLE_COLORS.yellow}"/>
  </svg>`,

  'trophy-build.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#1C1917" stroke="#44403C" stroke-width="2"/>
    <!-- Trophy Handles -->
    <path d="M40 44H32C28 44 24 48 24 54C24 62 30 68 38 68H44" stroke="${GOOGLE_COLORS.yellow}" stroke-width="3" stroke-linecap="round"/>
    <path d="M88 44H96C100 44 104 48 104 54C104 62 98 68 90 68H84" stroke="${GOOGLE_COLORS.yellow}" stroke-width="3" stroke-linecap="round"/>
    <!-- Trophy Cup -->
    <path d="M42 34H86V58C86 70 76 80 64 80C52 80 42 70 42 58V34Z" fill="${GOOGLE_COLORS.yellow}" stroke="#CA8A04" stroke-width="2"/>
    <!-- Star on Cup (High Contrast Dark Ink #111827) -->
    <polygon points="64,44 67,52 75,52 69,57 71,65 64,60 57,65 59,57 53,52 61,52" fill="#111827"/>
    <!-- Stem and Pedestal -->
    <rect x="60" y="80" width="8" height="12" fill="#CA8A04"/>
    <rect x="42" y="92" width="44" height="12" rx="3" fill="${GOOGLE_COLORS.blue}" stroke="#1E40AF" stroke-width="2"/>
    <!-- Winner Label -->
    <text x="64" y="101" font-family="monospace" font-size="8" font-weight="bold" fill="#FFFFFF" text-anchor="middle">RVCE #1</text>
  </svg>`
};

Object.entries(emotes).forEach(([filename, svgContent]) => {
  fs.writeFileSync(path.join(EMOTES_DIR, filename), svgContent.trim());
});

// ==========================================
// 3. EVENT COVERS (8 items, 1200x675 16:9)
// ==========================================
const createCoverSvg = ({ title, subtitle, accentColor, category, tagText, visualElements }) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" fill="none">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0A0D12"/>
      <stop offset="60%" stop-color="#121721"/>
      <stop offset="100%" stop-color="#182030"/>
    </linearGradient>
    <!-- Accent Gradient -->
    <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accentColor}"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.8"/>
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="60" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      <circle cx="40" cy="40" r="1.5" fill="rgba(255,255,255,0.1)"/>
    </pattern>
  </defs>

  <!-- Deep Canvas -->
  <rect width="1200" height="675" fill="url(#bgGrad)"/>
  
  <!-- Architectural Grid Layer -->
  <rect width="1200" height="675" fill="url(#gridPattern)"/>

  <!-- Ambient Light Orbs -->
  <circle cx="1020" cy="220" r="280" fill="${accentColor}" fill-opacity="0.16" filter="url(#softGlow)"/>
  <circle cx="200" cy="500" r="200" fill="${GOOGLE_COLORS.blue}" fill-opacity="0.08" filter="url(#softGlow)"/>

  <!-- Architectural Frame & Tech Coordinates -->
  <rect x="40" y="40" width="1120" height="595" rx="16" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  <line x1="40" y1="90" x2="1160" y2="90" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  
  <!-- Technical Coordinate Badges -->
  <text x="70" y="72" font-family="monospace" font-size="12" font-weight="600" fill="#94A3B8" letter-spacing="2">GDG ON CAMPUS RVCE // ARCHITECTURAL SYSTEM SPEC</text>
  <text x="1130" y="72" font-family="monospace" font-size="12" font-weight="600" fill="#94A3B8" text-anchor="end" letter-spacing="2">12.9237° N, 77.4987° E</text>

  <!-- Left Content Column -->
  <g transform="translate(80, 180)">
    <!-- Category Pill -->
    <rect x="0" y="0" width="140" height="34" rx="17" fill="${accentColor}" fill-opacity="0.18" stroke="${accentColor}" stroke-width="1.5"/>
    <circle cx="16" cy="17" r="5" fill="${accentColor}"/>
    <text x="32" y="22" font-family="sans-serif" font-size="13" font-weight="bold" fill="#F8FAFC" letter-spacing="1">${category.toUpperCase()}</text>

    <!-- Main Title -->
    <text x="0" y="100" font-family="sans-serif" font-size="52" font-weight="800" fill="#FFFFFF" letter-spacing="-1">${title}</text>
    
    <!-- Subtitle -->
    <text x="0" y="150" font-family="sans-serif" font-size="22" font-weight="500" fill="#94A3B8">${subtitle}</text>

    <!-- Meta specs -->
    <g transform="translate(0, 220)">
      <rect x="0" y="0" width="220" height="42" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <text x="16" y="26" font-family="monospace" font-size="13" fill="#E2E8F0">${tagText}</text>
    </g>
  </g>

  <!-- Right Visual Feature (SVG Custom Art) -->
  <g transform="translate(680, 140)">
    ${visualElements}
  </g>

  <!-- Bottom Brand Signature -->
  <g transform="translate(80, 580)">
    <!-- GDG Chevron Icon Mini -->
    <path d="M0 8L8 0L0 -8" stroke="${GOOGLE_COLORS.red}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M0 -8L-8 0L0 8" stroke="${GOOGLE_COLORS.blue}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="24" y="4" font-family="sans-serif" font-size="14" font-weight="700" fill="#E2E8F0">GDG RVCE</text>
    <text x="110" y="4" font-family="sans-serif" font-size="14" fill="#64748B">— Bengaluru Developer Community</text>
  </g>
</svg>
`;

const covers = {
  'hackathon-neural.svg': createCoverSvg({
    title: 'NeuralSprint 2026',
    subtitle: '36-Hour Autonomous Agent & ML Hackathon',
    accentColor: GOOGLE_COLORS.red,
    category: 'Flagship Hackathon',
    tagText: 'TRACK // APPLIED AI & GENAI',
    visualElements: `
      <!-- Isometric Circuit Matrix -->
      <polygon points="200,60 400,160 200,260 0,160" fill="rgba(234,67,53,0.12)" stroke="${GOOGLE_COLORS.red}" stroke-width="2"/>
      <polygon points="200,100 340,170 200,240 60,170" fill="rgba(234,67,53,0.18)" stroke="${GOOGLE_COLORS.red}" stroke-width="1.5"/>
      <!-- Neural Nodes -->
      <line x1="200" y1="60" x2="200" y2="0" stroke="${GOOGLE_COLORS.red}" stroke-width="2"/>
      <circle cx="200" cy="0" r="8" fill="${GOOGLE_COLORS.red}"/>
      <line x1="400" y1="160" x2="440" y2="160" stroke="${GOOGLE_COLORS.yellow}" stroke-width="2"/>
      <circle cx="440" cy="160" r="8" fill="${GOOGLE_COLORS.yellow}"/>
      <line x1="0" y1="160" x2="-40" y2="160" stroke="${GOOGLE_COLORS.blue}" stroke-width="2"/>
      <circle cx="-40" cy="160" r="8" fill="${GOOGLE_COLORS.blue}"/>
      <line x1="200" y1="260" x2="200" y2="320" stroke="${GOOGLE_COLORS.green}" stroke-width="2"/>
      <circle cx="200" cy="320" r="8" fill="${GOOGLE_COLORS.green}"/>
      <!-- Center Synapse Orb -->
      <circle cx="200" cy="160" r="28" fill="${GOOGLE_COLORS.red}" stroke="#FFFFFF" stroke-width="4"/>
      <text x="200" y="166" font-family="monospace" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">&gt; AI</text>
    `
  }),

  'cloud-kubernetes.svg': createCoverSvg({
    title: 'Cloud Architecture & K8s',
    subtitle: 'Production Kubernetes on Google Cloud Platform',
    accentColor: GOOGLE_COLORS.blue,
    category: 'Deep-Dive Workshop',
    tagText: 'INFRA // GKE & CLOUD RUN',
    visualElements: `
      <!-- Hexagonal Cloud Pods -->
      <g stroke="${GOOGLE_COLORS.blue}" stroke-width="2" fill="rgba(66,133,244,0.12)">
        <polygon points="120,40 180,75 180,145 120,180 60,145 60,75"/>
        <polygon points="260,40 320,75 320,145 260,180 200,145 200,75"/>
        <polygon points="190,160 250,195 250,265 190,300 130,265 130,195"/>
      </g>
      <!-- Connections -->
      <line x1="180" y1="110" x2="200" y2="110" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4 4"/>
      <line x1="150" y1="160" x2="160" y2="195" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4 4"/>
      <circle cx="120" cy="110" r="16" fill="${GOOGLE_COLORS.blue}"/>
      <circle cx="260" cy="110" r="16" fill="${GOOGLE_COLORS.green}"/>
      <circle cx="190" cy="230" r="16" fill="${GOOGLE_COLORS.yellow}"/>
    `
  }),

  'android-compose.svg': createCoverSvg({
    title: 'Modern Android & Compose',
    subtitle: 'Declarative UI Engineering with Kotlin & Material 3',
    accentColor: GOOGLE_COLORS.green,
    category: 'Code Lab Session',
    tagText: 'MOBILE // JETPACK COMPOSE',
    visualElements: `
      <!-- Phone Wireframe Frame -->
      <rect x="120" y="20" width="180" height="320" rx="24" fill="#0A0D12" stroke="${GOOGLE_COLORS.green}" stroke-width="3"/>
      <rect x="140" y="46" width="140" height="20" rx="6" fill="rgba(52,168,83,0.3)"/>
      <rect x="140" y="76" width="140" height="60" rx="10" fill="rgba(66,133,244,0.2)" stroke="${GOOGLE_COLORS.blue}" stroke-width="1.5"/>
      <rect x="140" y="146" width="65" height="65" rx="10" fill="rgba(251,188,4,0.2)" stroke="${GOOGLE_COLORS.yellow}" stroke-width="1.5"/>
      <rect x="215" y="146" width="65" height="65" rx="10" fill="rgba(234,67,53,0.2)" stroke="${GOOGLE_COLORS.red}" stroke-width="1.5"/>
      <rect x="140" y="222" width="140" height="34" rx="17" fill="${GOOGLE_COLORS.green}"/>
      <text x="210" y="244" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle">BUILD UI</text>
    `
  }),

  'opensource-git.svg': createCoverSvg({
    title: 'Git & Open Source Summit',
    subtitle: 'Demystifying PRs, CI Workflows & Global Collaboration',
    accentColor: GOOGLE_COLORS.green,
    category: 'Community Jam',
    tagText: 'COLLAB // GITHUB & WORKFLOWS',
    visualElements: `
      <!-- Git Branch DAG Tree -->
      <line x1="80" y1="40" x2="80" y2="300" stroke="#64748B" stroke-width="4"/>
      <path d="M80 90 C 160 90, 240 120, 240 170 V 220 C 240 260, 160 270, 80 270" stroke="${GOOGLE_COLORS.green}" stroke-width="4" fill="none"/>
      <circle cx="80" cy="70" r="12" fill="${GOOGLE_COLORS.blue}" stroke="#FFFFFF" stroke-width="3"/>
      <circle cx="80" cy="150" r="12" fill="#334155" stroke="#FFFFFF" stroke-width="3"/>
      <circle cx="240" cy="170" r="12" fill="${GOOGLE_COLORS.yellow}" stroke="#FFFFFF" stroke-width="3"/>
      <circle cx="240" cy="220" r="12" fill="${GOOGLE_COLORS.red}" stroke="#FFFFFF" stroke-width="3"/>
      <circle cx="80" cy="270" r="16" fill="${GOOGLE_COLORS.green}" stroke="#FFFFFF" stroke-width="4"/>
      <text x="80" y="275" font-family="monospace" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle">✔</text>
    `
  }),

  'ai-multimodal.svg': createCoverSvg({
    title: 'Multimodal AI with Gemini',
    subtitle: 'Audio, Vision, Code & Real-Time Function Calling',
    accentColor: GOOGLE_COLORS.blue,
    category: 'Flagship Masterclass',
    tagText: 'RESEARCH // GEMINI 1.5 PRO & FLASH',
    visualElements: `
      <!-- Converging Vector Beams -->
      <polygon points="200,40 340,280 60,280" fill="none" stroke="${GOOGLE_COLORS.blue}" stroke-width="2"/>
      <polygon points="200,80 300,260 100,260" fill="rgba(66,133,244,0.1)" stroke="${GOOGLE_COLORS.yellow}" stroke-width="1.5"/>
      <!-- Multimodal Quadrants -->
      <circle cx="200" cy="40" r="16" fill="${GOOGLE_COLORS.red}"/>
      <text x="200" y="44" font-family="monospace" font-size="10" font-weight="bold" fill="#FFFFFF" text-anchor="middle">AUDIO</text>
      <circle cx="340" cy="280" r="16" fill="${GOOGLE_COLORS.green}"/>
      <text x="340" y="284" font-family="monospace" font-size="10" font-weight="bold" fill="#FFFFFF" text-anchor="middle">VISION</text>
      <circle cx="60" cy="280" r="16" fill="${GOOGLE_COLORS.blue}"/>
      <text x="60" y="284" font-family="monospace" font-size="10" font-weight="bold" fill="#FFFFFF" text-anchor="middle">CODE</text>
      <!-- Center Star -->
      <path d="M200 130Q200 180 150 180Q200 180 200 230Q200 180 250 180Q200 180 200 130Z" fill="${GOOGLE_COLORS.yellow}" stroke="#FFFFFF" stroke-width="2"/>
    `
  }),

  'web-perf.svg': createCoverSvg({
    title: 'Web Performance at Scale',
    subtitle: 'Zero-CLS, Core Web Vitals & Next.js Turbopack',
    accentColor: GOOGLE_COLORS.yellow,
    category: 'Engineering Clinic',
    tagText: 'PERF // LIGHTHOUSE 100 & INP',
    visualElements: `
      <!-- Speedometer Arc -->
      <path d="M80 220 A 120 120 0 0 1 320 220" stroke="rgba(255,255,255,0.15)" stroke-width="20" stroke-linecap="round" fill="none"/>
      <path d="M80 220 A 120 120 0 0 1 290 140" stroke="${GOOGLE_COLORS.green}" stroke-width="20" stroke-linecap="round" fill="none"/>
      <!-- Gauge Needle -->
      <line x1="200" y1="220" x2="270" y2="130" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
      <circle cx="200" cy="220" r="12" fill="${GOOGLE_COLORS.yellow}"/>
      <!-- 100 Badge -->
      <rect x="160" y="250" width="80" height="34" rx="6" fill="${GOOGLE_COLORS.green}"/>
      <text x="200" y="272" font-family="monospace" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle">100 / 100</text>
    `
  }),

  'design-systems.svg': createCoverSvg({
    title: 'Design Systems & Tokens',
    subtitle: 'Crafting Scalable Architectural UI Component Libraries',
    accentColor: GOOGLE_COLORS.red,
    category: 'Design Engineering',
    tagText: 'UI/UX // FIGMA TO NEXT.JS',
    visualElements: `
      <!-- Color Palette Swatches -->
      <g transform="translate(60, 60)">
        <rect x="0" y="0" width="70" height="70" rx="14" fill="${GOOGLE_COLORS.blue}" stroke="#FFFFFF" stroke-width="2"/>
        <rect x="85" y="0" width="70" height="70" rx="14" fill="${GOOGLE_COLORS.red}" stroke="#FFFFFF" stroke-width="2"/>
        <rect x="170" y="0" width="70" height="70" rx="14" fill="${GOOGLE_COLORS.yellow}" stroke="#FFFFFF" stroke-width="2"/>
        <rect x="0" y="85" width="70" height="70" rx="14" fill="${GOOGLE_COLORS.green}" stroke="#FFFFFF" stroke-width="2"/>
        <rect x="85" y="85" width="70" height="70" rx="14" fill="#0F172A" stroke="#FFFFFF" stroke-width="2"/>
        <rect x="170" y="85" width="70" height="70" rx="14" fill="#F8FAFC" stroke="#0F172A" stroke-width="2"/>
      </g>
    `
  }),

  'devfest-recap.svg': createCoverSvg({
    title: 'DevFest Bengaluru Recap',
    subtitle: 'Celebrating 1,200+ Student Builders & Keynote Sprints',
    accentColor: GOOGLE_COLORS.yellow,
    category: 'Annual Celebration',
    tagText: 'ANNUAL // GDG CAMPUS NETWORK',
    visualElements: `
      <!-- Confetti & Celebration Radiance -->
      <circle cx="200" cy="160" r="100" fill="none" stroke="${GOOGLE_COLORS.yellow}" stroke-width="2" stroke-dasharray="6 6"/>
      <circle cx="200" cy="160" r="60" fill="rgba(251,188,4,0.15)"/>
      <polygon points="200,120 212,148 240,148 218,166 226,194 200,176 174,194 182,166 160,148 188,148" fill="${GOOGLE_COLORS.yellow}" stroke="#CA8A04" stroke-width="2"/>
      <!-- Scattered Confetti -->
      <rect x="90" y="80" width="12" height="6" rx="2" fill="${GOOGLE_COLORS.blue}" transform="rotate(25 90 80)"/>
      <rect x="300" y="100" width="10" height="5" rx="2" fill="${GOOGLE_COLORS.red}" transform="rotate(-35 300 100)"/>
      <rect x="110" y="240" width="12" height="6" rx="2" fill="${GOOGLE_COLORS.green}" transform="rotate(45 110 240)"/>
      <rect x="290" y="230" width="10" height="5" rx="2" fill="${GOOGLE_COLORS.yellow}" transform="rotate(-15 290 230)"/>
    `
  })
};

Object.entries(covers).forEach(([filename, svgContent]) => {
  fs.writeFileSync(path.join(COVERS_DIR, filename), svgContent.trim());
});

// ==========================================
// 4. BAUHAUS AVATARS (10 items, 240x240)
// ==========================================
const members = [
  { id: 'member-01', bg: GOOGLE_COLORS.blue, accent: GOOGLE_COLORS.yellow, hair: '#1E293B', skin: '#FDBA74', glasses: true },
  { id: 'member-02', bg: GOOGLE_COLORS.red, accent: GOOGLE_COLORS.green, hair: '#0F172A', skin: '#FED7AA', glasses: false },
  { id: 'member-03', bg: GOOGLE_COLORS.yellow, accent: GOOGLE_COLORS.blue, hair: '#334155', skin: '#FBBF24', glasses: true },
  { id: 'member-04', bg: GOOGLE_COLORS.green, accent: GOOGLE_COLORS.red, hair: '#1E1B4B', skin: '#FCD34D', glasses: false },
  { id: 'member-05', bg: GOOGLE_COLORS.blue, accent: GOOGLE_COLORS.red, hair: '#172554', skin: '#FDE047', glasses: true },
  { id: 'member-06', bg: GOOGLE_COLORS.red, accent: GOOGLE_COLORS.yellow, hair: '#451A03', skin: '#FDBA74', glasses: false },
  { id: 'member-07', bg: GOOGLE_COLORS.green, accent: GOOGLE_COLORS.blue, hair: '#022C22', skin: '#FED7AA', glasses: true },
  { id: 'member-08', bg: GOOGLE_COLORS.yellow, accent: GOOGLE_COLORS.green, hair: '#312E81', skin: '#FBBF24', glasses: false },
  { id: 'member-09', bg: GOOGLE_COLORS.blue, accent: GOOGLE_COLORS.green, hair: '#0F172A', skin: '#FCD34D', glasses: true },
  { id: 'member-10', bg: GOOGLE_COLORS.red, accent: GOOGLE_COLORS.blue, hair: '#18181B', skin: '#FDE047', glasses: false }
];

members.forEach((m, idx) => {
  const avatarSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="none">
  <defs>
    <clipPath id="avatarClip${idx}">
      <rect width="240" height="240" rx="36"/>
    </clipPath>
  </defs>
  <g clip-path="url(#avatarClip${idx})">
    <!-- Backdrop -->
    <rect width="240" height="240" fill="#0F172A"/>
    <!-- Geometric Bauhaus Accent Shapes -->
    <circle cx="200" cy="50" r="70" fill="${m.bg}" fill-opacity="0.25"/>
    <polygon points="0,180 80,180 40,240" fill="${m.accent}" fill-opacity="0.3"/>
    <circle cx="30" cy="40" r="8" fill="${m.bg}"/>
    <circle cx="210" cy="190" r="12" fill="${m.accent}"/>
    
    <!-- Torso / Hoodie -->
    <path d="M50 240C50 195 85 180 120 180C155 180 190 195 190 240H50Z" fill="${m.bg}"/>
    <path d="M96 182L120 215L144 182" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    
    <!-- Neck -->
    <rect x="106" y="150" width="28" height="34" rx="4" fill="${m.skin}"/>
    
    <!-- Head Base -->
    <ellipse cx="120" cy="116" rx="44" ry="52" fill="${m.skin}"/>
    
    <!-- Hair Base -->
    <path d="M72 108C72 72 90 56 120 56C150 56 168 72 168 108C168 108 152 82 120 82C88 82 72 108 72 108Z" fill="${m.hair}"/>
    
    <!-- Facial Features -->
    <ellipse cx="102" cy="116" rx="4" ry="5" fill="#1E293B"/>
    <ellipse cx="138" cy="116" rx="4" ry="5" fill="#1E293B"/>
    <path d="M112 142C116 146 124 146 128 142" stroke="#B45309" stroke-width="3" stroke-linecap="round"/>
    
    ${
      m.glasses
        ? `<!-- Round Developer Glasses -->
           <circle cx="102" cy="116" r="14" stroke="#1E293B" stroke-width="3.5" fill="rgba(255,255,255,0.15)"/>
           <circle cx="138" cy="116" r="14" stroke="#1E293B" stroke-width="3.5" fill="rgba(255,255,255,0.15)"/>
           <line x1="116" y1="116" x2="124" y2="116" stroke="#1E293B" stroke-width="3.5"/>`
        : `<!-- Clean Eyebrows -->
           <path d="M94 104C98 102 106 102 110 104" stroke="${m.hair}" stroke-width="3" stroke-linecap="round"/>
           <path d="M130 104C134 102 142 102 146 104" stroke="${m.hair}" stroke-width="3" stroke-linecap="round"/>`
    }
  </g>
  <!-- Framing Border -->
  <rect x="1" y="1" width="238" height="238" rx="35" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
</svg>
`;
  fs.writeFileSync(path.join(AVATARS_DIR, `${m.id}.svg`), avatarSvg.trim());
});

console.log('✓ Successfully generated all 31 bespoke SVG assets:');
console.log('  - 1 Official GDG RVCE brand mark (public/assets/brand/gdg-rvce-mark.svg)');
console.log('  - 12 Developer emotes & sticker badges (public/assets/emotes/)');
console.log('  - 8 Architectural 16:9 vector cover artworks (public/assets/covers/)');
console.log('  - 10 Bauhaus developer avatar portraits (public/assets/avatars/)');
