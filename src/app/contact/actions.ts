'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { mailConfigured, sendMail } from '@/lib/mailer';

export interface ContactFormState {
  status: 'idle' | 'sent' | 'error';
  message?: string;
  /** Field name -> first problem, so each input can show its own error. */
  fieldErrors?: Record<string, string>;
  /** Echoed back so a failed submit does not wipe what was typed. */
  values?: Record<string, string>;
}

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z.string().trim().email('That does not look like an email address.').max(200),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  budget: z.string().trim().max(120).optional().or(z.literal('')),
  brief: z
    .string()
    .trim()
    .min(20, 'A sentence or two about the problem helps us reply usefully.')
    .max(5000),
});

/* One submission per address per window. Enough to stop a stuck submit button
   or a crude script; a determined flood needs the platform's own rate limiting,
   which is a hosting concern rather than an application one. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const recent = new Map<string, number[]>();

const rateLimited = (key: string): boolean => {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  /* The map is per-instance and short-lived, but prune anyway so a long-running
     instance does not accumulate an entry per visitor. */
  if (recent.size > 5000) recent.clear();
  return hits.length > MAX_PER_WINDOW;
};

export async function submitContactForm(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = Object.fromEntries(formData.entries());
  const values = Object.fromEntries(
    Object.entries(raw).filter(([k, v]) => typeof v === 'string' && k !== 'company_website'),
  ) as Record<string, string>;

  /* Honeypot: a field hidden from people and from screen readers. Anything that
     fills it is automated. Answer as though it worked — telling a bot it was
     caught only teaches whoever wrote it. */
  if (typeof raw.company_website === 'string' && raw.company_website.length > 0) {
    return { status: 'sent' };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: 'error', message: 'Please check the highlighted fields.', fieldErrors, values };
  }

  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return {
      status: 'error',
      message: 'That is a few messages in a row — give it a minute and try again.',
      values,
    };
  }

  if (!mailConfigured()) {
    /* Deployed without SMTP credentials. Say so plainly and hand over the
       address that does work rather than pretending the message was sent. */
    return {
      status: 'error',
      message: 'The form is not connected yet. Please email info@orvexiqlabs.com and we will reply.',
      values,
    };
  }

  const { name, email, company, budget, brief } = parsed.data;

  try {
    await sendMail({
      subject: `New enquiry — ${name}${company ? ` (${company})` : ''}`,
      replyTo: `${name} <${email}>`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Company: ${company || '—'}`,
        `Budget:  ${budget || '—'}`,
        '',
        brief,
        '',
        '— sent from the orvexiqlabs.com contact form',
      ].join('\n'),
    });
  } catch (error) {
    console.error('Contact form send failed', error);
    return {
      status: 'error',
      message: 'Something went wrong sending that. Please email info@orvexiqlabs.com instead.',
      values,
    };
  }

  return { status: 'sent' };
}
