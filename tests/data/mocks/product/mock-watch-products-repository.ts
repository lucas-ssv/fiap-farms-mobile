import type { WatchProductsRepository } from '@/data/contracts/product'
import type { ProductModel } from '@/domain/models/product'

export class WatchProductsRepositoryStub implements WatchProductsRepository {
  watchAll(
    onChange: WatchProductsRepository.Params
  ): WatchProductsRepository.Result {
    const products: ProductModel[] = [
      {
        id: 'any_product_id',
        name: 'any_name',
        price: 100,
        cost: 50,
        category: {
          id: 'any_category_id',
          name: 'any_category_name',
          description: 'any_category_description',
          image: 'any_category_image',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        stock: 10,
        minStock: 5,
        maxStock: 20,
        unit: 'kg',
        description: 'any_description',
        image: 'any_image',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    onChange(products)
    return () => {}
  }
}
