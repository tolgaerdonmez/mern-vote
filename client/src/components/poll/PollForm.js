import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getPollbyId } from "../../api/polls";
import { createPoll, updatePoll } from "../../store/actions/polls";
import { error as errorMsg } from "../../store/actions/alerts";

class PollForm extends Component {
	state = {
		question: "",
		options: [],
		isPrivate: false,
		expiresAt: new Date(),
		expires: false,
	};

	componentDidMount() {
		if (this.props.updateMode) {
			const { pollId } = this.props.match.params;
			getPollbyId(pollId).then(poll => {
				poll.expiresAt = new Date(poll.expiresAt);
				this.setState({ ...poll, pollId: pollId });
			});
		}
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
		try {
			let { question, options, expires, expiresAt, isPrivate } = this.state;
			if (!options.length) throw new Error("You cannot leave options empty!");
			options = options.map(option => {
				return { option: option.option };
			});
			const poll = { question, options, expires, expiresAt, isPrivate };

			if (this.props.updateMode) this.props.updatePoll(this.state.pollId, poll);
			else this.props.createPoll(poll);

			this.props.history.push("/polls/admin");
		} catch (error) {
			this.props.errorMsg(error.message);
		}
	};

	render() {
		if (!this.props.isAuthenticated) {
			return <Redirect to="/login" />;
		}
		return (
			<form onSubmit={this.handleSubmit}>
				<h1>{!this.props.updateMode ? "Create Poll" : "Edit Poll"}</h1>
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
					{this.state.options.map(({ option, _id }) => (
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
					<div className="form-group my-3 d-flex flex-direction-column align-items-center">
						<div className="custom-control custom-switch">
							<input
								type="checkbox"
								className="custom-control-input"
								id="expiresSwitch"
								name="expires"
								value={this.state.expires}
								onClick={() => {
									this.setState({ expires: !this.state.expires });
								}}
								checked={this.state.expires}
							/>
							<label className="custom-control-label mr-2" for="expiresSwitch">
								Expires
							</label>
						</div>
						{this.state.expires ? (
							<DatePicker
								selected={this.state.expiresAt}
								onChange={date => {
									this.setState({ expiresAt: date });
								}}
								showTimeSelect
								timeFormat="HH:mm"
								timeIntervals={15}
								timeCaption="time"
								dateFormat="MMMM d, yyyy h:mm aa"
								customInput={<input className="form-control"></input>}
							/>
						) : null}
					</div>
					<div className="custom-control custom-switch">
						<input
							type="checkbox"
							className="custom-control-input"
							id="isPrivateSwitch"
							name="isPrivate"
							value={this.state.isPrivate}
							onClick={() => {
								this.setState({ isPrivate: !this.state.isPrivate });
							}}
							checked={this.state.isPrivate}
						/>
						<label className="custom-control-label mr-2" for="isPrivateSwitch">
							Private Poll (Private polls are only be accessed by anyone with Poll Url)
						</label>
					</div>
				</div>
				<button type="submit" className="btn btn-success">
					{!this.props.updateMode ? "Create Poll" : "Update Poll"}
				</button>
				<label className="custom-label ml-2">You can update all these whenever you want !</label>
			</form>
		);
	}
}

export default connect(null, { createPoll, updatePoll, errorMsg })(PollForm);
