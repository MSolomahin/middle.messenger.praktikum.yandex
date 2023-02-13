import { IListeners, IEventProps, IDispatchProps } from './eventBus.types'

export default class EventBus {
  private readonly listeners: IListeners

  constructor() {
    this.listeners = {}
  }

  on = (event: IEventProps['event'], callback: IEventProps['callback']) => {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off = (event: IEventProps['event'], callback: IEventProps['callback']) => {
    if (!this.listeners[event]) {
      throw new Error(`Don't have event: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener: any) => listener !== callback
    )
  }

  emit = (event: IDispatchProps['event'], ...args: IDispatchProps['args']) => {
    if (!this.listeners[event]) {
      throw new Error(`Don't have event: ${event}`)
    }

    this.listeners[event].forEach((listener: any) => {
      listener(...args)
    })
  }
}
