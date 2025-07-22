import type { LogoutAccountRepository } from '@/data/contracts/account'

export class LogoutAccountRepositoryMock implements LogoutAccountRepository {
  async logout(): Promise<void> {}
}
