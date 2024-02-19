import useSWR from 'swr'
import { axios } from '@/lib/axios'
import { Profile } from '@/models'
// import { fetcher } from '../fetcher'

export const useHeaderData = () => {
  const { data, error, mutate } = useSWR<{ data: Profile }, any>(
    `${process.env.NEXT_PUBLIC_API_URL}/profile`,
    axios
  )

  const profile = data?.data

  return { profile, error, mutate }
}
