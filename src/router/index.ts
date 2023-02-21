import Component from '../core/component'
import Route from './route'

class Router {
  routes: Route[] = []
  page: Component | null = null
  static _instance: Router
  private _notFoundRoute: Route | null = null

  constructor() {
    this.routes = []
    this._notFoundRoute = null
    this.initEventListeners()
  }

  initEventListeners = () => {
    document.addEventListener('click', (event) => {
      const link = (event.target as HTMLElement).closest('a')
      if (!link) return

      const href = link.getAttribute('href')

      if (href?.startsWith('/')) {
        event.preventDefault()
        this.navigate(href)
      }
    })
  }

  route() {
    const strippedPath = decodeURI(window.location.pathname).replace(
      /^\/|\/$/,
      ''
    )

    const route = this.getRoute('/' + strippedPath)

    if (route) {
      route.render()
    } else {
      this._notFoundRoute?.render()
    }
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname))
}

  back() {
    window.history.back()
  }

  forward() {
    window.history.forward()
  }

  public changePage(pathname: string) {
    const route = this.getRoute(pathname)
    if (!route) {
      return
    }

    route.render()
  }

  navigate(path: string) {
    history.pushState(null, '', path)
    this.route()
  }

  addRoute(pathname: string, component: typeof Component) {
    const route = new Route(pathname, component)
    this.routes.push(route)

    return this
  }

  setNotFoundPagePath(pathname: string, component: typeof Component) {
    const route = new Route(pathname, component)
    this._notFoundRoute = route
    return this
  }

  listen() {
    window.addEventListener('popstate', () => {
      this.route()
    })

    this.route()
  }
}

export default new Router()
