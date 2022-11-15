import axios from "axios";
import { React, useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Container, Row } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../Scss/description.scss";

const CardDesc = ({ id, name }) => {
	const [products, setProducts] = useState();

	useEffect(() => {
		try {
			const options = {
				method: "GET",
				url: "/api/products/get/" + id,
			};
			axios
				.request(options)
				.then(function (response) {
					setProducts(response.data.product);
				})
				.catch(function (error) {
					console.error(error);
				});
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<>
			<Container className="desc-container">
				<Breadcrumb>
					<Breadcrumb.Item href="/">Home</Breadcrumb.Item>

					<Breadcrumb.Item active>{name}</Breadcrumb.Item>
				</Breadcrumb>
				<Row className="cardDecRow">
					{products ? (
						<>
							<>
								<Col className="CDCol-Carousel">
									<Carousel
										className="productCarousel"
										showArrows={false}
										showIndicators={false}
									>
										{products.productImages.map(
											(_, idx) => (
												<div>
													<img
														src={_.image}
														alt="..."
													/>
												</div>
											)
										)}
									</Carousel>
								</Col>
								<Col className="CDCol-dec">
									<Button>cart add</Button>
								</Col>
							</>
						</>
					) : (
						<>
							<h1>NO DATA</h1>
						</>
					)}
				</Row>
			</Container>
		</>
	);
};

export default CardDesc;
