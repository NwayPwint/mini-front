import {createPageHook} from './createPageHook'
import {getCoursesPage} from '../services/sanityService'
import type {CoursesPageData} from '../types/sanity'

export const useCoursesPage = createPageHook<CoursesPageData>(() => getCoursesPage())
