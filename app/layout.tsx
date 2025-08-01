import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import {
  PHProvider,
  PostHogPageview,
  SWRProvider,
  ViewportScaleProvider,
} from './providers';
import { Suspense } from 'react';
import { ThemeProvider } from 'next-themes';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cn } from '@/utils/helpers';
import { Toaster } from '@/components/ui/sonner';

const roboto = Roboto_Mono({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bloombot - Learning. Reimagined.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  description:
    "Bloom is your always-on, always-engaged learning companion. You can chat with Bloom about any topic, whenever you want. It's designed to help you build critical skills and follow your curiosity.",
  authors: [{ name: 'Plastic Labs', url: 'https://plasticlabs.ai' }],
  openGraph: {
    title: 'Bloombot',
    description:
      "Bloom is your always-on, always-engaged learning companion. You can chat with Bloom about any topic, whenever you want. It's designed to help you build critical skills and follow your curiosity.",
    siteName: 'Bloombot',
    type: 'website',
    url: 'https://chat.bloombot.ai',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1800,
        height: 1600,
        alt: 'Bloombot Preview',
      },
    ],
    locale: 'en_US',
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-[100dvh]">
      <body className={cn(roboto.className, 'h-[100dvh]')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme-preference"
          disableTransitionOnChange
        >
          <Suspense>
            <PostHogPageview />
          </Suspense>
          <PHProvider>
            <SWRProvider>
              <div className="h-full flex flex-col min-h-0">
                <ViewportScaleProvider />
                {children}
              </div>
            </SWRProvider>
          </PHProvider>
        </ThemeProvider>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
