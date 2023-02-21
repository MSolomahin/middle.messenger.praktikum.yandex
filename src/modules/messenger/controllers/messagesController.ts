import { URIs } from '../../../assets/const/URI'
import store from '../../../store'
import { sanitizeHTML } from '../../../utils/sanitizer'
import WSTransport, { WSTransportEvents } from '../helpers/WSTransport'
import { IMessage } from '../types'

class MessagesController {
  private readonly sockets: Map<number, WSTransport> = new Map()

  async connect(id: number, token: string) {
    if (this.sockets.has(id)) {
      return
    }

    const userId = store.getState().user?.id

    const wsTransport = new WSTransport(
      `${URIs.WSS}/${userId!}/${id}/${token}`
    )

    this.sockets.set(id, wsTransport)

    await wsTransport.connect()

    this.subscribe(wsTransport, id)
    this.fetchOldMessages(id)
  }

  sendMessage(chatId: number, message: string) {
    const socket = this.sockets.get(chatId)
    if (!socket) {
      throw new Error(`Chat ${chatId} is not connected`)
    }
    socket.send({
      type: 'message',
      content: sanitizeHTML(message)
    })
  }

  fetchOldMessages(id: number) {
    const socket = this.sockets.get(id)

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`)
    }

    socket.send({ type: 'get old', content: '0' })
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => {
      socket.close()
    })
  }

  closeSocket(socketId: number) {
    const socket = this.sockets.get(socketId)
    socket?.close()
  }

  private onMessage(id: number, messages: IMessage | IMessage[]) {
    let messagesToAdd: IMessage[] = []

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse()
    } else {
      if (messages.type === 'user connected') {
        return
      }
      messagesToAdd.push(messages)
    }

    const currentMessages = (store.getState().messages || {})[id] || []

    messagesToAdd = [...currentMessages, ...messagesToAdd]

    store.set(`messages.${id}`, messagesToAdd)
  }

  private onClose(id: number) {
    this.sockets.delete(id)
  }

  private subscribe(transport: WSTransport, id: number) {
    transport.on(WSTransportEvents.Message, (message) => {
      this.onMessage(id, message)
    })
    transport.on(WSTransportEvents.Close, () => {
      this.onClose(id)
    })
  }
}

const controller = new MessagesController()

export default controller
