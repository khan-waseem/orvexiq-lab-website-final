import React from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { PageContainer } from '@/components/layout/Container';
import { JobRole } from '@/content/schemas/careers-page.schema';
import { ApplyModal } from '@/components/sections/ApplyModal';
import styles from './JobDetailSection.module.css';

export interface JobDetailSectionProps {
  role: JobRole;
}

/**
 * Job Detail — Figma node 38:4.
 *   Job Hero (38:18, 365 tall incl. the nav band) -> Job Body (38:36)
 *
 * The apply card is a sticky rail beside the description. Figma pairs "Apply
 * now" with an Apply Modal (42:10); there is no application endpoint yet, so
 * the button is a mailto to the hiring address with the role in the subject
 * rather than a dialog that cannot submit.
 */
export const JobDetailSection: React.FC<JobDetailSectionProps> = ({ role }) => {
  const applyHref = `mailto:info@orvexiqlabs.com?subject=${encodeURIComponent(
    `Application — ${role.title}`
  )}`;

  const meta = [role.department, role.location, role.employmentType, role.postedOn];

  return (
    <>
      <SectionWrapper theme="canvas" padding="custom" id="job-hero" className={styles.heroSection}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <GlowRings side="left" size={960} />
        <GlowRings side="right" size={840} />

        <div className={styles.heroGlow} aria-hidden="true" />
        <PageContainer className={styles.heroContainer}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol className={styles.crumbList}>
              <li><Link href="/" className={styles.crumbLink}>Home</Link></li>
              <li aria-hidden="true" className={styles.crumbSep}>/</li>
              <li><Link href="/careers" className={styles.crumbLink}>Careers</Link></li>
              <li aria-hidden="true" className={styles.crumbSep}>/</li>
              <li><span className={styles.crumbCurrent} aria-current="page">{role.title}</span></li>
            </ol>
          </nav>

          <h1 className={styles.title}>{role.title}</h1>

          <ul className={styles.metaPills}>
            {meta.map((m) => (
              <li key={m} className={styles.metaPill}>{m}</li>
            ))}
          </ul>
        </PageContainer>
      </SectionWrapper>

      <SectionWrapper theme="canvas" padding="custom" id="job-body" className={styles.bodySection}>
        <SectionDots />

        <PageContainer>
          <div className={styles.row}>
            <div className={styles.main}>
              <section className={styles.block}>
                <h2 className={styles.blockHeading}>{role.detail.aboutHeading}</h2>
                {role.detail.aboutParagraphs.map((p) => (
                  <p key={p} className={styles.blockBody}>{p}</p>
                ))}
              </section>

              {role.detail.groups.map((g) => (
                <section key={g.id} className={styles.block}>
                  <h2 className={styles.blockHeading}>{g.heading}</h2>
                  {g.intro ? <p className={styles.blockBody}>{g.intro}</p> : null}
                  <ul className={styles.bulletList}>
                    {g.items.map((item) => (
                      <li key={item} className={styles.bulletItem}>
                        <span className={styles.dash} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <aside className={styles.applyCard} aria-label="Apply for this role">
              <h2 className={styles.applyHeading}>{role.detail.applyHeading}</h2>
              <p className={styles.applyBody}>{role.detail.applyBody}</p>

              {/* Figma pairs "Apply now" with the Apply Modal (42:10 / 206:286).
                  The modal owns its own open state; the mailto stays as the
                  working route since there is no application endpoint. */}
              <ApplyModal role={role} mailtoHref={applyHref} />

              <dl className={styles.detailList}>
                <div className={styles.detailRow}>
                  <dt className={styles.detailKey}>Department</dt>
                  <dd className={styles.detailValue}>{role.department}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt className={styles.detailKey}>Location</dt>
                  <dd className={styles.detailValue}>{role.location}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt className={styles.detailKey}>Type</dt>
                  <dd className={styles.detailValue}>{role.employmentType}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt className={styles.detailKey}>Salary</dt>
                  <dd className={styles.detailValue}>{role.salaryNote}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt className={styles.detailKey}>Reports to</dt>
                  <dd className={styles.detailValue}>{role.reportsTo}</dd>
                </div>
              </dl>

              <p className={styles.shareRow}>{role.detail.shareLabel}</p>
            </aside>
          </div>
        </PageContainer>
      </SectionWrapper>
    </>
  );
};
