import { axios } from '@/lib/axios';
import { Profile } from '@/models';
import useSWR from 'swr'
// import { fetcher } from '../fetcher'

export const useHeaderData = () => {
  const { data, error } = useSWR<any, any>(
    `${process.env.NEXT_PUBLIC_API_URL}/profile`,
    axios
  )

  const profile: Profile = data?.data

  return { profile, error }
}
