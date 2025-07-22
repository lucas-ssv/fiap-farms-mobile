import { UpdateCustomerImpl } from '@/data/usecases/customer'
import type { UpdateCustomer } from '@/domain/usecases/customer'
import { UpdateCustomerRepositoryMock } from '@tests/data/mocks/customer'

type SutTypes = {
  sut: UpdateCustomer
  updateCustomerRepositoryMock: UpdateCustomerRepositoryMock
}

const makeSut = (): SutTypes => {
  const updateCustomerRepositoryMock = new UpdateCustomerRepositoryMock()
  const sut = new UpdateCustomerImpl(updateCustomerRepositoryMock)
  return {
    sut,
    updateCustomerRepositoryMock,
  }
}

describe('UpdateCustomer usecase', () => {
  it('should call UpdateCustomerRepository with correct values', async () => {
    const { sut, updateCustomerRepositoryMock } = makeSut()
    const updateSpy = jest.spyOn(updateCustomerRepositoryMock, 'update')
    const params = {
      name: 'any_name',
    }

    await sut.execute('any_customer_id', params)

    expect(updateSpy).toHaveBeenCalledWith('any_customer_id', params)
  })

  it('should throw if UpdateCustomerRepository throws', async () => {
    const { sut, updateCustomerRepositoryMock } = makeSut()
    jest
      .spyOn(updateCustomerRepositoryMock, 'update')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute('any_customer_id', {
      name: 'any_name',
    })

    await expect(promise).rejects.toThrow()
  })
})
