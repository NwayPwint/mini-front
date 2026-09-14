/* eslint-disable react-hooks/set-state-in-effect */
import {useState, useEffect, useRef, useCallback} from 'react'

interface UseSanityPageResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useSanityPage<T>(fetcher: () => Promise<T>): UseSanityPageResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mountedRef = useRef(true)
  const fetcherRef = useRef(fetcher)

  useEffect(() => {
    fetcherRef.current = fetcher
  })

  useEffect(() => {
    mountedRef.current = true
    setLoading(true)
    setError(null)
    fetcherRef.current()
      .then((result) => {
        if (mountedRef.current) setData(result)
      })
      .catch((e) => {
        if (mountedRef.current) setError(e?.message || 'Failed to load content')
      })
      .finally(() => {
        if (mountedRef.current) setLoading(false)
      })
    return () => {
      mountedRef.current = false
    }
  }, [])

  const refetch = useCallback(() => {
    setLoading(true)
    setError(null)
    fetcherRef.current()
      .then(setData)
      .catch((e) => setError(e?.message || 'Failed to load content'))
      .finally(() => setLoading(false))
  }, [])

  return {data, loading, error, refetch}
}
