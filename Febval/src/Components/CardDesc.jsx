import { React } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../Scss/description.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useLocation } from "react-router-dom";
import { productDes } from "./data file/dummydata";

const CardDesc = () => {

	const location = useLocation();
	const path = location.pathname.split("/")[2];
	const product = productDes.find(
		(p) => p.id.toString() === path
	);
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
												src={product.img1}
												alt="..."
											/>
										</div>
									</Carousel>
								</Col>
								<Col className="CDCol-dec"></Col>
							</>
							
						</>
					) : (
						<><h1>no data</h1></>
					)}
				</Row>
			</Container>
		</>
	);
};

export default CardDesc;
