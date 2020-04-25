import React from "react";
import { Link, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { deletePoll } from "../../store/actions/polls";
import SharePollModal from "./SharePollModal";

const calcTotalVotes = options => {
	return options.map(x => (x.votes ? x.votes : 0)).reduce((acc, cur) => (acc ? cur + acc : cur));
};

function PollList({ polls, adminMode, deletePoll }) {
	const history = useHistory();
	return (
		<>
			<ul>
				{polls.map(poll => (
					<li key={poll._id} className="list-group-item d-flex justify-content-between align-items-center">
						<span>
							{adminMode && poll.isPrivate ? (
								<span className="badge badge-danger mr-1">Private</span>
							) : (
								""
							)}
							{poll.expires && new Date(poll.expiresAt).getTime() < Date.now() ? (
								<span className="badge badge-warning mr-1">Expired</span>
							) : null}
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
							<SharePollModal
								pollUrl={"http://" + window.location.href.split("/")[2] + "/poll/" + poll._id}
							/>
							<Link to={"/poll/" + poll._id} className="btn btn-outline-warning ml-2">
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
