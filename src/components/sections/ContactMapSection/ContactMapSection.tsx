import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { PageContainer } from '@/components/layout/Container';
import { SectionHeading, Accent } from '@/components/primitives/SectionHeading';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { ContactPageContent } from '@/content/schemas/contact-page.schema';
import styles from './ContactMapSection.module.css';

export interface ContactMapSectionProps {
  content: ContactPageContent['map'];
}

/**
 * ContactMapSection — the studio location band beneath the contact form.
 *
 * The map is Google's keyless embed, which only serves its light theme; the
 * frame around it applies a colour filter so it sits in the dark page instead
 * of glaring out of it. A properly dark-styled map needs a Maps JavaScript API
 * key, which this build does not carry.
 *
 * It loads lazily and is marked `aria-hidden`, with the address written out in
 * text beside it — so the location is available without the third-party frame
 * ever loading.
 */
export const ContactMapSection: React.FC<ContactMapSectionProps> = ({ content }) => {
  const query = encodeURIComponent(content.mapQuery);
  const embedSrc = `https://www.google.com/maps?q=${query}&z=16&output=embed`;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <SectionWrapper
      theme="canvas"
      padding="custom"
      id="contact-map"
      className={styles.section}
      ariaLabelledBy="contact-map-heading"
    >
      <GlowRings side="left" size={960} />
      <GlowRings side="right" size={840} />
      <SectionDots />

      <PageContainer className={styles.container}>
        <SectionHeading
          id="contact-map-heading"
          eyebrow={content.eyebrow}
          rule="dot"
          sub={content.subdescription}
        >
          {content.headlineLine1}
          <br />
          <Accent>{content.headlineAccent2}</Accent>
        </SectionHeading>

        <div className={styles.panel}>
          <div className={styles.mapFrame}>
            <iframe
              className={styles.map}
              src={embedSrc}
              title={content.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-hidden="true"
              tabIndex={-1}
            />

            {/* The address rides on the map at desktop width and drops below it
                once the frame is too short to carry a card. */}
            <div className={styles.address}>
              <p className={styles.addressLabel}>{content.addressLabel}</p>
              <address className={styles.addressLines}>
                {content.addressLines.map((line) => (
                  <span key={line} className={styles.addressLine}>
                    {line}
                  </span>
                ))}
              </address>

              <a
                className={styles.directions}
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.directionsLabel}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M4 10 10 4M5 4h5v5" stroke="currentColor" strokeWidth="1.3"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          <dl className={styles.facts}>
            {content.facts.map((fact) => (
              <div key={fact.id} className={styles.fact}>
                <dt className={styles.factLabel}>{fact.label}</dt>
                <dd className={styles.factValue}>{fact.value}</dd>
                <dd className={styles.factBody}>{fact.body}</dd>
              </div>
            ))}
          </dl>
        </div>

      </PageContainer>
    </SectionWrapper>
  );
};
