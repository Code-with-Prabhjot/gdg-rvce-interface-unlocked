import { createApiResponse } from '@/lib/apiEnvelope';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

interface DemoPersona {
  demoId: string;
  displayName: string;
  role: string;
  vertical: string;
  permissions: string[];
  badgeColor: string;
}

const BUILTIN_DEMO_PERSONAS: Record<string, DemoPersona> = {
  'RVCE-DEV-2026': {
    demoId: 'RVCE-DEV-2026',
    displayName: 'Aarav Kulkarni',
    role: 'Core Lead',
    vertical: 'Chapter Architecture & Core',
    permissions: [
      'chapter.banner.customize',
      'events.pass.issue',
      'events.spec.inspect',
      'team.topology.inspect',
    ],
    badgeColor: '#EA4335',
  },
  'RVCE-WEB-2026': {
    demoId: 'RVCE-WEB-2026',
    displayName: 'Rohan Deshmukh',
    role: 'Web & Cloud Lead',
    vertical: 'Web & Cloud',
    permissions: [
      'chapter.banner.customize',
      'track.spotlight.customize',
      'events.pass.issue',
    ],
    badgeColor: '#4285F4',
  },
  'RVCE-STU-2026': {
    demoId: 'RVCE-STU-2026',
    displayName: 'Meera Nair',
    role: 'Student Builder',
    vertical: 'AI & Open Source',
    permissions: ['events.pass.issue', 'events.schedule.save'],
    badgeColor: '#34A853',
  },
};

const DEMO_ID_PATTERN = /^[A-Za-z0-9-_]{4,24}$/;

/**
 * POST /api/auth/demo
 * Stateless Chapter Demo Sign-In endpoint (zero PII, zero database writes).
 */
export async function POST(request: Request) {
  const startTime = performance.now();

  let body: { demoId?: string } = {};
  try {
    body = await request.json();
  } catch {
    const executionMs = Number((performance.now() - startTime).toFixed(2));
    return createApiResponse(
      {
        error: 'Malformed JSON payload. Expected { demoId: string }.',
        sampleOnly: true,
      },
      {
        endpoint: 'POST /api/auth/demo',
        executionMs,
        authenticated: false,
      },
      400
    );
  }

  const rawId = typeof body.demoId === 'string' ? body.demoId.trim() : '';

  if (!DEMO_ID_PATTERN.test(rawId)) {
    const executionMs = Number((performance.now() - startTime).toFixed(2));
    return createApiResponse(
      {
        error:
          'Invalid Demo ID. Use 4-24 alphanumeric characters, hyphens, or underscores (e.g. RVCE-DEV-2026).',
        sampleOnly: true,
      },
      {
        endpoint: 'POST /api/auth/demo',
        executionMs,
        authenticated: false,
      },
      400
    );
  }

  const normalizedId = rawId.toUpperCase();
  const persona: DemoPersona = BUILTIN_DEMO_PERSONAS[normalizedId] ?? {
    demoId: normalizedId,
    displayName: 'Sample Builder',
    role: 'Community Builder',
    vertical: 'Campus Open Source',
    permissions: ['events.pass.issue', 'events.schedule.save'],
    badgeColor: '#4285F4',
  };

  const digest = crypto
    .createHash('sha256')
    .update(`GDG-RVCE-DEMO-2026-${persona.demoId}`)
    .digest('hex')
    .slice(0, 24);

  const executionMs = Number((performance.now() - startTime).toFixed(2));

  return createApiResponse(
    {
      sessionToken: `demo_rvce_${digest}`,
      demoId: persona.demoId,
      displayName: persona.displayName,
      role: persona.role,
      vertical: persona.vertical,
      permissions: persona.permissions,
      badgeColor: persona.badgeColor,
      disclaimer:
        'Stateless demo session for Interface Unlocked UI demonstration. Zero personal data stored.',
    },
    {
      endpoint: 'POST /api/auth/demo',
      executionMs,
      authenticated: true,
      storagePolicy: 'sessionStorage-only',
    }
  );
}
