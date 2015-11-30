export const HYDRATE_PEOPLE = 'HYDRATE_PEOPLE'

export function populatePeopleList (userId, peer) {
  return dispatch => {
    let peersList = []

    peer.listAllPeers(function (data) {
      peersList = data

      peersList = peersList.filter(function (personId) {
        return personId !== userId
      })

      dispatch(peopleListAction(peersList))
    })
  }
}

function peopleListAction (peersList) {
  return {
    type: HYDRATE_PEOPLE,
    payload: peersList
  }
}

export default { populatePeopleList }
