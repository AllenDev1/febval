import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../Scss/Navcomponentcards.scss";
import AutoButton from "./AutoButton";
import da from "./data file/datafiles.json";

const Navcomponentcards = () => {
	return (
		<>
			<Container className="card-container">
				<div className="feature-products">
					<p>Featured Products</p>
				</div>
				<Row xs={1} md={4} className="g-4 cards-row">
					{Array.from({ length: 10 }).map((_, idx) => (
						<Col className="cards-col">
							<Link to="/description" className="card-link">
								<Card className="cards-card">
									<Card.Img
										className="cards-img"
										variant="top"
										src="https://static3.depositphotos.com/1001651/137/i/950/depositphotos_1376093-stock-photo-cofee-cup.jpg"
									/>
									<Card.Body className="cards-card-body">
										<Card.Title className="cards-title">
											is used to define the distance of
											the
										</Card.Title>

										<Card.Text className="cards-text">
											<p className="price-cards">
												{" "}
												Rs. 400.00
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

export default Navcomponentcards;
