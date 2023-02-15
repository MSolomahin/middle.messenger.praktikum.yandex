import http from '../../utils/HTTPTransport'

class CommonApi {
    getMyUser() {
        return http.get('/auth/user')
      }
}

export default new CommonApi()
