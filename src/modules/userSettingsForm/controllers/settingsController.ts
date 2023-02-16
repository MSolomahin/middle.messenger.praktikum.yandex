import routes from '../../../assets/const/routing'
import store from '../../../core/store'
import Router from '../../../router'
import API from '../api/settingsApi'
import CommonApi from '../../../core/commonApi'
import { IUser } from '../../authorizationForm'
import { handleError } from '../../../utils/errorDescriptor'

class SettingsController {
  @handleError()
  async getMyUser() {
      const user = await CommonApi.getMyUser()
      store.set('user', user)
  }

  @handleError()
  async logOut() {
      await API.logOut()
      localStorage.setItem('signedIn', '')
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
      store.set('user', user)
  }
}

export default new SettingsController()
