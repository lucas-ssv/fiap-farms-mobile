import type { WatchSalesRepository } from '@/data/contracts/sale'
import type { SaleModel } from '@/domain/models/sale'

export class WatchSalesRepositoryStub implements WatchSalesRepository {
  watchAll(onChange: WatchSalesRepository.Params): WatchSalesRepository.Result {
    const sales: SaleModel[] = [
      {
        id: 'any_sale_id',
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
        paymentMethod: 'credit_card',
        quantity: 1,
        saleDate: new Date(),
        status: 'completed',
        totalPrice: 100,
        unit: 'kg',
        unitPrice: 10,
        user: {
          id: 'any_user_id',
          userUID: 'any_user_uid',
          name: 'any_user_name',
          username: 'any_username',
          email: 'any_email@mail.com',
          password: 'any_password',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    onChange(sales)
    return () => {}
  }
}
