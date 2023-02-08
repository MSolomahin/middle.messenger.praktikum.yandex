import store from '../../../core/connectStore/store'
import Router from '../../../router'
import { showError } from '../../../ui/toast/toast'
import SettingsAPI from '../api/settingsApi'

class SettingsController {
  logOut() {
    void SettingsAPI.logOut()
      .then((data) => {
        if (data.status === 200) {
            store.set('user', {})
            Router.navigate('/')
          } else {
            const response = JSON.parse(data.response)
            showError(response.reason)
          }
      })
  }
}

export default new SettingsController()
