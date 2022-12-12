import GooglePayButton from "@google-pay/button-react";
import axios from "axios";
import React from "react";
import { Offcanvas } from "react-bootstrap";
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
import { useState } from "react";

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

	const makeOrder = (e) => {
		e.preventDefault();
		const options = {
			method: "POST",
			url: "/api/order/checkout",
			data: {
				productId: cartProducts[0].product.id,
				quantity: cartProducts[0].quantity,
			},
		};

		axios
			.request(options)
			.then(function (response) {})
			.catch(function (error) {
				console.error(error);
			});

		setModalShow(true);

		dispatch(clearCart());
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
														Rs.
														{_.product.price *
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
										curr.product.price * curr.quantity,
									0
								)}
							</p>
						</div>

						<p className="my-1 d-flex justify-content-end">
							Subtotal : Rs.
							{cartProducts.reduce(
								(acc, curr) =>
									acc + curr.product.price * curr.quantity,
								0
							) + 150}
							/-
						</p>
					</div>
				</div>
				<div className="button-footer">
					<button onClick={makeOrder}>
						<img src={Checkout} alt="" />
						<p>Cash on Delivery</p>
					</button>
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
			<Updatedetails
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</>
	);
};

export default Cart;
