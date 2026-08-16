import { IContentRepository } from './content-repository.interface';
import { homepageContentSchema, HomepageContent } from '../schemas/homepage.schema';
import { serviceSchema, ServiceItem } from '../schemas/service.schema';
import { caseStudySchema, CaseStudyItem } from '../schemas/case-study.schema';
import { blogPostSchema, BlogPostItem } from '../schemas/blog.schema';
import { impactStatSchema, ImpactStatItem } from '../schemas/impact-stat.schema';
import { testimonialSchema, TestimonialData } from '../schemas/testimonial.schema';

import homepageData from '../data/homepage.json';
import servicesData from '../data/services.json';
import caseStudiesData from '../data/case-studies.json';
import blogPostsData from '../data/blog-posts.json';
import impactStatsData from '../data/impact-stats.json';
import testimonialsData from '../data/testimonials.json';

/**
 * Local Static Content Provider
 *
 * Implements IContentRepository using local static JSON instances validated against Zod schemas.
 */
export class LocalContentProvider implements IContentRepository {
  async getHomepageData(): Promise<HomepageContent> {
    return homepageContentSchema.parse(homepageData);
  }

  async getServices(): Promise<ServiceItem[]> {
    return servicesData.map((item) => serviceSchema.parse(item));
  }

  async getServiceBySlug(slug: string): Promise<ServiceItem | null> {
    const services = await this.getServices();
    return services.find((s) => s.slug === slug) || null;
  }

  async getCaseStudies(): Promise<CaseStudyItem[]> {
    return caseStudiesData.map((item) => caseStudySchema.parse(item));
  }

  async getFeaturedCaseStudies(): Promise<CaseStudyItem[]> {
    const caseStudies = await this.getCaseStudies();
    return caseStudies.filter((cs) => cs.featured).sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getCaseStudyBySlug(slug: string): Promise<CaseStudyItem | null> {
    const caseStudies = await this.getCaseStudies();
    return caseStudies.find((cs) => cs.slug === slug) || null;
  }

  async getBlogPosts(): Promise<BlogPostItem[]> {
    return blogPostsData.map((item) => blogPostSchema.parse(item));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPostItem | null> {
    const posts = await this.getBlogPosts();
    return posts.find((p) => p.slug === slug) || null;
  }

  async getImpactStats(): Promise<ImpactStatItem[]> {
    return impactStatsData.map((item) => impactStatSchema.parse(item));
  }

  async getTestimonials(): Promise<TestimonialData[]> {
    return testimonialsData.map((item) => testimonialSchema.parse(item));
  }
}

export const contentRepository: IContentRepository = new LocalContentProvider();
