import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../Scss/cards.scss";
import AutoButton from "./AutoButton";
import da from "./data file/datafiles.json";
import { productDes } from "./data file/dummydata";

const Cardsgroup = ({}) => {
	return (
		<>
			<Container className="card-container">
				<div className="feature-products">
					<p>Featured Products</p>
				</div>
				<Row xs={1} md={4} className="g-4 cards-row">
					{productDes.map((_, idx) => (
						<Col className="cards-col">
							<Link
								to={`/description/${_.id}`}
								className="card-link"
							>
								<Card className="cards-card">
									<Card.Img
										className="cards-img"
										variant="top"
										src={_.img1}
									/>
									<Card.Body className="cards-card-body">
										<Card.Title className="cards-title">
											{_.title}
										</Card.Title>

										<Card.Text className="cards-text">
											<p className="price-cards">
												Rs. {_.discount_price}
											</p>
											<span>Buy Now</span>
										</Card.Text>
									</Card.Body>
								</Card>
							</Link>
						</Col>
					))}
				</Row>
				<div className="seemore-btn">{AutoButton(da["see more"])}</div>
			</Container>
		</>
	);
};

export default Cardsgroup;
