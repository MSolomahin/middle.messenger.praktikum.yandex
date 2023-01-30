import Router from './router/index'
import './navBar'

const router = Router.instance()

router
  .addRoute(/^authorization$/, 'authorization')
  .addRoute(/^registration$/, 'registration')
  .addRoute(/^$/, 'messenger')
  .addRoute(/^404$/, 'notFound')
  .addRoute(/^500$/, 'serverError')
  .addRoute(/^userSettings$/, 'userSettings')
  .setNotFoundPagePath('notFound')
  .listen()
