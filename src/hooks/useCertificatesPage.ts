import {createPageHook} from './createPageHook'
import {getCertificatesPage} from '../services/sanityService'
import type {CertificatesPageData} from '../types/sanity'

export const useCertificatesPage = createPageHook<CertificatesPageData>(() => getCertificatesPage())
