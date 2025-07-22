import type { WatchProductionsRepository } from '@/data/contracts/production'
import type { ProductionModel } from '@/domain/models/production'

export class WatchProductionsRepositoryStub
  implements WatchProductionsRepository
{
  watchAll(
    onChange: WatchProductionsRepository.Params
  ): WatchProductionsRepository.Result {
    const productions: ProductionModel[] = [
      {
        id: 'any_production_id',
        product: {
          id: 'any_product_id',
          name: 'any_product_email@mail.com',
          price: 10,
          cost: 5,
          category: {
            id: 'any_category_id',
            name: 'any_category_name',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          stock: 100,
          unit: 'kg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        status: 'in_production',
        quantityProduced: 50,
        unit: 'kg',
        startDate: new Date(),
        harvestDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    onChange(productions)
    return () => {}
  }
}
