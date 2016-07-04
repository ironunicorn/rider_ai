import React, { Component } from 'react'
import d3 from 'd3'

export default class LinearVisualization extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { result } = this.props
    return (
      <ul>
        {result.y_results.map((datapoint) => <li>{datapoint[0]}</li>)}
      </ul>
    )
  }
}
