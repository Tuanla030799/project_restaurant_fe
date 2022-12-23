import { axios } from '@/lib/axios'

const updateSeatStatus = (id: number, status: boolean) => {
  return axios.patch(`/admin/seats/${id}`, { isReady: status })
}

export { updateSeatStatus }
