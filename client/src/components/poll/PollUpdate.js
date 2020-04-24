import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { updatePoll } from "../../store/actions/polls";
import { error as errorMsg } from "../../store/actions/alerts";
import { getPollbyId } from "../../api/polls";

class PollUpdate extends Component {
	state = { pollId: null, question: "", options: [] };

	componentDidMount() {
		const { pollId } = this.props.match.params;
		getPollbyId(pollId).then(poll => {
			this.setState({ question: poll.question, options: poll.options, pollId: pollId });
		});
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleOptionChange = e => {
		this.setState({
			options: this.state.options.map(option => {
				if (option._id.toString() === e.target.name) option.option = e.target.value;
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
		let { question, options, pollId } = this.state;
		if (options.length) {
			options = options.map(option => {
				if (option.votes) return option;
				return { option: option.option };
			});
			const poll = { question, options };
			this.props.updatePoll(pollId, poll);
			this.props.history.push("/polls/admin");
		} else {
			this.props.errorMsg("You cannot leave options empty!");
		}
	};

	render() {
		if (!this.props.isAuthenticated) {
			return <Redirect to="/login" />;
		}
		return (
			<form onSubmit={this.handleSubmit}>
				<h1>Update Poll</h1>
				<div className="form-group">
					<label>Question</label>
					<input
						type="text"
						className="form-control"
						name="question"
						onChange={this.handleChange}
						value={this.state.question}
						required
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
				<button type="submit" className="btn btn-primary">
					Update Poll
				</button>
			</form>
		);
	}
}

export default connect(null, { updatePoll, errorMsg })(PollUpdate);
