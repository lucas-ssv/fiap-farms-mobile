export interface LogoutAccountRepository {
  logout: () => Promise<void>
}
