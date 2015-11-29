import React, { Component, PropTypes } from 'react'
import ConnectForm from '../components/ConnectForm'
import ConnectActions from '../actions/connect'
import { connect } from 'react-redux'

class ConnectPage extends Component {

  static propTypes = {
    connectUser: PropTypes.func.isRequired,
    generateUserId: PropTypes.func.isRequired,
    host: PropTypes.string,
    port: PropTypes.string,
    userName: PropTypes.string,
    userId: PropTypes.string
  }

  constructor () {
    super()

    this.state = {
      host: '',
      port: '',
      userName: ''
    }
  }

  componentDidMount () {
    this.props.generateUserId()
  }

  setConnectState (e) {
    let field = e.target.name
    let value = e.target.value

    let newState = {}
    newState[field] = value

    return this.setState(
      Object.assign({}, this.state, newState)
    )
  }

  connect (connectionObj, e) {
    e.preventDefault()

    this.props.connectUser(connectionObj)
  }

  render () {
    return (
      <ConnectForm
        connectionObj={this.state}
        onClick={this.connect.bind(this)}
        onChange={this.setConnectState.bind(this)}
      />
    )
  }
}

function mapStateToProps (state) {
  return {
    host: state.host,
    port: state.port,
    userName: state.userName,
    userId: state.userId
  }
}

export default connect(
  mapStateToProps,
  {...ConnectActions}
)(ConnectPage)
