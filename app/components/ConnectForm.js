import React, { Component } from 'react'
import { Input, ButtonInput } from 'react-bootstrap'
import styles from './ConnectForm.module.css'
import { reduxForm } from 'redux-form'

class ConnectForm extends Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  }

  render () {
    const {fields: {userName, host, port}, handleSubmit} = this.props

    return (
      <div>
        <div className={styles.container}>
          <h2>Connect</h2>
          <h4>to a Battleship Peer Server</h4>
          <br />
          <form onSubmit={handleSubmit}>
            <Input
              type='text'
              label='Username'
              placeholder='Enter your username'
              {...userName}
            />
            <Input
              type='text'
              label='Server Hostname'
              placeholder='Enter server hostname'
              {...host}
            />
            <Input
              type='text'
              label='Server Port'
              placeholder='Enter server port'
              {...port}
            />
            <ButtonInput type='submit' bsStyle='primary' value='Connect' onClick={handleSubmit} />
          </form>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'connect',
  fields: ['userName', 'host', 'port']
})(ConnectForm)
