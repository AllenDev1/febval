import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Container } from "react-bootstrap";
import "../Scss/Carousel.scss";
import axios from "axios";

const Carouse = () => {
	const [carouselImage, setCarouselImage] = useState([]);
	
	const fetchCarousel = () => {
		const options = {
			method: "GET",
			url: "/api/carousel/all",
		};

		axios
			.request(options)
			.then(function (response) {
				setCarouselImage(response.data.carousels);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	useEffect(() => {
		fetchCarousel();
	}, []);

	return (
		<>
			<Container className="main-carousel-container">
				<Carousel className="carousel-container">
					{carouselImage.map((_, idx) => (
						<Carousel.Item key={idx}>
							<img
								className="d-block w-100"
								src={_.image}
								alt="..."
							/>
						</Carousel.Item>
					))}
				</Carousel>
			</Container>
		</>
	);
};

export default Carouse;
