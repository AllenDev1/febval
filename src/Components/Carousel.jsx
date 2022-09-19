import React from "react";
import { Card } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Scss/Carousel.scss";


const Carouse = () => {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };
  return (
    <Carousel
						className="team-carousel"
						swipeable={true}
						draggable={true}
						showDots={true}
						responsive={responsive}
						ssr={true} // means to render carousel on server-side.
						infinite={true}
						deviceType={responsive.deviceType}
						autoPlaySpeed={1}
						keyBoardControl={true}
						customTransition="all .5"
						transitionDuration={500}
						containerClass="carousel-container"
						removeArrowOnDeviceType={["tablet", "mobile"]}
						autoPlay={false}
						dotListClass="custom-dot-list-style"
						itemClass="carousel-item-padding-40-px"
					>
						<Card>
							<Card.Img
								className="team-image"
								variant="top"
								src="https://www2.deloitte.com/content/dam/Deloitte/nl/Images/promo_images/deloitte-nl-cm-digital-human-promo.jpg"
							/>
							<Card.Body className="team-card-body">
								<Card.Title className="team-member-name">Card Title</Card.Title>
								<Card.Text className="team-member-work">Some quick example</Card.Text>
							</Card.Body>
						</Card>
                        <Card>
							<Card.Img
								className="team-image"
								variant="top"
								src="https://guardian.ng/wp-content/uploads/2022/02/Beautiful-eyes.-Photo-Gansforever-Osman-526x598.jpg"
							/>
							<Card.Body className="team-card-body">
								<Card.Title className="team-member-name">Card Title</Card.Title>
								<Card.Text className="team-member-work">Some quick example</Card.Text>
							</Card.Body>
						</Card>
                        <Card>
							<Card.Img
								className="team-image"
								variant="top"
								src="https://www2.deloitte.com/content/dam/Deloitte/nl/Images/promo_images/deloitte-nl-cm-digital-human-promo.jpg"
							/>
							<Card.Body className="team-card-body">
								<Card.Title className="team-member-name">Card Title</Card.Title>
								<Card.Text className="team-member-work">Some quick example</Card.Text>
							</Card.Body>
						</Card>
                       
					</Carousel>
  );
};

export default Carouse;
