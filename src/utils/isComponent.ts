import Component from '../core/component'

export const isComponent = (value: Component<any> | Array<Component<any>>): value is Component<any> => value instanceof Component
