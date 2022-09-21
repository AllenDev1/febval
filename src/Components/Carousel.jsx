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
						<Carousel.Caption>
							<h3>First slide label</h3>
							<p>
								Nulla vitae elit libero, a pharetra augue mollis
								interdum.
							</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src="https://guardian.ng/wp-content/uploads/2022/02/Beautiful-eyes.-Photo-Gansforever-Osman-526x598.jpg"
							alt="Second slide"
						/>
						<Carousel.Caption>
							<h3>Second slide label</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit.
							</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src="https://guardian.ng/wp-content/uploads/2022/02/Beautiful-eyes.-Photo-Gansforever-Osman-526x598.jpg"
							alt="Third slide"
						/>
						<Carousel.Caption>
							<h3>Third slide label</h3>
							<p>
								Praesent commodo cursus magna, vel scelerisque
								nisl consectetur.
							</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</Container>
		</>
	);
};

export default Carouse;
