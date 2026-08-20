'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';
import { LandingFooter } from '@/components/layout/LandingFooter';

/**
 * SiteFooter — picks the footer for the current route.
 *
 * The landing page has its own footer panel in the redesign; every other page
 * keeps the existing site footer. Doing the switch here keeps the root layout
 * as the single place a footer is rendered, rather than moving <Footer /> into
 * fourteen page files.
 */
export const SiteFooter: React.FC = () => {
  const pathname = usePathname();
  return pathname === '/' ? <LandingFooter /> : <Footer />;
};
