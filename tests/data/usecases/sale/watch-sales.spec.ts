import { WatchSalesImpl } from '@/data/usecases/sale'
import { WatchSalesRepositoryStub } from '@tests/data/mocks/sale'

type SutTypes = {
  sut: WatchSalesImpl
  watchSalesRepositoryStub: WatchSalesRepositoryStub
}

const makeSut = (): SutTypes => {
  const watchSalesRepositoryStub = new WatchSalesRepositoryStub()
  const sut = new WatchSalesImpl(watchSalesRepositoryStub)
  return {
    sut,
    watchSalesRepositoryStub,
  }
}

describe('WatchSales usecase', () => {
  it('should call WatchSalesRepository with correct values', async () => {
    const { sut, watchSalesRepositoryStub } = makeSut()
    const watchAllSpy = jest.spyOn(watchSalesRepositoryStub, 'watchAll')
    const onChange = jest.fn()

    sut.execute(onChange)

    expect(watchAllSpy).toHaveBeenCalledWith(onChange)
  })

  it('should return an unsubscribe function', async () => {
    const { sut, watchSalesRepositoryStub } = makeSut()
    const unsubscribeSpy = jest.fn()
    jest
      .spyOn(watchSalesRepositoryStub, 'watchAll')
      .mockReturnValueOnce(unsubscribeSpy)
    const onChange = jest.fn()

    const unsubscribe = sut.execute(onChange)

    expect(unsubscribe).toBe(unsubscribeSpy)
  })
})
