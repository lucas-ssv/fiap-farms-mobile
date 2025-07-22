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
} from 'firebase/firestore'

import type {
  AddProductRepository,
  LoadByProductIdRepository,
  LoadProductsRepository,
  RemoveProductRepository,
  UpdateProductRepository,
  WatchProductsRepository,
} from '@/data/contracts/product'
import { productConverter } from './converters'
import { db } from '@/main/config/firebase'
import { loadCategoriesConverter } from '../category/converters'

export class ProductFirebaseRepository
  implements
    AddProductRepository,
    UpdateProductRepository,
    LoadProductsRepository,
    LoadByProductIdRepository,
    WatchProductsRepository,
    RemoveProductRepository
{
  async add(
    data: AddProductRepository.Params
  ): Promise<AddProductRepository.ProductId> {
    const product = await addDoc(
      collection(db, 'products').withConverter(productConverter),
      {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }
    )
    return product.id
  }

  async update(
    productId: string,
    data: UpdateProductRepository.Params
  ): Promise<void> {
    await updateDoc(
      doc(db, 'products', productId).withConverter(productConverter),
      data
    )
  }

  async loadAll(): Promise<LoadProductsRepository.Result> {
    const q = query(collection(db, 'products').withConverter(productConverter))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return []
    }

    const products: LoadProductsRepository.Result = []
    for (const snapshot of querySnapshot.docs) {
      const productId = snapshot.id
      const product = snapshot.data()

      const categoryRef = doc(
        db,
        'categories',
        product.categoryId
      ).withConverter(loadCategoriesConverter)

      const categorySnapshot = await getDoc(categoryRef)
      const category = categorySnapshot.data() as any
      const categoryId = categorySnapshot.id

      products.push({
        id: productId,
        name: product.name,
        price: product.price,
        cost: product.cost,
        category: {
          id: categoryId,
          name: category.name,
          description: category.description,
          image: category.image as string | undefined,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        },
        stock: product.stock,
        minStock: product.minStock,
        maxStock: product.maxStock,
        unit: product.unit,
        description: product.description,
        image: product.image as string | undefined,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })
    }
    return products
  }

  async loadByProductId(
    productId: string
  ): Promise<LoadByProductIdRepository.Result> {
    const productRef = doc(db, 'products', productId).withConverter(
      productConverter
    )
    const productSnapshot = await getDoc(productRef)

    const product = productSnapshot.data()
    const categoryRef = doc(
      db,
      'categories',
      product!.categoryId
    ).withConverter(loadCategoriesConverter)

    const categorySnapshot = await getDoc(categoryRef)
    const category = categorySnapshot.data() as any
    const categoryId = categorySnapshot.id

    return {
      id: productSnapshot.id,
      name: product!.name,
      price: product!.price,
      cost: product!.cost,
      stock: product!.stock,
      minStock: product!.minStock,
      maxStock: product!.maxStock,
      unit: product!.unit,
      description: product!.description,
      image: product!.image as string | undefined,
      createdAt: product!.createdAt,
      updatedAt: product!.updatedAt,
      category: {
        id: categoryId,
        name: category.name,
        description: category.description,
        image: category.image as string | undefined,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    }
  }

  watchAll(
    onChange: WatchProductsRepository.Params
  ): WatchProductsRepository.Result {
    const q = query(collection(db, 'products').withConverter(productConverter))

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const products = []

      for (const snapshot of querySnapshot.docs) {
        const product = snapshot.data()
        const productId = snapshot.id

        const categorySnapshot = await getDoc(
          doc(db, 'categories', product.categoryId).withConverter(
            loadCategoriesConverter
          )
        )

        const category = categorySnapshot.data()
        const categoryId = categorySnapshot.id

        products.push({
          id: productId,
          name: product.name,
          price: product.price,
          cost: product.cost,
          stock: product.stock,
          minStock: product.minStock,
          maxStock: product.maxStock,
          unit: product.unit,
          description: product.description,
          image: product.image as string | undefined,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          category: {
            id: categoryId,
            name: category!.name,
            description: category!.description,
            image: category!.image,
            createdAt: category!.createdAt,
            updatedAt: category!.updatedAt,
          },
        })
      }

      onChange(products)
    })

    return unsubscribe
  }

  async remove(productId: string): Promise<void> {
    await deleteDoc(
      doc(db, 'products', productId).withConverter(productConverter)
    )
  }
}
