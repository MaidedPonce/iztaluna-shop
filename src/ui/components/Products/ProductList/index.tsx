import React, { lazy, Suspense, useState } from 'react'
import { ProductResult } from 'store/products/product.types'
import { useQuery } from 'react-query'
import { getProducts } from 'services/products/products.services'
import toast from 'react-hot-toast'
import { useUserStore } from 'store/user/user.store'
const Category = lazy(() => import('../Category'))

const ProductTable: React.FC = () => {
  const [newData, setData] = useState<Record<string, ProductResult[]>>({})
  const storeId = useUserStore((state) => state.result.stores[0]?.uuid)

  const { isLoading: loading } = useQuery(
    'products',
    () => getProducts(storeId),
    {
      enabled: !!storeId,
      onSuccess: (data) => {
        const organizedData = data?.results.reduce(
          (acc: Record<string, ProductResult[]>, product: ProductResult) => {
            const category = product.category.name
            if (!acc[category]) {
              acc[category] = []
            }
            acc[category].push(product)
            return acc
          },
          {} as Record<string, ProductResult[]>
        )
        setData(organizedData)
      },
      onError: () => {
        toast.error('Something bad has happenned! Try again later...')
      },
      refetchOnWindowFocus: false,
      // refetchInterval: 5000,
    }
  )

  if (loading) return <p className='animate-pulse'>Loading data...</p>
  if (Object.keys(newData).length === 0)
    return <p>There is not available data</p>

  return (
    <section className='flex flex-col w-full gap-8 p-6 rounded-2xl'>
      <>
        {Object.entries(newData).map(([category, products], index) => {
          return (
            <Suspense
              key={category + index}
              fallback={
                <div className='w-full h-20 max-w-6xl space-y-1.5 bg-brand-gray animate-pulse' />
              }
            >
              <Category
                products={products}
                category={category}
              />
            </Suspense>
          )
        })}
      </>
    </section>
  )
}

export default ProductTable
