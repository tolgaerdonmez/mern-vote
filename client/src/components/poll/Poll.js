import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPollbyId, voteOnPoll } from "../../api/polls";
import SharePollModal from "./SharePollModal";
import { Pie } from "react-roughviz";
import COLORS, { getRandomColorList } from "../../utils/colors";

function Poll() {
	const { pollId } = useParams();
	const [poll, setPoll] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetch = async () => {
			const poll = await getPollbyId(pollId);
			setPoll(poll);
		};
		fetch();
	}, [pollId]);

	const vote = async optionId => {
		try {
			const resp = await voteOnPoll(poll._id, optionId);
			if (resp.error) {
				throw new Error(resp.error);
			}
			const _poll = { ...poll };
			_poll.options.find(x => x._id === optionId).votes++;
			setPoll(_poll);
		} catch (error) {
			dispatch({ type: "GET_ERRORS", payload: { message: error.message } });
		}
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
				<div className="row d-flex flex-direction-column justify-content-between">
					<h1>
						{poll.question}{" "}
						{poll.expires && new Date(poll.expiresAt).getTime() < Date.now() ? "Expired" : ""}
					</h1>
					<SharePollModal
						pollUrl={window.location.href}
						buttonTitle="Share Poll"
						buttonProps={{ className: "mb-2 mx-3", variant: "warning" }}
					/>
				</div>
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
					Created At: <small>{new Date(poll.createdAt).toLocaleString()}</small>
				</p>
				{poll.expires ? (
					<p>
						Expires At: <small>{new Date(poll.expiresAt).toLocaleString()}</small>
					</p>
				) : null}
			</div>
			<div className="col d-flex justify-content-center">
				<Pie
					data={{
						labels: poll.options.map(x => x.option),
						values: poll.options.map(x => (x.votes === 0 ? 0.1 : x.votes)),
					}}
					colors={[
						...COLORS,
						...[
							poll.options.length > COLORS.length
								? getRandomColorList(poll.options.length - COLORS.length)
								: [],
						].flat(Infinity),
					]}
					roughness={3}
					strokeWidth={2}
					width={poll.options.length > 10 ? 1000 : 500}
				/>
			</div>
		</div>
	);
}

export default Poll;
