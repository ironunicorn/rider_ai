import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import {linearGraph} from '../visualizations/LinearRegression'
import Paper from 'material-ui/Paper'

export default class LinearVisualization extends Component {
  constructor(props) {
    super(props)
    this.state = {xSelection: 0, ySelection: 0}
  }

  componentDidMount() {
    const { xSelection, ySelection } = this.state
    linearGraph(xSelection, ySelection, this.props.result)
  }

  handleChange(key, event, index, value) {
    const field = {}
    field[key] = value
    const selections = Object.assign({}, this.state, field)
    const { xSelection, ySelection } = selections
    linearGraph(xSelection, ySelection, this.props.result)
    this.setState(selections)
  }

  dropDown(fields, valueIndex, key) {
    return (
      <DropDownMenu maxHeight={300}
                    value={valueIndex}
                    onChange={this.handleChange.bind(this, key)} >
        {fields.map((field, index) => {
          return <MenuItem value={index} key={index} primaryText={field} />
        })}
      </DropDownMenu>
    )
  }

  render() {
    const { result, handleReset } = this.props
    const { xSelection, ySelection } = this.state
    return (
      <div className="center">
        <Paper className="graph-card">
          {this.dropDown(result.x_fields, xSelection, 'xSelection')}
          vs.
          {this.dropDown(result.y_fields, ySelection, 'ySelection')}
          <div id='linear'></div>
          <div className="x-axis-label">{result.x_fields[xSelection]}</div>
          <div className="y-axis-label">{result.y_fields[ySelection]}</div>
        </Paper>
        <RaisedButton
           label="Reset"
           secondary={true}
           onTouchTap={handleReset}
        />
      </div>
    )
  }
}
