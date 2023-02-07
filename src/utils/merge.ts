export type Indexed<T = unknown> = {
  [key in string]: T
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!(p in rhs)) {
      continue
    }

    try {
      if ((rhs[p] as Indexed).constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed)
      } else {
        lhs[p] = rhs[p]
      }
    } catch (e) {
      lhs[p] = rhs[p]
    }
  }

  return lhs
}

console.log(merge({ a: { b: { a: 2 } }, d: 5 }, { a: { b: { c: 1 } } }))

export default merge
