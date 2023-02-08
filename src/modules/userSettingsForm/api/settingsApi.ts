import HTTPTransport from '../../../utils/HTTPTransport'

class SettingsAPI {
  baseUrl: string = 'https://ya-praktikum.tech/api/v2'
  async logOut() {
    return await HTTPTransport.post<XMLHttpRequest>(
      `${this.baseUrl}/auth/logout`,
      {
        headers: {
          'content-type': 'application/json'
        }
      }
    )
      .then((data) => data)
      .catch((error) => error)
  }
}

export default new SettingsAPI()
