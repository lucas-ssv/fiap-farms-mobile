import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '@/main/config/firebase'
import type {
  AddStockMovementRepository,
  RemoveStockMovementRepository,
  UpdateStockMovementRepository,
} from '@/data/contracts/stock-movement'
import { stockMovementConverter } from './converters'

export class StockMovementFirebaseRepository
  implements
    AddStockMovementRepository,
    RemoveStockMovementRepository,
    UpdateStockMovementRepository
{
  async add(params: AddStockMovementRepository.Params): Promise<void> {
    await addDoc(
      collection(db, 'stock-movements').withConverter(stockMovementConverter),
      {
        ...params,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }
    )
  }

  async removeByProductId(productId: string): Promise<void> {
    const collectionRef = collection(db, 'stock-movements').withConverter(
      stockMovementConverter
    )
    const q = query(collectionRef, where('productId', '==', productId))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref)
    })
  }

  async update(
    type: 'input' | 'output',
    productId: string,
    quantity: number
  ): Promise<void> {
    const collectionRef = collection(db, 'stock-movements').withConverter(
      stockMovementConverter
    )
    const q = query(collectionRef, where('productId', '==', productId))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      const newQuantity =
        type === 'input' ? data.quantity + quantity : data.quantity - quantity

      updateDoc(doc.ref, {
        quantity: newQuantity,
        updatedAt: Timestamp.now(),
      })
    })
  }
}
