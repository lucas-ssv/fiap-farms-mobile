import type {
  AuthRepository,
  LoadAccountByEmailRepository,
} from '@/data/contracts/account'
import type {
  ObserveAndLoadAccountByEmail,
  ObserveAndLoadAccountByEmailParams,
} from '@/domain/usecases/account'

export class ObserveAndLoadAccountByEmailImpl
  implements ObserveAndLoadAccountByEmail
{
  private authRepository
  private loadAccountByEmailRepository

  constructor(
    authRepository: AuthRepository,
    loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {
    this.authRepository = authRepository
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  execute(callback: ObserveAndLoadAccountByEmailParams): () => void {
    const unsubscribe = this.authRepository.onAuthStateChanged(
      async (user: { email: string } | null) => {
        if (user) {
          const account = await this.loadAccountByEmailRepository.loadByEmail(
            user.email
          )
          callback(account)
        } else {
          callback(null)
        }
      }
    )
    return unsubscribe
  }
}
