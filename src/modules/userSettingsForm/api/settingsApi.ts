import http from '../../../utils/HTTPTransport'
import { IUser } from '../../authorizationForm'

export interface UpdatePasswordRequestProps {
  oldPassword: string
  newPassword: string
}

export class SettingsAPI {
  logOut() {
    return http.post<XMLHttpRequest>('/auth/logout')
  }

  updateSettings<T>(data: Omit<IUser, 'avatar' | 'id'>) {
    return http.put<T>('/user/profile', {
      body: JSON.stringify(data)
    })
  }

  updatePassword(oldPassword: string, newPassword: string) {
    return http.put('/user/password', {
      body: JSON.stringify({ oldPassword, newPassword })
    })
  }

  uploadAvatar(data: FormData) {
    return http.put('/user/profile/avatar', {
      body: data
    })
  }
}

export default new SettingsAPI()
