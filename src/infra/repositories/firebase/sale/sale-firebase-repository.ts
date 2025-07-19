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
import { saleConverter } from './converters'
import { db } from '@/main/config/firebase'
import type {
  AddSaleRepository,
  RemoveSaleRepository,
  UpdateSaleRepository,
  WatchSalesRepository,
} from '@/data/contracts/sale'
import { productConverter } from '../product/converters'
import { categoryConverter } from '../category/converters'
import type { SaleModel } from '@/domain/models/sale'
import { customerConverter, type Customer } from '../customer/converters'
import { userConverter } from '../account/converters'

export class SaleFirebaseRepository
  implements
    AddSaleRepository,
    WatchSalesRepository,
    UpdateSaleRepository,
    RemoveSaleRepository
{
  async add(params: AddSaleRepository.Params): Promise<void> {
    await addDoc(collection(db, 'sales').withConverter(saleConverter), {
      ...params,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }

  watchAll(onChange: WatchSalesRepository.Params): WatchSalesRepository.Result {
    const q = query(collection(db, 'sales').withConverter(saleConverter))

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const sales: SaleModel[] = []

      for (const snapshot of querySnapshot.docs) {
        const sale = snapshot.data()
        const saleId = snapshot.id

        const productSnapshot = await getDoc(
          doc(db, 'products', sale.productId).withConverter(productConverter)
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
          doc(db, 'users', sale.userId).withConverter(userConverter)
        )
        const user = userSnapshot.data()
        const userId = userSnapshot.id

        let customer: Customer | undefined
        let customerId: string | undefined
        if (sale.customerId) {
          const customerSnapshot = await getDoc(
            doc(db, 'customers', sale.customerId).withConverter(
              customerConverter
            )
          )
          customer = customerSnapshot.data()
          customerId = customerSnapshot.id
        }

        sales.push({
          id: saleId,
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
          customer: customer
            ? {
                id: customerId as string,
                ...customer,
              }
            : undefined,
          user: {
            id: userId,
            ...user!,
          },
          ...sale,
        })
      }

      onChange(sales)
    })

    return unsubscribe
  }

  async update(
    saleId: string,
    data: UpdateSaleRepository.Params
  ): Promise<void> {
    await updateDoc(doc(db, 'sales', saleId).withConverter(saleConverter), data)
  }

  async remove(saleId: string): Promise<void> {
    await deleteDoc(doc(db, 'sales', saleId).withConverter(saleConverter))
  }
}
