import { ImageResponse } from 'next/og';

export const alt =
  'GDG on Campus RV College of Engineering — Interface Unlocked · AI · Cloud · Web · Android';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A0D12',
          backgroundImage:
            'radial-gradient(circle at 85% 20%, rgba(66, 133, 244, 0.22), transparent 45%), radial-gradient(circle at 15% 85%, rgba(52, 168, 83, 0.16), transparent 45%)',
          padding: '56px 64px',
          color: '#F8FAFC',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Row: Badge + Coordinates */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 20px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#E2E8F0',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                backgroundColor: '#4285F4',
              }}
            />
            <span>GDG RVCE · BENGALURU</span>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 18,
              color: '#94A3B8',
              letterSpacing: '0.1em',
            }}
          >
            12.9237° N · 77.4987° E
          </div>
        </div>

        {/* Center Identity Stage */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 128,
                height: 84,
                borderRadius: 22,
                backgroundColor: '#121826',
                border: '1px solid rgba(255, 255, 255, 0.14)',
              }}
            >
              <svg width="96" height="54" viewBox="0 0 120 64" fill="none">
                <path
                  d="M46 11L22 32"
                  stroke="#EA4335"
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 32L46 53"
                  stroke="#4285F4"
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M74 11L98 32"
                  stroke="#34A853"
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M98 32L74 53"
                  stroke="#FBBC04"
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                style={{
                  display: 'flex',
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#60A5FA',
                  letterSpacing: '0.06em',
                }}
              >
                GOOGLE DEVELOPER GROUPS ON CAMPUS
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: 52,
                  fontWeight: 800,
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                }}
              >
                GDG on Campus RV College of Engineering
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 28,
              fontWeight: 600,
              color: '#CBD5E1',
            }}
          >
            Interface Unlocked · AI · Cloud · Web · Android
          </div>
        </div>

        {/* Bottom 4-Stop Google Spectrum Bar + Domain */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 20,
              color: '#94A3B8',
            }}
          >
            <span>Home · Events &amp; Sprints · Team Topology · Live API Explorer</span>
            <span style={{ color: '#E2E8F0', fontWeight: 700 }}>
              gdg-rvce-interface-unlocked.vercel.app
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              width: '100%',
              height: 10,
              borderRadius: 9999,
              overflow: 'hidden',
            }}
          >
            <div style={{ flex: 1, height: '100%', backgroundColor: '#4285F4' }} />
            <div style={{ flex: 1, height: '100%', backgroundColor: '#EA4335' }} />
            <div style={{ flex: 1, height: '100%', backgroundColor: '#FBBC04' }} />
            <div style={{ flex: 1, height: '100%', backgroundColor: '#34A853' }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
