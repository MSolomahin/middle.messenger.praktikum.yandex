import { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon'
import { HTTPTransport } from './HTTPTransport'
import { expect } from 'chai'

const sinon = require('sinon')

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic
  let instance: HTTPTransport
  const requests: SinonFakeXMLHttpRequest[] = []

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest()

    // @ts-ignore
    global.XMLHttpRequest = xhr

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request)
    }

    instance = new HTTPTransport()
  })

  afterEach(() => {
    requests.length = 0
  })

  it('.get() should send GET request', () => {
    void instance.get('/user')

    const [request] = requests

    expect(request.method).to.eq('GET')
  })

  it('.post() should send POST request', () => {
    void instance.post('/user')

    const [request] = requests

    expect(request.method).to.eq('POST')
  })
  it('.put() should send PUT request', () => {
    void instance.put('/user')

    const [request] = requests

    expect(request.method).to.eq('PUT')
  })
  it('.delete() should send DELETE request', () => {
    void instance.delete('/user')

    const [request] = requests

    expect(request.method).to.eq('DELETE')
  })
})
