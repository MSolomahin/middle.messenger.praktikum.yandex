import { IUser } from '../../../store/types'
import http from '../../../utils/HTTPTransport'

export class SettingsAPI {
  logOut() {
    return http.post('/auth/logout')
  }

  updateSettings<T>(body: Omit<IUser, 'avatar' | 'id'>) {
    return http.put<T>('/user/profile', { body })
  }

  updatePassword(oldPassword: string, newPassword: string) {
    return http.put('/user/password', { body: { oldPassword, newPassword } })
  }

  uploadAvatar(body: FormData) {
    return http.put('/user/profile/avatar', { body })
  }
}

export default new SettingsAPI()
