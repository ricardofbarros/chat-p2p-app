import React, { Component, PropTypes } from 'react'
import ConnectForm from '../components/ConnectForm'

class Connect extends Component {

  static propTypes = {
    connectUser: PropTypes.func.isRequired,
    generateUserId: PropTypes.func.isRequired,
    resetConnection: PropTypes.func.isRequired,
    host: PropTypes.string,
    port: PropTypes.any,
    userName: PropTypes.string,
    userId: PropTypes.string,
    peer: PropTypes.any
  }

  componentDidMount () {
    this.props.generateUserId()
  }

  componentWillReceiveProps (nextProps) {
    // Connetion failed
    if (!nextProps.peer) {
      alert('Connection failed')
      setTimeout(() => this.props.resetConnection(), 100)
    }

    // Connection succeed
    if (typeof nextProps.peer.connect === 'function') {

    }
  }

  setConnectState (e) {
    let field = e.target.name
    let value = e.target.value

    let newState = {}
    newState[field] = value

    this.localState = Object.assign({}, this.localState, newState)
  }

  connect (connectionObj) {
    // TODO: Spin animation

    if (!connectionObj.host) {
      connectionObj.host = 'ricardofbarros.me'
    }

    if (!connectionObj.port) {
      connectionObj.port = 9000
    }

    this.props.connectUser(connectionObj)
  }

  render () {
    return (
      <ConnectForm onSubmit={this.connect.bind(this)} />
    )
  }
}

export default Connect
