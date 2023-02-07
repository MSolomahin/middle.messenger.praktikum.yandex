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
  registration: '/registration',
  messenger: '/messenger',
  notFound: '/404',
  serverError: '/500',
  userSettings: '/userSettings'
}

export default routes
