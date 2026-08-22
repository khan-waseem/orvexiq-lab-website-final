import { z } from 'zod';
import { seoMetadataSchema } from './common.schema';

/**
 * A chaptered case study.
 *
 * Replaces the long-form block list. That format carried the argument in
 * thirteen stacked text sections, which read as a document rather than as a
 * story — a reader had to work to find out what the problem was and what got
 * built. Here each chapter is one screen carrying one idea and one diagram.
 *
 * The chapter types are deliberately generic rather than shaped around a
 * single project: any case study picks the ones its argument needs.
 */

const toneSchema = z.enum(['violet', 'green', 'amber', 'red', 'blue', 'neutral']);

/** A product screen exported from the design file. */
const screenSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string(),
  width: z.number(),
  height: z.number(),
  /** 'laptop' seats a full desktop screen in a device mockup. Dialogs and
   *  fragments use 'plain', where a device frame would misrepresent them. */
  frame: z.enum(['laptop', 'plain']).default('laptop'),
});

const chapterBase = {
  id: z.string(),
  number: z.string(),
  label: z.string(),
  headlineLine1: z.string(),
  /** Trailing run in the violet gradient — one accent per headline. */
  headlineAccent2: z.string(),
};

/** Opens the case study: what it is, who for, what it covered. */
export const introChapterSchema = z.object({
  type: z.literal('intro'),
  ...chapterBase,
  title: z.string(),
  description: z.string(),
  meta: z.array(
    z.object({
      id: z.string(),
      icon: z.enum(['role', 'duration', 'industry']),
      label: z.string(),
      value: z.string(),
      note: z.string().optional(),
    })
  ),
  screen: screenSchema.optional(),
});

/** A sequence: a pipeline of reasoning, or a chain of events. */
export const flowChapterSchema = z.object({
  type: z.literal('flow'),
  ...chapterBase,
  intro: z.string().optional(),
  /** 'linked' draws arrows between steps; 'timeline' runs them along a rail. */
  variant: z.enum(['linked', 'timeline']).default('linked'),
  steps: z.array(
    z.object({
      id: z.string(),
      number: z.string().optional(),
      title: z.string(),
      body: z.string(),
      icon: z.enum(['data', 'shield', 'scenario', 'rules', 'verdict', 'clock', 'alert']).optional(),
      tone: toneSchema,
    })
  ),
  footnote: z.string().optional(),
});

/** One total splitting into parts, ending in what is actually left. */
export const breakdownChapterSchema = z.object({
  type: z.literal('breakdown'),
  ...chapterBase,
  body: z.string(),
  callout: z.string().optional(),
  totalLabel: z.string(),
  totalValue: z.string(),
  totalNote: z.string(),
  buckets: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      caption: z.string(),
      value: z.string(),
      note: z.string(),
      tone: toneSchema,
    })
  ),
  resultLabel: z.string(),
  resultValue: z.string(),
  resultCaption: z.string(),
  question: z
    .object({
      label: z.string(),
      text: z.string(),
      highlight: z.string(),
      answer: z.string(),
    })
    .optional(),
});

/** The decisions taken, each with the thing it cost. */
export const decisionsChapterSchema = z.object({
  type: z.literal('decisions'),
  ...chapterBase,
  intro: z.string().optional(),
  items: z.array(
    z.object({
      id: z.string(),
      number: z.string(),
      title: z.string(),
      body: z.string(),
      tradeOffLabel: z.string(),
      tradeOff: z.string(),
      screens: z.array(screenSchema).default([]),
    })
  ),
});

/** What was tried and thrown away — the chapter most case studies omit. */
export const statementChapterSchema = z.object({
  type: z.literal('statement'),
  ...chapterBase,
  paragraphs: z.array(z.string()),
  tone: toneSchema.default('violet'),
  badge: z.string().optional(),
  screen: screenSchema.optional(),
});

/** The boundaries that removed options. */
export const constraintsChapterSchema = z.object({
  type: z.literal('constraints'),
  ...chapterBase,
  intro: z.string(),
  items: z.array(
    z.object({ id: z.string(), label: z.string(), body: z.string(), tone: toneSchema })
  ),
});

/** What this rests on, stated plainly rather than buried. */
export const assumptionsChapterSchema = z.object({
  type: z.literal('assumptions'),
  ...chapterBase,
  intro: z.string(),
  items: z.array(z.object({ id: z.string(), key: z.string(), body: z.string() })),
  note: z.string().optional(),
});

/** A measured value against a threshold, with the verdict it produces. */
export const thresholdChapterSchema = z.object({
  type: z.literal('threshold'),
  ...chapterBase,
  body: z.string(),
  safeZone: z.object({ label: z.string(), note: z.string() }),
  riskZone: z.object({ label: z.string(), note: z.string() }),
  floor: z.object({ value: z.string(), label: z.string(), note: z.string() }),
  projected: z.object({ value: z.string(), label: z.string(), note: z.string() }),
  gap: z.object({ value: z.string(), label: z.string(), note: z.string() }),
  verdict: z.object({ label: z.string(), title: z.string(), body: z.string() }),
});

/** Options side by side, so the reader watches a choice being made. */
export const comparisonChapterSchema = z.object({
  type: z.literal('comparison'),
  ...chapterBase,
  body: z.string(),
  start: z.object({ value: z.string(), label: z.string(), badge: z.string() }),
  decision: z.object({ value: z.string(), label: z.string() }),
  floor: z.object({ value: z.string(), label: z.string() }),
  options: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      value: z.string(),
      label: z.string(),
      position: z.enum(['below', 'above']),
      delta: z.string(),
      status: z.string(),
      tone: toneSchema,
      recommended: z.boolean().default(false),
    })
  ),
  recommendation: z.object({ label: z.string(), title: z.string(), body: z.string() }),
  footnotes: z.array(z.object({ id: z.string(), text: z.string() })).default([]),
});

/** Where it stands, and what would prove it. */
export const outcomeChapterSchema = z.object({
  type: z.literal('outcome'),
  ...chapterBase,
  intro: z.string().optional(),
  columns: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      items: z.array(z.string()),
      tone: toneSchema,
    })
  ),
  footnote: z.string().optional(),
});

export const caseStudyChapterSchema = z.discriminatedUnion('type', [
  introChapterSchema,
  flowChapterSchema,
  breakdownChapterSchema,
  decisionsChapterSchema,
  statementChapterSchema,
  constraintsChapterSchema,
  assumptionsChapterSchema,
  thresholdChapterSchema,
  comparisonChapterSchema,
  outcomeChapterSchema,
]);

export const chapteredCaseStudySchema = z.object({
  slug: z.string(),
  breadcrumbLabel: z.string(),
  /** Shown at the top so a reader knows immediately whether this was client
   *  work or a self-initiated concept. */
  origin: z.string(),
  chapters: z.array(caseStudyChapterSchema),
  nextCase: z
    .object({ label: z.string(), title: z.string(), href: z.string() })
    .optional(),
  seo: seoMetadataSchema.optional(),
});

export const chapteredCaseStudyCollectionSchema = z.array(chapteredCaseStudySchema);

export type CaseStudyTone = z.infer<typeof toneSchema>;
export type CaseStudyScreen = z.infer<typeof screenSchema>;
export type CaseStudyChapter = z.infer<typeof caseStudyChapterSchema>;
export type IntroChapter = z.infer<typeof introChapterSchema>;
export type FlowChapter = z.infer<typeof flowChapterSchema>;
export type BreakdownChapter = z.infer<typeof breakdownChapterSchema>;
export type DecisionsChapter = z.infer<typeof decisionsChapterSchema>;
export type StatementChapter = z.infer<typeof statementChapterSchema>;
export type ConstraintsChapter = z.infer<typeof constraintsChapterSchema>;
export type AssumptionsChapter = z.infer<typeof assumptionsChapterSchema>;
export type ThresholdChapter = z.infer<typeof thresholdChapterSchema>;
export type ComparisonChapter = z.infer<typeof comparisonChapterSchema>;
export type OutcomeChapter = z.infer<typeof outcomeChapterSchema>;
export type ChapteredCaseStudy = z.infer<typeof chapteredCaseStudySchema>;
