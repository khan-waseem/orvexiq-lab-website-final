#!/usr/bin/env node
/**
 * Mechanical half of DESIGN-RULES.md.
 *
 * Only checks things a machine can be sure about. The judgement calls — is this
 * heading a band or a card title — stay in the doc, so this never blocks a
 * change it does not actually understand.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SECTIONS = join(ROOT, 'src/components/sections');
const DATA = join(ROOT, 'src/content/data');

/** Sections whose headings are records or cards, not bands — see rule 2. */
const NOT_BANDS = new Set([
  'PageHero',
  'HeroSection',
  'NotFoundSection',
  'LegalPageSection',
  'ArticleSections',
  'JobDetailSection',
  'PostGridSection',
  'ApplyModal',
  'CaseStudyChapters',
  'ContactBodySection',
  'ServiceDetailSection',
]);

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const failures = [];
const fail = (file, msg) => failures.push(`${relative(ROOT, file)}: ${msg}`);

/* --- Rule 1: no page may hand PageHero an action. --- */
for (const file of walk(join(ROOT, 'src/app')).filter((f) => f.endsWith('.tsx'))) {
  const src = readFileSync(file, 'utf8');
  if (/<PageHero[\s\S]*?primaryCta|<PageHero[\s\S]*?secondaryCta/.test(src)) {
    fail(file, 'hero carries a CTA — rule 1: no hero CTAs, the page ends on LandingCtaSection');
  }
}

/* --- Rule 2: the gradient belongs to <Accent> and nowhere else. --- */
for (const file of walk(join(ROOT, 'src')).filter((f) => f.endsWith('.css'))) {
  if (file.endsWith('primitives.css')) continue;
  const src = readFileSync(file, 'utf8');
  const allowed =
    file.includes('SectionHeading') ||
    file.includes('CaseStudyChapters') ||
    file.includes('NotFoundSection');
  if (!allowed && src.includes('--orv-gradient-accent-text')) {
    fail(file, 'uses the accent gradient outside <Accent> — rule 2');
  }
}

/* --- Rule 2: every section band heading has exactly one accent. --- */
for (const name of readdirSync(SECTIONS)) {
  if (NOT_BANDS.has(name)) continue;
  const dir = join(SECTIONS, name);
  if (!statSync(dir).isDirectory()) continue;

  const src = walk(dir)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => readFileSync(f, 'utf8'))
    .join('\n');

  const headings = (src.match(/<SectionHeading/g) || []).length;
  const accents = (src.match(/<Accent>/g) || []).length;

  if (headings === 0) {
    fail(join(dir, `${name}.tsx`), 'section band without <SectionHeading> — rule 2');
  } else if (accents !== headings) {
    fail(
      join(dir, `${name}.tsx`),
      `${headings} heading(s) but ${accents} <Accent> run(s) — rule 2 wants exactly one each`,
    );
  }
}

/* --- Rule 4: internal case study links must resolve. ---
   Checked against the chapters file, not the index: a slug in case-studies.json
   only gets a card, while a slug with chapters is what /case-studies/[slug]
   actually renders. Linking to the former 404s. */
if (existsSync(join(DATA, 'case-study-chapters.json'))) {
  const raw = JSON.parse(readFileSync(join(DATA, 'case-study-chapters.json'), 'utf8'));
  const list = Array.isArray(raw) ? raw : Object.values(raw).find(Array.isArray) || [];
  const slugs = new Set(list.map((c) => c.slug));

  for (const file of readdirSync(DATA).filter((f) => f.endsWith('.json'))) {
    const src = readFileSync(join(DATA, file), 'utf8');
    for (const [, slug] of src.matchAll(/"\/case-studies\/([a-z0-9-]+)"/g)) {
      if (!slugs.has(slug)) fail(join(DATA, file), `links to /case-studies/${slug}, which has no detail page — rule 4`);
    }
  }
}

if (failures.length) {
  console.error(`\n${failures.length} design-rule violation(s):\n`);
  for (const f of failures) console.error(`  ${f}`);
  console.error('\nSee DESIGN-RULES.md\n');
  process.exit(1);
}
console.log('Design rules: clean.');
