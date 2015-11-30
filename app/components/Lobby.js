import React, { Component, PropTypes } from 'react'
import { Table, ButtonInput } from 'react-bootstrap'
import ChatRequest from './Modals/ChatRequest'
import ChatRequested from './Modals/ChatRequested'
import styles from './Lobby.module.css'

let defaultState = {
  showChatRequest: false,
  chatToPersonId: '',
  showChatRequestedToMe: false,
  chatRequestTimeout: null
}

class Lobby extends Component {

  static propTypes = {
    populatePeopleList: PropTypes.func.isRequired,
    userId: PropTypes.string,
    peer: PropTypes.any,
    history: PropTypes.any,
    people: PropTypes.any,
    createNewChat: PropTypes.func.isRequired,
    chatRequest: PropTypes.any,
    chatRequestHandler: PropTypes.func.isRequired,
    chatRequestReset: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this.state = defaultState
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.chatRequest) {
      let chatRequest = nextProps.chatRequest

      if (chatRequest.sentTo) {
        let personId = chatRequest.sentTo
        let timeout = setTimeout(() => this.closeModal('showChatRequest'), 10000)

        return this.openModal(personId, 'showChatRequest', timeout)
      }

      if (chatRequest.from) {
        let personId = chatRequest.from
        let timeout = setTimeout(() => this.closeModal('showChatRequestedToMe'), 10000)

        return this.openModal(personId, 'showChatRequestedToMe', timeout)
      }

      // Chat request was accepted or denied
      // close modal and clear timeout
      this.closeModal()

      // If chat was accepted
      if (chatRequest.accepted) {
        let personId = chatRequest.accepted

        this.props.history.pushState(null, '/chat/' + personId)
      }
    }
  }

  startConversation (personId) {
    let self = this
    return () => {
      self.props.createNewChat(personId, self.props.peer)
      // self.props.history.pushState(null, '/chat/' + personId)
    }
  }

  drawRow (personId) {
    return (
      <tr key={personId}>
        <td>{personId}</td>
        <td className={styles.empty}></td>
        <td className={styles.tdAction}>
          <ButtonInput
            type='button'
            bsStyle='success'
            value='Start conversation'
            onClick={this.startConversation(personId)} />
        </td>
      </tr>
    )
  }

  drawEmptyRow () {
    return (
      <tr>
        <td className={styles.empty}></td>
        <td className={styles.empty}></td>
        <td className={styles.empty}></td>
      </tr>
    )
  }

  drawPeople () {
    let self = this
    if (!this.props.people || this.props.people.size === 0) {
      return (
        <tr>
          <td>No one is connected to the peer server</td>
          <td className={styles.empty}></td>
          <td></td>
        </tr>
      )
    }

    let people = []
    this.props.people.forEach((personId) => {
      people.push(self.drawRow(personId))
      people.push(self.drawEmptyRow())
    })

    return people
  }

  refreshUsers (e) {
    if (e) {
      e.preventDefault()
    }

    this.props.populatePeopleList(this.props.userId, this.props.peer)
  }

  closeModal () {
    // Clear interval
    clearInterval(this.state.chatRequestTimeout)

    setTimeout(() => this.props.chatRequestReset(), 100)

    this.setState(defaultState)
  }

  openModal (personId, key, timeout) {
    let obj = {}
    obj[key] = true
    obj.chatToPersonId = personId
    obj.chatRequestTimeout = timeout

    this.setState(obj)
  }

  componentDidMount () {
    this.refreshUsers()
  }

  render () {
    let personId = this.state.chatToPersonId
    let peer = this.props.peer

    return (
      <div className={styles.container}>
      <ButtonInput
        type='button'
        bsStyle='warning'
        value='Refresh'
        onClick={this.refreshUsers.bind(this)} />
        <Table condensed>
          <thead>
            <tr>
              <th style={{width: '80%'}}>Users Ids</th>
              <th className={styles.empty}></th>
              <th>Action</th>
            </tr>
            <tr>
              <th className={styles.empty}></th>
              <th className={styles.empty}></th>
              <th className={styles.empty}></th>
            </tr>
          </thead>
          <tbody>
            {this.drawPeople()}
          </tbody>
        </Table>
        <ChatRequest
          personId={personId}
          showModal={this.state.showChatRequest}
        />
        <ChatRequested
          personId={personId}
          showModal={this.state.showChatRequestedToMe}
          acceptFn={this.props.chatRequestHandler.bind(this, true, personId, peer)}
          denyFn={this.props.chatRequestHandler.bind(this, false, personId, peer)}
        />
      </div>
    )
  }
}

export default Lobby
