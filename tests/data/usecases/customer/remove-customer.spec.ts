import { RemoveCustomerImpl } from '@/data/usecases/customer'
import { RemoveCustomerRepositoryMock } from '@tests/data/mocks/customer'

type SutTypes = {
  sut: RemoveCustomerImpl
  removeCustomerRepositoryMock: RemoveCustomerRepositoryMock
}

const makeSut = (): SutTypes => {
  const removeCustomerRepositoryMock = new RemoveCustomerRepositoryMock()
  const sut = new RemoveCustomerImpl(removeCustomerRepositoryMock)
  return {
    sut,
    removeCustomerRepositoryMock,
  }
}

describe('RemoveCustomer usecase', () => {
  it('should call RemoveCustomerRepository with correct values', async () => {
    const { sut, removeCustomerRepositoryMock } = makeSut()
    const removeSpy = jest.spyOn(removeCustomerRepositoryMock, 'remove')

    await sut.execute('any_customer_id')

    expect(removeSpy).toHaveBeenCalledWith('any_customer_id')
  })

  it('should throw if RemoveCustomerRepository throws', async () => {
    const { sut, removeCustomerRepositoryMock } = makeSut()
    jest
      .spyOn(removeCustomerRepositoryMock, 'remove')
      .mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.execute('any_customer_id')

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
