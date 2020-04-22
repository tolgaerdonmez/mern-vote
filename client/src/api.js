export const register = user => {
	return fetch("/api/users/", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const login = user => {
	return fetch("/auth/signin/", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};
