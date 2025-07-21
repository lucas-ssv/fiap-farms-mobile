import { AuthenticationImpl } from '@/data/usecases/account'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase/account'
import { Login } from '@/presentation/screens/auth'

export function MakeLogin() {
  const accountFirebaseRepository = new AccountFirebaseRepository()
  const authentication = new AuthenticationImpl(accountFirebaseRepository)
  return <Login authentication={authentication} />
}
