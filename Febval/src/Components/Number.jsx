import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../Scss/number.scss"
const Number = () => {
	return (
		<>
			<Container className="innumber-container">
				<Row className="inNumber-row">
					<Col className="innumber-col">
						<h1>500+</h1>
						<h2>Cakes Sold</h2>
					</Col>
                    <Col className="innumber-col">
						<h1>1000+</h1>
						<h2>Gifts Sold</h2>
					</Col>
                    <Col className="innumber-col">
						<h1>1500+</h1>
						<h2>Happy Clients</h2>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Number;
