import type { AddProductRepository } from '@/data/contracts/product'
import type { ProductModel } from '@/domain/models/product'
import type { DocumentData, FirestoreDataConverter } from 'firebase/firestore'

export type Product = AddProductRepository.Params & {
  createdAt: Date
  updatedAt: Date
}

export const productConverter: FirestoreDataConverter<Product> = {
  toFirestore: (product: Product): DocumentData => {
    return {
      name: product.name,
      price: product.price,
      cost: product.cost,
      categoryId: product.categoryId,
      stock: product.stock,
      minStock: product.minStock,
      maxStock: product.maxStock,
      unit: product.unit,
      description: product.description,
      image: product.image ?? null,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  },
  fromFirestore: (snapshot, options): Product => {
    const data = snapshot.data(options)
    return data as Product
  },
}

export const loadProductsConverter: FirestoreDataConverter<ProductModel> = {
  toFirestore: (product: ProductModel): DocumentData => {
    return {
      name: product.name,
      price: product.price,
      cost: product.cost,
      category: {
        id: product.category.id,
        name: product.category.name,
        description: product.category.description,
        image: product.category.image ?? null,
        createdAt: product.category.createdAt,
        updatedAt: product.category.updatedAt,
      },
      stock: product.stock,
      minStock: product.minStock,
      maxStock: product.maxStock,
      unit: product.unit,
      description: product.description,
      image: product.image ?? null,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  },
  fromFirestore: (snapshot, options): ProductModel => {
    const data = snapshot.data(options)
    return data as ProductModel
  },
}
