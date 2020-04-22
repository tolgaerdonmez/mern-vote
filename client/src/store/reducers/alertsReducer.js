const initialState = {
	message: "",
	status: "",
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case "GET_ERRORS":
			return { message: payload.message, status: "error" };
		case "GET_MESSAGES":
			return { message: payload.message, status: "success" };
		default:
			return state;
	}
};
