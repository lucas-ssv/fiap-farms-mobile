import { LoadCategoriesImpl } from '@/data/usecases/category'
import {
  LoadProductsImpl,
  RemoveProductImpl,
  UpdateProductImpl,
  WatchProductsImpl,
} from '@/data/usecases/product'
import { CategoryFirebaseRepository } from '@/infra/repositories/firebase/category'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { StockMovementFirebaseRepository } from '@/infra/repositories/firebase/stock-movement'
import { UploadFirebaseService } from '@/infra/services/firebase'
import { Products } from '@/presentation/screens/app/Products'

export function MakeProducts() {
  const categoryFirebaseRepository = new CategoryFirebaseRepository()
  const loadCategories = new LoadCategoriesImpl(categoryFirebaseRepository)
  const loadProducts = new LoadProductsImpl(new ProductFirebaseRepository())
  const watchProducts = new WatchProductsImpl(new ProductFirebaseRepository())
  const uploadService = new UploadFirebaseService()
  const updateProduct = new UpdateProductImpl(
    uploadService,
    new ProductFirebaseRepository()
  )
  const removeProduct = new RemoveProductImpl(
    new ProductFirebaseRepository(),
    new StockMovementFirebaseRepository()
  )
  return (
    <Products
      loadCategories={loadCategories}
      loadProducts={loadProducts}
      watchProducts={watchProducts}
      updateProduct={updateProduct}
      removeProduct={removeProduct}
    />
  )
}
