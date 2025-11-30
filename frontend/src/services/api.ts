import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  config.headers['X-Client-Timestamp'] = Date.now().toString()
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', error)
    return Promise.reject(error)
  }
)

export default api
