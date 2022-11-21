import axios from "axios";
import { React, useEffect, useState } from "react";
import {
	Breadcrumb,
	Button,
	Col,
	Container,
	Row,
	Stack,
	Tab,
	Tabs,
} from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import loc from "../Assets/location.svg";
import "../Scss/description.scss";
import { getUser } from "../Auth/auth";

const CardDesc = ({ id, name }) => {
	const [products, setProducts] = useState();
	const [cart, setCart] = useState([]);
	const [counter, setCounter] = useState(1);
	const incrementCounter = () => setCounter(counter + 1);
	let decrementCounter = () => setCounter(counter - 1);
	if (counter <= 1) {
		decrementCounter = () => setCounter(1);
	}

	useEffect(() => {
		try {
			const options = {
				method: "GET",
				url: "/api/products/get/" + id,
			};
			axios
				.request(options)
				.then(function (response) {
					setProducts(response.data.product);
				})
				.catch(function (error) {
					console.error(error);
				});
		} catch (error) {
			console.error(error);
		}
	}, []);

	const addToCart = (e) => {
		e.preventDefault();
		const user = getUser();
		const userID = user?.id;

		const options = {
			method: "POST",
			url: "/api/cart/create",
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
			data: {
				userID: { userID },
				productId: {id},
				quantity: { counter },
			},
		};

		axios
			.request(options)
			.then(function (response) {
				setCart(response.data);
				console.log(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	return (
		<>
			<Container className="desc-container">
				<Breadcrumb>
					<Breadcrumb.Item href="/">Home</Breadcrumb.Item>

					<Breadcrumb.Item active>{name}</Breadcrumb.Item>
				</Breadcrumb>
				<Row className="cardDecRow">
					{products ? (
						<>
							<>
								<Col className="CDCol-Carousel" xl={5}>
									<Carousel
										className="productCarousel"
										showArrows={false}
										showIndicators={false}
									>
										{products.productImages.map(
											(_, idx) => (
												<div>
													<img
														src={_.image}
														alt="..."
													/>
												</div>
											)
										)}
									</Carousel>
								</Col>
								<Col
									className="CDCol-dec"
									xl={{ span: 5, offset: 2 }}
								>
									<h1 className="text-uppercase">
										{products.name}
									</h1>
									<Stack gap={3}>
										<div className="locaiton-text mt-3 ">
											<div className="img-loc d-flex justify-content-between align-items-center align-self-center">
												<img src={loc} alt="..." />
												<p className="m-0 p-0">
													Bagmati, Kathmandu Metro 22
													- Newroad Area, Newroad
												</p>
												<a href="#">CHANGE</a>
											</div>
										</div>
										<div className="price text-secondary d-flex gap-3">
											<h5>Rs. {products.price}</h5> +
											<h5>Rs. 150 shipping charge</h5>
										</div>
										<div className="small-desc text-muted">
											<span
												className="d-inline-block text-truncate"
												style={{ maxWidth: 300 }}
											>
												{products.description}
											</span>
										</div>
										<div className="qty-change d-flex justify-content-center align-items-center">
											<ButtonIncrement
												onClickFunc={incrementCounter}
											/>
											<Display message={counter} />
											<ButtonDecrement
												onClickFunc={decrementCounter}
											/>
										</div>
										<div className="addtocart-buynow mt-5 d-flex justify-content-center align-items-center flex-wrap gap-4">
											<Button
												variant="dark"
												className="px-5 py-2"
												onClick={addToCart}
											>
												Add to Bag
											</Button>

											<Button
												variant="light"
												className="px-5 py-2 "
											>
												Rs. {products.price + 150} Buy
												Now
											</Button>
										</div>
										<div className="fulldesc-shipping mt-5">
											<Tabs
												defaultActiveKey="Description"
												id="uncontrolled-tab-example"
												className="mb-3"
											>
												<Tab
													eventKey="Description"
													title="Description"
												>
													{products.description}
												</Tab>
												<Tab
													eventKey="Shipping"
													title="Shipping"
												>
													With in 2 days
												</Tab>
											</Tabs>
										</div>
									</Stack>
								</Col>
							</>
						</>
					) : (
						<>
							<h1>NO DATA</h1>
						</>
					)}
				</Row>
			</Container>
		</>
	);
};

export default CardDesc;

function ButtonIncrement(props) {
	return (
		<Button
			onClick={props.onClickFunc}
			className="px-3  bg-light text-dark border-0"
		>
			+
		</Button>
	);
}

function ButtonDecrement(props) {
	return (
		<Button
			onClick={props.onClickFunc}
			className="px-3  bg-light text-dark border-0"
		>
			-
		</Button>
	);
}
function Display(props) {
	return <label className="px-3 ">{props.message}</label>;
}
