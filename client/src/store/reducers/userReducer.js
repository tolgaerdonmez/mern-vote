const initialState = {
	id: null,
	token: null,
	isAuthenticated: false,
	polls: null,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case "LOGIN":
			return { ...state, id: payload.id, token: payload.token, isAuthenticated: true };
		case "LOGOUT":
			return initialState;
		case "GET_POLLS":
			return { ...state, polls: payload };
		case "DELETE_POLL":
			return { ...state, polls: state.polls.filter(x => x._id !== payload) };
		case "ADD_POLL":
			return { ...state, polls: [...state.polls, payload] };
		default:
			return state;
	}
};
