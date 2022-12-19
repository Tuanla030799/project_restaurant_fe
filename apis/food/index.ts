import { axios } from '@/lib/axios'
import { FoodStatus } from '@/models'

const getFoodById = (id: number) => {
  return axios.get(`/foods/${id}`)
}

const updateFoodStatus = (id: number, status: FoodStatus) => {
  return axios.put(`/foods/${id}`, {
    status: status,
  })
}

export { getFoodById, updateFoodStatus }
