import Chat from '../../../components/chat'
import ChatsList from '../../../components/chatsList'
import Component from '../../../core/component'
import { IStore } from '../../../core/store'
import connect from '../../../core/store/connect'
import BaseInput from '../../../ui/baseInput/baseInput'
import Modal from '../../../ui/modal/modal'
import ChatsController from '../controllers/chatsController'
import './messenger.style.css'
import template from './messenger.tmpl'
import MessageController from '../controllers/messagesController'
import { ComponentBaseProps } from '../../../core/component/component.types'
import { getDataFromForm } from '../../../utils/getDataFromForm'
import UserController from '../controllers/userController'
import routes from '../../../assets/const/routing'

class MessengerModule extends Component<IStore & ComponentBaseProps> {
  constructor(props: IStore) {
    super({
      ...props,
      attrs: {
        class: 'chats-layout'
      }
    })
  }

  protected componentDidMount(): void {
    if (!this.props.user.id) {
      void UserController.getMyUser()
    }
    void ChatsController.getChats()
  }

  private handleOpenModal(
    title: string,
    id: 'addChat' | 'addUser' | 'deleteUser'
  ) {
    if (this.children.modal instanceof Component) {
      this.children.modal.setProps({
        title,
        id,
        buttonTitle: id.includes('add') ? 'Add' : 'Delete'
      })
      this.children.modal.show()
    }
  }

  private handleModalSubmit(e: SubmitEvent) {
    e.preventDefault()

    const target = (e.target as HTMLElement).closest('form')
    if (!target) return

    const modalId = target.dataset.id
    const data = getDataFromForm(target)

    switch (modalId) {
      case 'addUser':
        void this.addUserToChat(data.modalValue as string)
        break
      case 'addChat':
        void ChatsController.createChat(data.modalValue as string)
        break
      case 'deleteUser':
        void this.deleteUserFromChat(data.modalValue as string)
        break
    }

    if (this.children.modal instanceof Component) {
      this.children.modal.hide()
    }
  }

  private async addUserToChat(userLogin: string) {
    const chatId = this.props.selectedChat
    const users = await UserController.findUser(userLogin)

    if (users?.[0]?.id && chatId) {
      void ChatsController.addUserToChat(users[0].id, chatId)
    }
  }

  private async deleteUserFromChat(userLogin: string) {
    const chatId = this.props.selectedChat
    const user = await UserController.findUser(userLogin)
console.log(user)
    if (user?.[0]?.id && chatId) {
      void ChatsController.deleteUsersFromChat([user[0].id])
    }
  }

  private handleFindChats(searchValue: string = '') {
    void ChatsController.getChats({ title: searchValue })
  }

  private handleChatClick(chatId: number) {
    ChatsController.selectChat(chatId)
  }

  private handleSendMessage(message: string) {
    const chatId = this.props.selectedChat
    if (chatId) {
      MessageController.sendMessage(chatId, message)
    }
  }

  private handleDeleteChat(id: number) {
    void ChatsController.delete(id)
  }

  init() {
    this.children.chat = new Chat({
      handleOpenModal: this.handleOpenModal.bind(this),
      handleSendMessage: this.handleSendMessage.bind(this),
      handleDeleteChat: this.handleDeleteChat.bind(this)
    })
    this.children.chatsList = new ChatsList({
      link: routes.userSettings,
      avatar: this.props.user.avatar,
      onFindChats: this.handleFindChats.bind(this),
      handleChatClick: this.handleChatClick.bind(this)
    })
    this.children.modal = new Modal({
      title: 'Add chat',
      buttonTitle: 'Add',
      id: 'addChat',
      children: [
        new BaseInput({
          label: 'Login',
          value: '',
          name: 'modalValue'
        })
      ],
      events: {
        submit: this.handleModalSubmit.bind(this)
      }
    })
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}

const mapStateToProps = (state: IStore) => ({
  selectedChat: state.selectedChat,
  user: { ...state.user },
  chats: { ...state.chats }
})

export const Messenger = connect(mapStateToProps)(MessengerModule)
