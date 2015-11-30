import Peer from 'peerjs'
import Rx from 'rx'
import uuid from 'uuid'
import handleChat from '../api/handleChat'

export const CONNECT_USER_SUCCESS = 'CONNECT_USER_SUCCESS'
export const CONNECT_USER_FAIL = 'CONNECT_USER_FAIL'
export const CONNECTION_RESET = 'CONNECTION_RESET'
export const GENERATE_USER_ID = 'GENERATE_USER_ID'

export function connectUser (data) {
  let peer = new Peer(data.userId, {
    host: data.host,
    port: data.port,
    key: 'p2p-chat'
  })

  let peerStreamError = Rx.Observable.fromEvent(peer, 'error')
  let peerStreamNewConnection = Rx.Observable.fromEvent(peer, 'connection')
    .map((conn) => {
      return {
        conn
      }
    })
  let peerStream = Rx.Observable.fromEvent(peer, 'open')
    .map(id => {
      return {
        userId: id,
        host: data.host,
        port: data.port,
        peer
      }
    })
    .merge(peerStreamError)
    .merge(peerStreamNewConnection)

  return dispatch => {
    peerStream.subscribe((seq) => {
      if (seq instanceof Error) {
        return dispatch(connectUserFail(seq))
      }

      // New connection
      if (seq.conn) {
        return handleChat(seq.conn, dispatch)
      }

      // Socket open
      return dispatch(connectUserSuccess(seq))
    })
  }
}

function connectUserSuccess (data) {
  return {
    type: CONNECT_USER_SUCCESS,
    payload: data
  }
}

function connectUserFail (err) {
  return {
    type: CONNECT_USER_FAIL,
    payload: err,
    error: true
  }
}

export function generateUserId () {
  return {
    type: GENERATE_USER_ID,
    payload: uuid.v4()
  }
}

export function resetConnection () {
  return {
    type: CONNECTION_RESET
  }
}

export default { generateUserId, connectUser, resetConnection }
