import useSWR from 'swr'
import { PaginationType } from '@/global/types'
import { axios } from '@/lib/axios'
import { Food } from '@/models'

type response = {
  data: Food[]
  meta?: {
    pagination: PaginationType
  }
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

export const useFoodBySlug = (slug: string) => {
  return useSWR<{ data: Food }, any>(
    `${process.env.NEXT_PUBLIC_API_URL}/foods/${slug}/foodDetails`,
    axios,
    { revalidateOnFocus: false }
  )
}
