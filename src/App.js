import React, { Component } from 'react';
import ExpressionContainer from './ExpressionContainer.jsx'

class App extends Component {
  render() {
    function hasValue(element) {
      return element;
    }

    function isLongerThan(element, minLength){
      return minLength;
    }

    return (
      <div className="App">
        <ExpressionContainer runThese={[hasValue, isLongerThan]} />
      </div>
    );
  }
}

export default App;
