import { ComponentBaseProps } from '../../core/component/component.types'
import { IMessage } from '../../modules/messenger'

export interface ChatProps extends ComponentBaseProps {
    selectedChat: number | undefined
    messages: IMessage[]
    userId: number
    handleOpenModal: (title: string, type: 'addChat' | 'addUser') => void
    handleSendMessage: (message: string) => void
    handleDeleteChat: (chatId: number) => void
}
