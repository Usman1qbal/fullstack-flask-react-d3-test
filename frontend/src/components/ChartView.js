import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './ChartView.css';

const ChartView = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return;
    }

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    // Chart configuration
    const margin = { top: 40, right: 30, bottom: 60, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Data processing
    const chartData = data.slice(-10); // Show last 10 years for better visualization

    // Scales
    const xScale = d3.scaleBand()
      .domain(chartData.map(d => d.year))
      .range([0, width])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.population)])
      .range([height, 0]);

    // Color scale
    const colorScale = d3.scaleSequential()
      .domain([0, chartData.length])
      .interpolator(d3.interpolateBlues);

    // X-axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    // Y-axis
    svg.append("g")
      .call(d3.axisLeft(yScale).tickFormat(d3.format(",")));

    // Add Y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "600")
      .text("Population");

    // Add X-axis label
    svg.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 10})`)
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "600")
      .text("Year");

    // Add chart title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "600")
      .text("US Population Trend (Last 10 Years)");

    // Create bars
    svg.selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.year))
      .attr("width", xScale.bandwidth())
      .attr("y", d => yScale(d.population))
      .attr("height", d => height - yScale(d.population))
      .attr("fill", (d, i) => colorScale(i))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .on("mouseover", function(event, d) {
        d3.select(this)
          .attr("stroke", "#333")
          .attr("stroke-width", 2);
        
        // Show tooltip
        const tooltip = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

        tooltip.transition()
          .duration(200)
          .style("opacity", .9);

        tooltip.html(`
          <strong>Year:</strong> ${d.year}<br/>
          <strong>Population:</strong> ${d3.format(",")(d.population)}
        `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function() {
        d3.select(this)
          .attr("stroke", "#fff")
          .attr("stroke-width", 1);
        
        d3.selectAll(".tooltip").remove();
      });

    // Add value labels on bars
    svg.selectAll(".bar-label")
      .data(chartData)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", d => xScale(d.year) + xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.population) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("font-weight", "600")
      .style("fill", "#333")
      .text(d => d3.format(".1f")(d.population / 1000000) + "M");

  }, [data]);

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="chart-error">
        <p>No data available to display in chart format.</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>US Population Chart</h3>
        <p>Interactive bar chart showing population trends</p>
      </div>
      
      <div className="chart-wrapper">
        <svg ref={svgRef}></svg>
      </div>
      
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#3182bd' }}></span>
          <span>Population data from US Census</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#6baed6' }}></span>
          <span>Hover for detailed information</span>
        </div>
      </div>
    </div>
  );
};

export default ChartView; 