import Component from '../core/component'

export const isComponent = (value: Component | Component[]): value is Component => value instanceof Component
