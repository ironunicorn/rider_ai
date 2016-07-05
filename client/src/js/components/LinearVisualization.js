import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import * as d3 from 'd3'

export default class LinearVisualization extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { result } = this.props
    let x_data = result.x_results.map((datapoint) => datapoint[0])
    let y_data = result.y_results.map((datapoint) => datapoint[0])

    let data = []
    for (var i = 0; i < x_data.length; i++) {
      data.push({x: x_data[i], y: y_data[i]})
    }

    data.sort((group1, group2) => group1.x - group2.x)

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
              .range([0, width])

    var y = d3.scaleLinear()
              .range([height, 0])

    var xAxis = d3.axisBottom()
                  .scale(x)

    var yAxis = d3.axisLeft()
                  .scale(y)

    var line = d3.line()
                 .x((d) => x(d.x))
                 .y((d) => y(d.y))

    var svg = d3.select('#linear').append("svg")
               .attr("width", width + margin.left + margin.right)
               .attr("height", height + margin.top + margin.bottom)
             .append("g")
               .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

     x.domain(d3.extent(data, function(d) { return d.x }));
     y.domain(d3.extent(data, function(d) { return d.y }));

     svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis);

     svg.append("g")
         .attr("class", "y axis")
         .call(yAxis)
       .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", ".71em")
         .style("text-anchor", "end")
         .text("Price ($)");

     svg.append("path")
         .datum(data)
         .attr("class", "line")
         .attr("d", line);
  }

  render() {
    const { result, handleReset } = this.props
    return (
      <div style={{margin: 'auto', textAlign: 'center', width: '600px'}} >
        <div>{result.x_fields[0]} vs. {result.y_fields[0]}</div>
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
