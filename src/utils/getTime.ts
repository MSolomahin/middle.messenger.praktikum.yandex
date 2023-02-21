export const getTime = (date: Date | string) => {
    if (date) {
      return new Date(date).toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    return ''
  }
