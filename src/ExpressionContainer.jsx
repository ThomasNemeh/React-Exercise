import React from 'react';
import Icon from './Icon.jsx';
import ExecuteFunction from './ExecuteFunction'
import './App.css'

class ExpressionContainer extends React.Component {
  state = {
    expressionsStack: [],
    displayResult: null,
    visibleId: -1,
    preloadedArgs: null,
    pending: [],
  }

  /** implement dragOver function to make element droppable */
  onDragOver = (e) => {
    e.preventDefault();
  }

  /** store element which is being dragged */
  onDragStart = (e, id) => {
    console.log('drag recorded: ',  id);
    e.dataTransfer.setData("id", id);
  }

  /** display arguments form to right of icon when dragged to the right of the screen */
  onDrop = (e) => {
    let id = e.dataTransfer.getData("id");
    console.log('drop recorded: ' + id);
    let icon = <Icon key={Math.random()} className="Icon" name={null} id={id}/>;
    if (this.state.expressionsStack.length === 0) {
      this.setState({
        visibleId: id,
        pending: [icon, ...this.state.pending],
      });
    }
  }

  /** display result of function */
  display = (val) => {
    this.setState({
      visibleId: -1,
      displayResult: val,
      preloadedArgs: null,
      expressionsStack: [],
      pending: [],
    });
  }

  /** Push old function to stack when composed with another.
    * Display newly dragged function */
  compose = (oldArgs, newExpressionId, oldArgId) => {
    let memory = {
      id: this.state.visibleId,
      pos: oldArgId,
      args: oldArgs,
    };
    let icon = <Icon key={Math.random()} className="Icon" name={null} id={newExpressionId}/>;
    this.setState({
      visibleId: newExpressionId,
      expressionsStack: [...this.state.expressionsStack, memory],
      pending: [icon, ...this.state.pending],
    });
  }

  /** load data associated with old function when value of composed function is calculated */
  loadPrevExpression = (val) => {
    let stack = this.state.expressionsStack;
    let prev = stack.pop();
    let waitingExpressions = this.state.pending;
    waitingExpressions.shift();
    prev.args[prev.pos]=val;
    this.setState({
      expressionsStack: stack,
      visibleId: prev.id,
      preloadedArgs: prev.args,
      pending: [waitingExpressions],
    });
  }

  render() {
    /** Generate icon and arguments form for each member of input list.
     * @todo Make arguments list visible without creating a new instance each time */
    let allFunctions = [];
    this.props.runThese.forEach((t, i) => {
      allFunctions.push(
      <div className="expression" key={i}>
        <div key = {i} className="Icon-div" onDragStart = {(e) => this.onDragStart(e,i)} draggable>
          <Icon className="Icon" name={t.name} id={i}/>
        </div>
        <div className="form-div">
          <ExecuteFunction className="arguments-form" key={Math.random()} id = {i} function={t} length={t.length} visible={this.state.visibleId} display={this.display}
          stackEmpty={this.state.expressionsStack.length > 0 ? false : true} compose={this.compose} loadPrevExpression={this.loadPrevExpression}
          preloadedArgs={this.state.preloadedArgs}/>
        </div>
      </div>);
    });

    /* Generate layout of app */
    return (
      <div className="expression-container">
        <h2 className="header">Expression Area</h2>
        <div className="all-functions">
          <span className="column-header">All Functions</span>
          {allFunctions}
        </div>
        <div className="pending-functions" onDragOver={(e) => this.onDragOver(e)}
             onDrop={(e)=>this.onDrop(e)}>
          <span className="column-header">Drop Functions Here</span>
          {this.state.pending}
        </div>
        <div className="display-box">
          <h1> {this.state.displayResult} </h1>
        </div>
      </div>
    );
  }
}

export default ExpressionContainer
