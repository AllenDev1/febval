import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Footer from "./Components/footer";
import Navbars from "./Components/navbar";
import Personalinfo from "./Components/Personalinfo";
import Description from "./Pages/Description";
import Home from "./Pages/home";
import ProductsByCategory from "./Pages/ProductsByCategory";
import Navcategory from "./Pages/ProductsByCategory";

const App = () => {
	return (
		<>
			<Router>
				<Navbars />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/home" element={<Home />} />
					<Route path="/userdetails/:id" element={<Personalinfo />} />
					
					<Route
						path="/products/:cat"
						element={<ProductsByCategory />}
					/>
					<Route
						path="/description/:id/:name"
						element={<Description />}
					/>

					<Route path="*" element={<p>Page not found</p>} />
				</Routes>
			</Router>
			<Footer />
		</>
	);
};

export default App;
