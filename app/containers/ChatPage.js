import ChatActions from '../actions/Chat'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Chat from '../components/Chat'

function mapStateToProps (state) {
  let messages = state.chat.messages.toArray()

  return {
    peer: state.connection.peer,
    userId: state.connection.userId,
    chatStatus: state.chat.chatStatus,
    messages
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(ChatActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
