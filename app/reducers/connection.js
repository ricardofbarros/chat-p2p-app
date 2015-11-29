import {
  CONNECT_USER_SUCCESS,
  CONNECT_USER_FAIL,
  GENERATE_USER_ID,
  CONNECTION_RESET
} from '../actions/connect'

export const initialState = {
  host: '',
  port: 0,
  userName: '',
  userId: '',
  peer: {}
}

function connection (state = initialState, action) {
  switch (action.type) {
    case CONNECT_USER_SUCCESS:
      return Object.assign({}, state, {
        host: action.payload.host,
        port: action.payload.port,
        userName: action.payload.userName,
        peer: action.payload.peer
      })

    case CONNECT_USER_FAIL:
      return Object.assign({}, state, {
        peer: false
      })

    case GENERATE_USER_ID:
      return Object.assign({}, state, {
        userId: action.payload
      })

    case CONNECTION_RESET:
      return Object.assign({}, state, {
        peer: {}
      })

    default:
      return state
  }
}

export default connection
