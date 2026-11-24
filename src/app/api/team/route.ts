import { createApiResponse } from '@/lib/apiEnvelope';
import { TEAM_DATA } from '@/data/gdgData';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const startTime = performance.now();
  const { searchParams } = new URL(request.url);

  const verticalParam = searchParams.get('vertical');
  const skillParam = searchParams.get('skill');

  let filtered = [...TEAM_DATA];

  if (verticalParam) {
    const v = verticalParam.trim().toLowerCase();
    filtered = filtered.filter(
      (m) => m.vertical.toLowerCase() === v || m.vertical.toLowerCase().includes(v)
    );
  }

  if (skillParam) {
    const s = skillParam.trim().toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.skills?.some((sk) => sk.toLowerCase().includes(s)) ||
        m.builderSpec?.focusArea?.toLowerCase().includes(s) ||
        m.builderSpec?.favoriteStack?.toLowerCase().includes(s)
    );
  }

  const executionMs = Number((performance.now() - startTime).toFixed(2));

  return createApiResponse(
    {
      builders: filtered,
      count: filtered.length,
      totalCatalog: TEAM_DATA.length,
      sampleOnly: true,
    },
    {
      endpoint: 'GET /api/team',
      appliedFilters: {
        vertical: verticalParam || null,
        skill: skillParam || null,
      },
      executionMs,
    }
  );
}
