import { IChat } from '../../assets/mocks/messages'
import { ComponentBaseProps } from '../../core/component/component.types'

export interface ChatsListProps extends ComponentBaseProps {
    chats: IChat[]
}
