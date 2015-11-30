import handleChat from '../api/handleChat'

export const SEND_CHAT_REQUEST = 'SEND_CHAT_REQUEST'
export const RECEIVED_CHAT_REQUEST = 'RECEIVED_CHAT_REQUEST'
export const CHAT_REQUEST_ACCEPTED = 'CHAT_REQUEST_ACCEPTED'
export const CHAT_REQUEST_DENIED = 'CHAT_REQUEST_DENIED'
export const CHAT_REQUEST_RESET = 'CHAT_REQUEST_RESET'
export const SEND_MSG = 'SEND_MSG'
export const RECEIVE_MSG = 'RECEIVE_MSG'
export const LEAVE_CHAT = 'LEAVE_CHAT'

export function createNewChat (personId, peer) {
  let conn = peer.connect(personId)

  return dispatch => {
    conn.on('open', () => {
      let action = sendChatRequest(personId)

      dispatch(action)
      conn.send(action)
      handleChat(conn, dispatch)
    })
    conn.on('error', (err) => alert(err))
  }
}

function sendChatRequest (personId) {
  return {
    type: SEND_CHAT_REQUEST,
    payload: personId
  }
}

export function receivedChatRequest (personId) {
  return {
    type: RECEIVED_CHAT_REQUEST,
    payload: personId
  }
}

export function chatRequestHandler (status, personId, peer) {
  let conn = peer.connections[personId][0]
  let action

  return dispatch => {
    if (status) {
      action = {
        type: CHAT_REQUEST_ACCEPTED,
        payload: personId
      }
    } else {
      action = {
        type: CHAT_REQUEST_DENIED
      }
    }

    let actionProtocol = Object.assign({}, action)
    if (actionProtocol.payload) {
      actionProtocol.payload = peer.id
    }

    conn.send(actionProtocol)
    dispatch(action)
  }
}

export function chatRequestReset () {
  return {
    type: CHAT_REQUEST_RESET
  }
}

export function sendMsg (personId, peer, msg) {
  let conn = peer.connections[personId][0]

  let action = {
    type: SEND_MSG,
    payload: {
      msg,
      personId: peer.id
    }
  }

  return dispatch => {
    dispatch(action)
    conn.send(action)
  }
}

export function receiveMsg (personId, msg) {
  return {
    type: RECEIVE_MSG,
    payload: {
      msg,
      personId
    }
  }
}

export function leaveChat (personId, peer) {
  if (personId && peer) {
    var conns = peer.connections[personId]

    // Close all connections to this peer
    for (var i = 0; i < conns.length; i++) {
      conns[i].close()
    }
  }

  return {
    type: LEAVE_CHAT
  }
}

export default { sendMsg, createNewChat }
