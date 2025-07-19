import { UpdateProductImpl } from '@/data/usecases/product'
import type { UpdateProduct } from '@/domain/usecases/product'
import { UpdateProductRepositoryMock } from '@tests/data/mocks/product'
import { UploadServiceMock } from '@tests/data/mocks/services'

jest.useFakeTimers()

type SutTypes = {
  sut: UpdateProduct
  updateProductRepositoryMock: UpdateProductRepositoryMock
  uploadServiceMock: UploadServiceMock
}

const makeSut = (): SutTypes => {
  const updateProductRepositoryMock = new UpdateProductRepositoryMock()
  const uploadServiceMock = new UploadServiceMock()
  const sut = new UpdateProductImpl(
    uploadServiceMock,
    updateProductRepositoryMock
  )
  return {
    sut,
    updateProductRepositoryMock,
    uploadServiceMock,
  }
}

describe('UpdateProduct usecase', () => {
  it('should call UploadService with correct values if image is provided', async () => {
    const { sut, uploadServiceMock } = makeSut()
    const uploadSpy = jest.spyOn(uploadServiceMock, 'upload')
    const params = {
      image: 'any_image',
    }

    await sut.execute('any_product_id', params)

    expect(uploadSpy).toHaveBeenCalledWith(
      'any_image',
      'products'
    )
  })

  it('should call UpdateProductRepository with correct values', async () => {
    const { sut, updateProductRepositoryMock } = makeSut()
    const updateSpy = jest.spyOn(updateProductRepositoryMock, 'update')
    const params = {
      image: new File([''], 'any_image.png', { type: 'image/png' }),
    }

    await sut.execute('any_product_id', params)

    expect(updateSpy).toHaveBeenCalledWith('any_product_id', {
      image: 'any_url',
    })
  })

  it('should not call UploadService if there is no image', async () => {
    const { sut, uploadServiceMock } = makeSut()
    const uploadSpy = jest.spyOn(uploadServiceMock, 'upload')

    await sut.execute('any_product_id', {
      name: 'any_name',
      price: 100,
      cost: 50,
      categoryId: 'any_category_id',
      stock: 10,
      minStock: 5,
      maxStock: 20,
      unit: 'kg',
      description: 'any_description',
    })

    expect(uploadSpy).not.toHaveBeenCalled()
  })

  it('should throw if UpdateProductRepository throws', async () => {
    const { sut, updateProductRepositoryMock } = makeSut()
    jest
      .spyOn(updateProductRepositoryMock, 'update')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute('any_product_id', {
      image: new File([''], 'any_image.png', { type: 'image/png' }),
    })

    await expect(promise).rejects.toThrow()
  })
})
