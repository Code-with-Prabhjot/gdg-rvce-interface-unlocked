import { createApiResponse } from '@/lib/apiEnvelope';
import { EVENTS_DATA } from '@/data/gdgData';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const startTime = performance.now();
  const { searchParams } = new URL(request.url);

  const statusParam = searchParams.get('status');
  const trackParam = searchParams.get('track');
  const modeParam = searchParams.get('mode');
  const queryParam = searchParams.get('q');
  const slugParam = searchParams.get('slug');

  // If a specific slug is requested, look for that single event
  if (slugParam) {
    const matched = EVENTS_DATA.find(
      (ev) => ev.slug.toLowerCase() === slugParam.trim().toLowerCase()
    );

    const executionMs = Number((performance.now() - startTime).toFixed(2));

    if (!matched) {
      return createApiResponse(
        {
          error: `Event not found with slug: "${slugParam}"`,
          sampleOnly: true,
        },
        {
          endpoint: 'GET /api/events',
          appliedFilters: { slug: slugParam },
          executionMs,
          matchFound: false,
        },
        404
      );
    }

    return createApiResponse(
      {
        event: matched,
        sampleOnly: true,
      },
      {
        endpoint: 'GET /api/events',
        appliedFilters: { slug: slugParam },
        executionMs,
        matchFound: true,
      }
    );
  }

  // Filter events based on query parameters
  let filtered = [...EVENTS_DATA];

  if (statusParam) {
    filtered = filtered.filter(
      (ev) => ev.status.toLowerCase() === statusParam.trim().toLowerCase()
    );
  }

  if (trackParam) {
    filtered = filtered.filter(
      (ev) => ev.category.toLowerCase() === trackParam.trim().toLowerCase()
    );
  }

  if (modeParam) {
    filtered = filtered.filter(
      (ev) => ev.mode.toLowerCase() === modeParam.trim().toLowerCase()
    );
  }

  if (queryParam) {
    const q = queryParam.trim().toLowerCase();
    filtered = filtered.filter((ev) => {
      const titleMatch = ev.title.toLowerCase().includes(q);
      const summaryMatch = ev.summary?.toLowerCase().includes(q);
      const speakerMatch = ev.speaker?.name.toLowerCase().includes(q);
      const venueMatch = ev.venue?.toLowerCase().includes(q);
      const tagsMatch = ev.tags?.some((t) => t.toLowerCase().includes(q));
      return titleMatch || summaryMatch || speakerMatch || venueMatch || tagsMatch;
    });
  }

  const executionMs = Number((performance.now() - startTime).toFixed(2));

  return createApiResponse(
    {
      events: filtered,
      count: filtered.length,
      totalCatalog: EVENTS_DATA.length,
      sampleOnly: true,
    },
    {
      endpoint: 'GET /api/events',
      appliedFilters: {
        status: statusParam || null,
        track: trackParam || null,
        mode: modeParam || null,
        q: queryParam || null,
        slug: null,
      },
      executionMs,
    }
  );
}
