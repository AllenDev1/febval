import axios from "axios";

export const saveToken = (token) => {
	localStorage.setItem("febval:access_token", token);
};

export const getToken = () => {
	try {
		return localStorage.getItem("febval:access_token");
	} catch (e) {
		return null;
	}
};

export const isLoggedIn = () => {
	return getToken() !== null;
};

const exchangeAccessToken = async (code) => {
	const options = {
		method: "GET",
		url: "http://localhost:3001/api/token",
		params: { code },
	};
    return new Promise((resolve) => {
        axios
		.request(options)
		.then(function (response) {
            saveToken(response.data);
            resolve(response.data);
		})
		.catch(function (error) {
			console.error(error);
		});
    });
}


export const logout = async () => {
	const logout = async () => {
		const domain = "dev-vbeq9sic.us.auth0.com";
		const clientId = "A4HcVORtQJFJB1nA1ADcsWGcABLIempI";
		const returnTo = "http://localhost:3000";

		const response = await fetch(
			`https://${domain}/logout?client_id=${clientId}&returnTo=${returnTo}`,
			{ redirect: "manual" }
		);

		localStorage.removeItem("febval:access_token");

		window.location.replace(response.url);
	};
};

export const login = async () => {
	const domain = "dev-vbeq9sic.us.auth0.com";
	const audience = "https://febval-api";
	const scope = "admin:full";
	const clientId = "A4HcVORtQJFJB1nA1ADcsWGcABLIempI";
	const responseType = "code";
	const redirectUri = "http://localhost:3000/";

	const response = await fetch(
		`https://${domain}/authorize?` +
			`audience=${audience}&` +
			`scope=${scope}&` +
			`response_type=${responseType}&` +
			`client_id=${clientId}&` +
			`redirect_uri=${redirectUri}`,
		{
			redirect: "manual",
		}
	);

	window.location.replace(response.url);
};
