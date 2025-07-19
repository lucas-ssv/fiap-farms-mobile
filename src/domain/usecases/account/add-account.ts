export interface AddAccount {
  execute: (account: AddAccount.Params) => Promise<void>
}

export namespace AddAccount {
  export type Params = {
    name: string
    username: string
    email: string
    password: string
  }
}