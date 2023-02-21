import { PlainObject } from '../../utils/isPlainObject'

export type ICallback = (...args: any[]) => void
export type IListeners = Record<string, ICallback[]>

export type EventSwitcher = (event: string, callback: ICallback) => void
export type EventDispatcher = (event: string, ...args: PlainObject[] | Event[]) => void
