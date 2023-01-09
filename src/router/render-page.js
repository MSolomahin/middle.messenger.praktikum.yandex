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
export default async function (path, match) {
  const main = document.querySelector('main')

  main.classList.add('is-loading')

  // const { default: Page } = await import(`../pages/${path}`);

  const Page = pages[path] || NotFoundPage

  const page = new Page(match)
  const element = await page.render()

  main.classList.remove('is-loading')

  const contentNode = document.querySelector('#content')

  contentNode.innerHTML = ''
  contentNode.append(element)

  return page
}
