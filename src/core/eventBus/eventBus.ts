import { IComponentProps } from '../component/component.types'

export default class EventBus {
  listeners: Record<string, Array<(...args: Array<string | IComponentProps>) => void>>

  constructor () {
    this.listeners = {}
  }

  on (event: string, callback: (...args) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off (event: string, callback: (...args) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Don't have event: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    )
  }

  emit (event: string, ...args: Array<string | IComponentProps>) {
    if (!this.listeners[event]) {
      throw new Error(`Don't have event: ${event}`)
    }

    this.listeners[event].forEach((listener) => {
      listener([...args])
    })
  }
}
