export interface ObserveAndLoadAccountByEmail {
  execute: (callback: ObserveAndLoadAccountByEmail.Params) => () => void
}

export namespace ObserveAndLoadAccountByEmail {
  export type Params = ObserveAndLoadAccountByEmailParams
  export type UserParams = ObserveAndLoadAccountByEmailUserParams
}

export type ObserveAndLoadAccountByEmailParams = (
  user: ObserveAndLoadAccountByEmailUserParams | null
) => void

export type ObserveAndLoadAccountByEmailUserParams = {
  id: string
  name: string
  username: string
  email: string
  userUID: string
}
