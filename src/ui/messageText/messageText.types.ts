import { ComponentBaseProps } from '../../core/component/component.types'

export interface MessageTextProps extends ComponentBaseProps {
  text: string
  time: string
  isMine?: boolean
}
