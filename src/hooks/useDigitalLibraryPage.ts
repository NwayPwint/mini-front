import {createPageHook} from './createPageHook'
import {getDigitalLibraryPage} from '../services/sanityService'
import type {DigitalLibraryPageData} from '../types/sanity'

export const useDigitalLibraryPage = createPageHook<DigitalLibraryPageData>(() => getDigitalLibraryPage())
