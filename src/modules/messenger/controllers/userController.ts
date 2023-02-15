import store from '../../../core/store'
import { showError } from '../../../ui/toast/toast'
import API, { UserAPI } from '../api/userApi'
import CommonApi from '../../../core/commonApi'
import { IUser } from '../../authorizationForm'

class UserController {
  private readonly api: UserAPI

  constructor() {
    this.api = API
  }

  async findUser(login: string) {
    try {
      const users = await this.api.findUser<IUser[]>(login)
      return users
    } catch (e: any) {
      showError(e.reason)
    }
  }

  async getUser(id: number) {
    try {
      const user = await this.api.getUser<IUser>(id)
      store.set('currentUser', user)
    } catch (e: any) {
      showError(e.reason)
    }
  }

  async getMyUser() {
    try {
      const user = await CommonApi.getMyUser()
      store.set('user', user)
    } catch (e: any) {
      showError(e.reason)
    }
  }
}

export default new UserController()
