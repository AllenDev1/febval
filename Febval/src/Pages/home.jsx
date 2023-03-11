import React from "react";
// import navbar from "../Components/navbar";
import Carouse from "../Components/Carousel";
import Email from "../Components/Email";
import FeaturedProducts from "../Components/FeaturedProducts";
import Foryou from "../Components/Foryou";
import Sale from "../Components/Sale";
import Shopnow from "../Components/Shopnow";
import Number from "../Components/Number";
import Categories from "../Components/Categories";

const Home = () => {
	
	return (
		<>
			
			<Shopnow/>
			<FeaturedProducts />
			<Categories /> 
			
			<Number/>

			<Foryou />
			<Carouse />
			<Email />
		</>
	);
};

export default Home;
