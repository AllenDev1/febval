import GooglePayButton from "@google-pay/button-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import Checkout from "../Assets/Checkout.svg";
import logo from "../Assets/Company Name.svg";
import Delete from "../Assets/delete-outlined.svg";
import Shop from "../Assets/Shopp.svg";
import { removeProduct } from "../redux/cartRedux";
import "../Scss/Cart.scss";
import { getUser } from "../Auth/auth";

const key =
	"pk_test_51MAxxaSIm7okGxm8CDzOuJNdJlyjrDiM7u8evYe22AktqFNDhEcI3x9xwEZgJmoeUATgTL2N877CWnFcBoQjk3t400ehvRU25W";

const Cart = (props) => {
	const cartProducts = useSelector((state) => state.cart.products);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [stripeToken, setStripeToken] = useState(null);
	const [user, setUser] = useState(null);

	const handleToken = (token) => {
		setStripeToken(token);
	};

	useEffect(() => {
		const makeRequest = async () => {
			const response = await axios.post("/api/checkout/payment", {
				token: stripeToken.id,
				amount: 100,
			});
			const { status } = response.data;
			console.log("Response:", response.data);
			if (status === "success") {
				alert("Success! Check email for details");
			} else {
				alert("Something went wrong");
			}
		};
		if (stripeToken) {
			makeRequest();
		}
	}, [stripeToken]);

	useEffect(() => {
		getUser()
			.then((user) => {
				setUser(user);
			})
			.catch((err) => {
				setUser(null);
			});
	}, []);

	const placeOrder = (e) => {
		e.preventDefault();
		const options = {
			method: "POST",
			url: "/api/order/checkout",
			data: {
				userId: user.id,
				productId: 5,
				quantity: 1,
				total: 100,
				status: "true",
			},

			headers: {
				"Content-Type": "application/json",
			},
		};
		axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	return (
		<>
			<Offcanvas placement="end" backdrop="static" {...props}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>
						<h1>Cart</h1>
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<div className="cart-container">
						<div className="cart-contents">
							<div className="cart-item-container">
								{cartProducts?.map((_, idx) => {
									return (
										<div className="cart-items" key={idx}>
											<div className="item-details">
												<h2>{_.product?.name}</h2>
												<img
													src={
														_.product
															.productImages[0]
															.image
													}
													alt="..."
												/>
											</div>
											<div className="calculation">
												<div className="first-row float-right d-flex justify-content-between">
													<p>
														Quantity: {_.quantity}
													</p>
													<p className="text-right">
														Rs. {_.product.price} *{" "}
														{_.quantity}
													</p>
												</div>
												<div className="second-row">
													<p>Total:</p>
													<p>
														<s>
															{" "}
															Rs.{" "}
															{_.product.price *
																_.quantity}
															/-{" "}
														</s>
													</p>
													<p>
														Rs.
														{_.product.discount *
															_.quantity}
														/-
													</p>
												</div>
											</div>
											<div className="d-flex align-middle  justify-content-end">
												<img
													style={{
														cursor: "pointer",
													}}
													onClick={() => {
														dispatch(
															removeProduct({
																product:
																	_.product,
															})
														);
													}}
													src={Delete}
													alt="..."
													className="del float-right"
												/>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</Offcanvas.Body>
				<div className="cart-footer">
					<div className="item-total d-block">
						<div className="shipping-qnty d-flex justify-content-between">
							<p>{cartProducts.length} items</p>
							<p>
								(Shipping charge) 150 +
								{cartProducts.reduce(
									(acc, curr) =>
										acc +
										curr.product.discount * curr.quantity,
									0
								)}
							</p>
						</div>
						<div className="total">
							<p className="my-1 d-flex justify-content-end">
								Subtotal : Rs.
								{cartProducts.reduce(
									(acc, curr) =>
										acc +
										curr.product.discount * curr.quantity,
									0
								) + 150}
								/-
							</p>
						</div>
					</div>
				</div>
				<div className="button-footer">
					<button onClick={placeOrder}>
						<img src={Checkout} alt="..." />
						<p>Cash on delivery</p>
					</button>
					<StripeCheckout
						image={logo}
						billingAddress
						shippingAddress
						amount={
							(cartProducts.reduce(
								(acc, curr) =>
									acc + curr.product.discount * curr.quantity,
								0
							) +
								150) *
							100
						}
						name="Buy Now"
						stripeKey={key}
						token={handleToken}
						currency="INR"
						locale="auto"
					>
						<button style={{ backgroundColor: "#5433FF" }}>
							<img src={Checkout} alt=".." className=" " />
							<p>Pay with stripe</p>
						</button>
					</StripeCheckout>

					<GooglePayButton
						className="w-100"
						environment="TEST"
						paymentRequest={{
							apiVersion: 2,
							apiVersionMinor: 0,
							allowedPaymentMethods: [
								{
									type: "CARD",
									parameters: {
										allowedAuthMethods: [
											"PAN_ONLY",
											"CRYPTOGRAM_3DS",
										],
										allowedCardNetworks: [
											"MASTERCARD",
											"VISA",
										],
									},
									tokenizationSpecification: {
										type: "PAYMENT_GATEWAY",
										parameters: {
											gateway: "example",
											gatewayMerchantId:
												"exampleGatewayMerchantId",
										},
									},
								},
							],
							merchantInfo: {
								merchantId: "BCR2DN4T4ST6NWLC",
								merchantName: "Febval",
							},
							transactionInfo: {
								totalPriceStatus: "FINAL",
								totalPriceLabel: "Total",
								totalPrice: "100.00",
								currencyCode: "INR",
								countryCode: "IN",
							},
							shippingAddressRequired: true,
							callbackIntents: [
								"PAYMENT_AUTHORIZATION",
								"SHIPPING_ADDRESS",
							],
						}}
						onLoadPaymentData={(paymentRequest) => {
							console.log("load payment data", paymentRequest);
						}}
						onPaymentAuthorized={(paymentData) => {
							console.log(
								"Payment Authorised Success",
								paymentData
							);
							return { transactionState: "SUCCESS" };
						}}
						onPaymentDataChanged={(paymentData) => {
							console.log("On Payment Data Changed", paymentData);
							return {};
						}}
					/>
					<button
						className="shop"
						onClick={() => {
							let path = `/`;
							navigate(path);
							window.location.reload(false);
						}}
					>
						<img src={Shop} alt="..." />
						<p>Continue Shopping</p>
					</button>
				</div>
			</Offcanvas>
		</>
	);
};

export default Cart;
