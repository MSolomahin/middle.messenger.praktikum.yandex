import API from '../api/signInApi'
import {
  handleError,
  isClientError,
  isServerError
} from '../../../utils/errorDescriptor'
import { showError } from '../../../ui/toast/toast'
import { Errors } from '../../../assets/const/errors'
import CommonController from '../../../controllers/commonController'
import Router from '../../../router/index'
import routes from '../../../assets/const/routing'

class SignInController {
  async logIn(data: Record<string, FormDataEntryValue>) {
    try {
      await API.logIn(data)
      await this.getMyUser()
    } catch (error: unknown) {
      if (isServerError(error)) {
        if (error.reason === Errors.ALREADY_IN_SYSTEM) {
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
    await CommonController.getMyUser()
    Router.navigate(routes.messenger)
  }
}

export default new SignInController()
