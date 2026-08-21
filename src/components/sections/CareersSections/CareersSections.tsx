import React from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { CareersPageContent, JobRole } from '@/content/schemas/careers-page.schema';
import styles from './CareersSections.module.css';

/** Figma 35:24 — "WHAT IT IS LIKE" band with four perk cards. */
export const WhyUsSection: React.FC<{ content: CareersPageContent['whyUs'] }> = ({ content }) => (
  <SectionWrapper
    theme="canvas"
    padding="custom"
    id="why-us"
    className={styles.whySection}
    ariaLabelledBy="why-us-heading"
  >
    <GlowRings side="left" size={960} />
    <GlowRings side="right" size={840} />
    <SectionDots />

    <PageContainer className={styles.container}>
      <SectionHeading
        id="why-us-heading"
        eyebrow={content.eyebrow}
        rule="dot"
        sub={content.subdescription}
        className={styles.heading}
      >
        {content.headlineLine1}
        <br />
        <Accent>{content.headlineAccent2}</Accent>
      </SectionHeading>
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
    <SectionWrapper
      theme="canvas"
      padding="custom"
      id="open-roles"
      className={styles.rolesSection}
      ariaLabelledBy="open-roles-heading"
    >
      <GlowRings side="left" size={1000} />
      <GlowRings side="right" size={880} />
      <SectionDots />

      <PageContainer className={styles.container}>
        <SectionHeading
          id="open-roles-heading"
          eyebrow={content.eyebrow}
          rule="dot"
          className={styles.heading}
        >
          {headline}
          {open.length > 0 && (
            <>
              {' '}
              <Accent>{content.headlineAccent}</Accent>
            </>
          )}
        </SectionHeading>

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
