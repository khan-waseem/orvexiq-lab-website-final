import { HomepageContent } from '../schemas/homepage.schema';
import { ServiceItem } from '../schemas/service.schema';
import { CaseStudyItem } from '../schemas/case-study.schema';
import { BlogPostItem } from '../schemas/blog.schema';
import { ImpactStatItem } from '../schemas/impact-stat.schema';
import { TestimonialData } from '../schemas/testimonial.schema';

/**
 * Abstract Content Repository Interface
 *
 * This contract decouples all UI components from the underlying content storage engine.
 * Currently, LocalContentProvider implements this via local static JSON schemas.
 * When the Orvexiq Back Office / CMS is ready, a HeadlessCmsContentProvider will implement
 * this exact same interface without modifying a single frontend UI component.
 */
export interface IContentRepository {
  getHomepageData(): Promise<HomepageContent>;
  getServices(): Promise<ServiceItem[]>;
  getServiceBySlug(slug: string): Promise<ServiceItem | null>;
  getCaseStudies(): Promise<CaseStudyItem[]>;
  getFeaturedCaseStudies(): Promise<CaseStudyItem[]>;
  getCaseStudyBySlug(slug: string): Promise<CaseStudyItem | null>;
  getBlogPosts(): Promise<BlogPostItem[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPostItem | null>;
  getImpactStats(): Promise<ImpactStatItem[]>;
  getTestimonials(): Promise<TestimonialData[]>;
}
