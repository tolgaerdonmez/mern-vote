import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createPoll } from "../../store/actions/polls";

class PollCreate extends Component {
	state = { question: "", options: [] };

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleOptionChange = e => {
		this.setState({
			options: this.state.options.map(option => {
				if (option._id === e.target.name) option.option = e.target.value;
				return option;
			}),
		});
	};

	deleteOption = optionId => {
		this.setState({ options: this.state.options.filter(option => option._id !== optionId) });
	};

	addOption = () => {
		this.setState({ options: [...this.state.options, { _id: Date.now(), option: "New option" }] });
	};

	handleSubmit = e => {
		e.preventDefault();
		let { question, options } = this.state;
		options = options.map(option => {
			return { option: option.option };
		});
		const poll = { question, options };
		this.props.createPoll(poll);
		this.props.history.push("/polls/admin");
	};

	render() {
		if (!this.props.isAuthenticated) {
			return <Redirect to="/login" />;
		}
		return (
			<form onSubmit={this.handleSubmit}>
				<h1>Create Poll</h1>
				<div className="form-group">
					<label>Question</label>
					<input
						type="text"
						className="form-control"
						name="question"
						onChange={this.handleChange}
						value={this.state.question}
					/>
				</div>
				<div className="form-group">
					<label>Options</label>
					{this.state.options.map(({ option, _id }, index) => (
						<div
							className="d-flex flex-direction-column justify-content-center align-items-center"
							key={_id}>
							<i className="fas fa-times mr-2" onClick={() => this.deleteOption(_id)}></i>
							<input
								type="text"
								className="form-control my-2"
								name={_id}
								onChange={this.handleOptionChange}
								value={option}
							/>
						</div>
					))}
					<button
						className="btn btn-danger d-flex flex-direction-column align-items-center my-2"
						onClick={this.addOption}
						type="button">
						<i className="fas fa-plus mr-2"></i>
						<p className="my-0">Add Option</p>
					</button>
				</div>
				<button type="submit" className="btn btn-success">
					Create Poll
				</button>
			</form>
		);
	}
}

export default connect(null, { createPoll })(PollCreate);
