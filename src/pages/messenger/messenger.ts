import template from './messenger.tmpl'
import BaseComponent from '../../core/baseComponent'
import Avatar from '../../components/avatar'
import { IMessage, messages } from '../../assets/mocks/messages'
import ChatItem from '../../components/chatItem'

export default class MessengerPage extends BaseComponent {
  messages: IMessage[]

  constructor () {
    super()
    this.template = template
    this.messages = messages
  }

  initComponents = () => {
    const avatar = new Avatar({
      size: 'middle'
    })
    const chatList = new ChatItem({
      ...messages[0],
      avatar
    })

    setTimeout(() => {
      chatList.setProps({
        name: 'Maxim1',
        lastMessage: 'Hi!'
      })
      avatar.setProps({
        size: 'middle'
      })
    }, 1000)

    this.components = {
      chatList
    }
  }
}
