import {sanityClient} from '../config/sanity'
import type {
  HomePageData,
  StudentsPageData,
  BusinessPageData,
  CollegesPageData,
  CoursesPageData,
  ProgramsPageData,
  CertificatesPageData,
  DigitalLibraryPageData,
} from '../types/sanity'

export async function getHomePage(): Promise<HomePageData> {
  return sanityClient.fetch(`
    *[_type == "homePage"][0]{
      hero,
      courseCategories,
      services,
      aboutAccreditations,
      partners,
      featuredCourses,
      awards,
      whyChooseUs,
      cta
    }
  `)
}

export async function getStudentsPage(): Promise<StudentsPageData> {
  return sanityClient.fetch(`
    *[_type == "studentsPage"][0]{
      hero,
      programs,
      enrollmentSteps,
      testimonials,
      faqs,
      cta
    }
  `)
}

export async function getBusinessPage(): Promise<BusinessPageData> {
  return sanityClient.fetch(`
    *[_type == "businessPage"][0]{
      hero,
      trainingSolutions,
      whyPartner,
      enterpriseFeatures,
      partners,
      cta
    }
  `)
}

export async function getCollegesPage(): Promise<CollegesPageData> {
  return sanityClient.fetch(`
    *[_type == "collegesPage"][0]{
      hero,
      academicPrograms,
      partnershipBenefits,
      howItWorks,
      partners,
      cta
    }
  `)
}

export async function getCoursesPage(): Promise<CoursesPageData> {
  return sanityClient.fetch(`
    *[_type == "coursesPage"][0]{
      hero,
      categories,
      courses,
      cta
    }
  `)
}

export async function getProgramsPage(): Promise<ProgramsPageData> {
  return sanityClient.fetch(`
    *[_type == "programsPage"][0]{
      hero,
      programTracks,
      programHighlights,
      cta
    }
  `)
}

export async function getCertificatesPage(): Promise<CertificatesPageData> {
  return sanityClient.fetch(`
    *[_type == "certificatesPage"][0]{
      hero,
      certificateTypes,
      certificateFeatures,
      sampleCertificates,
      cta
    }
  `)
}

export async function getDigitalLibraryPage(): Promise<DigitalLibraryPageData> {
  return sanityClient.fetch(`
    *[_type == "digitalLibraryPage"][0]{
      hero,
      resourceCategories,
      featuredResources,
      cta
    }
  `)
}
