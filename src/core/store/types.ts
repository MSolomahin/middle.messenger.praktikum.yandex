
export interface IUser {
  id: number | null
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export interface IChat {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: LastMessage
}

export interface User {
  first_name: string
  second_name: string
  avatar: string
  email: string
  login: string
  phone: string
}

export interface LastMessage {
  user: User
  time: Date | string
  content: string
}
