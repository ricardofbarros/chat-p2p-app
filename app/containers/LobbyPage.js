import LobbyActions from '../actions/lobby'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Lobby from '../components/Lobby'
import { createNewChat, chatRequestHandler, chatRequestReset } from '../actions/chat'

let actions = {
  ...LobbyActions,
  createNewChat,
  chatRequestHandler,
  chatRequestReset
}

function mapStateToProps (state) {
  return {
    people: state.lobby,
    peer: state.connection.peer,
    userId: state.connection.userId,
    chatRequest: state.chat.chatRequest
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby)
