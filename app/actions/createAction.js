export function createActionAsync (type, actionCreator, mapFn) {
  return async (...a) => {
    let action = {
      type
    }

    let result = await actionCreator.apply(null, a)
    action.payload = result.data

    if (result.error) {
      action.error = true
    }

    if (!result.error && typeof mapFn === 'function') {
      let mapResult = [action.payload].map(mapFn)
      action.payload = mapResult[0]
    }

    return action
  }
}

export function createAction (type, actionCreator, mapFn) {
  return (...a) => {
    let action = {
      type
    }

    let result = actionCreator.apply(null, a)
    action.payload = result

    if (result.error) {
      action.error = true
    }

    if (!result.error && typeof mapFn === 'function') {
      let mapResult = [action.payload].map(mapFn)
      action.payload = mapResult[0]
    }

    return action
  }
}

export default { createActionAsync, createAction }
