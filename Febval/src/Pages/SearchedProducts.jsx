import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Col, Row } from "react-bootstrap";
import "../Scss/searched.scss";

const SearchedProducts = () => {
	// value from url
	const { name } = useParams();

	const [searchedProducts, setSearchedProducts] = useState([]);

	const handleSearch = (e) => {
		const options = {
			method: "GET",
			url: "/api/search/products/" + name,
		};

		axios
			.request(options)
			.then(function (response) {
				setSearchedProducts(response.data.products);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	useEffect(() => {
		handleSearch();
	}, [name]);

	return (
		<>
			<Container className="card-container searchedProduct">
                <p className="text-secondary" >{searchedProducts.length} item(s) found for "{name}"</p>
				<Row xs={1} md={4} className="g-4 cards-row">
					{searchedProducts?.map((_, idx) => (
						<Col className="cards-col" key={idx}>
							<Link
								to={`/description/${_.id}/${_.name}`}
								className="card-link"
							>
								<Card className="cards-card">
									<Card.Img
										className="cards-img"
										variant="top"
										src={_.productImages[0]?.image}
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
				</Row>
			</Container>
		</>
	);
};

export default SearchedProducts;
