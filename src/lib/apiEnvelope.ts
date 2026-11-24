import { NextResponse } from 'next/server';

/**
 * GDG on Campus RV College of Engineering (GDG RVCE)
 * Standardized Stateless API Response Envelope Helper
 *
 * STRICT CHALLENGE & COMPLIANCE RULES:
 * 1. Zero Tracking: Zero RSVP counts, zero attendee metrics, zero analytics counters, zero database writes.
 * 2. 100% Stateless: Responses are computed on-the-fly with zero PII or user records.
 * 3. Explicit Sample Flags: "sampleOnly: true" and metadata attribution in every envelope.
 * 4. Official Chapter Naming: "GDG on Campus RV College of Engineering".
 */

export interface ApiResponseCompliance {
  sampleDataOnly: boolean;
  trackingEnabled: boolean;
  piiStored: boolean;
  chapterAuthority: string;
}

export interface ApiResponseEnvelope<T> {
  ok: boolean;
  chapter: string;
  timestamp: string;
  compliance: ApiResponseCompliance;
  meta: Record<string, unknown>;
  data: T;
}

/**
 * Creates a standardized Next.js NextResponse containing the GDG RVCE compliance envelope.
 *
 * @param data The payload data (strongly typed)
 * @param meta Optional telemetry/execution metadata
 * @param status HTTP response status code (default: 200)
 */
export function createApiResponse<T>(
  data: T,
  meta: Record<string, unknown> = {},
  status = 200
): NextResponse<ApiResponseEnvelope<T>> {
  const isOk = status >= 200 && status < 400;

  const envelope: ApiResponseEnvelope<T> = {
    ok: isOk,
    chapter: 'GDG on Campus RV College of Engineering',
    timestamp: new Date().toISOString(),
    compliance: {
      sampleDataOnly: true,
      trackingEnabled: false,
      piiStored: false,
      chapterAuthority: 'GDG RVCE Core Architecture',
    },
    meta: {
      ...meta,
      architecture: 'Next.js 15 App Router (Route Handlers)',
      environment: process.env.NODE_ENV || 'production',
    },
    data,
  };

  return NextResponse.json(envelope, {
    status,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Content-Type': 'application/json; charset=utf-8',
      'X-GDG-Chapter': 'GDG on Campus RV College of Engineering',
      'X-GDG-Compliance': 'zero-tracking-stateless',
      'X-GDG-Challenge': 'Interface Unlocked UI Design Challenge 2026',
    },
  });
}
