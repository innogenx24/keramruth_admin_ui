import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Grid, useTheme, useMediaQuery } from '@mui/material';
import './SalesLineGraph.scss'

const SalesLineGraph = () => {
  const svgRef = useRef();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Sample static dataset (full data points for each month)
    const dataset = [
      { month: 'Jan', value1: 0, value2: 10000 },
      { month: 'Feb', value1: 8000, value2: 12000 },
      { month: 'Mar', value1: 15000, value2: 18000 },
      { month: 'Apr', value1: 22000, value2: 16000 },
      { month: 'May', value1: 28000, value2: 20000 },
      { month: 'Jun', value1: 35000, value2: 24000 },
      { month: 'Jul', value1: 40000, value2: 22000 },
      { month: 'Aug', value1: 42000, value2: 25000 },
      { month: 'Sep', value1: 39000, value2: 27000 },
      { month: 'Oct', value1: 37000, value2: 28000 },
      { month: 'Nov', value1: 42000, value2: 29000 },
      { month: 'Dec', value1: 45000, value2: 30000 }
    ];

    // Set up dimensions based on screen size
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    // const width = (isSmallScreen ? window.innerWidth * 0.9 : window.innerWidth * 0.6) - margin.left - margin.right;
    // const height = (isSmallScreen ? 300 : 500) - margin.top - margin.bottom;
    const width= 400;
    const height = 400

    // Parse the date / time (months in this case)
    const parseTime = d3.timeParse("%b");

    // Convert month names to date objects for x-axis
    dataset.forEach(d => {
      d.month = parseTime(d.month);
    });

    // Clear any existing SVG
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG container
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(dataset, d => d.month))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, d => Math.max(d.value1, d.value2))])
      .range([height, 0]);

    // Define axes
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b"));
    const yAxis = d3.axisLeft(yScale);

    // Append axes
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    // Create line generators
    const line1 = d3.line()
      .x(d => xScale(d.month))
      .y(d => yScale(d.value1));

    const line2 = d3.line()
      .x(d => xScale(d.month))
      .y(d => yScale(d.value2));

    // Append paths
    svg.append('path')
      .datum(dataset)
      .attr('d', line1)
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    svg.append('path')
      .datum(dataset)
      .attr('d', line2)
      .attr('stroke', 'orange')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
  }, [isSmallScreen]);

  return (
    <Grid container justifyContent="center" alignItems="center" className='grapg-style'>
      <Grid item xs={12} md={8}>
        <svg ref={svgRef}></svg>
      </Grid>
    </Grid>
  );
};

export default SalesLineGraph;
