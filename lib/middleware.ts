import { slowLoading } from '@/utils'

export const loading = (useSWRNext) => {
  return (key, fetcher, config) => {
    const MINIMUM_TIME = 300

    const extendedFetcher = async (...args) => {
      const loadingPromise = slowLoading(MINIMUM_TIME)
      const responsePromise = fetcher(...args)
      const allPromises = [loadingPromise, responsePromise]

      await Promise.allSettled(allPromises)

      return fetcher(...args)
    }

    return useSWRNext(key, extendedFetcher, config)
  }
}
