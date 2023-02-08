import store from '../../../core/connectStore/store'
import { showError } from '../../../ui/toast/toast'
import SignInAPI from '../api/signInApi'

class SignInController {
  logIn(data: Record<string, FormDataEntryValue>) {
    void SignInAPI.logIn(data)
    .then((data) => {
      if (data.status === 200) {
        store.set('user', data)
      } else {
        const response = JSON.parse(data.response)
        showError(response.reason)
      }
    })
  }
}

export default new SignInController()
