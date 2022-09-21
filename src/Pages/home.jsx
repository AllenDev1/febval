import React from "react";
import Footer from "../Components/footer";
// import navbar from "../Components/navbar";
import Carouse from "../Components/Carousel";
import Cardsgroup from "../Components/Cardsgroup";
import Sale from "../Components/Sale";
import Categories from "../Components/Categories"
 import Navbars from "../Components/Navbar";

const Home = () => {
	return (
		<>
		
			<Navbars />
			<Carouse/>
			<Categories/>
			<Cardsgroup />
			<Sale/>
			<Footer />
		</>
	);
};

export default Home;
