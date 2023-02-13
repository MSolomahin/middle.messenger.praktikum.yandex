import { IUser } from '../../../core/store/types'
import http from '../../../utils/HTTPTransport'

export class UserAPI {
  findUser(login: string): Promise<IUser[]> {
    return http
      .post<XMLHttpRequest>('/user/search', {
        body: JSON.stringify({ login })
      })
      .then((data) => data)
      .catch((error) => error)
  }

  getUser(id: number) {
    return http
      .get<XMLHttpRequest>(`/user/${id}`)
      .then((data) => data)
      .catch((error) => error)
  }
}

export default new UserAPI()
