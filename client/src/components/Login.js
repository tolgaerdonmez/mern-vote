import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { login } from "../store/actions/user";

class Login extends Component {
	state = {
		email: "",
		password: "",
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const { email, password } = this.state;
		const user = { email, password };
		this.props.login(user);
	};

	render() {
		const { from } = this.props.location.state || {
			from: {
				pathname: "/",
			},
		};
		if (this.props.isAuthenticated) return <Redirect to={from} />;
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Email address</label>
						<input
							type="email"
							className="form-control"
							name="email"
							value={this.state.email}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input
							type="password"
							className="form-control"
							name="password"
							value={this.state.password}
							onChange={this.onChange}
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Log in
					</button>
				</form>
			</div>
		);
	}
}

// const mapStateToProps = state => ({ message: state.message });

const mapDispatchToProps = {
	login,
};

export default connect(null, mapDispatchToProps)(Login);
