'use client';

import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm, type ContactFormState } from '@/app/contact/actions';
import { ContactPageContent } from '@/content/schemas/contact-page.schema';
import styles from './ContactBodySection.module.css';

export interface ContactFormProps {
  form: ContactPageContent['form'];
}

const INITIAL: ContactFormState = { status: 'idle' };

/** Disabled and relabelled while the action is in flight, so a slow network
    cannot produce two enquiries from one impatient visitor. */
const SubmitButton: React.FC<{ label: string }> = ({ label }) => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submit} disabled={pending}>
      {pending ? 'Sending…' : label}
    </button>
  );
};

/**
 * ContactForm — the only interactive form on the site.
 *
 * Posts to a server action rather than to a third-party form service, so the
 * success state is this page's own rather than someone else's thank-you screen.
 *
 * The confirmation replaces the form instead of appearing above it: leaving a
 * filled-in form on screen after a successful send invites a second submit.
 */
export const ContactForm: React.FC<ContactFormProps> = ({ form }) => {
  const [state, action] = useActionState(submitContactForm, INITIAL);

  const halfFields = form.fields.filter((f) => f.span === 'half');
  const fullFields = form.fields.filter((f) => f.span === 'full');
  const rows: (typeof halfFields)[] = [];
  for (let i = 0; i < halfFields.length; i += 2) rows.push(halfFields.slice(i, i + 2));

  if (state.status === 'sent') {
    return (
      <div className={styles.form}>
        <div className={styles.sent} role="status">
          <span className={styles.sentMark} aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor"
                 strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.6 11.4 9 15.8 17.4 6.6" />
            </svg>
          </span>
          <h3 className={styles.sentTitle}>Message sent.</h3>
          <p className={styles.sentBody}>
            Thanks — we read every one. If it is a fit you will hear back within two working days.
          </p>
        </div>
      </div>
    );
  }

  const error = (name: string) => state.fieldErrors?.[name];

  return (
    <form action={action} className={styles.form} aria-label="Project enquiry" noValidate>
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
                defaultValue={state.values?.[f.name] ?? ''}
                aria-invalid={error(f.name) ? true : undefined}
                aria-describedby={error(f.name) ? `${f.id}-error` : undefined}
              />
              {error(f.name) && (
                <p id={`${f.id}-error`} className={styles.fieldError}>
                  {error(f.name)}
                </p>
              )}
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
            defaultValue={state.values?.[f.name] ?? ''}
            aria-invalid={error(f.name) ? true : undefined}
            aria-describedby={error(f.name) ? `${f.id}-error` : undefined}
          />
          {error(f.name) && (
            <p id={`${f.id}-error`} className={styles.fieldError}>
              {error(f.name)}
            </p>
          )}
        </div>
      ))}

      {/* Honeypot. Hidden from sight, from the tab order and from screen
          readers, so only automation ever fills it. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="company_website">Do not fill this in</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1}
               autoComplete="off" />
      </div>

      <div className={styles.submitRow}>
        <SubmitButton label={form.submitLabel} />
        {state.status === 'error' && state.message && (
          <p className={styles.formError} role="alert">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
};
