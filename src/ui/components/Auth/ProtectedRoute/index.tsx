import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from 'store/auth/auth.store'
import Header from 'ui/components/Layout/Header'
import { refresh } from 'services/auth/auth.services'
import { useQuery } from 'react-query'
import { getMe } from 'services/user/user.services'
import { useUserStore } from 'store/user/user.store'

const PROTECTED_ROUTE_TOKEN_LIFETIME = 25 * 60 * 1000 // 25 minutos
const TOKEN_EXPIRATION_BUFFER = 2 * 60 * 1000 // 2 minutos

const ProtectedRoute: React.FC = () => {
  const token = useAuthStore((state) => state.token)
  const setToken = useAuthStore((state) => state.setToken)
  const expiresAt = useAuthStore((state) => state.exp)
  const setExpiresAt = useAuthStore((state) => state.setExpiresAt)
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)
  const now = Date.now()

  useQuery('me', () => getMe(), {
    onSuccess: (data) => {
      setUser(data)
    },
    onError: (e) => {
      console.log(e)
      /* setToken({ token: null, refresh_token: null })
      setExpiresAt(0)
      navigate('/login') */
    },
    refetchOnWindowFocus: false,
  })
  // Refrescar el token si está cerca de expirar
  useQuery('refreshToken', () => refresh(), {
    enabled: expiresAt !== 0 && now > expiresAt + TOKEN_EXPIRATION_BUFFER, // Si hay un token y la expiración está cerca
    onSuccess: (data) => {
      // Actualiza el tiempo de expiración si es la primera vez que se establece
      if (expiresAt !== 0 && now > expiresAt + TOKEN_EXPIRATION_BUFFER) {
        const newExpiresAt = Date.now() + PROTECTED_ROUTE_TOKEN_LIFETIME // Tiempo inicial
        setExpiresAt(newExpiresAt)
        setToken({ token: data.access, refresh_token: data.refresh })
      }
    },
    onError: () => {
      setToken({ token: null, refresh_token: null })
      setExpiresAt(0)
      navigate('/login')
    },
    refetchOnWindowFocus: false,
  })

  // Validar y manejar expiración del token
  useEffect(() => {
    // Verificar 30 minutos
    if (!token || now > expiresAt + 30 * 60 * 1000) {
      // Si el token ha caducado más de 30 minutos, redirige al login
      setToken({ token: null, refresh_token: null })
      setExpiresAt(0)
      navigate('/login')
    }
  }, [expiresAt, navigate, now, setExpiresAt, setToken, token])

  return (
    <>
      <Header />
      <main className='flex w-full min-h-screen pl-12 md:pl-24 bg-brand-orange-light/5'>
        <Outlet />
      </main>
    </>
  )
}

export default ProtectedRoute
