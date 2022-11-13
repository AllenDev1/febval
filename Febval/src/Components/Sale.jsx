import React from "react";
import Banner from "../Assets/Offer.svg";
import { Container } from "react-bootstrap";
import "../Scss/Sale.scss";

const Sale = () => {
	return (
		<>
			<Container>
				<div className="banner-container">
					<img src={Banner} alt="..." />
				</div>
			</Container>
		</>
	);
};

export default Sale;
