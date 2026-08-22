import { IContentRepository } from './content-repository.interface';
import { homepageContentSchema, HomepageContent } from '../schemas/homepage.schema';
import { servicesPageContentSchema, ServicesPageContent } from '../schemas/services-page.schema';
import { caseStudiesPageContentSchema, CaseStudiesPageContent } from '../schemas/case-studies-page.schema';
import { blogPageContentSchema, BlogPageContent } from '../schemas/blog-page.schema';
import { aboutPageContentSchema, AboutPageContent } from '../schemas/about-page.schema';
import { contactPageContentSchema, ContactPageContent } from '../schemas/contact-page.schema';
import { notFoundPageContentSchema, NotFoundPageContent } from '../schemas/not-found-page.schema';
import { serviceDetailCollectionSchema, ServiceDetailPage } from '../schemas/service-detail.schema';
import { legalPageCollectionSchema, LegalPage } from '../schemas/legal-page.schema';
import { careersPageContentSchema, jobRoleCollectionSchema, CareersPageContent, JobRole } from '../schemas/careers-page.schema';
import {
  chapteredCaseStudyCollectionSchema,
  ChapteredCaseStudy,
} from '../schemas/case-study-chapter.schema';
import { serviceSchema, ServiceItem } from '../schemas/service.schema';
import { caseStudySchema, CaseStudyItem } from '../schemas/case-study.schema';
import { blogPostSchema, BlogPostItem } from '../schemas/blog.schema';
import { testimonialSchema, TestimonialData } from '../schemas/testimonial.schema';

import homepageData from '../data/homepage.json';
import servicesPageData from '../data/services-page.json';
import caseStudiesPageData from '../data/case-studies-page.json';
import blogPageData from '../data/blog-page.json';
import aboutPageData from '../data/about-page.json';
import contactPageData from '../data/contact-page.json';
import notFoundPageData from '../data/not-found-page.json';
import serviceDetailData from '../data/service-details.json';
import legalPageData from '../data/legal-pages.json';
import careersPageData from '../data/careers-page.json';
import jobRoleData from '../data/job-roles.json';
import caseStudyChapterData from '../data/case-study-chapters.json';
import servicesData from '../data/services.json';
import caseStudiesData from '../data/case-studies.json';
import blogPostsData from '../data/blog-posts.json';
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

  async getServicesPageData(): Promise<ServicesPageContent> {
    return servicesPageContentSchema.parse(servicesPageData);
  }

  async getCaseStudiesPageData(): Promise<CaseStudiesPageContent> {
    return caseStudiesPageContentSchema.parse(caseStudiesPageData);
  }

  async getBlogPageData(): Promise<BlogPageContent> {
    return blogPageContentSchema.parse(blogPageData);
  }

  async getAboutPageData(): Promise<AboutPageContent> {
    return aboutPageContentSchema.parse(aboutPageData);
  }

  async getContactPageData(): Promise<ContactPageContent> {
    return contactPageContentSchema.parse(contactPageData);
  }

  async getNotFoundPageData(): Promise<NotFoundPageContent> {
    return notFoundPageContentSchema.parse(notFoundPageData);
  }

  async getServiceDetailPages(): Promise<ServiceDetailPage[]> {
    return serviceDetailCollectionSchema.parse(serviceDetailData);
  }

  async getServiceDetailBySlug(slug: string): Promise<ServiceDetailPage | null> {
    const pages = await this.getServiceDetailPages();
    return pages.find((p) => p.slug === slug) ?? null;
  }

  async getLegalPageBySlug(slug: string): Promise<LegalPage | null> {
    const pages = legalPageCollectionSchema.parse(legalPageData);
    return pages.find((p) => p.slug === slug) ?? null;
  }

  async getCareersPageData(): Promise<CareersPageContent> {
    return careersPageContentSchema.parse(careersPageData);
  }

  async getJobRoles(): Promise<JobRole[]> {
    return jobRoleCollectionSchema
      .parse(jobRoleData)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getJobRoleBySlug(slug: string): Promise<JobRole | null> {
    const roles = await this.getJobRoles();
    return roles.find((r) => r.slug === slug) ?? null;
  }

  async getCaseStudyDetails(): Promise<ChapteredCaseStudy[]> {
    return chapteredCaseStudyCollectionSchema.parse(caseStudyChapterData);
  }

  async getCaseStudyDetailBySlug(slug: string): Promise<ChapteredCaseStudy | null> {
    const pages = await this.getCaseStudyDetails();
    return pages.find((p) => p.slug === slug) ?? null;
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

  async getTestimonials(): Promise<TestimonialData[]> {
    return testimonialsData.map((item) => testimonialSchema.parse(item));
  }
}

export const contentRepository: IContentRepository = new LocalContentProvider();
