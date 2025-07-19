export interface SaveUserRepository {
  save: (user: SaveUserRepository.Params) => Promise<void>
}

export namespace SaveUserRepository {
  export type Params = {
    userUID: string
    name: string
    username: string
    email: string
  }
}
