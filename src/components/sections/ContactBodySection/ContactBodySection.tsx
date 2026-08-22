import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { GlowRings } from '@/components/decor/GlowRings';
import { SectionDots } from '@/components/decor/SectionDots';
import { PageContainer } from '@/components/layout/Container';
import { ContactPageContent } from '@/content/schemas/contact-page.schema';
import { ContactForm } from './ContactForm';
import styles from './ContactBodySection.module.css';

export interface ContactBodySectionProps {
  form: ContactPageContent['form'];
  info: ContactPageContent['info'];
}

/**
 * ContactBodySection — Figma node 33:28 (Page / Contact / Section / Contact Body)
 *
 * 1440 reference (section height 743, padding 64 top / 128 bottom):
 *   form fills | gap 96 | info 400
 *   form card: glass, r16, padding 48, gap 24
 *   fields: label 14px Medium secondary +8 input (r8, padding 16, 1px border-default)
 *   textarea 140 tall; submit is the CTA gradient pill
 *
 * SUBMISSION
 * The form itself is a client component (ContactForm) posting to a server
 * action, which sends the enquiry through the site's own mailbox. This section
 * stays a server component so the info column and the page's decor are not
 * shipped to the browser with it.
 */
export const ContactBodySection: React.FC<ContactBodySectionProps> = ({ form, info }) => {
  return (
    <SectionWrapper theme="canvas" padding="custom" id="contact-body" className={styles.section}>
      <GlowRings side="left" size={980} />
      <GlowRings side="right" size={860} />

      <SectionDots />
      <PageContainer className={styles.container}>
        <div className={styles.row}>
          <ContactForm form={form} />

          <div className={styles.info}>
            {info.map((block) => (
              <div key={block.id} className={styles.infoBlock}>
                <p className={styles.infoLabel}>{block.label}</p>
                {block.email ? (
                  <a className={styles.infoValueLink} href={`mailto:${block.email}`}>
                    {block.value}
                  </a>
                ) : (
                  <p className={styles.infoValue}>{block.value}</p>
                )}
                <p className={styles.infoBody}>{block.body}</p>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </SectionWrapper>
  );
};
