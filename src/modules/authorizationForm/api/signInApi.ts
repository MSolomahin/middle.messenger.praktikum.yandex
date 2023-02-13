import HTTPTransport from '../../../utils/HTTPTransport'

class SignInAPI {
  async logIn(data: Record<string, FormDataEntryValue>) {
    return await HTTPTransport.post<XMLHttpRequest>(
      '/auth/signin',
      {
        body: JSON.stringify(data)
      }
    )
      .then((data) => data)
      .catch((error) => error)
  }
}

export default new SignInAPI()
