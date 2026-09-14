import {createPageHook} from './createPageHook'
import {getHomePage} from '../services/sanityService'
import type {HomePageData} from '../types/sanity'

export const useHomePage = createPageHook<HomePageData>(() => getHomePage())
