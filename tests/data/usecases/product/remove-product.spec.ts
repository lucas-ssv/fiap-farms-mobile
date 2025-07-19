import { RemoveProductImpl } from '@/data/usecases/product'
import { RemoveProductRepositoryMock } from '@tests/data/mocks/product'
import { RemoveStockMovementRepositoryMock } from '@tests/data/mocks/stock-movement'

type SutTypes = {
  sut: RemoveProductImpl
  removeProductRepositoryMock: RemoveProductRepositoryMock
  removeStockMovementRepositoryMock: RemoveStockMovementRepositoryMock
}

const makeSut = (): SutTypes => {
  const removeProductRepositoryMock = new RemoveProductRepositoryMock()
  const removeStockMovementRepositoryMock =
    new RemoveStockMovementRepositoryMock()
  const sut = new RemoveProductImpl(
    removeProductRepositoryMock,
    removeStockMovementRepositoryMock
  )
  return {
    sut,
    removeProductRepositoryMock,
    removeStockMovementRepositoryMock,
  }
}

describe('RemoveProduct usecase', () => {
  it('should call RemoveProductRepository with correct values', async () => {
    const { sut, removeProductRepositoryMock } = makeSut()
    const removeSpy = jest.spyOn(removeProductRepositoryMock, 'remove')

    await sut.execute('any_product_id')

    expect(removeSpy).toHaveBeenCalledWith('any_product_id')
  })

  it('should call RemoveStockMovementRepository with correct values', async () => {
    const { sut, removeStockMovementRepositoryMock } = makeSut()
    const removeSpy = jest.spyOn(
      removeStockMovementRepositoryMock,
      'removeByProductId'
    )

    await sut.execute('any_product_id')

    expect(removeSpy).toHaveBeenCalledWith('any_product_id')
  })

  it('should throw if RemoveProductRepository throws', async () => {
    const { sut, removeProductRepositoryMock } = makeSut()
    jest
      .spyOn(removeProductRepositoryMock, 'remove')
      .mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.execute('any_product_id')

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  it('should throw if RemoveStockMovementRepository throws', async () => {
    const { sut, removeStockMovementRepositoryMock } = makeSut()
    jest
      .spyOn(removeStockMovementRepositoryMock, 'removeByProductId')
      .mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.execute('any_product_id')

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
