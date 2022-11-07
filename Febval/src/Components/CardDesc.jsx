import { React } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../Scss/description.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { productDes } from "./data file/dummydata";

const CardDesc = () => {
	const product = productDes[0];

	return (
		<>
			<Container className="desc-container">
				<Row className="cardDecRow">
					{product ? (
						<>
							<>
								<Col className="CDCol-Carousel">
									<Carousel
										className="productCarousel"
										showArrows={false}
										showIndicators={false}
									>
										<div>
											<img
												src={product.images[1]}
												alt="..."
											/>
										</div>
									</Carousel>
								</Col>
								<Col className="CDCol-dec"></Col>
							</>
							;
						</>
					) : (
						<>{console.error("no data")}</>
					)}
				</Row>
			</Container>
		</>
	);
};

export default CardDesc;
