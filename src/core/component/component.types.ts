import Component from './component'

export interface IMeta {
  tagName: string
  props: Record<string, any>
}

export type IComponentProps = Record<string, any>

export type IComponentChildren = Record<string, Component>

export interface IComponentPropsAndChildren
  extends IComponentProps,
  IComponentChildren {}
