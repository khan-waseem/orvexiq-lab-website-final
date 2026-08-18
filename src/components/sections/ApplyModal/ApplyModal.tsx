'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { JobRole } from '@/content/schemas/careers-page.schema';
import styles from './ApplyModal.module.css';

export interface ApplyModalProps {
  role: JobRole;
  /** Fallback used when the form cannot be submitted (no endpoint yet). */
  mailtoHref: string;
}

/**
 * Apply Modal — Figma nodes 206:286 / 42:364, shown over the Job Detail page
 * (42:10 / 207:383).
 *
 * SUBMISSION
 * There is no applications endpoint, so the same rule as the contact and
 * newsletter forms applies: the fields are real and labelled, submit is
 * disabled, and the footer points at the email address that does work. No
 * file is read or uploaded — the dropzone is presentational.
 */
export const ApplyModal: React.FC<ApplyModalProps> = ({ role, mailtoHref }) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(false);
    openerRef.current?.focus();
  }, []);

  // Escape to close, and focus moves into the dialog when it opens.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const subtitle = [role.title, role.location.split(' · ')[0], role.employmentType]
    .filter(Boolean)
    .join(' · ');

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        className={styles.opener}
        onClick={() => setOpen(true)}
      >
        {role.detail.applyCtaLabel}
      </button>

      {/* Portalled to <body>: the sticky apply card sets backdrop-filter, which
          makes it the containing block for position:fixed, so an in-place
          overlay would be trapped inside that ~360px rail. */}
      {open && mounted
        ? createPortal(
        <div className={styles.overlay} onClick={close}>
          <div
            ref={dialogRef}
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-modal-title"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <header className={styles.header}>
              <div className={styles.titles}>
                <h2 id="apply-modal-title" className={styles.title}>
                  {role.detail.applyHeading}
                </h2>
                <p className={styles.subtitle}>{subtitle}</p>
              </div>
              <button type="button" className={styles.close} onClick={close} aria-label="Close">
                <span aria-hidden="true">✕</span>
              </button>
            </header>

            <form className={styles.form}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="apply-name">
                    Full name <span className={styles.required} aria-hidden="true">*</span>
                  </label>
                  <input id="apply-name" name="name" className={styles.input}
                         autoComplete="name" placeholder="Jane Cooper" required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="apply-email">
                    Email <span className={styles.required} aria-hidden="true">*</span>
                  </label>
                  <input id="apply-email" name="email" type="email" className={styles.input}
                         autoComplete="email" placeholder="jane@studio.com" required />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="apply-portfolio">
                    Portfolio URL <span className={styles.required} aria-hidden="true">*</span>
                  </label>
                  <input id="apply-portfolio" name="portfolio" type="url" className={styles.input}
                         autoComplete="url" placeholder="janecooper.com" required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="apply-linkedin">LinkedIn</label>
                  <input id="apply-linkedin" name="linkedin" type="url" className={styles.input}
                         placeholder="Optional" />
                </div>
              </div>

              <div className={styles.field}>
                <span className={styles.label}>Resume</span>
                {/* Presentational only — nothing is read or uploaded. */}
                <div className={styles.dropzone} aria-hidden="true">
                  Drop a PDF here, or browse · max 10 MB
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="apply-note">
                  Tell us about a system you are proud of{' '}
                  <span className={styles.required} aria-hidden="true">*</span>
                </label>
                <textarea id="apply-note" name="note" className={styles.textarea} rows={4}
                          placeholder="What it was, what you decided, and what it changed." required />
              </div>

              <footer className={styles.footer}>
                <p className={styles.retention}>
                  We keep applications for 12 months. See our{' '}
                  <Link href="/privacy" className={styles.retentionLink}>Privacy Policy</Link>.
                </p>
                <button type="submit" className={styles.submit} disabled
                        aria-describedby="apply-modal-note">
                  Send application
                </button>
              </footer>

              <p id="apply-modal-note" className={styles.note}>
                This form is not connected yet — email{' '}
                <a className={styles.retentionLink} href={mailtoHref}>your application</a>{' '}
                and we will pick it up.
              </p>
            </form>
          </div>
        </div>,
            document.body
          )
        : null}
    </>
  );
};
