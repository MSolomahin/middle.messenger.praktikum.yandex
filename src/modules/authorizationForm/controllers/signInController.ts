import routes from '../../../assets/const/routing'
import { showError } from '../../../ui/toast/toast'
import SignInAPI from '../api/signInApi'
import Router from '../../../router'

class SignInController {
  logIn(data: Record<string, FormDataEntryValue>) {
    void SignInAPI.logIn(data).then((data) => {
      if (data && 'reason' in data) {
        showError(data.reason)
      } else {
        localStorage.setItem('authorized', 'true')
        Router.navigate(routes.messenger)
      }
    })
  }
}

export default new SignInController()
