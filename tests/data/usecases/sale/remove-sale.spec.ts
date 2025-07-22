import { RemoveSaleImpl } from '@/data/usecases/sale'
import { RemoveSaleRepositoryMock } from '@tests/data/mocks/sale'

type SutTypes = {
  sut: RemoveSaleImpl
  removeSaleRepositoryMock: RemoveSaleRepositoryMock
}

const makeSut = (): SutTypes => {
  const removeSaleRepositoryMock = new RemoveSaleRepositoryMock()
  const sut = new RemoveSaleImpl(removeSaleRepositoryMock)
  return {
    sut,
    removeSaleRepositoryMock,
  }
}

describe('RemoveSale usecase', () => {
  it('should call RemoveSaleRepository with correct values', async () => {
    const { sut, removeSaleRepositoryMock } = makeSut()
    const removeSpy = jest.spyOn(removeSaleRepositoryMock, 'remove')

    await sut.execute('any_sale_id')

    expect(removeSpy).toHaveBeenCalledWith('any_sale_id')
  })

  it('should throw if RemoveSaleRepository throws', async () => {
    const { sut, removeSaleRepositoryMock } = makeSut()
    jest
      .spyOn(removeSaleRepositoryMock, 'remove')
      .mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.execute('any_sale_id')

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
