import store from '../store'
import { handleError } from '../utils/errorDescriptor'
import CommonApi from '../api/commonApi'

class CommonController {
  @handleError()
  async getMyUser() {
    const user = await CommonApi.getMyUser()
    store.set('user', user)
    localStorage.setItem('user', JSON.stringify(user))
  }
}

export default new CommonController()
