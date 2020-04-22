const initialState = {
	id: null,
	token: null,
	isAuthenticated: false,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case "LOGIN":
			return { ...state, id: payload.id, token: payload.token, isAuthenticated: true };
		case "LOGOUT":
			return initialState;
		default:
			return state;
	}
};
