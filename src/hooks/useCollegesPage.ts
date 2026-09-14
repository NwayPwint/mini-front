import {createPageHook} from './createPageHook'
import {getCollegesPage} from '../services/sanityService'
import type {CollegesPageData} from '../types/sanity'

export const useCollegesPage = createPageHook<CollegesPageData>(() => getCollegesPage())
