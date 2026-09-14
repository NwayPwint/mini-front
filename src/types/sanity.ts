export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface HeroSection {
  eyebrow?: string
  title?: string
  subtitle?: string
  statBlocks?: {value: string; label: string}[]
  checkPoints?: string[]
  primaryButton?: {text: string; link: string}
  secondaryButton?: {text: string; link: string}
}

export interface FeatureItem {
  icon?: string
  title?: string
  description?: string
}

export interface PartnerItem {
  name?: string
  abbr?: string
  logo?: SanityImage
}

export interface CtaSection {
  title?: string
  subtitle?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

export interface Testimonial {
  name?: string
  program?: string
  quote?: string
}

export interface FaqItem {
  question?: string
  answer?: string
}

export interface StepItem {
  num?: string
  icon?: string
  title?: string
  description?: string
}

export interface ProgramTrack {
  icon?: string
  title?: string
  description?: string
  duration?: string
  outcome?: string
}

export interface HomeFeaturedCourse {
  title?: string
  instructor?: string
  thumbnail?: SanityImage
  level?: string
  price?: string
}

export interface AboutStat {
  label?: string
  value?: string
}

export interface AboutAccreditations {
  description?: string
  stats?: AboutStat[]
}

export interface CourseCategoryItem {
  icon?: string
  label?: string
  count?: number
}

export interface CourseListItem {
  title?: string
  category?: string
  level?: string
  duration?: string
  students?: number
  rating?: number
}

export interface ResourceCategoryItem {
  icon?: string
  title?: string
  description?: string
  count?: number
}

export interface FeaturedResourceItem {
  type?: string
  title?: string
  author?: string
  format?: string
  pages?: string
}

export interface SampleCertificate {
  title?: string
  issuer?: string
  skills?: string[]
}

// Page data types
export interface HomePageData {
  hero?: HeroSection
  courseCategories?: FeatureItem[]
  services?: FeatureItem[]
  aboutAccreditations?: AboutAccreditations
  partners?: PartnerItem[]
  featuredCourses?: HomeFeaturedCourse[]
  awards?: FeatureItem[]
  whyChooseUs?: FeatureItem[]
  cta?: CtaSection
}

export interface StudentsPageData {
  hero?: HeroSection
  programs?: FeatureItem[]
  enrollmentSteps?: StepItem[]
  testimonials?: Testimonial[]
  faqs?: FaqItem[]
  cta?: CtaSection
}

export interface BusinessPageData {
  hero?: HeroSection
  trainingSolutions?: FeatureItem[]
  whyPartner?: FeatureItem[]
  enterpriseFeatures?: FeatureItem[]
  partners?: PartnerItem[]
  cta?: CtaSection
}

export interface CollegesPageData {
  hero?: HeroSection
  academicPrograms?: FeatureItem[]
  partnershipBenefits?: FeatureItem[]
  howItWorks?: StepItem[]
  partners?: PartnerItem[]
  cta?: CtaSection
}

export interface CoursesPageData {
  hero?: HeroSection
  categories?: CourseCategoryItem[]
  courses?: CourseListItem[]
  cta?: CtaSection
}

export interface ProgramsPageData {
  hero?: HeroSection
  programTracks?: ProgramTrack[]
  programHighlights?: FeatureItem[]
  cta?: CtaSection
}

export interface CertificatesPageData {
  hero?: HeroSection
  certificateTypes?: FeatureItem[]
  certificateFeatures?: FeatureItem[]
  sampleCertificates?: SampleCertificate[]
  cta?: CtaSection
}

export interface DigitalLibraryPageData {
  hero?: HeroSection
  resourceCategories?: ResourceCategoryItem[]
  featuredResources?: FeaturedResourceItem[]
  cta?: CtaSection
}
