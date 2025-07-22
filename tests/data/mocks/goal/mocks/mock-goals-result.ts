import type { GoalModel } from '@/domain/models/goal'

export const mockGoalsResult = (): GoalModel[] => {
  return [
    {
      id: 'goal1',
      user: {
        id: 'user1',
        name: 'User One',
        email: 'any_email@example.com',
        username: 'user_one',
      },
      product: {
        id: 'any_product_id',
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
      currentValue: 100,
      targetValue: 200,
      startDate: new Date(),
      deadline: new Date(),
      status: 'in_progress',
      type: 'sales',
      description: 'Goal for Product 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}
