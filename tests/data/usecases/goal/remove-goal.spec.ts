import { RemoveGoalImpl } from '@/data/usecases/goal'
import { RemoveGoalRepositoryMock } from '@tests/data/mocks/goal'

type SutTypes = {
  sut: RemoveGoalImpl
  removeGoalRepositoryMock: RemoveGoalRepositoryMock
}

const makeSut = (): SutTypes => {
  const removeGoalRepositoryMock = new RemoveGoalRepositoryMock()
  const sut = new RemoveGoalImpl(removeGoalRepositoryMock)
  return {
    sut,
    removeGoalRepositoryMock,
  }
}

describe('RemoveGoal usecase', () => {
  it('should call RemoveGoalRepository with correct values', async () => {
    const { sut, removeGoalRepositoryMock } = makeSut()
    const removeSpy = jest.spyOn(removeGoalRepositoryMock, 'remove')

    await sut.execute('any_goal_id')

    expect(removeSpy).toHaveBeenCalledWith('any_goal_id')
  })

  it('should throw if RemoveGoalRepository throws', async () => {
    const { sut, removeGoalRepositoryMock } = makeSut()
    jest
      .spyOn(removeGoalRepositoryMock, 'remove')
      .mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.execute('any_goal_id')

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
