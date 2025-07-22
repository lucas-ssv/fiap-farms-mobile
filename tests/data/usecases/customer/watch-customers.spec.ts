import { WatchCustomersImpl } from '@/data/usecases/customer'
import { WatchCustomersRepositoryStub } from '@tests/data/mocks/customer'

type SutTypes = {
  sut: WatchCustomersImpl
  watchCustomersRepositoryStub: WatchCustomersRepositoryStub
}

const makeSut = (): SutTypes => {
  const watchCustomersRepositoryStub = new WatchCustomersRepositoryStub()
  const sut = new WatchCustomersImpl(watchCustomersRepositoryStub)
  return {
    sut,
    watchCustomersRepositoryStub,
  }
}

describe('WatchCustomers usecase', () => {
  it('should call WatchCustomersRepository with correct values', async () => {
    const { sut, watchCustomersRepositoryStub } = makeSut()
    const watchAllSpy = jest.spyOn(watchCustomersRepositoryStub, 'watchAll')
    const onChange = jest.fn()

    sut.execute(onChange)

    expect(watchAllSpy).toHaveBeenCalledWith(onChange)
  })

  it('should return an unsubscribe function', async () => {
    const { sut, watchCustomersRepositoryStub } = makeSut()
    const unsubscribeSpy = jest.fn()
    jest
      .spyOn(watchCustomersRepositoryStub, 'watchAll')
      .mockReturnValueOnce(unsubscribeSpy)
    const onChange = jest.fn()

    const unsubscribe = sut.execute(onChange)

    expect(unsubscribe).toBe(unsubscribeSpy)
  })
})
