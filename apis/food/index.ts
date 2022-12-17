import { axios } from '@/lib/axios';

const getFoodById = (id: number) => {
  return axios.get(`/foods/${id}`)
}

export { getFoodById }