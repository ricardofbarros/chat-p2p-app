import ConnectActions from '../actions/connect'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Connect from '../components/Connect'

function mapStateToProps (state) {
  return {
    host: state.connection.host,
    port: state.connection.port,
    userId: state.connection.userId,
    peer: state.connection.peer
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(ConnectActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Connect)
