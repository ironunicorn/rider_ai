import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'

class AboutApp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <AppBar title="Rider AI" iconElementLeft={<div></div>} />
      </div>
    )
  }
}

export default connect()(AboutApp)
