import React from "react";
import Footer from "../Components/footer";
import NavBar from "../Components/Navbar";
import Carouse from "../Components/Carousel";
import Cardsgroup from "../Components/Cardsgroup";

const Home = () => {
	return (
		<>
			<NavBar />
			<Carouse/>
			<Cardsgroup />
			<Footer />
		</>
	);
};

export default Home;
