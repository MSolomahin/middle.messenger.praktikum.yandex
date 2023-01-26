import Component from '../core/component'
import renderPage from './render-page'

// performs routing on all links
export default class Router {
  routes: Array<{ pattern: RegExp, path: string }>
  notFoundPagePath: string = ''
  page: Component | null = null
  static _instance: Router

  constructor() {
    this.routes = []

    this.initEventListeners()
  }

  initEventListeners = () => {
    document.addEventListener('click', (event) => {
      const link = (event.target as HTMLElement).closest('a')
      if (!link) { return }

      const href = link.getAttribute('href')

      if (href?.startsWith('/')) {
        event.preventDefault()
        this.navigate(href)
      }
    })
  }

  static instance = () => {
    if (!this._instance) {
      this._instance = new Router()
    }
    return this._instance
  }

  async route() {
    const strippedPath = decodeURI(window.location.pathname)
      .replace(/^\/|\/$/, '')

    let match: RegExpMatchArray | null = null

    for (const route of this.routes) {
      match = strippedPath.match(route.pattern)

      if (match) {
        this.page = await this.changePage(route.path, match)
        break
      }
    }

    if (!match) {
      this.page = await this.changePage(this.notFoundPagePath)
    }

    document.dispatchEvent(new CustomEvent('route', {
      detail: {
        page: this.page
      }
    }))
  }

  public async changePage (path: string, match?: RegExpMatchArray | null) {
    console.log(path)
    // if (this.page?.destroy) {
    //   this.page.destroy()
    // }

    return await renderPage(path, match)
  }

  navigate (path: string) {
    history.pushState(null, '', path)
    void this.route()
  }

  addRoute (pattern: RegExp, path: string) {
    this.routes.push({ pattern, path })
    return this
  }

  setNotFoundPagePath (path: string) {
    this.notFoundPagePath = path
    return this
  }

  listen () {
    window.addEventListener('popstate', async () => { await this.route() })
    void this.route()
  }
}
