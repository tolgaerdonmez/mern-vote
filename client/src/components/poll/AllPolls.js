import React, { useState, useEffect } from "react";
import PollList from "./PollList";
import { getPolls } from "../../api/polls";

function AllPolls() {
	const [polls, setPolls] = useState(null);
	useEffect(() => {
		const fetch = async () => {
			const { polls } = await getPolls();
			setPolls(polls);
		};
		fetch();
	}, []);

	return (
		<div>
			<h1>Existing Polls</h1>
			{polls === null ? (
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			) : polls.length === 0 ? (
				<div class="alert alert-warning" role="alert">
					There are no polls ! Log in to create the first one !
				</div>
			) : (
				<PollList polls={polls} />
			)}
		</div>
	);
}

export default AllPolls;
