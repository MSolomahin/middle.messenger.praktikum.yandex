import { showError } from '../ui/toast/toast'

interface IServerErrorResponse {
  reason: string
}
interface IClientErrorResponse {
  message: string
}

export function handleError() {
  return (
    target: Object,
    _: string,
    descriptor: TypedPropertyDescriptor<(...args: any) => any>
  ) => {
    const method = descriptor.value

    descriptor.value = async function (...args: any) {
      try {
        const result = await method!.apply(target, args)
        if (result) {
          return result
        }
      } catch (error: any) {
        if (isServerError(error)) showError(error.reason)
        if (isClientError(error)) showError(error.message)
      }
    }
  }
}

export const isServerError = (error: any): error is IServerErrorResponse => {
  return 'reason' in error
}

export const isClientError = (error: any): error is IClientErrorResponse => {
  return 'message' in error
}
