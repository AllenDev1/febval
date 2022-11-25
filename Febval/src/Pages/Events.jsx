import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Gallery from "react-photo-gallery";
import { photos } from "../Components/data file/Photo.js";
import "../Scss/Events.scss";

const Events = () => {
	return (
		<>
			<Container className="events pb-5">
				<Row>
					<Col>
						<h1>Events</h1>
					</Col>
					<Col>
						<h2>Contact us</h2>
						<p>Phone: 0000000</p>
						<p>Email: @hahah</p>
					</Col>
				</Row>
				<Gallery photos={photos} />
			</Container>
		</>
	);
};

export default Events;
