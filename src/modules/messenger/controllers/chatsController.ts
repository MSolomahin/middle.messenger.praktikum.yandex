import store from '../../../core/store'
import { getTime } from '../../../utils/getTime'
import { IUser } from '../../authorizationForm'
import API, { ChatsAPI } from '../api/chatsApi'
import MessagesController from './messagesController'

class ChatsController {
  private readonly api: ChatsAPI

  constructor() {
    this.api = API
  }

  async getChats(query: Record<string, string> = {}) {
    const chats = await this.api.getChats(query)

    chats.forEach((chat) => {
      if (chat.last_message) {
        chat.last_message.time = getTime(chat.last_message?.time)
      }
    })

    chats.forEach(async (chat) => {
      const token = await this.getChatToken(chat.id)
      await MessagesController.connect(chat.id, token)
    })

    chats.forEach(async (chat) => {
      const users = await this.getUsersOfChat<IUser[]>(chat.id)
      const myId = store.getState().user.id
      if (!myId) return
      const usersWithoutMe = users.filter((user) => user.id !== myId)
      if (usersWithoutMe.length === 1) {
        chat.avatar = usersWithoutMe[0].avatar
        chat.title = usersWithoutMe[0].first_name
      }
    })
    store.set('chats', chats)
  }

  async createChat(title: string) {
    await this.api.createChat(title)

    void this.getChats()
  }

  addUserToChat(userId: number, chatId: number) {
    void this.api.addUserToChat([userId], chatId)
  }

  async getChatToken(id: number) {
    return this.api.getChatToken(id)
  }

  async delete(id: number) {
    await this.api.delete(id)
    this.selectChat(null)
    void this.getChats()
  }

  selectChat(id: number | null) {
    store.set('selectedChat', id)
  }

  getUsersOfChat<T>(chatId: number): Promise<T> {
    return this.api.getUsersOfChat<T>(chatId)
  }
}

export default new ChatsController()
