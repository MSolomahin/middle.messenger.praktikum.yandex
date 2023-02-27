import routes from '../../../assets/const/routing'
import store from '../../../store'
import Router from '../../../router'
import API from '../api/settingsApi'
import { handleError } from '../../../utils/errorDescriptor'
import { IUser } from '../../../store/types'
import { MessagesController } from '../../messenger'
import CommonController from '../../../controllers/commonController'

class SettingsController {
  @handleError()
  async getMyUser() {
    await CommonController.getMyUser()
  }

  @handleError()
  async logOut() {
      await API.logOut()
      localStorage.removeItem('user')
      MessagesController.closeAll()
      Router.navigate(routes.auth)
  }

  @handleError()
  async updateSettings(data: Omit<IUser, 'avatar' | 'id'>) {
      const user = await API.updateSettings<IUser>(data)
      store.set('user', user)
  }

  @handleError()
  async updatePassword(oldPassword: string, newPassword: string) {
      await API.updatePassword(oldPassword, newPassword)
  }

  @handleError()
  async uploadAvatar(data: FormData) {
      const user = await API.uploadAvatar(data)
      if (user) {
        store.set('user', user)
      }
  }
}

export default new SettingsController()
