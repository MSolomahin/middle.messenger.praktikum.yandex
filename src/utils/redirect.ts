import routes from '../assets/const/routing'
import Router from '../router'

window.addEventListener('DOMContentLoaded', () => {
  const location = window.location.pathname
  const authorized = localStorage.getItem('authorized')

  if (
    [routes.auth, routes.registration].includes(location) &&
    authorized === 'true'
  ) {
    Router.navigate(routes.messenger)
  }

  if (![routes.auth].includes(location) && !authorized) {
    Router.navigate(routes.auth)
  }
})
