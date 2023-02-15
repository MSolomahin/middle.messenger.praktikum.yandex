import routes from '../assets/const/routing'
import Router from '../router'

window.addEventListener('DOMContentLoaded', () => {
  const location = window.location.pathname
  const signedIn = localStorage.getItem('signedIn')

  if (
    [routes.auth, routes.registration].includes(location) &&
    signedIn
  ) {
    Router.navigate(routes.messenger)
  }

  if (![routes.auth].includes(location) && !signedIn) {
    Router.navigate(routes.auth)
  }
})
