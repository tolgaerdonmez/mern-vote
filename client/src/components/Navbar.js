import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar as BNavbar, Nav } from "react-bootstrap";

import { logout } from "../store/actions/user";
import { connect } from "react-redux";

class Navbar extends Component {
	render() {
		return (
			<div className="mx-5 mt-2">
				<BNavbar bg="primary" variant="dark" expand="lg">
					<BNavbar.Brand>Voting App</BNavbar.Brand>
					<BNavbar.Toggle aria-controls="basic-navbar-nav" />
					<BNavbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link>
								<Link to="/" className="nav-link">
									Home
								</Link>
							</Nav.Link>
							<Nav.Link>
								<Link to="/polls" className="nav-link">
									Polls
								</Link>
							</Nav.Link>
						</Nav>
						<Nav className="ml-auto">
							{this.props.isAuthenticated ? (
								<>
									<Nav.Link>
										<Link to="/polls/admin" className="nav-link">
											Your Polls
										</Link>
									</Nav.Link>
									<Nav.Link>
										<button className="btn btn-danger" onClick={this.props.logout}>
											Logout
										</button>
									</Nav.Link>
								</>
							) : (
								<>
									<Nav.Link className="nav-item">
										<Link to="/register" className="nav-link">
											Register
										</Link>
									</Nav.Link>
									<Nav.Link className="nav-item">
										<Link to="/login" className="nav-link">
											Login
										</Link>
									</Nav.Link>
								</>
							)}
						</Nav>
					</BNavbar.Collapse>
				</BNavbar>
			</div>
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
