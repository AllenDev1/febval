import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../Scss/cards.scss";
import axios from "axios";
import AutoButton from "./AutoButton";
import da from "./data file/datafiles.json";
import { CartState } from "../context/Context";

const Cardsgroup = ({ cat, sort, feature }) => {
	const [products, setProducts] = useState([]);
	const [sortedProducts, setSortedProducts] = useState([]);
	const productsPerRow = 12;
	const [next, setNext] = useState(productsPerRow);

	const loadMore = () => {
		setNext(next + productsPerRow);
	};

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
		let products_ = [...products];

		if (sort === "new") {
			products_.sort((a, b) => {
				return b.createdAt - a.createdAt;
			});
			setSortedProducts(products_);
		} else if (sort === "low") {
			products_.sort((a, b) => {
				return a.price - b.price;
			});
			setSortedProducts(products_);
		} else {
			products_.sort((a, b) => {
				return b.price - a.price;
			});
			setSortedProducts(products_);
		}
	}, [sort, products]);

	const apple = true;

	return (
		<>
			<Container className="card-container">
				<Row xs={1} md={4} className="g-4 cards-row">
					{feature ? (
						<>
							{products.slice(0, 8).map((_, idx) => (
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
						</>
					) : (
						<>
							{sortedProducts.slice(0, next)?.map((_, idx) => (
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
							<div className="seemore-btn d-flex justify-content-center py-5">
								{next < products?.length &&
									AutoButton(da["see more"], loadMore)}
							</div>
						</>
					)}
				</Row>
			</Container>
		</>
	);
};

export default Cardsgroup;
