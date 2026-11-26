import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GDG on Campus RV College of Engineering',
    short_name: 'GDG RVCE',
    description:
      'Architectural developer collective web platform for GDG on Campus RV College of Engineering — AI, Cloud, Web, and Android.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0D12',
    theme_color: '#4285F4',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
