import routes from '../../../assets/const/routing'
import API from '../api/signInApi'
import Router from '../../../router'
import store from '../../../store'
import CommonApi from '../../../api/commonApi'
import { handleError } from '../../../utils/errorDescriptor'

class SignInController {
  @handleError()
  async logIn(data: Record<string, FormDataEntryValue>) {
      await API.logIn(data)
      await this.getMyUser()
  }

  @handleError()
  async getMyUser() {
      const user = await CommonApi.getMyUser()
      store.set('user', user)
      localStorage.setItem('signedIn', 'true')
      Router.navigate(routes.messenger)
  }
}

export default new SignInController()
