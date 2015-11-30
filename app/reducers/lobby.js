import { Set } from 'immutable'
import { HYDRATE_PEOPLE } from '../actions/lobby'

export const initialState = Set()

export default function connect (state = initialState, action) {
  switch (action.type) {
    case HYDRATE_PEOPLE:
      return Set(action.payload)

    default:
      return state
  }
}
