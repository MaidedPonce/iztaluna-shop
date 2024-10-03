import ProductTable from 'ui/components/Products/ProductList'

const HomeContainer = () => {
  return (
    <section className='w-full p-10 mr-auto max-w-7xl rounded-3xl'>
      <h1 className='my-6 text-4xl font-bold'>Dashboard</h1>
      <section className='mx-auto '>
        <ProductTable />
      </section>
    </section>
  )
}

export default HomeContainer
