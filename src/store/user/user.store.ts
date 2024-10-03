import { StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { StatusResult, UserStore } from './user.type'

const storeApi: StateCreator<
  UserStore,
  [['zustand/devtools', never], ['zustand/immer', never]]
> = (set) => ({
  status: '',
  result: {
    uuid: '',
    email: '',
    stores: [],
    username: '',
  },
  setUser: (user: StatusResult) => {
    set({ ...user })
  },
})

export const useUserStore = create<UserStore>()(devtools(storeApi))
