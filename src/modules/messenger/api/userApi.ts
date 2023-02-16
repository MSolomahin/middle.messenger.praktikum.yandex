import http from '../../../utils/HTTPTransport'

export class UserAPI {
  findUser<T>(login: string) {
    return http.post<T>('/user/search', {
      body: { login }
    })
  }

  getUser<T>(id: number) {
    return http.get<T>(`/user/${id}`)
  }
}

export default new UserAPI()
