import { IUser } from '../store/types'
import http from '../utils/HTTPTransport'

class CommonApi {
    getMyUser() {
        return http.get<IUser>('/auth/user')
      }
}

export default new CommonApi()
