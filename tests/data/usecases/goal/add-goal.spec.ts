import { AddGoalRepositoryMock } from '@tests/data/mocks/goal'
import { mockAddGoalParams } from './mocks'
import { AddGoalImpl } from '@/data/usecases/goal'

type SutTypes = {
  sut: AddGoalImpl
  addGoalRepositoryMock: AddGoalRepositoryMock
}

const makeSut = (): SutTypes => {
  const addGoalRepositoryMock = new AddGoalRepositoryMock()
  const sut = new AddGoalImpl(addGoalRepositoryMock)
  return {
    sut,
    addGoalRepositoryMock,
  }
}

describe('AddGoal usecase', () => {
  it('should call AddGoalRepository with correct values', async () => {
    const { sut, addGoalRepositoryMock } = makeSut()
    const addSpy = jest.spyOn(addGoalRepositoryMock, 'add')
    const params = mockAddGoalParams()

    await sut.execute(params)

    expect(addSpy).toHaveBeenCalledWith(params)
  })

  it('should throw if AddGoalRepository throws', async () => {
    const { sut, addGoalRepositoryMock } = makeSut()
    jest
      .spyOn(addGoalRepositoryMock, 'add')
      .mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.execute(mockAddGoalParams())

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
