import template from './chat.tmpl'
import Component from '../../core/component'
import MoreButton from '../../ui/moreButton/moreButton'
import Avatar from '../../ui/avatar/avatar'
import ArrowButton from '../../ui/arrowButton/arrowButton'
import AttachmentButton from '../../ui/attachmentButton/attachmentButton'
import MessageText from '../../ui/messageText'
import DropDown from '../../ui/dropDown/dropDown'
import DocumentIcon from '../../assets/icons/document.svg'
import LocationIcon from '../../assets/icons/location.svg'
import PhotoIcon from '../../assets/icons/photo.svg'
import DeleteIcon from '../../assets/icons/delete.svg'
import PlusIcon from '../../assets/icons/plus.svg'
import './chat.style.css'
import MessageInput from '../../ui/messageInput/messageInput'
import { ChatProps } from './chat.types'
import emptyTemplate from './emptyChat.tmpl'
import ButtonPrimary from '../../ui/buttonPrimary/buttonPrimary'
import connect from '../../store/connect'
import { IStore } from '../../store'
import { getTime } from '../../utils/getTime'
import { getFilePath } from '../../utils/getFilePath'
import { getDataFromForm } from '../../utils/getDataFromForm'

class ChatComponent extends Component<ChatProps> {
  constructor(props: ChatProps) {
    super({
      ...props,
      attrs: {
        class: 'chat'
      }
    })
  }

  protected componentDidMount() {
    this.setProps({
      events: {
        submit: this._handleSubmit
      }
    })
  }

  private readonly _handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    const target = (e.target as HTMLElement).closest('form')
    if (!target) return

    const formData = getDataFromForm(target)
    if (formData.message) {
      this.props.handleSendMessage(formData.message as string)
      target.reset()
    }
  }

  private _onItemClick(e: MouseEvent) {
    e.stopPropagation()
    const target = (e.target as HTMLElement).closest('div[id]')
    if (!target) return

    switch (target.id) {
      case 'addUser':
        this.props.handleOpenModal('Add a user', 'addUser')
        break
      case 'deleteChat': {
        const selectedChat = this.props.selectedChat
        if (selectedChat) {
          this.props.handleDeleteChat(selectedChat)
        }
        break
      }
      case 'deleteUser':
        this.props.handleOpenModal('Delete a user', 'deleteUser')
        break
    }
  }

  protected componentDidUpdate(
    oldProps: ChatProps & IStore,
    newProps: ChatProps & IStore
  ): boolean {
    this.children.messages = this.createMessages(newProps)
    if (this.children.avatar instanceof Component) {
      this.children.avatar.setProps({
        src: getFilePath(newProps.avatar)
      })
    }
    return super.componentDidUpdate(oldProps, newProps)
  }

  private createMessages(props: ChatProps) {
    if (!props.messages) return []
    return props.messages?.map((data) => {
      return new MessageText({
        text: data.content,
        time: getTime(data.time),
        isMine: props.userId === data.user_id
      })
    })
  }

  init() {
    this.createMessages(this.props)
    this.children.avatar = new Avatar({
      size: 'tiny',
      src: this.props.avatar
    })
    this.children.arrowButton = new ArrowButton({
      side: 'right'
    })

    this.children.messageInput = new MessageInput({
      placeholder: 'Write a message',
      name: 'message'
    })

    this.children.moreButton = new DropDown({
      position: 'bottom',
      align: 'left',
      items: [
        {
          image: PlusIcon,
          id: 'addUser',
          title: 'Add user',
          onClick: this._onItemClick.bind(this)
        },
        {
          image: DeleteIcon,
          id: 'deleteUser',
          title: 'Delete user',
          onClick: this._onItemClick.bind(this)
        },
        {
          image: DeleteIcon,
          id: 'deleteChat',
          title: 'Delete chat',
          onClick: this._onItemClick.bind(this)
        }
      ],
      button: new MoreButton()
    })

    this.children.attachmentButton = new DropDown({
      position: 'top',
      align: 'right',
      items: [
        {
          image: PhotoIcon,
          title: 'Photo and video',
          id: 'photoVideo',
          onClick: this._onItemClick.bind(this)
        },
        {
          image: DocumentIcon,
          title: 'File',
          id: 'file',
          onClick: this._onItemClick.bind(this)
        },
        {
          image: LocationIcon,
          title: 'Location',
          id: 'location',
          onClick: this._onItemClick.bind(this)
        }
      ],
      button: new AttachmentButton()
    })

    this.children.button = new ButtonPrimary({
      label: 'Add a new chat',
      events: {
        click: () => {
          this.props.handleOpenModal('Add a chat', 'addChat')
        }
      }
    })
  }

  render() {
    if (this.props.selectedChat) {
      return this.compile({ ...this.props }, template)
    }
    return this.compile({ ...this.props }, emptyTemplate)
  }
}

const mapStateToProps = (state: IStore) => {
  const selectedChatId = state.selectedChat
  const chat = state.chats.find((chat) => chat.id === selectedChatId)
  if (!selectedChatId || !chat) {
    return {
      messages: [],
      selectedChat: null,
      userId: state.user?.id,
      avatar: '',
      name: ''
    }
  }
  return {
    selectedChat: selectedChatId,
    messages: state.messages[selectedChatId],
    userId: state.user?.id,
    avatar: chat.avatar,
    name: chat.title
  }
}

const Chat = connect(mapStateToProps)(ChatComponent)

export default Chat
