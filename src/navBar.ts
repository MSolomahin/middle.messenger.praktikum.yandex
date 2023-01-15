const button = document.querySelector('.js_navButton')
const navbar = document.querySelector('.js-nav')

button?.addEventListener('click', (e) => {
  navbar?.classList.remove('nav_opened')
})
