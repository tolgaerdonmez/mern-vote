import * as API from "../../api/polls";

export const getPolls = () => (dispatch, getState) => {
	const {
		user: { id },
	} = getState();
	API.getPollsbyUserId(id).then(data => {
		dispatch({ type: "GET_POLLS", payload: data.polls });
	});
};

export const createPoll = poll => (dispatch, getState) => {
	const {
		user: { id, token },
	} = getState();
	API.createPoll(token, id, poll).then(data => {
		dispatch({ type: "ADD_POLL", payload: data.poll });
		dispatch({ type: "GET_MESSAGES", payload: { message: data.message } });
	});
};

export const deletePoll = pollId => (dispatch, getState) => {
	const {
		user: { id, token },
	} = getState();
	API.deletePoll(token, pollId, id).then(data => {
		dispatch({ type: "DELETE_POLL", payload: pollId });
		dispatch({ type: "GET_MESSAGES", payload: data });
	});
};

export const updatePoll = (pollId, poll) => (dispatch, getState) => {
	const {
		user: { id, token },
	} = getState();
	API.updatePoll(token, pollId, id, poll).then(data => {
		dispatch({ type: "UPDATE_POLL", payload: data.poll });
		dispatch({ type: "GET_MESSAGES", payload: { message: data.message } });
	});
};
