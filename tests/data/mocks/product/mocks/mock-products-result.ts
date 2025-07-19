import type { LoadProducts } from '@/domain/usecases/product'

export const mockProductsResult = (): LoadProducts.Result => {
  return [
    {
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
    {
      id: '2',
      name: 'Product 2',
      price: 200,
      cost: 100,
      category: {
        id: 'cat2',
        name: 'Category 2',
        description: 'Description of Category 2',
        image: 'category2.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      stock: 20,
      minStock: 10,
      maxStock: 30,
      unit: 'kg',
      description: 'Description of Product 2',
      image: 'image2.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}
