import type { AddCategory } from '@/domain/usecases/category'

export const mockAddCategoryParams = (): AddCategory.Params => ({
  name: 'any_name',
  description: 'any_description',
  image: new File([''], 'any_image.png', { type: 'image/png' }),
})
