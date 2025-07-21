import {
  RemoveCategoryImpl,
  UpdateCategoryImpl,
  WatchCategoriesImpl,
} from '@/data/usecases/category'
import { CategoryFirebaseRepository } from '@/infra/repositories/firebase/category'
import { UploadFirebaseService } from '@/infra/services/firebase'
import { Categories } from '@/presentation/screens/app/Products'

export function MakeCategories() {
  const categoryFirebaseRepository = new CategoryFirebaseRepository()
  const watchCategories = new WatchCategoriesImpl(categoryFirebaseRepository)
  const removeCategory = new RemoveCategoryImpl(categoryFirebaseRepository)
  const uploadService = new UploadFirebaseService()
  const updateCategory = new UpdateCategoryImpl(
    categoryFirebaseRepository,
    uploadService
  )
  return (
    <Categories
      watchCategories={watchCategories}
      removeCategory={removeCategory}
      updateCategory={updateCategory}
    />
  )
}
