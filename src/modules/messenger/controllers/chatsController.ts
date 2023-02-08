import store from '../../../core/connectStore/store'
import ChatsAPI from '../api/chatsApi'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ChatsController {
  static getChats() {
    void ChatsAPI.request().then((data) => { store.set('chats', data) })
  }
}
