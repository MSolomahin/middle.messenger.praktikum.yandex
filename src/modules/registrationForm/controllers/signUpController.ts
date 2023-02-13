import routes from '../../../assets/const/routing'
import store from '../../../core/store'
import Router from '../../../router'
import { showError } from '../../../ui/toast/toast'
import SignUpAPI from '../api/signUpApi'

class SignUpController {
  addUser(data: Record<string, FormDataEntryValue>) {
    void SignUpAPI.create(data).then((data) => {
      if ('reason' in data) {
        showError(data.reason)
      } else {
        store.set('user', data)
        localStorage.setItem('authorized', 'true')
        Router.navigate(routes.messenger)
      }
    })
  }
}

export default new SignUpController()
