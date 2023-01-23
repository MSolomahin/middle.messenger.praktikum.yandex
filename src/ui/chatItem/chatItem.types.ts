import { ComponentBaseProps } from '../../core/component/component.types'

export interface ChatItemProps extends ComponentBaseProps {
  image?: string
  name: string
  lastMessage: string
  countUnReading: number
  time: string
}
