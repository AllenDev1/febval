import React from "react";
// import navbar from "../Components/navbar";
import Carouse from "../Components/Carousel";
import Email from "../Components/Email";
import FeaturedProducts from "../Components/FeaturedProducts";
import Foryou from "../Components/Foryou";
import Sale from "../Components/Sale";

const Home = () => {
	
	return (
		<>
			{/* <Categories /> */}
			<FeaturedProducts />
			<Sale />
			<Foryou />
			<Carouse />
			<Email />
		</>
	);
};

export default Home;
