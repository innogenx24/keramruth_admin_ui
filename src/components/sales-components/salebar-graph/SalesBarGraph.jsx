import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './SalesBarGraph.scss'; // Import the external SCSS file

const data = [
  { month: 'Jan', value1: 120, value2: 80, color1: '#FF5807', color2: '#FFB07A' }, // Orange, Light Orange
  { month: 'Feb', value1: 60, value2: 40, color1: '#1CAF00', color2: '#A1FF00' }, // Green, Light Green
  { month: 'Mar', value1: 180, value2: 120, color1: '#FE0968', color2: '#FEA068' }, // Pink, Light Pink
  { month: 'Apr', value1: 90, value2: 60, color1: '#187E53', color2: '#01C572' }, // Teal, Light Teal
  { month: 'May', value1: 60, value2: 40, color1: '#FF5807', color2: '#FFB07A' }, // Orange, Light Orange
  { month: 'Jun', value1: 150, value2: 100, color1: '#187E53', color2: '#01C572' }  // Teal, Light Teal
];

const SalesBarGraph = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    svg.attr('width', width).attr('height', height);

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([margin.left, width - margin.right])
      .padding(0.3); // Increase padding to minimize bar size

    const yScale = d3.scaleLinear()
      .domain([0, 300])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.selectAll('.bar')
      .data(data)
      .join('g')
      .each(function(d) {
        const barGroup = d3.select(this);

        // Bottom part of the bar
        barGroup.append('rect')
          .attr('class', 'bar-bottom')
          .attr('x', xScale(d.month))
          .attr('y', yScale(d.value1))
          .attr('height', yScale(0) - yScale(d.value1))
          .attr('width', xScale.bandwidth())
          .attr('fill', d.color1);

        // Top part of the bar
        barGroup.append('rect')
          .attr('class', 'bar-top')
          .attr('x', xScale(d.month))
          .attr('y', yScale(d.value1 + d.value2))
          .attr('height', yScale(d.value1) - yScale(d.value1 + d.value2))
          .attr('width', xScale.bandwidth())
          .attr('fill', d.color2)
          // .attr('rx', 5) // Add border radius
          // .attr('ry', 5); // Add border radius
      });

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(4).tickFormat(d => `₹${d}`))
      .call(g => g.selectAll('.tick line').remove())
      .call(g => g.selectAll('.domain').remove()); // Remove the Y-axis line
  }, [data]);

  return(
    <div className='salegraph-container'>
      <svg ref={svgRef}></svg>;
    </div>

  ) 
};

export default SalesBarGraph;
