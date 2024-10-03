import { Navigate } from 'react-router-dom'
import { useAuthStore } from 'store/auth/auth.store'
import LoginForm from 'ui/components/Auth/LoginForm/LoginForm'

const LoginContainer = () => {
  const token = useAuthStore((state) => state.token)
  if (token) {
    return (
      <Navigate
        to='/home'
        replace
      />
    )
  }
  return (
    <section className='flex justify-between h-screen p-2'>
      <section className='flex items-center justify-center w-full md:w-1/2 h-full p-8 m-auto'>
        <div className='max-w-[28rem] w-full'>
          <LoginForm />
        </div>
      </section>
      <section className='hidden md:block w-1/2 h-full'>
        <div className='h-full bg-brand bg-gradient-to-b from-brand to-brand-orange-light rounded-2xl' />
      </section>
    </section>
  )
}

export default LoginContainer
