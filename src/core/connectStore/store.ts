import set from '../../utils/set'
import EventBus from '../eventBus'

export enum StoreEvents {
    Updated = 'updated',
  }

export type Indexed<T = unknown> = {
  [key in string]: T
}

class Store extends EventBus {
  private readonly state: Indexed = {}

  public getState() {
    return this.state
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value)

    this.emit(StoreEvents.Updated)
  }
}

export default new Store()
