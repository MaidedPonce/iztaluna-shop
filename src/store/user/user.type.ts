export interface User {
  email: string
  password: string
}
export interface StatusResult {
  status: string
  result: Result
}

export interface UserStore extends StatusResult {
  setUser: (user: StatusResult) => void
}

export interface Result {
  uuid: string
  email: string
  stores: Store[]
  username: string
}

export interface Store {
  uuid: string
  name: string
  availabilityState: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  providers: any[]
  config: Config
  secret: string
  legacyId: null
  organizationUuid: string
}

export interface Config {
  brandColor: string
}
