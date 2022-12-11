import { axios } from '@/lib/axios'
import { Seat } from '@/models'
import useSWR from 'swr'

type response = {
  data: Seat[]
}

export const useSeats = () => {
  return useSWR<response, any>(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/seats`,
    axios
  )
}
