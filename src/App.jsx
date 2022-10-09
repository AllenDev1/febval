import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/home";
import Userdetail from "./Pages/Userdetail";

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/home" element={<Home />} />
					<Route exact path="/userdetails" element={<Userdetail />} />

					<Route path="*" element={<p>Page not found</p>} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
