import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './Auth/LoginPage'
import HomePage from './App/Home/HomePage'
import AppProvider from 'ui/containers/Providers/App'
import ProtectedRoute from 'ui/components/Auth/ProtectedRoute'
import NotFound from './NotFound'

function App() {
  return (
    <div className='App'>
      <AppProvider>
        <HashRouter>
          <Routes>
            <Route
              path='/'
              element={<Navigate to='/login' />}
            />

            <Route
              path='/login'
              element={<LoginPage />}
            />
            <Route element={<ProtectedRoute />}>
              <Route
                path='/home'
                element={<HomePage />}
              />
            </Route>
            {/* <Route element={<Auth />}>
            <Route
              path='/products'
              element={<Products />}
            />
          </Route> */}
            {/* Not found */}
            <Route
              path='/*'
              element={<NotFound />}
            />
          </Routes>
        </HashRouter>
      </AppProvider>
    </div>
  )
}

export default App
