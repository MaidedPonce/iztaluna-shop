import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

type TankStackProviderProps = {
  children: ReactNode
}

const queryClient = new QueryClient()

const TankStackProvider: React.FC<TankStackProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default TankStackProvider
