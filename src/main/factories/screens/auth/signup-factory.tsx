import { AddAccountImpl } from '@/data/usecases/account'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase/account'
import { SignUp } from '@/presentation/screens/auth'

export function MakeSignUp() {
  const accountFirebaseRepository = new AccountFirebaseRepository()
  const addAccount = new AddAccountImpl(
    accountFirebaseRepository,
    accountFirebaseRepository
  )
  return <SignUp addAccount={addAccount} />
}
