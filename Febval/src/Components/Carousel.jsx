import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Container } from "react-bootstrap";
import "../Scss/Carousel.scss";

const Carouse = () => {
	return (
		<>
			<Container className="main-carousel-container">
				<Carousel className="carousel-container">
					<Carousel.Item interval={1000}>
						<img
							className="d-block w-100"
							src="https://guardian.ng/wp-content/uploads/2022/02/Beautiful-eyes.-Photo-Gansforever-Osman-526x598.jpg"
							alt="First slide"
						/>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src="https://guardian.ng/wp-content/uploads/2022/02/Beautiful-eyes.-Photo-Gansforever-Osman-526x598.jpg"
							alt="Second slide"
						/>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src="https://guardian.ng/wp-content/uploads/2022/02/Beautiful-eyes.-Photo-Gansforever-Osman-526x598.jpg"
							alt="Third slide"
						/>
					</Carousel.Item>
				</Carousel>
			</Container>
		</>
	);
};

export default Carouse;
