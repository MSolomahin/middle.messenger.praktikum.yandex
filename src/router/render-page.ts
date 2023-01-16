import Component from '../core/component'
import AuthPage from '../pages/authorization'
import MessengerPage from '../pages/messenger'
import NotFoundPage from '../pages/notFound'
import RegistrationPage from '../pages/registration'
import ServerErrorPage from '../pages/serverError'
import UserSettings from '../pages/userSettings'

const pages = {
  authorization: AuthPage,
  registration: RegistrationPage,
  messenger: MessengerPage,
  notFound: NotFoundPage,
  serverError: ServerErrorPage,
  userSettings: UserSettings
}
export default async function (path: string, match?: RegExpMatchArray | null) {
  const main = document.querySelector('main')

  main?.classList.add('is-loading')

  // const { default: Page } = await import(`../pages/${path}`);

  const Page: Component = pages[path] || NotFoundPage

  const page: Component = new Page()
  const element = page.getContent()
  page.dispatchComponentDidMount()

  main?.classList.remove('is-loading')

  const contentNode = document.querySelector('#content')
  if (contentNode && element) {
    contentNode.innerHTML = ''
    contentNode.append(element)
  }

  return page
}
