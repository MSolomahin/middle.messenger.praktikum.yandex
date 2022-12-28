import Router from './router/index.js';

const router = Router.instance();

router
  .addRoute(/^authorization$/, 'authorization')
  .addRoute(/^registration$/, 'registration')
  .addRoute(/^$/, 'messenger')
  .addRoute(/^404$/, 'notFound')
  .addRoute(/^500$/, 'serverError')
  .addRoute(/^userSettings$/, 'userSettings')
  .listen();

