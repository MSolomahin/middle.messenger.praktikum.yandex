import { IListeners, EventSwitcher, EventDispatcher, ICallback } from './eventBus.types'

export default class EventBus {
  private readonly listeners: IListeners

  constructor() {
    this.listeners = {}
  }

  on: EventSwitcher = (event, callback) => {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off: EventSwitcher = (event, callback) => {
    if (!this.listeners[event]) {
      throw new Error(`Don't have event: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener: ICallback) => listener !== callback
    )
  }

  emit: EventDispatcher = (event, ...args) => {
    if (!this.listeners[event]) {
      return
    }

    this.listeners[event].forEach((listener: ICallback) => {
      listener(...args)
    })
  }
}
