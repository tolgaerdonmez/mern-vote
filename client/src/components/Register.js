import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { register } from "../api/user";

export default class Register extends Component {
	state = {
		username: "",
		email: "",
		password: "",
		redirectToSignIn: false,
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const { username, email, password } = this.state;
		const user = { username, email, password };
		register(user).then(data => {
			if (data.error) {
				this.setState({ error: data.error, message: "" });
			} else {
				this.setState({ redirectToSignIn: true });
			}
		});
	};

	render() {
		if (this.props.isAuthenticated) return <Redirect to="/" />;
		if (this.state.redirectToSignIn) return <Redirect to="/login" />;

		return (
			<div>
				{this.state.message || this.state.error ? (
					<div className={`alert alert-dismissible alert-${this.state.error ? "danger" : "success"}`}>
						{this.state.error ? this.state.error : this.state.message}
					</div>
				) : null}
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username</label>
						<input
							type="text"
							className="form-control"
							name="username"
							value={this.state.username}
							onChange={this.onChange}
						/>
					</div>
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
						Submit
					</button>
				</form>
			</div>
		);
	}
}
