'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/primitives/Button';
import styles from './Navbar.module.css';

export interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

/**
 * Navbar Component (1:1 Figma Match)
 *
 * Spec:
 * - Floating glass pill container (1250px max width, 83px height, 62px radius)
 * - Pathname-aware active link state (exactly 1 link highlighted based on route)
 * - Semantic `<nav>` landmark
 * - Accessible keyboard navigation & mobile drawer
 */
export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navPill} aria-label="Main Navigation">
        {/* Brand Lockup */}
        {/* Figma 183:139 — the nav lockup uses the exported 40px ring mark,
            not the lettered square used in the footer (86:995). */}
        <Link href="/" className={styles.brandLink} aria-label="Orvexiq Lab Home">
          <Image
            src="/assets/brand/logo-mark.svg"
            alt=""
            width={40}
            height={40}
            className={styles.logoMark}
            priority
          />
          <span className={styles.brandText}>Orvexiq Lab</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className={styles.navLinks} role="menubar">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className={styles.navItem} role="none">
                <Link
                  href={item.href}
                  className={`${styles.link} ${active ? styles.activeLink : ''}`}
                  role="menuitem"
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Navigation CTA */}
        <div className={styles.ctaDesktop}>
          <Button variant="nav" href="/contact">
            Contact Us
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg className={styles.hamburgerIcon} viewBox="0 0 24 24" fill="none">
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" />
            )}
          </svg>
        </button>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={styles.mobileDrawer}>
            <ul className={styles.mobileNavList}>
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${styles.mobileLink} ${active ? styles.mobileActiveLink : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Button variant="nav" href="/contact" onClick={() => setMobileMenuOpen(false)}>
              Contact Us
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};
