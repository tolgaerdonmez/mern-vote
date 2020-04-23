export const getPolls = () => {
	return fetch("/api/polls", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const getPollbyId = pollId => {
	return fetch("/api/polls/" + pollId, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const getPollsbyUserId = userId => {
	return fetch("/api/polls/user/" + userId, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const createPoll = (jwt, userId, poll) => {
	return fetch("/api/polls/", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + jwt,
		},
		body: JSON.stringify({ user: userId, ...poll }),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const updatePoll = (jwt, pollId, userId, poll) => {
	return fetch("/api/polls/" + pollId, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + jwt,
		},
		body: JSON.stringify({ user: userId, ...poll }),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const deletePoll = (jwt, pollId, userId) => {
	return fetch("/api/polls/" + pollId, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + jwt,
		},
		body: JSON.stringify({ user: userId }),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const voteOnPoll = (pollId, optionId) => {
	return fetch("/api/polls/" + pollId, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ optionId: optionId }),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};
