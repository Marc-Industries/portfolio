import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://matteomarcon.dev'),
  title: {
    default: 'Matteo Marcon — Aerospace · Systems · Software · AI',
    template: '%s — Matteo Marcon',
  },
  description:
    'Aerospace & Systems Engineer building software, MBSE platforms and AI-driven automation. CubeSat, Digital Engineering, full-stack development.',
  keywords: [
    'Matteo Marcon', 'Aerospace Engineer', 'Systems Engineer', 'Aerospace Systems Engineer',
    'MBSE', 'Digital Twin', 'Space Systems', 'CubeSat', 'Software Engineer', 'AI Automation',
    'Automation Engineer', 'Systems Integration', 'Aerospace Software Engineer',
    'Python Developer', 'Full Stack Developer', 'University of Padua', 'BEPI',
  ],
  authors: [{ name: 'Matteo Marcon' }],
  creator: 'Matteo Marcon',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Matteo Marcon — Aerospace · Systems · Software · AI',
    description:
      'Aerospace & Systems Engineer building software, MBSE platforms and AI-driven automation.',
    siteName: 'Matteo Marcon',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matteo Marcon — Aerospace · Systems · Software · AI',
    description: 'Aerospace & Systems Engineer building software, MBSE and AI automation.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#050000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="page-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
