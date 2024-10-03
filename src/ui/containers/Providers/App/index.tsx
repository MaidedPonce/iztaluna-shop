import React, { ReactNode } from 'react'
import TankStackProvider from '../TankStack'
import { Toaster } from 'react-hot-toast'

type AppProviderProps = {
  children: ReactNode
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <TankStackProvider>
      <Toaster />
      {children}
    </TankStackProvider>
  )
}

export default AppProvider
