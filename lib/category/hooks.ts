import useSWR from 'swr'
import { axios } from '@/lib/axios'
import { Category } from '@/models'

type response = {
  data: Category[]
}

export const useCategories = () => {
  return useSWR<response, any>(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    axios
  )
}
