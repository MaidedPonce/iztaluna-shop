import api from 'config/api'
import { StatusResult } from 'store/user/user.type'

export const getMe = async (): Promise<StatusResult> => {
  const res = await api.get<StatusResult>(
    `${import.meta.env.VITE_API_URL}/api/v1/users/me`
  )
  return res.data
}
