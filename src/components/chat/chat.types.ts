import { ComponentBaseProps } from '../../core/component/component.types'
import { IMessage } from '../../modules/messenger'

export interface ChatProps extends ComponentBaseProps {
    selectedChat: number | undefined
    messages: IMessage[]
    userId: number
    name: string
    avatar: string
    handleOpenModal: (title: string, type: 'addChat' | 'addUser' | 'deleteUser') => void
    handleSendMessage: (message: string) => void
    handleDeleteChat: (chatId: number) => void
}
