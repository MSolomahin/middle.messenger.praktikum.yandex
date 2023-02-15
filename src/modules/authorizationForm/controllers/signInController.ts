import routes from '../../../assets/const/routing'
import API, { SignInAPI } from '../api/signInApi'
import Router from '../../../router'
import store from '../../../core/store'
import { showError } from '../../../ui/toast/toast'
import CommonApi from '../../../core/commonApi'

class SignInController {
  private readonly api: SignInAPI

  constructor() {
    this.api = API
  }

  async logIn(data: Record<string, FormDataEntryValue>) {
    try {
      await this.api.logIn(data)
      await this.getMyUser()
    } catch (error: any) {
      showError(error.reason)
    }
  }

  async getMyUser() {
    try {
      const user = await CommonApi.getMyUser()
      store.set('user', user)
      localStorage.setItem('signedIn', 'true')
      Router.navigate(routes.messenger)
    } catch (e: any) {
      showError(e.reason)
    }
  }
}

export default new SignInController()
