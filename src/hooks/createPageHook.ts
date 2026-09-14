import {useCallback} from 'react'
import {useSanityPage} from './useSanityPage'

export function createPageHook<T>(fetcher: () => Promise<T>) {
  return function usePageHook() {
    const cb = useCallback(() => fetcher(), [])
    return useSanityPage<T>(cb)
  }
}
