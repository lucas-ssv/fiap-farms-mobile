import type { AuthRepository } from '@/data/contracts/account'

export class AuthRepositoryStub implements AuthRepository {
  onAuthStateChanged(
    callback: (user: { email: string } | null) => void
  ): () => void {
    callback({ email: 'any_email@mail.com' })
    return () => {}
  }
}
