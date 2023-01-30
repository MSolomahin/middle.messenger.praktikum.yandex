import Component from '../core/component'
import AuthorizationPage from '../pages/authorizationPage'
import MessengerPage from '../pages/messengerPage'
import NotFoundPage from '../pages/notFoundPage'
import RegistrationPage from '../pages/registrationPage'
import ServerErrorPage from '../pages/serverErrorPage'
import UserSettingsPage from '../pages/userSettingsPage'

const pages: Record<string, Component> = {
  authorization: new AuthorizationPage(),
  registration: new RegistrationPage(),
  messenger: new MessengerPage(),
  notFound: new NotFoundPage(),
  serverError: new ServerErrorPage(),
  userSettings: new UserSettingsPage()
}
export default async function (path: string) {
  const main = document.querySelector('main')

  main?.classList.add('is-loading')

  // const { default: Page } = await import(`../pages/${path}`);

  const Page = pages[path] || NotFoundPage

  const page: Component = Page
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
