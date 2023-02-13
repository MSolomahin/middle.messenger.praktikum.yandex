import HTTPTransport from '../../../utils/HTTPTransport'

export interface UpdatePasswordRequestProps {
  oldPassword: string
  newPassword: string
}

export interface UpdateSettingsRequestProps {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

class SettingsAPI {
  async logOut() {
    return await HTTPTransport.post<XMLHttpRequest>(
      '/auth/logout'
    )
      .then((data) => data)
      .catch((error) => error)
  }

  async updateSettingsRequest(data: UpdateSettingsRequestProps) {
    return await HTTPTransport.put<XMLHttpRequest>(
      '/user/profile',
      {
        body: JSON.stringify(data)
      }
    )
      .then((data) => data)
      .catch((error) => error)
  }

  async changePasswordRequest(data: UpdatePasswordRequestProps) {
    return await HTTPTransport.put<XMLHttpRequest>(
      '/user/password',
      {
        body: JSON.stringify(data)
      }
    )
      .then((data) => data)
      .catch((error) => error)
  }

  async uploadAvatar(data: FormData) {
    return await HTTPTransport.put<XMLHttpRequest>(
      '/user/profile/avatar',
      {
        body: data
      }
    )
      .then((data) => data)
      .catch((error) => error)
  }
}

export default new SettingsAPI()
