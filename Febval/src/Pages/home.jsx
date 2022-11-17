import React from "react";
import Footer from "../Components/footer";
// import navbar from "../Components/navbar";
import Carouse from "../Components/Carousel";
import Cardsgroup from "../Components/Cardsgroup";
import Sale from "../Components/Sale";
import Categories from "../Components/Categories";
import Navbars from "../Components/navbar";
import Foryou from "../Components/Foryou";
import Email from "../Components/Email";
import FeaturedProducts from "../Components/FeaturedProducts";

const Home = () => {
	
	return (
		<>
			<Carouse />
			{/* <Categories /> */}
			<FeaturedProducts />
			<Sale />
			<Foryou />
			<Email />
		
		</>
	);
};

export default Home;
