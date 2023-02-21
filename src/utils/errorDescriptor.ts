import { Errors } from '../assets/const/errors'
import routes from '../assets/const/routing'
import Router from '../router'
import { showError } from '../ui/toast/toast'

interface IServerErrorResponse {
  reason: string
}

export function handleError() {
  return (
    target: Object,
    _: string,
    descriptor: TypedPropertyDescriptor<(...args: unknown[]) => unknown>
  ) => {
    const method = descriptor.value

    descriptor.value = async function (...args: unknown[]) {
      try {
        const result = await method!.apply(target, args)
        if (result) {
          return result
        }
      } catch (error: unknown) {
        if (isServerError(error)) {
          if (error.reason === Errors.NOT_AUTH) {
            localStorage.removeItem('user')
            Router.navigate(routes.auth)
          } else {
            showError(error.reason)
          }
        }
        if (isClientError(error)) showError(error.message)
      }
    }
  }
}

export const isServerError = (
  error: unknown
): error is IServerErrorResponse => {
  if (typeof error === 'object' && error !== null && 'reason' in error) {
    return true
  }
  return false
}

export const isClientError = (error: unknown): error is Error => {
  return error instanceof Error
}
