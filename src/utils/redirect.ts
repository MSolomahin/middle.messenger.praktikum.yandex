import routes from '../assets/const/routing'
import Router from '../router'
import store, { StoreEvents } from '../store'

window.addEventListener('DOMContentLoaded', () => {
  const location = window.location.pathname
  const user = localStorage.getItem('user')

  if (
    [routes.auth, routes.registration].includes(location) &&
    user
  ) {
    Router.navigate(routes.messenger)
  }

  if (![routes.auth].includes(location) && !user) {
    Router.navigate(routes.auth)
  }

  store.on(StoreEvents.Updated, () => {
    const state = store.getState()
    if (!state.user?.first_name) {
      Router.navigate(routes.auth)
    }
  })
})
