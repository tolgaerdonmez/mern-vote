import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { logout } from "../store/actions/user";
import { connect } from "react-redux";

class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary mx-5 mt-2">
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to="/" className="nav-link">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/polls" className="nav-link">
								Polls
							</Link>
						</li>
					</ul>
					<ul className="navbar-nav my-2 my-lg-0">
						{this.props.isAuthenticated ? (
							<>
								<li className="nav-item">
									<Link to="/polls/admin" className="nav-link">
										Your Polls
									</Link>
								</li>
								<li className="nav-item my-2 my-lg-0">
									<button className="btn btn-danger" onClick={this.props.logout}>
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								<li className="nav-item">
									<Link to="/register" className="nav-link">
										Register
									</Link>
								</li>
								<li className="nav-item">
									<Link to="/login" className="nav-link">
										Login
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</nav>
		);
	}
}
const mapStateToProps = state => ({
	isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = {
	logout,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
