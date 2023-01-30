const last = <T>(list: T[]) => {
  if (Array.isArray(list)) {
    return list.at(-1)
  }
}

export default last
