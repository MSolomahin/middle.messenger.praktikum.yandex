// import store from '../../../core/store'
import store from '../../../core/store'
import { showError } from '../../../ui/toast/toast'
import API, { UserAPI } from '../api/userApi'
import ChatsController from './chatsController'
import CommonAPI from '../../../core/commonApi/userApi'

class UserController {
  private readonly api: UserAPI

  constructor() {
    this.api = API
  }

  async findUser(login: string) {
    const user = await this.api.findUser(login)
    const chatId = store.getState().selectedChat

    if (user?.[0]?.id && chatId) {
        ChatsController.addUserToChat(user[0].id, chatId)
    }
  }

  getMyUser() {
    void CommonAPI.getMyUser().then((data) => {
      if ('reason' in data) {
        showError(data.response.reason)
      } else {
        store.set('user', data)
      }
    })
  }

  getUser(id: number) {
    void this.api.getUser(id).then((data) => {
      if ('reason' in data) {
        showError(data.response.reason)
      } else {
        store.set('currentUser', data)
      }
    })
  }
}

export default new UserController()
