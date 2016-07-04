import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addContact } from '../actions/contactAction'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar'
import ContactForm from '../components/ContactForm'
import FontIcon from 'material-ui/FontIcon'

class ContactApp extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false, sent: false, failure: false }
  }

  handleChange(input) {
    this.setState(input)
  }

  handleSubmit(payload) {
    const { dispatch } = this.props
    const success = this.setState.bind(this, {sent: true})
    const failure = this.setState.bind(this, {failure: true})
    dispatch(addContact(payload, success, failure))
    this.setState({open: false})
  }

  render() {
    const { payload } = this.props
    const { open, sent, failure } = this.state
    return (
      <div>
        <div className="contact-button">
          <FloatingActionButton onTouchTap={this.handleChange.bind(this, {open: true})}
                                mini={true}
                                tooltipPosition="top-center"
                                style={{margin: "5px", color: "white"}}
                                tooltip="Contact">
            <FontIcon className="material-icons">send</FontIcon>
          </FloatingActionButton>
        </div>
        <Dialog
          title="Say Hello!"
          actions={this.actions}
          modal={false}
          open={open}
          onRequestClose={this.handleChange.bind(this, {open: false})}
        >
          <ContactForm onSubmit={this.handleSubmit.bind(this)}
                       payload={payload} />
        </Dialog>
        <Snackbar
          open={sent}
          message="Message sent!"
          autoHideDuration={3000}
          onRequestClose={this.handleChange.bind(this, {sent: false})}
        />
        <Snackbar
          open={failure}
          message="Oops! Something went wrong. Please try again."
          autoHideDuration={3000}
          onRequestClose={this.handleChange.bind(this, {failure: false})}
        />
      </div>
    )
  }
}

ContactApp.propTypes = {
  payload: PropTypes.object.isRequired,
  isPosting: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { payload, isPosting, lastUpdated } = state.contact || {
    payload: {},
    isPosting: false,
  }
  return {
    payload,
    isPosting,
    lastUpdated,
  }
}

export default connect(mapStateToProps)(ContactApp)
