import useSWR from 'swr'
// import { fetcher } from '../fetcher'

export const useHeaderData = () => {
  //const { data, error } =
  // useSWR(
  //   `${process.env.NEXT_PUBLIC_API_URL}/courses`, //TODO: Waiting api service on header to change endpoint
  //   fetcher
  // )

  // return { profile: data?.current_user, error }

  return {
    profile: {
      is_manager: false,
      avatar: null,
      email: 'tuan221762@nuce.edu.vn',
      name: 'tuna',
    },
    error: {},
  }
}
