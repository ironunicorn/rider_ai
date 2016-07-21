import * as d3 from 'd3'

export function linearGraph(xSelection, ySelection, result) {
  let linear = d3.select('#linear')
  linear.html('')
  const { x_fields, y_fields, x_results, y_results } = result
  const data = x_results.map((dataPoints, index) => {
    return {
      x: x_results[index][xSelection],
      y: y_results[index][ySelection]
    }
  })

  data.sort((previous, next) => previous.x - next.x)

  let margin = {top: 75, right: 65, bottom: 100, left: 100},
      width = 700 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom

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

  // svg.append('text')
  //     .attr('font-family', 'Roboto, sans-serif')
  //     .attr('fill', '#333')
  //     .attr('x', '-45%')
  //     .attr('y', '-50')
  //     .attr('transform','rotate(270)')
  //     .text(y_fields[ySelection])
  // 
  // svg.append('text')
  //     .attr('font-family', 'Roboto, sans-serif')
  //     .attr('fill', '#333')
  //     .attr('x', '32%')
  //     .attr('y', '83%')
  //     .text(x_fields[xSelection])

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
