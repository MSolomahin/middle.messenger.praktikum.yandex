import Component from '../core/component'
import Route from './route'

class Router {
  routes: Route[] = []
  page: Component | null = null
  currentRoute: Route | null = null
  history = window.history
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
      this.currentRoute = route
    } else {
      this._notFoundRoute?.render()
      this.currentRoute = this._notFoundRoute
    }
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname))
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }

  public changePage(pathname: string) {
    const route = this.getRoute(pathname)
    if (!route) {
      return
    }

    route.render()
  }

  navigate(path: string) {
    this.history.pushState(null, '', path)
    this.route()
  }

  addRoute(pathname: string, component: typeof Component) {
    const route = new Route(pathname, component)
    this.routes.push(route)

    return this
  }

  setNotFoundPagePath(pathname: string, component: typeof Component) {
    this._notFoundRoute = new Route(pathname, component)
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
