import routes from '../../../assets/const/routing'
import store from '../../../core/store'
import Router from '../../../router'
import { showError } from '../../../ui/toast/toast'
import SettingsAPI, { UpdatePasswordRequestProps, UpdateSettingsRequestProps } from '../api/settingsApi'

class SettingsController {
  logOut() {
    void SettingsAPI.logOut().then((data) => {
      if (data && 'reason' in data) {
        showError(data.reason)
      } else {
        localStorage.setItem('authorized', '')
        Router.navigate(routes.auth)
        // store.clearStore()
      }
    })
  }

  updateSettings(data: UpdateSettingsRequestProps) {
    void SettingsAPI.updateSettingsRequest(data)
    .then((data) => {
      if ('reason' in data) {
        showError(data.reason)
      } else {
        store.set('user', data)
      }
    })
  }

  updatePassword(data: UpdatePasswordRequestProps) {
    void SettingsAPI.changePasswordRequest(data)
      .then((data) => {
        if ('reason' in data) showError(data.reason)
      })
  }

  uploadAvatar(data: FormData) {
    void SettingsAPI.uploadAvatar(data)
      .then((data) => {
        if ('reason' in data) {
          showError(data.reason)
        } else {
          store.set('user', data)
        }
      })
  }
}

export default new SettingsController()
