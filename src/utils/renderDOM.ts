import Component from '../core/component'

export function render(query: string, block: Component) {
  const root = document.querySelector(query)

  const content = block.getContent()
  if (!root || !content) return
  root.innerHTML = ''
  root.appendChild(content)

  block.dispatchComponentDidMount()

  return root
}
