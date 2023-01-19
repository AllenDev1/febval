import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useLocation } from "react-router-dom";

const SearchPage = () => {
	let location = useLocation();
	let search = location.pathname.split("/")[2];
	const [products, setProducts] = useState([]);

	const handleSearch = (e) => {
		const options = {
			method: "GET",
			url: "/api/search/products/" + search,
		};

		axios
			.request(options)
			.then(function (response) {
				setProducts(response.data.products);
			})
			.catch(function (error) {
				console.error(error);
			});
	};
	useEffect(() => {
		handleSearch();
	}, [search]);

	return (
		<>
			<Container className="card-container">
				<div className="search-resule">
					<span className="search-result">Search Results for</span>
					<span className="search-result">"{search}"</span>
				</div>

				<Row xs={2} md={4} className="g-4 cards-row my-5">
					{products?.map((_, idx) => {
						return (
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
											<Card.Title
												className="cards-title text-truncate "
												style={{
													maxWidth: "100%",
												}}
											>
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
						);
					})}
				</Row>
			</Container>
		</>
	);
};

export default SearchPage;
