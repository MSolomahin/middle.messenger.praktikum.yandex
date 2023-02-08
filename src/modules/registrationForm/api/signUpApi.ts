import HTTPTransport from '../../../utils/HTTPTransport'

class SignUpAPI {
  baseUrl: string = 'https://ya-praktikum.tech/api/v2'
  async create(data: Record<string, FormDataEntryValue>) {
    return await HTTPTransport.post<XMLHttpRequest>(
      `${this.baseUrl}/auth/signup`,
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

export default new SignUpAPI()
