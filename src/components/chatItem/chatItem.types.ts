import { IComponentPropsAndChildren } from '../../core/component/component.types'
export interface ChatItemProps extends IComponentPropsAndChildren {
  image?: string
  name: string
  lastMessage: string
  countUnReading: number
  time: string
}
