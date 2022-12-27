import { axios } from '@/lib/axios'
import { LoginPayload, RegisterPayload } from '@/models'
import Cookies from 'js-cookie'

const login = async (payload: LoginPayload) => {
  const response = await axios.post('auth/login', payload)
  const token = response?.data?.token
  if (token) {
    Cookies.set('jwt_token', token)
  }
  return response
}

const signUp = async (payload: RegisterPayload) => {
  const response = await axios.post('auth/register', payload)
  const token = response?.data?.token
  if (token) {
    Cookies.set('jwt_token', token)
  }
  return response
}

const logout = () => {
  Cookies.set('jwt_token', '')
}

export { login, logout, signUp }
