import GooglePayButton from "@google-pay/button-react";
import axios from "axios";
import React from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import Checkout from "../Assets/Checkout.svg";
import Delete from "../Assets/delete-outlined.svg";
import Shop from "../Assets/Shopp.svg";
import { removeProduct, clearCart } from "../redux/cartRedux";
import paytm from "../Assets/paytm.png";
import "../Scss/Cart.scss";
import Updatedetails from "./Updatedetails";
import { useState, useEffect } from "react";
import { getUser } from "../Auth/auth";

const STRIPE_KEY =
	"pk_test_51MAxxaSIm7okGxm8CDzOuJNdJlyjrDiM7u8evYe22AktqFNDhEcI3x9xwEZgJmoeUATgTL2N877CWnFcBoQjk3t400ehvRU25W";

const Cart = (props) => {
	const cartProducts = useSelector((state) => state.cart.products);
	const [modalShow, setModalShow] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleToken = (token, address) => {
		axios

			.post("/api/stripe/checkout", { token, cartProducts })
			.then((res) => {
				console.log(res);
				alert("Payment Successful");
			})
			.catch((err) => {
				console.log(err);
				alert("Payment Failed");
			});
	};

	// function isDate(val) {
	// 	// Cross realm comptatible
	// 	return Object.prototype.toString.call(val) === "[object Date]";
	// }

	// function isObj(val) {
	// 	return typeof val === "object";
	// }

	// function stringifyValue(val) {
	// 	if (isObj(val) && !isDate(val)) {
	// 		return JSON.stringify(val);
	// 	} else {
	// 		return val;
	// 	}
	// }

	// function buildForm({ action, params }) {
	// 	const form = document.createElement("form");
	// 	form.setAttribute("method", "post");
	// 	form.setAttribute("action", action);

	// 	Object.keys(params).forEach((key) => {
	// 		const input = document.createElement("input");
	// 		input.setAttribute("type", "hidden");
	// 		input.setAttribute("name", key);
	// 		input.setAttribute("value", stringifyValue(params[key]));
	// 		form.appendChild(input);
	// 	});

	// 	return form;
	// }

	// function post(details) {
	// 	const form = buildForm(details);
	// 	document.body.appendChild(form);
	// 	form.submit();
	// 	form.remove();
	// }

	const [user, setUser] = useState(null);

	useEffect(() => {
		const options = {
			method: "GET",
			url: "/api/user/info",
		};

		axios
			.request(options)
			.then(function (response) {
				setUser(response.data.user);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, []);

	const makeOrder = (e) => {
		e.preventDefault();

		if (user.phone && user.address) {
			const reqData = cartProducts.map((item) => {
				return {
					productId: item.product.id,
					quantity: item.quantity,
				};
			});

			const options = {
				method: "POST",
				url: "/api/order/checkout",
				data: { products: reqData },
			};

			axios
				.request(options)
				.then(function (response) {
					setModalShow(true);

					dispatch(clearCart());
				})
				.catch(function (error) {
					console.error(error);
				});
		} else {
			setModalShow(true);
			alert("Please Try Again!");
		}
	};

	const getPaytmInfo = async () => {
		try {
			const res = await fetch("/api/paytm/payment", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: { cartProducts },
			});
			return await res.json();
		} catch (err) {
			return console.log(err);
		}
	};

	const makePayment = () => {
		getPaytmInfo({ cartProducts }).then((response) => {
			console.log(response);
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
							{
								// check if cart is empty
								cartProducts.length === 0 ? (
									<div className="empty-cart">
										<h1>Your Cart is Empty</h1>
									</div>
								) : (
									<div className="cart-item-container">
										{cartProducts?.map((_, idx) => {
											return (
												<div
													className="cart-items"
													key={idx}
												>
													<div className="item-details">
														<h2>
															{_.product?.name}
														</h2>
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
																Quantity:{" "}
																{_.quantity}
															</p>
															<p className="text-right">
																Rs.{" "}
																{
																	_.product
																		.price
																}{" "}
																* {_.quantity}
															</p>
														</div>
														<div className="second-row">
															<p>Total:</p>

															<p>
																Rs.
																{_.product
																	.price *
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
																	removeProduct(
																		{
																			product:
																				_.product,
																		}
																	)
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
								)
							}
						</div>
					</div>
				</Offcanvas.Body>
				<div className="cart-footer">
					<div className="item-total d-block">
						<div className="shipping-qnty d-flex justify-content-between">
							<p>{cartProducts.length} items</p>
							{/* if cart is empty then shipping charge is 0 */}

							{cartProducts.length === 0 ? (
								<p>Shipping charge: Rs. 0</p>
							) : (
								<p>
									(Shipping charge) 150 +
									{cartProducts.reduce(
										(acc, curr) =>
											acc +
											curr.product.price * curr.quantity,
										0
									)}
								</p>
							)}
						</div>

						{
							// if cart is empty then subtotal is 0
							cartProducts.length === 0 ? (
								<p className="my-1 d-flex justify-content-end">
									Subtotal : Rs. 0
								</p>
							) : (
								<p className="my-1 d-flex justify-content-end">
									Subtotal : Rs.
									{cartProducts.reduce(
										(acc, curr) =>
											acc +
											curr.product.price * curr.quantity,
										0
									) + 150}
									/-
								</p>
							)
						}
					</div>
				</div>
				<div className="button-footer">
					{
						// if cart is empty then checkout button is disabled
						cartProducts.length === 0 ? (
							<button
								className="btn btn-outline-dark btn-block"
								disabled
							>
								Checkout
							</button>
						) : (
							<button onClick={makeOrder}>
								<img src={Checkout} alt="" />
								<p>Cash on Delivery</p>
							</button>
						)
					}

					<button
						onClick={makePayment}
						className="comming soon bg-white "
					>
						<img src={paytm} alt="..." />
						<p className="text-dark">
							Buy with Paytm (comming soon)
						</p>
					</button>
					{/* <StripeCheckout
						className="comming soon"
						stripeKey={STRIPE_KEY}
						token={handleToken}
						currency="INR"
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
					/> */}
					{/* <GooglePayButton
						className="w-100 comming soon"
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
								merchantId: "12345678901234567890",
								merchantName: "Demo Merchant",
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
					/> */}

					<Button
						className="shop"
						onClick={() => {
							let path = `/`;
							navigate(path);
							window.location.reload(false);
						}}
					>
						<img src={Shop} alt="..." />
						<p>Continue Shopping</p>
					</Button>
				</div>
			</Offcanvas>
			<Updatedetails
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</>
	);
};

export default Cart;
