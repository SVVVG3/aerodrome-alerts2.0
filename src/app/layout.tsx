import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Aerodrome Position Monitor',
  description: 'Monitor your Aerodrome LP positions',
  metadataBase: new URL('https://aerodrome-alerts.vercel.app'),
  openGraph: {
    title: 'Aerodrome Position Monitor',
    description: 'Monitor your Aerodrome LP positions',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://aerodrome-alerts.vercel.app/og-image.png',
    'fc:frame:button:1': 'View Positions',
    'fc:frame:post_url': 'https://aerodrome-alerts.vercel.app',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900`}>{children}</body>
    </html>
  );
}
