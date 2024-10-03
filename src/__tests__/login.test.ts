import axios from 'axios'
import api from 'config/api'
import { VARIABLES } from 'config/variables'
import { afterEach, describe } from 'node:test'
import { login, refresh, validateToken } from 'services/auth/auth.services'
import { useAuthStore } from 'store/auth/auth.store'
import { LoginResponse } from 'store/auth/auth.type'
import { expect, it, vi } from 'vitest'
describe('Auth Functions', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('login', () => {
    it('should call the API and return user token', async () => {
      const username = VARIABLES.username
      const password = VARIABLES.password

      const mockResponse: LoginResponse = {
        access: 'fakeToken123',
        refresh: 'userId123',
      }

      vi.spyOn(api, 'post').mockResolvedValueOnce({ data: mockResponse })

      const result = await login({ username, password })

      expect(api.post).toHaveBeenCalledWith('/api/auth/token', {
        username,
        password,
      })
      expect(result).toEqual(mockResponse)
    })
  })

  describe('refresh', () => {
    it('should call the API and return refreshed token', async () => {
      const mockRefreshToken = 'mockRefreshToken'
      const mockResponse = {
        access: 'newAccessToken',
        refresh: 'newRefreshToken',
      }

      const mockStoreState = {
        token: 'mockAccessToken',
        refresh_token: mockRefreshToken,
        exp: 0,
        logout: vi.fn(),
        setToken: vi.fn(),
        setExpiresAt: vi.fn(),
      }

      vi.spyOn(useAuthStore, 'getState').mockReturnValue(mockStoreState)

      vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: mockResponse })

      const result = await refresh()

      expect(axios.post).toHaveBeenCalledWith(
        `${VARIABLES.apiUrl}/api/auth/token/refresh`,
        {
          refresh: mockRefreshToken,
        }
      )

      expect(result).toEqual(mockResponse)
    })

    it('should handle API errors gracefully', async () => {
      const mockRefreshToken = 'mockRefreshToken'

      const mockStoreState = {
        token: 'mockAccessToken',
        refresh_token: mockRefreshToken,
        exp: 0,
        logout: vi.fn(),
        setToken: vi.fn(),
        setExpiresAt: vi.fn(),
      }

      vi.spyOn(useAuthStore, 'getState').mockReturnValue(mockStoreState)

      vi.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Network Error'))

      await expect(refresh()).rejects.toThrow('Network Error')
    })
  })

  describe('validateToken', () => {
    it('should call the API and return the token validation status', async () => {
      const token = 'mockAccessToken'
      const mockResponse = {
        status: 'valid',
      }

      vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockResponse })

      const result = await validateToken(token)

      expect(axios.get).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/api/auth/token/test`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      expect(result).toEqual(mockResponse.status)
    })

    it('should handle API errors gracefully', async () => {
      const token = 'mockAccessToken'

      vi.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Network Error'))

      await expect(validateToken(token)).rejects.toThrow('Network Error')
    })
  })
})
