import { ComponentBaseProps } from '../../core/component/component.types'
import { IChat } from '../../modules/messenger'

export interface ChatsListProps extends ComponentBaseProps {
    chats: IChat[]
    link: string
    avatar: string
    onFindChats: (searchValue?: string) => void
    handleChatClick: (id: number) => void
}
