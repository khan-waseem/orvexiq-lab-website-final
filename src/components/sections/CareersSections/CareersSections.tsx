import React from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { CareersPageContent, JobRole } from '@/content/schemas/careers-page.schema';
import styles from './CareersSections.module.css';

/** Figma 35:24 — "WHAT IT IS LIKE" band with four perk cards. */
export const WhyUsSection: React.FC<{ content: CareersPageContent['whyUs'] }> = ({ content }) => (
  <SectionWrapper theme="canvas" padding="custom" id="why-us" className={styles.whySection}>
    <PageContainer>
      <div className={styles.eyebrowRow}>
        <Eyebrow align="left" tone="muted">{content.eyebrow}</Eyebrow>
      </div>
      <h2 className={styles.whyHeadline}>{content.headline}</h2>
      <ul className={styles.perkRow}>
        {content.perks.map((p) => (
          <li key={p.id} className={styles.perkCard}>
            <h3 className={styles.perkTitle}>{p.title}</h3>
            <p className={styles.perkBody}>{p.body}</p>
          </li>
        ))}
      </ul>
    </PageContainer>
  </SectionWrapper>
);

const NUMBER_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

/**
 * Figma 35:42 — "OPEN ROLES" band.
 *
 * The headline count is derived from the live list rather than stored, so
 * "Four seats open right now" cannot outlive the fourth role being filled.
 */
export const OpenRolesSection: React.FC<{
  content: CareersPageContent['openRoles'];
  roles: JobRole[];
}> = ({ content, roles }) => {
  const open = roles.filter((r) => r.open);
  const word = NUMBER_WORDS[open.length] ?? String(open.length);
  const headline =
    open.length === 0
      ? content.emptyHeadline
      : content.headlineTemplate.replace('{count}', word);

  return (
    <SectionWrapper theme="canvas" padding="custom" id="open-roles" className={styles.rolesSection}>
      <PageContainer>
        <div className={styles.eyebrowRow}>
          <Eyebrow align="left" tone="muted">{content.eyebrow}</Eyebrow>
        </div>
        <h2 className={styles.rolesHeadline}>{headline}</h2>

        {open.length > 0 && (
          <ul className={styles.roleList}>
            {open.map((r) => (
              <li key={r.id} className={styles.roleItem}>
                <Link href={`/careers/${r.slug}`} className={styles.roleRow}>
                  <span className={styles.roleInfo}>
                    <span className={styles.roleTitleRow}>
                      <span className={styles.roleTitle}>{r.title}</span>
                      <span className={styles.roleDept}>{r.department}</span>
                    </span>
                    <span className={styles.roleSummary}>{r.summary}</span>
                  </span>
                  <span className={styles.roleMeta}>
                    {r.location.split(' · ')[0]} · {r.employmentType}
                  </span>
                  <span className={styles.roleArrow} aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <p className={styles.footnote}>
          {content.footnote}
          <a className={styles.footnoteLink} href={`mailto:${content.footnoteEmail}`}>
            {content.footnoteEmail}
          </a>
        </p>
      </PageContainer>
    </SectionWrapper>
  );
};
