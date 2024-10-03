export type Login = {
  username: string
  password: string
}

export type TokenType = {
  token: string | null
  refresh_token: string | null
}

export interface AuthStore {
  token: string | null
  refresh_token: string | null
  logout: () => void
  setToken: ({ token, refresh_token }: TokenType) => void
  exp: number
  setExpiresAt: (date: number) => void
}

export interface LoginResponse {
  access: string
  refresh: string
}

export type RefreshResponse = LoginResponse

export interface ValidateTokenResponse {
  status: string
}
