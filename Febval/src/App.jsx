import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Home from "./Pages/home";
import Userdetail from "./Pages/Userdetail";
import Description from "./Pages/Description";
import Navcategory from "./Pages/Navcategory";
import Navbars from "./Components/navbar";

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const getUser = () => {
			fetch("http://localhost:3001/auth/login/success", {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					"Acccess-Control-Allow-Origin": true,
				},
			})
				.then((response) => {
					if (response.status === 200) return response.json();
					throw new Error("failed to authenticate user");
				})
				.then((responseJson) => {
					setUser(responseJson.user);
				})
				.catch((error) => {
					console.error(error);
				});
		};
		getUser();
	}, []);
	console.log(user);
	return (
		<>
			<Router>
				<Navbars user={user} />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/home" element={<Home />} />
					<Route
						path="/userdetails"
						element={
							user ? (
								<Userdetail user={user} />
							) : (
								<Navigate to="/home" />
							)
						}
					/>
					<Route path="/description/:id" element={<Description />} />
					<Route path="/navcategory" element={<Navcategory />} />

					<Route path="*" element={<p>Page not found</p>} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
