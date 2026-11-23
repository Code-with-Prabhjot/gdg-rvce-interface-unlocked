import type { Metadata } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { CommandPaletteProvider } from '@/context/CommandPaletteContext';
import { DevTerminalProvider } from '@/context/DevTerminalContext';
import { ScrollProgressBar } from '@/components/layout/ScrollProgressBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { DevTerminalModal } from '@/components/ui/DevTerminalModal';
import { ArchitecturalBootLoader } from '@/components/ui/ArchitecturalBootLoader';

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
  title: 'GDG on Campus RV College of Engineering | GDG RVCE',
  description:
    'Award-winning architectural developer collective frontend for GDG on Campus RVCE — Interface Unlocked UI Design Challenge.',
  keywords: [
    'GDG RVCE',
    'GDG on Campus RV College of Engineering',
    'Google Developer Groups',
    'RVCE Bengaluru',
    'Developer Community',
  ],
  authors: [{ name: 'GDG RVCE Student Builders' }],
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
        <ThemeProvider>
          {/* Sub-Second Architectural < > Prism Boot Sequence */}
          <ArchitecturalBootLoader />

          <CommandPaletteProvider>
            <DevTerminalProvider>
              {/* Visual Top Scroll Indicator */}
              <ScrollProgressBar />

              {/* Global Sticky Navigation */}
              <Navbar />

              {/* Main Application Routes Viewport */}
              <main className="flex-1 w-full bg-blueprint-grid overflow-x-clip">
                {children}
              </main>

              {/* Global Architectural Footer */}
              <Footer />

              {/* Global Command Palette Overlay */}
              <CommandPalette />

              {/* Signature Developer Interactive CLI Terminal Drawer */}
              <DevTerminalModal />
            </DevTerminalProvider>
          </CommandPaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
