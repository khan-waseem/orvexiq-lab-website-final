import React from 'react';
import Image from 'next/image';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
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
 * - Reuses GlassCard, SectionWrapper, PageContainer primitives
 * - 100% token-governed and content-repository compliant
 */
export const ServicesSection: React.FC<ServicesSectionProps> = ({
  content,
  services,
}) => {
  return (
    /*
     * padding="none" is deliberate: in Figma (86:866) the Services section has
     * zero internal vertical padding — its eyebrow sits at local y=0 and the
     * card grid ends flush with the section box. The 128px rhythm above and
     * below is carried by Selected Work's bottom padding and Approach's top
     * padding. Giving this section its own padding added 242px of dead space.
     */
    <SectionWrapper theme="canvas" padding="none" id="services" className={styles.servicesSection}>
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
          {/*
            Header Title Composition.
            Services does NOT use the shared Eyebrow/h2 treatment: Figma 86:867
            is a 20px Light label with a 29.64px dash and a 13px gap, and 86:870
            is 40px SemiBold at normal leading — unlike the 12px eyebrow / 48px
            Bold headline used by Selected Work and Approach.
          */}
          <div className={styles.titleGroup}>
            <div className={styles.servicesEyebrow}>
              <span className={styles.servicesEyebrowDash} aria-hidden="true" />
              <span className={styles.servicesEyebrowLabel}>{content.eyebrow}</span>
            </div>
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
