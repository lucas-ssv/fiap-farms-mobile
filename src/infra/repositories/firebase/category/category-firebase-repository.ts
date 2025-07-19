import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'

import { categoryConverter } from './converters'
import { db } from '@/main/config/firebase'
import type {
  AddCategoryRepository,
  LoadCategoriesRepository,
  RemoveCategoryRepository,
  UpdateCategoryRepository,
  WatchCategoriesRepository,
} from '@/data/contracts/category'

export class CategoryFirebaseRepository
  implements
    AddCategoryRepository,
    UpdateCategoryRepository,
    LoadCategoriesRepository,
    WatchCategoriesRepository,
    RemoveCategoryRepository
{
  async add(
    data: AddCategoryRepository.Params
  ): Promise<AddCategoryRepository.CategoryId> {
    const category = await addDoc(
      collection(db, 'categories').withConverter(categoryConverter),
      {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }
    )
    return category.id
  }

  async update(
    categoryId: string,
    data: UpdateCategoryRepository.Params
  ): Promise<void> {
    await updateDoc(
      doc(db, 'categories', categoryId).withConverter(categoryConverter),
      data
    )
  }

  async loadAll(): Promise<LoadCategoriesRepository.Result> {
    const q = query(
      collection(db, 'categories').withConverter(categoryConverter)
    )
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return []
    }

    const categories: LoadCategoriesRepository.Result = []
    querySnapshot.forEach((doc) => {
      const categoryId = doc.id
      const category = doc.data()
      categories.push({
        id: categoryId,
        name: category.name,
        description: category.description,
        image: category.image as string | undefined,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      })
    })
    return categories
  }

  watchAll(onChange: WatchCategoriesRepository.Params): WatchCategoriesRepository.Result {
    const q = query(
      collection(db, 'categories').withConverter(categoryConverter)
    )
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const categories: LoadCategoriesRepository.Result = []
      querySnapshot.forEach((doc) => {
        const categoryId = doc.id
        const category = doc.data()
        categories.push({
          id: categoryId,
          name: category.name,
          description: category.description,
          image: category.image as string | undefined,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        })
      })
      onChange(categories)
    })

    return unsubscribe
  }

  async remove(categoryId: string): Promise<void> {
    await deleteDoc(
      doc(db, 'categories', categoryId).withConverter(categoryConverter)
    )
  }
}
