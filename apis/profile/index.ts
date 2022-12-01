import { axios } from '@/lib/axios'

const getProfile = () => {
  return axios.get('/profile')
}

export { getProfile }
