import http from '../../../utils/HTTPTransport'

export class ChatsAPI {
  getChats<T>(query: Record<string, string> = {}) {
    return http.get<T>('/chats', { data: query })
  }

  createChat(title: string) {
    return http.post('/chats', { body: { title } })
  }

  addUserToChat(usersId: number[], chatId: number) {
    return http.put('/chats/users', { body: { users: usersId, chatId } })
  }

  async getChatToken<T>(id: number) {
    return http.post<T>(`/chats/token/${id}`)
  }

  delete(id: number) {
    return http.delete('/chats', { body: { chatId: id } })
  }

  getUsersOfChat<T>(chatId: number) {
    return http.get<T>(`/chats/${chatId}/users`)
  }

  deleteUsersFromChat(usersId: number[], chatId: number) {
    return http.delete('/chats/users', { body: { users: usersId, chatId } })
  }
}

export default new ChatsAPI()
