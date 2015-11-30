import React, { Component, PropTypes } from 'react'
import MessageForm from './Forms/MessageForm'
import styles from './Chat.module.css'
import uuid from 'uuid'

class Chat extends Component {

  static propTypes = {
    sendMsg: PropTypes.func.isRequired,
    userId: PropTypes.string,
    peer: PropTypes.any,
    history: PropTypes.any,
    chatStatus: PropTypes.bool,
    params: PropTypes.any,
    messages: PropTypes.array
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.chatStatus) {
      this.props.history.pushState(null, '/lobby')
    }
  }

  sendMessage (msgObj) {
    let msg = msgObj.msg
    let params = this.props.params

    this.props.sendMsg(params.personId, this.props.peer, msg)
  }

  renderMessage (msgObj) {
    return (
      <li key={uuid.v4()}>
        {msgObj.personId} says: {msgObj.msg}
      </li>
    )
  }

  render () {
    let messages = this.props.messages

    return (
      <div className={styles.container}>
        <div>
          <ul>
            {messages.map(msgObj => this.renderMessage(msgObj))}
          </ul>
        </div>
        <div className={styles.msgForm}>
          <MessageForm
            onSubmit={this.sendMessage.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default Chat
