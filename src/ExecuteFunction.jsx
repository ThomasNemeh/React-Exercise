/** Component to recieve user input once an expression is dropped */
import React, { Component } from 'react'

class ExecuteFunction extends Component {
  /** If function was composed, reload user's previous arguments
   * @todo Make arguments list visible without creating a new instance each time*/
  constructor(props){
    super(props);
    this.state = {};
    if (this.props.preloadedArgs) {
      this.state.args = this.props.preloadedArgs;
    } else {
      this.state.args = [].fill(null, 0, this.props.length);
    }
  }

  state = {
    args: [],
  }

  /** Store user input in state */
  handleChange = (e) => {
    console.log(e.target.value);
    let newArgs = this.state.args;
    newArgs[e.target.id] = e.target.value;
    console.log(newArgs);
    this.setState({
      args: newArgs,
    });
  }

  /** Display result of function in results box or display in arguments for of previously composed function upon submit */
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.args.includes(undefined) && this.props.stackEmpty) {
      let val = this.props.function(...this.state.args);
      console.log(val);
      this.props.display(val);
    }
    else if (!this.state.args.includes(undefined)) {
      let val = this.props.function(...this.state.args);
      this.props.loadPrevExpression(val);
    }
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  /** compose function when dropped in input box */
  onDrop = (e, argId) => {
    let expressionId = e.dataTransfer.getData("id");
    console.log('drop 2: ' + expressionId);
    this.props.compose(this.state.args, expressionId, argId);

  }

  render() {
    if (this.props.visible == this.props.id) {
      return (
        <div className="input-box">
          <form onSubmit={this.handleSubmit}>
            {[...Array(this.props.length)].map((e, i) => {
                return <div key={i}>
                  <label htmlFor={i}>Argument {+ i}: </label>
                  <input type="text" id={i} onChange={this.handleChange} onDragOver={(e) =>this.onDragOver(e)}  onDrop={(e, id)=>this.onDrop(e, i)}
                         value={this.state.args[i] || ""} />
                </div>
                }
              )}
              <button className="submit-button">Submit</button>
            </form>
          </div>
        )
      }
      else return null;
  }
}

export default ExecuteFunction
