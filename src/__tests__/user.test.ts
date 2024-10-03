import api from 'config/api'
import { getMe } from 'services/user/user.services'
import { StatusResult } from 'store/user/user.type'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('User Functions', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getMe', () => {
    it('should call the API and return user status', async () => {
      const mockResponse: StatusResult = {
        status: 'success',
        result: {
          uuid: 'userId123',
          email: 'john.doe@example.com',
          username: 'JohnDoe',
          stores: [
            {
              uuid: 'storeId123',
              name: 'My Store',
              availabilityState: 'open',
              providers: [],
              config: {
                brandColor: '#ff0000',
              },
              secret: 'secretValue',
              legacyId: null,
              organizationUuid: 'orgId123',
            },
          ],
        },
      }

      vi.spyOn(api, 'get').mockResolvedValueOnce({ data: mockResponse })

      const result = await getMe()

      expect(api.get).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/api/v1/users/me`
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle API errors gracefully', async () => {
      vi.spyOn(api, 'get').mockRejectedValueOnce(new Error('Network Error'))

      await expect(getMe()).rejects.toThrow('Network Error')
    })
  })
})
