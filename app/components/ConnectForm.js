import React, { Component } from 'react'
import { Input, ButtonInput } from 'react-bootstrap'
import styles from './ConnectForm.module.css'

class ConnectForm extends Component {
  static propTypes = {
    connectionObj: React.PropTypes.shape({
      host: React.PropTypes.string.isRequired,
      port: React.PropTypes.string.isRequired,
      userName: React.PropTypes.string.isRequired
    }),
    onClick: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
  }

  render () {
    let onClick = this.props.onClick.bind(null, this.props.connectionObj)

    return (
      <div>
        <div className={styles.container}>
          <h2>Connect</h2>
          <h4>to a Battleship Peer Server</h4>
          <br />
          <form>
            <Input
              type='text'
              label='Username'
              name='userName'
              placeholder='Enter your username'
              onChange={this.props.onChange}
              value={this.props.connectionObj.userName}
            />
            <Input
              type='text'
              label='Server Hostname'
              name='host'
              placeholder='Enter server hostname'
              onChange={this.props.onChange}
              value={this.props.connectionObj.host}
            />
            <Input
              type='text'
              label='Server Port'
              name='port'
              placeholder='Enter server port'
              onChange={this.props.onChange}
              value={this.props.connectionObj.port}
            />
            <ButtonInput type='submit' bsStyle='primary' value='Connect' onClick={onClick} />
          </form>
        </div>
      </div>
    )
  }
}

export default ConnectForm
