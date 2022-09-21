import React from "react";
import Footer from "../Components/footer";
import NavBar from "../Components/navbar";
import Carouse from "../Components/Carousel";
import Cardsgroup from "../Components/Cardsgroup";
import Sale from "../Components/Sale";
import Categories from "../Components/Categories"

const Home = () => {
	return (
		<>
			<NavBar />
			<Carouse/>
			<Categories/>
			<Cardsgroup />
			<Sale/>
			<Footer />
		</>
	);
};

export default Home;
