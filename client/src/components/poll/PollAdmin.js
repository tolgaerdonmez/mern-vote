import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import PollList from "./PollList";

import { connect } from "react-redux";
import { getPolls } from "../../store/actions/polls";

class PollAdmin extends Component {
	componentDidMount() {
		this.props.getPolls();
	}

	render() {
		if (!this.props.isAuthenticated) {
			return <Redirect to="/login" />;
		}
		return (
			<div>
				<div className="d-flex justify-content-between align-items-center">
					<h1>Your Polls</h1>
					<Link to="/polls/admin/create" className="btn btn-success">
						Create Poll
					</Link>
				</div>

				{!this.props.polls.length ? (
					<div className="spinner-border" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				) : (
					<PollList polls={this.props.polls} adminMode={true} />
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	polls: state.user.polls,
});

const mapDispatchToProps = { getPolls };

export default connect(mapStateToProps, mapDispatchToProps)(PollAdmin);
