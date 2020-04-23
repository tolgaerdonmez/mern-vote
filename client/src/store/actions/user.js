import * as API from "../../api/user";

export const login = user => dispatch => {
	API.login(user).then(data => {
		if (data.error) {
			dispatch({ type: "GET_ERRORS", payload: { message: data.error } });
		} else {
			localStorage.setItem("user", JSON.stringify(data));
			dispatch({ type: "LOGIN", payload: data });
			dispatch({ type: "GET_MESSAGES", payload: { message: "Logged in!" } });
		}
	});
};

export const logout = () => {
	localStorage.setItem("user", "");
	return { type: "LOGOUT", payload: undefined };
};
