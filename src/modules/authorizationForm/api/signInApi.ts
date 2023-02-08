import HTTPTransport from '../../../utils/HTTPTransport'

class SignInAPI {
  baseUrl: string = 'https://ya-praktikum.tech/api/v2'
  async logIn(data: Record<string, FormDataEntryValue>) {
    return await HTTPTransport.post<XMLHttpRequest>(
      `${this.baseUrl}/auth/signin`,
      {
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
      .then((data) => data)
      .catch((error) => error)
  }
}

export default new SignInAPI()
