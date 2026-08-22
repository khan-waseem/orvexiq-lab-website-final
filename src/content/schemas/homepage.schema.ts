import { z } from 'zod';
import { seoMetadataSchema, verificationMetadataSchema } from './common.schema';

export const sectorSchema = z.object({
  id: z.string(),
  name: z.string(),
  displayOrder: z.number(),
});

export const approachStepSchema = z.object({
  id: z.string(),
  stepNumber: z.string(),
  title: z.string(),
  description: z.string(),
  /** Chooses the step's line glyph; see ApproachSection/StepIcons. */
  icon: z.enum(['discover', 'define', 'build', 'evolve']),
});

export const systemStageSchema = z.object({
  stageNumber: z.string(),
  stageName: z.string(),
  caption: z.string(),
  verification: verificationMetadataSchema.optional(),
});

/* Landing "Design Systems" band — three pillar cards, each carrying a small
   live UI demo rendered in code (Figma landing, second section). */
export const designSystemPillarSchema = z.object({
  id: z.enum(['tokens', 'components', 'product']),
  title: z.string(),
  body: z.string(),
});

/* Landing "What we build" band — four discipline cards joined by a connector
   line, reading left to right as one system. */
export const disciplineSchema = z.object({
  id: z.enum(['strategy', 'product-design', 'technology', 'intelligence']),
  title: z.string(),
  body: z.string(),
  /* The service page this discipline opens. Stored rather than derived from the
     id: the two vocabularies do not line up word for word (Technology is served
     by the Design Systems page), so the pairing has to be stated. */
  href: z.string(),
});

export const landingFaqItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

export const homepageContentSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    subdescription: z.string(),
    primaryCtaText: z.string(),
    secondaryCtaText: z.string(),
    heroIconAssetUrl: z.string(),
  }),
  sectorsSection: z.object({
    eyebrow: z.string(),
    sectors: z.array(sectorSchema),
  }),
  systemSection: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    stages: z.array(systemStageSchema),
  }),
  designSystemsSection: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    headlineLine2: z.string(),
    /** Trailing words of line two, in the violet gradient. Every landing
        headline highlights exactly one run, so the accent reads as emphasis
        rather than as decoration. */
    headlineAccent2: z.string(),
    subdescription: z.string(),
    pillars: z.array(designSystemPillarSchema),
  }),
  selectedWorkSection: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    headlineLine2: z.string(),
    /** Trailing words of line two, rendered in the violet gradient. */
    headlineAccent2: z.string(),
    subdescription: z.string(),
    viewAllText: z.string(),
    cardCtaText: z.string(),
    comingSoonLabel: z.string(),
  }),
  whatWeBuildSection: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    headlineLine2: z.string(),
    headlineAccent2: z.string(),
    subdescription: z.string(),
    ctaText: z.string(),
    /* Label on each card's own link, distinct from ctaText below the row. */
    cardCtaText: z.string(),
    disciplines: z.array(disciplineSchema),
  }),
  servicesSection: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    headlineLine2: z.string(),
  }),
  approachSection: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    /** Trailing words of the headline, in the violet gradient. */
    headlineAccent: z.string(),
    subdescription: z.string(),
    steps: z.array(approachStepSchema),
  }),
  clientStoriesSection: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    headlineLine2: z.string(),
    headlineAccent2: z.string(),
    subdescription: z.string(),
  }),
  faqSection: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    /** Second headline line, rendered entirely in the violet gradient. */
    headlineAccent2: z.string(),
    subdescription: z.string(),
    items: z.array(landingFaqItemSchema),
  }),
  landingCtaSection: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    /** Second line, rendered entirely in the violet gradient. */
    headlineAccent2: z.string(),
    subdescription: z.string(),
    primaryCtaText: z.string(),
    emailCtaText: z.string(),
  }),
  ctaSection: z.object({
    eyebrow: z.string(),
    headlineLine1: z.string(),
    headlineLine2: z.string(),
    subdescriptionLine1: z.string(),
    subdescriptionLine2: z.string(),
    primaryCtaText: z.string(),
    emailCtaText: z.string(),
  }),
  seo: seoMetadataSchema,
});

export type HomepageContent = z.infer<typeof homepageContentSchema>;
