import template from './toast.tmpl'
import Component from '../../core/component'
import './toast.style.scss'
import { ToastProps } from './toast.types'

class Toast extends Component {
  static _instance: Toast

  constructor(props: ToastProps) {
    super({
      attrs: {
        class: `toast show ${props.type}`
      }
    })
    if (Toast._instance) {
      return Toast._instance
    }

    Toast._instance = this
  }

  showToast = (title: string) => {
    const element = this.getContent()
    if (!element) return
    document.body.append(element)
    element.textContent = title
    setTimeout(function () {
      element.remove()
    }, 3000)
  }

  render() {
    return this.compile({ ...this.props }, template)
  }
}

function showToast(toast: Toast, title: string) {
  toast.showToast(title)
}
export function showSuccess(title: string) {
  const toast = new Toast({ type: 'success' })
  showToast(toast, title)
}
export function showError(title: string) {
  const toast = new Toast({ type: 'error' })
  showToast(toast, title)
}

export default Toast
