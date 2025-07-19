import { LoadCustomersImpl } from '@/data/usecases/customer'
import { LoadCustomersRepositoryStub } from '@tests/data/mocks/customer'
import { mockCustomersResult } from '@tests/data/mocks/customer/mocks'

jest.useFakeTimers()

type SutTypes = {
  sut: LoadCustomersImpl
  loadCustomersRepositoryStub: LoadCustomersRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadCustomersRepositoryStub = new LoadCustomersRepositoryStub()
  const sut = new LoadCustomersImpl(loadCustomersRepositoryStub)
  return {
    sut,
    loadCustomersRepositoryStub,
  }
}

describe('LoadCustomers usecase', () => {
  it('should call LoadCustomersRepository with correct values', async () => {
    const { sut, loadCustomersRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadCustomersRepositoryStub, 'loadAll')

    await sut.execute()

    expect(loadAllSpy).toHaveBeenCalled()
  })

  it('should return a list of customers on success', async () => {
    const { sut } = makeSut()

    const customers = await sut.execute()

    expect(customers).toEqual(mockCustomersResult())
  })

  it('should throw if LoadCustomersRepository throws', async () => {
    const { sut, loadCustomersRepositoryStub } = makeSut()
    jest
      .spyOn(loadCustomersRepositoryStub, 'loadAll')
      .mockRejectedValueOnce(new Error('Repository error'))

    const promise = sut.execute()

    await expect(promise).rejects.toThrow('Repository error')
  })
})
