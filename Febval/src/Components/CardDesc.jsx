import { React } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../Scss/description.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const CardDesc = () => {
	return (
		<>
			<Container className="desc-container">
				<Row className="cardDecRow">
					<Col className="CDCol-Carousel">
						<Carousel
							className="productCarousel"
							showArrows={false}
							showIndicators={false}
						>
							<div>
								<img src="https://media.gettyimages.com/photos/stack-of-books-picture-id157482029?s=612x612" />
							</div>
							<div>
								<img src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80" />
							</div>
							<div>
								<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7bEWKqvt4abueAI1cPSGgdu7ab91I2-RorDZ7qoLwGA&s" />
							</div>
							<div>
								<img
									src="https://previews.123rf.com/images/firdausexia/firdausexia1303/firdausexia130300002/18236451-only-one-tress.jpg"
									alt="..."
								/>
							</div>
						</Carousel>
					</Col>
					<Col className="CDCol-dec"></Col>
				</Row>
			</Container>
		</>
	);
};

export default CardDesc;
