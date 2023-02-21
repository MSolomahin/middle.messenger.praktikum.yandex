import { IUser } from '../../../store/types'

export interface IChat {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: ILastMessage
}

export interface IMessage {
  chat_id: number
  time: string
  type: string
  user_id: number
  content: string
  file?: {
    id: number
    user_id: number
    path: string
    filename: string
    content_type: string
    content_size: number
    upload_date: string
  }
}

interface ILastMessage {
  user: IUser
  time: Date | string
  content: string
}
