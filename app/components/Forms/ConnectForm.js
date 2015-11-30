import React, { Component } from 'react'
import { Input, ButtonInput } from 'react-bootstrap'
import { reduxForm } from 'redux-form'

class ConnectForm extends Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
  }

  render () {
    const {fields: {userId, host, port}, handleSubmit} = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Input
          type='text'
          label='Name'
          placeholder='Default: Random uuid'
          {...userId}
        />
        <Input
          type='text'
          label='Server Hostname'
          placeholder='Default: ricardofbarros.me'
          {...host}
        />
        <Input
          type='text'
          label='Server Port'
          placeholder='Default: 9000'
          {...port}
        />
        <ButtonInput type='submit' bsStyle='primary' value='Connect' onClick={handleSubmit} />
      </form>
    )
  }
}

export default reduxForm({
  form: 'connect',
  fields: ['userId', 'host', 'port']
})(ConnectForm)
