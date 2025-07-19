export interface LoadAccountRepository {
  auth: (params: LoadAccountRepository.Params) => Promise<void>
}

export namespace LoadAccountRepository {
  export type Params = {
    email: string
    password: string
  }
}