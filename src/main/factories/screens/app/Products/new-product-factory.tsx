import { AddProductImpl } from '@/data/usecases/product'
import { LoadCategoriesImpl } from '@/data/usecases/category'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { CategoryFirebaseRepository } from '@/infra/repositories/firebase/category'
import { StockMovementFirebaseRepository } from '@/infra/repositories/firebase/stock-movement'
import { UploadFirebaseService } from '@/infra/services/firebase'
import { NewProduct } from '@/presentation/screens/app/Products/NewProduct'

export function MakeNewProduct() {
  const productFirebaseRepository = new ProductFirebaseRepository()
  const categoryFirebaseRepository = new CategoryFirebaseRepository()
  const stockMovementFirebaseRepository = new StockMovementFirebaseRepository()
  const uploadFirebaseService = new UploadFirebaseService()

  const addProduct = new AddProductImpl(
    productFirebaseRepository,
    uploadFirebaseService,
    productFirebaseRepository, // UpdateProductRepository
    stockMovementFirebaseRepository
  )
  const loadCategories = new LoadCategoriesImpl(categoryFirebaseRepository)

  return <NewProduct addProduct={addProduct} loadCategories={loadCategories} />
}
