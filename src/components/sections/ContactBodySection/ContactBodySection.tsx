import React from 'react';
import { SectionWrapper } from '@/components/layout/Section';
import { GlowRings } from '@/components/decor/GlowRings';
import { PageContainer } from '@/components/layout/Container';
import { ContactPageContent } from '@/content/schemas/contact-page.schema';
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
 * There is no form endpoint yet, so the submit button is disabled and the card
 * states plainly that the form is not connected, pointing at the email address
 * in the info column — which Figma itself calls the fastest route. The fields
 * are real, labelled and typable so the markup is ready to wire to a handler;
 * nothing is collected or sent.
 */
export const ContactBodySection: React.FC<ContactBodySectionProps> = ({ form, info }) => {
  const halfFields = form.fields.filter((f) => f.span === 'half');
  const fullFields = form.fields.filter((f) => f.span === 'full');
  const rows: (typeof halfFields)[] = [];
  for (let i = 0; i < halfFields.length; i += 2) rows.push(halfFields.slice(i, i + 2));

  return (
    <SectionWrapper theme="canvas" padding="custom" id="contact-body" className={styles.section}>
      <GlowRings side="left" size={980} />
      <GlowRings side="right" size={860} />

      <PageContainer className={styles.container}>
        <div className={styles.row}>
          <form className={styles.form} aria-label="Project enquiry">
            {rows.map((pair) => (
              <div key={pair.map((f) => f.id).join('-')} className={styles.fieldRow}>
                {pair.map((f) => (
                  <div key={f.id} className={styles.field}>
                    <label className={styles.label} htmlFor={f.id}>
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      name={f.name}
                      type={f.type === 'email' ? 'email' : 'text'}
                      autoComplete={f.autoComplete}
                      placeholder={f.placeholder}
                      className={styles.input}
                    />
                  </div>
                ))}
              </div>
            ))}

            {fullFields.map((f) => (
              <div key={f.id} className={styles.field}>
                <label className={styles.label} htmlFor={f.id}>
                  {f.label}
                </label>
                <textarea
                  id={f.id}
                  name={f.name}
                  placeholder={f.placeholder}
                  className={styles.textarea}
                  rows={4}
                />
              </div>
            ))}

            {/* The note sits beside the button rather than under it so the
                disabled state is explained without adding a row to the card. */}
            <div className={styles.submitRow}>
              <button
                type="submit"
                className={styles.submit}
                disabled
                aria-describedby="contact-form-note"
              >
                {form.submitLabel}
              </button>
              <p id="contact-form-note" className={styles.note}>
                {form.unavailableNote}
              </p>
            </div>
          </form>

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
