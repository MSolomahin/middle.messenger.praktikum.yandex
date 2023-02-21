import { IChat, IMessage } from '../modules/messenger'
import EventBus from '../core/eventBus'
import { initialState } from './initValues'
import { IUser } from './types'
import set from './helpers/set'

export enum StoreEvents {
  Updated = 'updated'
}

export interface IStore {
  chats: IChat[]
  chatsStatus: 'pending' | 'success' | 'error' | 'initial'
  user: IUser | null
  messages: Record<string, IMessage[]>
  selectedChat: number | null
}

export class Store extends EventBus {
  private readonly _state: IStore = initialState
  static STORE_NAME = 'appStore'

  public getState() {
    return this._state
  }

  public set(path: string, value: unknown) {
    set(this._state, path, value)
    this.emit(StoreEvents.Updated)
  }
}

export default new Store()
