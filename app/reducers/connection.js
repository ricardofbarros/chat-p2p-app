import {
  CONNECT_USER_SUCCESS,
  CONNECT_USER_FAIL,
  CONNECTION_RESET,
  GENERATE_USER_ID
} from '../actions/connect'

export const initialState = {
  host: '',
  port: 0,
  userId: '',
  peer: {}
}

function connection (state = initialState, action) {
  switch (action.type) {
    case CONNECT_USER_SUCCESS:
      return Object.assign({}, state, action.payload)

    case CONNECT_USER_FAIL:
      return Object.assign({}, state, {
        peer: false
      })

    case CONNECTION_RESET:
      return Object.assign({}, state, {
        peer: {}
      })

    case GENERATE_USER_ID:
      return Object.assign({}, state, {
        userId: action.payload
      })

    default:
      return state
  }
}

export default connection
