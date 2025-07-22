import { AddCategoryImpl } from '@/data/usecases/category'
import { CategoryFirebaseRepository } from '@/infra/repositories/firebase/category'
import { UploadFirebaseService } from '@/infra/services/firebase'
import { NewCategory } from '@/presentation/screens/app/Categories/NewCategory'

export function MakeNewCategory() {
  const categoryFirebaseRepository = new CategoryFirebaseRepository()
  const uploadFirebaseService = new UploadFirebaseService()

  const addCategory = new AddCategoryImpl(
    categoryFirebaseRepository,
    uploadFirebaseService,
    categoryFirebaseRepository // UpdateCategoryRepository
  )

  return <NewCategory addCategory={addCategory} />
}
