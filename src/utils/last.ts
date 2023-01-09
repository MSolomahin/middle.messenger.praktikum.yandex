const last = (list: any[]) => {
  if (Array.isArray(list)) {
    return list.at(-1)
  }
}

export default last
