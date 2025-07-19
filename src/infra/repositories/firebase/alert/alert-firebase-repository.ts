import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from '@/main/config/firebase'
import { alertConverter } from './converters'
import type {
  AddAlertRepository,
  UpdateAlertRepository,
  WatchAlertsRepository,
} from '@/data/contracts/alert'
import type { AlertModel } from '@/domain/models/alert'
import { productConverter } from '../product/converters'
import { categoryConverter } from '../category/converters'
import { userConverter } from '../account/converters'

export class AlertFirebaseRepository
  implements AddAlertRepository, WatchAlertsRepository, UpdateAlertRepository
{
  async add(params: AddAlertRepository.Params): Promise<void> {
    await addDoc(collection(db, 'alerts').withConverter(alertConverter), {
      ...params,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }

  watchAll(
    onChange: WatchAlertsRepository.Params
  ): WatchAlertsRepository.Result {
    const q = query(collection(db, 'alerts').withConverter(alertConverter))

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const alerts: AlertModel[] = []

      for (const snapshot of querySnapshot.docs) {
        const alert = snapshot.data()
        const alertId = snapshot.id

        const productSnapshot = await getDoc(
          doc(db, 'products', alert.productId).withConverter(productConverter)
        )
        const productId = productSnapshot.id
        const product = productSnapshot.data()

        const categorySnapshot = await getDoc(
          doc(db, 'categories', product!.categoryId).withConverter(
            categoryConverter
          )
        )
        const categoryId = categorySnapshot.id
        const category = categorySnapshot.data()

        const userSnapshot = await getDoc(
          doc(db, 'users', alert.userId).withConverter(userConverter)
        )
        const user = userSnapshot.data()
        const userId = userSnapshot.id

        alerts.push({
          id: alertId,
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
          user: {
            id: userId,
            ...user!,
          },
          ...alert,
        })
      }

      onChange(alerts)
    })

    return unsubscribe
  }

  async update(
    alertId: string,
    data: UpdateAlertRepository.Params
  ): Promise<void> {
    await updateDoc(
      doc(db, 'alerts', alertId).withConverter(alertConverter),
      data
    )
  }
}
