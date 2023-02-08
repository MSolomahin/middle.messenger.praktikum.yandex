import routes from '../../../assets/const/routing'
import store from '../../../core/connectStore/store'
import Router from '../../../router'
import { showError } from '../../../ui/toast/toast'
import SignUpAPI from '../api/signUpApi'

class SignUpController {
  addUser(data: Record<string, FormDataEntryValue>) {
    void SignUpAPI.create(data).then((data) => {
      const response = JSON.parse(data.response)
      if (data.status === 200) {
        store.set('user', response)
      } else if (data.status === 409) {
        Router.navigate(routes.auth)
        showError(response.reason)
      } else {
        showError(response.reason)
      }
    })
  }
}

export default new SignUpController()
