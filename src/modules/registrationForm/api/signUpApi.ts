import http from '../../../utils/HTTPTransport'

export class SignUpAPI {
  signUp(body: Record<string, FormDataEntryValue>) {
    return http.post<{ id: number }>('/auth/signup', {
      body
    })
  }
}

export default new SignUpAPI()
