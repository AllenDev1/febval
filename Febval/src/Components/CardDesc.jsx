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
	Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import loc from "../Assets/location.svg";
import "../Scss/description.scss";
import { addProduct } from "../redux/cartRedux";
import { getUser } from "../Auth/auth";

const CardDesc = ({ id, name }) => {
	const [product, setProduct] = useState();
	const dispatch = useDispatch();
	const [counter, setCounter] = useState(1);
	const [user, setUser] = useState(null);
	const [cakeSize, setCakeSize] = useState("0.5kg");
	const [price, setPrice] = useState(0);
	let pric;

	const incrementCounter = () => setCounter(counter + 1);
	let decrementCounter = () => setCounter(counter - 1);
	if (counter <= 1) {
		decrementCounter = () => setCounter(1);
	}
	const addtoCartClick = () => {
		const products = {
			...product,
			pri: pric,
		};

		dispatch(
			addProduct({
				product: products,
				quantity: counter,
			})
		);
	};

	useEffect(() => {
		try {
			const options = {
				method: "GET",
				url: "/api/products/get/" + id,
			};
			axios
				.request(options)
				.then(function (response) {
					setProduct(response.data.product);
					setPrice(response.data.product.price);
				})
				.catch(function (error) {
					console.error(error);
				});
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		getUser()
			.then((user) => {
				setUser(user);
			})
			.catch((err) => {
				setUser(null);
			});
	}, []);

	return (
		<>
			<Container className="desc-container">
				<Breadcrumb>
					<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
					<Breadcrumb.Item href={`/products/${product?.category}`}>
						{product?.category}
					</Breadcrumb.Item>

					<Breadcrumb.Item active>
						<span
							className="d-inline-block text-truncate"
							style={{ maxWidth: 200 }}
						>
							{name}
						</span>
					</Breadcrumb.Item>
				</Breadcrumb>
				<Row className="cardDecRow">
					{product ? (
						<>
							<>
								<Col className="CDCol-Carousel" xl={5}>
									<Carousel
										className="productCarousel"
										showArrows={true}
										showIndicators={false}
										swipeable={false}
										showStatus={false}
									>
										{product.productImages.map((_, idx) => (
											<div key={idx}>
												<img src={_.image} alt="..." />
											</div>
										))}
									</Carousel>
								</Col>
								<Col
									className="CDCol-dec"
									xl={{ span: 5, offset: 2 }}
								>
									<h5 className="text-uppercase">
										{product.name}
									</h5>
									<Stack gap={3}>
										<div className="locaiton-text mt-3 ">
											<div className="img-loc d-flex gap-3 align-items-center align-self-center">
												<img src={loc} alt="..." />
												<p className="m-0 p-0">
													{user
														? user.address
														: "Address"}
												</p>
											</div>
										</div>
										<div className="price text-secondary d-flex gap-3">
											<h5>
												Rs.
												{product?.category === "cake"
													? cakeSize === "1kg"
														? (pric = price * 1)
														: cakeSize === "2kg"
														? (pric = price * 2)
														: cakeSize === "3kg"
														? (pric = price * 3)
														: cakeSize === "4kg"
														? (pric = price * 4)
														: cakeSize === "5kg"
														? (pric = price * 5)
														: cakeSize === "6kg"
														? (pric = price * 6)
														: price
													: product.price}
											</h5>
											+<h5>Rs. 150 shipping charge</h5>
										</div>
										<div className="small-desc text-muted">
											<span
												className="d-inline-block text-truncate"
												style={{ maxWidth: 300 }}
											>
												{product.description}
											</span>
										</div>
										{product?.category === "cake" && (
											<Col className="size-container  ">
												<p>Size: </p>
												<Form.Select
													aria-label="Default select example"
													className="w-25 "
													onChange={(e) => {
														setCakeSize(
															e.target.value
														);
													}}
												>
													<option disabled>
														Select size
													</option>
													<option value="1kg">
														1 KG
													</option>
													<option value="2kg">
														2 KG
													</option>
													<option value="3kg">
														3 KG
													</option>
													<option value="4kg">
														4 KG
													</option>
													<option value="5kg">
														5 KG
													</option>
													<option value="6kg">
														6 KG
													</option>
												</Form.Select>
											</Col>
										)}

										<div className="qty-change d-flex justify-content-center align-items-center">
											<ButtonIncrement
												onClickFunc={incrementCounter}
											/>
											<Display message={counter} />
											<ButtonDecrement
												onClickFunc={decrementCounter}
											/>
										</div>
										<div className="addtocart-buynow mt-2 d-flex justify-content-center align-items-center flex-wrap gap-4">
											<Button
												variant="dark"
												className="px-5 py-2"
												onClick={addtoCartClick}
											>
												Add to Bag
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
													{product.description}
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
							<h5>Loading...</h5>
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
