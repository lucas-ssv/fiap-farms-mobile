import type { SaveUserRepository } from '@/data/contracts/account'
import type {
  DocumentData,
  FirestoreDataConverter,
  Timestamp,
} from 'firebase/firestore'

export type User = SaveUserRepository.Params & {
  createdAt: Timestamp
  updatedAt: Timestamp
}

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore: (user: User): DocumentData => {
    return {
      name: user.name,
      username: user.username,
      email: user.email,
      userUID: user.userUID,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  },
  fromFirestore: (snapshot, options): User => {
    const data = snapshot.data(options)
    return data as User
  },
}
