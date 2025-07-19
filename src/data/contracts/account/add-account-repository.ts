export interface AddAccountRepository {
  add: (account: AddAccountRepository.Params) => Promise<string>
}

export namespace AddAccountRepository {
  export type Params = {
    name: string
    username: string
    email: string
    password: string
  }
}