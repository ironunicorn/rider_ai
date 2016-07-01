import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

export default class FieldBreakdown extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { toLearn, toPredict } = this.props
    const style = {
      width: '500px',
      margin: '20px auto',
    }

    if (!toLearn.length) {
      return (
        <div style={{color: 'red'}}>
          <p>CSV files must have at least one matching header for algorithm to work.</p>
          <p>Please adjust your header names to match.</p>
        </div>
      )
    } else if (!toPredict.length) {
      return (
        <div style={{color: 'red'}}>
          <p>CSV files must have at least one field to predict.</p>
          <p>Please ensure the second file has missing data for the algorithm to guess.</p>
        </div>
      )
    } else {
      return (
        <Paper style={style} zDepth={2}>
          <List>
            <Subheader>Fields to use for predictions:</Subheader>
            {toLearn.map((field) => <ListItem primaryText={field} />)}
          </List>
          <Divider />
          <List>
            <Subheader>Fields to predict:</Subheader>
            {toPredict.map((field) => <ListItem primaryText={field} />)}
          </List>
        </Paper>
      )
    }
  }
}
