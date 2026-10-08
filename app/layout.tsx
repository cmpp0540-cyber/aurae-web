import type { Metadata, Viewport } from 'next';
import './globals.css';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import CartDrawer from '@/components/cart/CartDrawer';
import { CartProvider } from '@/components/cart/CartProvider';

export const metadata: Metadata = {
  title: {
    default: 'Aurae — Lit from within ✦',
    template: '%s · Aurae',
  },
  description:
    'Premium cellular beauty supplements for the modern woman. Science-backed formulas — collagen, adaptogens, sleep botanicals, resveratrol and NAD+ — dosed at clinically-relevant levels.',
  metadataBase: new URL('https://auraevital.com'),
  openGraph: {
    type: 'website',
    siteName: 'Aurae',
    title: 'Aurae — Lit from within ✦',
    description:
      'Premium cellular beauty supplements for the modern woman. Five science-backed formulas, dosed properly.',
  },
  icons: {
    icon: [
      {
        url:
          'data:image/svg+xml,' +
          encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="%23FFF8F0"/><text x="16" y="23" font-size="22" text-anchor="middle" fill="%23FF6F91" font-family="Georgia,serif">a</text></svg>',
          ),
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#FFF8F0',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/*
          Fonts are loaded via <link> rather than next/font so the project
          builds without network access to Google's font API.
          Fraunces = display face; Playfair Display kept available so the
          --font-display token in globals.css can be switched back to the
          original prototype face with a one-line change.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400;1,9..144,500;1,9..144,600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Scroll reveals are progressive enhancement: without JS everything stays visible. */}
        <noscript>
          {/* eslint-disable-next-line react/no-danger */}
          <style dangerouslySetInnerHTML={{ __html: '.opacity-0{opacity:1 !important}' }} />
        </noscript>
      </head>
      <body>
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
