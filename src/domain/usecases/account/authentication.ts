export interface Authentication {
  execute: (params: Authentication.Params) => Promise<void>
}

export namespace Authentication {
  export type Params = {
    email: string
    password: string
  }
}