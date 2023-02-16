import store from '../../../core/store'
import API from '../api/userApi'
import CommonApi from '../../../core/commonApi'
import { IUser } from '../../authorizationForm'
import { handleError } from '../../../utils/errorDescriptor'

class UserController {
  @handleError()
  async findUser(login: string) {
      const users = await API.findUser<IUser[]>(login)
      return users
  }

  @handleError()
  async getUser(id: number) {
      const user = await API.getUser<IUser>(id)
      store.set('currentUser', user)
  }

  @handleError()
  async getMyUser() {
      const user = await CommonApi.getMyUser()
      store.set('user', user)
  }
}

export default new UserController()
