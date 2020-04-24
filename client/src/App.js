import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { Provider } from "react-redux";
import store from "./store";
import { logout } from "./store/actions/user";

const user = localStorage.getItem("user");
if (user) {
	store.dispatch({ type: "LOGIN", payload: JSON.parse(user) });
} else {
	store.dispatch(logout());
}

const alertOptions = {
	timeout: 3000,
	position: "top center",
};

function App() {
	return (
		<Provider store={store}>
			<AlertProvider template={AlertTemplate} {...alertOptions}>
				<Router>
					<Routes />
				</Router>
			</AlertProvider>
		</Provider>
	);
}

export default App;
