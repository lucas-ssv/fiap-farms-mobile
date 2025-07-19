import type { LoadCategories } from '@/domain/usecases/category'

export const mockCategoriesResult = (): LoadCategories.Result => [
  {
    id: '1',
    name: 'Fruits',
    description: 'Fresh fruits',
    image: 'fruit.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Vegetables',
    description: 'Organic vegetables',
    image: 'vegetable.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
