import d3 from 'd3';
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'   

export default class SimpleComponentD3 {
  constructor(el, props = {}) {
    console.log('el ', el);
    
    // // this.svg is the container svg
    this.svg = d3.select(el).append('svg')
      .style('overflow', 'visible')

    // // Update the Chart with the props
     
    this.create(el, props);
    this.update(el, props);
 
    this.handleMouseover = this.handleMouseover.bind(this);
    this.handleMouseout = this.handleMouseout.bind(this);
  }


  adjustSize(el) {

    // Centrally position  svg
    this.diameter = Math.min(el.offsetWidth, el.offsetHeight);
    const top  = Math.max((el.offsetHeight - this.diameter)/2, 0);
    this.svg.attr('width', this.diameter)
      .attr('height', this.diameter)
      .style('position', 'relative')
      .style('top', top + 'px'); 
  }

  create(el, props){

    const dataMax = max(props.data)   

    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, props.size[1]])                                

    // On 'enter'
    // Create a 'rect' for each bit of data
    this.svg.selectAll("rect")
      .data(props.data)
      .enter()
      .append("rect")

    // On 'exit'
    // Remove 'rect' for each bit of data
    this.svg.selectAll("rect")
      .data(props.data)
      .exit()
      .remove()

    // Style each rect
    //select(el)
    this.svg.selectAll("rect")
      .data(props.data)
      .style("fill", "#fe9922")
      .attr("x", (d,i) => i * 25)
      .attr("y", d => props.size[1] - yScale(d))
      .attr("height", d => yScale(d))
      .attr("width", 25)

  }


  update(el, props) {

    this.adjustSize(el);
    var w = 600;
    var h = 250;
    var padding = 25;
    var dataset = props.data;

    var xScale = d3.scale.ordinal()
            .domain(d3.range(dataset.length))
            .rangeRoundBands([ padding, w - padding ], 0.05);

    var yScale = d3.scale.linear()
            .domain([ 0, d3.max(dataset) ])
            .rangeRound([ h - padding, padding ]);

    //Configure y axis generator
    var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(5);

  const rects = this.svg.selectAll('rect').transition()
      .delay(function(d, i) {
        return i * 100;
      })
      .duration(1500)
      .attr("y", function(d) {
        return yScale(d);
      })
      .attr("height", function(d) {
        return h - padding - yScale(d);
      })
      .filter(function(d) {
        if (d > 20) {
          return true;
        }
        return false;
      })
      .attr("fill", "DarkOrange");

    console.log('rects ', rects);

    // const duration = 500;
    // const delay = 0;
    // const { data, colorLegend } = props;
    
    // // ----- COLOR --------
    // // Define a color scale for our colorValues
    // const color = d3.scale.quantize()
    //   .domain([
    //     d3.min(data, d => d.colorValue),
    //     d3.max(data, d => d.colorValue)
    //   ])
    //   .range(colorLegend);

    // // ----- ADD DATA--------
    // // Get our D3 bubble layout data
    // const nodes = this.bubble.nodes(data.length ? {children: data} : data)
    //   .filter(d => d.depth); // filter out the outer bubble

    // // Link our nodes to d3
    // const circles = this.svg.selectAll('circle')
    //   .data(nodes, d => 'g' + d._id)
    //   .on('mouseover', this.handleMouseover )
    //   .on('mouseout', this.handleMouseout )
    //   //this._tooltipMouseOver.bind(this, color, el)

    // const labels = this.html.selectAll('.bubble-label')
    //   .data(nodes, d => 'g' + d._id)

    // // ----- TRANSITION --------
    // // Move any existing nodes to their new location
    // circles.transition()
    //   .duration(duration)
    //   .delay((d, i) => i * 7)
    //   .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
    //   .attr('r', d => d.r)
    //   .style('opacity', 1)
    //   .style('fill', d => color(d.colorValue));

    // labels
    //   .transition()
    //   .duration(duration)
    //   .delay((d, i) => i * 7)
    //   .style('height', d => 2 * d.r + 'px')
    //   .style('width', d => 2 * d.r + 'px')
    //   .style('left', d =>  d.x - d.r + 'px')
    //   .style('top', d =>  d.y - d.r + 'px')
    //   .style('opacity', 1);

    // // ----- ENTER --------
    // // Create any new nodes and postion them
    // circles.enter().append('circle')
    //   .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
    //   .attr('r', 0)
    //   .style('fill', d => color(d.colorValue))
    //   .transition()
    //   .duration(duration * 1.2)
    //   .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
    //   .attr('r', d => d.r)
    //   .style('opacity', 1);

    // labels.enter().append('div')
    //     .attr('class', 'bubble-label')
    //     .text(d => d.displayText || (d._id + ' (' + d.numFree + ')'))
    //     .style('position', 'absolute')
    //     .style('height', d => 2 * d.r + 'px')
    //     .style('width', d => 2 * d.r + 'px')
    //     .style('left', d =>  d.x - d.r + 'px')
    //     .style('top', d =>  d.y - d.r + 'px')
    //     .style('opacity', 0)
    //     .transition()
    //     .duration(duration * 1.2)
    //     .style('opacity', 1);

    // // ----- EXIT / REMOVE --------
    // // Remove any nodes that need to go
    // circles.exit()
    //   .transition()
    //   .duration(duration)
    //   .attr('transform', d => {
    //     const dy = d.y - this.diameter/2;
    //     const dx = d.x - this.diameter/2;
    //     const theta = Math.atan2(dy,dx);
    //     const destX = this.diameter * (1 + Math.cos(theta) )/ 2;
    //     const destY = this.diameter * (1 + Math.sin(theta) )/ 2; 
    //     return 'translate(' + destX + ',' + destY + ')'; })
    //   .attr('r', 0)
    //   .remove();

    // labels.exit()
    //   .transition()
    //   .duration(duration)
    //   .style('top', d => {
    //     const dy = d.y - this.diameter/2;
    //     const dx = d.x - this.diameter/2;
    //     const theta = Math.atan2(dy,dx);
    //     const destY = this.diameter * (1 + Math.sin(theta) )/ 2; 
    //     return destY + 'px'; })
    //   .style('left', d => { 
    //     const dy = d.y - this.diameter/2;
    //     const dx = d.x - this.diameter/2;
    //     const theta = Math.atan2(dy,dx);
    //     const destX = this.diameter * (1 + Math.cos(theta) )/ 2;
    //     return destX + 'px'; })
    //   .style('opacity', 0)
    //   .style('width', 0)
    //   .style('height', 0)
    //   .remove();

  }

  handleMouseover() {
    console.log('tooltip mouse over ')
  }

  handleMouseout() {
    console.log('tooltip mouse out')
  }

  /** Any necessary cleanup */
  destroy(el) { }
}
