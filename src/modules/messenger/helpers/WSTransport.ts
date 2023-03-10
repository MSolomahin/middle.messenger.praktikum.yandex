import EventBus from '../../../core/eventBus'

export enum WSTransportEvents {
  Connected = 'connected',
  Error = 'error',
  Message = 'message',
  Close = 'close'
}

export default class WSTransport extends EventBus {
  private socket: WebSocket | null = null
  private pingInterval: NodeJS.Timer | null = null
  private readonly _url: string = ''

  constructor(url: string) {
    super()
    this._url = url
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not connected')
    }

    this.socket.send(JSON.stringify(data))
  }

  public async connect(): Promise<void> {
    this.socket = new WebSocket(this._url)

    this.subscribe(this.socket)

    this.setupPing()

    return new Promise((resolve) => {
      this.on(WSTransportEvents.Connected, () => {
        resolve()
      })
    })
  }

  public close() {
    this.socket?.close()
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' })
    }, 5000)

    this.on(WSTransportEvents.Close, () => {
      if (!this.pingInterval) return
      clearInterval(this.pingInterval)

      this.pingInterval = null
    })
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSTransportEvents.Connected)
    })
    socket.addEventListener('close', () => {
      this.emit(WSTransportEvents.Close)
    })

    socket.addEventListener('error', (e) => {
      this.emit(WSTransportEvents.Error, e)
    })

    socket.addEventListener('message', (message) => {
      try {
        const data = JSON.parse(message.data)

        if (data.type && data.type === 'pong') {
          return
        }

        this.emit(WSTransportEvents.Message, data)
      } catch (error: unknown) {
        console.log(error)
      }
    })
  }
}
