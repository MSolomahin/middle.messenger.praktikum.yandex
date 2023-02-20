import routes from '../../../assets/const/routing'
import API from '../api/signInApi'
import Router from '../../../router'
import store from '../../../store'
import CommonApi from '../../../api/commonApi'
import {
  handleError,
  isClientError,
  isServerError
} from '../../../utils/errorDescriptor'
import { showError } from '../../../ui/toast/toast'

class SignInController {
  async logIn(data: Record<string, FormDataEntryValue>) {
    try {
      await API.logIn(data)
      await this.getMyUser()
    } catch (error: any) {
      if (isServerError(error)) {
        if (error.reason === 'User already in system') {
          await this.getMyUser()
        } else {
          showError(error.reason)
        }
      }
      if (isClientError(error)) showError(error.message)
    }
  }

  @handleError()
  async getMyUser() {
    const user = await CommonApi.getMyUser()
    store.set('user', user)
    localStorage.setItem('user', JSON.stringify(user))

    Router.navigate(routes.messenger)
  }
}

export default new SignInController()
