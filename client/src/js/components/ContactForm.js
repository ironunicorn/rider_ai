import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class ContactForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      payload: {name: '', email_address: '', message: ''},
      errors: {name: [], email_address: [], message: [] }
    }
  }

  handleChange(input) {
    const payload = Object.assign({}, this.state.payload, input)
    const foundErrors = this.validate(input)
    const errors = Object.assign({}, this.state.errors, foundErrors)
    this.setState({payload, errors})
  }

  onSubmit(e) {
    e.preventDefault()
    const { payload } = this.state
    const errors = this.validate(payload)
    this.setState({errors})
    if (this.errorCount(errors)) return

    this.props.onSubmit(payload)
  }

  validate(input) {
    let errors = {}
    Object.keys(input).forEach(function(key) {
      let errorList = []
      if (!input[key].length) {
        errorList.push("This field is required.")
      }
      if (key == "email_address" && !this.validateEmail(input[key])) {
        errorList.push("Please provide a valid email address.")
      }
      errors[key] = errorList
    }.bind(this))

    return errors
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/

    return re.test(email)
  }

  errorCount(errors) {
    return Object.keys(errors).reduce((prev, curr) => {
      return prev + errors[curr].length
    }, 0)
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Name"
          fullWidth={true}
          errorText={this.state.errors.name.join(' ')}
          onChange={e => {this.handleChange({name: e.target.value})}}
        /><br />
        <TextField
          hintText="Email Address"
          fullWidth={true}
          errorText={this.state.errors.email_address.join(' ')}
          onChange={e => {this.handleChange({email_address: e.target.value})}}
        />
        <TextField
          floatingLabelText="Message"
          fullWidth={true}
          multiLine={true}
          rows={2}
          rowsMax={6}
          errorText={this.state.errors.message.join(' ')}
          onChange={e => {this.handleChange({message: e.target.value})}}
        /><br /><br />
        <div style={{textAlign: "right"}}>
          <RaisedButton
            label="Send"
            labelPosition="before"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.onSubmit.bind(this)}
          />
        </div>
      </div>
    )
  }
}
