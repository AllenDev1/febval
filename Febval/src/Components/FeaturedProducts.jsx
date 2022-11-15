import React from "react";
import { Container } from "react-bootstrap";
import Cardsgroup from "./Cardsgroup";
import AutoButton from "./AutoButton";
import da from "./data file/datafiles.json";

const FeaturedProducts = () => {
	return (
		<>
			<Container className="card-container">
				<div className="feature-products py-4">
					<p>Featured Products</p>
				</div>
				<Cardsgroup />
				<div className="seemore-btn py-4">{AutoButton(da["see more"])}</div>
			</Container>
		</>
	);
};

export default FeaturedProducts;
