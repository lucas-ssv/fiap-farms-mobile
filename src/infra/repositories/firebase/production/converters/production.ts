import type { AddProductionRepository } from '@/data/contracts/production'
import type { DocumentData, FirestoreDataConverter } from 'firebase/firestore'

export type Production = AddProductionRepository.Params & {
  createdAt: Date
  updatedAt: Date
}

export const productionConverter: FirestoreDataConverter<Production> = {
  toFirestore: (production: Production): DocumentData => {
    return {
      productId: production.productId,
      status: production.status,
      quantity: production.quantity,
      quantityProduced: production.quantityProduced,
      lastQuantity: production.lastQuantity,
      unit: production.unit,
      startDate: production.startDate,
      harvestDate: production.harvestDate,
      createdAt: production.createdAt,
      updatedAt: production.updatedAt,
    }
  },
  fromFirestore: (snapshot, options): Production => {
    const data = snapshot.data(options)
    return data as Production
  },
}

// export const loadSalesConverter: FirestoreDataConverter<SaleModel> = {
//   toFirestore: (sale: SaleModel): DocumentData => {
//     return {
//       id: sale.id,
//       product: {
//         id: sale.product.id,
//         name: sale.product.name,
//         price: sale.product.price,
//         cost: sale.product.cost,
//         category: sale.product.category,
//         stock: sale.product.stock,
//         minStock: sale.product.minStock ?? null,
//         maxStock: sale.product.maxStock ?? null,
//         description: sale.product.description,
//         image: sale.product.image,
//         createdAt: sale.product.createdAt,
//         updatedAt: sale.product.updatedAt,
//       },
//       customer: {
//         id: sale.customer?.id,
//         name: sale.customer?.name,
//         email: sale.customer?.email,
//         phone: sale.customer?.phone ?? null,
//         postalCode: sale.customer?.postalCode,
//         address: sale.customer?.address,
//         addressNumber: sale.customer?.addressNumber,
//         addressComplement: sale.customer?.addressComplement ?? null,
//         neighborhood: sale.customer?.neighborhood,
//         city: sale.customer?.city,
//         state: sale.customer?.state,
//         createdAt: sale.customer?.createdAt,
//         updatedAt: sale.customer?.updatedAt,
//       },
//       user: {
//         id: sale.user.id,
//         userUID: sale.user.userUID,
//         name: sale.user.name,
//         username: sale.user.username,
//         email: sale.user.email,
//       },
//       quantity: sale.quantity,
//       saleDate: sale.saleDate,
//       totalPrice: sale.totalPrice,
//       unitPrice: sale.unitPrice,
//       unit: sale.unit,
//       discount: sale.discount ?? null,
//       status: sale.status,
//       paymentMethod: sale.paymentMethod,
//       observations: sale.observations ?? null,
//       createdAt: sale.createdAt,
//       updatedAt: sale.updatedAt,
//     }
//   },
//   fromFirestore: (snapshot, options): SaleModel => {
//     const data = snapshot.data(options)
//     return data as SaleModel
//   },
// }
