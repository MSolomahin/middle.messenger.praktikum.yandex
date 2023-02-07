import Router from './router/index'
import './navBar'
import AuthorizationPage from '../src/pages/authorizationPage'
import MessengerPage from '../src/pages/messengerPage'
import NotFoundPage from '../src/pages/notFoundPage'
import RegistrationPage from '../src/pages/registrationPage'
import ServerErrorPage from '../src/pages/serverErrorPage'
import UserSettingsPage from '../src/pages/userSettingsPage'
import routes from './assets/const/routing'

const router = new Router()

router
  .addRoute(routes.auth, AuthorizationPage)
  .addRoute(routes.registration, RegistrationPage)
  .addRoute(routes.messenger, MessengerPage)
  .addRoute(routes.serverError, ServerErrorPage)
  .addRoute(routes.userSettings, UserSettingsPage)
  .setNotFoundPagePath(routes.notFound, NotFoundPage)
  .listen()
