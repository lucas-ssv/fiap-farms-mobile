import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { goalConverter } from './converters'
import { db } from '@/main/config/firebase'
import type {
  AddGoalRepository,
  LoadGoalsByUserIdRepository,
  RemoveGoalRepository,
  UpdateGoalRepository,
  WatchGoalsRepository,
} from '@/data/contracts/goal'
import { productConverter } from '../product/converters'
import type { GoalModel } from '@/domain/models/goal'
import { categoryConverter } from '../category/converters'
import { userConverter } from '../account/converters'

export class GoalFirebaseRepository
  implements
    AddGoalRepository,
    WatchGoalsRepository,
    UpdateGoalRepository,
    RemoveGoalRepository,
    LoadGoalsByUserIdRepository
{
  async loadAll(userId: string): Promise<LoadGoalsByUserIdRepository.Result> {
    const q = query(
      collection(db, 'goals').withConverter(goalConverter),
      where('userId', '==', userId)
    )
    const querySnapshot = await getDocs(q)
    const goals: GoalModel[] = []

    for (const snapshot of querySnapshot.docs) {
      const goal = snapshot.data()
      const productSnapshot = await getDoc(
        doc(db, 'products', goal.productId).withConverter(productConverter)
      )
      const product = productSnapshot.data()
      const productId = productSnapshot.id

      const categorySnapshot = await getDoc(
        doc(db, 'categories', product!.categoryId).withConverter(
          categoryConverter
        )
      )
      const categoryId = categorySnapshot.id
      const category = categorySnapshot.data()

      const userSnapshot = await getDoc(
        doc(db, 'users', goal.userId).withConverter(userConverter)
      )
      const user = userSnapshot.data()
      const userId = userSnapshot.id

      goals.push({
        id: snapshot.id,
        user: {
          id: userId,
          ...user!,
        },
        product: {
          id: productId,
          ...product!,
          image: product!.image as string | undefined,
          category: {
            id: categoryId,
            ...category!,
            image: category!.image as string | undefined,
          },
        },
        ...goal,
      })
    }

    return goals
  }

  async add(params: AddGoalRepository.Params): Promise<void> {
    await addDoc(collection(db, 'goals').withConverter(goalConverter), {
      ...params,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }

  watchAll(onChange: WatchGoalsRepository.Params): WatchGoalsRepository.Result {
    const q = query(collection(db, 'goals').withConverter(goalConverter))

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const goals: GoalModel[] = []

      for (const snapshot of querySnapshot.docs) {
        const goal = snapshot.data()
        const goalId = snapshot.id

        const productSnapshot = await getDoc(
          doc(db, 'products', goal.productId).withConverter(productConverter)
        )

        const product = productSnapshot.data()
        const productId = productSnapshot.id

        const categorySnapshot = await getDoc(
          doc(db, 'categories', product!.categoryId).withConverter(
            categoryConverter
          )
        )
        const categoryId = categorySnapshot.id
        const category = categorySnapshot.data()

        const userSnapshot = await getDoc(
          doc(db, 'users', goal.userId).withConverter(userConverter)
        )
        const user = userSnapshot.data()
        const userId = userSnapshot.id

        goals.push({
          id: goalId,
          user: {
            id: userId,
            ...user!,
          },
          product: {
            id: productId,
            ...product!,
            image: product!.image as string | undefined,
            category: {
              id: categoryId,
              ...category!,
              image: category!.image as string | undefined,
            },
          },
          ...goal,
        })
      }

      onChange(goals)
    })

    return unsubscribe
  }

  async update(
    goalId: string,
    data: UpdateGoalRepository.Params
  ): Promise<void> {
    await updateDoc(doc(db, 'goals', goalId).withConverter(goalConverter), data)
  }

  async remove(goalId: string): Promise<void> {
    await deleteDoc(doc(db, 'goals', goalId).withConverter(goalConverter))
  }
}
