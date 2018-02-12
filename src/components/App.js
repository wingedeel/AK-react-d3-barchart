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
      data:[2,3,0,4,0]
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
       this.setState({data:[0,1,2,3,4]});
  }

  dataSortDescending() {
      this.setState({data:[4,3,2,1,0]})
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
          size={[200,250]}/>
      </div>
      )
  }
}

export default App;


// On sort button click, sort the SimpleComponents data