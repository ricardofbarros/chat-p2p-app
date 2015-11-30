import {
  SEND_CHAT_REQUEST,
  SEND_MSG,
  receivedChatRequest,
  receiveMsg,
  leaveChat
} from '../actions/chat'

function handleChat (conn, dispatch) {
  conn.on('data', (data) => {
    conn.on('close', () => {
      alert(conn.peer + ' has left the chat.')
      dispatch(leaveChat())
    })

    let payload = data.payload

    // Exceptions - Invert this actions
    if (data.type === SEND_CHAT_REQUEST) {
      return dispatch(receivedChatRequest(conn.peer))
    } else if (data.type === SEND_MSG) {
      return dispatch(receiveMsg(payload.personId, payload.msg))
    }

    return dispatch(data)
  })
}

export default handleChat
