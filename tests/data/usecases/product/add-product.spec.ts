import { AddProductImpl } from '@/data/usecases/product'
import type { AddProduct } from '@/domain/usecases/product'
import {
  AddProductRepositoryMock,
  UpdateProductRepositoryMock,
} from '@tests/data/mocks/product'
import { mockAddProductParams } from './mocks'
import { UploadServiceMock } from '@tests/data/mocks/services'
import { AddStockMovementRepositoryMock } from '@tests/data/mocks/stock-movement'

type SutTypes = {
  sut: AddProduct
  addProductRepositoryMock: AddProductRepositoryMock
  uploadServiceMock: UploadServiceMock
  updateProductRepositoryMock: UpdateProductRepositoryMock
  addStockMovementRepositoryMock: AddStockMovementRepositoryMock
}

const makeSut = (): SutTypes => {
  const addProductRepositoryMock = new AddProductRepositoryMock()
  const uploadServiceMock = new UploadServiceMock()
  const updateProductRepositoryMock = new UpdateProductRepositoryMock()
  const addStockMovementRepositoryMock = new AddStockMovementRepositoryMock()
  const sut = new AddProductImpl(
    addProductRepositoryMock,
    uploadServiceMock,
    updateProductRepositoryMock,
    addStockMovementRepositoryMock
  )
  return {
    sut,
    addProductRepositoryMock,
    uploadServiceMock,
    updateProductRepositoryMock,
    addStockMovementRepositoryMock,
  }
}

describe('AddProduct usecase', () => {
  it('should call AddProductRepository with correct values', async () => {
    const { sut, addProductRepositoryMock } = makeSut()
    const addSpy = jest.spyOn(addProductRepositoryMock, 'add')
    const { image, ...dataWithoutImage } = mockAddProductParams()

    await sut.execute(dataWithoutImage)

    expect(addSpy).toHaveBeenCalledWith(dataWithoutImage)
  })

  it('should not call UploadService and UpdateProductRepository if there is no image to save', async () => {
    const { sut, uploadServiceMock, updateProductRepositoryMock } = makeSut()
    const uploadSpy = jest.spyOn(uploadServiceMock, 'upload')
    const updateSpy = jest.spyOn(updateProductRepositoryMock, 'update')
    const params = mockAddProductParams()
    params.image = undefined

    await sut.execute(params)

    expect(uploadSpy).not.toHaveBeenCalled()
    expect(updateSpy).not.toHaveBeenCalled()
  })

  it('should call UploadService if there is an image to save', async () => {
    const { sut, uploadServiceMock } = makeSut()
    const uploadSpy = jest.spyOn(uploadServiceMock, 'upload')
    const params = mockAddProductParams()

    await sut.execute(params)

    expect(uploadSpy).toHaveBeenCalledWith(params.image, 'products')
  })

  it('should call UpdateProductRepository if there is an image to save', async () => {
    const { sut, updateProductRepositoryMock } = makeSut()
    const updateSpy = jest.spyOn(updateProductRepositoryMock, 'update')
    const params = mockAddProductParams()

    await sut.execute(params)

    expect(updateSpy).toHaveBeenCalledWith('any_product_id', {
      image: 'any_url',
    })
  })

  it('should call AddStockMovementRepository with correct values', async () => {
    const { sut, addStockMovementRepositoryMock } = makeSut()
    const addSpy = jest.spyOn(addStockMovementRepositoryMock, 'add')
    const params = mockAddProductParams()

    await sut.execute(params)

    expect(addSpy).toHaveBeenCalledWith({
      productId: 'any_product_id',
      userId: 'any_user_id',
      type: 'input',
      quantity: params.stock,
      date: expect.any(Date),
      reason: 'Produto adicionado',
    })
  })

  it('should throw if AddProductRepository throws', async () => {
    const { sut, addProductRepositoryMock } = makeSut()
    jest.spyOn(addProductRepositoryMock, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.execute(mockAddProductParams())

    await expect(promise).rejects.toThrow()
  })

  it('should throw if UploadService throws', async () => {
    const { sut, uploadServiceMock } = makeSut()
    jest.spyOn(uploadServiceMock, 'upload').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.execute(mockAddProductParams())

    await expect(promise).rejects.toThrow()
  })

  it('should throw if UpdateProductRepository throws', async () => {
    const { sut, updateProductRepositoryMock } = makeSut()
    jest
      .spyOn(updateProductRepositoryMock, 'update')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute(mockAddProductParams())

    await expect(promise).rejects.toThrow()
  })

  it('should throw if AddStockMovementRepository throws', async () => {
    const { sut, addStockMovementRepositoryMock } = makeSut()
    jest
      .spyOn(addStockMovementRepositoryMock, 'add')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute(mockAddProductParams())

    await expect(promise).rejects.toThrow()
  })
})
