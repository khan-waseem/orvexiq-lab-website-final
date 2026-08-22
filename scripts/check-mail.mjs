#!/usr/bin/env node
/**
 * Verifies the contact form's SMTP credentials before anything is deployed.
 *
 *   npm run check:mail          -- log in and hang up, sends nothing
 *   npm run check:mail:send -- delivers one test message
 *
 * Reads .env.local, the same file Next reads in development.
 */
import nodemailer from 'nodemailer';

const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD'];
const missing = required.filter((k) => !process.env[k]);

if (missing.length) {
  console.error(`\n  Missing in .env.local: ${missing.join(', ')}`);
  console.error('  Copy .env.example to .env.local and fill it in.\n');
  process.exit(1);
}

const port = Number(process.env.SMTP_PORT);
const to = process.env.CONTACT_TO ?? process.env.SMTP_USER;

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  /* Surfaces the SMTP conversation when something is refused for a reason the
     final error message does not explain. */
  logger: process.argv.includes('--debug'),
  debug: process.argv.includes('--debug'),
});

console.log(`\n  Host       ${process.env.SMTP_HOST}:${port} (${port === 465 ? 'SSL' : 'STARTTLS'})`);
console.log(`  Sending as ${process.env.SMTP_USER}`);
console.log(`  Delivering to ${to}\n`);

try {
  await transport.verify();
  console.log('  Connected and authenticated.');
} catch (error) {
  console.error(`  Could not connect: ${error.message}\n`);
  /* The three failures worth naming, because each has a different fix. */
  if (/auth/i.test(error.message)) {
    console.error('  The password is wrong, or the username is not the full email address.');
  } else if (/timeout|ETIMEDOUT|ECONNREFUSED/i.test(error.message)) {
    console.error('  Nothing answered. Check the host name, and try port 587 instead of 465.');
  } else if (/certificate/i.test(error.message)) {
    console.error('  TLS mismatch — port 465 needs SSL, port 587 needs STARTTLS.');
  }
  console.error('');
  process.exit(1);
}

if (!process.argv.includes('--send')) {
  console.log('  Nothing was sent. Run "npm run check:mail:send" to deliver a test message.\n');
  process.exit(0);
}

try {
  const info = await transport.sendMail({
    from: `Orvexiq Lab Website <${process.env.SMTP_USER}>`,
    to,
    replyTo: 'Test Visitor <test@example.com>',
    subject: 'Test - contact form credentials',
    text: [
      'If this arrived, the contact form will work once the same values are set on Vercel.',
      '',
      'Check two things:',
      '  1. It is in the inbox, not the spam folder.',
      '  2. Hitting Reply addresses test@example.com, not your own mailbox.',
    ].join('\n'),
  });

  console.log(`\n  Sent. Check ${to} - including the spam folder.`);
  console.log(`  Server said: ${info.response}\n`);
} catch (error) {
  /* Login already succeeded, so this is the server refusing the message rather
     than refusing the account. The two have completely different fixes. */
  console.error('\n  Login worked, but the message was rejected.\n');
  console.error(`  Server said: ${error.message}`);
  if (error.responseCode) console.error(`  SMTP code:   ${error.responseCode}`);
  console.error('');

  const m = String(error.message).toLowerCase();
  if (/sender|from address|not allowed to send|553|501/.test(m)) {
    console.error('  The From address must be exactly the mailbox you logged in as.');
    console.error(`  SMTP_USER is "${process.env.SMTP_USER}" - check it matches hPanel exactly.`);
  } else if (/quota|limit|rate|too many|451|421/.test(m)) {
    console.error('  A sending limit was hit. Wait a few minutes and try once more.');
  } else if (/spam|policy|blocked|554|550/.test(m)) {
    console.error('  Refused by a content or policy filter, not by authentication.');
    console.error('  A brand new Hostinger mailbox is sometimes held for a short period');
    console.error('  before it is allowed to send. Try again in an hour.');
  } else if (/recipient|no such user/.test(m)) {
    console.error(`  The recipient "${to}" was not accepted. Check CONTACT_TO.`);
  } else {
    console.error('  Re-run with --debug to see the full SMTP conversation:');
    console.error('    npm run check:mail:debug');
  }
  console.error('');
  process.exit(1);
}
