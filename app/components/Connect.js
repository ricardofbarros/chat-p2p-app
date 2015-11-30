import React, { Component, PropTypes } from 'react'
import ConnectForm from '../components/ConnectForm'
import styles from './Connect.module.css'

class Connect extends Component {

  static propTypes = {
    generateUserId: PropTypes.func.isRequired,
    connectUser: PropTypes.func.isRequired,
    resetConnection: PropTypes.func.isRequired,
    host: PropTypes.string,
    port: PropTypes.number,
    userId: PropTypes.string,
    peer: PropTypes.any,
    history: PropTypes.any
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
      this.props.history.pushState({
        host: nextProps.host,
        port: nextProps.port,
        userId: nextProps.userId
      }, '/lobby')
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
      connectionObj.host = 'localhost'
    }

    if (!connectionObj.port) {
      connectionObj.port = 9000
    }

    connectionObj.userId = this.props.userId

    this.props.connectUser(connectionObj)
  }

  render () {
    return (
      <div>
        <div className={styles.container}>
          <h2>Connect</h2>
          <h4>to a P2P chat</h4>
          <br />
          <ConnectForm onSubmit={this.connect.bind(this)} />
        </div>
      </div>
    )
  }
}

export default Connect
