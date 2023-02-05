import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutImg from "../Assets/Checkout.svg";
import Delete from "../Assets/delete-outlined.svg";
import paytmlogo from "../Assets/paytm.png";
import Shop from "../Assets/Shopp.svg";
import { clearCart, removeProduct } from "../redux/cartRedux";
import "../Scss/Cart.scss";
import OrderCompltedModel from "./OrderCompltedModel";
import Updatedetails from "./Updatedetails";
// import Paytm from 'paytm-sdk-js';

const Cart = (props) => {
	const cartProducts = useSelector((state) => state.cart.products);
	console.log(cartProducts);
	const [modalShow, setModalShow] = useState(false);
	const [orderAlert, setOrderAlert] = useState(false);
	const [amount, setAmount] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [paytmConfig, setPaytmConfig] = useState(undefined);

	const navigate = useNavigate();
	const dispatch = useDispatch();

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

	useEffect(() => {
		setIsLoading(true);
		if (props.show){
			const options = {method: 'POST', url: 'http://localhost:3001/api/paytm/paytm-payment'};

			axios.request(options).then(function (response) {
				console.log(response.data);

				makePayment_(response.data.orderID, response.data.amount, response.data.body.txnToken, response.data.mid);
			}).catch(function (error) {
				alert("Something went wrong");
				console.error(error);
			});
		}
    }, [cartProducts, props.show]);

	const makePayment_ = (orderID, amount, token, mid) => {
        setIsLoading(true);
        var config = {
            "root":"",
            "style": {
              "bodyBackgroundColor": "#fafafb",
              "bodyColor": "",
              "themeBackgroundColor": "#0FB8C9",
              "themeColor": "#ffffff",
              "headerBackgroundColor": "#284055",
              "headerColor": "#ffffff",
              "errorColor": "",
              "successColor": "",
              "card": {
                "padding": "",
                "backgroundColor": ""
              }
            },
            "data": {
              "orderId": orderID,
              "token": token,
              "tokenType": "TXN_TOKEN",
              "amount": amount /* update amount */
            },
            "payMode": {
              "labels": {},
              "filter": {
                "exclude": []
              },
              "order": [
                  "CC",
                  "DC",
                  "NB",
                  "UPI",
                  "PPBL",
                  "PPI",
                  "BALANCE"
              ]
            },
            "website": "WEBSTAGING",
            "flow": "DEFAULT",
            "merchant": {
              "mid": mid,
              "redirect": false
            },
            "handler": {
              "transactionStatus":function transactionStatus(paymentStatus){
                console.log("paymentStatus => ",paymentStatus);
                setIsLoading(false);
              },
              "notifyMerchant":function notifyMerchant(eventName,data){
                console.log("Closed");
                setIsLoading(false);
              }
            }
        };
      
        if (window.Paytm && window.Paytm.CheckoutJS) {
        // initialze configuration using init method
        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
            console.log('Before JS Checkout invoke');
            // after successfully update configuration invoke checkoutjs
            window.Paytm.CheckoutJS.invoke();
        }).catch(function onError(error) {
            console.log("Error => ", error);
        });
        }
    }

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
					setOrderAlert(true);
					dispatch(clearCart());
					props.onHide();
				})
				.catch(function (error) {
					console.error(error);
				});
		} else {
			alert("Please update your details and try again");
			setModalShow(true);
		}
	};

	function isDate(val) {
		// Cross realm comptatible
		return Object.prototype.toString.call(val) === "[object Date]";
	}

	function isObj(val) {
		return typeof val === "object";
	}

	function stringifyValue(val) {
		if (isObj(val) && !isDate(val)) {
			return JSON.stringify(val);
		} else {
			return val;
		}
	}

	function buildForm({ action, params }) {
		const form = document.createElement("form");
		form.setAttribute("method", "post");
		form.setAttribute("action", action);

		Object.keys(params).forEach((key) => {
			const input = document.createElement("input");
			input.setAttribute("type", "hidden");
			input.setAttribute("name", key);
			input.setAttribute("value", stringifyValue(params[key]));
			form.appendChild(input);
		});

		return form;
	}

	function post(details) {
		const form = buildForm(details);
		document.body.appendChild(form);
		form.submit();
		form.remove();
	}

	const getPaytmInfo = (data) => {
		return fetch(`/api/paytm/paytm-payment`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"content-type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				return response.json();
			})
			.catch((err) => console.log(err));
	};

	const makePayment = async (e) => {
		getPaytmInfo({
			amount: "200",
			email: "abc@gmail.com",
			phone: "1234567890",
		}).then((response) => {
			let information = {
				action: "https://securegw-stage.paytm.in/order/process",
				params: response,
			};

			post(information);
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
										<h>Your Cart is Empty!</h>
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
																	?.image
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
																Rs.
																{_.product
																	.category ===
																"cake" ? (
																	<>
																		{
																			_
																				.product
																				.pri
																		}
																		*{" "}
																		{
																			_.quantity
																		}
																	</>
																) : (
																	<>
																		{
																			_
																				.product
																				.price
																		}
																		*{" "}
																		{
																			_.quantity
																		}
																	</>
																)}
															</p>
														</div>
														<div className="second-row">
															<p>Total:</p>

															<p>
																Rs.
																{_.product
																	.category ===
																"cake" ? (
																	<>
																		{_
																			.product
																			.pri *
																			_.quantity}
																	</>
																) : (
																	<>
																		{_
																			.product
																			.price *
																			_.quantity}
																	</>
																)}
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
											(curr.product.category === "cake"
												? curr.product.pri *
												  curr.quantity
												: curr.product.price *
												  curr.quantity),
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
											(curr.product.category === "cake"
												? curr.product.pri *
												  curr.quantity
												: curr.product.price *
												  curr.quantity),
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
							<button onClick={makeOrder} disabled={isLoading}>
								<img src={CheckoutImg} alt="" />
								<p>Cash on Delivery</p>
							</button>
						)
					}

					<button
						onClick={makePayment}
						className="comming soon bg-white "
						disabled={isLoading}
					>
						<img src={paytmlogo} alt="..." />
						<p className="text-dark">
							Buy with Paytm (comming soon)
						</p>
					</button>

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
			<OrderCompltedModel
				show={orderAlert}
				onHide={() => setOrderAlert(false)}
			/>
		</>
	);
};

export default Cart;
