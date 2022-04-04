import * as utils from './index.js'

function childCheck(obj) {
  if (utils.isPrimitive(obj)) {
    return false
  }

  const keys = []
  for (const key in obj) {
    keys.push(key)
  }

  return Boolean(keys.length)
}

export { childCheck }