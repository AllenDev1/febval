import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/home";
import Userdetail from "./Pages/Userdetail";
import Description from "./Pages/Description";
import Navcategory from "./Pages/Navcategory";

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/home" element={<Home />} />
					<Route exact path="/userdetails" element={<Userdetail />} />
					<Route exact path="/description" element={<Description />} />
					<Route exact path="/navcategory" element={<Navcategory />} />
					<Route path="*" element={<p>Page not found</p>} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
