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
const SCENES_DIR = path.join(rootDir, 'public', 'assets', 'scenes');

[BRAND_DIR, EMOTES_DIR, COVERS_DIR, AVATARS_DIR, SCENES_DIR].forEach((dir) => {
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
// 1. BRAND ASSETS (3 items: 1 mark + 2 architectural chapter seals, public/assets/brand/)
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

// Brand Seal 1: Circular precision architectural seal (240x240)
const interfaceUnlockedSealSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="none" role="img" aria-label="Interface Unlocked Architectural Chapter Seal">
  <defs>
    <radialGradient id="sealBgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#141F38"/>
      <stop offset="70%" stop-color="#0B0F19"/>
      <stop offset="100%" stop-color="#060910"/>
    </radialGradient>
    <path id="sealTextPath" d="M 120, 120 m -94, 0 a 94,94 0 1,1 188,0 a 94,94 0 1,1 -188,0" />
    <filter id="sealMarkGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#4285F4" flood-opacity="0.3" />
    </filter>
  </defs>

  <!-- Deep Obsidian Dial Base -->
  <circle cx="120" cy="120" r="118" fill="url(#sealBgGlow)"/>
  <circle cx="120" cy="120" r="116" stroke="#1E293B" stroke-width="2"/>
  
  <!-- Outer Concentric Precision Rulers and Dashed Rings -->
  <circle cx="120" cy="120" r="110" stroke="#334155" stroke-width="1.5"/>
  <circle cx="120" cy="120" r="106" stroke="#475569" stroke-width="0.75" stroke-dasharray="3 3"/>
  <circle cx="120" cy="120" r="84" stroke="#334155" stroke-width="1" stroke-dasharray="2 4"/>
  <circle cx="120" cy="120" r="70" stroke="#1E293B" stroke-width="2" fill="#0A0E1A"/>

  <!-- Radial Drafting Caliper Ticks (36 ticks at 10-degree increments) -->
  <g stroke="#475569" stroke-width="1" opacity="0.65">
    ${Array.from({ length: 36 }).map((_, i) => {
      const angle = i * 10;
      const isMajor = i % 9 === 0;
      const isMedium = i % 3 === 0;
      const r1 = isMajor ? 102 : (isMedium ? 104 : 106);
      const r2 = 110;
      const rad = (angle * Math.PI) / 180;
      const x1 = 120 + r1 * Math.cos(rad);
      const y1 = 120 + r1 * Math.sin(rad);
      const x2 = 120 + r2 * Math.cos(rad);
      const y2 = 120 + r2 * Math.sin(rad);
      const stroke = isMajor ? '#60A5FA' : '#475569';
      const sw = isMajor ? 1.5 : 1;
      return `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${stroke}" stroke-width="${sw}"/>`;
    }).join('')}
  </g>

  <!-- Perimeter Mono Lettering Path -->
  <text font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" fill="#E2E8F0" letter-spacing="2.6">
    <textPath href="#sealTextPath" startOffset="50%" text-anchor="middle">
      INTERFACE UNLOCKED · GDG RVCE · BENGALURU ·
    </textPath>
  </text>

  <!-- 4 Cardinal Compass Alignment Marks in Google 4-Colours -->
  <!-- Top: Red -->
  <circle cx="120" cy="24" r="3" fill="${GOOGLE_COLORS.red}"/>
  <line x1="120" y1="14" x2="120" y2="28" stroke="${GOOGLE_COLORS.red}" stroke-width="1.5"/>
  <!-- Right: Green -->
  <circle cx="216" cy="120" r="3" fill="${GOOGLE_COLORS.green}"/>
  <line x1="212" y1="120" x2="226" y2="120" stroke="${GOOGLE_COLORS.green}" stroke-width="1.5"/>
  <!-- Bottom: Yellow -->
  <circle cx="120" cy="216" r="3" fill="${GOOGLE_COLORS.yellow}"/>
  <line x1="120" y1="212" x2="120" y2="226" stroke="${GOOGLE_COLORS.yellow}" stroke-width="1.5"/>
  <!-- Left: Blue -->
  <circle cx="24" cy="120" r="3" fill="${GOOGLE_COLORS.blue}"/>
  <line x1="14" y1="120" x2="28" y2="120" stroke="${GOOGLE_COLORS.blue}" stroke-width="1.5"/>

  <!-- Technical Inner Badge Details -->
  <text x="120" y="82" font-family="'JetBrains Mono', monospace" font-size="6.5" font-weight="600" fill="#94A3B8" text-anchor="middle" letter-spacing="1">ARCHITECTURAL SEAL</text>
  <text x="120" y="162" font-family="'JetBrains Mono', monospace" font-size="6" fill="#64748B" text-anchor="middle" letter-spacing="1">12.9237°N · 77.4987°E</text>
  <text x="120" y="174" font-family="'JetBrains Mono', monospace" font-size="5.5" font-weight="bold" fill="${GOOGLE_COLORS.green}" text-anchor="middle" letter-spacing="0.5">DEV COLLECTIVE // 2026</text>

  <!-- Center Official GDG < > Mark (Scaled and Centered at 120, 118) -->
  <g transform="translate(72, 98) scale(0.8)" filter="url(#sealMarkGlow)">
    <!-- Left Chevron: < -->
    <path d="M46 11L22 32" stroke="${GOOGLE_COLORS.red}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 32L46 53" stroke="${GOOGLE_COLORS.blue}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    
    <!-- Right Chevron: > -->
    <path d="M74 11L98 32" stroke="${GOOGLE_COLORS.green}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M98 32L74 53" stroke="${GOOGLE_COLORS.yellow}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- Precision Crosshair Reticle -->
  <line x1="120" y1="62" x2="120" y2="68" stroke="#60A5FA" stroke-width="1"/>
  <line x1="120" y1="178" x2="120" y2="184" stroke="#60A5FA" stroke-width="1"/>
  <line x1="62" y1="120" x2="68" y2="120" stroke="#60A5FA" stroke-width="1"/>
  <line x1="172" y1="120" x2="178" y2="120" stroke="#60A5FA" stroke-width="1"/>
</svg>`;

// Brand Seal 2: Technical drafting crest combining isometric grid lines & 4 Google color corner brackets (240x240)
const gdgRvceBlueprintCrestSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="none" role="img" aria-label="GDG RVCE Blueprint Drafting Crest">
  <defs>
    <linearGradient id="crestBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#080D1A"/>
      <stop offset="100%" stop-color="#04060C"/>
    </linearGradient>
    <pattern id="crestGrid" width="16" height="16" patternUnits="userSpaceOnUse">
      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(66, 133, 244, 0.12)" stroke-width="1"/>
    </pattern>
    <filter id="crestGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#4285F4" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Drafting Plate Base (Octagonal beveled boundary) -->
  <polygon points="44,14 196,14 226,44 226,196 196,226 44,226 14,196 14,44" fill="url(#crestBg)" stroke="#1E293B" stroke-width="2"/>
  <polygon points="44,14 196,14 226,44 226,196 196,226 44,226 14,196 14,44" fill="url(#crestGrid)"/>
  <polygon points="48,20 192,20 220,48 220,192 192,220 48,220 20,192 20,48" stroke="#334155" stroke-width="1" stroke-dasharray="4 3"/>

  <!-- 4 Google Colour Corner L-Brackets -->
  <!-- Top-Left: Blue -->
  <path d="M18 36 V24 H30" stroke="${GOOGLE_COLORS.blue}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Top-Right: Red -->
  <path d="M222 36 V24 H210" stroke="${GOOGLE_COLORS.red}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Bottom-Right: Yellow -->
  <path d="M222 204 V216 H210" stroke="${GOOGLE_COLORS.yellow}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Bottom-Left: Green -->
  <path d="M18 204 V216 H30" stroke="${GOOGLE_COLORS.green}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Isometric Drafting Accent Lines (30 deg) -->
  <g stroke="rgba(255,255,255,0.06)" stroke-width="1">
    <line x1="20" y1="120" x2="120" y2="62"/>
    <line x1="120" y1="62" x2="220" y2="120"/>
    <line x1="20" y1="120" x2="120" y2="178"/>
    <line x1="120" y1="178" x2="220" y2="120"/>
  </g>

  <!-- Central Crest Drafting Shield Frame -->
  <polygon points="120,42 190,82 190,146 120,186 50,146 50,82" fill="#0B132B" fill-opacity="0.6" stroke="#475569" stroke-width="1.5" filter="url(#crestGlow)"/>

  <!-- Top Title Banner -->
  <rect x="52" y="28" width="136" height="16" rx="4" fill="#0A0E1A" stroke="#334155" stroke-width="1"/>
  <text x="120" y="39" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="800" fill="#E2E8F0" text-anchor="middle" letter-spacing="1.8">GDG ON CAMPUS</text>

  <!-- Prominent Architectural RVCE Typography -->
  <text x="120" y="74" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="900" fill="#60A5FA" text-anchor="middle" letter-spacing="4">RVCE</text>

  <!-- GDG Chevron Emblem at Crest Heart -->
  <g transform="translate(74, 82) scale(0.77)">
    <!-- Left Chevron -->
    <path d="M46 11L22 32" stroke="${GOOGLE_COLORS.red}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 32L46 53" stroke="${GOOGLE_COLORS.blue}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Right Chevron -->
    <path d="M74 11L98 32" stroke="${GOOGLE_COLORS.green}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M98 32L74 53" stroke="${GOOGLE_COLORS.yellow}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- Lower Drafting Specs and Coordinates -->
  <text x="120" y="145" font-family="'JetBrains Mono', monospace" font-size="7" font-weight="700" fill="#F1F5F9" text-anchor="middle" letter-spacing="1.2">ARCHITECTURAL COLLECTIVE</text>
  <text x="120" y="157" font-family="'JetBrains Mono', monospace" font-size="6.5" fill="#94A3B8" text-anchor="middle" letter-spacing="0.8">12.9237° N · 77.4987° E</text>

  <!-- Bottom Technical Pill -->
  <rect x="66" y="196" width="108" height="15" rx="4" fill="#0A0F1D" stroke="#334155" stroke-width="1"/>
  <circle cx="75" cy="203.5" r="2.5" fill="${GOOGLE_COLORS.green}"/>
  <text x="82" y="206.5" font-family="'JetBrains Mono', monospace" font-size="6.5" font-weight="bold" fill="#34A853" letter-spacing="0.5">BENGALURU // IN</text>
  <text x="165" y="206.5" font-family="'JetBrains Mono', monospace" font-size="6.5" fill="#64748B" text-anchor="end">SPEC v2</text>
</svg>`;

fs.writeFileSync(path.join(BRAND_DIR, 'gdg-rvce-mark.svg'), gdgRvceMarkSvg.trim());
fs.writeFileSync(path.join(BRAND_DIR, 'interface-unlocked-seal.svg'), interfaceUnlockedSealSvg.trim());
fs.writeFileSync(path.join(BRAND_DIR, 'gdg-rvce-blueprint-crest.svg'), gdgRvceBlueprintCrestSvg.trim());

// ==========================================
// 2. DEVELOPER EMOTES (20 items: 12 v1 + 8 v2, 128x128)
// ==========================================
const emotes = {
  // --- EXISTING 12 EMOTES (V1) ---
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
  </svg>`,

  // --- NEW 8 DEVELOPER EMOTES (V2) ---
  'mind-blown.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#0F172A" stroke="#1E293B" stroke-width="2"/>
    <!-- Radiating Energy Rays -->
    <path d="M64 16V24M38 22L44 28M90 22L84 28M24 38L32 42M104 38L96 42" stroke="${GOOGLE_COLORS.yellow}" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Head Base Silhouette -->
    <path d="M42 98C42 82 52 74 64 74C76 74 86 82 86 98H42Z" fill="#334155"/>
    <ellipse cx="64" cy="62" rx="22" ry="24" fill="#334155"/>
    <!-- Exploding Mind Starburst Top (4 Google Colours) -->
    <path d="M38 52C32 40 40 28 50 32C56 22 72 22 78 32C88 28 96 40 90 52C94 60 86 68 76 66C70 70 58 70 52 66C42 68 34 60 38 52Z" fill="${GOOGLE_COLORS.red}"/>
    <circle cx="50" cy="40" r="7" fill="${GOOGLE_COLORS.blue}"/>
    <circle cx="78" cy="40" r="7" fill="${GOOGLE_COLORS.yellow}"/>
    <circle cx="64" cy="34" r="9" fill="${GOOGLE_COLORS.green}"/>
    <circle cx="64" cy="46" r="6" fill="#FFFFFF"/>
    <!-- Sparkles -->
    <polygon points="64,18 66,24 72,24 67,28 69,34 64,30 59,34 61,28 56,24 62,24" fill="${GOOGLE_COLORS.yellow}"/>
    <!-- Glasses on face -->
    <rect x="50" y="58" width="11" height="8" rx="2" fill="#0F172A" stroke="#94A3B8" stroke-width="1.5"/>
    <rect x="67" y="58" width="11" height="8" rx="2" fill="#0F172A" stroke="#94A3B8" stroke-width="1.5"/>
    <line x1="61" y1="62" x2="67" y2="62" stroke="#94A3B8" stroke-width="1.5"/>
  </svg>`,

  'pair-program.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#0B132B" stroke="#1C2541" stroke-width="2"/>
    <!-- Left Bracket < (Blue) -->
    <path d="M46 36L26 64L46 92" stroke="${GOOGLE_COLORS.blue}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Right Bracket > (Red) -->
    <path d="M82 36L102 64L82 92" stroke="${GOOGLE_COLORS.red}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Central High-Five Spark & Starburst -->
    <circle cx="64" cy="64" r="12" fill="${GOOGLE_COLORS.green}" fill-opacity="0.3"/>
    <polygon points="64,48 67,59 78,59 69,66 72,77 64,71 56,77 59,66 50,59 61,59" fill="${GOOGLE_COLORS.green}"/>
    <circle cx="64" cy="64" r="4" fill="#FFFFFF"/>
    <!-- Kinetic Motion / Spark Lines -->
    <line x1="64" y1="36" x2="64" y2="42" stroke="${GOOGLE_COLORS.yellow}" stroke-width="3" stroke-linecap="round"/>
    <line x1="64" y1="86" x2="64" y2="92" stroke="${GOOGLE_COLORS.yellow}" stroke-width="3" stroke-linecap="round"/>
    <line x1="44" y1="52" x2="49" y2="55" stroke="${GOOGLE_COLORS.yellow}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="84" y1="52" x2="79" y2="55" stroke="${GOOGLE_COLORS.yellow}" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Mono Subtitle -->
    <text x="64" y="110" font-family="monospace" font-size="9" font-weight="bold" fill="#94A3B8" text-anchor="middle">PAIR // DEV</text>
  </svg>`,

  'lgtm-stamp.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#022C22" stroke="#065F46" stroke-width="2"/>
    <!-- Tilted Stamp Container -->
    <g transform="rotate(-10 64 64)">
      <!-- Outer Double Border -->
      <rect x="20" y="32" width="88" height="58" rx="8" fill="none" stroke="${GOOGLE_COLORS.green}" stroke-width="3"/>
      <rect x="24" y="36" width="80" height="50" rx="5" fill="#064E3B" fill-opacity="0.6" stroke="${GOOGLE_COLORS.green}" stroke-width="1.5" stroke-dasharray="4 2"/>
      <!-- Main Text LGTM -->
      <text x="56" y="68" font-family="monospace" font-size="20" font-weight="900" fill="#34D399" letter-spacing="2" text-anchor="middle">LGTM</text>
      <!-- Big Checkmark -->
      <path d="M80 54L87 62L98 48" stroke="${GOOGLE_COLORS.green}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Sub-label: APPROVED -->
      <text x="64" y="80" font-family="monospace" font-size="7" font-weight="bold" fill="#A7F3D0" letter-spacing="3" text-anchor="middle">APPROVED</text>
    </g>
    <!-- Stamp Ink Dots -->
    <circle cx="28" cy="28" r="2" fill="${GOOGLE_COLORS.green}" fill-opacity="0.4"/>
    <circle cx="102" cy="100" r="2.5" fill="${GOOGLE_COLORS.green}" fill-opacity="0.4"/>
  </svg>`,

  'hotfix-fire.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#1C1917" stroke="#44403C" stroke-width="2"/>
    <!-- Outer Red Flame -->
    <path d="M64 20C64 20 78 38 78 52C78 44 86 42 90 48C98 58 98 74 92 86C84 100 68 104 56 102C40 99 30 84 32 68C33 54 44 42 48 38C50 48 56 50 56 42C56 32 64 20 64 20Z" fill="${GOOGLE_COLORS.red}"/>
    <!-- Inner Yellow Flame -->
    <path d="M64 42C64 42 72 54 72 64C72 58 78 58 80 62C84 70 82 80 76 88C70 96 58 98 50 94C42 90 38 80 40 70C41 62 48 54 50 52C52 58 56 58 56 52C56 46 64 42 64 42Z" fill="${GOOGLE_COLORS.yellow}"/>
    <!-- White Hot Core -->
    <path d="M64 66C68 66 72 72 72 78C72 84 68 90 64 90C60 90 56 84 56 78C56 72 60 66 64 66Z" fill="#FFFFFF"/>
    <!-- Terminal Prompt in Fire Core -->
    <rect x="46" y="94" width="36" height="16" rx="4" fill="#0C0A09" stroke="#78716C" stroke-width="1"/>
    <text x="50" y="105" font-family="monospace" font-size="9" font-weight="bold" fill="${GOOGLE_COLORS.yellow}">&gt;_</text>
    <rect x="64" y="99" width="4" height="7" fill="${GOOGLE_COLORS.red}"/>
  </svg>`,

  'keyboard-clack.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#0A0F1D" stroke="#1E293B" stroke-width="2"/>
    <!-- Isometric Mechanical Keycap -->
    <!-- Base Skirt -->
    <polygon points="64,96 24,72 64,48 104,72" fill="#1E293B" stroke="#334155" stroke-width="2"/>
    <!-- Front Face -->
    <polygon points="24,72 64,96 64,106 24,82" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
    <!-- Right Face -->
    <polygon points="64,96 104,72 104,82 64,106" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
    <!-- Elevated Top Cap (Google Blue) -->
    <polygon points="64,42 32,60 64,78 96,60" fill="${GOOGLE_COLORS.blue}" stroke="#60A5FA" stroke-width="2"/>
    <!-- Top Cap Bevel Highlight -->
    <polygon points="64,45 36,60 64,75 92,60" fill="#2563EB"/>
    <!-- Key Legend: < > -->
    <text x="64" y="64" font-family="monospace" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">&lt; &gt;</text>
    <!-- Kinetic Click Lines & Shockwaves -->
    <path d="M22 52L14 46M106 52L114 46M64 26V18" stroke="${GOOGLE_COLORS.yellow}" stroke-width="3" stroke-linecap="round"/>
    <path d="M38 34L32 26M90 34L96 26" stroke="${GOOGLE_COLORS.green}" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Tiny Clack Mono Badge -->
    <text x="64" y="118" font-family="monospace" font-size="8" font-weight="bold" fill="#94A3B8" text-anchor="middle">CLACK // MX</text>
  </svg>`,

  'pixel-dino.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#064E3B" stroke="#047857" stroke-width="2"/>
    <!-- Ground Line -->
    <line x1="20" y1="96" x2="108" y2="96" stroke="#059669" stroke-width="2" stroke-dasharray="4 4"/>
    <!-- Jumping Pixel Dino (Google Green #34A853) in Mid-Air -->
    <g fill="${GOOGLE_COLORS.green}">
      <!-- Head and Snout -->
      <rect x="64" y="28" width="28" height="20"/>
      <rect x="92" y="32" width="8" height="12"/>
      <!-- Eye (White cutout) -->
      <rect x="70" y="32" width="4" height="4" fill="#FFFFFF"/>
      <!-- Body & Neck -->
      <rect x="60" y="44" width="20" height="26"/>
      <rect x="48" y="52" width="16" height="22"/>
      <!-- Tail -->
      <rect x="36" y="56" width="12" height="12"/>
      <rect x="28" y="52" width="8" height="8"/>
      <!-- Arms -->
      <rect x="80" y="52" width="8" height="4"/>
      <!-- Bent Jumping Legs -->
      <rect x="48" y="74" width="6" height="12"/>
      <rect x="42" y="82" width="10" height="4"/>
      <rect x="66" y="74" width="6" height="10"/>
      <rect x="70" y="80" width="8" height="4"/>
    </g>
    <!-- Pixel Cactus Obstacle -->
    <g fill="#047857">
      <rect x="96" y="76" width="6" height="20"/>
      <rect x="90" y="80" width="6" height="10"/>
      <rect x="90" y="80" width="12" height="4"/>
      <rect x="102" y="82" width="6" height="8"/>
      <rect x="98" y="82" width="10" height="4"/>
    </g>
    <!-- Floating Pixel Cloud / Stars -->
    <rect x="32" y="30" width="12" height="4" fill="${GOOGLE_COLORS.yellow}"/>
    <rect x="36" y="26" width="8" height="4" fill="${GOOGLE_COLORS.yellow}"/>
  </svg>`,

  'clean-architecture.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#0B132B" stroke="#1E293B" stroke-width="2"/>
    <!-- Stacked Isometric Blueprint Slabs -->
    <!-- Bottom Layer: Infrastructure (Google Green) -->
    <g transform="translate(0, 26)">
      <polygon points="64,68 28,50 64,32 100,50" fill="${GOOGLE_COLORS.green}" stroke="#10B981" stroke-width="1.5"/>
      <polygon points="28,50 64,68 64,74 28,56" fill="#047857"/>
      <polygon points="64,68 100,50 100,56 64,74" fill="#065F46"/>
    </g>
    <!-- Middle Layer: Use Cases / Domain (Google Yellow #FBBC04) -->
    <g transform="translate(0, 10)">
      <polygon points="64,56 32,40 64,24 96,40" fill="${GOOGLE_COLORS.yellow}" stroke="#EAB308" stroke-width="1.5"/>
      <polygon points="32,40 64,56 64,62 32,46" fill="#CA8A04"/>
      <polygon points="64,56 96,40 96,46 64,62" fill="#A16207"/>
    </g>
    <!-- Top Layer: UI / Presentation (Google Blue) -->
    <g transform="translate(0, -6)">
      <polygon points="64,44 36,30 64,16 92,30" fill="${GOOGLE_COLORS.blue}" stroke="#60A5FA" stroke-width="1.5"/>
      <polygon points="36,30 64,44 64,50 36,36" fill="#2563EB"/>
      <polygon points="64,44 92,30 92,36 64,50" fill="#1D4ED8"/>
    </g>
    <!-- Connecting Vertical Data Bus -->
    <line x1="64" y1="20" x2="64" y2="102" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="3 3"/>
    <circle cx="64" cy="20" r="3" fill="#FFFFFF"/>
    <circle cx="64" cy="102" r="3" fill="${GOOGLE_COLORS.green}"/>
    <!-- Label -->
    <text x="64" y="118" font-family="monospace" font-size="8" font-weight="bold" fill="#94A3B8" text-anchor="middle">CLEAN ARCH</text>
  </svg>`,

  'rvce-crest.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
    <rect x="8" y="8" width="112" height="112" rx="28" fill="#18181B" stroke="#3F3F46" stroke-width="2"/>
    <!-- Outer Gear / Technical Cog Ring -->
    <circle cx="64" cy="64" r="44" stroke="#52525B" stroke-width="2" stroke-dasharray="6 4"/>
    <circle cx="64" cy="64" r="36" fill="#111827" stroke="#71717A" stroke-width="1.5"/>
    <!-- 4 Google Colour Quadrant Dots -->
    <circle cx="64" cy="20" r="4" fill="${GOOGLE_COLORS.blue}"/>
    <circle cx="108" cy="64" r="4" fill="${GOOGLE_COLORS.red}"/>
    <circle cx="64" cy="108" r="4" fill="${GOOGLE_COLORS.yellow}"/>
    <circle cx="20" cy="64" r="4" fill="${GOOGLE_COLORS.green}"/>
    <!-- Center Compass / Chevron Star -->
    <path d="M64 38L69 58L89 64L69 70L64 90L59 70L39 64L59 58Z" fill="#27272A" stroke="#94A3B8" stroke-width="1.5"/>
    <!-- Center RVCE Mono Typography -->
    <rect x="42" y="56" width="44" height="16" rx="4" fill="#090D16" stroke="${GOOGLE_COLORS.blue}" stroke-width="1.5"/>
    <text x="64" y="68" font-family="monospace" font-size="10" font-weight="900" fill="#FFFFFF" letter-spacing="1" text-anchor="middle">RVCE</text>
    <!-- Subtitle: GDG CHAPTER -->
    <text x="64" y="80" font-family="monospace" font-size="6" font-weight="bold" fill="${GOOGLE_COLORS.yellow}" letter-spacing="1" text-anchor="middle">GDG CHAPTER</text>
  </svg>`
};

Object.entries(emotes).forEach(([filename, svgContent]) => {
  fs.writeFileSync(path.join(EMOTES_DIR, filename), svgContent.trim());
});

// ==========================================
// 3. EVENT COVERS (8 items, 1200x675 16:9)
// ==========================================
const escapeXml = (str) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const wrapCoverLines = (text, maxChars) => {
  const words = text.trim().split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    if (!current) {
      current = word;
    } else if ((current + ' ' + word).length <= maxChars) {
      current += ' ' + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 2);
};

const createCoverSvg = ({
  title,
  subtitle,
  accentColor,
  category,
  tagText,
  visualElements,
  visualTransform = 'translate(780, 165) scale(0.90)',
}) => {
  const categoryUpper = category.toUpperCase();
  const categoryPillWidth = Math.max(168, Math.round(categoryUpper.length * 9.5 + 52));
  const tagBoxWidth = Math.max(240, Math.round(tagText.length * 8.4 + 40));

  const titleLines = wrapCoverLines(title, 20);
  const subtitleLines = wrapCoverLines(subtitle, 38);

  const titleStartY = titleLines.length > 1 ? 88 : 96;
  const subtitleStartY = titleLines.length > 1 ? 182 : 144;
  const metaOffsetY =
    titleLines.length > 1
      ? subtitleLines.length > 1
        ? 260
        : 236
      : subtitleLines.length > 1
      ? 226
      : 204;

  const titleTspans = titleLines
    .map(
      (line, idx) =>
        `<tspan x="0" dy="${idx === 0 ? 0 : 48}">${escapeXml(line)}</tspan>`
    )
    .join('');

  const subtitleTspans = subtitleLines
    .map(
      (line, idx) =>
        `<tspan x="0" dy="${idx === 0 ? 0 : 28}">${escapeXml(line)}</tspan>`
    )
    .join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200px" height="675px" fill="none">
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

  <!-- Left Content Column (Strictly bounded to x <= 700 for clean clearance) -->
  <g transform="translate(84, 170)">
    <!-- Category Pill -->
    <rect x="0" y="0" width="${categoryPillWidth}" height="34" rx="17" fill="${accentColor}" fill-opacity="0.18" stroke="${accentColor}" stroke-width="1.5"/>
    <circle cx="18" cy="17" r="5" fill="${accentColor}"/>
    <text x="34" y="22" font-family="sans-serif" font-size="13" font-weight="bold" fill="#F8FAFC" letter-spacing="1">${escapeXml(categoryUpper)}</text>

    <!-- Main Title -->
    <text x="0" y="${titleStartY}" font-family="sans-serif" font-size="42" font-weight="800" fill="#FFFFFF" letter-spacing="-0.8">${titleTspans}</text>
    
    <!-- Subtitle -->
    <text x="0" y="${subtitleStartY}" font-family="sans-serif" font-size="20" font-weight="500" fill="#94A3B8">${subtitleTspans}</text>

    <!-- Meta specs -->
    <g transform="translate(0, ${metaOffsetY})">
      <rect x="0" y="0" width="${tagBoxWidth}" height="42" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <text x="16" y="26" font-family="monospace" font-size="13" fill="#E2E8F0">${escapeXml(tagText)}</text>
    </g>
  </g>

  <!-- Right Visual Feature (Shifted cleanly right around x = 945-965) -->
  <g transform="${visualTransform}">
    ${visualElements}
  </g>

  <!-- Bottom Brand Signature -->
  <g transform="translate(84, 580)">
    <!-- GDG Chevron Icon Mini -->
    <path d="M0 8L8 0L0 -8" stroke="${GOOGLE_COLORS.red}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M0 -8L-8 0L0 8" stroke="${GOOGLE_COLORS.blue}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="24" y="4" font-family="sans-serif" font-size="14" font-weight="700" fill="#E2E8F0">GDG RVCE</text>
    <text x="142" y="4" font-family="sans-serif" font-size="14" fill="#64748B">— Bengaluru Developer Community</text>
  </g>
</svg>
`;
};

const covers = {
  'hackathon-neural.svg': createCoverSvg({
    title: 'NeuralSprint 2026',
    subtitle: '36-Hour Autonomous Agent & ML Hackathon',
    accentColor: GOOGLE_COLORS.red,
    category: 'Flagship Hackathon',
    tagText: 'TRACK // APPLIED AI & GENAI',
    visualTransform: 'translate(800, 185) scale(0.76)',
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
    visualTransform: 'translate(780, 175) scale(0.90)',
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
    visualTransform: 'translate(765, 165) scale(0.90)',
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
    visualTransform: 'translate(810, 165) scale(0.90)',
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
    visualTransform: 'translate(775, 175) scale(0.88)',
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
    visualTransform: 'translate(775, 165) scale(0.90)',
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
    visualTransform: 'translate(790, 195) scale(0.92)',
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
    subtitle: 'Celebrating Student Builders & Keynote Sprints',
    accentColor: GOOGLE_COLORS.yellow,
    category: 'Annual Celebration',
    tagText: 'ANNUAL // GDG CAMPUS NETWORK',
    visualTransform: 'translate(775, 175) scale(0.90)',
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

// ==========================================
// 5. COMMUNITY SCENES (6 items, 1400x800 16:9)
// ==========================================
const scenes = {
  // 1. Auditorium Keynote Broadcast
  'auditorium-keynote.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 800" fill="none">
    <defs>
      <linearGradient id="audBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#050811"/>
        <stop offset="50%" stop-color="#0A1020"/>
        <stop offset="100%" stop-color="#111827"/>
      </linearGradient>
      <linearGradient id="stageGlow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
      <linearGradient id="mainScreenGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0B132B"/>
        <stop offset="50%" stop-color="#1C2541"/>
        <stop offset="100%" stop-color="#0B132B"/>
      </linearGradient>
      <linearGradient id="spotLeft" x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.25"/>
        <stop offset="70%" stop-color="#4285F4" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#4285F4" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="spotRight" x1="1" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.22"/>
        <stop offset="70%" stop-color="#FBBC04" stop-opacity="0.07"/>
        <stop offset="100%" stop-color="#FBBC04" stop-opacity="0"/>
      </linearGradient>
      <pattern id="audGrid" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
      </pattern>
      <filter id="screenBloom" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="20" result="bloom"/>
        <feComposite in="SourceGraphic" in2="bloom" operator="over"/>
      </filter>
    </defs>

    <!-- Deep Auditorium Canvas -->
    <rect width="1400" height="800" fill="url(#audBg)"/>
    <rect width="1400" height="460" fill="url(#audGrid)"/>

    <!-- Ceiling Acoustic Baffles & Perspective Lines -->
    <g stroke="rgba(255,255,255,0.07)" stroke-width="1.5">
      <line x1="0" y1="30" x2="1400" y2="30"/>
      <line x1="100" y1="70" x2="1300" y2="70"/>
      <line x1="200" y1="100" x2="1200" y2="100"/>
      <line x1="300" y1="0" x2="480" y2="110"/>
      <line x1="1100" y1="0" x2="920" y2="110"/>
    </g>

    <!-- Ceiling Spot Downlights -->
    <g fill="#FFFFFF" opacity="0.8">
      <circle cx="280" cy="30" r="3"/><circle cx="500" cy="30" r="3"/>
      <circle cx="700" cy="30" r="4"/><circle cx="900" cy="30" r="3"/><circle cx="1120" cy="30" r="3"/>
    </g>

    <!-- Stage Backdrop Acoustic Wall Slats -->
    <g stroke="#1E293B" stroke-width="2" opacity="0.6">
      <line x1="80" y1="90" x2="80" y2="450"/>
      <line x1="100" y1="90" x2="100" y2="450"/>
      <line x1="1300" y1="90" x2="1300" y2="450"/>
      <line x1="1320" y1="90" x2="1320" y2="450"/>
    </g>

    <!-- Dual Side Vertical LED Towers -->
    <!-- Left Tower (Google Blue & Red) -->
    <rect x="110" y="90" width="130" height="340" rx="14" fill="#0A0F1D" stroke="#334155" stroke-width="2"/>
    <rect x="120" y="105" width="110" height="310" rx="10" fill="#0F172A"/>
    <g fill="${GOOGLE_COLORS.blue}">
      <rect x="130" y="125" width="90" height="18" rx="4"/>
      <rect x="130" y="155" width="70" height="14" rx="4"/>
      <rect x="130" y="180" width="80" height="14" rx="4"/>
      <rect x="130" y="205" width="60" height="14" rx="4"/>
    </g>
    <g fill="${GOOGLE_COLORS.red}">
      <rect x="130" y="240" width="90" height="18" rx="4"/>
      <rect x="130" y="270" width="75" height="14" rx="4"/>
      <rect x="130" y="295" width="85" height="14" rx="4"/>
      <rect x="130" y="320" width="50" height="14" rx="4"/>
    </g>
    <text x="175" y="380" font-family="monospace" font-size="10" font-weight="bold" fill="#94A3B8" text-anchor="middle">STREAM A</text>

    <!-- Right Tower (Google Yellow & Green) -->
    <rect x="1160" y="90" width="130" height="340" rx="14" fill="#0A0F1D" stroke="#334155" stroke-width="2"/>
    <rect x="1170" y="105" width="110" height="310" rx="10" fill="#0F172A"/>
    <g fill="${GOOGLE_COLORS.yellow}">
      <rect x="1180" y="125" width="90" height="18" rx="4"/>
      <rect x="1180" y="155" width="65" height="14" rx="4"/>
      <rect x="1180" y="180" width="85" height="14" rx="4"/>
      <rect x="1180" y="205" width="55" height="14" rx="4"/>
    </g>
    <g fill="${GOOGLE_COLORS.green}">
      <rect x="1180" y="240" width="90" height="18" rx="4"/>
      <rect x="1180" y="270" width="80" height="14" rx="4"/>
      <rect x="1180" y="295" width="60" height="14" rx="4"/>
      <rect x="1180" y="320" width="75" height="14" rx="4"/>
    </g>
    <text x="1225" y="380" font-family="monospace" font-size="10" font-weight="bold" fill="#94A3B8" text-anchor="middle">TELEMETRY B</text>

    <!-- Main Stage Center LED Screen -->
    <g filter="url(#screenBloom)">
      <rect x="290" y="70" width="820" height="360" rx="20" fill="url(#mainScreenGrad)" stroke="#475569" stroke-width="3"/>
      <!-- Internal Screen Display -->
      <rect x="306" y="86" width="788" height="328" rx="14" fill="#0A0E1A"/>
      
      <!-- Slide Telemetry Header -->
      <text x="330" y="122" font-family="monospace" font-size="12" font-weight="bold" fill="#64748B" letter-spacing="2">GDG ON CAMPUS RVCE // KEYNOTE 2026</text>
      <text x="1070" y="122" font-family="monospace" font-size="12" font-weight="bold" fill="${GOOGLE_COLORS.green}" text-anchor="end">● LIVE BROADCAST</text>
      <line x1="330" y1="135" x2="1070" y2="135" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>

      <!-- Large GDG Emblem on Stage Screen -->
      <g transform="translate(400, 200)">
        <path d="M40 0L10 35L40 70" stroke="${GOOGLE_COLORS.red}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 35L40 70" stroke="${GOOGLE_COLORS.blue}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M90 0L120 35L90 70" stroke="${GOOGLE_COLORS.green}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M120 35L90 70" stroke="${GOOGLE_COLORS.yellow}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <!-- Keynote Title & Architecture Diagram on Screen -->
      <g transform="translate(560, 185)">
        <text x="0" y="24" font-family="sans-serif" font-size="28" font-weight="900" fill="#FFFFFF" letter-spacing="-0.5">MULTI-AGENT ARCHITECTURE</text>
        <text x="0" y="52" font-family="sans-serif" font-size="16" font-weight="500" fill="#94A3B8">Engineering Resilient Open Systems with Gemini 1.5 &amp; Cloud</text>
        <!-- Mini Topology Diagram on Slide -->
        <g transform="translate(0, 75)">
          <rect x="0" y="0" width="130" height="42" rx="8" fill="#1E293B" stroke="${GOOGLE_COLORS.blue}" stroke-width="1.5"/>
          <text x="65" y="26" font-family="monospace" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">PROMPT MESH</text>
          
          <line x1="130" y1="21" x2="170" y2="21" stroke="#94A3B8" stroke-width="2" stroke-dasharray="4 3"/>
          
          <rect x="170" y="0" width="140" height="42" rx="8" fill="#1E293B" stroke="${GOOGLE_COLORS.yellow}" stroke-width="1.5"/>
          <text x="240" y="26" font-family="monospace" font-size="11" font-weight="bold" fill="${GOOGLE_COLORS.yellow}" text-anchor="middle">TOOL RUNTIME</text>

          <line x1="310" y1="21" x2="350" y2="21" stroke="#94A3B8" stroke-width="2" stroke-dasharray="4 3"/>

          <rect x="350" y="0" width="120" height="42" rx="8" fill="#1E293B" stroke="${GOOGLE_COLORS.green}" stroke-width="1.5"/>
          <text x="410" y="26" font-family="monospace" font-size="11" font-weight="bold" fill="${GOOGLE_COLORS.green}" text-anchor="middle">CLOUD EDGE</text>
        </g>
      </g>
      <!-- Slide Lower Telemetry Strip -->
      <rect x="330" y="375" width="740" height="24" rx="6" fill="#111827"/>
      <text x="345" y="391" font-family="monospace" font-size="10" fill="#64748B">SESSION // 01 · KEYNOTE SPEAKER: DR. ANANYA RAO · RVCE CAMPUS IEM HALL</text>
    </g>

    <!-- Angled Stage Spotlight Cones -->
    <polygon points="170,0 250,0 660,460 480,460" fill="url(#spotLeft)"/>
    <polygon points="1230,0 1150,0 840,460 1020,460" fill="url(#spotRight)"/>

    <!-- Architectural Raised Stage Floor with Screen Reflection -->
    <polygon points="60,440 1340,440 1400,480 0,480" fill="url(#stageGlow)"/>
    <line x1="0" y1="480" x2="1400" y2="480" stroke="#334155" stroke-width="2"/>
    <!-- Stage Front Lip Google Accent Stripe -->
    <rect x="0" y="478" width="350" height="4" fill="${GOOGLE_COLORS.blue}"/>
    <rect x="350" y="478" width="350" height="4" fill="${GOOGLE_COLORS.red}"/>
    <rect x="700" y="478" width="350" height="4" fill="${GOOGLE_COLORS.yellow}"/>
    <rect x="1050" y="478" width="350" height="4" fill="${GOOGLE_COLORS.green}"/>

    <!-- Presenter on Stage (Stylized Geometric Human Silhouette) -->
    <g transform="translate(460, 310)">
      <!-- Stage Shadow -->
      <ellipse cx="25" cy="130" rx="35" ry="10" fill="#000000" fill-opacity="0.4"/>
      <!-- Body & Hoodie -->
      <path d="M5 130L12 70C12 55 38 55 38 70L45 130Z" fill="#1E293B"/>
      <!-- Shoulder Seam Accent (Red) -->
      <path d="M12 70C20 62 30 62 38 70" stroke="${GOOGLE_COLORS.red}" stroke-width="3" stroke-linecap="round"/>
      <!-- Raised Right Arm with Clicker -->
      <path d="M36 72L58 50L68 54" stroke="#1E293B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="66" y="50" width="8" height="5" rx="2" fill="${GOOGLE_COLORS.blue}"/>
      <!-- Left Arm resting -->
      <path d="M14 74L4 98" stroke="#1E293B" stroke-width="8" stroke-linecap="round"/>
      <!-- Head with Hair -->
      <circle cx="25" cy="40" r="16" fill="#FDBA74"/>
      <path d="M10 38C10 24 20 18 32 18C42 18 42 26 42 38C42 38 34 26 24 26C14 26 10 38 10 38Z" fill="#0F172A"/>
      <!-- Glasses -->
      <rect x="22" y="36" width="10" height="6" rx="2" fill="none" stroke="#0F172A" stroke-width="2"/>
    </g>

    <!-- Acrylic Speaker Lectern -->
    <g transform="translate(560, 360)">
      <polygon points="10,80 30,80 25,10 5,10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <rect x="0" y="8" width="40" height="6" rx="2" fill="#334155"/>
      <!-- Goose-neck Mic -->
      <path d="M8 8C8 -4 14 -8 20 -10" stroke="#94A3B8" stroke-width="2" fill="none"/>
      <circle cx="20" cy="-10" r="3" fill="#64748B"/>
      <!-- Glowing Laptop on Lectern -->
      <rect x="18" y="-4" width="22" height="12" rx="2" fill="#4285F4" stroke="#93C5FD" stroke-width="1"/>
    </g>

    <!-- ======================================================== -->
    <!-- Terraced Seating Audience (3 Rows of Student Developers)  -->
    <!-- ======================================================== -->
    <!-- ROW 1 (Farthest, y=510-560) -->
    <g transform="translate(0, 500)">
      <!-- Tier 1 Step -->
      <rect x="0" y="0" width="1400" height="70" fill="#0D1322"/>
      <line x1="0" y1="0" x2="1400" y2="0" stroke="#1E293B" stroke-width="2"/>
      <!-- 8 Seated Developer Silhouettes with Laptops -->
      ${[160, 300, 440, 580, 740, 880, 1020, 1160].map((x, i) => `
        <g transform="translate(${x}, 10)">
          <!-- Head -->
          <circle cx="20" cy="12" r="11" fill="#1E293B"/>
          <!-- Hoodie / Torso -->
          <path d="M4 46C4 28 36 28 36 46Z" fill="#151F32"/>
          <!-- Open Glowing Laptop -->
          <polygon points="12,38 28,38 32,46 8,46" fill="#334155"/>
          <rect x="13" y="27" width="14" height="11" rx="2" fill="${i % 2 === 0 ? GOOGLE_COLORS.blue : GOOGLE_COLORS.green}" fill-opacity="0.8"/>
        </g>
      `).join('')}
    </g>

    <!-- ROW 2 (Mid-distance, y=580-660) -->
    <g transform="translate(0, 580)">
      <!-- Tier 2 Step -->
      <rect x="0" y="0" width="1400" height="85" fill="#0A0E1A"/>
      <line x1="0" y1="0" x2="1400" y2="0" stroke="#334155" stroke-width="2"/>
      <!-- 9 Seated Developers with Glowing Screens -->
      ${[100, 230, 360, 490, 630, 770, 910, 1040, 1180].map((x, i) => `
        <g transform="translate(${x}, 12)">
          <!-- Head -->
          <circle cx="24" cy="14" r="14" fill="#334155"/>
          <!-- Hoodie -->
          <path d="M4 56C4 32 44 32 44 56Z" fill="#1E293B"/>
          <!-- Laptop Base & Screen Glow -->
          <polygon points="14,44 34,44 40,54 8,54" fill="#475569"/>
          <rect x="15" y="30" width="18" height="14" rx="2" fill="${i % 3 === 0 ? GOOGLE_COLORS.yellow : i % 3 === 1 ? '#60A5FA' : GOOGLE_COLORS.red}" fill-opacity="0.85"/>
          <!-- Screen light reflection upward -->
          <polygon points="14,30 35,30 42,10 7,10" fill="#FFFFFF" fill-opacity="0.06"/>
        </g>
      `).join('')}
    </g>

    <!-- ROW 3 (Foreground Detailed Silhouettes, y=680-800) -->
    <g transform="translate(0, 680)">
      <!-- Tier 3 Step -->
      <rect x="0" y="0" width="1400" height="120" fill="#070A12"/>
      <line x1="0" y1="0" x2="1400" y2="0" stroke="#475569" stroke-width="2"/>
      <!-- 7 Large Foreground Developer Silhouettes -->
      ${[80, 260, 450, 640, 830, 1020, 1200].map((x, i) => {
        const colors = [GOOGLE_COLORS.blue, GOOGLE_COLORS.red, GOOGLE_COLORS.yellow, GOOGLE_COLORS.green, GOOGLE_COLORS.blue, GOOGLE_COLORS.green, GOOGLE_COLORS.red];
        const accent = colors[i % colors.length];
        return `
        <g transform="translate(${x}, 10)">
          <!-- Head & Hair Details -->
          <circle cx="34" cy="18" r="18" fill="#FDBA74"/>
          <path d="M16 16C16 0 32 -4 52 0C54 18 52 24 50 26C40 10 26 12 16 16Z" fill="#0F172A"/>
          <!-- Hoodie with Colour Accent Collar -->
          <path d="M4 90C4 44 64 44 64 90Z" fill="#1E293B"/>
          <path d="M24 52C28 48 40 48 44 52" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
          <!-- Foreground Laptop with GDG Sticker on Lid / Screen -->
          <polygon points="20,64 48,64 56,84 12,84" fill="#334155"/>
          <rect x="22" y="44" width="24" height="20" rx="3" fill="#F8FAFC" fill-opacity="0.9"/>
          <!-- Sticker Accent on Laptop -->
          <circle cx="34" cy="54" r="5" fill="${accent}"/>
          <!-- Upward Face Illumination -->
          <polygon points="20,44 48,44 56,10 12,10" fill="${accent}" fill-opacity="0.1"/>
        </g>`;
      }).join('')}
    </g>

    <!-- Top Left & Right Architectural Telemetry Badges -->
    <g transform="translate(60, 45)">
      <rect x="0" y="0" width="340" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <circle cx="16" cy="15" r="4" fill="${GOOGLE_COLORS.blue}"/>
      <text x="30" y="19" font-family="monospace" font-size="11" font-weight="bold" fill="#E2E8F0">SCENE 01 // AUDITORIUM KEYNOTE BROADCAST</text>
    </g>
    <g transform="translate(1000, 45)">
      <rect x="0" y="0" width="340" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <text x="325" y="19" font-family="monospace" font-size="11" font-weight="bold" fill="#94A3B8" text-anchor="end">IEM AUDITORIUM · RVCE BENGALURU</text>
    </g>
  </svg>`,

  // 2. 24-Hour Hackathon Build Table
  'hackathon-table-sprint.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 800" fill="none">
    <defs>
      <linearGradient id="hackBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#080C15"/>
        <stop offset="50%" stop-color="#0E1524"/>
        <stop offset="100%" stop-color="#141E34"/>
      </linearGradient>
      <linearGradient id="tableTop" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="50%" stop-color="#334155"/>
        <stop offset="100%" stop-color="#1E293B"/>
      </linearGradient>
      <radialGradient id="lampCone1" cx="0.5" cy="0" r="0.8">
        <stop offset="0%" stop-color="#FBBC04" stop-opacity="0.3"/>
        <stop offset="60%" stop-color="#FBBC04" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#FBBC04" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="lampCone2" cx="0.5" cy="0" r="0.8">
        <stop offset="0%" stop-color="#4285F4" stop-opacity="0.3"/>
        <stop offset="60%" stop-color="#4285F4" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#4285F4" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="lampCone3" cx="0.5" cy="0" r="0.8">
        <stop offset="0%" stop-color="#34A853" stop-opacity="0.3"/>
        <stop offset="60%" stop-color="#34A853" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#34A853" stop-opacity="0"/>
      </radialGradient>
      <pattern id="hackFloorGrid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      </pattern>
    </defs>

    <!-- Canvas -->
    <rect width="1400" height="800" fill="url(#hackBg)"/>
    <rect width="1400" height="800" fill="url(#hackFloorGrid)"/>

    <!-- Exposed Industrial Ceiling Structure -->
    <line x1="0" y1="50" x2="1400" y2="50" stroke="#334155" stroke-width="6"/>
    <line x1="0" y1="80" x2="1400" y2="80" stroke="#1E293B" stroke-width="3"/>
    ${[100, 300, 500, 700, 900, 1100, 1300].map(x => `
      <line x1="${x}" y1="50" x2="${x + 60}" y2="80" stroke="#334155" stroke-width="2"/>
    `).join('')}

    <!-- 3 Hanging Pendant Industrial Lamps -->
    <g>
      <!-- Lamp 1 (Left, Yellow) -->
      <line x1="380" y1="50" x2="380" y2="180" stroke="#64748B" stroke-width="2"/>
      <polygon points="350,200 410,200 395,180 365,180" fill="#334155" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="380" cy="202" r="6" fill="${GOOGLE_COLORS.yellow}"/>
      <polygon points="260,600 500,600 400,205 360,205" fill="url(#lampCone1)"/>

      <!-- Lamp 2 (Center, Blue) -->
      <line x1="700" y1="50" x2="700" y2="160" stroke="#64748B" stroke-width="2"/>
      <polygon points="670,180 730,180 715,160 685,160" fill="#334155" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="700" cy="182" r="6" fill="${GOOGLE_COLORS.blue}"/>
      <polygon points="560,600 840,600 720,185 680,185" fill="url(#lampCone2)"/>

      <!-- Lamp 3 (Right, Green) -->
      <line x1="1020" y1="50" x2="1020" y2="180" stroke="#64748B" stroke-width="2"/>
      <polygon points="990,200 1050,200 1035,180 1005,180" fill="#334155" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="1020" cy="202" r="6" fill="${GOOGLE_COLORS.green}"/>
      <polygon points="900,600 1140,600 1040,205 1000,205" fill="url(#lampCone3)"/>
    </g>

    <!-- Background Sticky-Note Kanban Board on Easel Stand -->
    <g transform="translate(140, 150)">
      <!-- Stand legs -->
      <line x1="60" y1="200" x2="30" y2="280" stroke="#475569" stroke-width="3"/>
      <line x1="260" y1="200" x2="290" y2="280" stroke="#475569" stroke-width="3"/>
      <!-- Board -->
      <rect x="0" y="0" width="320" height="200" rx="10" fill="#0F172A" stroke="#334155" stroke-width="2"/>
      <text x="15" y="24" font-family="monospace" font-size="11" font-weight="bold" fill="#94A3B8">SPRINT KANBAN // RVCE-HACK</text>
      <line x1="10" y1="34" x2="310" y2="34" stroke="#1E293B" stroke-width="1.5"/>
      <!-- 3 Columns -->
      <line x1="110" y1="34" x2="110" y2="190" stroke="#1E293B" stroke-width="1"/>
      <line x1="210" y1="34" x2="210" y2="190" stroke="#1E293B" stroke-width="1"/>
      <text x="60" y="48" font-family="monospace" font-size="8" font-weight="bold" fill="#64748B" text-anchor="middle">TODO</text>
      <text x="160" y="48" font-family="monospace" font-size="8" font-weight="bold" fill="#64748B" text-anchor="middle">IN DEV</text>
      <text x="260" y="48" font-family="monospace" font-size="8" font-weight="bold" fill="${GOOGLE_COLORS.green}" text-anchor="middle">SHIPPED</text>
      <!-- Sticky notes -->
      <rect x="25" y="60" width="60" height="30" rx="3" fill="${GOOGLE_COLORS.yellow}"/>
      <text x="55" y="78" font-family="monospace" font-size="8" font-weight="bold" fill="#111827" text-anchor="middle">Auth API</text>
      <rect x="25" y="100" width="60" height="30" rx="3" fill="${GOOGLE_COLORS.blue}"/>
      <text x="55" y="118" font-family="monospace" font-size="8" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Gemini SDK</text>

      <rect x="125" y="60" width="60" height="30" rx="3" fill="${GOOGLE_COLORS.red}"/>
      <text x="155" y="78" font-family="monospace" font-size="8" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Agent Loop</text>
      <rect x="125" y="100" width="60" height="30" rx="3" fill="${GOOGLE_COLORS.yellow}"/>
      <text x="155" y="118" font-family="monospace" font-size="8" font-weight="bold" fill="#111827" text-anchor="middle">UI Polish</text>

      <rect x="225" y="60" width="60" height="30" rx="3" fill="${GOOGLE_COLORS.green}"/>
      <text x="255" y="78" font-family="monospace" font-size="8" font-weight="bold" fill="#FFFFFF" text-anchor="middle">CI Tests ✔</text>
      <rect x="225" y="100" width="60" height="30" rx="3" fill="${GOOGLE_COLORS.green}"/>
      <text x="255" y="118" font-family="monospace" font-size="8" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Deploy V1 ✔</text>
    </g>

    <!-- Massive Central Collaborative Engineering Table -->
    <g transform="translate(180, 420)">
      <!-- Heavy Steel Table Legs -->
      <rect x="40" y="80" width="24" height="280" fill="#0A0E1A" stroke="#1E293B" stroke-width="2"/>
      <rect x="980" y="80" width="24" height="280" fill="#0A0E1A" stroke="#1E293B" stroke-width="2"/>
      <line x1="52" y1="260" x2="992" y2="260" stroke="#1E293B" stroke-width="4"/>
      <!-- Main Tabletop Slabs -->
      <polygon points="0,70 1040,70 1020,0 20,0" fill="url(#tableTop)" stroke="#475569" stroke-width="2"/>
      <rect x="0" y="70" width="1040" height="24" fill="#0F172A" stroke="#334155" stroke-width="2"/>
      <!-- Front Google 4-Color Accent Strip on Table Lip -->
      <rect x="0" y="90" width="260" height="4" fill="${GOOGLE_COLORS.blue}"/>
      <rect x="260" y="90" width="260" height="4" fill="${GOOGLE_COLORS.red}"/>
      <rect x="520" y="90" width="260" height="4" fill="${GOOGLE_COLORS.yellow}"/>
      <rect x="780" y="90" width="260" height="4" fill="${GOOGLE_COLORS.green}"/>
    </g>

    <!-- ======================================================== -->
    <!-- Table Hardware: Dual External Monitors & Terminal Windows -->
    <!-- ======================================================== -->
    <!-- Center-Left 27" Monitor (VS Code IDE) -->
    <g transform="translate(460, 240)">
      <!-- Stand -->
      <rect x="135" y="180" width="20" height="60" fill="#1E293B"/>
      <polygon points="100,240 190,240 180,230 110,230" fill="#0F172A"/>
      <!-- Screen Bezel -->
      <rect x="0" y="0" width="290" height="180" rx="8" fill="#0A0D14" stroke="#475569" stroke-width="3"/>
      <!-- Code Window Inside -->
      <rect x="10" y="10" width="270" height="160" rx="4" fill="#0F172A"/>
      <!-- Window header -->
      <circle cx="22" cy="22" r="3" fill="${GOOGLE_COLORS.red}"/>
      <circle cx="32" cy="22" r="3" fill="${GOOGLE_COLORS.yellow}"/>
      <circle cx="42" cy="22" r="3" fill="${GOOGLE_COLORS.green}"/>
      <text x="55" y="25" font-family="monospace" font-size="8" fill="#94A3B8">agent-orchestrator.ts</text>
      <!-- Syntax code lines -->
      <g transform="translate(20, 45)">
        <text x="0" y="0" font-family="monospace" font-size="9" fill="${GOOGLE_COLORS.blue}">export async function</text>
        <text x="125" y="0" font-family="monospace" font-size="9" fill="${GOOGLE_COLORS.yellow}">shipAgent() {</text>
        <text x="12" y="16" font-family="monospace" font-size="9" fill="#94A3B8">const model = getGemini();</text>
        <text x="12" y="32" font-family="monospace" font-size="9" fill="${GOOGLE_COLORS.green}">const res = await model.run();</text>
        <text x="12" y="48" font-family="monospace" font-size="9" fill="${GOOGLE_COLORS.red}">return evaluate(res);</text>
        <text x="0" y="64" font-family="monospace" font-size="9" fill="${GOOGLE_COLORS.yellow}">}</text>
        <!-- Mini cursor -->
        <rect x="15" y="72" width="6" height="10" fill="${GOOGLE_COLORS.green}"/>
      </g>
    </g>

    <!-- Center-Right 27" Monitor (Live Terminal Output) -->
    <g transform="translate(760, 240)">
      <!-- Stand -->
      <rect x="135" y="180" width="20" height="60" fill="#1E293B"/>
      <polygon points="100,240 190,240 180,230 110,230" fill="#0F172A"/>
      <!-- Screen Bezel -->
      <rect x="0" y="0" width="290" height="180" rx="8" fill="#0A0D14" stroke="#475569" stroke-width="3"/>
      <!-- Terminal Interior -->
      <rect x="10" y="10" width="270" height="160" rx="4" fill="#0A0E17"/>
      <circle cx="22" cy="22" r="3" fill="${GOOGLE_COLORS.red}"/>
      <circle cx="32" cy="22" r="3" fill="${GOOGLE_COLORS.yellow}"/>
      <circle cx="42" cy="22" r="3" fill="${GOOGLE_COLORS.green}"/>
      <text x="55" y="25" font-family="monospace" font-size="8" fill="#94A3B8">bash // rvce-hack-runner</text>
      <!-- Terminal Output -->
      <g transform="translate(20, 48)">
        <text x="0" y="0" font-family="monospace" font-size="9" fill="${GOOGLE_COLORS.yellow}">&gt; gdg test --coverage</text>
        <text x="0" y="18" font-family="monospace" font-size="9" fill="${GOOGLE_COLORS.green}">✔ 48 specs passing (1.8s)</text>
        <text x="0" y="34" font-family="monospace" font-size="9" fill="#94A3B8">Memory: 42MB · INP: 24ms</text>
        <text x="0" y="52" font-family="monospace" font-size="9" fill="${GOOGLE_COLORS.blue}">✔ Build target: PROD READY</text>
        <rect x="0" y="65" width="8" height="11" fill="${GOOGLE_COLORS.yellow}"/>
      </g>
    </g>

    <!-- Mechanical Keyboards, Cables, Coffee Mugs on Workbench -->
    <g transform="translate(480, 440)">
      <!-- Coiled Aviator Cable (Blue) -->
      <path d="M 80 0 Q 75 10 70 5 Q 65 -5 60 5 Q 55 10 50 5" stroke="${GOOGLE_COLORS.blue}" stroke-width="2" fill="none"/>
      <!-- Keyboard 1 (Center-Left) -->
      <rect x="20" y="10" width="160" height="42" rx="4" fill="#0A0D14" stroke="#334155" stroke-width="2"/>
      ${[0, 1, 2, 3].map(row => [0, 1, 2, 3, 4, 5, 6, 7].map(col => `
        <rect x="${26 + col * 18}" y="${14 + row * 9}" width="14" height="7" rx="1.5" fill="${row === 1 && col === 3 ? GOOGLE_COLORS.blue : row === 2 && col === 4 ? GOOGLE_COLORS.green : '#1E293B'}"/>
      `).join('')).join('')}
      <!-- Mouse -->
      <ellipse cx="205" cy="30" rx="12" ry="18" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
    </g>

    <g transform="translate(780, 440)">
      <!-- Keyboard 2 (Center-Right) -->
      <rect x="20" y="10" width="160" height="42" rx="4" fill="#0A0D14" stroke="#334155" stroke-width="2"/>
      ${[0, 1, 2, 3].map(row => [0, 1, 2, 3, 4, 5, 6, 7].map(col => `
        <rect x="${26 + col * 18}" y="${14 + row * 9}" width="14" height="7" rx="1.5" fill="${row === 0 && col === 2 ? GOOGLE_COLORS.yellow : row === 3 && col === 5 ? GOOGLE_COLORS.red : '#1E293B'}"/>
      `).join('')).join('')}
      <!-- Mouse -->
      <ellipse cx="205" cy="30" rx="12" ry="18" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
    </g>

    <!-- Coffee Mugs & Cans -->
    <g transform="translate(400, 445)">
      <!-- Mug with Steam -->
      <rect x="0" y="0" width="22" height="26" rx="4" fill="#1E293B" stroke="#64748B" stroke-width="1.5"/>
      <path d="M22 6C27 6 29 12 29 16C29 20 27 22 22 22" stroke="#64748B" stroke-width="2" fill="none"/>
      <!-- Steam -->
      <path d="M6 -4Q4 -10 8 -14" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <path d="M14 -6Q12 -12 16 -16" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    </g>
    <g transform="translate(1000, 450)">
      <!-- Drink Can in Red -->
      <rect x="0" y="0" width="18" height="30" rx="3" fill="${GOOGLE_COLORS.red}" stroke="#991B1B" stroke-width="1.5"/>
      <circle cx="9" cy="0" r="9" fill="#E2E8F0"/>
    </g>

    <!-- ======================================================== -->
    <!-- 4 Collaborating Developers Around the Workbench            -->
    <!-- ======================================================== -->
    <!-- Dev 1: Left Seated Developer (Typing on laptop) -->
    <g transform="translate(240, 360)">
      <!-- Chair Backrest -->
      <rect x="0" y="40" width="18" height="90" rx="8" fill="#0F172A" stroke="#334155" stroke-width="2"/>
      <!-- Torso & Blue Hoodie -->
      <path d="M18 120C18 70 60 70 70 120Z" fill="${GOOGLE_COLORS.blue}"/>
      <!-- Arm extending to desk -->
      <path d="M45 80L85 100L110 95" stroke="${GOOGLE_COLORS.blue}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Head with Hair -->
      <circle cx="45" cy="45" r="20" fill="#FDBA74"/>
      <path d="M25 45C25 25 40 18 55 20C65 22 65 35 65 45C65 45 55 28 40 28C25 28 25 45 25 45Z" fill="#0F172A"/>
      <!-- Laptop on Table Angle -->
      <g transform="translate(90, 85)">
        <polygon points="0,20 35,20 40,28 -5,28" fill="#475569"/>
        <rect x="0" y="0" width="34" height="20" rx="2" fill="#60A5FA"/>
        <polygon points="0,0 34,0 42,-20 -8,-20" fill="#FFFFFF" fill-opacity="0.1"/>
      </g>
    </g>

    <!-- Dev 2: Center-Left Standing Developer (Pointing at screen, active discussion) -->
    <g transform="translate(420, 280)">
      <!-- Torso / Dark Hoodie -->
      <path d="M10 170L16 90C16 65 54 65 54 90L60 170Z" fill="#1E293B"/>
      <!-- Red Lanyard -->
      <path d="M26 80L35 115L44 80" stroke="${GOOGLE_COLORS.red}" stroke-width="3" fill="none"/>
      <!-- Pointing Right Arm -->
      <path d="M48 85L80 70L125 55" stroke="#1E293B" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Hand pointing finger -->
      <circle cx="128" cy="54" r="6" fill="#FED7AA"/>
      <!-- Left Hand on Table edge -->
      <path d="M16 90L5 130L2 145" stroke="#1E293B" stroke-width="10" stroke-linecap="round"/>
      <!-- Head & Beanie -->
      <circle cx="35" cy="50" r="18" fill="#FED7AA"/>
      <path d="M18 48C18 30 30 24 48 24C58 24 58 35 58 48Z" fill="#334155"/>
    </g>

    <!-- Dev 3: Center-Right Seated Developer (Typing on mechanical keyboard, glasses) -->
    <g transform="translate(710, 370)">
      <!-- Torso / Green Hoodie -->
      <path d="M10 130C10 70 65 70 65 130Z" fill="${GOOGLE_COLORS.green}"/>
      <!-- Arms bent forward to keyboard -->
      <path d="M20 85L45 105L75 90" stroke="${GOOGLE_COLORS.green}" stroke-width="12" stroke-linecap="round"/>
      <!-- Head -->
      <circle cx="38" cy="42" r="19" fill="#FDE047"/>
      <path d="M18 40C18 20 35 15 52 18C58 20 58 32 58 40Z" fill="#172554"/>
      <!-- Round Glasses -->
      <circle cx="32" cy="40" r="6" fill="none" stroke="#0F172A" stroke-width="2"/>
      <circle cx="46" cy="40" r="6" fill="none" stroke="#0F172A" stroke-width="2"/>
      <line x1="38" y1="40" x2="40" y2="40" stroke="#0F172A" stroke-width="2"/>
    </g>

    <!-- Dev 4: Far Right Seated Developer (Yellow hoodie, headphones, second laptop) -->
    <g transform="translate(980, 360)">
      <!-- Chair Backrest -->
      <rect x="70" y="40" width="18" height="90" rx="8" fill="#0F172A" stroke="#334155" stroke-width="2"/>
      <!-- Torso / Yellow Hoodie with Dark Ink Contrast -->
      <path d="M10 120C10 70 55 70 55 120Z" fill="${GOOGLE_COLORS.yellow}"/>
      <!-- Arm to desk -->
      <path d="M25 80L-10 100L-30 95" stroke="${GOOGLE_COLORS.yellow}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Head & Hair -->
      <circle cx="32" cy="45" r="20" fill="#FDBA74"/>
      <path d="M15 42C15 22 28 16 48 18C52 30 50 42 50 42Z" fill="#312E81"/>
      <!-- Over-ear Headphones in Dark Ink #111827 -->
      <path d="M18 42C18 20 48 20 48 42" stroke="#111827" stroke-width="5" fill="none"/>
      <rect x="14" y="38" width="8" height="14" rx="3" fill="#111827"/>
      <rect x="44" y="38" width="8" height="14" rx="3" fill="#111827"/>
      <!-- Secondary Laptop on right -->
      <g transform="translate(-40, 85)">
        <polygon points="0,20 35,20 40,28 -5,28" fill="#475569"/>
        <rect x="0" y="0" width="34" height="20" rx="2" fill="${GOOGLE_COLORS.green}"/>
      </g>
    </g>

    <!-- Architectural HUD Overlays -->
    <g transform="translate(60, 45)">
      <rect x="0" y="0" width="340" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <circle cx="16" cy="15" r="4" fill="${GOOGLE_COLORS.red}"/>
      <text x="30" y="19" font-family="monospace" font-size="11" font-weight="bold" fill="#E2E8F0">SCENE 02 // 24-HOUR HACKATHON BUILD TABLE</text>
    </g>
    <g transform="translate(980, 45)">
      <rect x="0" y="0" width="360" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <text x="345" y="19" font-family="monospace" font-size="11" font-weight="bold" fill="#94A3B8" text-anchor="end">CSE SYSTEMS LAB · ACTIVE CODE CRUCIBLE</text>
    </g>
  </svg>`,

  // 3. Hybrid Tech Broadcast & Livestream Studio
  'broadcast-livestream-studio.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 800" fill="none">
    <defs>
      <linearGradient id="studioBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#060912"/>
        <stop offset="60%" stop-color="#0B1120"/>
        <stop offset="100%" stop-color="#111827"/>
      </linearGradient>
      <linearGradient id="ledWall" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0B132B"/>
        <stop offset="50%" stop-color="#172554"/>
        <stop offset="100%" stop-color="#0B132B"/>
      </linearGradient>
      <linearGradient id="studioDeskGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="50%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#1E293B"/>
      </linearGradient>
      <filter id="bloomStudio" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="15" result="glow"/>
        <feComposite in="SourceGraphic" in2="glow" operator="over"/>
      </filter>
    </defs>

    <!-- Studio Dark Backdrop -->
    <rect width="1400" height="800" fill="url(#studioBg)"/>

    <!-- Acoustic Slat Soundproofing Wall Textures -->
    <g stroke="rgba(255,255,255,0.05)" stroke-width="2">
      ${[40, 70, 100, 130, 160, 1240, 1270, 1300, 1330, 1360].map(x => `
        <line x1="${x}" y1="0" x2="${x}" y2="500"/>
      `).join('')}
    </g>

    <!-- Overhead Studio Lighting Grid Truss with Softboxes -->
    <line x1="200" y1="40" x2="1200" y2="40" stroke="#475569" stroke-width="6"/>
    <!-- 4 Angled Softbox Fixtures -->
    <g>
      <rect x="280" y="42" width="90" height="35" rx="6" fill="#1E293B" stroke="#64748B" stroke-width="1.5" transform="rotate(15 280 42)"/>
      <rect x="520" y="42" width="90" height="35" rx="6" fill="#1E293B" stroke="#64748B" stroke-width="1.5" transform="rotate(5 520 42)"/>
      <rect x="790" y="42" width="90" height="35" rx="6" fill="#1E293B" stroke="#64748B" stroke-width="1.5" transform="rotate(-5 790 42)"/>
      <rect x="1030" y="42" width="90" height="35" rx="6" fill="#1E293B" stroke="#64748B" stroke-width="1.5" transform="rotate(-15 1030 42)"/>
    </g>

    <!-- Massive Curved LED Video Backdrop Wall -->
    <g filter="url(#bloomStudio)">
      <rect x="180" y="70" width="1040" height="380" rx="24" fill="url(#ledWall)" stroke="#334155" stroke-width="3"/>
      <!-- Inner High-Tech Display -->
      <rect x="196" y="86" width="1008" height="348" rx="18" fill="#0A0E1A"/>

      <!-- Left Segment: Dynamic Multichannel Audio Waveform Bars -->
      <g transform="translate(230, 180)">
        <text x="0" y="-30" font-family="monospace" font-size="11" font-weight="bold" fill="#94A3B8">AUDIO INPUT SPECTRUM</text>
        ${[18, 45, 80, 120, 95, 60, 110, 140, 130, 85, 40, 75, 105, 65, 30].map((h, idx) => `
          <rect x="${idx * 16}" y="${140 - h}" width="10" height="${h}" rx="3" fill="${idx % 4 === 0 ? GOOGLE_COLORS.blue : idx % 4 === 1 ? GOOGLE_COLORS.green : idx % 4 === 2 ? GOOGLE_COLORS.yellow : GOOGLE_COLORS.red}"/>
        `).join('')}
      </g>

      <!-- Center Segment: GDG RVCE LIVE Emblem & Broadcast Graphics -->
      <g transform="translate(580, 140)">
        <circle cx="120" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2" stroke-dasharray="6 4"/>
        <!-- GDG Chevron Emblem -->
        <path d="M85 55L65 80L85 105" stroke="${GOOGLE_COLORS.red}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M65 80L85 105" stroke="${GOOGLE_COLORS.blue}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M155 55L175 80L155 105" stroke="${GOOGLE_COLORS.green}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M175 80L155 105" stroke="${GOOGLE_COLORS.yellow}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>

        <text x="120" y="180" font-family="sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">GDG RVCE LIVE</text>
        <text x="120" y="202" font-family="monospace" font-size="11" font-weight="bold" fill="${GOOGLE_COLORS.green}" text-anchor="middle">HYBRID TECH BROADCAST · CH 01</text>
      </g>

      <!-- Right Segment: Stream Telemetry & Chat Feed -->
      <g transform="translate(900, 130)">
        <text x="0" y="20" font-family="monospace" font-size="11" font-weight="bold" fill="#94A3B8">STREAM TELEMETRY</text>
        <rect x="0" y="32" width="260" height="34" rx="6" fill="#1E293B"/>
        <circle cx="16" cy="49" r="4" fill="${GOOGLE_COLORS.green}"/>
        <text x="28" y="53" font-family="monospace" font-size="10" fill="#FFFFFF">1080p60 · 14.8 Mbps · 0% Drop</text>

        <rect x="0" y="74" width="260" height="34" rx="6" fill="#1E293B"/>
        <circle cx="16" cy="91" r="4" fill="${GOOGLE_COLORS.blue}"/>
        <text x="28" y="95" font-family="monospace" font-size="10" fill="#FFFFFF">Live Nodes: GKE + Cloud Run</text>

        <rect x="0" y="116" width="260" height="34" rx="6" fill="#1E293B"/>
        <circle cx="16" cy="133" r="4" fill="${GOOGLE_COLORS.yellow}"/>
        <text x="28" y="137" font-family="monospace" font-size="10" fill="#FFFFFF">Interactive Q&amp;A Queue: Active</text>
      </g>
    </g>

    <!-- Studio Floor with Reflective Shading -->
    <rect x="0" y="520" width="1400" height="280" fill="#0A0E1A"/>
    <line x1="0" y1="520" x2="1400" y2="520" stroke="#1E293B" stroke-width="2"/>

    <!-- Modern Curved Studio Anchor Desk -->
    <g transform="translate(260, 440)">
      <!-- Main Desk Base Slab -->
      <polygon points="40,160 840,160 880,40 0,40" fill="url(#studioDeskGrad)" stroke="#475569" stroke-width="2.5"/>
      <!-- Desk Front Facing Bevel -->
      <polygon points="40,160 840,160 840,180 40,180" fill="#0F172A" stroke="#334155" stroke-width="2"/>
      <!-- Google 4-Color Ambient Rim Light on Desk -->
      <line x1="40" y1="160" x2="240" y2="160" stroke="${GOOGLE_COLORS.blue}" stroke-width="3"/>
      <line x1="240" y1="160" x2="440" y2="160" stroke="${GOOGLE_COLORS.red}" stroke-width="3"/>
      <line x1="440" y1="160" x2="640" y2="160" stroke="${GOOGLE_COLORS.yellow}" stroke-width="3"/>
      <line x1="640" y1="160" x2="840" y2="160" stroke="${GOOGLE_COLORS.green}" stroke-width="3"/>

      <!-- Desk Broadcast Microphones with Pop Filters -->
      <g transform="translate(220, -10)">
        <line x1="0" y1="70" x2="30" y2="20" stroke="#64748B" stroke-width="4"/>
        <line x1="30" y1="20" x2="60" y2="35" stroke="#64748B" stroke-width="4"/>
        <rect x="58" y="28" width="16" height="14" rx="4" fill="#334155" stroke="#94A3B8" stroke-width="1.5"/>
        <circle cx="78" cy="35" r="8" fill="none" stroke="${GOOGLE_COLORS.red}" stroke-width="2"/>
      </g>
      <g transform="translate(560, -10)">
        <line x1="0" y1="70" x2="-30" y2="20" stroke="#64748B" stroke-width="4"/>
        <line x1="-30" y1="20" x2="-60" y2="35" stroke="#64748B" stroke-width="4"/>
        <rect x="-74" y="28" width="16" height="14" rx="4" fill="#334155" stroke="#94A3B8" stroke-width="1.5"/>
        <circle cx="-78" cy="35" r="8" fill="none" stroke="${GOOGLE_COLORS.blue}" stroke-width="2"/>
      </g>

      <!-- Host 1 (Left Host, Seated Behind Desk) -->
      <g transform="translate(180, -90)">
        <!-- Torso in dark navy suit blazer -->
        <path d="M10 130C10 70 70 70 70 130Z" fill="#1E293B"/>
        <!-- White shirt collar & red tie -->
        <polygon points="35,70 45,70 40,90" fill="#FFFFFF"/>
        <polygon points="38,75 42,75 40,110" fill="${GOOGLE_COLORS.red}"/>
        <!-- Head -->
        <circle cx="40" cy="40" r="20" fill="#FDBA74"/>
        <path d="M20 38C20 18 35 15 55 18C60 25 58 38 58 38Z" fill="#0F172A"/>
      </g>

      <!-- Host 2 (Right Host, Seated Behind Desk, Laptop Open) -->
      <g transform="translate(600, -90)">
        <!-- Torso in green hoodie -->
        <path d="M10 130C10 70 70 70 70 130Z" fill="#065F46"/>
        <circle cx="40" cy="40" r="20" fill="#FED7AA"/>
        <path d="M20 38C20 18 35 14 56 16C60 22 58 38 58 38Z" fill="#312E81"/>
        <!-- Glasses -->
        <circle cx="34" cy="40" r="6" fill="none" stroke="#0F172A" stroke-width="2"/>
        <circle cx="48" cy="40" r="6" fill="none" stroke="#0F172A" stroke-width="2"/>
        <line x1="40" y1="40" x2="42" y2="40" stroke="#0F172A" stroke-width="2"/>
        <!-- Open Laptop on Desk -->
        <polygon points="10,120 70,120 80,135 0,135" fill="#475569"/>
        <rect x="15" y="85" width="50" height="35" rx="3" fill="#60A5FA"/>
      </g>
    </g>

    <!-- Studio Camera Viewfinder HUD Overlay (Brackets, REC indicator, lower third) -->
    <!-- Viewfinder Corner Brackets -->
    <path d="M40 70V40H70" stroke="#94A3B8" stroke-width="3" fill="none"/>
    <path d="M1360 70V40H1330" stroke="#94A3B8" stroke-width="3" fill="none"/>
    <path d="M40 730V760H70" stroke="#94A3B8" stroke-width="3" fill="none"/>
    <path d="M1360 730V760H1330" stroke="#94A3B8" stroke-width="3" fill="none"/>

    <!-- REC Indicator (Top Left) -->
    <g transform="translate(85, 45)">
      <rect x="0" y="0" width="150" height="30" rx="6" fill="#1C1917" stroke="#44403C" stroke-width="1.5"/>
      <circle cx="16" cy="15" r="5" fill="${GOOGLE_COLORS.red}"/>
      <text x="28" y="19" font-family="monospace" font-size="11" font-weight="900" fill="#FFFFFF">● REC 01:42:18</text>
    </g>

    <!-- Lower-Third Broadcast Graphic Banner (Bottom) -->
    <g transform="translate(140, 690)">
      <rect x="0" y="0" width="1120" height="55" rx="12" fill="#0A0F1D" stroke="#334155" stroke-width="2"/>
      <rect x="0" y="0" width="8" height="55" rx="4" fill="${GOOGLE_COLORS.blue}"/>
      <text x="25" y="24" font-family="sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" letter-spacing="1">HOSTS: AARAV KULKARNI &amp; SNEHA MUKHERJEE</text>
      <text x="25" y="44" font-family="monospace" font-size="11" fill="${GOOGLE_COLORS.yellow}">GDG ON CAMPUS RVCE // LIVE STREAM DESK · BENGALURU, IN</text>
      <!-- Lower Third GDG Chevron -->
      <path d="M1070 20L1080 28L1070 36" stroke="${GOOGLE_COLORS.green}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1060 20L1050 28L1060 36" stroke="${GOOGLE_COLORS.red}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>`,

  // 4. Hands-On Cloud & AI Lab
  'cloud-workshop-lab.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 800" fill="none">
    <defs>
      <linearGradient id="labBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#060913"/>
        <stop offset="60%" stop-color="#0E1626"/>
        <stop offset="100%" stop-color="#141E34"/>
      </linearGradient>
      <linearGradient id="projGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0B132B"/>
        <stop offset="100%" stop-color="#1C2541"/>
      </linearGradient>
      <pattern id="labGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
      </pattern>
    </defs>

    <rect width="1400" height="800" fill="url(#labBg)"/>
    <rect width="1400" height="800" fill="url(#labGrid)"/>

    <!-- Lab Perspective Ceiling Strip Lights -->
    <g stroke="#93C5FD" stroke-width="4" opacity="0.4">
      <line x1="200" y1="0" x2="480" y2="160"/>
      <line x1="1200" y1="0" x2="920" y2="160"/>
      <line x1="450" y1="0" x2="600" y2="160"/>
      <line x1="950" y1="0" x2="800" y2="160"/>
    </g>

    <!-- Front Classroom Wall Projection (Kubernetes & Gemini Mesh) -->
    <g transform="translate(350, 70)">
      <rect x="0" y="0" width="700" height="280" rx="16" fill="url(#projGrad)" stroke="#475569" stroke-width="2.5"/>
      <rect x="14" y="14" width="672" height="252" rx="10" fill="#0A0E1A"/>

      <text x="30" y="44" font-family="monospace" font-size="12" font-weight="bold" fill="${GOOGLE_COLORS.blue}">KUBERNETES AUTOPILOT // CLUSTER TOPOLOGY</text>
      <text x="640" y="44" font-family="monospace" font-size="11" fill="${GOOGLE_COLORS.green}" text-anchor="end">READY // 16 NODES</text>
      <line x1="30" y1="54" x2="640" y2="54" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

      <!-- Hexagonal Pod Containers & Gemini Link -->
      <g transform="translate(60, 80)">
        <!-- Ingress Hexagon -->
        <polygon points="40,20 60,32 60,56 40,68 20,56 20,32" fill="${GOOGLE_COLORS.blue}" fill-opacity="0.2" stroke="${GOOGLE_COLORS.blue}" stroke-width="2"/>
        <text x="40" y="48" font-family="monospace" font-size="9" font-weight="bold" fill="#FFFFFF" text-anchor="middle">INGRESS</text>

        <line x1="60" y1="44" x2="130" y2="44" stroke="#94A3B8" stroke-width="2" stroke-dasharray="4 2"/>

        <!-- Service Hexagons -->
        <polygon points="150,20 170,32 170,56 150,68 130,56 130,32" fill="${GOOGLE_COLORS.green}" fill-opacity="0.2" stroke="${GOOGLE_COLORS.green}" stroke-width="2"/>
        <text x="150" y="48" font-family="monospace" font-size="9" font-weight="bold" fill="#FFFFFF" text-anchor="middle">AUTH</text>

        <polygon points="240,20 260,32 260,56 240,68 220,56 220,32" fill="${GOOGLE_COLORS.yellow}" fill-opacity="0.2" stroke="${GOOGLE_COLORS.yellow}" stroke-width="2"/>
        <text x="240" y="48" font-family="monospace" font-size="9" font-weight="bold" fill="#111827" text-anchor="middle">API</text>

        <polygon points="330,20 350,32 350,56 330,68 310,56 310,32" fill="${GOOGLE_COLORS.red}" fill-opacity="0.2" stroke="${GOOGLE_COLORS.red}" stroke-width="2"/>
        <text x="330" y="48" font-family="monospace" font-size="9" font-weight="bold" fill="#FFFFFF" text-anchor="middle">TASK</text>

        <line x1="350" y1="44" x2="420" y2="44" stroke="#94A3B8" stroke-width="2" stroke-dasharray="4 2"/>

        <!-- Gemini API Node -->
        <rect x="420" y="16" width="130" height="56" rx="8" fill="#1E293B" stroke="${GOOGLE_COLORS.blue}" stroke-width="2"/>
        <text x="485" y="40" font-family="monospace" font-size="10" font-weight="bold" fill="${GOOGLE_COLORS.yellow}" text-anchor="middle">GEMINI 1.5</text>
        <text x="485" y="58" font-family="monospace" font-size="8" fill="#94A3B8" text-anchor="middle">FUNCTION MESH</text>
      </g>

      <!-- Terminal logs bar at bottom -->
      <g transform="translate(30, 200)">
        <rect x="0" y="0" width="610" height="40" rx="6" fill="#070A12"/>
        <text x="15" y="24" font-family="monospace" font-size="10" fill="${GOOGLE_COLORS.green}">$ kubectl apply -f cloud-run-mesh.yaml &gt;&gt; pods initialized in 410ms</text>
      </g>
    </g>

    <!-- Instructor Standing at Podium -->
    <g transform="translate(230, 240)">
      <!-- Instructor Podium -->
      <polygon points="10,120 40,120 35,40 5,40" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
      <rect x="0" y="36" width="50" height="8" rx="2" fill="#334155"/>
      <!-- Instructor Silhouette with Stylus -->
      <circle cx="25" cy="14" r="14" fill="#FED7AA"/>
      <path d="M10 14C10 0 25 -4 38 0C40 10 38 18 38 18Z" fill="#0F172A"/>
      <path d="M6 80C6 40 44 40 44 80Z" fill="#1E293B"/>
      <!-- Arm pointing with laser stylus at projection -->
      <path d="M35 45L60 30L95 20" stroke="#1E293B" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="20" x2="160" y2="10" stroke="${GOOGLE_COLORS.red}" stroke-width="2" stroke-dasharray="3 3"/>
    </g>

    <!-- ======================================================== -->
    <!-- Two Long Lab Benches of Pair-Programming Developers       -->
    <!-- ======================================================== -->
    <!-- Bench 1 (Midground, y=390-480) -->
    <g transform="translate(140, 390)">
      <!-- Benchtop -->
      <rect x="0" y="40" width="1120" height="30" fill="#1E293B" stroke="#334155" stroke-width="2"/>
      <!-- 3 Pairs of Workstations (6 Developers) -->
      ${[60, 240, 440, 620, 820, 1000].map((x, i) => `
        <g transform="translate(${x}, 0)">
          <!-- Developer Silhouette -->
          <circle cx="20" cy="8" r="14" fill="#334155"/>
          <path d="M2 45C2 24 38 24 38 45Z" fill="#151F32"/>
          <!-- Workstation Monitor -->
          <rect x="25" y="10" width="32" height="24" rx="2" fill="#0A0E1A" stroke="#475569" stroke-width="1.5"/>
          <rect x="27" y="12" width="28" height="20" rx="1" fill="${i % 2 === 0 ? GOOGLE_COLORS.blue : GOOGLE_COLORS.green}" fill-opacity="0.8"/>
        </g>
      `).join('')}
    </g>

    <!-- Bench 2 (Foreground, y=520-720) -->
    <g transform="translate(80, 520)">
      <!-- Heavy Foreground Benchtop -->
      <polygon points="0,50 1240,50 1200,0 40,0" fill="#1E293B" stroke="#475569" stroke-width="2"/>
      <rect x="0" y="50" width="1240" height="24" fill="#0F172A" stroke="#334155" stroke-width="2"/>
      <rect x="0" y="70" width="310" height="4" fill="${GOOGLE_COLORS.blue}"/>
      <rect x="310" y="70" width="310" height="4" fill="${GOOGLE_COLORS.red}"/>
      <rect x="620" y="70" width="310" height="4" fill="${GOOGLE_COLORS.yellow}"/>
      <rect x="930" y="70" width="310" height="4" fill="${GOOGLE_COLORS.green}"/>

      <!-- 4 Pairs of Pair-Programmers (8 Students Total) in High Detail -->
      <!-- Pair 1 (Left, Collab Debugging) -->
      <g transform="translate(60, 40)">
        <!-- Dev A (Typing) -->
        <circle cx="30" cy="15" r="18" fill="#FDBA74"/>
        <path d="M12 12C12 -4 30 -6 45 -2C48 10 46 18 46 18Z" fill="#0F172A"/>
        <path d="M8 90C8 45 52 45 52 90Z" fill="${GOOGLE_COLORS.blue}"/>
        <!-- Dev B (Leaning In, Pair Partner) -->
        <circle cx="85" cy="22" r="18" fill="#FED7AA"/>
        <path d="M68 20C68 4 82 2 98 6Z" fill="#312E81"/>
        <path d="M65 90C65 50 105 50 105 90Z" fill="#1E293B"/>
        <!-- Dual Monitors -->
        <rect x="110" y="-10" width="55" height="45" rx="3" fill="#0A0E1A" stroke="#475569" stroke-width="2"/>
        <rect x="114" y="-6" width="47" height="37" rx="2" fill="${GOOGLE_COLORS.blue}" fill-opacity="0.8"/>
      </g>

      <!-- Pair 2 (Center-Left, High-Five / Victory) -->
      <g transform="translate(380, 40)">
        <circle cx="30" cy="15" r="18" fill="#FDE047"/>
        <path d="M8 90C8 45 52 45 52 90Z" fill="${GOOGLE_COLORS.green}"/>
        <circle cx="85" cy="15" r="18" fill="#FDBA74"/>
        <path d="M65 90C65 45 105 45 105 90Z" fill="${GOOGLE_COLORS.yellow}"/>
        <!-- High Five Hands Collision with Sparkle -->
        <path d="M42 45L58 10" stroke="#FDE047" stroke-width="8" stroke-linecap="round"/>
        <path d="M72 45L58 10" stroke="#FDBA74" stroke-width="8" stroke-linecap="round"/>
        <circle cx="58" cy="10" r="5" fill="#FFFFFF"/>
        <!-- Monitor -->
        <rect x="110" y="-10" width="55" height="45" rx="3" fill="#0A0E1A" stroke="#475569" stroke-width="2"/>
        <rect x="114" y="-6" width="47" height="37" rx="2" fill="${GOOGLE_COLORS.green}" fill-opacity="0.8"/>
      </g>

      <!-- Pair 3 (Center-Right, Code Inspection) -->
      <g transform="translate(700, 40)">
        <circle cx="30" cy="15" r="18" fill="#FED7AA"/>
        <path d="M8 90C8 45 52 45 52 90Z" fill="${GOOGLE_COLORS.red}"/>
        <circle cx="85" cy="15" r="18" fill="#FDE047"/>
        <path d="M65 90C65 45 105 45 105 90Z" fill="#1E293B"/>
        <!-- Monitor -->
        <rect x="110" y="-10" width="55" height="45" rx="3" fill="#0A0E1A" stroke="#475569" stroke-width="2"/>
        <rect x="114" y="-6" width="47" height="37" rx="2" fill="${GOOGLE_COLORS.yellow}" fill-opacity="0.8"/>
      </g>

      <!-- Pair 4 (Right, Container Deployment) -->
      <g transform="translate(1000, 40)">
        <circle cx="30" cy="15" r="18" fill="#FDBA74"/>
        <path d="M8 90C8 45 52 45 52 90Z" fill="#065F46"/>
        <circle cx="85" cy="15" r="18" fill="#FED7AA"/>
        <path d="M65 90C65 45 105 45 105 90Z" fill="${GOOGLE_COLORS.blue}"/>
        <!-- Monitor -->
        <rect x="110" y="-10" width="55" height="45" rx="3" fill="#0A0E1A" stroke="#475569" stroke-width="2"/>
        <rect x="114" y="-6" width="47" height="37" rx="2" fill="${GOOGLE_COLORS.red}" fill-opacity="0.8"/>
      </g>
    </g>

    <!-- Architectural HUD Badges -->
    <g transform="translate(60, 45)">
      <rect x="0" y="0" width="340" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <circle cx="16" cy="15" r="4" fill="${GOOGLE_COLORS.green}"/>
      <text x="30" y="19" font-family="monospace" font-size="11" font-weight="bold" fill="#E2E8F0">SCENE 04 // HANDS-ON CLOUD &amp; AI SYSTEMS LAB</text>
    </g>
    <g transform="translate(980, 45)">
      <rect x="0" y="0" width="360" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <text x="345" y="19" font-family="monospace" font-size="11" font-weight="bold" fill="#94A3B8" text-anchor="end">ROOM 304 · KOTLIN &amp; CLOUD SYSTEMS LAB</text>
    </g>
  </svg>`,

  // 5. Prototype Demo Day Stage
  'demo-day-showcase.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 800" fill="none">
    <defs>
      <linearGradient id="demoBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#080C14"/>
        <stop offset="50%" stop-color="#111726"/>
        <stop offset="100%" stop-color="#1A2238"/>
      </linearGradient>
      <linearGradient id="phoneScreenGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#0A0D14"/>
      </linearGradient>
      <filter id="demoGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="18" result="glow"/>
        <feComposite in="SourceGraphic" in2="glow" operator="over"/>
      </filter>
    </defs>

    <rect width="1400" height="800" fill="url(#demoBg)"/>

    <!-- Stage Spotlight Wash (Yellow & Red Ambient Stage Glow) -->
    <circle cx="950" cy="350" r="340" fill="${GOOGLE_COLORS.yellow}" fill-opacity="0.08" filter="url(#demoGlow)"/>
    <circle cx="600" cy="380" r="280" fill="${GOOGLE_COLORS.red}" fill-opacity="0.06" filter="url(#demoGlow)"/>

    <!-- ======================================================== -->
    <!-- Giant Vertical Interactive Mobile/Tablet UI Frame        -->
    <!-- ======================================================== -->
    <g transform="translate(740, 80)" filter="url(#demoGlow)">
      <!-- Outer Device Bezel -->
      <rect x="0" y="0" width="460" height="570" rx="36" fill="#050811" stroke="#475569" stroke-width="4"/>
      <!-- Inner Screen -->
      <rect x="14" y="14" width="432" height="542" rx="28" fill="url(#phoneScreenGrad)"/>

      <!-- Device Status Bar -->
      <circle cx="216" cy="30" r="5" fill="#000000"/>
      <text x="45" y="34" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF">09:41</text>
      <g fill="#FFFFFF" transform="translate(370, 24)">
        <rect x="0" y="0" width="18" height="10" rx="2" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
        <rect x="2" y="2" width="10" height="6" fill="#FFFFFF"/>
      </g>

      <!-- App Header -->
      <g transform="translate(35, 60)">
        <text x="0" y="18" font-family="sans-serif" font-size="18" font-weight="900" fill="#FFFFFF">RVCE CAMPUS HUB</text>
        <text x="0" y="34" font-family="monospace" font-size="10" fill="${GOOGLE_COLORS.blue}">AUTONOMOUS STUDENT ASSISTANT</text>
      </g>

      <!-- Interactive Multimodal Search Pill -->
      <g transform="translate(35, 110)">
        <rect x="0" y="0" width="362" height="42" rx="21" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
        <circle cx="22" cy="21" r="7" fill="${GOOGLE_COLORS.yellow}"/>
        <text x="40" y="26" font-family="sans-serif" font-size="11" fill="#94A3B8">Ask Gemini 1.5 Pro anything...</text>
      </g>

      <!-- App Cards inside Demo Screen -->
      <g transform="translate(35, 175)">
        <rect x="0" y="0" width="362" height="100" rx="14" fill="#1E293B" stroke="${GOOGLE_COLORS.blue}" stroke-width="1.5"/>
        <rect x="15" y="15" width="40" height="40" rx="10" fill="${GOOGLE_COLORS.blue}" fill-opacity="0.2"/>
        <path d="M30 30L35 38L45 28" stroke="${GOOGLE_COLORS.blue}" stroke-width="3" stroke-linecap="round"/>
        <text x="70" y="32" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">Lecture Schedule Optimizer</text>
        <text x="70" y="48" font-family="sans-serif" font-size="11" fill="#94A3B8">Resolved 14 timetable conflicts</text>
        <rect x="70" y="60" width="80" height="20" rx="4" fill="${GOOGLE_COLORS.green}"/>
        <text x="110" y="74" font-family="monospace" font-size="9" font-weight="bold" fill="#FFFFFF" text-anchor="middle">VERIFIED</text>
      </g>

      <g transform="translate(35, 295)">
        <rect x="0" y="0" width="362" height="100" rx="14" fill="#1E293B" stroke="${GOOGLE_COLORS.yellow}" stroke-width="1.5"/>
        <rect x="15" y="15" width="40" height="40" rx="10" fill="${GOOGLE_COLORS.yellow}" fill-opacity="0.2"/>
        <circle cx="35" cy="35" r="8" fill="${GOOGLE_COLORS.yellow}"/>
        <text x="70" y="32" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF">Exam Hall Navigation &amp; Path</text>
        <text x="70" y="48" font-family="sans-serif" font-size="11" fill="#94A3B8">Augmented Reality Compass Live</text>
      </g>

      <!-- Metrics Telemetry Bar at Screen Base -->
      <g transform="translate(35, 420)">
        <rect x="0" y="0" width="362" height="50" rx="10" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
        <text x="20" y="24" font-family="monospace" font-size="10" font-weight="bold" fill="${GOOGLE_COLORS.green}">INP: 24MS</text>
        <text x="140" y="24" font-family="monospace" font-size="10" font-weight="bold" fill="${GOOGLE_COLORS.blue}">ZERO-CLS</text>
        <text x="260" y="24" font-family="monospace" font-size="10" font-weight="bold" fill="${GOOGLE_COLORS.yellow}">WCAG AAA</text>
        <text x="20" y="40" font-family="monospace" font-size="9" fill="#64748B">LATENCY 12MS // CLIENTSIDE STREAMING</text>
      </g>
    </g>

    <!-- Floating Holographic Metric Badges Beside Phone -->
    <g transform="translate(1120, 240)">
      <rect x="0" y="0" width="220" height="50" rx="10" fill="#0A0F1D" stroke="${GOOGLE_COLORS.green}" stroke-width="2"/>
      <circle cx="20" cy="25" r="5" fill="${GOOGLE_COLORS.green}"/>
      <text x="35" y="24" font-family="monospace" font-size="11" font-weight="bold" fill="#FFFFFF">LIGHTHOUSE 100</text>
      <text x="35" y="40" font-family="monospace" font-size="9" fill="#94A3B8">PERFECT CORE VITALS</text>
    </g>
    <g transform="translate(1120, 360)">
      <rect x="0" y="0" width="220" height="50" rx="10" fill="#0A0F1D" stroke="${GOOGLE_COLORS.yellow}" stroke-width="2"/>
      <circle cx="20" cy="25" r="5" fill="${GOOGLE_COLORS.yellow}"/>
      <text x="35" y="24" font-family="monospace" font-size="11" font-weight="bold" fill="#FFFFFF">TOOL-CALLING AI</text>
      <text x="35" y="40" font-family="monospace" font-size="9" fill="#94A3B8">STRUCTURED JSON SCHEMA</text>
    </g>

    <!-- Confident Presenter on Stage Gesturing at the Big Screen -->
    <g transform="translate(560, 320)">
      <!-- Shadow -->
      <ellipse cx="25" cy="180" rx="40" ry="12" fill="#000000" fill-opacity="0.4"/>
      <!-- Torso & Blue Hoodie -->
      <path d="M5 180L12 90C12 60 45 60 45 90L52 180Z" fill="${GOOGLE_COLORS.blue}"/>
      <!-- Outstretched Right Arm pointing at phone -->
      <path d="M42 90L90 70L145 60" stroke="${GOOGLE_COLORS.blue}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="150" cy="60" r="7" fill="#FDBA74"/>
      <!-- Left Arm in Pocket -->
      <path d="M12 90L5 130" stroke="${GOOGLE_COLORS.blue}" stroke-width="12" stroke-linecap="round"/>
      <!-- Head with Hair -->
      <circle cx="28" cy="45" r="20" fill="#FDBA74"/>
      <path d="M10 42C10 20 28 15 48 18C52 28 50 40 50 40Z" fill="#1E293B"/>
    </g>

    <!-- Semicircular Tiered Amphitheater Audience & Jury (Left side) -->
    <!-- Tier 1 (Jury Front Row, y=440-540) -->
    <g transform="translate(60, 440)">
      <path d="M0 60 Q 240 60 460 120" stroke="#334155" stroke-width="18" fill="none"/>
      <!-- 3 Industry Judges with Evaluation Tablets -->
      ${[60, 190, 320].map((x, i) => `
        <g transform="translate(${x}, 0)">
          <circle cx="25" cy="15" r="16" fill="#FED7AA"/>
          <path d="M10 12C10 -2 25 -4 40 0Z" fill="#0F172A"/>
          <path d="M6 70C6 35 44 35 44 70Z" fill="#1E293B"/>
          <!-- Tablet in hands -->
          <rect x="15" y="35" width="26" height="34" rx="2" fill="#0A0E1A" stroke="${i === 1 ? GOOGLE_COLORS.yellow : GOOGLE_COLORS.blue}" stroke-width="1.5"/>
        </g>
      `).join('')}
    </g>

    <!-- Tier 2 (Peer Students, y=560-680) -->
    <g transform="translate(40, 560)">
      <path d="M0 60 Q 280 60 520 120" stroke="#1E293B" stroke-width="18" fill="none"/>
      <!-- 5 Engaged Students Taking Notes -->
      ${[40, 140, 240, 340, 440].map((x, i) => `
        <g transform="translate(${x}, 0)">
          <circle cx="22" cy="15" r="15" fill="#FDBA74"/>
          <path d="M5 70C5 35 40 35 40 70Z" fill="${i % 2 === 0 ? GOOGLE_COLORS.green : GOOGLE_COLORS.red}"/>
        </g>
      `).join('')}
    </g>

    <!-- Architectural HUD Badges -->
    <g transform="translate(60, 45)">
      <rect x="0" y="0" width="340" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <circle cx="16" cy="15" r="4" fill="${GOOGLE_COLORS.yellow}"/>
      <text x="30" y="19" font-family="monospace" font-size="11" font-weight="bold" fill="#E2E8F0">SCENE 05 // PROTOTYPE DEMO DAY SHOWCASE</text>
    </g>
    <g transform="translate(980, 45)">
      <rect x="0" y="0" width="360" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <text x="345" y="19" font-family="monospace" font-size="11" font-weight="bold" fill="#94A3B8" text-anchor="end">EXHIBITION STAGE · PEER JURY REVIEW</text>
    </g>
  </svg>`,

  // 6. Evening Open-Source Code Jam
  'open-source-night-jam.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 800" fill="none">
    <defs>
      <linearGradient id="terraceNight" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#050811"/>
        <stop offset="60%" stop-color="#0C1222"/>
        <stop offset="100%" stop-color="#141B30"/>
      </linearGradient>
      <linearGradient id="skyCity" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0A122A"/>
        <stop offset="70%" stop-color="#1E1B4B"/>
        <stop offset="100%" stop-color="#312E81"/>
      </linearGradient>
      <radialGradient id="fairyGlow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stop-color="#FBBC04" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#FBBC04" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="1400" height="800" fill="url(#terraceNight)"/>

    <!-- ======================================================== -->
    <!-- Architectural Glass Wall with 3 Sweeping Arches          -->
    <!-- ======================================================== -->
    <!-- Beyond Glass: Twilight Bengaluru Skyline -->
    <g>
      <!-- Arches Window Mask/Bounds -->
      <path d="M 60 500 V 220 A 180 180 0 0 1 420 220 V 500 Z" fill="url(#skyCity)"/>
      <path d="M 520 500 V 220 A 180 180 0 0 1 880 220 V 500 Z" fill="url(#skyCity)"/>
      <path d="M 980 500 V 220 A 180 180 0 0 1 1340 220 V 500 Z" fill="url(#skyCity)"/>

      <!-- Skyline Silhouettes (Distant Towers & Campus Trees) -->
      <g fill="#060913">
        <rect x="120" y="380" width="50" height="120"/>
        <rect x="190" y="320" width="60" height="180"/>
        <rect x="270" y="360" width="40" height="140"/>

        <rect x="580" y="340" width="70" height="160"/>
        <rect x="670" y="290" width="80" height="210"/>
        <polygon points="710,240 670,290 750,290" fill="#060913"/>
        <rect x="770" y="370" width="50" height="130"/>

        <rect x="1050" y="350" width="60" height="150"/>
        <rect x="1140" y="310" width="70" height="190"/>
        <rect x="1230" y="370" width="50" height="130"/>
      </g>
      <!-- Stars in Sky -->
      <g fill="#FFFFFF" opacity="0.7">
        <circle cx="200" cy="180" r="1.5"/><circle cx="340" cy="140" r="1.5"/><circle cx="700" cy="120" r="2"/>
        <circle cx="820" cy="160" r="1.5"/><circle cx="1120" cy="150" r="2"/><circle cx="1250" cy="130" r="1.5"/>
      </g>
      <!-- Crescent Moon in center arch -->
      <path d="M740 140 A 16 16 0 1 0 760 168 A 14 14 0 1 1 740 140 Z" fill="${GOOGLE_COLORS.yellow}"/>

      <!-- Heavy Architectural Frame Arches (Interior Timber/Steel) -->
      <path d="M 60 500 V 220 A 180 180 0 0 1 420 220 V 500" stroke="#334155" stroke-width="12" fill="none"/>
      <path d="M 520 500 V 220 A 180 180 0 0 1 880 220 V 500" stroke="#334155" stroke-width="12" fill="none"/>
      <path d="M 980 500 V 220 A 180 180 0 0 1 1340 220 V 500" stroke="#334155" stroke-width="12" fill="none"/>
    </g>

    <!-- Hanging Ceiling String Fairy Lights (Warm Golden #FBBC04) -->
    <path d="M 0 60 Q 350 120 700 70 Q 1050 120 1400 60" stroke="#475569" stroke-width="2" fill="none"/>
    ${[100, 220, 340, 460, 580, 700, 820, 940, 1060, 1180, 1300].map(x => `
      <circle cx="${x}" cy="${80 + Math.sin(x) * 15}" r="6" fill="${GOOGLE_COLORS.yellow}"/>
      <circle cx="${x}" cy="${80 + Math.sin(x) * 15}" r="16" fill="url(#fairyGlow)"/>
    `).join('')}

    <!-- Central Projection Wall (Git Commit-Tree DAG) -->
    <g transform="translate(380, 90)">
      <rect x="0" y="0" width="640" height="260" rx="16" fill="#0A0E1A" stroke="#334155" stroke-width="2"/>
      <text x="24" y="30" font-family="monospace" font-size="11" font-weight="bold" fill="#94A3B8">GIT TREE // REPO: GDG-RVCE/CORE-WEB</text>
      <text x="610" y="30" font-family="monospace" font-size="10" font-weight="bold" fill="${GOOGLE_COLORS.green}" text-anchor="end">ALL CHECKS PASSED ✔</text>
      <line x1="24" y1="40" x2="610" y2="40" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

      <!-- Git DAG Visual Tree -->
      <g transform="translate(50, 70)">
        <!-- Main Branch Line (Blue) -->
        <line x1="0" y1="80" x2="520" y2="80" stroke="${GOOGLE_COLORS.blue}" stroke-width="4"/>
        <!-- Feature Branch Curve (Green) -->
        <path d="M 80 80 C 140 80, 160 20, 220 20 L 340 20 C 400 20, 420 80, 460 80" stroke="${GOOGLE_COLORS.green}" stroke-width="4" fill="none"/>

        <!-- Commit Nodes -->
        <circle cx="80" cy="80" r="10" fill="#1E293B" stroke="${GOOGLE_COLORS.blue}" stroke-width="3"/>
        <text x="80" y="105" font-family="monospace" font-size="9" fill="#94A3B8" text-anchor="middle">v1.2.0</text>

        <circle cx="220" cy="20" r="10" fill="#1E293B" stroke="${GOOGLE_COLORS.green}" stroke-width="3"/>
        <text x="220" y="10" font-family="monospace" font-size="9" fill="${GOOGLE_COLORS.green}" text-anchor="middle">feat: agent</text>

        <circle cx="340" cy="20" r="10" fill="#1E293B" stroke="${GOOGLE_COLORS.yellow}" stroke-width="3"/>
        <text x="340" y="10" font-family="monospace" font-size="9" fill="${GOOGLE_COLORS.yellow}" text-anchor="middle">fix: zero-cls</text>

        <!-- Merged Commit -->
        <circle cx="460" cy="80" r="14" fill="${GOOGLE_COLORS.green}" stroke="#FFFFFF" stroke-width="3"/>
        <text x="460" y="85" font-family="monospace" font-size="10" font-weight="bold" fill="#FFFFFF" text-anchor="middle">✔</text>
        <text x="460" y="108" font-family="monospace" font-size="9" font-weight="bold" fill="${GOOGLE_COLORS.green}" text-anchor="middle">PR #42 MERGED</text>
      </g>
    </g>

    <!-- Terrace Floor -->
    <rect x="0" y="480" width="1400" height="320" fill="#0C1220"/>
    <line x1="0" y1="480" x2="1400" y2="480" stroke="#1E293B" stroke-width="2"/>

    <!-- ======================================================== -->
    <!-- Collaborative Clusters on the Terrace                    -->
    <!-- ======================================================== -->
    <!-- Cluster 1: Left Lounge Beanbag Seating (3 Developers) -->
    <g transform="translate(140, 480)">
      <!-- Low Circular Coffee Table -->
      <ellipse cx="140" cy="140" rx="90" ry="35" fill="#1E293B" stroke="#475569" stroke-width="2"/>
      <ellipse cx="140" cy="138" rx="80" ry="30" fill="#0F172A"/>
      <!-- Mugs on table -->
      <circle cx="120" cy="135" r="6" fill="${GOOGLE_COLORS.blue}"/>
      <circle cx="160" cy="135" r="6" fill="${GOOGLE_COLORS.yellow}"/>

      <!-- Dev A (Left Beanbag) -->
      <g transform="translate(0, 70)">
        <ellipse cx="30" cy="70" rx="40" ry="25" fill="#1E293B"/>
        <circle cx="30" cy="20" r="18" fill="#FDBA74"/>
        <path d="M10 80C10 40 50 40 50 80Z" fill="${GOOGLE_COLORS.blue}"/>
        <!-- Laptop on lap -->
        <polygon points="20,60 50,60 55,75 15,75" fill="#334155"/>
        <rect x="22" y="42" width="26" height="18" rx="2" fill="#60A5FA"/>
      </g>

      <!-- Dev B (Right Beanbag) -->
      <g transform="translate(210, 70)">
        <ellipse cx="30" cy="70" rx="40" ry="25" fill="#1E293B"/>
        <circle cx="30" cy="20" r="18" fill="#FED7AA"/>
        <path d="M10 80C10 40 50 40 50 80Z" fill="${GOOGLE_COLORS.green}"/>
        <!-- Laptop on lap -->
        <polygon points="10,60 40,60 45,75 5,75" fill="#334155"/>
        <rect x="12" y="42" width="26" height="18" rx="2" fill="${GOOGLE_COLORS.green}"/>
      </g>
    </g>

    <!-- Cluster 2: Right Communal Bench Reviewing Pull Request (3 Developers) -->
    <g transform="translate(820, 460)">
      <!-- High Wooden Communal Bench -->
      <rect x="60" y="80" width="460" height="120" rx="10" fill="#1E293B" stroke="#334155" stroke-width="2"/>
      <!-- Ultrawide Monitor on Bench -->
      <rect x="180" y="0" width="220" height="90" rx="6" fill="#0A0E1A" stroke="#475569" stroke-width="2"/>
      <rect x="186" y="6" width="208" height="78" rx="3" fill="#111827"/>
      <!-- Code Diff Lines -->
      <rect x="195" y="16" width="90" height="8" rx="2" fill="${GOOGLE_COLORS.green}" fill-opacity="0.8"/>
      <rect x="195" y="28" width="110" height="8" rx="2" fill="${GOOGLE_COLORS.red}" fill-opacity="0.8"/>
      <rect x="195" y="40" width="80" height="8" rx="2" fill="${GOOGLE_COLORS.green}" fill-opacity="0.8"/>
      <rect x="195" y="52" width="130" height="8" rx="2" fill="#64748B"/>

      <!-- 3 Developers Huddled Around Ultrawide Screen -->
      <!-- Dev 1 -->
      <g transform="translate(100, 30)">
        <circle cx="25" cy="18" r="16" fill="#FDE047"/>
        <path d="M6 80C6 40 44 40 44 80Z" fill="${GOOGLE_COLORS.yellow}"/>
      </g>
      <!-- Dev 2 (Typing) -->
      <g transform="translate(240, 40)">
        <circle cx="25" cy="18" r="16" fill="#FDBA74"/>
        <path d="M6 80C6 40 44 40 44 80Z" fill="${GOOGLE_COLORS.red}"/>
      </g>
      <!-- Dev 3 -->
      <g transform="translate(390, 30)">
        <circle cx="25" cy="18" r="16" fill="#FED7AA"/>
        <path d="M6 80C6 40 44 40 44 80Z" fill="${GOOGLE_COLORS.blue}"/>
      </g>
    </g>

    <!-- Side Espresso & Refreshment Credenza -->
    <g transform="translate(560, 460)">
      <rect x="0" y="20" width="120" height="80" rx="6" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
      <rect x="20" y="0" width="35" height="24" rx="3" fill="#475569"/>
      <!-- Steam -->
      <path d="M28 -8Q25 -14 30 -18" stroke="#94A3B8" stroke-width="2" fill="none"/>
      <circle cx="80" cy="10" r="7" fill="${GOOGLE_COLORS.red}"/>
      <circle cx="95" cy="10" r="7" fill="${GOOGLE_COLORS.blue}"/>
    </g>

    <!-- Architectural HUD Badges -->
    <g transform="translate(60, 45)">
      <rect x="0" y="0" width="340" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <circle cx="16" cy="15" r="4" fill="${GOOGLE_COLORS.yellow}"/>
      <text x="30" y="19" font-family="monospace" font-size="11" font-weight="bold" fill="#E2E8F0">SCENE 06 // OPEN-SOURCE NIGHT JAM</text>
    </g>
    <g transform="translate(980, 45)">
      <rect x="0" y="0" width="360" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <text x="345" y="19" font-family="monospace" font-size="11" font-weight="bold" fill="#94A3B8" text-anchor="end">TERRACE LOUNGE · 100% OPEN REPOSITORIES</text>
    </g>
  </svg>`,

  // 7. UI/UX Design Systems Critique Studio (1400x800)
  'design-system-critique.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 800" fill="none">
    <defs>
      <linearGradient id="dsBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#070B16"/>
        <stop offset="60%" stop-color="#0C1322"/>
        <stop offset="100%" stop-color="#121B2F"/>
      </linearGradient>
      <pattern id="dsGrid" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
      </pattern>
      <filter id="dsCardGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.35"/>
      </filter>
    </defs>

    <rect width="1400" height="800" fill="url(#dsBg)"/>
    <rect width="1400" height="800" fill="url(#dsGrid)"/>

    <!-- Ceiling Studio Track Lighting and Spotlights -->
    <line x1="80" y1="25" x2="1320" y2="25" stroke="#334155" stroke-width="5"/>
    <g fill="#475569">
      <rect x="220" y="27" width="28" height="14" rx="2"/>
      <rect x="520" y="27" width="28" height="14" rx="2"/>
      <rect x="850" y="27" width="28" height="14" rx="2"/>
      <rect x="1150" y="27" width="28" height="14" rx="2"/>
    </g>
    <!-- Spotlight Cones -->
    <polygon points="234,41 120,480 380,480" fill="rgba(66, 133, 244, 0.03)"/>
    <polygon points="534,41 420,480 680,480" fill="rgba(234, 67, 53, 0.03)"/>
    <polygon points="864,41 740,480 1000,480" fill="rgba(251, 188, 4, 0.03)"/>
    <polygon points="1164,41 1020,480 1280,480" fill="rgba(52, 168, 83, 0.03)"/>

    <!-- Architectural Design Studio Pin-up Board (x: 100, y: 65, w: 1200, h: 420) -->
    <g transform="translate(100, 65)">
      <!-- Board Outer Frame -->
      <rect x="0" y="0" width="1200" height="420" rx="14" fill="#0A0E1A" stroke="#334155" stroke-width="2.5" filter="url(#dsCardGlow)"/>
      <rect x="8" y="8" width="1184" height="404" rx="10" fill="#0D1424"/>
      <!-- Felt Pinboard Inner Border -->
      <line x1="410" y1="8" x2="410" y2="412" stroke="#1E293B" stroke-width="2"/>
      <line x1="790" y1="8" x2="790" y2="412" stroke="#1E293B" stroke-width="2"/>

      <!-- SECTION A (LEFT): 4 GOOGLE COLOUR TOKEN SWATCHES -->
      <text x="30" y="38" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#60A5FA" letter-spacing="1">DESIGN TOKENS // PALETTE TOKENS</text>
      
      <!-- Token 1: Blue -->
      <g transform="translate(30, 54)">
        <rect x="0" y="0" width="165" height="150" rx="8" fill="#141E33" stroke="#1E293B" stroke-width="1.5"/>
        <rect x="10" y="10" width="145" height="70" rx="6" fill="${GOOGLE_COLORS.blue}"/>
        <text x="14" y="100" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold" fill="#FFFFFF">--google-blue</text>
        <text x="14" y="118" font-family="'JetBrains Mono', monospace" font-size="9" fill="#94A3B8">#4285F4 · RGB(66,133,244)</text>
        <text x="14" y="136" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="#60A5FA">WCAG 4.6:1 (AA PASS)</text>
      </g>

      <!-- Token 2: Red -->
      <g transform="translate(210, 54)">
        <rect x="0" y="0" width="165" height="150" rx="8" fill="#141E33" stroke="#1E293B" stroke-width="1.5"/>
        <rect x="10" y="10" width="145" height="70" rx="6" fill="${GOOGLE_COLORS.red}"/>
        <text x="14" y="100" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold" fill="#FFFFFF">--google-red</text>
        <text x="14" y="118" font-family="'JetBrains Mono', monospace" font-size="9" fill="#94A3B8">#EA4335 · RGB(234,67,53)</text>
        <text x="14" y="136" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="#F87171">DESTRUCTIVE / ALERT</text>
      </g>

      <!-- Token 3: Yellow (WCAG AAA with #111827 Dark Ink) -->
      <g transform="translate(30, 222)">
        <rect x="0" y="0" width="165" height="160" rx="8" fill="#141E33" stroke="#1E293B" stroke-width="1.5"/>
        <rect x="10" y="10" width="145" height="70" rx="6" fill="${GOOGLE_COLORS.yellow}"/>
        <text x="82" y="50" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="900" fill="#111827" text-anchor="middle">DARK INK ONLY</text>
        <text x="14" y="100" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold" fill="#FFFFFF">--google-yellow</text>
        <text x="14" y="118" font-family="'JetBrains Mono', monospace" font-size="9" fill="#94A3B8">#FBBC04 · INK #111827</text>
        <text x="14" y="136" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="bold" fill="#FCD34D">WCAG AAA 7.4:1 RATIO</text>
        <text x="14" y="150" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#64748B">HIGH-CONTRAST INK</text>
      </g>

      <!-- Token 4: Green -->
      <g transform="translate(210, 222)">
        <rect x="0" y="0" width="165" height="160" rx="8" fill="#141E33" stroke="#1E293B" stroke-width="1.5"/>
        <rect x="10" y="10" width="145" height="70" rx="6" fill="${GOOGLE_COLORS.green}"/>
        <text x="14" y="100" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold" fill="#FFFFFF">--google-green</text>
        <text x="14" y="118" font-family="'JetBrains Mono', monospace" font-size="9" fill="#94A3B8">#34A853 · RGB(52,168,83)</text>
        <text x="14" y="136" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="#4ADE80">SUCCESS / PASS TOKEN</text>
        <text x="14" y="150" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#64748B">CI STATUS VALIDATED</text>
      </g>

      <!-- SECTION B (CENTER): TYPOGRAPHY SCALE RULER -->
      <text x="430" y="38" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#FBBC04" letter-spacing="1">TYPOGRAPHY SCALE &amp; BASELINE RULER</text>
      
      <g transform="translate(430, 54)">
        <rect x="0" y="0" width="335" height="330" rx="8" fill="#080D18" stroke="#1E293B" stroke-width="1.5"/>
        <line x1="30" y1="10" x2="30" y2="320" stroke="#334155" stroke-width="2"/>
        
        <!-- Ruler Ticks -->
        ${Array.from({ length: 20 }).map((_, idx) => {
          const y = 20 + idx * 15;
          const isMajor = idx % 4 === 0;
          return `<line x1="${isMajor ? 14 : 22}" y1="${y}" x2="30" y2="${y}" stroke="${isMajor ? '#60A5FA' : '#475569'}" stroke-width="${isMajor ? 1.5 : 1}"/>
          ${isMajor ? `<text x="8" y="${y + 3}" font-family="monospace" font-size="7" fill="#64748B">${idx * 8}</text>` : ''}`;
        }).join('')}

        <!-- Type Specimen 1: Space Grotesk Display -->
        <g transform="translate(45, 30)">
          <line x1="0" y1="36" x2="275" y2="36" stroke="${GOOGLE_COLORS.blue}" stroke-width="1" stroke-dasharray="3 3"/>
          <text x="0" y="32" font-family="'Space Grotesk', sans-serif" font-size="28" font-weight="700" fill="#F8FAFC">Display 48px</text>
          <text x="190" y="24" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#60A5FA">Space Grotesk</text>
          <text x="190" y="34" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#64748B">LH: 1.15 · Tracking -0.02</text>
        </g>

        <!-- Type Specimen 2: Space Grotesk Heading -->
        <g transform="translate(45, 95)">
          <line x1="0" y1="28" x2="275" y2="28" stroke="${GOOGLE_COLORS.yellow}" stroke-width="1" stroke-dasharray="3 3"/>
          <text x="0" y="24" font-family="'Space Grotesk', sans-serif" font-size="20" font-weight="600" fill="#F1F5F9">Heading 32px</text>
          <text x="190" y="16" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#FCD34D">Space Grotesk</text>
          <text x="190" y="26" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#64748B">LH: 1.25 · SemiBold</text>
        </g>

        <!-- Type Specimen 3: Plus Jakarta Sans Body -->
        <g transform="translate(45, 155)">
          <line x1="0" y1="22" x2="275" y2="22" stroke="${GOOGLE_COLORS.green}" stroke-width="1" stroke-dasharray="3 3"/>
          <text x="0" y="18" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="500" fill="#E2E8F0">Body Regular 16px</text>
          <text x="190" y="12" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#4ADE80">Plus Jakarta</text>
          <text x="190" y="22" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#64748B">LH: 1.5 · Regular 400</text>
        </g>

        <!-- Type Specimen 4: JetBrains Mono Code -->
        <g transform="translate(45, 215)">
          <line x1="0" y1="20" x2="275" y2="20" stroke="${GOOGLE_COLORS.red}" stroke-width="1" stroke-dasharray="3 3"/>
          <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" fill="#93C5FD">const token = '#4285F4'</text>
          <text x="190" y="10" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#F87171">JetBrains Mono</text>
          <text x="190" y="20" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#64748B">LH: 1.4 · Monospace</text>
        </g>

        <!-- Component Slot Tag -->
        <g transform="translate(45, 275)">
          <rect x="0" y="0" width="275" height="38" rx="6" fill="#141E33" stroke="#334155" stroke-width="1"/>
          <text x="12" y="18" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" fill="#E2E8F0">&lt;Button variant=&quot;blueprint&quot; /&gt;</text>
          <text x="12" y="30" font-family="'JetBrains Mono', monospace" font-size="8" fill="#64748B">Min Target: 44×44px · Focus Ring: 2px</text>
        </g>
      </g>

      <!-- SECTION C (RIGHT): RESPONSIVE WIREFRAME BOARDS -->
      <text x="810" y="38" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#34A853" letter-spacing="1">RESPONSIVE BREAKPOINT ARTBOARDS</text>

      <g transform="translate(810, 54)">
        <!-- Mobile Frame (390px) -->
        <g transform="translate(10, 15)">
          <rect x="0" y="0" width="75" height="150" rx="8" fill="#070A12" stroke="#475569" stroke-width="1.5"/>
          <rect x="25" y="4" width="25" height="3" rx="1.5" fill="#334155"/>
          <rect x="6" y="14" width="63" height="12" rx="2" fill="${GOOGLE_COLORS.blue}" fill-opacity="0.3"/>
          <rect x="6" y="32" width="63" height="40" rx="4" fill="#1E293B"/>
          <circle cx="37" cy="52" r="10" fill="${GOOGLE_COLORS.yellow}" fill-opacity="0.4"/>
          <rect x="12" y="80" width="51" height="8" rx="2" fill="${GOOGLE_COLORS.red}" fill-opacity="0.4"/>
          <rect x="12" y="94" width="51" height="8" rx="2" fill="${GOOGLE_COLORS.green}" fill-opacity="0.4"/>
          <text x="37" y="142" font-family="'JetBrains Mono', monospace" font-size="7" font-weight="bold" fill="#94A3B8" text-anchor="middle">390px</text>
        </g>

        <!-- Tablet Frame (768px) -->
        <g transform="translate(105, 15)">
          <rect x="0" y="0" width="115" height="150" rx="8" fill="#070A12" stroke="#475569" stroke-width="1.5"/>
          <rect x="45" y="4" width="25" height="3" rx="1.5" fill="#334155"/>
          <rect x="8" y="14" width="99" height="12" rx="2" fill="#1E293B"/>
          <rect x="8" y="32" width="46" height="65" rx="3" fill="#151F33" stroke="${GOOGLE_COLORS.blue}" stroke-width="1"/>
          <rect x="60" y="32" width="46" height="65" rx="3" fill="#151F33" stroke="${GOOGLE_COLORS.green}" stroke-width="1"/>
          <rect x="8" y="104" width="99" height="20" rx="3" fill="#1E293B"/>
          <text x="57" y="142" font-family="'JetBrains Mono', monospace" font-size="7" font-weight="bold" fill="#94A3B8" text-anchor="middle">768px</text>
        </g>

        <!-- Desktop Frame (1280px) -->
        <g transform="translate(240, 15)">
          <rect x="0" y="0" width="125" height="150" rx="8" fill="#070A12" stroke="#475569" stroke-width="1.5"/>
          <rect x="0" y="0" width="125" height="12" rx="4" fill="#1E293B"/>
          <circle cx="8" cy="6" r="2" fill="#EF4444"/>
          <circle cx="15" cy="6" r="2" fill="#F59E0B"/>
          <circle cx="22" cy="6" r="2" fill="#10B981"/>
          <rect x="6" y="18" width="113" height="10" rx="2" fill="#1E293B"/>
          <rect x="6" y="32" width="34" height="88" rx="2" fill="#131B2C"/>
          <rect x="44" y="32" width="75" height="40" rx="2" fill="#1A243B" stroke="${GOOGLE_COLORS.blue}" stroke-width="1"/>
          <rect x="44" y="76" width="35" height="44" rx="2" fill="#1A243B" stroke="${GOOGLE_COLORS.yellow}" stroke-width="1"/>
          <rect x="84" y="76" width="35" height="44" rx="2" fill="#1A243B" stroke="${GOOGLE_COLORS.green}" stroke-width="1"/>
          <text x="62" y="142" font-family="'JetBrains Mono', monospace" font-size="7" font-weight="bold" fill="#94A3B8" text-anchor="middle">1280px</text>
        </g>

        <!-- Lower Design Critique Checklist Card -->
        <g transform="translate(10, 185)">
          <rect x="0" y="0" width="355" height="145" rx="8" fill="#080D18" stroke="#1E293B" stroke-width="1.5"/>
          <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" fill="#E2E8F0">AUDIT CHECKLIST // SPEC 2.0</text>
          
          <g transform="translate(14, 38)">
            <circle cx="6" cy="6" r="5" fill="${GOOGLE_COLORS.green}"/>
            <text x="6" y="9" font-family="monospace" font-size="7" font-weight="bold" fill="#FFFFFF" text-anchor="middle">✔</text>
            <text x="18" y="10" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#E2E8F0">WCAG AAA Contrast on Yellow Fill (7.4:1)</text>

            <circle cx="6" cy="28" r="5" fill="${GOOGLE_COLORS.green}"/>
            <text x="6" y="31" font-family="monospace" font-size="7" font-weight="bold" fill="#FFFFFF" text-anchor="middle">✔</text>
            <text x="18" y="32" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#E2E8F0">Touch Targets &gt;= 44×44px Minimum</text>

            <circle cx="6" cy="50" r="5" fill="${GOOGLE_COLORS.green}"/>
            <text x="6" y="53" font-family="monospace" font-size="7" font-weight="bold" fill="#FFFFFF" text-anchor="middle">✔</text>
            <text x="18" y="54" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#E2E8F0">Fluid Viewport Rulers at 390 / 768 / 1280px</text>

            <circle cx="6" cy="72" r="5" fill="${GOOGLE_COLORS.blue}"/>
            <text x="6" y="75" font-family="monospace" font-size="7" font-weight="bold" fill="#FFFFFF" text-anchor="middle">ℹ</text>
            <text x="18" y="76" font-family="'JetBrains Mono', monospace" font-size="8.5" fill="#93C5FD">Blueprint X-Ray Token Overlay (Shift+X)</text>
          </g>
        </g>
      </g>
    </g>

    <!-- Studio Floor Base (y: 500 to 800) -->
    <rect x="0" y="500" width="1400" height="300" fill="#0A0E1A"/>
    <line x1="0" y1="500" x2="1400" y2="500" stroke="#1E293B" stroke-width="2"/>

    <!-- Architectural Studio Critique Table and 3 Designers -->
    <g transform="translate(180, 480)">
      <polygon points="60,60 980,60 920,130 0,130" fill="#151D2E" stroke="#334155" stroke-width="2"/>
      <rect x="0" y="130" width="920" height="15" fill="#0C1220"/>
      <line x1="60" y1="145" x2="60" y2="280" stroke="#334155" stroke-width="8"/>
      <line x1="860" y1="145" x2="860" y2="280" stroke="#334155" stroke-width="8"/>

      <!-- MacBook on desk (Center) -->
      <g transform="translate(420, 30)">
        <polygon points="10,40 90,40 98,55 2,55" fill="#475569"/>
        <rect x="14" y="2" width="72" height="42" rx="3" fill="#0F172A" stroke="#64748B" stroke-width="1.5"/>
        <rect x="18" y="6" width="64" height="34" rx="2" fill="#1E293B"/>
        <rect x="22" y="10" width="20" height="26" fill="#3B82F6" fill-opacity="0.4"/>
        <rect x="46" y="10" width="32" height="12" fill="#10B981" fill-opacity="0.4"/>
        <rect x="46" y="24" width="32" height="12" fill="#F59E0B" fill-opacity="0.4"/>
      </g>

      <!-- iPad with Stylus (Left) -->
      <g transform="translate(160, 45)">
        <rect x="0" y="0" width="65" height="45" rx="4" fill="#0F172A" stroke="#64748B" stroke-width="1.5" transform="rotate(-10 0 0)"/>
        <line x1="55" y1="10" x2="80" y2="4" stroke="#E2E8F0" stroke-width="3" stroke-linecap="round"/>
      </g>

      <!-- Coffee Mug -->
      <g transform="translate(620, 50)">
        <rect x="0" y="0" width="16" height="20" rx="3" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
        <path d="M16 4C20 4 22 7 22 10C22 13 20 16 16 16" stroke="#475569" stroke-width="2" fill="none"/>
        <circle cx="8" cy="8" r="3" fill="${GOOGLE_COLORS.yellow}"/>
      </g>

      <!-- Scattered Color Swatches -->
      <rect x="260" y="70" width="22" height="14" rx="2" fill="${GOOGLE_COLORS.blue}" transform="rotate(12 260 70)"/>
      <rect x="290" y="65" width="22" height="14" rx="2" fill="${GOOGLE_COLORS.red}" transform="rotate(-8 290 65)"/>
      <rect x="320" y="72" width="22" height="14" rx="2" fill="${GOOGLE_COLORS.green}" transform="rotate(5 320 72)"/>

      <!-- Designer 1 (Left - Seated on stool, reviewing tablet) -->
      <g transform="translate(40, -40)">
        <circle cx="35" cy="20" r="18" fill="#FDBA74"/>
        <path d="M18 18C18 6 32 2 48 4C52 14 50 24 50 24Z" fill="#1E1B4B"/>
        <circle cx="30" cy="20" r="5" fill="none" stroke="${GOOGLE_COLORS.blue}" stroke-width="2"/>
        <circle cx="42" cy="20" r="5" fill="none" stroke="${GOOGLE_COLORS.blue}" stroke-width="2"/>
        <line x1="35" y1="20" x2="37" y2="20" stroke="${GOOGLE_COLORS.blue}" stroke-width="2"/>
        <path d="M15 90C15 45 55 45 55 90Z" fill="${GOOGLE_COLORS.blue}"/>
        <path d="M45 55L75 75L110 50" stroke="#FDBA74" stroke-width="8" stroke-linecap="round"/>
      </g>

      <!-- Designer 2 (Center - Seated at laptop, typing and inspecting) -->
      <g transform="translate(430, -50)">
        <circle cx="35" cy="20" r="18" fill="#FED7AA"/>
        <path d="M18 18C18 2 52 2 52 18Z" fill="#0F172A"/>
        <path d="M12 95C12 48 58 48 58 95Z" fill="${GOOGLE_COLORS.yellow}"/>
        <path d="M18 60L35 80" stroke="${GOOGLE_COLORS.yellow}" stroke-width="8" stroke-linecap="round"/>
        <path d="M52 60L45 80" stroke="${GOOGLE_COLORS.yellow}" stroke-width="8" stroke-linecap="round"/>
      </g>

      <!-- Designer 3 (Right - Standing tall, pointing at wireframes) -->
      <g transform="translate(760, -90)">
        <circle cx="35" cy="18" r="18" fill="#FDE047"/>
        <circle cx="28" cy="8" r="8" fill="#18181B"/>
        <circle cx="42" cy="8" r="8" fill="#18181B"/>
        <circle cx="35" cy="4" r="8" fill="#18181B"/>
        <path d="M14 140C14 60 56 60 56 140Z" fill="${GOOGLE_COLORS.green}"/>
        <path d="M48 65L75 35L110 10" stroke="#FDE047" stroke-width="9" stroke-linecap="round"/>
        <circle cx="110" cy="10" r="5" fill="#FDE047"/>
        <line x1="108" y1="14" x2="120" y2="2" stroke="${GOOGLE_COLORS.green}" stroke-width="3" stroke-linecap="round"/>
      </g>
    </g>

    <!-- Architectural HUD Badges -->
    <g transform="translate(60, 45)">
      <rect x="0" y="0" width="370" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <circle cx="16" cy="15" r="4" fill="${GOOGLE_COLORS.blue}"/>
      <text x="30" y="19" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#E2E8F0">SCENE 07 // UI/UX DESIGN SYSTEMS CRITIQUE</text>
    </g>
    <g transform="translate(930, 45)">
      <rect x="0" y="0" width="410" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <text x="395" y="19" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#94A3B8" text-anchor="end">DESIGN STUDIO LAB · TOKENS, RULERS &amp; BREAKPOINTS</text>
    </g>
  </svg>`,

  // 8. Distributed Systems & API Whiteboard Session (1400x800)
  'api-architecture-warroom.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 800" fill="none">
    <defs>
      <linearGradient id="warBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#050811"/>
        <stop offset="50%" stop-color="#0A101D"/>
        <stop offset="100%" stop-color="#101827"/>
      </linearGradient>
      <linearGradient id="glassWhiteboard" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0D1829" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#13233D" stop-opacity="0.85"/>
      </linearGradient>
      <pattern id="warGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
      </pattern>
      <filter id="glassGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#4285F4" flood-opacity="0.15"/>
      </filter>
    </defs>

    <rect width="1400" height="800" fill="url(#warBg)"/>
    <rect width="1400" height="800" fill="url(#warGrid)"/>

    <!-- Server Rack Cabinet in Background Left (y: 100 to 460) -->
    <g transform="translate(45, 90)">
      <rect x="0" y="0" width="80" height="370" rx="8" fill="#0A0E1A" stroke="#334155" stroke-width="2"/>
      ${Array.from({ length: 8 }).map((_, i) => `
        <rect x="8" y="${12 + i * 44}" width="64" height="36" rx="4" fill="#131C2E" stroke="#1E293B" stroke-width="1"/>
        <circle cx="20" cy="${30 + i * 44}" r="3" fill="${i % 3 === 0 ? GOOGLE_COLORS.green : (i % 3 === 1 ? GOOGLE_COLORS.blue : GOOGLE_COLORS.yellow)}"/>
        <circle cx="30" cy="${30 + i * 44}" r="2" fill="#34A853"/>
        <line x1="38" y1="${30 + i * 44}" x2="62" y2="${30 + i * 44}" stroke="#475569" stroke-width="1.5"/>
      `).join('')}
    </g>

    <!-- Massive Glass Whiteboard at Center (x: 160, y: 65, w: 1080, h: 420) -->
    <g transform="translate(160, 65)">
      <!-- Outer Glass Board Frame with Neon Top Edge -->
      <rect x="0" y="0" width="1080" height="420" rx="16" fill="url(#glassWhiteboard)" stroke="#475569" stroke-width="2.5" filter="url(#glassGlow)"/>
      <line x1="16" y1="0" x2="1064" y2="0" stroke="${GOOGLE_COLORS.blue}" stroke-width="3" stroke-linecap="round"/>

      <!-- Glass Board Header Bar -->
      <text x="30" y="34" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#60A5FA" letter-spacing="1">DISTRIBUTED MICROSERVICE TOPOLOGY // CLOUD RUN &amp; GEMINI MESH</text>
      <text x="1050" y="34" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="#34A853" text-anchor="end">REGION: ASIA-SOUTH1 · 99.99% SLO</text>
      <line x1="30" y1="44" x2="1050" y2="44" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

      <!-- ============================================== -->
      <!-- TOP HALF: MICROSERVICE TOPOLOGY DIAGRAM        -->
      <!-- ============================================== -->
      <!-- Ingress Node: Cloud Load Balancer (Blue) -->
      <g transform="translate(35, 65)">
        <rect x="0" y="0" width="160" height="55" rx="8" fill="#141E33" stroke="${GOOGLE_COLORS.blue}" stroke-width="2"/>
        <circle cx="16" cy="18" r="4" fill="${GOOGLE_COLORS.blue}"/>
        <text x="26" y="21" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="bold" fill="#FFFFFF">Cloud Armor &amp; LB</text>
        <text x="14" y="38" font-family="'JetBrains Mono', monospace" font-size="8" fill="#94A3B8">TLS Termination :443</text>
        <text x="14" y="48" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#60A5FA">DDoS Mitigation Active</text>
      </g>

      <!-- Connecting Arrow 1 -->
      <line x1="195" y1="92" x2="245" y2="92" stroke="#60A5FA" stroke-width="2" stroke-dasharray="4 2"/>
      <polygon points="245,88 253,92 245,96" fill="#60A5FA"/>
      <text x="220" y="84" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#94A3B8" text-anchor="middle">0.8ms</text>

      <!-- Gateway Node: Envoy Router (Green) -->
      <g transform="translate(255, 65)">
        <rect x="0" y="0" width="165" height="55" rx="8" fill="#141E33" stroke="${GOOGLE_COLORS.green}" stroke-width="2"/>
        <circle cx="16" cy="18" r="4" fill="${GOOGLE_COLORS.green}"/>
        <text x="26" y="21" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="bold" fill="#FFFFFF">API Gateway Mesh</text>
        <text x="14" y="38" font-family="'JetBrains Mono', monospace" font-size="8" fill="#94A3B8">Envoy Edge Proxy</text>
        <text x="14" y="48" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#4ADE80">HTTP/2 &amp; gRPC Multiplex</text>
      </g>

      <!-- Multi-branching Directed Bus to Downstream Services -->
      <path d="M420 92 H460 V65 H495" stroke="#94A3B8" stroke-width="1.5" fill="none"/>
      <polygon points="495,62 503,65 495,68" fill="#94A3B8"/>

      <path d="M460 92 H495" stroke="#94A3B8" stroke-width="1.5" fill="none"/>
      <polygon points="495,89 503,92 495,95" fill="#94A3B8"/>

      <path d="M460 92 V120 H495" stroke="#94A3B8" stroke-width="1.5" fill="none"/>
      <polygon points="495,117 503,120 495,123" fill="#94A3B8"/>

      <!-- Downstream Service 1: Auth and IAM (Red) -->
      <g transform="translate(505, 45)">
        <rect x="0" y="0" width="170" height="40" rx="6" fill="#1E1724" stroke="${GOOGLE_COLORS.red}" stroke-width="1.5"/>
        <text x="12" y="18" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" fill="#FFFFFF">Auth &amp; Session Store</text>
        <text x="12" y="31" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#F87171">JWT RS256 · Sub-2ms</text>
      </g>

      <!-- Downstream Service 2: Event Pipeline (Yellow) -->
      <g transform="translate(505, 95)">
        <rect x="0" y="0" width="170" height="40" rx="6" fill="#221C14" stroke="${GOOGLE_COLORS.yellow}" stroke-width="1.5"/>
        <text x="12" y="18" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" fill="#FFFFFF">Event Stream Pub/Sub</text>
        <text x="12" y="31" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#FCD34D">Kafka Mesh · 10k eps</text>
      </g>

      <!-- Connection to AI and Data Layer -->
      <line x1="675" y1="65" x2="720" y2="65" stroke="#60A5FA" stroke-width="1.5" stroke-dasharray="3 2"/>
      <polygon points="720,62 728,65 720,68" fill="#60A5FA"/>

      <line x1="675" y1="115" x2="720" y2="115" stroke="#4ADE80" stroke-width="1.5" stroke-dasharray="3 2"/>
      <polygon points="720,112 728,115 720,118" fill="#4ADE80"/>

      <!-- Gemini Multimodal Mesh (Blue) -->
      <g transform="translate(730, 42)">
        <rect x="0" y="0" width="200" height="45" rx="6" fill="#141E33" stroke="${GOOGLE_COLORS.blue}" stroke-width="2"/>
        <circle cx="14" cy="16" r="4" fill="${GOOGLE_COLORS.yellow}"/>
        <text x="24" y="19" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="bold" fill="#60A5FA">Gemini 1.5 Pro Agents</text>
        <text x="12" y="34" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#E2E8F0">Multimodal Function Calling</text>
      </g>

      <!-- Cloud Spanner and Vector DB (Green) -->
      <g transform="translate(730, 95)">
        <rect x="0" y="0" width="200" height="45" rx="6" fill="#0D211A" stroke="${GOOGLE_COLORS.green}" stroke-width="2"/>
        <circle cx="14" cy="16" r="4" fill="${GOOGLE_COLORS.green}"/>
        <text x="24" y="19" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="bold" fill="#4ADE80">Spanner Vector DB</text>
        <text x="12" y="34" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#E2E8F0">HNSW Index · Sub-10ms Cosine</text>
      </g>

      <!-- Divider line between topology and telemetry -->
      <line x1="30" y1="170" x2="1050" y2="170" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>

      <!-- ============================================== -->
      <!-- BOTTOM LEFT: LATENCY TELEMETRY WAVEFORM GRAPH  -->
      <!-- ============================================== -->
      <g transform="translate(30, 185)">
        <rect x="0" y="0" width="480" height="210" rx="10" fill="#0A0E1A" stroke="#1E293B" stroke-width="1.5"/>
        <text x="16" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold" fill="#E2E8F0">LATENCY TELEMETRY TRACING (P50 / P95 / P99)</text>
        
        <!-- Legend Pills -->
        <g transform="translate(16, 36)">
          <rect x="0" y="0" width="70" height="18" rx="4" fill="${GOOGLE_COLORS.green}" fill-opacity="0.2"/>
          <text x="35" y="12" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="bold" fill="${GOOGLE_COLORS.green}" text-anchor="middle">P50: 4.2ms</text>

          <rect x="80" y="0" width="70" height="18" rx="4" fill="${GOOGLE_COLORS.yellow}" fill-opacity="0.2"/>
          <text x="115" y="12" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="bold" fill="${GOOGLE_COLORS.yellow}" text-anchor="middle">P95: 8.8ms</text>

          <rect x="160" y="0" width="75" height="18" rx="4" fill="${GOOGLE_COLORS.blue}" fill-opacity="0.2"/>
          <text x="197" y="12" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="bold" fill="${GOOGLE_COLORS.blue}" text-anchor="middle">P99: 14.1ms</text>
        </g>

        <!-- Waveform Graph Grid and Axes -->
        <g transform="translate(45, 75)">
          <line x1="0" y1="0" x2="0" y2="100" stroke="#334155" stroke-width="1.5"/>
          <line x1="0" y1="100" x2="410" y2="100" stroke="#334155" stroke-width="1.5"/>
          <line x1="0" y1="50" x2="410" y2="50" stroke="#1E293B" stroke-width="1" stroke-dasharray="3 3"/>
          <line x1="0" y1="20" x2="410" y2="20" stroke="#1E293B" stroke-width="1" stroke-dasharray="3 3"/>

          <!-- P50 Curve (Smooth low latency, Green #34A853) -->
          <path d="M0 85 Q60 88 120 82 T240 84 T360 80 T410 83" fill="none" stroke="${GOOGLE_COLORS.green}" stroke-width="2.5"/>
          <!-- P95 Curve (Mid latency, Yellow #FBBC04) -->
          <path d="M0 65 Q60 60 120 68 T240 62 T360 64 T410 60" fill="none" stroke="${GOOGLE_COLORS.yellow}" stroke-width="2"/>
          <!-- P99 Curve (Top latency, Blue #4285F4) -->
          <path d="M0 35 Q60 25 120 40 T240 30 T360 38 T410 32" fill="none" stroke="${GOOGLE_COLORS.blue}" stroke-width="2"/>

          <!-- Axis Labels -->
          <text x="-8" y="103" font-family="monospace" font-size="7" fill="#64748B" text-anchor="end">0ms</text>
          <text x="-8" y="53" font-family="monospace" font-size="7" fill="#64748B" text-anchor="end">10ms</text>
          <text x="-8" y="23" font-family="monospace" font-size="7" fill="#64748B" text-anchor="end">20ms</text>
          <text x="200" y="115" font-family="monospace" font-size="7.5" fill="#64748B" text-anchor="middle">ROLLING 60-MINUTE WINDOW</text>
        </g>
      </g>

      <!-- ============================================== -->
      <!-- BOTTOM RIGHT: JSON PAYLOAD TERMINAL BLOCK     -->
      <!-- ============================================== -->
      <g transform="translate(530, 185)">
        <rect x="0" y="0" width="520" height="210" rx="10" fill="#060910" stroke="#1E293B" stroke-width="1.5"/>
        <rect x="0" y="0" width="520" height="26" rx="8" fill="#111827"/>
        <circle cx="16" cy="13" r="3.5" fill="#EF4444"/>
        <circle cx="28" cy="13" r="3.5" fill="#F59E0B"/>
        <circle cx="40" cy="13" r="3.5" fill="#10B981"/>
        <text x="56" y="17" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" fill="#94A3B8">PAYLOAD // HTTP 200 OK (/api/events/stream)</text>

        <!-- Syntax Highlighted JSON Body -->
        <g transform="translate(18, 44)" font-family="'JetBrains Mono', monospace" font-size="9" line-height="16">
          <text x="0" y="12" fill="#E2E8F0">{</text>
          <text x="14" y="28" fill="#93C5FD">&quot;status&quot;<tspan fill="#E2E8F0">: </tspan><tspan fill="${GOOGLE_COLORS.green}">200</tspan><tspan fill="#E2E8F0">,</tspan></text>
          <text x="14" y="44" fill="#93C5FD">&quot;region&quot;<tspan fill="#E2E8F0">: </tspan><tspan fill="${GOOGLE_COLORS.yellow}">&quot;asia-south1-bengaluru&quot;</tspan><tspan fill="#E2E8F0">,</tspan></text>
          <text x="14" y="60" fill="#93C5FD">&quot;route&quot;<tspan fill="#E2E8F0">: </tspan><tspan fill="${GOOGLE_COLORS.yellow}">&quot;/api/events/stream&quot;</tspan><tspan fill="#E2E8F0">,</tspan></text>
          <text x="14" y="76" fill="#93C5FD">&quot;telemetry&quot;<tspan fill="#E2E8F0">: {</tspan></text>
          <text x="28" y="92" fill="#93C5FD">&quot;p99_latency_ms&quot;<tspan fill="#E2E8F0">: </tspan><tspan fill="${GOOGLE_COLORS.green}">8.4</tspan><tspan fill="#E2E8F0">,</tspan></text>
          <text x="28" y="108" fill="#93C5FD">&quot;active_nodes&quot;<tspan fill="#E2E8F0">: </tspan><tspan fill="${GOOGLE_COLORS.green}">32</tspan><tspan fill="#E2E8F0">,</tspan></text>
          <text x="28" y="124" fill="#93C5FD">&quot;health&quot;<tspan fill="#E2E8F0">: </tspan><tspan fill="${GOOGLE_COLORS.green}">&quot;ZERO_PACKET_LOSS&quot;</tspan></text>
          <text x="14" y="140" fill="#E2E8F0">}</text>
          <text x="0" y="156" fill="#E2E8F0">}</text>
        </g>
      </g>
    </g>

    <!-- War Room Floor and 3 Student Engineers (y: 500 to 800) -->
    <rect x="0" y="500" width="1400" height="300" fill="#0A0E1A"/>
    <line x1="0" y1="500" x2="1400" y2="500" stroke="#1E293B" stroke-width="2"/>

    <!-- Workstation Desk with Ultrawide Monitor and 3 Engineers -->
    <g transform="translate(200, 480)">
      <!-- Desk Base -->
      <polygon points="40,55 960,55 900,120 0,120" fill="#141E30" stroke="#334155" stroke-width="2"/>
      <rect x="0" y="120" width="900" height="14" fill="#0A0F1D"/>
      <line x1="60" y1="134" x2="60" y2="280" stroke="#334155" stroke-width="8"/>
      <line x1="840" y1="134" x2="840" y2="280" stroke="#334155" stroke-width="8"/>

      <!-- Ultrawide Curved Monitor on Desk (Center) -->
      <g transform="translate(360, -10)">
        <rect x="0" y="10" width="220" height="75" rx="6" fill="#0A0E1A" stroke="#475569" stroke-width="2"/>
        <rect x="6" y="16" width="208" height="63" rx="4" fill="#0F172A"/>
        <!-- Grafana Graphs on screen -->
        <rect x="12" y="22" width="95" height="51" fill="#1E293B"/>
        <path d="M16 65 Q40 50 65 60 T100 45" fill="none" stroke="${GOOGLE_COLORS.green}" stroke-width="2"/>
        <rect x="113" y="22" width="95" height="51" fill="#1E293B"/>
        <path d="M117 60 Q140 40 165 55 T200 35" fill="none" stroke="${GOOGLE_COLORS.blue}" stroke-width="2"/>
        <rect x="95" y="85" width="30" height="18" fill="#334155"/>
        <polygon points="80,103 140,103 130,108 90,108" fill="#475569"/>
      </g>

      <!-- Keyboard and Mouse -->
      <rect x="420" y="80" width="100" height="26" rx="3" fill="#1E293B" stroke="#475569" stroke-width="1"/>
      <rect x="535" y="82" width="18" height="22" rx="6" fill="#334155"/>

      <!-- Engineer 1 (Left - Standing by glass board with dry-erase stylus) -->
      <g transform="translate(40, -90)">
        <circle cx="35" cy="18" r="18" fill="#FDBA74"/>
        <path d="M18 16C18 2 52 2 52 16Z" fill="#1E1B4B"/>
        <path d="M14 140C14 60 56 60 56 140Z" fill="${GOOGLE_COLORS.blue}"/>
        <!-- Arm extended high pointing marker at topology line -->
        <path d="M50 60L85 30L125 10" stroke="#FDBA74" stroke-width="9" stroke-linecap="round"/>
        <circle cx="125" cy="10" r="5" fill="#FDBA74"/>
        <!-- Dry-erase marker -->
        <line x1="120" y1="14" x2="135" y2="4" stroke="${GOOGLE_COLORS.blue}" stroke-width="3" stroke-linecap="round"/>
      </g>

      <!-- Engineer 2 (Center - Seated at ultrawide screen, typing commands) -->
      <g transform="translate(415, -45)">
        <circle cx="35" cy="18" r="18" fill="#FED7AA"/>
        <path d="M18 16C18 2 52 2 52 16Z" fill="#0F172A"/>
        <!-- Glasses -->
        <circle cx="29" cy="18" r="4.5" fill="none" stroke="#F8FAFC" stroke-width="1.5"/>
        <circle cx="41" cy="18" r="4.5" fill="none" stroke="#F8FAFC" stroke-width="1.5"/>
        <line x1="33.5" y1="18" x2="36.5" y2="18" stroke="#F8FAFC" stroke-width="1.5"/>
        <path d="M12 95C12 48 58 48 58 95Z" fill="${GOOGLE_COLORS.red}"/>
        <path d="M18 60L35 80" stroke="${GOOGLE_COLORS.red}" stroke-width="8" stroke-linecap="round"/>
        <path d="M52 60L45 80" stroke="${GOOGLE_COLORS.red}" stroke-width="8" stroke-linecap="round"/>
      </g>

      <!-- Engineer 3 (Right - Standing, holding laptop with telemetry) -->
      <g transform="translate(740, -85)">
        <circle cx="35" cy="18" r="18" fill="#FDE047"/>
        <circle cx="28" cy="8" r="8" fill="#18181B"/>
        <circle cx="42" cy="8" r="8" fill="#18181B"/>
        <circle cx="35" cy="4" r="8" fill="#18181B"/>
        <path d="M14 140C14 60 56 60 56 140Z" fill="${GOOGLE_COLORS.green}"/>
        <!-- Laptop in arms -->
        <g transform="translate(10, 60)">
          <polygon points="10,35 70,35 76,45 4,45" fill="#475569"/>
          <rect x="14" y="6" width="56" height="30" rx="2" fill="#0F172A" stroke="#64748B" stroke-width="1"/>
          <rect x="16" y="8" width="52" height="26" rx="1" fill="#1E293B"/>
          <line x1="20" y1="16" x2="50" y2="16" stroke="${GOOGLE_COLORS.green}" stroke-width="2"/>
          <line x1="20" y1="22" x2="60" y2="22" stroke="#94A3B8" stroke-width="1.5"/>
        </g>
      </g>
    </g>

    <!-- Architectural HUD Badges -->
    <g transform="translate(60, 45)">
      <rect x="0" y="0" width="375" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <circle cx="16" cy="15" r="4" fill="${GOOGLE_COLORS.red}"/>
      <text x="30" y="19" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#E2E8F0">SCENE 08 // DISTRIBUTED SYSTEMS WAR ROOM</text>
    </g>
    <g transform="translate(930, 45)">
      <rect x="0" y="0" width="410" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <text x="395" y="19" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#94A3B8" text-anchor="end">HIGH-THROUGHPUT SYSTEMS LAB · SUB-10MS EDGE LATENCY</text>
    </g>
  </svg>`,

  // 9. Android & Jetpack Compose Device Lab (1400x800)
  'mobile-compose-jam.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 800" fill="none">
    <defs>
      <linearGradient id="jamBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#050B14"/>
        <stop offset="60%" stop-color="#0A1424"/>
        <stop offset="100%" stop-color="#0E1A2E"/>
      </linearGradient>
      <pattern id="jamGrid" width="36" height="36" patternUnits="userSpaceOnUse">
        <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(255,255,255,0.028)" stroke-width="1"/>
      </pattern>
      <filter id="phoneShadow" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000000" flood-opacity="0.4"/>
      </filter>
    </defs>

    <rect width="1400" height="800" fill="url(#jamBg)"/>
    <rect width="1400" height="800" fill="url(#jamGrid)"/>

    <!-- Ceiling Cable Management Rails and Lights -->
    <line x1="100" y1="20" x2="1300" y2="20" stroke="#334155" stroke-width="6"/>
    <line x1="300" y1="20" x2="300" y2="70" stroke="#475569" stroke-width="2"/>
    <line x1="700" y1="20" x2="700" y2="70" stroke="#475569" stroke-width="2"/>
    <line x1="1100" y1="20" x2="1100" y2="70" stroke="#475569" stroke-width="2"/>

    <!-- Large Kotlin and Jetpack Compose Display Wall (x: 140, y: 65, w: 1120, h: 400) -->
    <g transform="translate(140, 65)">
      <rect x="0" y="0" width="1120" height="400" rx="16" fill="#0A0E1A" stroke="#334155" stroke-width="2.5"/>
      <rect x="8" y="8" width="1104" height="384" rx="12" fill="#0D1627"/>

      <!-- Header -->
      <text x="30" y="36" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#34A853" letter-spacing="1">JETPACK COMPOSE &amp; KOTLIN COROUTINES // REACTIVE UDF PIPELINE</text>
      <text x="1080" y="36" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="#60A5FA" text-anchor="end">MATERIAL 3 // ADAPTIVE MULTI-DEVICE SUITE</text>
      <line x1="30" y1="46" x2="1080" y2="46" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

      <!-- LEFT: Unidirectional Data Flow Architecture -->
      <g transform="translate(30, 65)">
        <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold" fill="#E2E8F0">UNIDIRECTIONAL DATA FLOW (UDF)</text>

        <!-- UDF Loop Blocks -->
        <!-- Block 1: UI Composable -->
        <rect x="0" y="35" width="140" height="60" rx="8" fill="#141E33" stroke="${GOOGLE_COLORS.green}" stroke-width="2"/>
        <text x="70" y="60" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="bold" fill="#FFFFFF" text-anchor="middle">@Composable UI</text>
        <text x="70" y="78" font-family="'JetBrains Mono', monospace" font-size="8" fill="#4ADE80" text-anchor="middle">Material 3 Surfaces</text>

        <!-- Arrow down: User Event -->
        <line x1="70" y1="95" x2="70" y2="135" stroke="#64748B" stroke-width="2"/>
        <polygon points="67,135 70,143 73,135" fill="#64748B"/>
        <text x="78" y="120" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#94A3B8">UI Event</text>

        <!-- Block 2: ViewModel StateFlow -->
        <rect x="0" y="145" width="140" height="60" rx="8" fill="#1E1724" stroke="${GOOGLE_COLORS.red}" stroke-width="2"/>
        <text x="70" y="170" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="bold" fill="#FFFFFF" text-anchor="middle">ViewModel</text>
        <text x="70" y="188" font-family="'JetBrains Mono', monospace" font-size="8" fill="#F87171" text-anchor="middle">StateFlow&lt;UiState&gt;</text>

        <!-- Arrow right: Coroutines Repository -->
        <line x1="140" y1="175" x2="195" y2="175" stroke="#64748B" stroke-width="2"/>
        <polygon points="195,172 203,175 195,178" fill="#64748B"/>
        <text x="170" y="168" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#94A3B8" text-anchor="middle">Launch</text>

        <!-- Block 3: Repository Flow -->
        <rect x="205" y="145" width="140" height="60" rx="8" fill="#221C14" stroke="${GOOGLE_COLORS.yellow}" stroke-width="2"/>
        <text x="275" y="170" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Repository</text>
        <text x="275" y="188" font-family="'JetBrains Mono', monospace" font-size="8" fill="#FCD34D" text-anchor="middle">Flow&lt;Data&gt;</text>

        <!-- Arrow up to State return -->
        <path d="M275 145 V65 H150" stroke="#60A5FA" stroke-width="2" fill="none"/>
        <polygon points="150,62 142,65 150,68" fill="#60A5FA"/>
        <text x="215" y="58" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#60A5FA" text-anchor="middle">Immutable State Emit</text>

        <!-- Recomposition Tree Stats -->
        <g transform="translate(0, 225)">
          <rect x="0" y="0" width="345" height="85" rx="8" fill="#080D18" stroke="#1E293B" stroke-width="1.5"/>
          <text x="14" y="22" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="bold" fill="#E2E8F0">COMPOSE COMPILER RECOMPOSITION PROFILE</text>
          <text x="14" y="42" font-family="'JetBrains Mono', monospace" font-size="8" fill="#34A853">✔ 0 unnecessary recompositions detected</text>
          <text x="14" y="58" font-family="'JetBrains Mono', monospace" font-size="8" fill="#94A3B8">✔ Skippable Composables: 98.4% (All parameters stable)</text>
          <text x="14" y="74" font-family="'JetBrains Mono', monospace" font-size="8" fill="#60A5FA">✔ Adaptive Layouts: Compact · Medium · Expanded</text>
        </g>
      </g>

      <!-- RIGHT: Kotlin 2.0 Code Card -->
      <g transform="translate(420, 65)">
        <rect x="0" y="0" width="660" height="310" rx="10" fill="#070A12" stroke="#1E293B" stroke-width="1.5"/>
        <rect x="0" y="0" width="660" height="26" rx="8" fill="#111827"/>
        <circle cx="16" cy="13" r="3.5" fill="#EF4444"/>
        <circle cx="28" cy="13" r="3.5" fill="#F59E0B"/>
        <circle cx="40" cy="13" r="3.5" fill="#10B981"/>
        <text x="56" y="17" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" fill="#94A3B8">GdgEventCard.kt // Modern Android with Jetpack Compose &amp; Material 3</text>

        <g transform="translate(20, 46)" font-family="'JetBrains Mono', monospace" font-size="9.5" line-height="18">
          <text x="0" y="14" fill="#F472B6">@Composable</text>
          <text x="0" y="32" fill="#60A5FA">fun <tspan fill="#FCD34D">GdgBlueprintCard</tspan><tspan fill="#E2E8F0">(</tspan></text>
          <text x="16" y="50" fill="#E2E8F0">event: <tspan fill="#4ADE80">EventUiState</tspan>,</text>
          <text x="16" y="68" fill="#E2E8F0">modifier: <tspan fill="#4ADE80">Modifier</tspan> = <tspan fill="#4ADE80">Modifier</tspan></text>
          <text x="0" y="86" fill="#E2E8F0">) {</text>
          <text x="16" y="104" fill="#94A3B8">// State hoisting with reactive Flow collector</text>
          <text x="16" y="122" fill="#E2E8F0">val windowSizeClass = <tspan fill="#60A5FA">LocalWindowSizeClass</tspan>.current</text>
          <text x="16" y="140" fill="#E2E8F0">val isDark = <tspan fill="#60A5FA">isSystemInDarkTheme</tspan>()</text>
          <text x="16" y="162" fill="#F472B6">Card</text>
          <text x="24" y="180" fill="#E2E8F0">colors = <tspan fill="#60A5FA">CardDefaults</tspan>.cardColors(containerColor = <tspan fill="#FCD34D">MaterialTheme</tspan>.colorScheme.surface),</text>
          <text x="24" y="198" fill="#E2E8F0">shape = <tspan fill="#FCD34D">RoundedCornerShape</tspan>(<tspan fill="#34A853">16.dp</tspan>),</text>
          <text x="24" y="216" fill="#E2E8F0">modifier = modifier.<tspan fill="#60A5FA">fillMaxWidth</tspan>().<tspan fill="#60A5FA">padding</tspan>(<tspan fill="#34A853">8.dp</tspan>)</text>
          <text x="16" y="234" fill="#E2E8F0">) { /* Responsive Composable Slot */ }</text>
          <text x="0" y="252" fill="#E2E8F0">}</text>
        </g>
      </g>
    </g>

    <!-- Device Lab Workbench and Multi-Device Test Stands (Foreground, y: 490 to 800) -->
    <rect x="0" y="490" width="1400" height="310" fill="#0A0E1A"/>
    <line x1="0" y1="490" x2="1400" y2="490" stroke="#1E293B" stroke-width="2"/>

    <!-- Collaborative Engineering Desk with 3 Test Stands -->
    <g transform="translate(180, 470)">
      <polygon points="40,50 980,50 920,130 0,130" fill="#131B2B" stroke="#334155" stroke-width="2"/>
      <rect x="0" y="130" width="920" height="15" fill="#080C14"/>
      <line x1="60" y1="145" x2="60" y2="290" stroke="#334155" stroke-width="8"/>
      <line x1="860" y1="145" x2="860" y2="290" stroke="#334155" stroke-width="8"/>

      <!-- MULTI-DEVICE TEST STANDS (Center of table) -->
      <!-- Test Stand 1: Pixel 9 Pro (Vertical) -->
      <g transform="translate(260, -40)" filter="url(#phoneShadow)">
        <polygon points="10,135 60,135 50,145 20,145" fill="#334155"/>
        <rect x="10" y="0" width="50" height="105" rx="8" fill="#0F172A" stroke="#64748B" stroke-width="2"/>
        <rect x="13" y="4" width="44" height="97" rx="6" fill="#1E293B"/>
        <!-- Screen elements -->
        <rect x="17" y="10" width="36" height="8" rx="2" fill="${GOOGLE_COLORS.blue}"/>
        <rect x="17" y="24" width="36" height="30" rx="3" fill="#141E33"/>
        <rect x="17" y="60" width="36" height="6" rx="1.5" fill="${GOOGLE_COLORS.green}"/>
        <rect x="17" y="70" width="36" height="6" rx="1.5" fill="${GOOGLE_COLORS.yellow}"/>
        <!-- Home bar -->
        <line x1="28" y1="96" x2="42" y2="96" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round"/>
        <!-- USB-C Cable connecting to hub -->
        <path d="M35 105 V130 H450" stroke="${GOOGLE_COLORS.blue}" stroke-width="2.5" fill="none"/>
      </g>

      <!-- Test Stand 2: Pixel Fold (Unfolded Widescreen) -->
      <g transform="translate(360, -55)" filter="url(#phoneShadow)">
        <polygon points="20,145 100,145 90,155 30,155" fill="#334155"/>
        <rect x="0" y="0" width="120" height="95" rx="8" fill="#0F172A" stroke="#64748B" stroke-width="2"/>
        <!-- Fold Hinge line -->
        <line x1="60" y1="0" x2="60" y2="95" stroke="#334155" stroke-width="1"/>
        <rect x="4" y="4" width="54" height="87" rx="4" fill="#1A243B"/>
        <rect x="62" y="4" width="54" height="87" rx="4" fill="#141E33"/>
        <!-- Two pane UI -->
        <rect x="8" y="10" width="46" height="6" rx="1.5" fill="${GOOGLE_COLORS.green}"/>
        <rect x="8" y="20" width="46" height="60" rx="2" fill="#0D1627"/>
        <rect x="66" y="10" width="46" height="70" rx="2" fill="#0D1627"/>
        <!-- USB-C Cable -->
        <path d="M60 95 V125 H450" stroke="${GOOGLE_COLORS.green}" stroke-width="2.5" fill="none"/>
      </g>

      <!-- Test Stand 3: Pixel Tablet on Speaker Dock -->
      <g transform="translate(530, -50)" filter="url(#phoneShadow)">
        <polygon points="15,135 135,135 125,145 25,145" fill="#334155"/>
        <rect x="0" y="0" width="150" height="95" rx="10" fill="#0F172A" stroke="#64748B" stroke-width="2"/>
        <rect x="5" y="5" width="140" height="85" rx="6" fill="#1E293B"/>
        <!-- Tablet Nav rail on left -->
        <rect x="8" y="8" width="16" height="79" rx="2" fill="#141E33"/>
        <circle cx="16" cy="18" r="3" fill="${GOOGLE_COLORS.red}"/>
        <circle cx="16" cy="30" r="3" fill="${GOOGLE_COLORS.yellow}"/>
        <circle cx="16" cy="42" r="3" fill="${GOOGLE_COLORS.green}"/>
        <!-- Dashboard cards on tablet -->
        <rect x="30" y="12" width="54" height="34" rx="3" fill="#131C2E"/>
        <rect x="90" y="12" width="50" height="34" rx="3" fill="#131C2E"/>
        <rect x="30" y="52" width="110" height="32" rx="3" fill="#131C2E"/>
        <!-- USB-C Cable -->
        <path d="M75 95 V125 H450" stroke="${GOOGLE_COLORS.yellow}" stroke-width="2.5" fill="none"/>
      </g>

      <!-- Central Multi-Port USB Debugging Hub -->
      <g transform="translate(435, 115)">
        <rect x="0" y="0" width="35" height="18" rx="3" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
        <circle cx="8" cy="9" r="2" fill="${GOOGLE_COLORS.green}"/>
        <circle cx="16" cy="9" r="2" fill="${GOOGLE_COLORS.blue}"/>
        <circle cx="24" cy="9" r="2" fill="${GOOGLE_COLORS.yellow}"/>
      </g>

      <!-- Android Figurine Mascot on Desk -->
      <g transform="translate(710, 45)">
        <ellipse cx="14" cy="18" rx="10" ry="12" fill="${GOOGLE_COLORS.green}"/>
        <circle cx="14" cy="8" r="9" fill="${GOOGLE_COLORS.green}"/>
        <circle cx="11" cy="6" r="1.5" fill="#FFFFFF"/>
        <circle cx="17" cy="6" r="1.5" fill="#FFFFFF"/>
        <line x1="10" y1="0" x2="8" y2="-4" stroke="${GOOGLE_COLORS.green}" stroke-width="2"/>
        <line x1="18" y1="0" x2="20" y2="-4" stroke="${GOOGLE_COLORS.green}" stroke-width="2"/>
      </g>

      <!-- 3 DEVELOPERS PAIR-DEBUGGING -->
      <!-- Dev 1 (Left - Typing on laptop tethered to devices) -->
      <g transform="translate(40, -45)">
        <circle cx="35" cy="18" r="18" fill="#FDBA74"/>
        <path d="M18 16C18 2 52 2 52 16Z" fill="#1E1B4B"/>
        <path d="M12 95C12 48 58 48 58 95Z" fill="${GOOGLE_COLORS.blue}"/>
        <!-- Laptop -->
        <g transform="translate(60, 45)">
          <polygon points="10,35 65,35 70,45 5,45" fill="#475569"/>
          <rect x="14" y="6" width="52" height="30" rx="2" fill="#0F172A" stroke="#64748B" stroke-width="1"/>
          <rect x="16" y="8" width="48" height="26" rx="1" fill="#1E293B"/>
          <text x="20" y="20" font-family="monospace" font-size="6" fill="${GOOGLE_COLORS.green}">adb devices: 3</text>
        </g>
      </g>

      <!-- Dev 2 (Center - Pointing at Pixel Fold) -->
      <g transform="translate(320, -50)">
        <circle cx="35" cy="18" r="18" fill="#FED7AA"/>
        <path d="M18 16C18 2 52 2 52 16Z" fill="#0F172A"/>
        <path d="M12 95C12 48 58 48 58 95Z" fill="${GOOGLE_COLORS.green}"/>
        <path d="M50 55L75 40L95 30" stroke="#FED7AA" stroke-width="8" stroke-linecap="round"/>
      </g>

      <!-- Dev 3 (Right - Holding phone testing gestures) -->
      <g transform="translate(760, -55)">
        <circle cx="35" cy="18" r="18" fill="#FDE047"/>
        <circle cx="28" cy="8" r="8" fill="#18181B"/>
        <circle cx="42" cy="8" r="8" fill="#18181B"/>
        <circle cx="35" cy="4" r="8" fill="#18181B"/>
        <path d="M14 100C14 50 56 50 56 100Z" fill="${GOOGLE_COLORS.yellow}"/>
        <!-- Phone in hands with gesture trail -->
        <g transform="translate(0, 45)">
          <rect x="0" y="0" width="22" height="40" rx="3" fill="#0F172A" stroke="#64748B" stroke-width="1"/>
          <circle cx="11" cy="20" r="4" fill="${GOOGLE_COLORS.blue}" fill-opacity="0.6"/>
        </g>
      </g>
    </g>

    <!-- Architectural HUD Badges -->
    <g transform="translate(60, 45)">
      <rect x="0" y="0" width="375" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <circle cx="16" cy="15" r="4" fill="${GOOGLE_COLORS.green}"/>
      <text x="30" y="19" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#E2E8F0">SCENE 09 // ANDROID &amp; JETPACK COMPOSE LAB</text>
    </g>
    <g transform="translate(930, 45)">
      <rect x="0" y="0" width="410" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <text x="395" y="19" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#94A3B8" text-anchor="end">DEVICE COMPATIBILITY SUITE · MATERIAL 3 &amp; KOTLIN 2.0</text>
    </g>
  </svg>`,

  // 10. Open-Source Release & Maintainer Night (1400x800)
  'open-source-release-party.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 800" fill="none">
    <defs>
      <linearGradient id="partyBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#090919"/>
        <stop offset="60%" stop-color="#111129"/>
        <stop offset="100%" stop-color="#181836"/>
      </linearGradient>
      <linearGradient id="screenGlow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#112038"/>
        <stop offset="50%" stop-color="#182A4A"/>
        <stop offset="100%" stop-color="#0F1B30"/>
      </linearGradient>
      <filter id="festiveGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>

    <rect width="1400" height="800" fill="url(#partyBg)"/>

    <!-- Overhead Industrial Steel Truss and Festive String Lights -->
    <line x1="80" y1="30" x2="1320" y2="30" stroke="#334155" stroke-width="8"/>
    
    <!-- Draped Festive Bunting and Google Color Party Lamps -->
    <!-- Swag 1 -->
    <path d="M100 30 Q300 70 500 30" stroke="#475569" stroke-width="2" fill="none"/>
    <path d="M500 30 Q700 70 900 30" stroke="#475569" stroke-width="2" fill="none"/>
    <path d="M900 30 Q1100 70 1300 30" stroke="#475569" stroke-width="2" fill="none"/>

    <!-- Festive Bulbs along swags -->
    ${[160, 240, 320, 400, 560, 640, 720, 800, 960, 1040, 1120, 1200].map((x, idx) => {
      const colors = [GOOGLE_COLORS.blue, GOOGLE_COLORS.red, GOOGLE_COLORS.yellow, GOOGLE_COLORS.green];
      const color = colors[idx % 4];
      return `<circle cx="${x}" cy="50" r="6" fill="${color}" filter="url(#festiveGlow)"/>
      <line x1="${x}" y1="30" x2="${x}" y2="44" stroke="#475569" stroke-width="1.5"/>`;
    }).join('')}

    <!-- Subtle Celebratory Geometric Confetti Particles in Air -->
    <g opacity="0.75">
      <!-- Blue diamonds -->
      <polygon points="180,120 186,126 180,132 174,126" fill="${GOOGLE_COLORS.blue}"/>
      <polygon points="1220,140 1226,146 1220,152 1214,146" fill="${GOOGLE_COLORS.blue}"/>
      <polygon points="450,90 456,96 450,102 444,96" fill="${GOOGLE_COLORS.blue}"/>
      <!-- Red triangles -->
      <polygon points="280,150 290,165 270,165" fill="${GOOGLE_COLORS.red}"/>
      <polygon points="1150,110 1160,125 1140,125" fill="${GOOGLE_COLORS.red}"/>
      <!-- Yellow squares -->
      <rect x="360" y="110" width="8" height="8" rx="1.5" fill="${GOOGLE_COLORS.yellow}" transform="rotate(25 360 110)"/>
      <rect x="1050" y="130" width="8" height="8" rx="1.5" fill="${GOOGLE_COLORS.yellow}" transform="rotate(-15 1050 130)"/>
      <rect x="700" y="80" width="8" height="8" rx="1.5" fill="${GOOGLE_COLORS.yellow}" transform="rotate(45 700 80)"/>
      <!-- Green circles -->
      <circle cx="220" cy="180" r="4" fill="${GOOGLE_COLORS.green}"/>
      <circle cx="1270" cy="180" r="4" fill="${GOOGLE_COLORS.green}"/>
      <circle cx="820" cy="95" r="4" fill="${GOOGLE_COLORS.green}"/>
    </g>

    <!-- Giant Projection Screen at Center (x: 180, y: 70, w: 1040, h: 410) -->
    <g transform="translate(180, 70)">
      <rect x="0" y="0" width="1040" height="410" rx="18" fill="url(#screenGlow)" stroke="#475569" stroke-width="3" filter="url(#festiveGlow)"/>
      <rect x="10" y="10" width="1020" height="390" rx="12" fill="#0A0E1A"/>

      <!-- Header Ribbon -->
      <rect x="10" y="10" width="1020" height="34" rx="10" fill="#141E33"/>
      <text x="30" y="32" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#60A5FA" letter-spacing="1">CENTRAL AUDITORIUM PROJECTION // STAGE A</text>
      <text x="990" y="32" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#34A853" text-anchor="end">PRODUCTION MERGE SUCCESSFUL</text>

      <!-- Huge Release Headline -->
      <g transform="translate(60, 80)">
        <text x="0" y="40" font-family="'Space Grotesk', sans-serif" font-size="44" font-weight="900" fill="#FFFFFF" letter-spacing="2">RELEASE v1.0.0 // MIT LICENSE</text>
        <text x="0" y="72" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="#FCD34D" letter-spacing="1">GDG ON CAMPUS RVCE · FLAGSHIP REPOSITORY LIVE</text>
      </g>

      <!-- Central Victory Status Card with Giant Checkmark -->
      <g transform="translate(60, 180)">
        <rect x="0" y="0" width="920" height="90" rx="12" fill="#0D211A" stroke="${GOOGLE_COLORS.green}" stroke-width="2"/>
        <!-- Giant Green Check Circle -->
        <circle cx="48" cy="45" r="28" fill="${GOOGLE_COLORS.green}"/>
        <path d="M36 45L44 53L60 37" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>

        <!-- Verification Telemetry -->
        <g transform="translate(95, 24)">
          <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="bold" fill="#FFFFFF">ALL 128 CI CHECKS PASSED · BUILD: 100% GREEN</text>
          <text x="0" y="38" font-family="'JetBrains Mono', monospace" font-size="11" fill="#4ADE80">Zero Regressions · INP &lt; 24ms · WCAG AAA Accessible · 51 Vector Assets Validated</text>
          <text x="0" y="54" font-family="'JetBrains Mono', monospace" font-size="9.5" fill="#94A3B8">Commit 7f3a9d2 · Verified GPG Key · Signed by RVCE Core Chapter Builders</text>
        </g>
      </g>

      <!-- Pull Request and Git Merge Branch Flow -->
      <g transform="translate(60, 295)">
        <rect x="0" y="0" width="920" height="85" rx="10" fill="#141E33" stroke="#334155" stroke-width="1.5"/>
        
        <!-- PR Badge -->
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="80" height="22" rx="5" fill="#10B981" fill-opacity="0.2" stroke="${GOOGLE_COLORS.green}" stroke-width="1"/>
          <text x="40" y="15" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" fill="${GOOGLE_COLORS.green}" text-anchor="middle">PR #108</text>
          <text x="95" y="16" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#F8FAFC">feat: Core Design System &amp; Multimodal Runtime Architecture</text>
        </g>

        <!-- Git Branch Diagram inside Card -->
        <g transform="translate(20, 52)">
          <!-- Main Branch Line -->
          <line x1="20" y1="14" x2="880" y2="14" stroke="#475569" stroke-width="3"/>
          <circle cx="80" cy="14" r="7" fill="#1E293B" stroke="${GOOGLE_COLORS.blue}" stroke-width="2.5"/>
          <text x="80" y="27" font-family="monospace" font-size="7.5" fill="#94A3B8" text-anchor="middle">v0.9</text>

          <circle cx="260" cy="14" r="7" fill="#1E293B" stroke="${GOOGLE_COLORS.yellow}" stroke-width="2.5"/>
          <text x="260" y="27" font-family="monospace" font-size="7.5" fill="#94A3B8" text-anchor="middle">v0.9.5</text>

          <!-- Feature Branch arc merging into main -->
          <path d="M260 14 Q380 -18 500 14" stroke="${GOOGLE_COLORS.green}" stroke-width="3" fill="none"/>
          <circle cx="380" cy="-2" r="6" fill="${GOOGLE_COLORS.green}"/>

          <!-- Glowing Green Merge Node: v1.0.0 -->
          <circle cx="500" cy="14" r="10" fill="${GOOGLE_COLORS.green}" stroke="#FFFFFF" stroke-width="2"/>
          <text x="500" y="18" font-family="monospace" font-size="9" font-weight="bold" fill="#FFFFFF" text-anchor="middle">✔</text>
          <text x="500" y="29" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="bold" fill="${GOOGLE_COLORS.green}" text-anchor="middle">tag: v1.0.0 [origin/main]</text>
        </g>
      </g>
    </g>

    <!-- Stage Platform and 3 Student Maintainers Celebrating (y: 500 to 800) -->
    <rect x="0" y="500" width="1400" height="300" fill="#0C0D1B"/>
    <line x1="0" y1="500" x2="1400" y2="500" stroke="#334155" stroke-width="2"/>

    <!-- Stage Fascia Banner -->
    <rect x="180" y="500" width="1040" height="24" fill="#141E33" stroke="#334155" stroke-width="1.5"/>
    <text x="700" y="516" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold" fill="#60A5FA" text-anchor="middle" letter-spacing="2">GDG ON CAMPUS RVCE · 100% OPEN SOURCE REPOSITORIES · BENGALURU, INDIA</text>

    <!-- Lectern / Podium (Center) -->
    <g transform="translate(640, 520)">
      <polygon points="15,140 105,140 95,20 25,20" fill="#1E293B" stroke="#475569" stroke-width="2"/>
      <rect x="10" y="14" width="100" height="12" rx="3" fill="#334155"/>
      <!-- Stickers on Podium -->
      <circle cx="45" cy="65" r="8" fill="${GOOGLE_COLORS.blue}"/>
      <text x="45" y="68" font-family="monospace" font-size="7" font-weight="bold" fill="#FFFFFF" text-anchor="middle">&lt; &gt;</text>
      <rect x="65" y="55" width="20" height="14" rx="2" fill="${GOOGLE_COLORS.green}"/>
      <text x="75" y="65" font-family="monospace" font-size="6" font-weight="bold" fill="#FFFFFF" text-anchor="middle">MIT</text>
      <rect x="35" y="85" width="26" height="14" rx="2" fill="${GOOGLE_COLORS.yellow}"/>
      <text x="48" y="95" font-family="monospace" font-size="6" font-weight="bold" fill="#111827" text-anchor="middle">v1.0</text>
      <!-- Presenter Laptop on Podium -->
      <polygon points="25,14 75,14 80,8 30,8" fill="#64748B"/>
      <rect x="30" y="-12" width="45" height="20" rx="2" fill="#0A0E1A" stroke="#94A3B8" stroke-width="1"/>
      <rect x="32" y="-10" width="41" height="16" rx="1" fill="${GOOGLE_COLORS.green}"/>
    </g>

    <!-- 3 CELEBRATING MAINTAINERS -->
    <!-- Maintainer 1 (Center - Behind lectern, arms raised high in triumphant victory!) -->
    <g transform="translate(660, 430)">
      <circle cx="35" cy="18" r="18" fill="#FDBA74"/>
      <path d="M18 16C18 2 52 2 52 16Z" fill="#1E1B4B"/>
      <path d="M14 100C14 50 56 50 56 100Z" fill="${GOOGLE_COLORS.green}"/>
      <!-- Arms raised high in V-shape victory! -->
      <path d="M14 60L-10 20L-25 -5" stroke="#FDBA74" stroke-width="9" stroke-linecap="round"/>
      <circle cx="-25" cy="-5" r="6" fill="#FDBA74"/>
      <path d="M56 60L80 20L95 -5" stroke="#FDBA74" stroke-width="9" stroke-linecap="round"/>
      <circle cx="95" cy="-5" r="6" fill="#FDBA74"/>
    </g>

    <!-- Maintainer 2 (Left - Cheering and Clapping, laptop on table) -->
    <g transform="translate(420, 440)">
      <circle cx="35" cy="18" r="18" fill="#FED7AA"/>
      <path d="M18 16C18 2 52 2 52 16Z" fill="#0F172A"/>
      <path d="M12 95C12 48 58 48 58 95Z" fill="${GOOGLE_COLORS.blue}"/>
      <!-- Arms clapping together -->
      <path d="M18 60L40 45L55 50" stroke="#FED7AA" stroke-width="8" stroke-linecap="round"/>
      <path d="M52 60L45 45L55 50" stroke="#FED7AA" stroke-width="8" stroke-linecap="round"/>
      <!-- Small table with cheering mug -->
      <rect x="-30" y="80" width="50" height="8" rx="2" fill="#334155"/>
      <rect x="-20" y="62" width="16" height="18" rx="2" fill="${GOOGLE_COLORS.yellow}"/>
    </g>

    <!-- Maintainer 3 (Right - Holding smartphone snapping photo of giant screen) -->
    <g transform="translate(900, 435)">
      <circle cx="35" cy="18" r="18" fill="#FDE047"/>
      <circle cx="28" cy="8" r="8" fill="#18181B"/>
      <circle cx="42" cy="8" r="8" fill="#18181B"/>
      <circle cx="35" cy="4" r="8" fill="#18181B"/>
      <!-- GDG Lanyard in Google Red -->
      <path d="M26 36L35 60L44 36" stroke="${GOOGLE_COLORS.red}" stroke-width="2.5" fill="none"/>
      <rect x="31" y="60" width="8" height="10" rx="1" fill="#FFFFFF"/>
      <path d="M14 95C14 50 56 50 56 95Z" fill="${GOOGLE_COLORS.red}"/>
      <!-- Arms holding phone up to capture the screen -->
      <path d="M20 58L-5 35L-15 30" stroke="#FDE047" stroke-width="8" stroke-linecap="round"/>
      <path d="M50 58L25 35L-10 30" stroke="#FDE047" stroke-width="8" stroke-linecap="round"/>
      <!-- Smartphone -->
      <rect x="-25" y="16" width="18" height="32" rx="3" fill="#0F172A" stroke="#E2E8F0" stroke-width="1.5" transform="rotate(-15 -25 16)"/>
      <circle cx="-16" cy="32" r="3" fill="${GOOGLE_COLORS.blue}"/>
    </g>

    <!-- Architectural HUD Badges -->
    <g transform="translate(60, 45)">
      <rect x="0" y="0" width="375" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <circle cx="16" cy="15" r="4" fill="${GOOGLE_COLORS.yellow}"/>
      <text x="30" y="19" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#E2E8F0">SCENE 10 // OPEN-SOURCE RELEASE PARTY</text>
    </g>
    <g transform="translate(930, 45)">
      <rect x="0" y="0" width="410" height="30" rx="6" fill="#0A0F1D" stroke="#334155" stroke-width="1.5"/>
      <text x="395" y="19" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold" fill="#94A3B8" text-anchor="end">CENTRAL AUDITORIUM FOYER · MERGE &amp; RELEASE v1.0.0</text>
    </g>
  </svg>`
};

Object.entries(scenes).forEach(([filename, svgContent]) => {
  fs.writeFileSync(path.join(SCENES_DIR, filename), svgContent.trim());
});

console.log('✓ Successfully generated all 51 bespoke SVG assets:');
console.log('  - 3 Official GDG RVCE brand assets (public/assets/brand/)');
console.log('  - 20 Developer emotes & sticker badges (public/assets/emotes/)');
console.log('  - 8 Architectural 16:9 vector cover artworks (public/assets/covers/)');
console.log('  - 10 Bauhaus developer avatar portraits (public/assets/avatars/)');
console.log('  - 10 Multi-layered community scene illustrations (public/assets/scenes/)');
