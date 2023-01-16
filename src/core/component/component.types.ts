import Component from './component'

export interface IMeta {
  props: Record<string, any>
}

export type IComponentProps = Record<string, any>

export type IComponentChildren = Record<string, Component | Component[]>
