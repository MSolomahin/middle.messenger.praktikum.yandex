enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

interface IOptions {
  data?: any
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

export default class HTTPTransport {
  get = async (url: string, options: IOptions = {}) => {
    return await this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    )
  }

  post = async (url: string, options: IOptions = {}) => {
    return await this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    )
  }

  put = async (url: string, options: IOptions = {}) => {
    return await this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    )
  }

  delete = async (url: string, options: IOptions = {}) => {
    return await this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    )
  }

  request = async (
    url: string,
    options: IOptions = {},
    timeout: number = 5000
  ) => {
    const { headers = {}, method, data } = options

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

      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject

      xhr.timeout = timeout
      xhr.ontimeout = reject

      if (isGet || !data) {
        xhr.send()
      } else {
        xhr.send(data)
      }
    })
  }
}

export function fetchWithRetry(url: string, options: IOptions = {}) {
  const { tries = 1 } = options

  function onError(err: unknown) {
    const triesLeft = tries - 1
    if (!triesLeft) {
      throw err
    }

    return fetchWithRetry(url, { ...options, tries: triesLeft })
  }

  return fetch(url, options).catch(onError)
}
