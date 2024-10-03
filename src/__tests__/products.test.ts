import api from 'config/api'
import { getProducts, updateProduct } from 'services/products/products.services'
import { Products } from 'store/products/product.types'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('Product Functions', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getProducts', () => {
    it('should call the API and return products', async () => {
      const storeId = 'store123'
      const mockResponse: Products = {
        status: 'success',
        results: [
          {
            uuid: '1',
            name: 'Product 1',
            description: 'Description of Product 1',
            imageUrl: 'http://example.com/image1.jpg',
            legacyId: 'legacy1',
            price: '10.00',
            alcoholCount: 0,
            soldAlone: true,
            availability: 'in_stock',
            providerAvailability: null,
            category: {
              uuid: 'cat1',
              name: 'Category 1',
              sortPosition: 1,
            },
            barcode: '1234567890123',
          },
          {
            uuid: '2',
            name: 'Product 2',
            description: 'Description of Product 2',
            imageUrl: 'http://example.com/image2.jpg',
            legacyId: 'legacy2',
            price: '15.00',
            alcoholCount: 1,
            soldAlone: false,
            availability: 'out_of_stock',
            providerAvailability: null,
            category: {
              uuid: 'cat2',
              name: 'Category 2',
              sortPosition: 2,
            },
            barcode: '9876543210987',
          },
        ],
      }

      vi.spyOn(api, 'get').mockResolvedValueOnce({ data: mockResponse })

      const result = await getProducts(storeId)

      expect(api.get).toHaveBeenCalledWith(
        `/api/_test/products/?store=${storeId}`
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle API errors gracefully', async () => {
      const storeId = 'store123'

      vi.spyOn(api, 'get').mockRejectedValueOnce(new Error('Network Error'))

      await expect(getProducts(storeId)).rejects.toThrow('Network Error')
    })
  })

  describe('updateProduct', () => {
    it('should call the API to update product availability', async () => {
      const mockProductId = 'product123'
      const mockAvailability = 'in_stock'
      const mockResponse = {
        success: true,
      }

      vi.spyOn(api, 'put').mockResolvedValueOnce({ data: mockResponse })

      const result = await updateProduct({
        product_id: mockProductId,
        availability: mockAvailability,
      })

      expect(api.put).toHaveBeenCalledWith(
        `/api/_test/products/${mockProductId}/availability/`,
        {
          availability: mockAvailability,
        }
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle API errors gracefully', async () => {
      const mockProductId = 'product123'
      const mockAvailability = 'in_stock'

      vi.spyOn(api, 'put').mockRejectedValueOnce(new Error('Network Error'))

      await expect(
        updateProduct({
          product_id: mockProductId,
          availability: mockAvailability,
        })
      ).rejects.toThrow('Network Error')
    })
  })
})
