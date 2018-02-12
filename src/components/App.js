/* ---------------------------------------
Specify a hardcoded location
Returns 227 bike points
Default, initial display shows 10 points.
User can change the number of bike points displayed.
--------------------------------------- */

import React, { Component } from 'react';
import SimpleComponent from './SimpleComponent';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data:[20,30,10,40,50],
      sort: 'ascending'
    };

    this.dataSortAscending = this.dataSortAscending.bind(this);
    this.dataSortDescending = this.dataSortDescending.bind(this);
  }


  componentDidMount() {
  }

  handleClick(){
    console.log('handleClick');
  }

  dataSortAscending() {
       //this.setState({data:[10,20,30,40,50]});
       this.setState({sort:'ascending'});
  }

  dataSortDescending() {
      //this.setState({data:[50,40,30,20,10]})
      this.setState({sort:'descending'});
  }

  render() {
     return (
      	<div className="app">
          <div id="buttonContainer">
          <button id="sortAscending" onClick={this.dataSortAscending}>Sort Ascending</button>
          <button id="sortDescending" onClick={this.dataSortDescending}>Sort Descending</button>
        </div>
      		<SimpleComponent 
          data={this.state.data} 
          size={[200,350]}
          sort={this.state.sort}
          />
      </div>
      )
  }
}

export default App;


// On sort button click, sort the SimpleComponents data