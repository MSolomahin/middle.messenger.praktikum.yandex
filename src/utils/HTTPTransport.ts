enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

interface IOptions {
  data?: Record<string, string>
  body?: string | object | FormData
  timeout?: number
  headers?: Record<string, string>
  method?: METHODS
  tries?: number
}

type IData = Record<string, string>

function queryStringify(data: IData) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  const keys = Object.keys(data)
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`
  }, '?')
}

class HTTPTransport {
  get = async <T>(url: string, options: IOptions = {}): Promise<T> => {
    return await this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    )
  }

  post = <T>(url: string, options: IOptions = {}): Promise<T> => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    )
  }

  put = async <T>(url: string, options: IOptions = {}): Promise<T> => {
    return await this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    )
  }

  delete = async <T>(url: string, options: IOptions = {}): Promise<T> => {
    return await this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    )
  }

  request = <T>(
    url: string,
    options: IOptions = {},
    timeout: number = 5000
  ): Promise<T> => {
    const { headers = {}, method, data } = options
    let curBody = options.body
    return new Promise(function (resolve, reject) {
      if (!method) {
        reject(new Error('No method'))
        return
      }
      const curURL = 'https://ya-praktikum.tech/api/v2' + url
      const xhr = new XMLHttpRequest()
      const isGet = method === METHODS.GET

      xhr.open(
        method,
        isGet && !!data ? `${curURL}${queryStringify(data)}` : curURL
      )

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })
      xhr.withCredentials = true

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response)
          } else {
            reject(xhr.response)
          }
        }
      }
      if (!(curBody instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json')
        curBody = JSON.stringify(curBody)
      }

      xhr.setRequestHeader('Content-Security-Policy', 'script-src "none" img-src "none"')
      xhr.onabort = reject
      xhr.onerror = reject

      xhr.timeout = timeout
      xhr.ontimeout = reject
      xhr.responseType = 'json'

      if (isGet || !curBody) {
        xhr.send()
      } else {
        xhr.send(curBody)
      }
    })
  }
}

export default new HTTPTransport()
