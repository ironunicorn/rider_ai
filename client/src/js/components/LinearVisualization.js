import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import * as d3 from 'd3'

export default class LinearVisualization extends Component {
  constructor(props) {
    super(props)
    this.state = {xSelection: 0, ySelection: 0}
  }

  componentDidMount() {
    const { xSelection, ySelection } = this.state
    this.linearGraph(xSelection, ySelection)
  }

  handleChange(key, event, index, value) {
    const field = {}
    field[key] = value
    const selections = Object.assign({}, this.state, field)
    const { xSelection, ySelection } = selections
    this.linearGraph(xSelection, ySelection)
    this.setState(selections)
  }

  linearGraph(xSelection, ySelection) {
    let linear = d3.select('#linear')
    linear.html('')
    const { x_results, y_results } = this.props.result
    const data = x_results.map((dataPoints, index) => {
      return {
        x: x_results[index][xSelection],
        y: y_results[index][ySelection]
      }
    })

    data.sort((previous, next) => previous.x - next.x)

    let margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom

    let x = d3.scaleLinear().range([0, width])
    let y = d3.scaleLinear().range([height, 0])

    let xAxis = d3.axisBottom().scale(x)
    let yAxis = d3.axisLeft().scale(y)

    let line = d3.line().x((d) => x(d.x)).y((d) => y(d.y))

    let svg = linear.append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                   .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

     x.domain(d3.extent(data, (d) => d.x))
     y.domain(d3.extent(data, (d) => d.y))

     svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)

     svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
       .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Price ($)')

     svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line)
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
      <div style={{margin: 'auto', textAlign: 'center', width: '600px'}} >
        {this.dropDown(result.x_fields, xSelection, 'xSelection')}
        vs.
        {this.dropDown(result.y_fields, ySelection, 'ySelection')}
        <div id='linear'></div>
        <RaisedButton
          label="Reset"
          secondary={true}
          onTouchTap={handleReset}
        />
      </div>
    )
  }
}
