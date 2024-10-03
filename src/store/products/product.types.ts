export interface Products {
  status: string
  results: ProductResult[]
}

export interface ProductResult {
  uuid: string
  name: string
  description: string
  imageUrl: string
  legacyId: string
  price: string
  alcoholCount: number
  soldAlone: boolean
  availability: string
  providerAvailability: null
  category: Category
  barcode: string
}

export interface Category {
  uuid: string
  name: string
  sortPosition: number
}

export type UpdateProductType = {
  product_id: string
  availability: string
}
