import React from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, withRouter, Route,Link} from "react-router-dom";

import Page1 from './pages/Page1.jsx';
import Page2 from './pages/Page2.jsx';
import Page3 from './pages/Page3.jsx';

import Header from './common/layout/Header.jsx';
import Footer from './common/layout/Footer.jsx';
import ProgressBar from './common/widget/ProgressBar.jsx';

import OrderAPI from '../js/orderAPI.js';
import form from '../js/form.js';
import Order from '../js/order.js';
import Context from '../js/context.js';



class MyBody extends React.Component{
	
    constructor(){
		super();

		this.state = { 
			showProgress:false,  
			form: new Order(),
			clear: ()=>{
				this.setState({form: new Order() } );
			},
			change: (arg1, arg2)=>{
				var name = (arg1 instanceof Event) ? arg1.target.name  : arg1;
				var val =  (arg1 instanceof Event) ? arg1.target.value : arg2;

				this.setState(state => state.form[name] = val)
			},
			submit: onSuccess =>{
				this.showOverlay();

				OrderAPI.create(this.state.form).then(res => { 
					this.hideOverlay(); 
					this.state.form.id = res;
					onSuccess();
				})
				.catch(this.errorHandler)
			}	
		}
	}
	
	showOverlay = () =>{ this.setState({showProgress:true})}
	
	hideOverlay = () =>{ this.setState({showProgress:false})}
			
	errorHandler = () => {
		this.hideOverlay(); 
		alert("An error occurred. Please try again later.");
	}	
	
    render() {
		return (
		<div> 
			<Header />
			<main>	
				<Context.Provider value={{state: this.state}}> 
					<Router>
					  <div>
						<Switch>
						  <Route path="/page2">
							<Page2 />
						  </Route>
						  <Route path="/page3">
							<Page3 />
						  </Route>
						  <Route path="/">
							<Page1 />
						  </Route>
						</Switch>
					  </div>
					</Router>
				</Context.Provider> 
			</main>	
			
			<Footer />
		    {ReactDOM.createPortal(<ProgressBar show={this.state.showProgress} />, document.getElementById('progress-bar')) }
		</div>
	  );
	}
}

export default MyBody;

