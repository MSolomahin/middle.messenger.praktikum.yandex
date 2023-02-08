enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

interface IOptions {
  data?: Record<string, string>
  body?: string
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

  post = async <T>(url: string, options: IOptions = {}): Promise<T> => {
    return await this.request(
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

  request = async <T>(
    url: string,
    options: IOptions = {},
    timeout: number = 5000
  ): Promise<T> => {
    const { headers = {}, method, data, body } = options

    return await new Promise(function (resolve, reject) {
      if (!method) {
        reject(new Error('No method'))
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === METHODS.GET

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url)

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })
      xhr.withCredentials = true

      xhr.onload = function () {
        resolve(xhr as T)
      }

      xhr.onabort = reject
      xhr.onerror = reject

      xhr.timeout = timeout
      xhr.ontimeout = reject

      if (isGet || !body) {
        xhr.send()
      } else {
        xhr.send(body)
      }
    })
  }
}

export default new HTTPTransport()
