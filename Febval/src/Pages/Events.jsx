import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../Scss/Events.scss";
import {photos} from "../Components/data file/Photo.js"
import Gallery from "react-photo-gallery";
const Events = () => {
	
	return (
		<>
			<Container className="events">
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
				<Gallery photos={photos} />;
			</Container>
		</>
	);
};

export default Events;
