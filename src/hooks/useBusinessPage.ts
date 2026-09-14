import {createPageHook} from './createPageHook'
import {getBusinessPage} from '../services/sanityService'
import type {BusinessPageData} from '../types/sanity'

export const useBusinessPage = createPageHook<BusinessPageData>(() => getBusinessPage())
