interface IRoutes {
  auth: string
  registration: string
  messenger: string
  notFound: string
  serverError: string
  userSettings: string
}

const routes: IRoutes = {
  auth: '/',
  registration: '/sign-up',
  messenger: '/messenger',
  notFound: '/404',
  serverError: '/500',
  userSettings: '/settings'
}

export default routes
