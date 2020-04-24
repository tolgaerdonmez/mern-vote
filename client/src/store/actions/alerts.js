export const message = message => {
	return { type: "GET_MESSAGES", payload: { message } };
};

export const error = message => {
	return { type: "GET_ERRORS", payload: { message } };
};
