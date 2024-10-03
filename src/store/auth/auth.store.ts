import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { isClient } from 'utils/isClient'
import { AuthStore, TokenType } from './auth.type'
import { immer } from 'zustand/middleware/immer'

const storeApi: StateCreator<
  AuthStore,
  [['zustand/devtools', never], ['zustand/immer', never]]
> = (set) => ({
  token: isClient() ? localStorage.getItem('token') : null,
  refresh_token: isClient() ? localStorage.getItem('refresh_token') : null,
  exp: 0,
  logout: () => {
    set({ token: null, refresh_token: null, exp: 0 }, false, 'logout')
  },
  setToken: ({ token, refresh_token }: TokenType) => {
    set({ token, refresh_token }, false, 'setToken')
  },
  setExpiresAt: (date: number) => {
    set({ exp: date }, false, 'setExpiresAt')
  },
})

export const useAuthStore = create<AuthStore>()(
  devtools(persist(immer(storeApi), { name: 'auth' }))
)
