import axios from 'axios'

export const request = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: '/api',
  timeout: 120 * 1000,
  "Content-Type": 'application/json',
})

request.interceptors.request.use(config => {
  return config
}, err => {
  Promise.reject(err)
})

request.interceptors.response.use(res => {
  return Promise.resolve(res.data)
}, err => {
  Promise.reject(err)
})

export default request

