import { UpdateSaleImpl } from '@/data/usecases/sale'
import type { UpdateSale } from '@/domain/usecases/sale'
import { UpdateSaleRepositoryMock } from '@tests/data/mocks/sale'

type SutTypes = {
  sut: UpdateSale
  updateSaleRepositoryMock: UpdateSaleRepositoryMock
}

const makeSut = (): SutTypes => {
  const updateSaleRepositoryMock = new UpdateSaleRepositoryMock()
  const sut = new UpdateSaleImpl(updateSaleRepositoryMock)
  return {
    sut,
    updateSaleRepositoryMock,
  }
}

describe('UpdateSale usecase', () => {
  it('should call UpdateSaleRepository with correct values', async () => {
    const { sut, updateSaleRepositoryMock } = makeSut()
    const updateSpy = jest.spyOn(updateSaleRepositoryMock, 'update')
    const params: UpdateSale.Params = {
      status: 'completed',
    }

    await sut.execute('any_sale_id', params)

    expect(updateSpy).toHaveBeenCalledWith('any_sale_id', {
      status: 'completed',
    })
  })

  it('should throw if UpdateSaleRepository throws', async () => {
    const { sut, updateSaleRepositoryMock } = makeSut()
    jest
      .spyOn(updateSaleRepositoryMock, 'update')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute('any_sale_id', {
      status: 'completed',
    })

    await expect(promise).rejects.toThrow()
  })
})
