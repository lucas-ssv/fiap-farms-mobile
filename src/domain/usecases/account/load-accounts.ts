import type { UserModel } from '@/domain/models/account'

export interface LoadAccounts {
  execute: () => Promise<LoadAccounts.Result>
}

export namespace LoadAccounts {
  export type Result = Array<Omit<UserModel, 'password' | 'userUID'>>
}
