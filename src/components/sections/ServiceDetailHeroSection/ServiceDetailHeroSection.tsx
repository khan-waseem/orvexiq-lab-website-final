import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { ServiceDetailPage } from '@/content/schemas/service-detail.schema';
import styles from './ServiceDetailHeroSection.module.css';

export interface ServiceDetailHeroSectionProps {
  hero: ServiceDetailPage['hero'];
  breadcrumbLabel: string;
}

/**
 * ServiceDetailHeroSection — Figma node 124:27
 *
 * 1440 reference (section height 455, padding 96/96):
 *   breadcrumb 14px Medium +24 -> headline 56/66 Bold -1.68 (820 wide)
 *   +24 -> sub 20/32 (720 wide); icon 300x300 at x=1044 y=78
 */
export const ServiceDetailHeroSection: React.FC<ServiceDetailHeroSectionProps> = ({
  hero,
  breadcrumbLabel,
}) => {
  return (
    <SectionWrapper theme="canvas" padding="custom" id="service-hero" className={styles.section}>
      <div className={styles.heroGlow} aria-hidden="true" />

      <PageContainer className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.main}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <ol className={styles.crumbList}>
                <li>
                  <Link href="/" className={styles.crumbLink}>Home</Link>
                </li>
                <li aria-hidden="true" className={styles.crumbSep}>/</li>
                <li>
                  <Link href="/services" className={styles.crumbLink}>Services</Link>
                </li>
                <li aria-hidden="true" className={styles.crumbSep}>/</li>
                <li>
                  <span className={styles.crumbCurrent} aria-current="page">{breadcrumbLabel}</span>
                </li>
              </ol>
            </nav>

            <h1 className={styles.headline}>
              {hero.headlineLine1}{' '}
              <br />
              {hero.headlineLine2}
            </h1>

            <p className={styles.sub}>{hero.subdescription}</p>
          </div>

          {hero.iconAssetUrl ? (
            <div className={styles.visual} aria-hidden="true">
              <Image
                src={hero.iconAssetUrl}
                alt=""
                width={300}
                height={300}
                className={styles.visualImage}
                priority
              />
            </div>
          ) : null}
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
