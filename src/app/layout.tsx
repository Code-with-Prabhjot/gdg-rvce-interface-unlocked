import type { Metadata } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { CommandPaletteProvider } from '@/context/CommandPaletteContext';
import { DevTerminalProvider } from '@/context/DevTerminalContext';
import { ApiInspectorProvider } from '@/context/ApiInspectorContext';
import { SavedEventsProvider } from '@/context/SavedEventsContext';
import { XRayProvider } from '@/context/XRayContext';
import { DemoAuthProvider } from '@/context/DemoAuthContext';
import { IssuedPassesProvider } from '@/context/IssuedPassesContext';
import { GuidedTourProvider } from '@/context/GuidedTourContext';
import { ShortcutsProvider } from '@/context/ShortcutsContext';
import { ScrollProgressBar } from '@/components/layout/ScrollProgressBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { DevTerminalModal } from '@/components/ui/DevTerminalModal';
import { ApiInspectorModal } from '@/components/ui/ApiInspectorModal';
import { DemoAuthModal } from '@/components/ui/DemoAuthModal';
import { ArchitecturalBootLoader } from '@/components/ui/ArchitecturalBootLoader';
import { BlueprintXRayOverlay } from '@/components/ui/BlueprintXRayOverlay';
import { GuidedTourOverlay } from '@/components/ui/GuidedTourOverlay';
import { ShortcutsModal } from '@/components/ui/ShortcutsModal';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gdg-rvce-interface-unlocked.vercel.app'),
  title: 'GDG on Campus RV College of Engineering | GDG RVCE',
  description:
    'Architectural developer collective frontend for GDG on Campus RV College of Engineering (GDG RVCE) — AI, Cloud, Web, and Android community platform.',
  keywords: [
    'GDG RVCE',
    'GDG on Campus RV College of Engineering',
    'Google Developer Groups',
    'RVCE Bengaluru',
    'Developer Community',
  ],
  authors: [{ name: 'GDG RVCE Student Builders' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GDG on Campus RV College of Engineering | GDG RVCE',
    description:
      'Architectural developer collective frontend for GDG on Campus RV College of Engineering (GDG RVCE) — Interface Unlocked UI Design Challenge.',
    url: '/',
    siteName: 'GDG on Campus RV College of Engineering',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDG on Campus RV College of Engineering | GDG RVCE',
    description:
      'Architectural developer collective frontend for GDG on Campus RV College of Engineering (GDG RVCE).',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Zero-Flash Theme Initialization Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('gdg-theme');
                  var isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  var theme = isDark ? 'dark' : 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)] antialiased font-sans`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-[#1D4ED8] focus:text-white focus:font-mono focus:text-xs focus:font-bold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          {/* Sub-Second Architectural < > Prism Boot Sequence */}
          <ArchitecturalBootLoader />

            <XRayProvider>
              <IssuedPassesProvider>
                <DemoAuthProvider>
                  <CommandPaletteProvider>
                    <DevTerminalProvider>
                      <ApiInspectorProvider>
                        <SavedEventsProvider>
                          <GuidedTourProvider>
                            <ShortcutsProvider>
                              {/* Visual Top Scroll Indicator */}
                              <ScrollProgressBar />

                              {/* Global Sticky Navigation */}
                              <Navbar />

                              {/* Main Application Routes Viewport */}
                              <main id="main-content" tabIndex={-1} className="flex-1 w-full bg-blueprint-grid overflow-x-clip focus:outline-none">
                                {children}
                              </main>

                              {/* Global Architectural Footer */}
                              <Footer />

                              {/* Global Command Palette Overlay */}
                              <CommandPalette />

                              {/* Signature Developer Interactive CLI Terminal Drawer */}
                              <DevTerminalModal />

                              {/* Live Backend & API Inspector Drawer */}
                              <ApiInspectorModal />

                              {/* Sample Builder Passport Modal (Stateless Zero-PII) */}
                              <DemoAuthModal />

                              {/* Global Keyboard Shortcuts Cheat-Sheet Modal */}
                              <ShortcutsModal />

                              {/* Cross-Route Interactive Guided Tour Overlay */}
                              <GuidedTourOverlay />

                              {/* Global Blueprint X-Ray Design Token Inspector Overlay */}
                              <BlueprintXRayOverlay />
                            </ShortcutsProvider>
                          </GuidedTourProvider>
                        </SavedEventsProvider>
                      </ApiInspectorProvider>
                    </DevTerminalProvider>
                  </CommandPaletteProvider>
                </DemoAuthProvider>
              </IssuedPassesProvider>
            </XRayProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
