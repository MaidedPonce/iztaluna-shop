import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { login } from 'services/auth/auth.services'
import { useAuthStore } from 'store/auth/auth.store'
import { User } from 'store/user/user.type'
import CommonButton from 'ui/components/Button/CommonButton'
import EmailInput from 'ui/components/Input/Email'
import PasswordInput from 'ui/components/Input/Password'

const LoginForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  })
  const setToken = useAuthStore((state) => state.setToken)
  const setExpiresAt = useAuthStore((state) => state.setExpiresAt)

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      setToken({ token: data.access, refresh_token: data.refresh })
      const date = Date.now()
      setExpiresAt(date)
      toast.success('Login succesfull!')
    },
    onError: (error) => {
      console.error('Login failed', error)
      toast.error('Something bad has happened! Try later...')
    },
  })
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    loginMutation.mutate({ username: user.email, password: user.password })
  }

  return (
    <form
      className='flex flex-col w-full gap-4'
      onSubmit={onSubmit}
    >
      <h1 className='text-4xl font-bold text-center'>Welcome back! 👋🏻</h1>
      <label htmlFor='email'>
        <strong>Email</strong>
      </label>
      <EmailInput
        id='email'
        value={user.email}
        required
        placeholder='user@dominio.com'
        autoComplete='on'
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor='password'>
        <strong>Password</strong>
      </label>
      <PasswordInput
        id='password'
        value={user.password}
        required
        autoComplete='current-password'
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='*******'
        minLength={6}
        maxLength={12}
      />
      <CommonButton
        disabled={loginMutation.isLoading}
        type='submit'
        label='Login'
      />
    </form>
  )
}

export default LoginForm
