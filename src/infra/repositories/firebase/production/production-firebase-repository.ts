import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from '@/main/config/firebase'
import type {
  AddProductionRepository,
  RemoveProductionRepository,
  UpdateProductionRepository,
  WatchProductionsRepository,
} from '@/data/contracts/production'
import { productionConverter } from './converters'
import type { ProductionModel } from '@/domain/models/production'
import { productConverter } from '../product/converters'
import { categoryConverter } from '../category/converters'

export class ProductionFirebaseRepository
  implements
    AddProductionRepository,
    WatchProductionsRepository,
    UpdateProductionRepository,
    RemoveProductionRepository
{
  async add(params: AddProductionRepository.Params): Promise<void> {
    await addDoc(
      collection(db, 'productions').withConverter(productionConverter),
      {
        ...params,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }
    )
  }

  watchAll(
    onChange: WatchProductionsRepository.Params
  ): WatchProductionsRepository.Result {
    const q = query(
      collection(db, 'productions').withConverter(productionConverter)
    )

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const productions: ProductionModel[] = []

      for (const snapshot of querySnapshot.docs) {
        const production = snapshot.data()
        const productionId = snapshot.id

        const productSnapshot = await getDoc(
          doc(db, 'products', production.productId).withConverter(
            productConverter
          )
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

        productions.push({
          id: productionId,
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
          ...production,
        })
      }

      onChange(productions)
    })

    return unsubscribe
  }

  async update(
    productionId: string,
    data: UpdateProductionRepository.Params
  ): Promise<void> {
    await updateDoc(
      doc(db, 'productions', productionId).withConverter(productConverter),
      data
    )
  }

  async remove(productionId: string): Promise<void> {
    await deleteDoc(
      doc(db, 'productions', productionId).withConverter(productionConverter)
    )
  }
}
