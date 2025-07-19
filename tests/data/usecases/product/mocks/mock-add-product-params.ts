import type { AddProduct } from '@/domain/usecases/product'

export const mockAddProductParams = (): AddProduct.Params => {
  return {
    name: 'any_name',
    price: 100,
    cost: 50,
    userId: 'any_user_id',
    categoryId: 'any_category_id',
    stock: 10,
    minStock: 5,
    maxStock: 20,
    unit: 'kg',
    description: 'any_description',
    image: new File([''], 'any_image.png', { type: 'image/png' }),
  }
}
