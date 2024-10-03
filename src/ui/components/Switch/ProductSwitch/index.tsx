import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { updateProduct } from 'services/products/products.services'
import CommonSwitch from '../CommonSwitch'
import { ProductResult, Products } from 'store/products/product.types'
import { AVAILABLE, UNAVAILABLE } from 'constants/availavility'

type SwitchType = {
  availability: string
  productId: string
}

const ProductSwitch = ({ availability, productId }: SwitchType) => {
  const [isChecked, setIsChecked] = useState(false)
  const queryClient = useQueryClient() // Necesario para invalidar la cache
  const previousAvailability = availability === AVAILABLE

  const updateMutation = useMutation(updateProduct, {
    onMutate: async (newAvailability) => {
      await queryClient.cancelQueries(['products'])

      const products: Products = queryClient.getQueryData([
        'products',
      ]) as Products

      const previousData = products?.results?.find(
        (product: ProductResult) => product.uuid === productId
      )

      queryClient.setQueryData<unknown>(
        ['products'],
        (oldData: { results: ProductResult[] }) => {
          if (oldData) {
            return {
              ...oldData,
              results: oldData.results.map((product: ProductResult) =>
                product.uuid === productId
                  ? { ...product, availability: newAvailability.availability }
                  : product
              ),
            }
          }
          return {
            results: [
              { uuid: productId, availability: newAvailability.availability },
            ],
          }
        }
      )

      return { previousData }
    },
    onSuccess: () => {
      toast.success('Product updated')
    },
    onError: (error, _variables, context) => {
      console.error('Update failed', error)
      toast.error('Something bad has happened! Try later...')
      if (context?.previousData) {
        queryClient.setQueryData<unknown>(
          ['products'],
          (oldData: { results: ProductResult[] }) => {
            if (oldData) {
              return {
                ...oldData,
                results: oldData.results.map((product: ProductResult) =>
                  product.uuid === productId ? context.previousData : product
                ),
              }
            }
            return oldData
          }
        )
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['products'])
    },
  })

  const handleCheckboxChange = () => {
    const newAvailability = isChecked ? UNAVAILABLE : AVAILABLE
    setIsChecked(!isChecked)
    updateMutation.mutate({
      product_id: productId,
      availability: newAvailability,
    })

    // Enviar un mensaje por el canal cuando cambie el estado
    const channel = new BroadcastChannel('product-switch-channel')
    channel.postMessage({ productId, availability: newAvailability })
  }

  useEffect(() => {
    const channel = new BroadcastChannel('product-switch-channel')

    // Escuchar mensajes del canal
    channel.onmessage = (event) => {
      const { productId: changedProductId, availability: newAvailability } =
        event.data

      if (changedProductId === productId) {
        setIsChecked(newAvailability === AVAILABLE)
      }
    }

    return () => {
      channel.close() // Cerrar el canal cuando el componente se desmonte
    }
  }, [productId])

  useEffect(() => {
    setIsChecked(previousAvailability)
  }, [availability])

  return (
    <CommonSwitch
      isChecked={isChecked}
      onChange={handleCheckboxChange}
      disabled={updateMutation.isLoading}
    />
  )
}

export default ProductSwitch
