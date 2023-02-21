import Component from '../../core/component'
import template from './chatsList.tmpl'
import { ChatsListProps } from './chatsList.types'
import './chatsList.style.css'
import Avatar from '../../ui/avatar'
import connect from '../../store/connect'
import ChatItem from '../../ui/chatItem'
import { IChat } from '../../modules/messenger'
import Search from '../../ui/search'
import { IStore } from '../../store'
import { getFilePath } from '../../utils/getFilePath'
import Loader from '../../ui/loader'

class ChatsList extends Component<ChatsListProps & IStore> {
  constructor(props: ChatsListProps & IStore) {
    super({
      ...props,
      attrs: {
        class: 'chats'
      }
    })
  }

  protected componentDidUpdate(
    _: ChatsListProps,
    newProps: ChatsListProps
  ): boolean {
    this.children.chatList = this.createChats(newProps.chats)
    if (this.children.avatar instanceof Component) {
      this.children.avatar.setProps({
        src: getFilePath(newProps.avatar)
      })
    }

    return true
  }

  private _handleSearch(e: SubmitEvent) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    this.props.onFindChats(data.search as string)
  }

  private _handleCleanSearch(e: MouseEvent) {
    e.stopPropagation()
    const target = (e.target as HTMLElement).closest('img')
    const form = (e.target as HTMLElement).closest('form') as HTMLFormElement

    if (!target) return
    form.reset()
    this.props.onFindChats()
  }

  init() {
    this.children.avatar = new Avatar({
      size: 'tiny',
      src: this.props.avatar
    })
    this.children.search = new Search({
      events: {
        click: this._handleCleanSearch.bind(this),
        submit: this._handleSearch.bind(this)
      }
    })
    this.children.loader = new Loader({
       })
    this.children.chatList = this.createChats(this.props.chats)
  }

  private createChats(chats: IChat[]) {
    if (!chats) return []
    return chats.map((chat) => {
      return new ChatItem({
        chat,
        isSelected: this.props.selectedChat === chat.id,
        events: {
          click: () => {
            this.props.handleChatClick(chat.id)
          }
        }
      })
    })
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}

const mapStateToProps = (state: IStore) => {
  return {
    chats: state.chats,
    chatsStatus: state.chatsStatus,
    selectedChat: state.selectedChat,
    name: state.user?.first_name,
    avatar: state.user?.avatar
  }
}

const ChatsListComponent = connect(mapStateToProps)(ChatsList)

export default ChatsListComponent
