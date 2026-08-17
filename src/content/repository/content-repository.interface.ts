import { HomepageContent } from '../schemas/homepage.schema';
import { ServicesPageContent } from '../schemas/services-page.schema';
import { CaseStudiesPageContent } from '../schemas/case-studies-page.schema';
import { BlogPageContent } from '../schemas/blog-page.schema';
import { AboutPageContent } from '../schemas/about-page.schema';
import { ContactPageContent } from '../schemas/contact-page.schema';
import { NotFoundPageContent } from '../schemas/not-found-page.schema';
import { ServiceDetailPage } from '../schemas/service-detail.schema';
import { LegalPage } from '../schemas/legal-page.schema';
import { CareersPageContent, JobRole } from '../schemas/careers-page.schema';
import { CaseStudyDetail } from '../schemas/case-study-detail.schema';
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
  getServicesPageData(): Promise<ServicesPageContent>;
  getCaseStudiesPageData(): Promise<CaseStudiesPageContent>;
  getBlogPageData(): Promise<BlogPageContent>;
  getAboutPageData(): Promise<AboutPageContent>;
  getContactPageData(): Promise<ContactPageContent>;
  getNotFoundPageData(): Promise<NotFoundPageContent>;
  getServiceDetailPages(): Promise<ServiceDetailPage[]>;
  getServiceDetailBySlug(slug: string): Promise<ServiceDetailPage | null>;
  getLegalPageBySlug(slug: string): Promise<LegalPage | null>;
  getCareersPageData(): Promise<CareersPageContent>;
  getJobRoles(): Promise<JobRole[]>;
  getJobRoleBySlug(slug: string): Promise<JobRole | null>;
  getCaseStudyDetails(): Promise<CaseStudyDetail[]>;
  getCaseStudyDetailBySlug(slug: string): Promise<CaseStudyDetail | null>;
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
