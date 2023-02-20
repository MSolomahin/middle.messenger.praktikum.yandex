import { IStore } from './index'

export const initialState: IStore = {
  user: null,
  chats: [],
  chatsStatus: 'initial',
  messages: {},
  selectedChat: null
}
