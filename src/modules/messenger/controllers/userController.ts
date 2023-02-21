import store from '../../../store'
import API from '../api/userApi'
import { handleError } from '../../../utils/errorDescriptor'
import { IUser } from '../../../store/types'
import CommonController from '../../../controllers/commonController'

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
    await CommonController.getMyUser()
  }
}

export default new UserController()
