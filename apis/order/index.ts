import { axios } from '@/lib/axios'
import { OrderPayload } from '@/models'

const bookingTable = (data: OrderPayload) => {
  return axios.post('/orders', data)
}

const updateOrder = (id: number, data: OrderPayload) => {
  return axios.patch(`/orders/${id}`, data)
}

const updateOrderStatus = (id: number, status: number) => {
  return axios.patch(`/orders/${id}`, { status })
}

export { bookingTable, updateOrderStatus, updateOrder }
