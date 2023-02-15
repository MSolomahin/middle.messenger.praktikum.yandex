import routes from '../../../assets/const/routing'
import store from '../../../core/store'
import Router from '../../../router'
import { showError } from '../../../ui/toast/toast'
import API, { SettingsAPI } from '../api/settingsApi'
import CommonApi from '../../../core/commonApi'
import { IUser } from '../../authorizationForm'

class SettingsController {
  private readonly api: SettingsAPI

  constructor() {
    this.api = API
  }

  async getMyUser() {
    try {
      const user = await CommonApi.getMyUser()
      store.set('user', user)
    } catch (e: any) {
      showError(e.reason)
    }
  }

  async logOut() {
    try {
      await this.api.logOut()
      localStorage.setItem('signedIn', '')
      Router.navigate(routes.auth)
    } catch (e: any) {
      showError(e.reason)
    }
  }

  async updateSettings(data: Omit<IUser, 'avatar' | 'id'>) {
    try {
      const user = await this.api.updateSettings<IUser>(data)
      store.set('user', user)
    } catch (e: any) {
      showError(e.reason)
    }
  }

  async updatePassword(oldPassword: string, newPassword: string) {
    try {
      await this.api.updatePassword(oldPassword, newPassword)
    } catch (e: any) {
      showError(e.reason)
    }
  }

  async uploadAvatar(data: FormData) {
    try {
      const user = await this.api.uploadAvatar(data)
      store.set('user', user)
    } catch (e: any) {
      showError(e.reason)
    }
  }
}

export default new SettingsController()
