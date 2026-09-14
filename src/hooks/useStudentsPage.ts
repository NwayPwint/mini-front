import {createPageHook} from './createPageHook'
import {getStudentsPage} from '../services/sanityService'
import type {StudentsPageData} from '../types/sanity'

export const useStudentsPage = createPageHook<StudentsPageData>(() => getStudentsPage())
