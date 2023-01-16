import Templator from '../../utils/templator'
import EventBus from '../eventBus/eventBus'
import { v4 as makeUUID } from 'uuid'
import {
  IMeta,
  IComponentChildren,
  IComponentProps
} from './component.types'

class Component<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  } as const

  private _element: HTMLElement | null = null
  private readonly _meta: IMeta
  protected props: P
  public id: string = makeUUID()
  public children: IComponentChildren
  protected readonly eventBus: () => EventBus

  constructor(propsAndChildren: P) {
    const { children, props } = this._getChildren(propsAndChildren)
    const eventBus = new EventBus()

    this.children = children
    this._meta = {
      props
    }

    this.props = this._makePropsProxy({ ...props, __id: this.id })

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)
    eventBus.emit(Component.EVENTS.INIT)
  }

  private readonly _registerEvents = (eventBus: EventBus) => {
    eventBus.on(Component.EVENTS.INIT, this._init)
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount)
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate)
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render)
  }

  private readonly _init = () => {
    this.init()
    this._createResources()
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER)
  }

  protected init() {
  }

  protected compile = (template: string, props: IComponentProps | IComponentChildren) => {
    const propsAndStubs = { ...props }

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        propsAndStubs[name] = component.map(child => `<div data-id="${child.id}"></div>`)
      } else {
        propsAndStubs[name] = `<div data-id="${component.id}"></div>`
      }
    })

    const fragment = this._createDocumentElement(
      'template'
    ) as HTMLTemplateElement

    fragment.innerHTML = new Templator(template).compile(propsAndStubs)

    const replaceStub = (component: Component) => {
      const stub = fragment.content.querySelector(`[data-id="${component.id}"]`)
      if (!stub) return

      component.getContent()?.append(...Array.from(stub.childNodes))

      const element = component.getContent()
      if (element) stub.replaceWith(element)
    }

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub)
      } else {
        replaceStub(component)
      }
    })

    return fragment.content
  }

  private readonly _getChildren = (propsAndChildren: P): { props: P, children: IComponentChildren } => {
    const children: IComponentChildren = {}
    const props: IComponentProps = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value
      } else {
        props[key] = value
      }
    })
    return { props: props as P, children }
  }

  private readonly _createResources = () => {
    this._element = this._createDocumentElement('div')
  }

  private readonly _componentDidMount = () => {
    this.componentDidMount()
  }

  protected componentDidMount = (oldProps?: P) => {}

  public dispatchComponentDidMount = () => {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM)

    Object.values(this.children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(ch => { ch.dispatchComponentDidMount() })
      } else {
        child.dispatchComponentDidMount()
      }
    })
  }

  private readonly _componentDidUpdate = (oldProps: P, newProps: P) => {
    const response = this.componentDidUpdate(oldProps, newProps)

    if (response) {
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER)
    }
  }

  protected componentDidUpdate = (oldProps: P, newProps: P) => {
    const needUpdate = Object.entries(newProps).some(([key, value]) => {
      return oldProps[key] !== value
    })

    return needUpdate
  }

  public setProps = (nextProps: Record<string, unknown>) => {
    Object.assign(this.props, nextProps)
  }

  get element() {
    return this._element
  }

  private readonly _render = () => {
    if (!this._element) return

    const block = this.render()

    this._element.innerHTML = ''

    this._element.appendChild(block)

    const elementFistElement = this._element?.firstElementChild as HTMLElement | null
    if (this.id) {
      elementFistElement?.setAttribute('data-id', this.id)
    }
    this._element = elementFistElement
  }

  render() {
    return document.createElement('template').content
  }

  public getContent = () => {
    return this.element
  }

  private readonly _makePropsProxy = (props: P) => {
    return new Proxy(props, {
      get: (target, prop: string) => {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set: (target, prop: string, value) => {
        const oldProps = { ...target }
        target[prop as keyof P] = value
        this.eventBus().emit(Component.EVENTS.FLOW_CDU, oldProps, target)
        return true
      },
      deleteProperty: () => {
        throw new Error('No access')
      }
    })
  }

  private readonly _createDocumentElement = (tagName: string) => {
    const element = document.createElement(tagName)
    if (this.id) {
      element.setAttribute('data-id', this.id)
    }
    return element
  }

  show = () => {
    const element = this.getContent()
    if (!element) return
    element.style.display = 'block'
  }

  hide = () => {
    const element = this.getContent()
    if (!element) return
    element.style.display = 'none'
  }
}

export default Component
