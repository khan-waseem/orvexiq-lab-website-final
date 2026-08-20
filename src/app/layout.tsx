import type { Metadata } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import '@/styles/primitives.css';
import '@/styles/semantics.css';
import '@/styles/components.css';
import '@/styles/typography.css';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { SiteFooter } from '@/components/layout/SiteFooter';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

/* Landing display face — the high-contrast serif used for every section
   headline in the Figma landing design. */
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Orvexiq Lab — Product Studio & Enterprise Design Systems',
  description: 'Orvexiq Lab architects enterprise product platforms, complex workflow consoles, and unified design system tokens.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body>
        <Navbar />
        <main id="main-content" style={{ minHeight: '100vh' }}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
