import Axios, { AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

function authRequestInterceptor(config: AxiosRequestConfig) {
  config.headers = config.headers ?? {}
  const token = Cookies.get('jwt_token')
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  config.headers.Accept = 'application/json'
  return config
}

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log("error", error)
    if(error.response.data.statusCode === 401 || error.response.data.message === 'Unauthorized') {
      // window.location.href = './login'
    }
    return error.response
  }
)
