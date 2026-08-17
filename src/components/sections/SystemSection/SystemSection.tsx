import React from 'react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { Heading } from '@/components/primitives/Heading';
import { GlassCard } from '@/components/primitives/GlassCard';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import styles from './SystemSection.module.css';

export interface SystemSectionProps {
  content: HomepageContent['systemSection'];
}

/**
 * SystemSection Component (1:1 Figma Geometry — Node 218:289)
 *
 * Requirements:
 * - 1:1 match for 1440px desktop layout geometry (268px / 300px / 458px stage widths)
 * - Eyebrow with 30px #9b6fe6 dash
 * - Headline width 760px, size 28px, line-height 38px
 * - Unverified factual claims are converted to verified structural captions via content repository
 * - Directional flow connectors (72px x 300px)
 */
export const SystemSection: React.FC<SystemSectionProps> = ({ content }) => {
  const stage1 = content.stages[0];
  const stage2 = content.stages[1];
  const stage3 = content.stages[2];

  return (
    /* Figma 103:5 uses 72 top / 96 bottom, which the shared padding scale does
       not express as a single value, so the section supplies its own. */
    <SectionWrapper theme="system" padding="custom" id="system" className={styles.systemSection}>
      {/* Background Radial Glow */}
      <div className={styles.systemGlow} aria-hidden="true">
        <Image
          src="/assets/system-glow.svg"
          alt=""
          width={620}
          height={620}
          className={styles.glowImage}
        />
      </div>

      <PageContainer>
        <div className={styles.contentContainer}>
          {/* Section Eyebrow with 30px Dash */}
          <div className={styles.eyebrowRow}>
            <div className={styles.eyebrowDash} />
            <span className={styles.eyebrowText}>{content.eyebrow}</span>
          </div>

          {/* Headline (Exact 760px Width) */}
          <Heading level="h2" align="left" className={styles.headlineText}>
            {content.headline}
          </Heading>

          {/* 3-Stage System Flow Band */}
          <div className={styles.systemBand}>
            {/* Stage 01: TOKENS */}
            <div className={`${styles.stageWrapper} ${styles.stageSm}`}>
              <div className={styles.stageHeader}>
                <span className={styles.stageNumber}>{stage1.stageNumber}</span>
                <span className={styles.stageName}>{stage1.stageName}</span>
              </div>
              <GlassCard variant="stage">
                <div className={styles.cardContent}>
                  {/* Colour Palette */}
                  <span className={styles.labelSmall} style={{ top: 17, left: 17 }}>
                    Colour
                  </span>
                  <div className={styles.colorGrid}>
                    <div className={styles.colorSwatch} style={{ backgroundColor: '#dacfff' }} />
                    <div className={styles.colorSwatch} style={{ backgroundColor: '#a78bfa' }} />
                    <div className={styles.colorSwatch} style={{ backgroundColor: '#7c3aed' }} />
                    <div className={styles.colorSwatch} style={{ backgroundColor: '#3b4cca' }} />
                    <div className={styles.colorSwatch} style={{ backgroundColor: '#33176b' }} />
                    <div className={styles.colorSwatch} style={{ backgroundColor: '#1a0a3d' }} />
                    <div className={styles.colorSwatch} style={{ backgroundColor: '#2fd26b' }} />
                    <div className={styles.colorSwatch} style={{ backgroundColor: '#d95959' }} />
                  </div>

                  {/* Space Scale */}
                  <span className={styles.labelSmall} style={{ top: 107, left: 17 }}>
                    Space
                  </span>
                  <div className={styles.spaceList}>
                    <div className={styles.spaceBarRow}>
                      <div className={styles.spaceBar} style={{ width: 24 }} />
                      <span className={styles.spaceLabel}>4</span>
                    </div>
                    <div className={styles.spaceBarRow}>
                      <div className={styles.spaceBar} style={{ width: 44 }} />
                      <span className={styles.spaceLabel}>8</span>
                    </div>
                    <div className={styles.spaceBarRow}>
                      <div className={styles.spaceBar} style={{ width: 72 }} />
                      <span className={styles.spaceLabel}>12</span>
                    </div>
                    <div className={styles.spaceBarRow}>
                      <div className={styles.spaceBar} style={{ width: 108 }} />
                      <span className={styles.spaceLabel}>16</span>
                    </div>
                    <div className={styles.spaceBarRow}>
                      <div className={styles.spaceBar} style={{ width: 152 }} />
                      <span className={styles.spaceLabel}>24</span>
                    </div>
                  </div>

                  {/* Radius Boxes & Type Scale */}
                  <span className={styles.labelSmall} style={{ top: 207, left: 17 }}>
                    Radius
                  </span>
                  <div className={styles.radiusGrid}>
                    <div className={styles.radiusBox} style={{ borderRadius: 4 }} />
                    <div className={styles.radiusBox} style={{ borderRadius: 8 }} />
                    <div className={styles.radiusBox} style={{ borderRadius: 12 }} />
                    <div className={styles.radiusBox} style={{ borderRadius: 16 }} />
                  </div>

                  <span className={styles.labelSmall} style={{ top: 207, left: 161 }}>
                    Type
                  </span>
                  <div className={styles.typeRow}>
                    <span style={{ fontSize: 22, fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>
                      Aa
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>
                      Aa
                    </span>
                    <span style={{ fontSize: 10, fontWeight: 400, color: 'rgba(255,255,255,0.3)' }}>
                      Aa
                    </span>
                  </div>
                </div>
              </GlassCard>
              <p className={styles.stageCaption}>{stage1.caption}</p>
            </div>

            {/* Flow Arrow 1 */}
            <div className={styles.flowArrow} aria-hidden="true">
              <Image src="/assets/system-flow.svg" alt="" width={72} height={300} className={styles.flowImage} />
            </div>

            {/* Stage 02: COMPONENTS */}
            <div className={`${styles.stageWrapper} ${styles.stageMd}`}>
              <div className={styles.stageHeader}>
                <span className={styles.stageNumber}>{stage2.stageNumber}</span>
                <span className={styles.stageName}>{stage2.stageName}</span>
              </div>
              <GlassCard variant="stage">
                <div className={styles.cardContent}>
                  {/* Action Buttons */}
                  <div className={styles.buttonRow}>
                    <div className={styles.miniPrimaryBtn}>Start a project</div>
                    <div className={styles.miniSecondaryBtn}>Secondary</div>
                  </div>

                  {/* Input Field */}
                  <div className={styles.miniInput}>
                    <span>you@company.com</span>
                    <span className={styles.inputCursor} />
                  </div>

                  {/* Status Badges — Figma 103:63 / 103:65 / 103:67 (h20, 12px) */}
                  <div className={styles.badgeRow}>
                    <span className={`${styles.miniBadge} ${styles.badgeApproved}`}>Approved</span>
                    <span className={`${styles.miniBadge} ${styles.badgeReview}`}>In review</span>
                    <span className={`${styles.miniBadge} ${styles.badgeBlocked}`}>Blocked</span>
                  </div>

                  {/* Mini Card — Figma 103:69 (264x66 at 18,152) */}
                  <div className={styles.miniCard}>
                    <span className={styles.miniCardTitle}>Application NW-4471</span>
                    <span className={styles.miniCardMeta}>Broker: A. Whitfield · 17 min</span>
                    <div className={styles.miniProgressTrack}>
                      <div className={styles.miniProgressFill} />
                    </div>
                  </div>

                  {/* Theme Controls — Figma 103:74 toggle + 103:77 checkbox */}
                  <div className={styles.toggleRow}>
                    <span className={styles.switchTrack} aria-hidden="true">
                      <span className={styles.switchThumb} />
                    </span>
                    <span className={styles.toggleLabel}>Dark</span>
                    <span className={styles.checkBox} aria-hidden="true">✓</span>
                    <span className={styles.toggleLabel}>Compact</span>
                  </div>
                </div>
              </GlassCard>
              <p className={styles.stageCaption}>{stage2.caption}</p>
            </div>

            {/* Flow Arrow 2 */}
            <div className={styles.flowArrow} aria-hidden="true">
              <Image src="/assets/system-flow.svg" alt="" width={72} height={300} className={styles.flowImage} />
            </div>

            {/* Stage 03: PRODUCT */}
            <div className={`${styles.stageWrapper} ${styles.stageLg}`}>
              <div className={styles.stageHeader}>
                <span className={styles.stageNumber}>{stage3.stageNumber}</span>
                <span className={styles.stageName}>{stage3.stageName}</span>
              </div>
              <GlassCard variant="stage">
                <div className={styles.cardContent}>
                  {/* Console Top Header */}
                  <div className={styles.consoleHeader}>
                    <div className={styles.dotsGroup}>
                      <span className={styles.dot} />
                      <span className={styles.dot} />
                      <span className={styles.dot} />
                    </div>
                    <span className={styles.consoleTitle}>Origination console</span>
                  </div>

                  {/* Console Body Layout */}
                  <div className={styles.consoleBody}>
                    <div className={styles.sidebar}>
                      <span className={styles.sidebarItem}>Pipeline</span>
                      <span className={styles.sidebarItemActive}>Applications</span>
                      <span className={styles.sidebarItem}>Documents</span>
                      <span className={styles.sidebarItem}>Compliance</span>
                      <span className={styles.sidebarItem}>Reports</span>
                    </div>

                    <div className={styles.mainPanel}>
                      <span className={styles.panelTitle}>Active applications</span>

                      {/* Figma 103:106 — delta badge + comparison label */}
                      <div className={styles.deltaRow}>
                        <span className={styles.deltaBadge}>+64%</span>
                        <span className={styles.deltaLabel}>vs last quarter</span>
                      </div>

                      {/* Figma 103:109 / 103:112 / 103:115 — 106x42 KPI tiles */}
                      <div className={styles.kpiRow}>
                        <div className={styles.kpiCard}>
                          <span className={styles.kpiLabel}>Per broker / day</span>
                          <span className={styles.kpiValue}>23</span>
                        </div>
                        <div className={styles.kpiCard}>
                          <span className={styles.kpiLabel}>Avg handling</span>
                          <span className={styles.kpiValue}>17m</span>
                        </div>
                        <div className={styles.kpiCard}>
                          <span className={styles.kpiLabel}>Rework</span>
                          <span className={styles.kpiValue}>3%</span>
                        </div>
                      </div>

                      {/* Figma 103:118 — 7 bars over a baseline with day labels */}
                      <div className={styles.chartContainer}>
                        {[
                          { h: 24, d: 'M' },
                          { h: 32, d: 'T' },
                          { h: 28, d: 'W' },
                          { h: 41, d: 'T' },
                          { h: 49, d: 'F' },
                          { h: 58, d: 'S' },
                          { h: 70, d: 'S' },
                        ].map((b, i) => (
                          <div key={i} className={styles.chartCol}>
                            <div className={styles.chartBar} style={{ height: b.h }} />
                            <span className={styles.chartDay}>{b.d}</span>
                          </div>
                        ))}
                      </div>

                      {/* Figma 103:134 — application rows */}
                      <div className={styles.rowList}>
                        <div className={styles.appRow}>
                          <span className={styles.appId}>NW-4471</span>
                          <span className={`${styles.rowBadge} ${styles.badgeApproved}`}>Approved</span>
                          <span className={styles.rowTrack} />
                          <span className={styles.appTime}>2 min</span>
                        </div>
                        <div className={styles.appRow}>
                          <span className={styles.appId}>NW-4472</span>
                          <span className={`${styles.rowBadge} ${styles.badgeReview}`}>In review</span>
                          <span className={styles.rowTrack} />
                          <span className={styles.appTime}>6 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
              <p className={styles.stageCaption}>{stage3.caption}</p>
            </div>
          </div>
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
