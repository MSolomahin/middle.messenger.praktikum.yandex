import routes from '../../../assets/const/routing'
import CommonApi from '../../../api/commonApi'
import store from '../../../store'
import Router from '../../../router'
import { showError } from '../../../ui/toast/toast'
import API, { SignUpAPI } from '../api/signUpApi'

class SignUpController {
  private readonly api: SignUpAPI

  constructor() {
    this.api = API
  }

  async signUp(data: Record<string, FormDataEntryValue>) {
    try {
      await this.api.signUp(data)
      await this.getMyUser()
    } catch (e: any) {
      showError(e.reason)
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

export default new SignUpController()
