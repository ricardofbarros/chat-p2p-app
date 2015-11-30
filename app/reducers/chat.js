import { OrderedSet } from 'immutable'
import {
  SEND_CHAT_REQUEST,
  RECEIVED_CHAT_REQUEST,
  CHAT_REQUEST_ACCEPTED,
  CHAT_REQUEST_DENIED,
  CHAT_REQUEST_RESET,
  SEND_MSG,
  RECEIVE_MSG,
  LEAVE_CHAT
} from '../actions/chat'

export const initialState = {
  chatRequest: false,
  chatStatus: false,
  messages: OrderedSet()
}

export default function connect (state = initialState, action) {
  switch (action.type) {
    case SEND_CHAT_REQUEST:
      return Object.assign({}, state, {
        chatRequest: {
          // personId
          sentTo: action.payload
        }
      })

    case RECEIVED_CHAT_REQUEST:
      return Object.assign({}, state, {
        chatRequest: {
          // personId
          from: action.payload
        }
      })

    case CHAT_REQUEST_ACCEPTED:
      return Object.assign({}, state, {
        chatRequest: {
          // personId
          accepted: action.payload
        },
        chatStatus: true
      })

    case CHAT_REQUEST_DENIED:
      return Object.assign({}, state, {
        chatRequest: {
          denied: true
        }
      })

    case CHAT_REQUEST_RESET:
      return Object.assign({}, state, {
        chatRequest: false
      })

    case SEND_MSG:
    case RECEIVE_MSG:
      let messagesNewState = state.messages.add(action.payload)
      return Object.assign({}, state, {
        messages: messagesNewState
      })

    case LEAVE_CHAT:
      return Object.assign({}, state, {
        chatStatus: false
      })

    default:
      return state
  }
}
