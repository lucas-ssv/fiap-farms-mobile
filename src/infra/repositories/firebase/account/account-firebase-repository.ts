import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type NextOrObserver,
  type User as FirebaseUser,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'

import type {
  AddAccountRepository,
  AuthRepository,
  LoadAccountByEmailRepository,
  LoadAccountRepository,
  LoadAccountsRepository,
  LogoutAccountRepository,
  SaveUserRepository,
} from '@/data/contracts/account'
import { auth, db } from '@/main/config/firebase'
import { userConverter } from './converters'

export class AccountFirebaseRepository
  implements
    AddAccountRepository,
    SaveUserRepository,
    LoadAccountRepository,
    AuthRepository<NextOrObserver<FirebaseUser>>,
    LoadAccountByEmailRepository,
    LogoutAccountRepository,
    LoadAccountsRepository
{
  async auth(params: LoadAccountRepository.Params): Promise<void> {
    const { email, password } = params
    await signInWithEmailAndPassword(auth, email, password)
  }

  onAuthStateChanged(callback: NextOrObserver<FirebaseUser>): () => void {
    const unsubscribe = onAuthStateChanged(auth, callback)
    return unsubscribe
  }

  async loadByEmail(
    email: string
  ): Promise<LoadAccountByEmailRepository.Result | null> {
    const q = query(
      collection(db, 'users').withConverter(userConverter),
      where('email', '==', email)
    )
    const querySnapshot = await getDocs(q)
    let user: LoadAccountByEmailRepository.Result | null = null
    querySnapshot.forEach((doc) => {
      const id = doc.id
      const data = doc.data()
      user = {
        id,
        ...data,
      }
    })
    return user
  }

  async loadAll(): Promise<LoadAccountsRepository.Result> {
    const q = query(
      collection(db, 'users').withConverter(userConverter)
    )
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return []
    }

    const accounts: LoadAccountsRepository.Result = []
    querySnapshot.forEach((doc) => {
      const accountId = doc.id
      const account = doc.data()
      accounts.push({
        id: accountId,
        name: account.name,
        username: account.username,
        email: account.email,
      })
    })
    return accounts
  }

  async add(account: AddAccountRepository.Params): Promise<string> {
    const { email, password } = account
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    return user.uid
  }

  async save(user: SaveUserRepository.Params): Promise<void> {
    await addDoc(collection(db, 'users').withConverter(userConverter), {
      userUID: user.userUID,
      name: user.name,
      username: user.username,
      email: user.email,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }

  async logout(): Promise<void> {
    await signOut(auth)
  }
}
