import React from "react";
import { Link, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { deletePoll } from "../../store/actions/polls";

const calcTotalVotes = options => {
	return options.map(x => x.votes).reduce((acc, cur) => (acc ? cur + acc : cur));
};

function PollList({ polls, adminMode, deletePoll }) {
	const history = useHistory();
	return (
		<>
			<ul>
				{polls.map(poll => (
					<li key={poll._id} className="list-group-item d-flex justify-content-between align-items-center">
						<span>
							{poll.question} - Created At: <i>{new Date(poll.createdAt).toLocaleDateString()}</i> - Total
							Votes: {calcTotalVotes(poll.options)}
						</span>
						<div>
							{adminMode ? (
								<>
									<button
										onClick={() => history.push("/polls/admin/update/" + poll._id)}
										className="btn btn-info mx-2">
										Edit Poll
									</button>
									<button onClick={() => deletePoll(poll._id)} className="btn btn-danger mx-2">
										Delete Poll
									</button>
								</>
							) : null}
							<Link to={"/poll/" + poll._id} className="btn btn-outline-warning">
								See Poll {"->"}
							</Link>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}

export default connect(null, { deletePoll })(PollList);
