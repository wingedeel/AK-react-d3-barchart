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
  }


  componentDidMount() {
  }


  render() {
     return (
      	<div className="app">
          <div id="buttonContainer">
          <button id="sortAscending">Sort Ascending</button>
          <button id="sortDescending">Sort Descending</button>
        </div>
      		<SimpleComponent 
          data={
            [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
            11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ]
          } 
          size={[600,250]}/>
      </div>
      )
  }
}

export default App;
