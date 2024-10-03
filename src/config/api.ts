import axios from 'axios'
import { refresh, validateToken } from 'services/auth/auth.services'
import { useAuthStore } from 'store/auth/auth.store'
import { VARIABLES } from './variables'

const apiURL = VARIABLES.apiUrl || 'http://localhost:3000/'

const api = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token

    if (token) {
      const isValid = await validateToken(token)
      if (isValid === 'ok') {
        config.headers.Authorization = `Bearer ${token}`
      } else {
        try {
          const newAccessToken = await refresh()
          config.headers.Authorization = `Bearer ${newAccessToken.access}`
        } catch (error) {
          console.error(error)
          useAuthStore.getState().logout()
          window.location.href = '/login'
        }
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la respuesta', error)
    return Promise.reject(error)
  }
)

export default api
