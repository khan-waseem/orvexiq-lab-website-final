import 'server-only';
import nodemailer from 'nodemailer';

/**
 * Outbound mail, sent through the Hostinger mailbox that already owns the
 * domain. No third-party sending service: the site's domain, its DNS and its
 * mailbox all live in one place, so SPF and DKIM are already correct and there
 * is no second vendor to keep an account with.
 *
 * `server-only` makes a mistaken client import a build error rather than a
 * credential leak.
 */

/** Read at call time, not module scope, so a missing value fails the request
    rather than the build — a deploy without SMTP set still serves the site. */
const required = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
};

export const mailConfigured = (): boolean =>
  Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);

const transport = () =>
  nodemailer.createTransport({
    host: required('SMTP_HOST'),
    port: Number(process.env.SMTP_PORT ?? 465),
    /* 465 is implicit TLS; 587 upgrades with STARTTLS. */
    secure: Number(process.env.SMTP_PORT ?? 465) === 465,
    auth: { user: required('SMTP_USER'), pass: required('SMTP_PASSWORD') },
  });

export interface OutboundMail {
  subject: string;
  text: string;
  /** The visitor's address. Goes in Reply-To, never in From. */
  replyTo?: string;
}

/**
 * `From` is always the authenticated mailbox.
 *
 * Putting the visitor's address in From is the common mistake here: the message
 * would then claim to come from a domain this server is not authorised to send
 * for, SPF would fail, and it would land in spam. Reply-To gets the same
 * behaviour — hitting reply still answers the visitor — without the forgery.
 */
export const sendMail = async ({ subject, text, replyTo }: OutboundMail): Promise<void> => {
  await transport().sendMail({
    from: `Orvexiq Lab Website <${required('SMTP_USER')}>`,
    to: process.env.CONTACT_TO ?? required('SMTP_USER'),
    replyTo,
    subject,
    text,
  });
};
