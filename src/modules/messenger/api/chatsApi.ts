import http from '../../../utils/HTTPTransport'
import { IChat } from '../store/types'

export class ChatsAPI {
  getChats(query: Record<string, string> = {}): Promise<IChat[]> {
    return http
      .get<XMLHttpRequest>('/chats', {
        data: query
      })
      .then((data) => data)
      .catch((error) => error)
  }

  createChat(title: string) {
    return http.post<XMLHttpRequest>('/chats', {
      body: JSON.stringify({ title })
    })
  }

  addUserToChat(usersId: number[], chatId: number) {
    return http
      .put<XMLHttpRequest>('/chats/users', {
        body: JSON.stringify({ users: usersId, chatId })
      })
      .then((data) => data)
      .catch((error) => error)
  }

  async getChatToken(id: number) {
    const response = await http.post<{ token: string }>(`/chats/token/${id}`)
    return response.token
  }

  delete(id: number): Promise<unknown> {
    return http.delete('/chats', { body: JSON.stringify({ chatId: id }) })
  }

  getUsersOfChat<T>(chatId: number): Promise<T> {
    return http
      .get<XMLHttpRequest>(`/chats/${chatId}/users`)
      .then((data) => data)
      .catch((error) => error)
  }
}

export default new ChatsAPI()
