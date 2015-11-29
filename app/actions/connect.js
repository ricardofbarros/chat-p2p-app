import uuid from 'uuid'
import Peer from 'peerjs'
import Rx from 'rx'

export const CONNECT_USER_SUCCESS = 'CONNECT_USER_SUCCESS'
export const CONNECT_USER_FAIL = 'CONNECT_USER_FAIL'
export const GENERATE_USER_ID = 'GENERATE_USER_ID'
export const CONNECTION_RESET = 'CONNECTION_RESET'

export function connectUser (data) {
  let peer = new Peer({
    host: data.host,
    port: data.port,
    key: 'battleship-game'
  })

  let peerStreamError = Rx.Observable.fromEvent(peer, 'error')
  let peerStream = Rx.Observable.fromEvent(peer, 'open')
    .map(id => {
      return {
        host: data.host,
        port: data.port,
        peer: peer
      }
    })
    .merge(peerStreamError)

  return dispatch => {
    peerStream.subscribe((seq) => {
      if (seq instanceof Error) {
        return dispatch(connectUserFail(seq))
      }

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
