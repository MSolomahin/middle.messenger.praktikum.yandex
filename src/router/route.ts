import Component from '../core/component'
import { render } from '../utils/renderDOM'

export default class Route {
  _pathname: string = ''
  component: typeof Component
  constructor(pathname: string, component: typeof Component) {
    this.component = component
    this._pathname = pathname
  }

  match(pathname: string) {
    return pathname === this._pathname
  }

  render() {
    const Page = this.component
    const block = new Page()

    render('#content', block)
  }
}
