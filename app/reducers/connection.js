import { CONNECT_USER, GENERATE_USER_ID } from '../actions/connect'

export const initialState = {
  host: '',
  port: '',
  userName: '',
  userId: ''
}

export default function connect (state = initialState, action) {
  switch (action.type) {
    case CONNECT_USER:
      return Object.assign({}, state, {
        host: action.payload.host,
        port: action.payload.port,
        userName: action.payload.userName
      })

    case GENERATE_USER_ID:
      return Object.assign({}, state, {
        userId: action.payload
      })

    default:
      return state
  }
}
