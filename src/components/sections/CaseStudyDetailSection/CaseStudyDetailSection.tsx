import React from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { CaseStudyDetail, CaseBlock } from '@/content/schemas/case-study-detail.schema';
import styles from './CaseStudyDetailSection.module.css';

export interface CaseStudyDetailSectionProps {
  page: CaseStudyDetail;
}

const toneClass: Record<string, string> = {
  danger: styles.toneDanger,
  brand: styles.toneBrand,
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  neutral: styles.toneNeutral,
};

/** Renders one body block. Split out so the page component stays readable. */
const Block: React.FC<{ block: CaseBlock }> = ({ block }) => {
  switch (block.type) {
    case 'visual':
      return (
        <section className={styles.visual} aria-hidden="true">
          <span className={styles.visualPlaceholder}>{block.placeholder}</span>
        </section>
      );

    case 'meta':
      return (
        <SectionWrapper theme="canvas" padding="custom" className={styles.metaSection}>
          <PageContainer>
            <dl className={styles.metaGrid}>
              {block.items.map((i) => (
                <div key={i.key} className={styles.metaItem}>
                  <dt className={styles.metaKey}>{i.key}</dt>
                  <dd className={styles.metaValue}>{i.value}</dd>
                </div>
              ))}
            </dl>
          </PageContainer>
        </SectionWrapper>
      );

    case 'glance':
      return (
        <SectionWrapper theme="canvas" padding="custom" className={styles.block}>
          <PageContainer>
            <ul className={styles.glanceRow}>
              {block.cards.map((c) => (
                <li key={c.label} className={`${styles.glanceCard} ${toneClass[c.tone] ?? ''}`}>
                  <p className={styles.glanceLabel}>{c.label}</p>
                  <p className={styles.glanceBody}>{c.body}</p>
                </li>
              ))}
            </ul>
          </PageContainer>
        </SectionWrapper>
      );

    case 'narrative':
      return (
        <SectionWrapper theme="canvas" padding="custom" className={styles.block}>
          <PageContainer>
            <div className={styles.narrativeRow}>
              <div className={styles.narrativeCopy}>
                <p className={styles.sectionEyebrow}>{block.eyebrow}</p>
                <h2 className={styles.sectionHeadline}>
                  {block.headlineLines.map((l, i) => (
                    <React.Fragment key={l}>
                      {i > 0 ? (<>{' '}<br /></>) : null}
                      {l}
                    </React.Fragment>
                  ))}
                </h2>
                {block.paragraphs.map((p) => (
                  <p key={p} className={styles.sectionBody}>{p}</p>
                ))}
              </div>

              {block.panel ? (
                <div className={`${styles.panel} ${toneClass[block.panel.tone] ?? ''}`}>
                  <p className={styles.panelLabel}>{block.panel.label}</p>
                  <ol className={styles.panelSteps}>
                    {block.panel.steps.map((s, i) => (
                      <li key={s.title} className={styles.panelStep}>
                        <span className={styles.panelStepNum}>{i + 1}</span>
                        <span className={styles.panelStepTitle}>{s.title}</span>
                        <span className={styles.panelStepNote}>{s.note}</span>
                      </li>
                    ))}
                  </ol>
                  <p className={styles.panelFootnote}>{block.panel.footnote}</p>
                </div>
              ) : null}
            </div>
          </PageContainer>
        </SectionWrapper>
      );

    case 'assumptions':
      return (
        <SectionWrapper theme="canvas" padding="custom" className={styles.block}>
          <PageContainer>
            <p className={styles.sectionEyebrow}>{block.eyebrow}</p>
            <h2 className={styles.sectionHeadline}>
              {block.headlineLines.map((l, i) => (
                <React.Fragment key={l}>
                  {i > 0 ? (<>{' '}<br /></>) : null}
                  {l}
                </React.Fragment>
              ))}
            </h2>
            <ul className={styles.assumptionGrid}>
              {block.items.map((a) => (
                <li key={a.key} className={styles.assumption}>
                  <p className={styles.assumptionKey}>{a.key}</p>
                  <p className={styles.assumptionBody}>{a.body}</p>
                </li>
              ))}
            </ul>
            <p className={styles.assumptionNote}>{block.note}</p>
          </PageContainer>
        </SectionWrapper>
      );

    case 'callout':
      return (
        <SectionWrapper theme="canvas" padding="custom" className={styles.block}>
          <PageContainer>
            <div className={`${styles.callout} ${toneClass[block.tone] ?? ''}`}>
              <p className={styles.calloutEyebrow}>{block.eyebrow}</p>
              <h2 className={styles.calloutHeadline}>{block.headline}</h2>
              {block.paragraphs.map((p) => (
                <p key={p} className={styles.calloutBody}>{p}</p>
              ))}
            </div>
          </PageContainer>
        </SectionWrapper>
      );

    case 'constraints':
      return (
        <SectionWrapper theme="canvas" padding="custom" className={styles.block}>
          <PageContainer>
            <div className={styles.narrativeRow}>
              <div className={styles.narrativeCopy}>
                <p className={styles.sectionEyebrow}>{block.eyebrow}</p>
                <h2 className={styles.sectionHeadline}>
                  {block.headlineLines.map((l, i) => (
                    <React.Fragment key={l}>
                      {i > 0 ? (<>{' '}<br /></>) : null}
                      {l}
                    </React.Fragment>
                  ))}
                </h2>
                <p className={styles.sectionBody}>{block.intro}</p>
              </div>

              <ul className={styles.constraintList}>
                {block.items.map((c) => (
                  <li key={c.label} className={styles.constraintCard}>
                    <p className={styles.constraintLabel}>{c.label}</p>
                    <p className={styles.constraintBody}>{c.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </PageContainer>
        </SectionWrapper>
      );

    case 'hypothesis':
      return (
        <SectionWrapper theme="canvas" padding="custom" className={styles.block}>
          <PageContainer>
            <p className={styles.sectionEyebrow}>{block.eyebrow}</p>

            <div className={styles.hypoCard}>
              <div className={styles.hypoCount}>
                <span className={styles.hypoCountValue}>{block.count}</span>
                <span className={styles.hypoCountLabel}>{block.countLabel}</span>
              </div>
              <div className={styles.hypoCopy}>
                <h2 className={styles.hypoHeadline}>{block.headline}</h2>
                <p className={styles.hypoBody}>{block.body}</p>
              </div>
            </div>

            <p className={styles.measuresLabel}>{block.measuresLabel}</p>
            <ul className={styles.measureList}>
              {block.measures.map((m) => (
                <li key={m.key} className={styles.measureRow}>
                  <span className={styles.measureKey}>{m.key}</span>
                  <span className={styles.measureValue}>{m.value}</span>
                </li>
              ))}
            </ul>

            <ul className={styles.criteriaRow}>
              {block.criteria.map((c) => (
                <li key={c.value} className={styles.criteriaCard}>
                  <p className={styles.criteriaLabel}>{c.label}</p>
                  <p className={styles.criteriaValue}>{c.value}</p>
                  <p className={styles.criteriaNote}>{c.note}</p>
                </li>
              ))}
            </ul>

            <p className={styles.hypoFootnote}>{block.footnote}</p>
          </PageContainer>
        </SectionWrapper>
      );

    case 'bet':
      return (
        <SectionWrapper theme="canvas" padding="custom" className={styles.block}>
          <PageContainer>
            <figure className={styles.betCard}>
              <span className={styles.betMark} aria-hidden="true">&ldquo;</span>
              <blockquote className={styles.betQuote}>{block.quote}</blockquote>
              <figcaption className={styles.betAttribution}>
                <span className={styles.betAvatar} aria-hidden="true" />
                <span className={styles.betAttrText}>
                  <span className={styles.betAttrTitle}>{block.attributionTitle}</span>
                  <span className={styles.betAttrNote}>{block.attributionNote}</span>
                </span>
              </figcaption>
            </figure>
          </PageContainer>
        </SectionWrapper>
      );

    case 'whatExists':
      return (
        <SectionWrapper theme="canvas" padding="custom" className={styles.block}>
          <PageContainer>
            <p className={styles.sectionEyebrow}>{block.eyebrow}</p>
            <h2 className={styles.sectionHeadline}>{block.headline}</h2>
            <ul className={styles.existsRow}>
              {block.columns.map((c) => (
                <li key={c.title} className={styles.existsCol}>
                  <h3 className={styles.existsTitle}>{c.title}</h3>
                  <p className={styles.existsBody}>{c.body}</p>
                </li>
              ))}
            </ul>
          </PageContainer>
        </SectionWrapper>
      );

    default:
      return null;
  }
};

/**
 * Case Study detail — Figma nodes 149:2 / 159:2 / 171:2.
 *
 * Hero -> typed body blocks -> Next Case -> CTA -> Footer. Every section in
 * the Figma pages maps onto one of the block archetypes in
 * `case-study-detail.schema.ts`, so all three pages share this renderer.
 */
export const CaseStudyDetailSection: React.FC<CaseStudyDetailSectionProps> = ({ page }) => (
  <>
    <SectionWrapper theme="canvas" padding="custom" id="case-hero" className={styles.heroSection}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <PageContainer className={styles.heroContainer}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ol className={styles.crumbList}>
            <li><Link href="/" className={styles.crumbLink}>Home</Link></li>
            <li aria-hidden="true" className={styles.crumbSep}>/</li>
            <li><Link href="/case-studies" className={styles.crumbLink}>Case Studies</Link></li>
            <li aria-hidden="true" className={styles.crumbSep}>/</li>
            <li><span className={styles.crumbCurrent} aria-current="page">{page.breadcrumbLabel}</span></li>
          </ol>
        </nav>

        <p className={styles.kicker}>{page.kicker}</p>

        <h1 className={styles.heroHeadline}>
          {page.headlineLines.map((l, i) => (
            <React.Fragment key={l}>
              {i > 0 ? (<>{' '}<br /></>) : null}
              {l}
            </React.Fragment>
          ))}
        </h1>

        <p className={styles.standfirst}>{page.standfirst}</p>

        <ul className={styles.statRow}>
          {page.stats.map((s) => (
            <li key={s.value} className={styles.stat}>
              <p className={styles.statValue}>{s.value}</p>
              <p className={styles.statLabel}>{s.label}</p>
            </li>
          ))}
        </ul>
      </PageContainer>
    </SectionWrapper>

    {page.blocks.map((b, i) => (
      <Block key={`${b.type}-${i}`} block={b} />
    ))}

    <SectionWrapper theme="canvas" padding="custom" className={styles.block}>
      <PageContainer>
        <p className={styles.sectionEyebrow}>{page.nextCase.eyebrow}</p>
        <Link href={page.nextCase.href} className={styles.nextCard}>
          <span className={styles.nextCopy}>
            <span className={styles.nextTitle}>{page.nextCase.title}</span>
            <span className={styles.nextBody}>{page.nextCase.body}</span>
          </span>
          <span className={styles.nextArrow} aria-hidden="true">→</span>
        </Link>
      </PageContainer>
    </SectionWrapper>
  </>
);
