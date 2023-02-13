import HTTPTransport from '../../../utils/HTTPTransport'

class SignUpAPI {
  async create(data: Record<string, FormDataEntryValue>) {
    return await HTTPTransport.post<XMLHttpRequest>(
      '/auth/signup',
      {
        body: JSON.stringify(data)
      }
    )
      .then((data) => data)
      .catch((error) => error)
  }
}

export default new SignUpAPI()
