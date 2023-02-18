import { ComponentBaseProps } from '../../core/component/component.types'
import { IChat } from '../../modules/messenger'

export interface ChatItemProps extends ComponentBaseProps {
  chat: IChat
  isSelected: boolean
  withLabel?: boolean | string
}
