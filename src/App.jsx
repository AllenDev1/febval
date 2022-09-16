import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/home";

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/home" element={<Home />} />

					<Route path="*" element={<p>Page not found</p>} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
