import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageContainer } from '@/components/layout/Container';
import { sections } from '@/lib/site';
import styles from './LandingFooter.module.css';

export type LandingFooterProps = Record<string, never>;

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

/* Platform marks drawn inline so they take the footer's colour. Hrefs point at
   the platform roots until the studio's real handles exist. */
const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M3.4 5.6h2.3V13H3.4V5.6ZM4.6 2a1.3 1.3 0 1 1 0 2.7 1.3 1.3 0 0 1 0-2.7ZM7.3 5.6h2.2v1h.03c.31-.56 1.07-1.15 2.2-1.15 2.35 0 2.79 1.5 2.79 3.45V13h-2.3V9.36c0-.87-.02-1.98-1.23-1.98-1.24 0-1.43.94-1.43 1.92V13H7.3V5.6Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com',
    icon: (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2.2" y="2.2" width="11.6" height="11.6" rx="3.4" stroke="currentColor"
              strokeWidth="1.4" />
        <circle cx="8" cy="8" r="2.9" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="11.5" cy="4.5" r="0.9" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com',
    icon: (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M9.4 1.8v8.05a2.35 2.35 0 1 1-1.9-2.3"
              stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
              strokeLinejoin="round" />
        <path d="M9.4 1.8a3.5 3.5 0 0 0 3.3 3.1" stroke="currentColor" strokeWidth="1.4"
              strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com',
    icon: (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1.4" y="3.4" width="13.2" height="9.2" rx="3" stroke="currentColor"
              strokeWidth="1.4" />
        <path d="M6.9 6.3v3.4L9.9 8 6.9 6.3Z" fill="currentColor" />
      </svg>
    ),
  },
];

/* The design lists a couple of services the site does not have pages for
   (Web Development, Mobile Apps), so this stays on the four that exist —
   a footer link that 404s is worse than a shorter column. */
const SERVICES_LINKS: FooterLink[] = [
  { label: 'Product Strategy', href: '/services/product-strategy' },
  { label: 'UX / UI Product Design', href: '/services/ux-ui-product-design' },
  { label: 'Design Systems', href: '/services/design-systems' },
  { label: 'AI & Automation', href: '/services/ai-experiences-automation' },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  ...(sections.blog ? [{ label: 'Blog & Insights', href: '/blog' }] : []),
  ...(sections.careers ? [{ label: 'Careers', href: '/careers' }] : []),
  { label: 'Contact', href: '/contact' },
];

/**
 * LandingFooter — the landing page's own footer panel.
 *
 * Rendered on every route through SiteFooter. The arcs, lit points and divider
 * dots are drawn in markup.
 */
export const LandingFooter: React.FC<LandingFooterProps> = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.panel}>
        {/* Arc sweep on the left and a cool wash in the top-right corner */}
        <svg className={styles.arcs} viewBox="0 0 520 620" fill="none" aria-hidden="true">
          <ellipse cx="120" cy="310" rx="286" ry="286" stroke="rgba(168, 85, 247, 0.22)"
                   strokeWidth="1" />
          <ellipse cx="120" cy="310" rx="228" ry="228" stroke="rgba(168, 85, 247, 0.12)"
                   strokeWidth="1" />
        </svg>
        <span className={styles.cornerGlow} aria-hidden="true" />

        <PageContainer className={styles.inner}>
          <div className={styles.top}>
            <div className={styles.brandColumn}>
              <Link href="/" className={styles.lockup} aria-label="Orvexiq Lab Home">
                <Image
                  src="/assets/brand/logo-mark.svg"
                  alt=""
                  width={52}
                  height={52}
                  className={styles.mark}
                />
                <span className={styles.wordmarkGroup}>
                  <span className={styles.wordmark}>Orvexiq</span>
                  <span className={styles.tagline}>Digital Innovation Studio</span>
                </span>
              </Link>

              <p className={styles.bio}>
                We partner with forward-thinking teams to design and build digital products that
                solve real problems and create measurable impact.
              </p>
            </div>

            <nav className={styles.linkColumn} aria-label="Services">
              <h2 className={styles.columnHeading}>Services</h2>
              <span className={styles.headingRule} aria-hidden="true" />
              <ul className={styles.linkList}>
                {SERVICES_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className={styles.linkColumn} aria-label="Company">
              <h2 className={styles.columnHeading}>Company</h2>
              <span className={styles.headingRule} aria-hidden="true" />
              <ul className={styles.linkList}>
                {COMPANY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.connectColumn}>
              <h2 className={styles.columnHeading}>Connect</h2>
              <span className={styles.headingRule} aria-hidden="true" />
              <p className={styles.connectCopy}>Let&rsquo;s build something great together.</p>

              <Link href="/contact" className={styles.getInTouch}>
                Get in touch
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h9M8.4 4.4 12 8l-3.6 3.6" stroke="currentColor" strokeWidth="1.3"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Divider carrying three lit points, as in the design */}
          <div className={styles.divider} aria-hidden="true">
            <span className={styles.dividerLine} />
            <span className={`${styles.dividerDot} ${styles.dividerDotA}`} />
            <span className={`${styles.dividerDot} ${styles.dividerDotB}`} />
            <span className={`${styles.dividerDot} ${styles.dividerDotC}`} />
          </div>

          <div className={styles.bottom}>
            <p className={styles.copyright}>
              &copy; {year} Orvexiq Lab. All rights reserved.
            </p>

            <p className={styles.legal}>
              <Link href="/privacy" className={styles.legalLink}>
                Privacy Policy
              </Link>
              <span className={styles.legalDot} aria-hidden="true" />
              <Link href="/terms" className={styles.legalLink}>
                Terms of Service
              </Link>
            </p>

            <p className={styles.social}>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.socialIcon}>{social.icon}</span>
                  {social.label}
                </a>
              ))}
            </p>
          </div>
        </PageContainer>
      </div>
    </footer>
  );
};
