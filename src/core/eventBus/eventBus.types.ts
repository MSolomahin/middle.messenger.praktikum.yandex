import { IComponentProps } from '../component/component.types'

export type ICallback = (...args: any[]) => void
export type IListeners = Record<string, any>

export interface IEventProps {
  event: string
  callback: ICallback
}
export interface IDispatchProps {
  event: string
  args: IComponentProps[]
}
