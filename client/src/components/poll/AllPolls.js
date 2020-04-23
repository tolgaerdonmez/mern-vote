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
	if (polls === null) {
		return (
			<div className="spinner-border" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		);
	}
	return (
		<div>
			<h1>Existing Polls</h1>
			<PollList polls={polls} />
		</div>
	);
}

export default AllPolls;
