import Templator from '../../utils/templator'
import EventBus from '../eventBus/eventBus'
import { v4 as makeUUID } from 'uuid'
import {
  IMeta,
  IComponentChildren,
  IComponentPropsAndChildren,
  IComponentProps
} from './component.types'

abstract class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update'
  }

  _element: HTMLElement | null = null
  _meta: IMeta | null = null
  props: Record<string, any> | null = null
  // _layout: Component | null = null;
  _components: Record<string, Component> = {}
  _id: string = ''
  children: IComponentChildren
  eventBus: (() => EventBus) | null = null
  // _initLayout: (() => void) | null = null;
  public render: () => DocumentFragment

  constructor (tagName = 'div', propsAndChildren: IComponentPropsAndChildren) {
    const { children, props } = this._getChildren(propsAndChildren)
    const eventBus = new EventBus()

    this.children = children
    this._meta = {
      tagName,
      props
    }
    this._id = makeUUID()

    this.props = this._makePropsProxy({ ...props, __id: this._id })

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)
    // eventBus.emit(Component.EVENTS.INIT);
  }

  public initComponent = () => {
    this.eventBus?.().emit(Component.EVENTS.INIT)
  }

  _registerEvents (eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init)
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount)
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render)
    eventBus.on(Component.EVENTS.FLOW_CDU, (props) => { this._componentDidUpdate(props[0], props[1]) })
  }

  init = () => {
    if (!this.eventBus) return

    this._createResources()
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER)
  }

  compile (template: string, props: IComponentPropsAndChildren) {
    const propsAndStubs = { ...props }

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    })

    const fragment = this._createDocumentElement(
      'template'
    ) as HTMLTemplateElement

    fragment.innerHTML = new Templator(template).compile(propsAndStubs)

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)
      const element = child.getContent()

      if (stub && element) {
        stub.replaceWith(element)
      }
    })

    return fragment.content
  }

  _getChildren (propsAndChildren: IComponentPropsAndChildren) {
    const children: IComponentChildren = {}
    const props: IComponentProps = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value
      } else {
        props[key] = value
      }
    })
    return { children, props }
  }

  _createResources () {
    if (!this._meta) return

    const { tagName } = this._meta
    this._element = this._createDocumentElement(tagName)
  }

  _componentDidMount = () => {
    this.componentDidMount()

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount()
    })
  }

  componentDidMount (oldProps?: IComponentProps) {}

  dispatchComponentDidMount () {
    if (!this.eventBus) return
    this.eventBus().emit(Component.EVENTS.FLOW_CDM)
  }

  _componentDidUpdate (
    oldProps: IComponentProps,
    newProps: IComponentProps
  ) {
    const response = this.componentDidUpdate(oldProps, newProps)

    if (response) {
      this.props = Object.assign(oldProps, newProps)
      this.eventBus?.().emit(Component.EVENTS.FLOW_RENDER)
    }
  }

  componentDidUpdate (oldProps: IComponentProps, newProps: IComponentProps) {
    const needUpdate = Object.entries(newProps).some(([key, value]) => {
      return oldProps[key] !== value
    })

    return needUpdate
  }

  setProps = (nextProps: Record<string, any>) => {
    if (!nextProps || !this.props) {
      return
    }
    const oldProps = this.props
    this.eventBus?.().emit(Component.EVENTS.FLOW_CDU, oldProps, nextProps)
  }

  get element () {
    return this._element
  }

  _render = () => {
    if (!this._element) return

    console.log('render', this.props)
    const block = this.render()

    this._element.innerHTML = ''

    this._element.appendChild(block)
  }

  getContent () {
    return this.element
  }

  _makePropsProxy = (props: IComponentProps) => {
    const proxyProps = new Proxy(props, {
      get (target, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set (target, prop: string, value) {
        target[prop] = value
        return true
      }
    })

    return proxyProps
  }

  _createDocumentElement (tagName: string) {
    const element = document.createElement(tagName)
    if (this._id) {
      element.setAttribute('data-id', this._id)
    }
    return element
  }

  show () {
    const element = this.getContent()
    if (!element) return
    element.style.display = 'block'
  }

  hide () {
    const element = this.getContent()
    if (!element) return
    element.style.display = 'none'
  }
}

export default Component
