import { LogoutImpl } from '@/data/usecases/account'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase/account'
import { AppRoutes } from '@/main/routes/app'

export function MakeAppRoutes() {
  const logout = new LogoutImpl(new AccountFirebaseRepository())
  return <AppRoutes logout={logout} />
}
