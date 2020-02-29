import React from 'react';
import {BrowserRouter as Router, Switch,  Route,Link} from "react-router-dom";
import Input from './Input.jsx';

import Context from '../../../js/context.js';

class Number extends Input {
	
	 static contextType = Context;
	
	constructor(props){
		super(props);
	}
	
	render(){
		var name = this.props.name;
		var submitted = this.context.state.form.$submitted;
		var errors = this.context.state.form.$errors[name];
		
		return (
		<Context.Consumer>
		{ context => (
		
		
		
		
		<div ref={this.elem} 
		     className={`form-group has-feedback ${ submitted && (!errors ? "has-success" : "has-error") } `} name={`my-${name}`} >

            <input type="number" className="form-control" name={this.props.name}  defaultValue={ context.state.form[name] } onFocus={this.onWatch} onKeyUp={this.onWatch}   onChange={this.onChange} />



			<span className="glyphicon glyphicon-ok form-control-feedback" ></span>
	        <span className="glyphicon glyphicon-remove form-control-feedback" ></span>
			<span id="inputSuccess4Status" className="sr-only">(success)</span>
		</div>
		
		)}
		</Context.Consumer>		
		
		
		)
	}
}

export default Number;
