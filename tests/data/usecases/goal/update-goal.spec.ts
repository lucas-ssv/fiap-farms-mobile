import { UpdateGoalImpl } from '@/data/usecases/goal'
import type { UpdateGoal } from '@/domain/usecases/goal'
import { UpdateGoalRepositoryMock } from '@tests/data/mocks/goal'

type SutTypes = {
  sut: UpdateGoal
  updateGoalRepositoryMock: UpdateGoalRepositoryMock
}

const makeSut = (): SutTypes => {
  const updateGoalRepositoryMock = new UpdateGoalRepositoryMock()
  const sut = new UpdateGoalImpl(updateGoalRepositoryMock)
  return {
    sut,
    updateGoalRepositoryMock,
  }
}

describe('UpdateGoal usecase', () => {
  it('should call UpdateGoalRepository with correct values', async () => {
    const { sut, updateGoalRepositoryMock } = makeSut()
    const updateSpy = jest.spyOn(updateGoalRepositoryMock, 'update')
    const params: UpdateGoal.Params = {
      type: 'production',
    }

    await sut.execute('any_goal_id', params)

    expect(updateSpy).toHaveBeenCalledWith('any_goal_id', {
      type: 'production',
    })
  })

  it('should throw if UpdateGoalRepository throws', async () => {
    const { sut, updateGoalRepositoryMock } = makeSut()
    jest
      .spyOn(updateGoalRepositoryMock, 'update')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute('any_goal_id', {
      type: 'production',
    })

    await expect(promise).rejects.toThrow()
  })
})
