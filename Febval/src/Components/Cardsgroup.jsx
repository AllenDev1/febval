import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../Scss/cards.scss";
import axios from "axios";

const Cardsgroup = ({ cat, sort }) => {
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
		if (sort === "high") {
			setSortedProducts(products.sort((a, b) => b.price - a.price));
		} else if (sort === "low") {
			setSortedProducts(products.sort((a, b) => a.price - b.price));
		} else {
			setSortedProducts(products);
		}
	}, [sort, products, cat]);

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
							{products.map((_, idx) => (
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
							))}
						</>
					)}
				</Row>
			</Container>
		</>
	);
};

export default Cardsgroup;
