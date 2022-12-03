import React from "react";
import { Container } from "react-bootstrap";
import Cardsgroup from "./Cardsgroup";

const FeaturedProducts = () => {
	const feature = "featured";
	return (
		<>
			<Container className="card-container">
				<div className="feature-products py-4">
					<p>Featured Products</p>
				</div>
				<Cardsgroup  feature= {feature}/>
			</Container>
		</>
	);
};

export default FeaturedProducts;
