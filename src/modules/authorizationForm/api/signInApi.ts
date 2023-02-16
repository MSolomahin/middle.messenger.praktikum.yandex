import http from '../../../utils/HTTPTransport'

export class SignInAPI {
  logIn(data: Record<string, unknown>) {
    return http.post('/auth/signin', {
      body: data
    })
  }
}

export default new SignInAPI()
