import { TPagination } from '@/global/types'
import { axios } from '@/lib/axios'
import { Order } from '@/models'
import useSWR from 'swr'

type response = {
  items: Order[]
  meta?: TPagination
}

export const useOrders = (params) => {
  return useSWR<response, any>(
    `${process.env.NEXT_PUBLIC_API_URL}/orders?` + params,
    axios
  )
}

export const useOrderDetailById = (id: number) => {
  return useSWR<Order, any>(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
    axios
  )
}

export const useUserOrders = (params) => {
  return useSWR<response, any>(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/orders?` + params,
    axios
  )
}
