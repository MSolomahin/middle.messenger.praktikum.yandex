import Component from './component'

export type IComponentChildren = Record<string, Component | Component[]>

export interface ComponentBaseProps {
  events?: Record<string, (e?: Event) => void>
  attrs?: Record<string, string>
}
