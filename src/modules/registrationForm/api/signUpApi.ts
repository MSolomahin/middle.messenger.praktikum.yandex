import http from '../../../utils/HTTPTransport'

export class SignUpAPI {
  signUp(data: Record<string, FormDataEntryValue>) {
    return http.post<{ id: number }>('/auth/signup', {
      body: JSON.stringify(data)
    })
  }
}

export default new SignUpAPI()
