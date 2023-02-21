import API, { SignUpAPI } from '../api/signUpApi'
import { handleError } from '../../../utils/errorDescriptor'
import CommonController from '../../../controllers/commonController'
import routes from '../../../assets/const/routing'
import Router from '../../../router/index'

class SignUpController {
  private readonly api: SignUpAPI

  constructor() {
    this.api = API
  }

  @handleError()
  async signUp(data: Record<string, FormDataEntryValue>) {
      await this.api.signUp(data)
      await this.getMyUser()
  }

  @handleError()
  async getMyUser() {
    await CommonController.getMyUser()
    Router.navigate(routes.messenger)
  }
}

export default new SignUpController()
