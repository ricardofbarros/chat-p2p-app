import React, { Component, PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'

class ChatRequest extends Component {

  static propTypes = {
    personId: PropTypes.string,
    showModal: PropTypes.bool.isRequired,
    acceptFn: PropTypes.func.isRequired,
    denyFn: PropTypes.func.isRequired
  }

  render () {
    return (
      <Modal show={this.props.showModal}>
        <Modal.Header>
          <Modal.Title>New chat request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          User {this.props.personId} has requested a private chat with you.
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='success' onClick={this.props.acceptFn}>Accept</Button>
          <Button bsStyle='danger' onClick={this.props.denyFn}>Decline</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ChatRequest
