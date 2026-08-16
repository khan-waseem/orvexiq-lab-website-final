import React from 'react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { GlassCard } from '@/components/primitives/GlassCard';
import { HomepageContent } from '@/content/schemas/homepage.schema';
import { ServiceItem } from '@/content/schemas/service.schema';
import styles from './ServicesSection.module.css';

export interface ServicesSectionProps {
  content: HomepageContent['servicesSection'];
  services: ServiceItem[];
}

/**
 * ServicesSection Component (1:1 Figma Match — Node 218:478)
 *
 * Requirements:
 * - 4 service cards in 2x2 desktop grid (Product Strategy, UX/UI, Design Systems, AI)
 * - Service title, description, capabilities list, 3D icon
 * - Reuses Eyebrow, GlassCard, SectionWrapper, PageContainer primitives
 * - 100% token-governed and content-repository compliant
 */
export const ServicesSection: React.FC<ServicesSectionProps> = ({
  content,
  services,
}) => {
  return (
    <SectionWrapper theme="canvas" padding="lg" id="services">
      {/* Background Radial Glow */}
      <div className={styles.servicesGlow} aria-hidden="true">
        <Image
          src="/assets/services/services-glow.svg"
          alt=""
          width={880}
          height={880}
          className={styles.glowImage}
        />
      </div>

      <PageContainer>
        <div className={styles.contentContainer}>
          {/* Header Title Composition */}
          <div className={styles.titleGroup}>
            <Eyebrow align="left">{content.eyebrow}</Eyebrow>
            <h2 className={styles.headlineText}>
              {content.headlineLine1}
              <br />
              {content.headlineLine2}
            </h2>
          </div>

          {/* 2x2 Desktop Service Cards Grid */}
          <div className={styles.cardsGrid}>
            {services.map((item) => (
              <GlassCard key={item.id} variant="service">
                <div className={styles.cardInner}>
                  {/* Left Column: Text & Capabilities */}
                  <div className={styles.cardTextContent}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDescription}>{item.shortDescription}</p>

                    {/* Capabilities List */}
                    <ul className={styles.capabilitiesList}>
                      {item.capabilities.map((cap) => (
                        <li key={cap.id} className={styles.capabilityItem}>
                          <span className={styles.capabilityDash} aria-hidden="true" />
                          <span>{cap.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: 3D Visual Icon */}
                  <div className={styles.iconWrapper} aria-hidden="true">
                    <Image
                      src={item.iconAssetUrl}
                      alt=""
                      width={226}
                      height={226}
                      className={styles.iconImage}
                    />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
