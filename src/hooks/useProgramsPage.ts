import {createPageHook} from './createPageHook'
import {getProgramsPage} from '../services/sanityService'
import type {ProgramsPageData} from '../types/sanity'

export const useProgramsPage = createPageHook<ProgramsPageData>(() => getProgramsPage())
