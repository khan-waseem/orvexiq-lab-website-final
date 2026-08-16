import React from 'react';
import Link from 'next/link';
import { PageContainer } from '../Container';
import { Divider } from '@/components/primitives/Divider';
import styles from './Footer.module.css';

export interface FooterLinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterColumnData {
  title: string;
  links: FooterLinkItem[];
}

const SERVICES_LINKS: FooterLinkItem[] = [
  { label: 'Product Strategy', href: '/services/product-strategy' },
  { label: 'UX / UI Product Design', href: '/services/ux-ui-product-design' },
  { label: 'AI & Automation', href: '/services/ai-experiences-automation' },
  { label: 'Design Systems', href: '/services/design-systems' },
];

const COMPANY_LINKS: FooterLinkItem[] = [
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const CONNECT_LINKS: FooterLinkItem[] = [
  { label: 'LinkedIn', href: '#', isExternal: true },
  { label: 'X / Twitter', href: '#', isExternal: true },
  { label: 'Dribbble', href: '#', isExternal: true },
  { label: 'GitHub', href: '#', isExternal: true },
];

/**
 * Footer Component (1:1 Figma Match)
 *
 * Safe link handling for pending external destinations and structural column layout.
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <PageContainer>
        <div className={styles.contentContainer}>
          {/* Top 4-Column Row */}
          <div className={styles.topRow}>
            {/* Column 1: Brand */}
            <div className={styles.brandColumn}>
              <Link href="/" className={styles.logoLockup} aria-label="Orvexiq Lab Home">
                <div className={styles.logoMark}>O</div>
                <span className={styles.logoText}>Orvexiq Lab</span>
              </Link>
              <p className={styles.bioText}>
                We architect and design digital products for complex businesses.
              </p>
              <a href="mailto:hello@orvexiq.com" className={styles.emailText}>
                hello@orvexiq.com
              </a>
            </div>

            {/* Column 2: Services */}
            <div className={styles.linkColumn}>
              <h2 className={styles.columnHeading}>Services</h2>
              <ul className={styles.linkList}>
                {SERVICES_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className={styles.linkColumn}>
              <h2 className={styles.columnHeading}>Company</h2>
              <ul className={styles.linkList}>
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Connect */}
            <div className={styles.linkColumn}>
              <h2 className={styles.columnHeading}>Connect</h2>
              <ul className={styles.linkList}>
                {CONNECT_LINKS.map((link) => (
                  <li key={link.label}>
                    {link.isExternal && link.href === '#' ? (
                      <span className={styles.footerLink}>{link.label}</span>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.footerLink}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Horizontal Rule Divider */}
          <Divider orientation="horizontal" />

          {/* Bottom Legal Bar */}
          <div className={styles.bottomBar}>
            <p>© {currentYear} Orvexiq Lab. All rights reserved.</p>
            <ul className={styles.legalLinks}>
              <li>
                <Link href="#" className={styles.footerLink}>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.footerLink}>
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
};
