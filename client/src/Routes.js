import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Alerts from "./components/Alerts";

import { connect } from "react-redux";
import AllPolls from "./components/poll/AllPolls";
import Poll from "./components/poll/Poll";
import PollAdmin from "./components/poll/PollAdmin";
import PollForm from "./components/poll/PollForm";

class Routes extends Component {
	render() {
		const { isAuthenticated } = this.props;
		return (
			<>
				<Navbar />
				<Alerts />
				<div className="container mt-5">
					<Switch>
						<Route exact path="/" render={props => <Home isAuthenticated={isAuthenticated} {...props} />} />
						<Route
							exact
							path="/login"
							render={props => <Login isAuthenticated={isAuthenticated} {...props} />}
						/>
						<Route
							exact
							path="/register"
							render={props => <Register isAuthenticated={isAuthenticated} {...props} />}
						/>
						<Route exact path="/polls" component={AllPolls} />
						<Route exact path="/poll/:pollId" component={Poll} />
						<Route exact path="/polls/user/:userId" component={Poll} />
						<Route
							exact
							path="/polls/admin"
							render={props => <PollAdmin isAuthenticated={isAuthenticated} {...props} />}
						/>
						<Route
							exact
							path="/polls/admin/update/:pollId"
							render={props => (
								<PollForm updateMode={true} isAuthenticated={isAuthenticated} {...props} />
							)}
						/>
						<Route
							exact
							path="/polls/admin/create"
							render={props => <PollForm isAuthenticated={isAuthenticated} {...props} />}
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
