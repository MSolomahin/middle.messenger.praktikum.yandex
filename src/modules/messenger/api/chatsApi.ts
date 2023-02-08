import { BaseAPI } from '../../../core/baseApi'
import HTTPTransport from '../../../utils/HTTPTransport'

class ChatsAPI extends BaseAPI {
  baseUrl: string = 'https://ya-praktikum.tech/api/v2'
  async request() {
    return await HTTPTransport.get<{ userId: number, id: number }>(
      `${this.baseUrl}/chats`,
      {}
    ).then((data) => data)
  }
}

export default new ChatsAPI()
