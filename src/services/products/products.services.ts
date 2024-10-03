import api from 'config/api'
import { Products, UpdateProductType } from 'store/products/product.types'

export const getProducts = async (storeId: string): Promise<Products> => {
  const res = await api.get<Products>(`/api/_test/products/?store=${storeId}`)
  return res.data
}

export const updateProduct = async ({
  product_id,
  availability,
}: UpdateProductType) => {
  const res = await api.put(`/api/_test/products/${product_id}/availability/`, {
    availability,
  })
  return res.data
}
