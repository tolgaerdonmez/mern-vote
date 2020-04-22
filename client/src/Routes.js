import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Alerts from "./components/Alerts";

import { connect } from "react-redux";

class Routes extends Component {
	render() {
		return (
			<>
				<Navbar />
				<Alerts />
				<div className="container mt-5">
					<Switch>
						<Route
							exact
							path="/"
							render={props => <Home isAuthenticated={this.props.isAuthenticated} {...props} />}
						/>
						<Route
							exact
							path="/login"
							render={props => <Login isAuthenticated={this.props.isAuthenticated} {...props} />}
						/>
						<Route
							exact
							path="/register"
							render={props => <Register isAuthenticated={this.props.isAuthenticated} {...props} />}
						/>
					</Switch>
				</div>
			</>
		);
	}
}

export default connect(state => ({
	isAuthenticated: state.user.isAuthenticated,
}))(Routes);
