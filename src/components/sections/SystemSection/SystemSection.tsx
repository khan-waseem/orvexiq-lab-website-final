import React from 'react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { Heading } from '@/components/primitives/Heading';
import { Text } from '@/components/primitives/Text';
import { GlassCard } from '@/components/primitives/GlassCard';
import { Tag } from '@/components/primitives/Tag';
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
    <SectionWrapper theme="system" padding="md" id="system">
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

                  {/* Status Badges */}
                  <div className={styles.badgeRow}>
                    <Tag variant="status-approved">Approved</Tag>
                    <Tag variant="status-review">In review</Tag>
                    <Tag variant="status-blocked">Blocked</Tag>
                  </div>

                  {/* Mini Card */}
                  <div className={styles.miniCard}>
                    <Text size="caption" weight="semibold" color="primary">
                      Application Console Card
                    </Text>
                    <Text size="caption" color="tertiary">
                      Workflow Item — 17 min
                    </Text>
                    <div style={{ width: 150, height: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 3, marginTop: 4 }}>
                      <div style={{ width: 104, height: 5, background: 'rgba(155,111,230,0.8)', borderRadius: 3 }} />
                    </div>
                  </div>

                  {/* Theme Toggle Controls */}
                  <div className={styles.toggleRow}>
                    <span>Dark</span>
                    <div style={{ width: 18, height: 18, background: '#9b6fe6', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700 }}>
                      ✓
                    </div>
                    <span>Compact</span>
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
                    </div>

                    <div className={styles.mainPanel}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text size="caption" weight="semibold" color="primary">
                          Active applications
                        </Text>
                        <Tag variant="status-approved">Active</Tag>
                      </div>

                      {/* Structural Metrics Row */}
                      <div className={styles.kpiRow}>
                        <div className={styles.kpiCard}>
                          <Text size="caption" color="tertiary">Per broker</Text>
                          <Text size="base" weight="bold" color="primary">Volume</Text>
                        </div>
                        <div className={styles.kpiCard}>
                          <Text size="caption" color="tertiary">Avg handling</Text>
                          <Text size="base" weight="bold" color="primary">Duration</Text>
                        </div>
                        <div className={styles.kpiCard}>
                          <Text size="caption" color="tertiary">Efficiency</Text>
                          <Text size="base" weight="bold" color="primary">Rate</Text>
                        </div>
                      </div>

                      {/* Bar Chart Bars */}
                      <div className={styles.chartContainer}>
                        <div className={styles.chartBar} style={{ height: 24 }} />
                        <div className={styles.chartBar} style={{ height: 32 }} />
                        <div className={styles.chartBar} style={{ height: 28 }} />
                        <div className={styles.chartBar} style={{ height: 41 }} />
                        <div className={styles.chartBar} style={{ height: 49 }} />
                        <div className={styles.chartBar} style={{ height: 58 }} />
                        <div className={styles.chartBar} style={{ height: 70 }} />
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
