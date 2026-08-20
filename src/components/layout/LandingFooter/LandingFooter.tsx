import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageContainer } from '@/components/layout/Container';
import styles from './LandingFooter.module.css';

export interface LandingFooterProps {
  email?: string;
}

interface FooterLink {
  label: string;
  href: string;
}

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
  { label: 'Blog & Insights', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

/**
 * LandingFooter — the landing page's own footer panel.
 *
 * The other pages keep the existing site Footer; SiteFooter picks between
 * them by route. The arcs, lit points and divider dots are drawn in markup.
 */
export const LandingFooter: React.FC<LandingFooterProps> = ({
  email = 'hello@orvexiq.com',
}) => {
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
          <circle cx="330" cy="126" r="3" fill="#e9d5ff" />
          <circle cx="330" cy="126" r="8" fill="rgba(192, 132, 252, 0.16)" />
          <circle cx="76" cy="196" r="2.6" fill="#dacfff" />
          <circle cx="92" cy="500" r="2.6" fill="#dacfff" />
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
              <a
                href="https://www.linkedin.com"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.socialIcon}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"
                       aria-hidden="true">
                    <path d="M3.4 5.6h2.3V13H3.4V5.6ZM4.6 2a1.3 1.3 0 1 1 0 2.7 1.3 1.3 0 0 1 0-2.7ZM7.3 5.6h2.2v1h.03c.31-.56 1.07-1.15 2.2-1.15 2.35 0 2.79 1.5 2.79 3.45V13h-2.3V9.36c0-.87-.02-1.98-1.23-1.98-1.24 0-1.43.94-1.43 1.92V13H7.3V5.6Z" />
                  </svg>
                </span>
                LinkedIn
              </a>

              <a href={`mailto:${email}`} className={styles.socialLink}>
                <span className={styles.socialIcon}>
                  <svg width="13" height="13" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <rect x="2" y="4" width="14" height="10" rx="1.8" stroke="currentColor"
                          strokeWidth="1.4" />
                    <path d="m2.6 5 6.4 4.6L15.4 5" stroke="currentColor" strokeWidth="1.4"
                          strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                Email
              </a>
            </p>
          </div>
        </PageContainer>
      </div>
    </footer>
  );
};
