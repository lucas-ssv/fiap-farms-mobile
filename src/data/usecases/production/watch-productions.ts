import type { WatchProductionsRepository } from '@/data/contracts/production'
import type { WatchProductions } from '@/domain/usecases/production'

export class WatchProductionsImpl implements WatchProductions {
  private watchProductionsRepository: WatchProductionsRepository

  constructor(watchProductionsRepository: WatchProductionsRepository) {
    this.watchProductionsRepository = watchProductionsRepository
  }

  execute(onChange: WatchProductions.Params): WatchProductions.Result {
    return this.watchProductionsRepository.watchAll(onChange)
  }
}
