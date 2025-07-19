import { WatchProductsImpl } from '@/data/usecases/product'
import { WatchProductsRepositoryStub } from '@tests/data/mocks/product'

type SutTypes = {
  sut: WatchProductsImpl
  watchProductsRepositoryStub: WatchProductsRepositoryStub
}

const makeSut = (): SutTypes => {
  const watchProductsRepositoryStub = new WatchProductsRepositoryStub()
  const sut = new WatchProductsImpl(watchProductsRepositoryStub)
  return {
    sut,
    watchProductsRepositoryStub,
  }
}

describe('WatchProducts usecase', () => {
  it('should call WatchProductsRepository with correct values', async () => {
    const { sut, watchProductsRepositoryStub } = makeSut()
    const watchAllSpy = jest.spyOn(watchProductsRepositoryStub, 'watchAll')
    const onChange = jest.fn()

    await sut.execute(onChange)

    expect(watchAllSpy).toHaveBeenCalledWith(onChange)
  })

  it('should return an unsubscribe function', async () => {
    const { sut, watchProductsRepositoryStub } = makeSut()
    const unsubscribeSpy = jest.fn()
    jest
      .spyOn(watchProductsRepositoryStub, 'watchAll')
      .mockReturnValueOnce(unsubscribeSpy)
    const onChange = jest.fn()

    const unsubscribe = await sut.execute(onChange)

    expect(unsubscribe).toBe(unsubscribeSpy)
  })
})
