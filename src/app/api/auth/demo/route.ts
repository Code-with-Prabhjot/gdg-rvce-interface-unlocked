import { createApiResponse } from '@/lib/apiEnvelope';
import { EVENTS_DATA } from '@/data/gdgData';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

interface DemoAttendedSession {
  sessionId: string;
  title: string;
  date: string;
  trackBadge: string;
  badgeColor: string;
}

interface DemoContribution {
  contributionId: string;
  title: string;
  kind: string;
}

interface DemoDefaultPass {
  passId: string;
  eventSlug: string;
  eventTitle: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  holderName: string;
  holderId: string;
  signature: string;
  issuedAt: string;
}

interface DemoPersona {
  demoId: string;
  displayName: string;
  role: string;
  vertical: string;
  permissions: string[];
  badgeColor: string;
  attendedSessions: DemoAttendedSession[];
  contributions: DemoContribution[];
  featuredEventSlug: string;
}

function buildPersonaDefaultPass(
  eventSlug: string,
  holderName: string,
  holderId: string
): DemoDefaultPass {
  const matchedEvent =
    EVENTS_DATA.find((ev) => ev.slug === eventSlug) ?? EVENTS_DATA[0];
  const hash = crypto
    .createHash('sha256')
    .update(`GDG-RVCE-2026-${matchedEvent.slug.trim().toLowerCase()}`)
    .digest('hex');
  const passId = `RVCE-GDG-2026-${hash.slice(0, 6).toUpperCase()}`;

  return {
    passId,
    eventSlug: matchedEvent.slug,
    eventTitle: matchedEvent.title,
    category: matchedEvent.category,
    date: matchedEvent.date,
    time: matchedEvent.time,
    venue: matchedEvent.venue,
    holderName,
    holderId,
    signature: `sha256:${hash}`,
    issuedAt: '2026-11-25T00:00:00.000Z',
  };
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
    attendedSessions: [
      {
        sessionId: 'sample-attended-dev-01',
        title: 'Cloud Run Zero-to-Prod Lab',
        date: '14 NOV 2026',
        trackBadge: 'WORKSHOP',
        badgeColor: '#4285F4',
      },
      {
        sessionId: 'sample-attended-dev-02',
        title: 'Gemini Agents Architecture Jam',
        date: '22 OCT 2026',
        trackBadge: 'STUDY JAM',
        badgeColor: '#FBBC04',
      },
      {
        sessionId: 'sample-attended-dev-03',
        title: 'Campus Build Sprint Demo Day',
        date: '05 SEP 2026',
        trackBadge: 'HACKATHON',
        badgeColor: '#EA4335',
      },
    ],
    contributions: [
      {
        contributionId: 'sample-contrib-dev-01',
        title: 'Maintainer · rvce-gdg/gemini-starter-kit',
        kind: 'Open Source',
      },
      {
        contributionId: 'sample-contrib-dev-02',
        title: 'Speaker · Cloud Run Zero-to-Prod Lab',
        kind: 'Chapter Session',
      },
      {
        contributionId: 'sample-contrib-dev-03',
        title: 'Reviewer · campus-build-rubric',
        kind: 'Chapter Ops',
      },
    ],
    featuredEventSlug: 'gemini-multimodal-buildathon',
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
    attendedSessions: [
      {
        sessionId: 'sample-attended-web-01',
        title: 'Distributed Systems Blueprint Lab',
        date: '18 NOV 2026',
        trackBadge: 'WORKSHOP',
        badgeColor: '#4285F4',
      },
      {
        sessionId: 'sample-attended-web-02',
        title: 'Next.js 15 Performance Deep Dive',
        date: '30 OCT 2026',
        trackBadge: 'TECH TALK',
        badgeColor: '#34A853',
      },
      {
        sessionId: 'sample-attended-web-03',
        title: 'Cloud Native K8s Sprint',
        date: '12 SEP 2026',
        trackBadge: 'HACKATHON',
        badgeColor: '#EA4335',
      },
    ],
    contributions: [
      {
        contributionId: 'sample-contrib-web-01',
        title: 'Maintainer · rvce-edge/distroless-k8s-action',
        kind: 'Open Source',
      },
      {
        contributionId: 'sample-contrib-web-02',
        title: 'Speaker · Next.js 15 Runtime Lab',
        kind: 'Chapter Session',
      },
      {
        contributionId: 'sample-contrib-web-03',
        title: 'Mentor · Web Performance Study Jam',
        kind: 'Chapter Mentorship',
      },
    ],
    featuredEventSlug: 'cloud-native-k8s-cloudrun',
  },
  'RVCE-STU-2026': {
    demoId: 'RVCE-STU-2026',
    displayName: 'Meera Nair',
    role: 'Student Builder',
    vertical: 'AI & Open Source',
    permissions: ['events.pass.issue', 'events.schedule.save'],
    badgeColor: '#34A853',
    attendedSessions: [
      {
        sessionId: 'sample-attended-stu-01',
        title: 'Design Systems Tokens to Code',
        date: '28 OCT 2026',
        trackBadge: 'STUDY JAM',
        badgeColor: '#FBBC04',
      },
      {
        sessionId: 'sample-attended-stu-02',
        title: 'Open Source Architecture Git Lab',
        date: '10 OCT 2026',
        trackBadge: 'WORKSHOP',
        badgeColor: '#4285F4',
      },
      {
        sessionId: 'sample-attended-stu-03',
        title: 'Neural Hack Sprint Edge ML',
        date: '15 NOV 2026',
        trackBadge: 'HACKATHON',
        badgeColor: '#EA4335',
      },
    ],
    contributions: [
      {
        contributionId: 'sample-contrib-stu-01',
        title: 'Contributor · rvce-gdg/compose-a11y-kit',
        kind: 'Open Source',
      },
      {
        contributionId: 'sample-contrib-stu-02',
        title: 'Co-host · Design Systems Tokens Study Jam',
        kind: 'Chapter Session',
      },
      {
        contributionId: 'sample-contrib-stu-03',
        title: 'Docs · accessible-primitives-guide',
        kind: 'Open Source',
      },
    ],
    featuredEventSlug: 'android-compose-kotlin',
  },
};

const DEMO_ID_PATTERN = /^[A-Za-z0-9-_]{4,24}$/;

/**
 * POST /api/auth/demo
 * Stateless sample builder passport preview endpoint (zero PII, zero database writes).
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
    attendedSessions: [
      {
        sessionId: 'sample-attended-custom-01',
        title: 'Campus Open Source Onboarding Lab',
        date: '08 NOV 2026',
        trackBadge: 'WORKSHOP',
        badgeColor: '#4285F4',
      },
      {
        sessionId: 'sample-attended-custom-02',
        title: 'Gemini Multimodal Study Circle',
        date: '24 OCT 2026',
        trackBadge: 'STUDY JAM',
        badgeColor: '#FBBC04',
      },
    ],
    contributions: [
      {
        contributionId: 'sample-contrib-custom-01',
        title: 'Contributor · rvce-gdg/blueprint-cli-templates',
        kind: 'Open Source',
      },
      {
        contributionId: 'sample-contrib-custom-02',
        title: "Volunteer · DevFest Campus Warmup '26",
        kind: 'Chapter Ops',
      },
    ],
    featuredEventSlug: 'high-performance-web-nextjs15',
  };

  const defaultPass = buildPersonaDefaultPass(
    persona.featuredEventSlug,
    persona.displayName,
    persona.demoId
  );

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
      defaultPass,
      attendedSessions: persona.attendedSessions,
      contributions: persona.contributions,
      featuredEventSlug: persona.featuredEventSlug,
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
