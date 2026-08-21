import React from 'react';
import { LandingFooter } from '@/components/layout/LandingFooter';

/**
 * SiteFooter — the footer for every route.
 *
 * This was a per-route switch while only the landing page carried the
 * redesigned footer. Now that the whole site uses it, the indirection is kept
 * as the single place the root layout renders a footer from — so a future
 * per-route exception has somewhere to live.
 */
export const SiteFooter: React.FC = () => <LandingFooter />;
