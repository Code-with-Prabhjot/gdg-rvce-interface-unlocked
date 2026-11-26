import type { MetadataRoute } from 'next';

const BASE_URL = 'https://gdg-rvce-interface-unlocked.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-11-26T00:00:00.000Z');
  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/events`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/team`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];
}
