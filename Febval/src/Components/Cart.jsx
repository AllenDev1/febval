import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";
import Checkout from "../Assets/Checkout.svg";
import Delete from "../Assets/delete-outlined.svg";
import Shop from "../Assets/Shopp.svg";
import "../Scss/Cart.scss";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../redux/cartRedux";
import GooglePayButton from "@google-pay/button-react";

const Cart = (props) => {
	const cartProducts = useSelector((state) => state.cart.products);
	const navigate = useNavigate();
	const dispatch = useDispatch();

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
														Rs. {_.product.price} +
														150(shipping)
													</p>
												</div>
												<div className="second-row">
													<p>Total:</p>
													<p>
														<s>
															{" "}
															Rs.{" "}
															{(_.product.price +
																150) *
																_.quantity}{" "}
															/-{" "}
														</s>
													</p>
													<p>
														Rs.{" "}
														{(_.product.discount +
															150) *
															_.quantity}{" "}
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
														dispatch();
														// removeProduct(
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
					<div className="item-total">
						<p>{cartProducts.length} items</p>
						<p>
							Subtotal : Rs.
							{cartProducts.reduce(
								(acc, curr) =>
									acc +
									(curr.product.discount + 150) *
										curr.quantity,
								0
							)}
							/-
						</p>
					</div>
				</div>
				<div className="button-footer">
					<button>
						<img src={Checkout} alt="" />
						<p>Checkout</p>
					</button>
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
								merchantId: "12345678901234567890",
								merchantName: "Demo Merchant",
							},
							transactionInfo: {
								totalPriceStatus: "FINAL",
								totalPriceLabel: "Total",
								totalPrice: "100.00",
								currencyCode: "USD",
								countryCode: "US",
							},
							callbackIntents: ['PAYMENT_AUTHORIZATION'],
						}}
						onLoadPaymentData={(paymentRequest) => {
							console.log("load payment data", paymentRequest);
						}}
						onPaymentAuthorized={(paymentData) => {
							console.log("Payment Authorised Success", paymentData);
							return { transactionState: 'SUCCESS' };
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
						<img src={Shop} alt="" />
						<p>Continue Shopping</p>
					</button>
				</div>
			</Offcanvas>
		</>
	);
};

export default Cart;
