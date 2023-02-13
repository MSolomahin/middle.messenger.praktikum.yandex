import { IMessage } from '../../modules/messenger'
import set from '../../utils/set'
import EventBus from '../eventBus'
import { initialState } from './initValues'
import { IChat, IUser } from './types'

export enum StoreEvents {
  Updated = 'updated'
}

export interface IStore {
  chats: IChat[]
  user: IUser
  messages: Record<string, IMessage[]>
  selectedChat: number | null
  selectedUser: IUser
}

export class Store extends EventBus {
  private readonly _state: IStore = initialState
  static STORE_NAME = 'appStore'

  constructor() {
    super()

    // const savedState = localStorage.getItem(Store.STORE_NAME)
    // const storeData = savedState ? JSON.parse(savedState) : {}

    // if ('messages' in storeData) {
    //   storeData.messages = {}
    // }
    // if ('user' in storeData) {
    //   storeData.user = {}
    // }

    // this._state = savedState ? storeData ?? {} : {}

    // this.on(StoreEvents.Updated, () => {
    //   localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state))
    // })
  }

  public getState() {
    return this._state
  }

  public set(path: string, value: unknown) {
    set(this._state, path, value)
    this.emit(StoreEvents.Updated)
  }
}

export default new Store()
