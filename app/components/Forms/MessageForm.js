import React, { Component } from 'react'
import { Input, Button } from 'react-bootstrap'
import { reduxForm } from 'redux-form'

class MessageForm extends Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired
  }

  render () {
    const {fields: {msg}, resetForm, handleSubmit} = this.props

    let customHandleSubmit = () => {
      resetForm()
      handleSubmit()
    }

    return (
      <form onSubmit={customHandleSubmit}>
        <Input
          id='sendMessage'
          type='text'
          placeholder='Type your message here...'
          {...msg}
        />
        <Button bsStyle='warning' onClick={customHandleSubmit}>Send</Button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'send-message',
  fields: ['msg']
})(MessageForm)
