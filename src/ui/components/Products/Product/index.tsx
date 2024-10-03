import { ProductResult } from 'store/products/product.types'
import ProductSwitch from 'ui/components/Switch/ProductSwitch'
import { AVAILABLE } from 'constants/availavility'

const Product = (item: ProductResult) => {
  return (
    <div
      className='flex flex-col items-center gap-4 p-4 border-b border-solid md:grid md:grid-cols-6 md:col-span-2 border-brand-gray'
      key={item.uuid}
    >
      <figure className='relative w-20 h-20 overflow-hidden rounded-full aspect-[1/1]'>
        <img
          className='object-cover w-full h-full'
          src={item.imageUrl}
        />
      </figure>
      <div className='col-span-2 col-start-3 text-center'>
        <h1 className='font-bold'>{item.name}</h1>
        <h2 className='font-semibold'>${Number(item.price).toFixed(2)}</h2>
      </div>
      <div className='flex flex-col items-center col-span-2'>
        <span
          className={`
                  font-semibold
                  ${
                    item.availability === AVAILABLE
                      ? 'text-green-600'
                      : 'text-red-900'
                  }
                `}
        >
          {item.availability}
        </span>
        <ProductSwitch
          availability={item.availability}
          productId={item.uuid}
        />
      </div>
    </div>
  )
}

export default Product
