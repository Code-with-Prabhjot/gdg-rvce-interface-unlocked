import { createApiResponse } from '@/lib/apiEnvelope';
import { EVENTS_DATA } from '@/data/gdgData';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

/**
 * Computes deterministic SHA-256 token and pass ID for a given event slug.
 */
function generatePassSignature(slug: string) {
  const hash = crypto
    .createHash('sha256')
    .update(`GDG-RVCE-2026-${slug.trim().toLowerCase()}`)
    .digest('hex');
  const passId = `RVCE-GDG-2026-${hash.slice(0, 6).toUpperCase()}`;
  return { hash, passId };
}

/**
 * POST /api/pass/verify
 * Stateless Sample Pass Issuance
 */
export async function POST(request: Request) {
  const startTime = performance.now();

  let body: { slug?: string; trackPreference?: string } = {};
  try {
    body = await request.json();
  } catch {
    const executionMs = Number((performance.now() - startTime).toFixed(2));
    return createApiResponse(
      {
        error: 'Malformed JSON payload. Expected { slug: string, trackPreference?: string }',
        sampleOnly: true,
      },
      {
        endpoint: 'POST /api/pass/verify',
        executionMs,
        valid: false,
      },
      400
    );
  }

  const { slug, trackPreference } = body;

  if (!slug || typeof slug !== 'string') {
    const executionMs = Number((performance.now() - startTime).toFixed(2));
    return createApiResponse(
      {
        error: 'Missing required field: "slug" (string).',
        sampleOnly: true,
      },
      {
        endpoint: 'POST /api/pass/verify',
        executionMs,
        valid: false,
      },
      400
    );
  }

  const matchedEvent = EVENTS_DATA.find(
    (ev) => ev.slug.toLowerCase() === slug.trim().toLowerCase()
  );

  if (!matchedEvent) {
    const executionMs = Number((performance.now() - startTime).toFixed(2));
    return createApiResponse(
      {
        error: `Event slug "${slug}" does not exist in GDG RVCE catalog.`,
        sampleOnly: true,
      },
      {
        endpoint: 'POST /api/pass/verify',
        executionMs,
        valid: false,
      },
      400
    );
  }

  const { hash, passId } = generatePassSignature(matchedEvent.slug);
  const executionMs = Number((performance.now() - startTime).toFixed(2));

  const passPayload = {
    passId,
    eventSlug: matchedEvent.slug,
    eventTitle: matchedEvent.title,
    date: matchedEvent.date,
    time: matchedEvent.time,
    venue: matchedEvent.venue,
    category: matchedEvent.category,
    trackPreference: trackPreference || matchedEvent.category,
    signature: `sha256:${hash}`,
    issuedAt: new Date().toISOString(),
    verified: true,
    disclaimer:
      'Stateless sample pass issued for Interface Unlocked demonstration. Zero personal data stored.',
    sampleOnly: true,
  };

  return createApiResponse(passPayload, {
    endpoint: 'POST /api/pass/verify',
    executionMs,
    passId,
    cryptographicMethod: 'SHA-256 HMAC-style deterministic digest',
  });
}

/**
 * GET /api/pass/verify?passId=...&slug=...
 * Stateless Sample Pass Verification
 */
export async function GET(request: Request) {
  const startTime = performance.now();
  const { searchParams } = new URL(request.url);

  const passId = searchParams.get('passId');
  const slug = searchParams.get('slug');

  if (!passId || !slug) {
    const executionMs = Number((performance.now() - startTime).toFixed(2));
    return createApiResponse(
      {
        error: 'Missing query parameters. Required: ?passId=RVCE-GDG-2026-XXXXXX&slug=<event_slug>',
        sampleOnly: true,
      },
      {
        endpoint: 'GET /api/pass/verify',
        executionMs,
        verified: false,
      },
      400
    );
  }

  const matchedEvent = EVENTS_DATA.find(
    (ev) => ev.slug.toLowerCase() === slug.trim().toLowerCase()
  );

  const executionMs = Number((performance.now() - startTime).toFixed(2));

  if (!matchedEvent) {
    return createApiResponse(
      {
        verified: false,
        passId,
        slug,
        reason: `Event slug "${slug}" does not exist in GDG RVCE catalog.`,
        sampleOnly: true,
      },
      {
        endpoint: 'GET /api/pass/verify',
        executionMs,
        verified: false,
      },
      404
    );
  }

  const { passId: expectedPassId } = generatePassSignature(matchedEvent.slug);
  const isMatch = passId.trim().toUpperCase() === expectedPassId;

  const verificationResult = {
    verified: isMatch,
    passId: passId.trim().toUpperCase(),
    expectedPassId,
    eventSlug: matchedEvent.slug,
    eventTitle: matchedEvent.title,
    date: matchedEvent.date,
    venue: matchedEvent.venue,
    matchReason: isMatch
      ? 'Cryptographic SHA-256 signature verified against event slug.'
      : 'Pass ID does not match cryptographic signature for this event.',
    verifiedAt: new Date().toISOString(),
    sampleOnly: true,
  };

  return createApiResponse(verificationResult, {
    endpoint: 'GET /api/pass/verify',
    executionMs,
    verified: isMatch,
  });
}
