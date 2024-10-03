import axios from 'axios'
import api from 'config/api'
import { useAuthStore } from 'store/auth/auth.store'
import {
  Login,
  LoginResponse,
  RefreshResponse,
  ValidateTokenResponse,
} from 'store/auth/auth.type'

export const login = async ({
  username,
  password,
}: Login): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>('/api/auth/token', {
    username,
    password,
  })
  return res.data
}

export const refresh = async (): Promise<RefreshResponse> => {
  const refresh_token = useAuthStore.getState().refresh_token
  const res = await axios.post<RefreshResponse>(
    `${import.meta.env.VITE_API_URL}/api/auth/token/refresh`,
    {
      refresh: refresh_token,
    }
  )
  return res.data
}

export const validateToken = async (token: string): Promise<string> => {
  const res = await axios.get<ValidateTokenResponse>(
    `${import.meta.env.VITE_API_URL}/api/auth/token/test`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return res.data.status
}
