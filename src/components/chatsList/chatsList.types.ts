import { ComponentBaseProps } from '../../core/component/component.types'
import { IChat } from '../../modules/messenger'

export interface ChatsListProps extends ComponentBaseProps {
    chats: IChat[]
    avatar: string
    messages: Record<string, any>
    onFindChats: (searchValue?: string) => void
    handleChatClick: (id: number) => void
}
