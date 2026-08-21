import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tag } from '@/components/primitives/Tag';
import { CaseStudyItem } from '@/content/schemas/case-study.schema';
import { CaseMockup } from '@/components/sections/SelectedWorkSection/CaseMockup';
import styles from './FeaturedCase.module.css';

export interface FeaturedCaseProps {
  item: CaseStudyItem;
  ctaLabel: string;
}

/**
 * FeaturedCase — the lead card above the case grid.
 *
 * Only ever rendered for a case study whose write-up actually exists, so the
 * one piece of readable work on this page leads it instead of sitting sixth
 * in a grid of placeholders.
 */
export const FeaturedCase: React.FC<FeaturedCaseProps> = ({ item, ctaLabel }) => (
  <article className={styles.featured}>
    <div className={styles.copy}>
      <div className={styles.tagRow}>
        <Tag variant="category">{item.category}</Tag>
        {item.clientDescriptor && <span className={styles.client}>{item.clientDescriptor}</span>}
      </div>

      <h3 className={styles.title}>
        <Link href={`/case-studies/${item.slug}`} className={styles.titleLink}>
          {item.title}
        </Link>
      </h3>

      <p className={styles.body}>{item.description}</p>

      <ul className={styles.services}>
        {item.servicesProvided.map((service) => (
          <li key={service} className={styles.service}>
            <span className={styles.serviceDot} aria-hidden="true" />
            {service}
          </li>
        ))}
      </ul>

      <span className={styles.cta} aria-hidden="true">
        {ctaLabel}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7h9M7.8 3.4 11.5 7l-3.7 3.6" stroke="currentColor" strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>

    <div className={styles.visual}>
      {item.coverScreenAssetUrl ? (
        <Image
          src={item.coverScreenAssetUrl}
          alt=""
          width={602}
          height={300}
          className={styles.visualImage}
        />
      ) : (
        <CaseMockup label={item.title} />
      )}
    </div>
  </article>
);
