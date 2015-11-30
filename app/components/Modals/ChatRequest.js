import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-bootstrap'

class ChatRequest extends Component {

  static propTypes = {
    personId: PropTypes.string,
    showModal: PropTypes.bool.isRequired
  }

  render () {
    return (
      <Modal show={this.props.showModal}>
        <Modal.Header>
          <Modal.Title>Chat request sent...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Waiting for {this.props.personId} to accept...
        </Modal.Body>
      </Modal>
    )
  }
}

export default ChatRequest
