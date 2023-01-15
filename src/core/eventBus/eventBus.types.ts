import { IComponentProps } from '../component/component.types'

export type ICallback = (...args: IComponentProps[]) => void
export type IListeners = Record<string, ICallback[]>

export interface IEventProps {
  event: string
  callback: ICallback
}
export interface IDispatchProps {
  event: string
  args: IComponentProps[]
}
