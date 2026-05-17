// @ts-nocheck
import type { Metadata } from 'next';
import { Playfair_Display, Nunito_Sans } from 'next/font/google';
import './globals.css';
import { getGarrison365Config, buildCssVars } from '@/lib/garrison365-config';

import { Garrison365LivePreview } from '@/components/Garrison365LivePreview';
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Warm Studio — Hot Yoga & Infrared',
  description: 'Infrared-heated yoga studio in Scottsdale. Hot Vinyasa, Yin, Power, Sculpt & Restore classes. Experience the warmth.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cfg = await getGarrison365Config();
  const vars = buildCssVars(cfg?.brand);
  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable}`} style={vars as React.CSSProperties}>
      <body>{children}<Garrison365LivePreview /></body>
    </html>
  );
}
