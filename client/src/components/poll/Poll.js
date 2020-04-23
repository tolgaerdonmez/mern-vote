import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPollbyId, voteOnPoll } from "../../api/polls";
import { Pie } from "react-roughviz";

function Poll() {
	const { pollId } = useParams();
	const [poll, setPoll] = useState(null);

	useEffect(() => {
		const fetch = async () => {
			const poll = await getPollbyId(pollId);
			setPoll(poll);
		};
		fetch();
	}, [pollId]);

	const vote = async optionId => {
		await voteOnPoll(poll._id, optionId);
		const _poll = { ...poll };
		_poll.options.find(x => x._id === optionId).votes++;
		setPoll(_poll);
	};

	if (poll === null) {
		return (
			<div className="spinner-border" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		);
	}

	return (
		<div className="row d-flex">
			<div className="col">
				<h1>{poll.question}</h1>
				<ul className="list-group">
					{poll.options.map(({ option, _id, votes }) => (
						<li key={_id} className="list-group-item d-flex justify-content-between align-items-center">
							{option} Votes: {votes}
							<button className="btn btn-info" onClick={async () => vote(_id)}>
								Vote
							</button>
						</li>
					))}
				</ul>
				<br />
				<p>
					Created At: <small>{poll.createdAt}</small>
				</p>
			</div>
			<div className="col d-flex justify-content-center align-items-center">
				<Pie
					data={{
						labels: poll.options.map(x => x.option),
						values: poll.options.map(x => (x.votes === 0 ? 0.1 : x.votes)),
					}}
					colors={["red", "orange", "blue", "skyblue"]}
					roughness={3}
					strokeWidth={2}
				/>
			</div>
		</div>
	);
}

export default Poll;
