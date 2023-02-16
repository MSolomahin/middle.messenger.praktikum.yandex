import http from '../../../utils/HTTPTransport'

export class SignInAPI {
  logIn(body: Record<string, unknown>) {
    return http.post('/auth/signin', { body })
  }
}

export default new SignInAPI()
