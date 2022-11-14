import { React } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "../Scss/description.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useLocation } from "react-router-dom";
import { productDes } from "./data file/dummydata";

const CardDesc = ({ id, name }) => {
    const location = useLocation();
    const path = id;
    const product = productDes.find((p) => p.id.toString() === path);
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
                                        {product.images.map((_, idx) => (
                                            <div>
                                                <img
                                                    src={product.images[idx]}
                                                    alt="..."
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                </Col>
                                <Col className="CDCol-dec">
                                   <Button>
                                    cart add
                                   </Button>
                                </Col>
                            </>
                        </>
                    ) : (
                        <>
                            <h1>no data</h1>
                        </>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default CardDesc;
