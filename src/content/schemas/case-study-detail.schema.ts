import { z } from 'zod';
import { seoMetadataSchema } from './common.schema';

/**
 * Case Study detail body — Figma nodes 149:2 / 159:2 / 171:2.
 *
 * The three pages run ~12,600px over eighteen sections, but those sections are
 * a small set of repeating archetypes with different content. Modelling them as
 * typed blocks keeps one renderer for all three instead of eighteen bespoke
 * components, and lets a fourth case study be added as data alone.
 */

const statSchema = z.object({ value: z.string(), label: z.string() });
const keyValueSchema = z.object({ key: z.string(), value: z.string() });

/** Tone drives the accent colour on cards and eyebrows. */
const toneSchema = z.enum(['danger', 'brand', 'success', 'neutral', 'warning']);

export const caseBlockSchema = z.discriminatedUnion('type', [
  /** Full-bleed product mock band (149:48). No asset exported — placeholder. */
  z.object({ type: z.literal('visual'), placeholder: z.string() }),

  /** Six-column key/value strip (149:51). */
  z.object({ type: z.literal('meta'), items: z.array(keyValueSchema) }),

  /** Three tone-coded summary cards (149:71). */
  z.object({
    type: z.literal('glance'),
    cards: z.array(z.object({ tone: toneSchema, label: z.string(), body: z.string() })),
  }),

  /** Numbered narrative section, optionally with a side panel (149:82 etc.). */
  z.object({
    type: z.literal('narrative'),
    eyebrow: z.string(),
    headlineLines: z.array(z.string()),
    paragraphs: z.array(z.string()),
    panel: z
      .object({
        label: z.string(),
        steps: z.array(z.object({ title: z.string(), note: z.string() })),
        footnote: z.string(),
        tone: toneSchema.default('danger'),
      })
      .optional(),
  }),

  /** Lettered assumption grid plus a closing note (149:119). */
  z.object({
    type: z.literal('assumptions'),
    eyebrow: z.string(),
    headlineLines: z.array(z.string()),
    items: z.array(z.object({ key: z.string(), body: z.string() })),
    note: z.string(),
  }),

  /** Bordered full-width callout, e.g. "What we got wrong" (149:138). */
  z.object({
    type: z.literal('callout'),
    tone: toneSchema,
    eyebrow: z.string(),
    headline: z.string(),
    paragraphs: z.array(z.string()),
  }),

  /**
   * Numbered approach section (149:144 / :153 / :164): copy plus one or two
   * captioned product shots. `layout` selects the Figma arrangement —
   * "stacked" runs copy above a full-width shot, "aside" sets a single shot
   * beside the copy.
   */
  z.object({
    type: z.literal('decision'),
    eyebrow: z.string(),
    headline: z.string(),
    paragraphs: z.array(z.string()),
    layout: z.enum(['stacked', 'aside']).default('stacked'),
    shots: z.array(z.object({ placeholder: z.string(), caption: z.string() })),
  }),

  /** Labelled constraint cards beside a heading (149:176). */
  z.object({
    type: z.literal('constraints'),
    eyebrow: z.string(),
    headlineLines: z.array(z.string()),
    intro: z.string(),
    items: z.array(z.object({ label: z.string(), body: z.string() })),
  }),

  /** Hypothesis block with measures and ship criteria (149:197). */
  z.object({
    type: z.literal('hypothesis'),
    eyebrow: z.string(),
    count: z.string(),
    countLabel: z.string(),
    headline: z.string(),
    body: z.string(),
    measuresLabel: z.string(),
    measures: z.array(keyValueSchema),
    criteria: z.array(z.object({ label: z.string(), value: z.string(), note: z.string() })),
    footnote: z.string(),
  }),

  /** Pull-quote card carrying the design bet (149:244). */
  z.object({
    type: z.literal('bet'),
    quote: z.string(),
    attributionTitle: z.string(),
    attributionNote: z.string(),
  }),

  /** Three-column "what exists" summary (149:253). */
  z.object({
    type: z.literal('whatExists'),
    eyebrow: z.string(),
    headline: z.string(),
    columns: z.array(z.object({ title: z.string(), body: z.string() })),
  }),
]);

export const caseStudyDetailSchema = z.object({
  slug: z.string(),
  breadcrumbLabel: z.string(),
  kicker: z.string(),
  headlineLines: z.array(z.string()),
  standfirst: z.string(),
  stats: z.array(statSchema),
  blocks: z.array(caseBlockSchema),
  nextCase: z.object({ eyebrow: z.string(), title: z.string(), body: z.string(), href: z.string() }),
  ctaSection: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    headlineLine2: z.string(),
    subdescriptionLine1: z.string(),
    subdescriptionLine2: z.string(),
    primaryCtaText: z.string(),
    emailCtaText: z.string(),
  }),
  seo: seoMetadataSchema.optional(),
});

export const caseStudyDetailCollectionSchema = z.array(caseStudyDetailSchema);

export type CaseBlock = z.infer<typeof caseBlockSchema>;
export type CaseStudyDetail = z.infer<typeof caseStudyDetailSchema>;
