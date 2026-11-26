import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0B0F17',
          borderRadius: 36,
        }}
      >
        <svg
          width="132"
          height="132"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27 17L13 32"
            stroke="#EA4335"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 32L27 47"
            stroke="#4285F4"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M37 17L51 32"
            stroke="#34A853"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M51 32L37 47"
            stroke="#FBBC04"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
