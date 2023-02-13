import http from '../../utils/HTTPTransport'

class UserApi {
  getMyUser() {
    return http.get<XMLHttpRequest>(
      '/auth/user'
    )
      .then((data) => data)
      .catch((error) => error)
  }
}

export default new UserApi()
