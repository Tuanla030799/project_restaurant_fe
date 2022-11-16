import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

export const useManagerAuthorization = (params) => {
  return useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/manager/group_roles?` + params,
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false }
  )
}
