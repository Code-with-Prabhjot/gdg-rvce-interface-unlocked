import { createApiResponse } from '@/lib/apiEnvelope';
import {
  TELEMETRY_SPECS,
  PILLARS_DATA,
  LEARNING_TRACKS,
} from '@/data/gdgData';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = performance.now();

  const chapterManifest = {
    name: 'GDG on Campus RV College of Engineering',
    shortName: 'GDG RVCE',
    tagline: 'Connect. Learn. Grow. Build with Google Technologies at RVCE.',
    institution: {
      name: 'RV College of Engineering (RVCE)',
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'India',
      coordinates: {
        latitude: 12.9237,
        longitude: 77.4987,
        formatted: '12.9237° N, 77.4987° E',
        campus: 'Mysuru Road, RV Vidyanikethan Post, Bengaluru 560059',
      },
    },
    designTokens: {
      googleColors: {
        blue: {
          hex: '#4285F4',
          rgb: 'rgb(66, 133, 244)',
          semantic: 'Core brand primary, interactive accents & cloud engineering',
        },
        red: {
          hex: '#EA4335',
          rgb: 'rgb(234, 67, 53)',
          semantic: 'AI & Gemini systems, urgency alerts & code highlights',
        },
        yellow: {
          hex: '#FBBC04',
          rgb: 'rgb(251, 188, 4)',
          semantic: 'Modern web, study jams & warning highlights',
          contrastRule: 'Always pair #FBBC04 yellow fill with #111827 dark ink for >7:1 WCAG AAA compliance',
          requiredDarkInk: '#111827',
        },
        green: {
          hex: '#34A853',
          rgb: 'rgb(52, 168, 83)',
          semantic: 'Android & mobile engineering, verified status & active badges',
        },
      },
      typography: {
        display: 'Space Grotesk',
        body: 'Plus Jakarta Sans',
        monospace: 'JetBrains Mono',
      },
      themes: ['Daylight Blueprint (Light)', 'Obsidian IDE (Dark)'],
    },
    telemetrySpecs: TELEMETRY_SPECS,
    pillars: PILLARS_DATA,
    learningTracks: LEARNING_TRACKS,
    compliancePolicy: {
      zeroTracking: true,
      zeroAnalyticsCounters: true,
      zeroUserStorage: true,
      sampleDataOnly: true,
      disclaimer:
        'All data served by GDG RVCE API is 100% stateless and sample data for the Interface Unlocked UI Design Challenge.',
    },
  };

  const executionMs = Number((performance.now() - startTime).toFixed(2));

  return createApiResponse(chapterManifest, {
    endpoint: 'GET /api/chapter',
    signature: 'gdg-rvce:manifest:v1',
    executionMs,
  });
}
