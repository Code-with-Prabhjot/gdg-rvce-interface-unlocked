import { createApiResponse } from '@/lib/apiEnvelope';
import { TEAM_DATA } from '@/data/gdgData';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const startTime = performance.now();
  const { searchParams } = new URL(request.url);

  const verticalParam = searchParams.get('vertical');
  const skillParam = searchParams.get('skill');
  const queryParam = searchParams.get('q');

  let filtered = [...TEAM_DATA];

  if (verticalParam && verticalParam.trim().toLowerCase() !== 'all builders') {
    const v = verticalParam.trim().toLowerCase();
    filtered = filtered.filter(
      (m) => m.vertical.toLowerCase() === v || m.vertical.toLowerCase().includes(v)
    );
  }

  if (skillParam && skillParam.trim().toLowerCase() !== 'all stacks') {
    const s = skillParam.trim().toLowerCase();
    filtered = filtered.filter((m) => {
      const skillsMatch = m.skills?.some((sk) => {
        const skLower = sk.toLowerCase();
        return skLower === s || skLower.includes(s) || s.includes(skLower);
      });
      const stackMatch = m.builderSpec?.favoriteStack?.toLowerCase().includes(s);
      const focusMatch = m.builderSpec?.focusArea?.toLowerCase().includes(s);
      const roleMatch = m.role?.toLowerCase().includes(s);
      const osMatch = m.builderSpec?.openSourceContrib?.toLowerCase().includes(s);

      // Design Systems alias handling
      const isDesignSystemsQuery = s.includes('design') || s.includes('tokens');
      const designMatch =
        isDesignSystemsQuery &&
        (m.vertical === 'Design & UX' ||
          m.skills?.some(
            (sk) => sk.toLowerCase().includes('design') || sk.toLowerCase().includes('tokens')
          ));

      return Boolean(skillsMatch || stackMatch || focusMatch || roleMatch || osMatch || designMatch);
    });
  }

  if (queryParam) {
    const q = queryParam.trim().toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.bio.toLowerCase().includes(q) ||
        m.skills?.some((sk) => sk.toLowerCase().includes(q)) ||
        m.builderSpec?.focusArea?.toLowerCase().includes(q) ||
        m.builderSpec?.favoriteStack?.toLowerCase().includes(q) ||
        m.builderSpec?.openSourceContrib?.toLowerCase().includes(q)
    );
  }

  const executionMs = Number((performance.now() - startTime).toFixed(2));

  // Compliance: Never return member headcount numbers in data to avoid showing headcount counters
  return createApiResponse(
    {
      builders: filtered,
      sampleOnly: true,
    },
    {
      endpoint: 'GET /api/team',
      appliedFilters: {
        vertical: verticalParam || null,
        skill: skillParam || null,
        q: queryParam || null,
      },
      executionMs,
    }
  );
}
