import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/home";
import Userdetail from "./Pages/Userdetail";
import Description from "./Pages/Description";
import Navcategory from "./Pages/Navcategory";
import Navbars from "./Components/navbar";

const App = () => {

	const user = true

	return (
		<>
			<Router>
				<Navbars user= {user}/>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/home" element={<Home />} />
					<Route  path="/userdetails" element={ user? <Userdetail /> : <Navigate to="/" />} />
					<Route
						
						path="/description/:id"
						element={<Description />}
					/>
					<Route
						
						path="/navcategory"
						element={<Navcategory />}
					/>

					<Route path="*" element={<p>Page not found</p>} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
