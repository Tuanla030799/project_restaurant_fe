import { axios } from '@/lib/axios'
import { Food } from '@/models'
import useSWR from 'swr'

type response = {
  data: Food[],
  meta?: any
}

export const useFoods = (params?) => {
  return useSWR<response, any>(
    `${process.env.NEXT_PUBLIC_API_URL}/foods?` + params,
    axios,
    { revalidateOnFocus: false }
  )
}

export const useFoodAll = () => {
  return useSWR<response, any>(
    `${process.env.NEXT_PUBLIC_API_URL}/foods?`,
    axios,
    { revalidateOnFocus: false }
  )
}
