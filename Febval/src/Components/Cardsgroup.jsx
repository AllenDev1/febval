import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../Scss/cards.scss";
import axios from "axios";

const Cardsgroup = ({ cat, sort, feature }) => {
	const [products, setProducts] = useState([]);
	const [sortedProducts, setSortedProducts] = useState([]);

	useEffect(() => {
		let url = "/api/products";

		if (cat) {
			url = "/api/products/?cat=" + cat;
		}

		const options = {
			method: "GET",
			url: url,
		};

		axios
			.request(options)
			.then(function (response) {
				setProducts(response.data.products);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, [cat]);

	useEffect(() => {
		if (sort === "new") {
			setSortedProducts(
				products.sort((a, b) => {
					return b.createdAt - a.createdAt;
				})
			);
		} else if (sort === "high") {
			setSortedProducts(
				products.sort((a, b) => {
					return a.price - b.price;
				})
			);
		} else {
			setSortedProducts(
				products.sort((a, b) => {
					return b.price - a.price;
				})
			);
		}
	}, [sort, products, sortedProducts]);

	return (
		<>
			<Container className="card-container">
				<Row xs={1} md={4} className="g-4 cards-row">
					{cat ? (
						sortedProducts.map((_, idx) => (
							<Col className="cards-col" key={idx}>
								<Link
									to={`/description/${_.id}/${_.name}`}
									className="card-link"
								>
									<Card className="cards-card">
										<Card.Img
											className="cards-img"
											variant="top"
											src={_.productImages[0].image}
										/>
										<Card.Body className="cards-card-body">
											<Card.Title className="cards-title">
												{_.name}
											</Card.Title>

											<Card.Text className="cards-text price-cards">
												Rs. {_.price}
												<span>Buy Now</span>
											</Card.Text>
										</Card.Body>
									</Card>
								</Link>
							</Col>
						))
					) : (
						<>
							{feature
								? products.slice(0, 8).map((_, idx) => (
										<Col className="cards-col" key={idx}>
											<Link
												to={`/description/${_.id}/${_.name}`}
												className="card-link"
											>
												<Card className="cards-card">
													<Card.Img
														className="cards-img"
														variant="top"
														// src={_.productImages[0].image}
													/>
													<Card.Body className="cards-card-body">
														<Card.Title className="cards-title">
															{_.name}
														</Card.Title>

														<Card.Text className="cards-text price-cards">
															Rs. {_.price}
															<span>Buy Now</span>
														</Card.Text>
													</Card.Body>
												</Card>
											</Link>
										</Col>
								  ))
								: products.map((_, idx) => (
										<Col className="cards-col" key={idx}>
											<Link
												to={`/description/${_.id}/${_.name}`}
												className="card-link"
											>
												<Card className="cards-card">
													<Card.Img
														className="cards-img"
														variant="top"
														// src={
														// 	_.productImages[0]
														// 		.image
														// }
													/>
													<Card.Body className="cards-card-body">
														<Card.Title className="cards-title">
															{_.name}
														</Card.Title>

														<Card.Text className="cards-text price-cards">
															Rs. {_.price}
															<span>Buy Now</span>
														</Card.Text>
													</Card.Body>
												</Card>
											</Link>
										</Col>
								  ))}
						</>
					)}
				</Row>
			</Container>
		</>
	);
};

export default Cardsgroup;
