import { axios } from '@/lib/axios'
import { OrderPayload } from '@/models'

const bookingTable = (data: OrderPayload) => {
  return axios.post('/orders', data)
}

export { bookingTable }
