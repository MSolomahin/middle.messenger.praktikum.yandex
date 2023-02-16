import store from '../../../core/store'
import { handleError } from '../../../utils/errorDescriptor'
import { getTime } from '../../../utils/getTime'
import { IUser } from '../../authorizationForm'
import API from '../api/chatsApi'
import { IChat } from '../store/types'
import MessagesController from './messagesController'

class ChatsController {
  @handleError()
  async getChats(query: Record<string, string> = {}) {
    const chats = await API.getChats<IChat[]>(query)

    chats.forEach((chat) => {
      if (chat.last_message) {
        chat.last_message.time = getTime(chat.last_message?.time)
      }
    })

    chats.forEach(async (chat) => {
      const token = await this.getChatToken(chat.id)
      await MessagesController.connect(chat.id, token)
    })

    const chatFull = await this.getChatsWithUser(chats)

    store.set('chats', chatFull)
  }

  private async getChatsWithUser(chats: IChat[]) {
    const chatsFull = []
    const myId = store.getState().user.id
    if (!myId) return

    for (const chat of chats) {
      const users = await this.getUsersOfChat(chat.id)
      const usersWithoutMe = users.filter((user) => user.id !== myId)
      if (usersWithoutMe.length === 1) {
        chat.avatar = usersWithoutMe[0].avatar
        chat.title = usersWithoutMe[0].first_name
      }
      chatsFull.push(chat)
    }
    return chatsFull
  }

  @handleError()
  async createChat(title: string) {
    await API.createChat(title)
    void this.getChats()
  }

  @handleError()
  async addUserToChat(userId: number, chatId: number) {
    await API.addUserToChat([userId], chatId)
    void this.getChats()
  }

  async getChatToken(id: number) {
    const response = await API.getChatToken<{ token: string }>(id)
    return response.token
  }

  @handleError()
  async delete(id: number) {
    await API.delete(id)
    this.selectChat(null)
    MessagesController.closeSocket(id)
    void this.getChats()
  }

  selectChat(id: number | null) {
    store.set('selectedChat', id)
  }

  private getUsersOfChat(chatId: number) {
    return API.getUsersOfChat<IUser[]>(chatId)
  }

  @handleError()
  async deleteUsersFromChat(usersId: number[]) {
    const chatId = store.getState().selectedChat
    if (!chatId) return
    await API.deleteUsersFromChat(usersId, chatId)
    void this.getChats()
  }
}

export default new ChatsController()
