import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { logout } from "../store/actions/user";
import { connect } from "react-redux";

class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to="/" className="nav-link">
								Home
							</Link>
						</li>
						{this.props.isAuthenticated ? (
							<>
								<li className="nav-item">
									<a href="#" className="btn btn-danger" onClick={this.props.logout}>
										Logout
									</a>
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
