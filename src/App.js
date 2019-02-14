/** function composition web page */
import React, { Component } from 'react';
import ExpressionContainer from './ExpressionContainer.jsx'

class App extends Component {
  render() {
    /** define functions here*/
    function hasValue(element) {
      return element;
    }

    function isLongerThan(element, minLength){
      return minLength;
    }

    /** pass functions to application in list here */
    return (
      <div className="App">
        <ExpressionContainer runThese={[hasValue, isLongerThan]} />
      </div>
    );
  }
}

export default App;
