import type { LoadStockMovementsByProductIdRepository } from '@/data/contracts/stock-movement/load-stock-movements-by-product-id-repository'

export const mockStockMovementsResult =
  (): LoadStockMovementsByProductIdRepository.Result => {
    return [
      {
        id: 'any_stock_movement_id',
        product: {
          id: '1',
          name: 'Product 1',
          price: 100,
          cost: 50,
          category: {
            id: 'cat1',
            name: 'Category 1',
            description: 'Description of Category 1',
            image: 'category1.png',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          stock: 10,
          minStock: 5,
          maxStock: 20,
          unit: 'kg',
          description: 'Description of Product 1',
          image: 'image1.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        user: {
          id: 'user-1',
          name: 'User 1',
          email: 'user1@example.com',
          username: 'user1',
        },
        quantity: 10,
        type: 'input',
        date: new Date(),
        reason: 'Initial stock',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
  }
