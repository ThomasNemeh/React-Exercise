import React, { Component } from 'react'

class ExecuteFunction extends Component {
  constructor(props){
    super(props);
    this.state = {};
    console.log('reloading!!!!' + this.props.preloadedArgs);
    console.log(this.state.preloadedArgs);
    if (this.props.preloadedArgs) {
      this.state.args = this.props.preloadedArgs;
    } else {
      this.state.args = [].fill(null, 0, this.props.length);
    }
  }

  handleChange = (e) => {
    console.log(e.target.value);
    let newArgs = this.state.args
    newArgs[e.target.id] = e.target.value
    console.log(newArgs);
    this.setState({
      args: newArgs,
    });
    //console.log(newArgs.includes(undefined));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    /** Ensure that you have the correct number of arguments. Is this the right way to do it? */
    //Check that expressionsStack is empty
    console.log(this.props.stackEmpty);

    if (!this.state.args.includes(undefined) && this.props.stackEmpty) {
      let val = this.props.function(...this.state.args);
      console.log(val);
      this.props.display(val);
      this.setState({
        args: [],
      });
    }
    else if (!this.state.args.includes(undefined)) {
      let val = this.props.function(...this.state.args);
      this.props.loadPrevExpression(val);
      this.setState({
        args: [],
      });
    }


  }

  onDragOver = (e) => {
    e.preventDefault();
  }

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
                         // value={this.props.preloadedArgs != null ? this.props.preloadedArgs[i] : undefined}/>
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
