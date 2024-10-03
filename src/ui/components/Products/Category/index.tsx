import Accordion from 'ui/components/Accordion'
import { ProductResult } from 'store/products/product.types'
import { lazy, Suspense } from 'react'
const Product = lazy(() => import('../Product'))

type ProductType = {
  products: ProductResult[]
  category: string
}

const Category = ({ products, category }: ProductType) => {
  return (
    <Accordion
      title={
        <div className='flex items-center justify-between'>
          <h1>{category}</h1>&nbsp;
          <span>({products.length})</span>
        </div>
      }
    >
      <div className='flex flex-col gap-2'>
        {products.map((item) => (
          <Suspense
            key={item.uuid}
            fallback={
              <div className='w-full h-20 max-w-6xl rounded-2xl bg-brand-gray animate-pulse' />
            }
          >
            <Product {...item} />
          </Suspense>
        ))}
      </div>
    </Accordion>
  )
}

export default Category
