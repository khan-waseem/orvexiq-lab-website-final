import { z } from 'zod';
import { seoMetadataSchema } from './common.schema';

export const careersHeroSchema = z.object({
  headlineLine1: z.string(),
  headlineLine2: z.string(),
  subdescription: z.string(),
  heroIconAssetUrl: z.string(),
});

export const perkSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
});

/** A job listing. The Careers list and the Job Detail page read the same record. */
export const jobRoleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  department: z.string(),
  summary: z.string(),
  location: z.string(),
  employmentType: z.string(),
  postedOn: z.string(),
  salaryNote: z.string(),
  reportsTo: z.string(),
  open: z.boolean().default(true),
  displayOrder: z.number().default(0),
  detail: z.object({
    aboutHeading: z.string(),
    aboutParagraphs: z.array(z.string()),
    groups: z.array(
      z.object({
        id: z.string(),
        heading: z.string(),
        intro: z.string().optional(),
        items: z.array(z.string()),
      })
    ),
    applyHeading: z.string(),
    applyBody: z.string(),
    applyCtaLabel: z.string(),
    shareLabel: z.string(),
  }),
});

export const careersPageContentSchema = z.object({
  hero: careersHeroSchema,
  whyUs: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    perks: z.array(perkSchema),
  }),
  openRoles: z.object({
    eyebrow: z.string(),
    /** "{count}" is replaced with the live number of open roles so the headline
     *  cannot drift from the list beneath it. */
    headlineTemplate: z.string(),
    emptyHeadline: z.string(),
    footnote: z.string(),
    footnoteEmail: z.string(),
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
  seo: seoMetadataSchema.optional(),
});

export const jobRoleCollectionSchema = z.array(jobRoleSchema);

export type CareersHeroContent = z.infer<typeof careersHeroSchema>;
export type Perk = z.infer<typeof perkSchema>;
export type JobRole = z.infer<typeof jobRoleSchema>;
export type CareersPageContent = z.infer<typeof careersPageContentSchema>;
