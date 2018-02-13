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

    var w = props.size[0];
    var h = props.size[1];
    var padding = 25;
    var dataset = props.data;

    var xScale = d3.scale.ordinal()
            .domain(d3.range(dataset.length))
            .rangeRoundBands([ padding, w - padding ], 0.05);

    var yScale = d3.scale.linear()
            .domain([ 0, d3.max(dataset) ])
            .rangeRound([ h - padding, padding ]);                        

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
    const rects = this.svg.selectAll("rect")
      .data(props.data)
      .style("fill", "#fe9922")
      //.attr("x", (d,i) => i * 25)
      .attr("transform", function(d, i) {
                return "translate(" + xScale(i) + ",0)";
            })
      .attr("y", d => props.size[1] - yScale(d))
      .attr("height", d => yScale(d))
      .attr("width", 100)
      .on('mouseover', this.handleMouseover )
      .on('mouseout', this.handleMouseout )

    console.log('rects ', rects);

  }


  update(el, props) {
    console.log('-----------')
    console.log('update');
    console.log('props.data ', props.data)

    //this.adjustSize(el);
    var w = props.size[0];
    var h = props.size[1];
    var padding = 25;
    var dataset = props.data;

    var xScale = d3.scale.ordinal()
            .domain(d3.range(dataset.length))
            .rangeRoundBands([ padding, w - padding ], 0.05);

    var yScale = d3.scale.linear()
            .domain([ 0, d3.max(dataset) ])
            .rangeRound([ h - padding, padding ]);

    //Configure y axis generator
    // var yAxis = d3.svg.axis()
    //         .scale(yScale)
    //         .orient("left")
  //           .ticks(5);

  
  console.log('sort type ', props.sort )
  const rects = this.svg.selectAll('rect')

      rects.sort(function(a, b) {
              return (props.sort === 'ascending')? d3.ascending(a, b):d3.descending(a, b);
          })
          .transition()
          .delay(function(d, i) {
            return i * 50;
          })
          .duration(1000)
          .attr("transform", function(d, i) {
              return "translate(" + xScale(i) + ",0)";
          });
  }

 


  handleMouseover(d) {
    //console.log('tooltip mouse over ', d)
  }

  handleMouseout() {
    //console.log('tooltip mouse out')
  }

  /** Any necessary cleanup */
  destroy(el) { }
}
